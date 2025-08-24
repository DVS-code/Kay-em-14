import subprocess
import json

def get_pm2_status():
    try:
        output = subprocess.check_output(["pm2","jlist"], text=True)
        procs = json.loads(output)
        result = []
        for proc in procs:
            result.append({
                "name": proc.get("name"),
                "pid": proc.get("pid"),
                "status": proc["pm2_env"].get("status"),
                "cpu": proc["monit"].get("cpu"),
                "memory": proc["monit"].get("memory"),
                "uptime": proc["pm2_env"].get("pm_uptime"),
                "restart": proc["pm2_env"].get("restart_time"),
            })
        return result
    except Exception as e:
        return {"error": str(e)}
# --- FastAPI router for pm2 ---
from fastapi import APIRouter
router = APIRouter()

@router.get("/")
def pm2_status():
    try:
        if "get_stats" in globals():
            return get_stats()
        elif "status" in globals():
            return status()
        else:
            return {"module": "pm2", "status": "ok"}
    except Exception as e:
        return {"error": str(e)}
