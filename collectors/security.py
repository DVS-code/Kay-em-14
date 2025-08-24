
from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
import time, hashlib, base64, os

router = APIRouter()

# In prod: use a DB or Redis! Here it's just in-memory.
active_sessions = {}  # session_token => {user, roles, expiry}
USERS = {
    "dvs":   {"pw_hash": "...", "roles": ["root"]},
    "ops":   {"pw_hash": "...", "roles": ["ops"]},
    "guest": {"pw_hash": "...", "roles": ["guest"]}
}

MFA_SECRET = os.environ.get("MFA_SECRET", "TEST_SECRET")  # Replace for prod
DEV_LOGIN = os.environ.get("DEV_LOGIN", "0") == "1"       # flag for bypass


def hash_pw(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


def verify_totp(token: str, secret: str) -> bool:
    # In real deployment: use pyotp.TOTP(secret).verify(token)
    return token == "123456"  # demo fallback


def create_session(user: str, roles: list[str]) -> str:
    token = base64.urlsafe_b64encode(os.urandom(24)).decode()
    active_sessions[token] = {
        "user": user,
        "roles": roles,
        "expiry": time.time() + 3600
    }
    return token


def require_roles(required: list[str]):
    def decorator(request: Request):
        token = request.cookies.get("session_token") or request.headers.get("Authorization")
        if not token or token not in active_sessions:
            raise HTTPException(status_code=401, detail="Auth required")

        session = active_sessions[token]
        if session["expiry"] < time.time():
            del active_sessions[token]
            raise HTTPException(status_code=401, detail="Session expired")

        user_roles = session["roles"]
        if not set(required).intersection(user_roles):
            raise HTTPException(status_code=403, detail="Forbidden")

        return session
    return decorator


@router.post("/login")
def login(username: str = "dvs", password: str = "", totp: str = "123456"):
    """
    Normal login in prod.
    In dev (DEV_LOGIN=1), auto-issue root session without auth.
    """
    if DEV_LOGIN:
        token = create_session("dvs", ["root", "ops", "guest"])
        resp = JSONResponse({"ok": True, "session_token": token, "dev": True})
        resp.set_cookie(
            "session_token",
            token,
            httponly=True,
            samesite="none",
            secure=False   # dev only
        )
        return resp

    # --- normal auth path ---
    user = USERS.get(username)
    if not user or user["pw_hash"] != hash_pw(password):
        raise HTTPException(status_code=401, detail="Bad auth")
    if not verify_totp(totp, MFA_SECRET):
        raise HTTPException(status_code=401, detail="Bad TOTP")

    token = create_session(username, user["roles"])
    resp = JSONResponse({"ok": True, "session_token": token})
    resp.set_cookie(
        "session_token",
        token,
        httponly=True,
        samesite="none",
        secure=False   # change to True in prod
    )
    return resp


@router.post("/logout")
def logout(request: Request):
    token = request.cookies.get("session_token")
    if token and token in active_sessions:
        del active_sessions[token]
    return {"ok": True}

