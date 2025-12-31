# vesa-stats

Lightweight backend service that exposes real system metrics and Docker container stats for home server monitoring.

## Features

- **System Metrics** (`GET /system`)
  - Hostname, uptime, platform
  - CPU usage, load averages (1m, 5m, 15m)
  - CPU temperature (when available)
  - RAM: total, used, free, percentage
  - Disk: total, used, free, percentage

- **Docker Stats** (`GET /docker`)
  - Container name, ID, image, status
  - CPU percentage
  - Memory usage and limit
  - Network RX/TX bytes
  - Container uptime

## Quick Start

### Using Docker Compose (Recommended)

```bash
# Clone or copy the vesa-stats directory to your server
cd vesa-stats

# Create the proxy network if it doesn't exist
docker network create proxy

# Build and start
docker compose up -d

# Check logs
docker compose logs -f
```

### Manual Setup

```bash
# Install dependencies
pip install -r requirements.txt

# Run the server
python main.py
# or
uvicorn main:app --host 0.0.0.0 --port 9000
```

## API Endpoints

### Health Check
```
GET /
```
Returns: `{"status": "ok", "service": "vesa-stats"}`

### System Metrics
```
GET /system
```
Returns:
```json
{
  "timestamp": "2024-01-15T10:30:00.000000+00:00",
  "hostname": "homeserver",
  "platform": "Linux",
  "uptime": 86400.5,
  "cpu_percent": 15.2,
  "cpu_load": {
    "1m": 0.52,
    "5m": 0.48,
    "15m": 0.45
  },
  "cpu_temperature": 45.0,
  "ram_total": 17179869184,
  "ram_used": 8589934592,
  "ram_free": 8589934592,
  "ram_percent": 50.0,
  "disk_total": 500107862016,
  "disk_used": 250053931008,
  "disk_free": 250053931008,
  "disk_percent": 50.0
}
```

### Docker Container Stats
```
GET /docker
```
Returns:
```json
{
  "timestamp": "2024-01-15T10:30:00.000000+00:00",
  "container_count": 3,
  "containers": [
    {
      "name": "nginx",
      "id": "abc123",
      "image": "nginx:latest",
      "status": "running",
      "cpu_percent": 0.15,
      "memory_usage": 52428800,
      "memory_limit": 536870912,
      "memory_percent": 9.77,
      "network_rx": 1048576,
      "network_tx": 524288,
      "uptime": 86400.0
    }
  ]
}
```

## Configuration

### CORS
The following origins are allowed by default:
- `https://homepage.vesastar.top`
- `http://homepage.vesastar.top`
- `http://localhost:3000`
- `http://localhost:5173`

Edit `main.py` to modify allowed origins.

### Docker Socket Access

The service requires read-only access to `/var/run/docker.sock` to query container stats.

**Note:** Your user must be in the `docker` group:
```bash
sudo usermod -aG docker $USER
```

## Project Structure

```
vesa-stats/
├── main.py              # FastAPI application entry point
├── routes/
│   ├── __init__.py
│   ├── system.py        # /system endpoint
│   └── docker.py        # /docker endpoint
├── utils/
│   ├── __init__.py
│   ├── system_stats.py  # psutil-based system metrics
│   └── docker_stats.py  # Docker SDK-based container stats
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Requirements

- Python 3.10+
- Docker (for container stats)
- Linux (recommended for full feature support)

## Troubleshooting

### No CPU temperature available
Temperature sensors may not be available on all systems. The API returns `null` for `cpu_temperature` when sensors are unavailable.

### Docker connection error
Ensure:
1. Docker is running: `systemctl status docker`
2. Socket is accessible: `ls -la /var/run/docker.sock`
3. User is in docker group: `groups`

### Permission denied
If running outside Docker, ensure your user has access to the Docker socket:
```bash
sudo usermod -aG docker $USER
# Log out and back in for changes to take effect
```

## License

MIT
