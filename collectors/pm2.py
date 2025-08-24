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