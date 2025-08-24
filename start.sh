#!/usr/bin/env bash
set -euo pipefail

echo "[BACKEND] Starting HTTPS server..."
cd "/home/dvs/botfarm/other projects/kay-em-hub"
source venv/bin/activate
uvicorn server:app --reload --host 0.0.0.0 --port 8000 \
  --ssl-keyfile=./certs/key.pem \
  --ssl-certfile=./certs/cert.pem &
BACK_PID=$!

echo "[FRONTEND] Starting Vite..."
cd ui
npm run dev &
FRONT_PID=$!

trap "kill $BACK_PID $FRONT_PID" SIGINT SIGTERM
wait
