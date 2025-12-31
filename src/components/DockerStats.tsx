import { Container, AlertCircle } from 'lucide-react';
import { useDockerStats } from '@/hooks/useDockerStats';

const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
};

const formatUptime = (seconds: number): string => {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
  return `${Math.floor(seconds / 86400)}d ${Math.floor((seconds % 86400) / 3600)}h`;
};

const DockerStats = () => {
  const { data, isLoading, isError, error } = useDockerStats(5000);

  return (
    <section className="px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-primary/30" />
          <h2 className="text-sm uppercase tracking-[0.3em] text-primary">
            Docker Containers
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-primary/30" />
        </div>

        {isError ? (
          <div className="cyber-card rounded-lg p-6">
            <div className="flex items-center gap-3 text-destructive">
              <AlertCircle className="w-5 h-5" />
              <span>Failed to fetch Docker stats: {error?.message}</span>
            </div>
          </div>
        ) : isLoading && !data ? (
          <div className="cyber-card rounded-lg p-6">
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        ) : data?.containers && data.containers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.containers.map((container) => {
              const memPercent = (container.memory_usage / container.memory_limit) * 100;
              const isRunning = container.status.toLowerCase().includes('running') || 
                               container.status.toLowerCase().includes('up');
              
              return (
                <div key={container.name} className="cyber-card rounded-lg p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-primary/10 border border-primary/20">
                        <Container className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-foreground font-medium text-sm">
                          {container.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Up {formatUptime(container.uptime)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-success status-online' : 'bg-destructive'}`} />
                      <span className="text-xs text-muted-foreground uppercase">
                        {isRunning ? 'Running' : 'Stopped'}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-3">
                    {/* CPU */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">CPU</span>
                        <span className="text-primary tabular-nums">{container.cpu_percent.toFixed(1)}%</span>
                      </div>
                      <div className="h-1 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(container.cpu_percent, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Memory */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Memory</span>
                        <span className="text-primary tabular-nums">
                          {formatBytes(container.memory_usage)} / {formatBytes(container.memory_limit)}
                        </span>
                      </div>
                      <div className="h-1 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            memPercent >= 90 ? 'bg-destructive' :
                            memPercent >= 70 ? 'bg-warning' : 'bg-primary'
                          }`}
                          style={{ width: `${Math.min(memPercent, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Network */}
                    <div className="flex justify-between text-xs pt-2 border-t border-primary/10">
                      <span className="text-muted-foreground">Network</span>
                      <div>
                        <span className="text-success">↓ {formatBytes(container.network_rx)}</span>
                        <span className="text-muted-foreground mx-1">/</span>
                        <span className="text-primary">↑ {formatBytes(container.network_tx)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="cyber-card rounded-lg p-6 text-center">
            <Container className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No running containers found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DockerStats;
