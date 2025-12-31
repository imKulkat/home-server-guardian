"""
vesa-stats: Lightweight system and Docker metrics API
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import system, docker

app = FastAPI(
    title="vesa-stats",
    description="Lightweight backend service exposing system metrics and Docker container stats",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://homepage.vesastar.top",
        "http://homepage.vesastar.top",
        "http://localhost:3000",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

# Include routers
app.include_router(system.router, tags=["System"])
app.include_router(docker.router, tags=["Docker"])


@app.get("/", tags=["Health"])
async def health_check():
    """Health check endpoint"""
    return {"status": "ok", "service": "vesa-stats"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=9000)
