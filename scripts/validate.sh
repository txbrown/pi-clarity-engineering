#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

bash -n scripts/install.sh
python3 scripts/eval.py --self-test

python3 - <<'VALIDATE_PY'
import json
import pathlib
import re

root = pathlib.Path('.')
plugin = root / 'plugins/clarity-engineering'

for path in [
    plugin / '.claude-plugin/plugin.json',
    plugin / '.codex-plugin/plugin.json',
    root / 'package.json',
]:
    json.loads(path.read_text())
    print(f'valid json: {path}')

lifecycle = 'Shape → Plan → Build → Review → Compound'
plan = 'Plan = Slice + Specify'
forbidden = [
    'Shape → Slice → Specify → Build',
    'Shape -> Slice -> Specify -> Build',
    'explicit operator approval',
    'Do not advance to another lifecycle stage',
    'Continuous compounding is not optional',
]

runtime_paths = [
    *plugin.glob('skills/*/SKILL.md'),
    *plugin.glob('skills/*/references/*.md'),
    plugin / 'extensions/cl-engineering/index.ts',
    plugin / 'AGENTS.md',
    root / 'README.md',
    plugin / 'README.md',
]
runtime_text = '\n'.join(path.read_text() for path in runtime_paths if path.exists())
if lifecycle not in runtime_text or plan not in runtime_text:
    raise SystemExit('canonical lifecycle wording missing')
for phrase in forbidden:
    if phrase in runtime_text:
        raise SystemExit(f'contradictory or obsolete policy found: {phrase}')


def frontmatter(path):
    text = path.read_text()
    if not text.startswith('---'):
        raise SystemExit(f'missing frontmatter: {path}')
    parts = text.split('---', 2)
    if len(parts) < 3:
        raise SystemExit(f'invalid frontmatter: {path}')
    frontmatter_text = parts[1]
    for line in frontmatter_text.splitlines():
        if not line.startswith('description: '):
            continue
        value = line.removeprefix('description: ').strip()
        if ':' in value and not (value.startswith('"') and value.endswith('"')):
            raise SystemExit(f'description containing colon must be quoted: {path}')
    return frontmatter_text, parts[2].strip()

skills = sorted((plugin / 'skills').glob('*/SKILL.md'))
total_skill_chars = 0
for path in skills:
    fm, _ = frontmatter(path)
    if 'name:' not in fm or 'description:' not in fm:
        raise SystemExit(f'missing name/description: {path}')
    size = len(path.read_text())
    if size > 5000:
        raise SystemExit(f'skill exceeds 5000-character safeguard: {path} ({size})')
    total_skill_chars += size
    print(f'valid skill: {path} ({size} chars)')
if total_skill_chars > 16000:
    raise SystemExit(f'total skill character safeguard exceeded: {total_skill_chars} chars')
print(f'valid skill character safeguard: {total_skill_chars} chars')

expected = [
    'cl-engineering', 'cl-setup', 'cl-shape', 'cl-plan',
    'cl-build', 'cl-review', 'cl-compound',
]

extension_path = plugin / 'extensions/cl-engineering/index.ts'
extension = extension_path.read_text()
for command in expected:
    if f'command: "{command}"' not in extension:
        raise SystemExit(f'missing Pi extension command: /{command}')
for obsolete in ['mode.instruction', 'OPERATOR_PROGRESS', 'APPROVAL_GATE']:
    if obsolete in extension:
        raise SystemExit(f'Pi extension still duplicates policy: {obsolete}')
build_prompt = extension.split('function buildPrompt', 1)[1].split('function restoreState', 1)[0]
if len(build_prompt) > 600:
    raise SystemExit(f'Pi buildPrompt exceeds thin-wrapper budget: {len(build_prompt)} chars')
print(f'valid Pi extension: {extension_path}')

package = json.loads((root / 'package.json').read_text())
pi_manifest = package.get('pi', {})
for key in ['extensions', 'skills']:
    if key not in pi_manifest:
        raise SystemExit(f'package.json missing pi.{key}')
if 'prompts' in pi_manifest:
    raise SystemExit('Pi package must not load prompt wrappers; extension commands own /cl-*')
print('valid pi package manifest: package.json')

for command in expected:
    command_path = plugin / 'commands' / f'{command}.md'
    prompt_path = plugin / 'prompts' / f'{command}.md'
    if command_path.read_bytes() != prompt_path.read_bytes():
        raise SystemExit(f'command/prompt wrapper drift: {command}')
    fm, body = frontmatter(command_path)
    if 'description:' not in fm:
        raise SystemExit(f'missing wrapper description: {command_path}')
    expected_body = f'Use the `{command}` skill for: $ARGUMENTS'
    if body != expected_body:
        raise SystemExit(f'wrapper is not thin: {command_path}')
    if len(command_path.read_text()) > 220:
        raise SystemExit(f'wrapper exceeds 220-char budget: {command_path}')
    print(f'valid thin wrapper: {command}')

install = (root / 'scripts/install.sh').read_text()
if '"cl-setup"' not in install:
    raise SystemExit('install manifest missing cl-setup skill')
if '"prompts": []' not in install:
    raise SystemExit('manual Pi install must not duplicate extension commands with prompts')
if 'rm -rf' in install or 'cleanup_agents_conflicts_for_pi' in install:
    raise SystemExit('installer contains destructive cleanup')

ignore = (root / '.gitignore').read_text().splitlines()
if '.clarity-engineering/config.local.yaml' not in ignore:
    raise SystemExit('local Clarity config is not gitignored')

for eval_path in sorted(plugin.glob('skills/*/evals/evals.json')):
    json.loads(eval_path.read_text())
    print(f'valid eval json: {eval_path}')

print('validation passed')
VALIDATE_PY
