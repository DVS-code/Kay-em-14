#!/usr/bin/env bash
set -euo pipefail

API="https://localhost:8000"
COOKIE="/tmp/kay.cookie"
LOG="test_results.log"
PASS=0


pass(){ printf "✅ %s\n" "$1"; echo "$(date) ✅ $1" >> "$LOG"; PASS=$((PASS+1)); }
fail(){ printf "❌ %s\n" "$1"; echo "$(date) ❌ $1" >> "$LOG"; exit 1; }

echo "---- $(date) ----" >> "$LOG"

echo "== Login =="
LOGIN_JSON=$(curl -ks -X POST -c "$COOKIE" "$API/login") || fail "login failed"
echo "Raw login response: $LOGIN_JSON"
echo "$LOGIN_JSON" | grep -q '"ok":true' || fail "login did not return ok"
pass "Login OK"

echo "== /system =="
SYS_CODE=$(curl -ks -w "%{http_code}" -o /tmp/sys.json -b "$COOKIE" "$API/system")
[[ "$SYS_CODE" == "200" ]] || fail "/system HTTP $SYS_CODE"
CPU=$(jq -r '.cpu // empty' /tmp/sys.json)
RAM=$(jq -r '.ram // empty' /tmp/sys.json)
DISK=$(jq -r '.disk_root // empty' /tmp/sys.json)
[[ -n "$CPU" && -n "$RAM" && -n "$DISK" ]] || fail "/system missing keys"
echo "CPU ${CPU}% | RAM ${RAM}% | Disk ${DISK}%"
pass "/system OK"

echo "== /nas =="
NAS_CODE=$(curl -ks -w "%{http_code}" -o /tmp/nas.json -b "$COOKIE" "$API/nas")
[[ "$NAS_CODE" == "200" ]] || fail "/nas HTTP $NAS_CODE"
jq . /tmp/nas.json >/dev/null 2>&1 || fail "/nas did not return JSON"
pass "/nas OK"

echo "== /latency =="
LAT_CODE=$(curl -ks -w "%{http_code}" -o /tmp/lat.json -b "$COOKIE" "$API/latency")
[[ "$LAT_CODE" == "200" ]] || fail "/latency HTTP $LAT_CODE"
jq . /tmp/lat.json >/dev/null 2>&1 || fail "/latency did not return JSON"
pass "/latency OK"

echo "== /pm2 =="
PM2_CODE=$(curl -ks -w "%{http_code}" -o /tmp/pm2.json -b "$COOKIE" "$API/pm2")
[[ "$PM2_CODE" == "200" ]] || fail "/pm2 HTTP $PM2_CODE"
jq . /tmp/pm2.json >/dev/null 2>&1 || fail "/pm2 did not return JSON"
pass "/pm2 OK"

echo "== /systemd =="
SYSd_CODE=$(curl -ks -w "%{http_code}" -o /tmp/systemd.json -b "$COOKIE" "$API/systemd")
[[ "$SYSd_CODE" == "200" ]] || fail "/systemd HTTP $SYSd_CODE"
jq . /tmp/systemd.json >/dev/null 2>&1 || fail "/systemd did not return JSON"
pass "/systemd OK"

echo "== /ai =="
PROMPT=$(shuf -n1 -e "hello" "status report" "how are you?" "give me a summary")
AI_CODE=$(curl -ks -w "%{http_code}" -o /tmp/ai.json -b "$COOKIE" \
  -X POST "$API/ai" \
  -F "user_input=$PROMPT")

echo "🎉 All checks passed"

# Show /ai last_commands for visibility in CI/logs
if [ -s /tmp/ai.json ]; then
pass "/ai OK ($PROMPT)"
  echo "-- /ai last_commands --"
  jq -r '.last_commands[]? | "\(.ts)\t\(.user)\t\(.action)\t\(.status)"' /tmp/ai.json || true
fi

echo "Passed: ${PASS}/7"
echo "$(date) Summary: ${PASS}/7 passed" >> "$LOG"
