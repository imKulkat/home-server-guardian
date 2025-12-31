import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, Container, FileCode, Terminal, Folder } from "lucide-react";

const Index = () => {
  const files = [
    { name: "main.py", desc: "FastAPI application entry point" },
    { name: "routes/system.py", desc: "/system endpoint" },
    { name: "routes/docker.py", desc: "/docker endpoint" },
    { name: "utils/system_stats.py", desc: "psutil-based system metrics" },
    { name: "utils/docker_stats.py", desc: "Docker SDK container stats" },
    { name: "requirements.txt", desc: "Python dependencies" },
    { name: "Dockerfile", desc: "Container build instructions" },
    { name: "docker-compose.yml", desc: "Compose configuration" },
    { name: "README.md", desc: "Documentation" },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Server className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">vesa-stats</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Lightweight backend service for system metrics and Docker stats
          </p>
          <div className="flex justify-center gap-2">
            <Badge variant="secondary">Python</Badge>
            <Badge variant="secondary">FastAPI</Badge>
            <Badge variant="secondary">Docker</Badge>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="h-5 w-5" />
              API Endpoints
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-lg bg-muted/50">
                <code className="text-sm font-mono text-primary">GET /system</code>
                <p className="text-sm text-muted-foreground mt-1">
                  CPU, RAM, disk usage, uptime, temperature
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <code className="text-sm font-mono text-primary">GET /docker</code>
                <p className="text-sm text-muted-foreground mt-1">
                  Container stats, CPU%, memory, network I/O
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Folder className="h-5 w-5" />
              Generated Files
            </CardTitle>
            <CardDescription>
              Copy the <code className="text-xs bg-muted px-1 py-0.5 rounded">vesa-stats/</code> folder to your server
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {files.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileCode className="h-4 w-4 text-muted-foreground" />
                    <code className="text-sm font-mono">{file.name}</code>
                  </div>
                  <span className="text-sm text-muted-foreground">{file.desc}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Container className="h-5 w-5" />
              Quick Start
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="p-4 rounded-lg bg-muted overflow-x-auto text-sm">
              <code>{`# On your server
cd vesa-stats
docker network create proxy
docker compose up -d

# Test endpoints
curl http://localhost:9000/system
curl http://localhost:9000/docker`}</code>
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
