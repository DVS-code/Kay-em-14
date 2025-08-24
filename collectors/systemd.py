import subprocess
def get_systemd_status(unit=None):
    try:
        cmd = ["systemctl", "list-units", "--type=service", "--state=running"]
        if unit:
            cmd = ["systemctl", "status", unit]
        output = subprocess.check_output(cmd).decode("utf-8")
        return {"result": output}
    except Exception as e:
        return {"error": str(e)}