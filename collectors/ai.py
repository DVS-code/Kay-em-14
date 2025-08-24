import requests

state = {"mode": "idle"}
VALID_STATES = ["idle", "listening", "speaking", "thinking", "error"]

def get_state():
    return state

def set_state(new_mode: str):
    if new_mode in VALID_STATES:
        state["mode"] = new_mode
        return state
    return {"error": "invalid state"}

def get_last_n(n):
    try:
        with open("audit.log","r") as f:
            return f.readlines()[-n:]
    except Exception:
        return []

def chat(prompt, context):
    system_info = (
        f"System Status: {context['system']}\n"
        f"NAS Status: {context['nas']}\n"
        f"Latency: {context['latency']}\n"
        f"Recent Commands: {context['last_commands']}"
    )
    full_prompt = f"{system_info}\nUser: {prompt}"
    r = requests.post(
        "http://localhost:11434/api/generate",
        json={"model":"llama2", "prompt":full_prompt, "stream":False}
    )
    return r.json().get("response", "[No response]")

