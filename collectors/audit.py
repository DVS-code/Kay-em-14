from fastapi import APIRouter

router = APIRouter()

@router.get("/incidents", summary="Audit incident list")
def list_incidents():
    # Empty list avoids UI blowups; replace with real log scan later.
    return {"incidents": []}
