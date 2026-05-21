#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
NODE_BIN="/Users/kamalroy/.local/node-v22.14.0-darwin-arm64/bin"

if [[ ! -x "$NODE_BIN/node" ]]; then
  echo "Node not found at $NODE_BIN"
  echo "Run: bash scripts/setup-node.sh"
  exit 1
fi

export PATH="$NODE_BIN:$PATH"

echo "Starting backend (http://localhost:3000)..."
(cd "$ROOT/backend" && npm run start:dev) &
BACK_PID=$!

echo "Starting frontend (http://localhost:4200)..."
(cd "$ROOT/frontend" && npm start -- --host 127.0.0.1 --port 4200) &
FRONT_PID=$!

trap 'kill $BACK_PID $FRONT_PID 2>/dev/null' EXIT INT TERM

wait
