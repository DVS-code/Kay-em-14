import subprocess
from fastapi import APIRouter

router = APIRouter()


def get_services():
    """
    Collect status of systemd services (basic summary).
    """
    try:
        # Get a concise list of active services
        result = subprocess.run(
            ["systemctl", "list-units", "--type=service", "--state=running", "--no-pager", "--no-legend"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            check=True,
        )

        services = []
        for line in result.stdout.strip().splitlines():
            parts = line.split(None, 4)  # split into columns: UNIT, LOAD, ACTIVE, SUB, DESCRIPTION
            if len(parts) >= 5:
                services.append({
                    "unit": parts[0],
                    "load": parts[1],
                    "active": parts[2],
                    "sub": parts[3],
                    "description": parts[4],
                })

        return {"services": services}

    except subprocess.CalledProcessError as e:
        return {"error": f"systemctl failed: {e.stderr.strip()}"}
    except Exception as e:
        return {"error": str(e)}


@router.get("/")
async def systemd_status():
    """
    API endpoint for running systemd services.
    """
    return get_services()


@router.get("/{service_name}")
async def service_status(service_name: str):
    """
    API endpoint for the status of a specific service.
    """
    try:
        result = subprocess.run(
            ["systemctl", "is-active", service_name],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
        )
        return {
            "service": service_name,
            "status": result.stdout.strip() if result.returncode == 0 else "inactive",
        }
    except Exception as e:
        return {"error": str(e)}

