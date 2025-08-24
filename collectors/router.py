# collectors/router.py
import subprocess
from fastapi import APIRouter

router = APIRouter()

def get_router_status():
    """Run a command to check router or network status (replace with real logic)."""
    try:
        # Example: ping gateway
        result = subprocess.run(
            ["ping", "-c", "1", "192.168.1.1"],
            capture_output=True, text=True
        )
        return {"status": "up" if result.returncode == 0 else "down"}
    except Exception as e:
        return {"status": "error", "detail": str(e)}

@router.get("/")
async def router_status():
    """Return current router/network status."""
    return get_router_status()

