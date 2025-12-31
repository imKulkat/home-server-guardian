"""
Docker container statistics utilities
"""
from datetime import datetime, timezone
from typing import Any

import docker
from docker.errors import DockerException


def parse_datetime(dt_string: str) -> datetime:
    """Parse Docker datetime string to datetime object"""
    # Handle different datetime formats from Docker
    try:
        # Remove nanoseconds if present (keep only microseconds)
        if '.' in dt_string:
            base, frac = dt_string.rsplit('.', 1)
            # Remove timezone indicator and truncate to 6 digits
            frac = frac.rstrip('Z')[:6]
            dt_string = f"{base}.{frac}Z"
        return datetime.fromisoformat(dt_string.replace('Z', '+00:00'))
    except Exception:
        return datetime.now(timezone.utc)


def calculate_cpu_percent(stats: dict) -> float:
    """
    Calculate CPU percentage from Docker stats.
    Uses the same formula as 'docker stats' command.
    """
    try:
        cpu_delta = (
            stats['cpu_stats']['cpu_usage']['total_usage'] -
            stats['precpu_stats']['cpu_usage']['total_usage']
        )
        system_delta = (
            stats['cpu_stats']['system_cpu_usage'] -
            stats['precpu_stats']['system_cpu_usage']
        )
        
        if system_delta > 0 and cpu_delta > 0:
            num_cpus = stats['cpu_stats'].get('online_cpus') or len(
                stats['cpu_stats']['cpu_usage'].get('percpu_usage', [1])
            )
            cpu_percent = (cpu_delta / system_delta) * num_cpus * 100.0
            return round(cpu_percent, 2)
    except (KeyError, TypeError, ZeroDivisionError):
        pass
    return 0.0


def get_network_stats(stats: dict) -> tuple[int, int]:
    """Extract network RX/TX bytes from container stats"""
    rx_bytes = 0
    tx_bytes = 0
    
    try:
        networks = stats.get('networks', {})
        for interface_stats in networks.values():
            rx_bytes += interface_stats.get('rx_bytes', 0)
            tx_bytes += interface_stats.get('tx_bytes', 0)
    except (KeyError, TypeError):
        pass
    
    return rx_bytes, tx_bytes


def get_container_uptime(container: Any) -> float:
    """Calculate container uptime in seconds"""
    try:
        started_at = container.attrs['State']['StartedAt']
        start_time = parse_datetime(started_at)
        now = datetime.now(timezone.utc)
        return round((now - start_time).total_seconds(), 2)
    except Exception:
        return 0.0


def get_docker_stats() -> dict:
    """
    Collect Docker container statistics.
    Returns a dictionary with container metrics.
    """
    try:
        client = docker.DockerClient(base_url='unix:///var/run/docker.sock')
    except DockerException as e:
        return {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "error": f"Failed to connect to Docker: {str(e)}",
            "containers": []
        }
    
    containers_data = []
    
    try:
        containers = client.containers.list()
        
        for container in containers:
            try:
                # Get real-time stats (stream=False for single snapshot)
                stats = container.stats(stream=False)
                
                # Calculate metrics
                cpu_percent = calculate_cpu_percent(stats)
                
                # Memory stats
                memory_stats = stats.get('memory_stats', {})
                memory_usage = memory_stats.get('usage', 0)
                memory_limit = memory_stats.get('limit', 0)
                
                # Network stats
                network_rx, network_tx = get_network_stats(stats)
                
                # Container uptime
                uptime = get_container_uptime(container)
                
                containers_data.append({
                    "name": container.name,
                    "id": container.short_id,
                    "image": container.image.tags[0] if container.image.tags else "unknown",
                    "status": container.status,
                    "cpu_percent": cpu_percent,
                    "memory_usage": memory_usage,
                    "memory_limit": memory_limit,
                    "memory_percent": round((memory_usage / memory_limit) * 100, 2) if memory_limit > 0 else 0,
                    "network_rx": network_rx,
                    "network_tx": network_tx,
                    "uptime": uptime,
                })
            except Exception as e:
                containers_data.append({
                    "name": container.name,
                    "id": container.short_id,
                    "status": container.status,
                    "error": str(e),
                })
    except DockerException as e:
        return {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "error": f"Failed to list containers: {str(e)}",
            "containers": []
        }
    finally:
        client.close()
    
    return {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "container_count": len(containers_data),
        "containers": containers_data,
    }
