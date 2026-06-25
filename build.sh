#!/usr/bin/env bash
# Exit on error
set -o errexit

echo "======================================"
echo "    Building ThinkDSA (Unified)       "
echo "======================================"

echo "1. Building Frontend (Next.js SPA)..."
cd frontend
npm install
npm run build
cd ..

echo "2. Installing Backend Dependencies..."
cd backend
pip install -r requirements.txt

echo "3. Installing Playwright Browsers..."
playwright install chromium
cd ..

echo "======================================"
echo "    Build Complete! Ready to serve.   "
echo "======================================"
