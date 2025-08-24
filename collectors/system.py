from fastapi import APIRouter
router = APIRouter()

# Optional real metrics via psutil; otherwise fall back to None
try:
    import psutil  # type: ignore
except Exception:
    psutil = None

@router.get("", summary="Basic system metrics")
def get_system_metrics():
    cpu = ram = disk_root = None
    try:
        if psutil:
            cpu = psutil.cpu_percent(interval=None)
            ram = psutil.virtual_memory().percent
            disk_root = psutil.disk_usage("/").percent
    except Exception:
        pass
    return {"cpu": cpu, "ram": ram, "disk_root": disk_root}
