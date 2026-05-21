#!/usr/bin/env bash
set -euo pipefail

NODE_VERSION="v22.14.0"
ARCH="$(uname -m)"
INSTALL_DIR="$HOME/.local"

case "$ARCH" in
  arm64) NODE_PKG="node-${NODE_VERSION}-darwin-arm64" ;;
  x86_64) NODE_PKG="node-${NODE_VERSION}-darwin-x64" ;;
  *)
    echo "Unsupported architecture: $ARCH"
    exit 1
    ;;
esac

mkdir -p "$INSTALL_DIR"
cd "$INSTALL_DIR"

if [[ -x "$INSTALL_DIR/$NODE_PKG/bin/node" ]]; then
  echo "Node already installed at $INSTALL_DIR/$NODE_PKG"
else
  echo "Downloading Node.js ${NODE_VERSION} for ${ARCH}..."
  curl -fsSL -o node.tar.gz "https://nodejs.org/dist/${NODE_VERSION}/${NODE_PKG}.tar.gz"
  tar -xzf node.tar.gz
  rm node.tar.gz
fi

export PATH="$INSTALL_DIR/$NODE_PKG/bin:$PATH"
echo "Node: $(node -v)"
echo "npm:  $(npm -v)"
echo ""
echo "Add to ~/.zshrc:"
echo "  export PATH=\"$INSTALL_DIR/$NODE_PKG/bin:\$PATH\""
