import subprocess, os

def get_storage():
    try:
        mount = os.getenv("NAS_MOUNT", "/mnt/nas")
        result = subprocess.check_output(["df", "-h", mount], text=True).splitlines()
        if len(result) >= 2:
            parts = result[1].split()
            return {
                "filesystem": parts[0],
                "size": parts[1],
                "used": parts[2],
                "available": parts[3],
                "percent": parts[4],
                "mount": parts[5],
            }
        return {"error": "No NAS mount info"}
    except Exception as e:
        return {"error": str(e)}

# --- FastAPI router for nas ---
from fastapi import APIRouter
router = APIRouter()

@router.get("/")
def nas_status():
    try:
        if "get_stats" in globals():
            return get_stats()
        elif "status" in globals():
            return status()
        else:
            return {"module": "nas", "status": "ok"}
    except Exception as e:
        return {"error": str(e)}
