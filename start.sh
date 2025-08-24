#!/usr/bin/env bash
set -euo pipefail

# Paths
BACKEND_DIR="$(pwd)"
FRONTEND_DIR="$BACKEND_DIR/ui"

echo "[BACKEND] Starting FastAPI server..."
source venv/bin/activate
uvicorn server:app --reload --host 0.0.0.0 --port 8000 &
BACK_PID=$!

echo "[FRONTEND] Starting Vite..."
cd "$FRONTEND_DIR"
npm run dev -- --host --port 5173 &
FRONT_PID=$!

# Wait for both
wait $BACK_PID $FRONT_PID

