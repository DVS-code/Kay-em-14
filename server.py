from fastapi import Form
from fastapi import FastAPI, Depends, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from collectors import security, audit, system, nas, router, ai, pm2, systemd
import os

app = FastAPI()

# --- Middleware: log cookies on every request ---
@app.middleware("http")
async def log_cookies(request: Request, call_next):
    if request.cookies:
        print("🍪 Cookies received:", request.cookies)
    response = await call_next(request)
    return response

# --- CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Routers ---
app.include_router(security.router)

# --- Endpoints ---
@app.get("/system")
def get_system_status(session = Depends(security.require_roles(['root', 'ops', 'guest']))):
    d = system.get_stats()
    audit.append_audit(session['user'], "get_system_status", "ok", str(d))
    return d

@app.get("/nas")
def get_nas_summary(session = Depends(security.require_roles(['root', 'ops', 'guest']))):
    d = nas.get_storage()
    audit.append_audit(session['user'], "get_nas_summary", "ok", str(d))
    return d

@app.get("/latency")
def get_latency(session = Depends(security.require_roles(['root', 'ops', 'guest']))):
    d = router.get_latency()
    audit.append_audit(session['user'], "get_latency", "ok", str(d))
    return d

@app.get("/pm2")
def get_pm2_stats(session = Depends(security.require_roles(['root', 'ops', 'guest']))):
    stats = pm2.get_pm2_status()
    audit.append_audit(session['user'], "get_pm2_status", "ok", str(stats))
    return stats

@app.get("/systemd")
def get_systemd_stats(session = Depends(security.require_roles(['root', 'ops', 'guest']))):
    stats = systemd.get_systemd_status()
    audit.append_audit(session['user'], "get_systemd_status", "ok", str(stats))
    return stats

@app.post("/ai")
async def ai_terminal(user_input: str = Form(...), session = Depends(security.require_roles(['root', 'ops', 'guest']))):
    context = {
        "system": system.get_stats(),
        "nas": nas.get_storage(),
        "latency": router.get_latency(),
        "last_commands": audit.get_last_n(5),
    }
    out = ai.chat(user_input, context)
    audit.append_audit(session['user'], f"ai:{user_input}", "ok", out)
    return {"reply": out, "last_commands": context["last_commands"]}

# --- Dev-only session login ---
if os.environ.get("DEV_LOGIN", "0") == "1":
    @app.get("/dev/login")
    def dev_login():
        token = security.create_session("dvs", ["root", "ops", "guest"])
        resp = JSONResponse({"ok": True, "session_token": token})
        # Force SameSite=None in dev; Secure=False since no TLS locally
        resp.set_cookie(
            "session_token",
            token,
            httponly=True,
            samesite="none",
            secure=False
        )
        return resp

# --- Helper for setting cookies in dev ---
def set_dev_cookie(response: Response, key: str, value: str):
    response.set_cookie(
        key=key,
        value=value,
        httponly=True,
        samesite="none",
        secure=False
    )

