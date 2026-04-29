#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

python3 - <<'VALIDATE_PY'
import json
import pathlib

root = pathlib.Path('.')
plugin = root / 'plugins/clarity-engineering'

for p in [
    plugin / '.claude-plugin/plugin.json',
    plugin / '.codex-plugin/plugin.json',
    root / 'package.json',
]:
    json.loads(p.read_text())
    print(f'valid json: {p}')

old_patterns = [
    'Shape → Slice → Specify → Build',
    'Shape -> Slice -> Specify -> Build',
    'Shape, Slice, Specify, Build',
    'Shape / Slice / Specify / Build',
]
new = 'Shape → Plan → Build → Review → Compound'
plan = 'Plan = Slice + Specify'
approval = 'explicit operator approval'
ask_user = 'ask_user'
all_text = ''

for p in root.rglob('*'):
    if not p.is_file() or p.suffix not in {'.md', '.json'}:
        continue
    text = p.read_text(errors='ignore')
    all_text += text + '\\n'
    for pattern in old_patterns:
        if pattern in text:
            raise SystemExit(f'old lifecycle wording found in {p}: {pattern}')
    if 'Slice → Specify → Build' in text and 'Plan = Slice + Specify' not in text:
        raise SystemExit(f'possible old lifecycle wording found: {p}')

if new not in all_text:
    raise SystemExit('new lifecycle wording missing')
if plan not in all_text:
    raise SystemExit('Plan = Slice + Specify missing')
if approval not in all_text:
    raise SystemExit('operator approval gate wording missing')
if ask_user not in all_text:
    raise SystemExit('Pi TUI ask_user approval wording missing')

def frontmatter(path):
    text = path.read_text()
    if not text.startswith('---'):
        raise SystemExit(f'missing frontmatter: {path}')
    parts = text.split('---', 2)
    if len(parts) < 3:
        raise SystemExit(f'invalid frontmatter: {path}')
    return parts[1]

for p in sorted((plugin / 'skills').glob('*/SKILL.md')):
    fm = frontmatter(p)
    if 'name:' not in fm or 'description:' not in fm:
        raise SystemExit(f'missing name/description: {p}')
    print(f'valid skill: {p}')

extension_path = plugin / 'extensions/cl-engineering/index.ts'
if not extension_path.exists():
    raise SystemExit(f'missing Pi extension: {extension_path}')
extension_text = extension_path.read_text()
for command in ['cl-engineering', 'cl-shape', 'cl-plan', 'cl-build', 'cl-review', 'cl-compound']:
    if f'command: \"{command}\"' not in extension_text:
        raise SystemExit(f'missing Pi extension command: /{command}')
print(f'valid Pi extension: {extension_path}')

package = json.loads((root / 'package.json').read_text())
pi_manifest = package.get('pi', {})
for key in ['extensions', 'skills', 'prompts']:
    if key not in pi_manifest:
        raise SystemExit(f'package.json missing pi.{key}')
print('valid pi package manifest: package.json')

for group in ['commands', 'prompts']:
    directory = plugin / group
    files = sorted(directory.glob('*.md'))
    if not files:
        raise SystemExit(f'no {group} files found')
    for p in files:
        fm = frontmatter(p)
        if 'description:' not in fm:
            raise SystemExit(f'missing description: {p}')
        print(f'valid {group[:-1]}: {p}')

print('validation passed')
VALIDATE_PY
