"""
Docker container stats endpoint
"""
from fastapi import APIRouter, HTTPException
from utils.docker_stats import get_docker_stats

router = APIRouter()


@router.get("/docker")
async def get_docker_metrics():
    """
    Get Docker container stats including:
    - name
    - status
    - cpu_percent
    - memory_usage
    - memory_limit
    - network_rx
    - network_tx
    - uptime
    """
    try:
        return get_docker_stats()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
