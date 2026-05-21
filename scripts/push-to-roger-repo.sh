#!/usr/bin/env bash
# Push local toll-plaza-app to RogerRWT/Toll-Plaza-college-project
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REMOTE="https://github.com/RogerRWT/Toll-Plaza-college-project.git"

GH_GIT="/Applications/GitHub Desktop.app/Contents/Resources/app/git/bin/git"
if [ -x "$GH_GIT" ]; then
  export PATH="/Applications/GitHub Desktop.app/Contents/Resources/app/git/bin:$PATH"
  export GIT_EXEC_PATH="/Applications/GitHub Desktop.app/Contents/Resources/app/git/libexec/git-core"
  git config credential.helper "/Applications/GitHub Desktop.app/Contents/Resources/app/git/bin/git-credential-desktop" 2>/dev/null || true
elif ! command -v git >/dev/null 2>&1; then
  echo "Install Git: xcode-select --install  OR  GitHub Desktop"
  exit 1
fi

cd "$ROOT"

if [[ ! -d .git ]]; then
  git init
fi

git add .
git commit -m "Toll Plaza college project: NestJS backend and Angular frontend" || true
git branch -M main

git remote remove origin 2>/dev/null || true
git remote add origin "$REMOTE"

echo "Merging with GitHub (existing README on remote)..."
git pull origin main --allow-unrelated-histories --no-edit || true

echo "Pushing to GitHub..."
git push -u origin main

echo ""
echo "Done! Submit this link:"
echo "https://github.com/RogerRWT/Toll-Plaza-college-project"
