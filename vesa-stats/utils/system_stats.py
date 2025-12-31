"""
System statistics utilities using psutil
"""
import platform
import socket
import time
from datetime import datetime, timezone
from typing import Optional

import psutil


def get_uptime_seconds() -> float:
    """Get system uptime in seconds"""
    return time.time() - psutil.boot_time()


def get_cpu_temperature() -> Optional[float]:
    """
    Get CPU temperature if available.
    Returns None if temperature sensors are not available.
    """
    try:
        temps = psutil.sensors_temperatures()
        if not temps:
            return None
        
        # Try common sensor names
        for name in ['coretemp', 'cpu_thermal', 'cpu-thermal', 'k10temp', 'zenpower']:
            if name in temps:
                # Return the first core temperature or the package temperature
                for entry in temps[name]:
                    if entry.current:
                        return round(entry.current, 1)
        
        # Fallback: return first available temperature
        for name, entries in temps.items():
            for entry in entries:
                if entry.current:
                    return round(entry.current, 1)
        
        return None
    except Exception:
        return None


def get_system_stats() -> dict:
    """
    Collect all system statistics.
    Returns a dictionary with system metrics.
    """
    # CPU stats
    cpu_percent = psutil.cpu_percent(interval=0.5)
    cpu_load = psutil.getloadavg()
    
    # Memory stats
    memory = psutil.virtual_memory()
    
    # Disk stats (root filesystem)
    disk = psutil.disk_usage('/')
    
    return {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "hostname": socket.gethostname(),
        "platform": platform.system(),
        "uptime": round(get_uptime_seconds(), 2),
        "cpu_percent": cpu_percent,
        "cpu_load": {
            "1m": round(cpu_load[0], 2),
            "5m": round(cpu_load[1], 2),
            "15m": round(cpu_load[2], 2),
        },
        "cpu_temperature": get_cpu_temperature(),
        "ram_total": memory.total,
        "ram_used": memory.used,
        "ram_free": memory.available,
        "ram_percent": memory.percent,
        "disk_total": disk.total,
        "disk_used": disk.used,
        "disk_free": disk.free,
        "disk_percent": disk.percent,
    }
