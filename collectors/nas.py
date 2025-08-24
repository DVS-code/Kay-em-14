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
