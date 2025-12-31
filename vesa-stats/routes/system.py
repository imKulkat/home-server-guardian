"""
System metrics endpoint
"""
from fastapi import APIRouter
from utils.system_stats import get_system_stats

router = APIRouter()


@router.get("/system")
async def get_system_metrics():
    """
    Get system metrics including:
    - hostname
    - uptime (seconds)
    - cpu_percent (overall CPU usage)
    - cpu_load (1m, 5m, 15m)
    - cpu_temperature (if available)
    - ram_total, ram_used, ram_free
    - disk_total, disk_used, disk_free (root filesystem)
    """
    return get_system_stats()
