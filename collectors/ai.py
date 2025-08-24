from fastapi import APIRouter
router = APIRouter()

@router.get("/briefing", summary="Daily AI briefing")
def daily_briefing():
    return {"briefing": "No critical alerts. Systems nominal."}
