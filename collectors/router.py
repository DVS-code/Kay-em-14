import subprocess, os

def get_latency():
    targets = os.getenv("PING_TARGETS", "8.8.8.8,1.1.1.1").split(",")
    results = {}
    for target in targets:
        try:
            output = subprocess.check_output(["ping", "-c", "1", "-W","1", target], text=True)
            for line in output.splitlines():
                if "time=" in line:
                    latency = line.split("time=")[1].split(" ")[0]
                    results[target] = latency
        except subprocess.CalledProcessError:
            results[target] = "unreachable"
    return results

# compatibility alias for older server code
def ping():
    return get_latency()
