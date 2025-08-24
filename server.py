from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from collectors import system, security, audit, ai

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # lock down later if you want
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Each router's "" path becomes the prefix exactly:
app.include_router(system.router,   prefix="/api/system",   tags=["system"])
app.include_router(security.router, prefix="/api/security", tags=["security"])
app.include_router(audit.router,    prefix="/api/audit",    tags=["audit"])
app.include_router(ai.router,       prefix="/api/ai",       tags=["ai"])
