#!/usr/bin/env python3
"""Run objective Clarity Engineering behavior evals in isolated fixtures."""

import argparse
import hashlib
import json
import os
from pathlib import Path
import shlex
import shutil
import subprocess
import sys
import tempfile

ROOT = Path(__file__).resolve().parents[1]
EVAL_FILES = "plugins/clarity-engineering/skills/*/evals/evals.json"
IGNORED_PARTS = {".git", "__pycache__"}


def contained(path, root):
    try:
        path.relative_to(root)
        return True
    except ValueError:
        return False


def snapshot_tree(root):
    return {
        path.relative_to(root).as_posix(): hashlib.sha256(path.read_bytes()).hexdigest()
        for path in sorted(root.rglob("*"))
        if path.is_file() and not any(part in IGNORED_PARTS for part in path.parts)
    }


def load_cases(selected=None):
    cases = []
    for eval_path in sorted(ROOT.glob(EVAL_FILES)):
        for case in json.loads(eval_path.read_text()).get("evals", []):
            execution = case.get("execution")
            if not execution or selected and case["id"] not in selected:
                continue

            required = {"fixture", "skill", "check_command", "allowed_files", "required_files"}
            missing = sorted(required - execution.keys())
            if missing:
                raise ValueError(f"{case['id']}: missing execution fields: {', '.join(missing)}")

            fixture = (eval_path.parent / execution["fixture"]).resolve()
            skill = (eval_path.parent / execution["skill"]).resolve()
            command = execution["check_command"]
            allowed = set(execution["allowed_files"])
            required_files = set(execution["required_files"])
            if not contained(fixture, ROOT) or not fixture.is_dir():
                raise ValueError(f"{case['id']}: invalid fixture: {fixture}")
            if not contained(skill, ROOT) or not skill.is_file():
                raise ValueError(f"{case['id']}: invalid skill: {skill}")
            if not isinstance(command, list) or not command or not all(isinstance(arg, str) for arg in command):
                raise ValueError(f"{case['id']}: check_command must be a non-empty argument list")
            if not required_files <= allowed:
                raise ValueError(f"{case['id']}: required_files must be allowed_files")
            if any(Path(path).is_absolute() or ".." in Path(path).parts for path in allowed):
                raise ValueError(f"{case['id']}: unsafe allowed_files entry")

            cases.append({**case, "execution": {**execution, "fixture_path": fixture, "skill_path": skill}})

    if selected:
        missing = sorted(set(selected) - {case["id"] for case in cases})
        if missing:
            raise ValueError(f"unknown or non-executable eval: {', '.join(missing)}")
    return cases


def decode(value):
    if value is None:
        return ""
    return value.decode(errors="replace") if isinstance(value, bytes) else str(value)


def run_process(command, *, cwd, timeout, env=None):
    try:
        return subprocess.run(
            command,
            cwd=cwd,
            text=True,
            capture_output=True,
            timeout=timeout,
            env=env,
        )
    except subprocess.TimeoutExpired as error:
        return subprocess.CompletedProcess(
            command,
            124,
            decode(error.stdout),
            decode(error.stderr) or f"timed out after {timeout}s",
        )


def parse_events(output):
    events = []
    for line in output.splitlines():
        try:
            events.append(json.loads(line))
        except json.JSONDecodeError:
            pass
    return events


def harness_runs(events, expected_command):
    starts = {}
    runs = []
    for event in events:
        if event.get("type") == "tool_execution_start" and event.get("toolName") == "bash":
            starts[event.get("toolCallId")] = (event.get("args") or {}).get("command", "")
        elif event.get("type") == "tool_execution_end" and event.get("toolName") == "bash":
            command = starts.get(event.get("toolCallId"), "")
            try:
                exact_match = shlex.split(command) == expected_command
            except ValueError:
                exact_match = False
            if exact_match:
                runs.append({"command": command, "passed": not event.get("isError", False)})
    return runs


def score_case(case, before, after, events, agent_returncode, final_check):
    execution = case["execution"]
    changed = sorted(path for path in set(before) | set(after) if before.get(path) != after.get(path))
    unexpected = sorted(set(changed) - set(execution["allowed_files"]))
    missing_required = sorted(set(execution["required_files"]) - set(changed))
    checks = harness_runs(events, execution["check_command"])
    self_corrected = any(
        not check["passed"] and any(later["passed"] for later in checks[index + 1 :])
        for index, check in enumerate(checks)
    )
    metrics = {
        "correct_outcome": final_check.returncode == 0,
        "relevant_checks_run": bool(checks),
        "successful_self_correction": self_corrected,
        "files_touched": changed,
        "unnecessary_files_touched": unexpected,
        "scope_preserved": not unexpected and not missing_required,
    }
    return {
        "id": case["id"],
        "name": case["name"],
        "passed": agent_returncode == 0 and all(
            [
                metrics["correct_outcome"],
                metrics["relevant_checks_run"],
                metrics["successful_self_correction"],
                metrics["scope_preserved"],
            ]
        ),
        "agent_completed": agent_returncode == 0,
        "metrics": metrics,
        "missing_required_files": missing_required,
        "check_runs": checks,
        "final_check": {
            "command": shlex.join(execution["check_command"]),
            "exit_code": final_check.returncode,
            "stdout": final_check.stdout.strip(),
            "stderr": final_check.stderr.strip(),
        },
    }


def run_case(case, args):
    execution = case["execution"]
    with tempfile.TemporaryDirectory(prefix=f"clarity-eval-{case['id']}-") as temp:
        workdir = Path(temp) / "fixture"
        shutil.copytree(execution["fixture_path"], workdir)
        before = snapshot_tree(workdir)
        check = shlex.join(execution["check_command"])
        prompt = (
            "Use the cl-build skill. Work only in this fixture and do not commit.\n\n"
            f"{case['prompt']}\n\n"
            f"The accepted behavior is encoded in the existing harness. Run `{check}` to reproduce the failure, "
            "make the minimum production fix, and rerun the same harness. Do not modify the harness."
        )
        command = [
            args.pi,
            "--mode",
            "json",
            "--no-session",
            "--no-extensions",
            "--no-prompt-templates",
            "--no-skills",
            "--skill",
            str(execution["skill_path"]),
            "--no-context-files",
            "--approve",
            "--tools",
            "read,bash,edit",
            "--thinking",
            args.thinking,
        ]
        if args.model:
            command.extend(["--model", args.model])
        command.append(prompt)
        env = os.environ.copy()
        env.update({"PI_SKIP_VERSION_CHECK": "1", "PI_TELEMETRY": "0"})

        agent = run_process(command, cwd=workdir, timeout=args.timeout, env=env)
        after = snapshot_tree(workdir)
        final_check = run_process(execution["check_command"], cwd=workdir, timeout=60)
        result = score_case(case, before, after, parse_events(agent.stdout), agent.returncode, final_check)
        result["agent_stderr"] = agent.stderr.strip()[-4000:]
        return result


def self_test():
    if not load_cases():
        raise AssertionError("no executable eval cases found")
    case = {
        "id": "self-test",
        "name": "self-test",
        "execution": {
            "check_command": ["python3", "test.py"],
            "allowed_files": ["target.py"],
            "required_files": ["target.py"],
        },
    }
    command = "python3 test.py"
    events = [
        {"type": "tool_execution_start", "toolCallId": "red", "toolName": "bash", "args": {"command": command}},
        {"type": "tool_execution_end", "toolCallId": "red", "toolName": "bash", "isError": True},
        {"type": "tool_execution_start", "toolCallId": "green", "toolName": "bash", "args": {"command": command}},
        {"type": "tool_execution_end", "toolCallId": "green", "toolName": "bash", "isError": False},
    ]
    passed_check = subprocess.CompletedProcess(case["execution"]["check_command"], 0, "passed", "")
    result = score_case(case, {"target.py": "before"}, {"target.py": "after"}, events, 0, passed_check)
    assert result["passed"], result

    noisy = score_case(
        case,
        {"target.py": "before"},
        {"target.py": "after", "noise.txt": "new"},
        events,
        0,
        passed_check,
    )
    assert not noisy["metrics"]["scope_preserved"], noisy

    chained = [{**event, "args": {"command": f"{command}; false"}} if event["type"] == "tool_execution_start" else event for event in events]
    gamed = score_case(case, {"target.py": "before"}, {"target.py": "after"}, chained, 0, passed_check)
    assert not gamed["metrics"]["relevant_checks_run"], gamed

    timeout = run_process([sys.executable, "-c", "import time; time.sleep(1)"], cwd=ROOT, timeout=0.01)
    assert timeout.returncode == 124 and isinstance(timeout.stderr, str), timeout
    print("eval runner self-test passed")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--case", action="append", help="Run one executable eval id (repeatable)")
    parser.add_argument("--model", default=os.getenv("CLARITY_EVAL_MODEL"), help="Pi model override")
    parser.add_argument("--thinking", default=os.getenv("CLARITY_EVAL_THINKING", "low"))
    parser.add_argument("--pi", default=os.getenv("CLARITY_EVAL_PI", "pi"), help="Pi executable")
    parser.add_argument("--timeout", type=int, default=600, help="Per-case timeout in seconds")
    parser.add_argument("--json", action="store_true", help="Print the complete JSON report")
    parser.add_argument("--list", action="store_true", help="List executable eval ids")
    parser.add_argument("--self-test", action="store_true", help="Test scoring without calling a model")
    args = parser.parse_args()

    try:
        if args.self_test:
            self_test()
            return 0
        cases = load_cases(args.case)
    except (OSError, ValueError, AssertionError) as error:
        print(f"eval configuration error: {error}", file=sys.stderr)
        return 2

    if args.list:
        print("\n".join(case["id"] for case in cases))
        return 0
    if not cases or not shutil.which(args.pi):
        print("no executable eval cases or Pi executable found", file=sys.stderr)
        return 2

    print(
        "warning: behavior evals run a trusted model with this user's local tool permissions; use an OS/container sandbox for untrusted models or fixtures",
        file=sys.stderr,
    )
    results = [run_case(case, args) for case in cases]
    report = {"passed": all(result["passed"] for result in results), "results": results}
    if args.json:
        print(json.dumps(report, indent=2))
    else:
        for result in results:
            metrics = result["metrics"]
            print(
                f"{'PASS' if result['passed'] else 'FAIL'} {result['id']}: "
                f"outcome={'yes' if metrics['correct_outcome'] else 'no'}, checks={len(result['check_runs'])}, "
                f"self_correction={'yes' if metrics['successful_self_correction'] else 'no'}, "
                f"files={len(metrics['files_touched'])}, unnecessary={len(metrics['unnecessary_files_touched'])}, "
                f"scope={'yes' if metrics['scope_preserved'] else 'no'}"
            )
    return 0 if report["passed"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
