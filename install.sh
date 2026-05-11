#!/bin/bash

# CeejiyeLang Automatic Installation Script
# Works on Termux, Ubuntu, Debian, and Linux/macOS

echo "--- CeejiyeLang Rakibid ---"

# Detect environment
if [ -d "$PREFIX" ] && [ -x "$PREFIX/bin/pkg" ]; then
    echo "Deegaanka la ogaaday: Termux"
    PKG_MGR="pkg"
    INSTALL_CMD="pkg install -y"
    UPDATE_CMD="pkg update && pkg upgrade -y"
elif [ -x "$(command -v apt-get)" ]; then
    echo "Deegaanka la ogaaday: Debian/Ubuntu"
    PKG_MGR="apt"
    INSTALL_CMD="sudo apt-get install -y"
    UPDATE_CMD="sudo apt-get update"
else
    echo "Deegaanka la ogaaday: Linux/macOS"
    PKG_MGR="unknown"
fi

# Update packages
if [ "$PKG_MGR" != "unknown" ]; then
    echo "Cusboonaysiin nidaamka..."
    $UPDATE_CMD
fi

# Install Python and Git if missing
if ! command -v python3 &> /dev/null; then
    echo "Python lama helin. Rakibayaa..."
    if [ "$PKG_MGR" != "unknown" ]; then
        $INSTALL_CMD python3 python3-pip
    else
        echo "Fadlan rakib Python 3 ka hor intaadan sii wadin."
        exit 1
    fi
fi

# Install CeejiyeLang
echo "Rakibayaa CeejiyeLang..."
pip3 install .

echo "------------------------------------------"
echo "CeejiyeLang waa la rakibay!"
echo "Qor 'ceejiye' si aad u bilowdo."
echo "------------------------------------------"
