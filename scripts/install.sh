#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PLUGIN="$ROOT/plugins/clarity-engineering"
TARGET=""

usage() {
  cat <<'USAGE_EOF'
Usage: scripts/install.sh --target codex|pi|agents|claude|all

Targets:
  codex   Copy skills to ~/.codex/skills and prompts to ~/.codex/prompts
  pi      Install Pi agent package assets under ~/.pi/agent (skills, prompts, extension, manifest)
  agents  Copy skills to ~/.agents/skills
  claude  Print Claude Code local plugin command
  all     Install codex and pi assets, remove duplicate shared-agent Clarity skills,
          then print Claude instructions

Pi also supports local package install directly:
  pi install /absolute/path/to/clarity-engineering-plugin
USAGE_EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --target)
      TARGET="${2:-}"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
done

if [[ -z "$TARGET" ]]; then
  echo "Missing --target" >&2
  usage >&2
  exit 1
fi

copy_skills() {
  local dest="$1"
  mkdir -p "$dest"
  cp -R "$PLUGIN/skills/"* "$dest/"
  echo "Copied skills to $dest"
}

copy_prompts() {
  local dest="$1"
  mkdir -p "$dest"
  cp "$PLUGIN/prompts/"*.md "$dest/"
  echo "Copied prompts to $dest"
}

cleanup_legacy_clarity_names() {
  local skills_dest="$1"
  local prompts_dest="${2:-}"
  local old_names=(clarity-engineering clarity-shape clarity-plan clarity-build clarity-review clarity-compound)
  for name in "${old_names[@]}"; do
    rm -rf "$skills_dest/$name"
    if [[ -n "$prompts_dest" ]]; then
      rm -f "$prompts_dest/$name.md"
    fi
  done
}

cleanup_current_clarity_names() {
  local skills_dest="$1"
  local prompts_dest="${2:-}"
  local current_names=(cl-engineering cl-shape cl-plan cl-build cl-review cl-compound)
  for name in "${current_names[@]}"; do
    rm -rf "$skills_dest/$name"
    if [[ -n "$prompts_dest" ]]; then
      rm -f "$prompts_dest/$name.md"
    fi
  done
}

cleanup_agents_conflicts_for_pi() {
  local agents_skills="$HOME/.agents/skills"
  cleanup_current_clarity_names "$agents_skills"
  cleanup_legacy_clarity_names "$agents_skills"
  echo "Removed Clarity Engineering skills from $agents_skills to avoid Pi skill-name collisions."
}

install_codex() {
  copy_skills "$HOME/.codex/skills"
  copy_prompts "$HOME/.codex/prompts"
  cleanup_legacy_clarity_names "$HOME/.codex/skills" "$HOME/.codex/prompts"
}

install_pi() {
  local pi_root="$HOME/.pi/agent"
  local managed="$pi_root/cl-engineering"
  local extension_dir="$pi_root/extensions/cl-engineering"

  copy_skills "$pi_root/skills"
  copy_prompts "$pi_root/prompts"
  cleanup_legacy_clarity_names "$pi_root/skills" "$pi_root/prompts"
  rm -rf "$pi_root/extensions/clarity-engineering" "$pi_root/clarity-engineering"

  mkdir -p "$extension_dir" "$managed"
  cp "$PLUGIN/extensions/cl-engineering/index.ts" "$extension_dir/index.ts"
  cat > "$managed/install-manifest.json" <<EOF
{
  "version": 1,
  "pluginName": "cl-engineering",
  "skills": [
    "cl-engineering",
    "cl-shape",
    "cl-plan",
    "cl-build",
    "cl-review",
    "cl-compound"
  ],
  "prompts": [
    "cl-engineering.md",
    "cl-shape.md",
    "cl-plan.md",
    "cl-build.md",
    "cl-review.md",
    "cl-compound.md"
  ],
  "extensions": [
    "cl-engineering/index.ts"
  ],
  "agents": []
}
EOF
  echo "Copied Pi extension to $extension_dir/index.ts"
  echo "Wrote Pi install manifest to $managed/install-manifest.json"
  echo "Run /reload in Pi or restart Pi to load /cl-* extension commands."
}

install_agents() {
  copy_skills "$HOME/.agents/skills"
  cleanup_legacy_clarity_names "$HOME/.agents/skills"
}

print_claude() {
  echo "Claude Code local plugin command:"
  echo "claude --plugin-dir $PLUGIN"
}

case "$TARGET" in
  codex)
    install_codex
    ;;
  pi)
    install_pi
    ;;
  agents)
    install_agents
    ;;
  claude)
    print_claude
    ;;
  all)
    install_codex
    install_pi
    cleanup_agents_conflicts_for_pi
    echo "Skipped shared ~/.agents install because Pi also scans that directory and would report duplicate cl-* skills."
    echo "Run './scripts/install.sh --target agents' separately only when you need shared-agent skills without Pi."
    print_claude
    ;;
  *)
    echo "Invalid target: $TARGET" >&2
    usage >&2
    exit 1
    ;;
esac
