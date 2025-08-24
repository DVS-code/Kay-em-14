#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo "[SETUP] Activating venv..."
source venv/bin/activate

echo "[START] Killing old processes..."
fuser -k 8000/tcp || true
pkill -f uvicorn || true
pkill -f "npm run dev" || true

echo "[START] Starting backend + frontend..."
DEV_LOGIN=1 ./start.sh &

# wait for backend to boot
echo "[WAIT] Waiting for backend readiness..."
for i in $(seq 1 30); do
  if curl -ks -X POST https://localhost:8000/login >/dev/null; then echo "[READY] Backend OK"; break; fi;
  printf "."; sleep 1;
  if [ "$i" -eq 30 ]; then echo; echo "❌ Backend not ready after 30s"; exit 1; fi;
done

echo "[TEST] Running test suite..."
./test_kayem.sh || { echo "❌ Tests failed. Check logs."; exit 1; }

echo "✅ All services up and verified!"
