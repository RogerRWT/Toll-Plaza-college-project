#!/usr/bin/env bash
# Publishes toll-plaza-app to GitHub (run after xcode-select --install)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
NODE_BIN="$HOME/.local/node-v22.14.0-darwin-arm64/bin"
REPO_NAME="${1:-toll-plaza-app}"

if ! command -v git >/dev/null 2>&1; then
  echo "Git is not installed."
  echo "Run this first, then click Install in the popup:"
  echo "  xcode-select --install"
  exit 1
fi

if [[ -n "${GITHUB_TOKEN:-}" ]]; then
  export GH_TOKEN="$GITHUB_TOKEN"
fi

cd "$ROOT"

if [[ ! -d .git ]]; then
  git init
fi

git add .
if git diff --cached --quiet; then
  echo "Nothing new to commit."
else
  git commit -m "Toll Plaza full-stack project: NestJS backend and Angular frontend"
fi

git branch -M main

if command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1; then
  echo "Creating/pushing via GitHub CLI..."
  if ! gh repo view "$REPO_NAME" >/dev/null 2>&1; then
    gh repo create "$REPO_NAME" --public --source=. --remote=origin --push
  else
    git remote remove origin 2>/dev/null || true
    gh repo set-default "$(gh api user -q .login)/$REPO_NAME" 2>/dev/null || true
    ORIGIN="$(gh repo view "$REPO_NAME" --json url -q .url).git"
    git remote add origin "$ORIGIN" 2>/dev/null || git remote set-url origin "$ORIGIN"
    git push -u origin main
  fi
  echo ""
  echo "Done! Submit this URL:"
  gh repo view "$REPO_NAME" --json url -q .url
  exit 0
fi

if git remote get-url origin >/dev/null 2>&1; then
  git push -u origin main
  echo ""
  echo "Pushed. Submit your repo URL from GitHub."
else
  USERNAME="${GITHUB_USERNAME:-}"
  if [[ -z "$USERNAME" ]]; then
    read -r -p "Your GitHub username: " USERNAME
  fi
  git remote add origin "https://github.com/${USERNAME}/${REPO_NAME}.git" 2>/dev/null \
    || git remote set-url origin "https://github.com/${USERNAME}/${REPO_NAME}.git"
  echo ""
  echo "1. Create an empty repo at: https://github.com/new"
  echo "   Name: ${REPO_NAME}  |  Public  |  Do NOT add README"
  echo "2. Then run:  git push -u origin main"
  echo "3. Submit: https://github.com/${USERNAME}/${REPO_NAME}"
fi
