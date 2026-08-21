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
  pi      Install Pi assets under ~/.pi/agent (skills, extension, manifest)
  agents  Copy skills to ~/.agents/skills
  claude  Print Claude Code local plugin command
  all     Install codex and pi assets without modifying shared-agent skills,
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

install_codex() {
  copy_skills "$HOME/.codex/skills"
  copy_prompts "$HOME/.codex/prompts"
}

install_pi() {
  local pi_root="$HOME/.pi/agent"
  local managed="$pi_root/cl-engineering"
  local extension_dir="$pi_root/extensions/cl-engineering"

  copy_skills "$pi_root/skills"

  mkdir -p "$extension_dir" "$managed"
  cp "$PLUGIN/extensions/cl-engineering/index.ts" "$extension_dir/index.ts"
  cat > "$managed/install-manifest.json" <<EOF
{
  "version": 1,
  "pluginName": "cl-engineering",
  "skills": [
    "cl-engineering",
    "cl-setup",
    "cl-shape",
    "cl-plan",
    "cl-build",
    "cl-review",
    "cl-compound"
  ],
  "prompts": [],
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
    echo "Skipped shared ~/.agents install because Pi also scans that directory and may report duplicate cl-* skills."
    echo "Existing ~/.agents skills were left untouched. Run '--target agents' separately only when needed."
    print_claude
    ;;
  *)
    echo "Invalid target: $TARGET" >&2
    usage >&2
    exit 1
    ;;
esac
