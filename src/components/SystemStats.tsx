import { Cpu, HardDrive, Activity, Thermometer, Clock, AlertCircle } from 'lucide-react';
import { useSystemStats } from '@/hooks/useSystemStats';
import StatBar from './StatBar';

const formatUptime = (seconds: number): string => {
  const days = Math.floor(seconds / (60 * 60 * 24));
  const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((seconds % (60 * 60)) / 60);
  return `${days}d ${hours}h ${minutes}m`;
};

const formatBytes = (bytes: number): string => {
  const gb = bytes / (1024 * 1024 * 1024);
  return `${gb.toFixed(1)} GB`;
};

const SystemStats = () => {
  const { data: stats, isLoading, isError, error } = useSystemStats(3000);

  const ramPercent = stats ? (stats.ram_used / stats.ram_total) * 100 : 0;
  const diskPercent = stats ? (stats.disk_used / stats.disk_total) * 100 : 0;

  return (
    <section className="px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-primary/30" />
          <h2 className="text-sm uppercase tracking-[0.3em] text-primary">
            System Status
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-primary/30" />
        </div>

        {isError ? (
          <div className="cyber-card rounded-lg p-6">
            <div className="flex items-center gap-3 text-destructive">
              <AlertCircle className="w-5 h-5" />
              <span>Failed to connect to vesa-stats backend: {error?.message}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Make sure your vesa-stats service is running and accessible.
            </p>
          </div>
        ) : (
          <div className="cyber-card rounded-lg p-6">
            {isLoading && !stats ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : stats ? (
              <>
                {/* Hostname */}
                <div className="mb-6 pb-4 border-b border-primary/10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">
                      Hostname
                    </span>
                    <span className="text-primary font-medium">{stats.hostname}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* CPU */}
                  <StatBar label="CPU Load" value={stats.cpu_percent} icon={Cpu} />

                  {/* RAM */}
                  <StatBar label="RAM Usage" value={ramPercent} icon={Activity} />

                  {/* Disk */}
                  <StatBar label="Disk Space" value={diskPercent} icon={HardDrive} />

                  {/* Temperature & Uptime */}
                  <div className="space-y-4">
                    {stats.cpu_temperature !== null && (
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Thermometer className="w-4 h-4 text-primary" />
                          <span>CPU Temp</span>
                        </div>
                        <span className={`font-medium tabular-nums ${
                          stats.cpu_temperature >= 80 ? 'text-destructive' :
                          stats.cpu_temperature >= 60 ? 'text-warning' : 'text-primary'
                        }`}>
                          {stats.cpu_temperature.toFixed(1)}°C
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>Uptime</span>
                      </div>
                      <span className="text-primary font-medium tabular-nums">
                        {formatUptime(stats.uptime)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Memory details */}
                <div className="mt-6 pt-4 border-t border-primary/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-muted-foreground">RAM Used</span>
                    <p className="text-foreground font-medium">{formatBytes(stats.ram_used)}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">RAM Total</span>
                    <p className="text-foreground font-medium">{formatBytes(stats.ram_total)}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Disk Used</span>
                    <p className="text-foreground font-medium">{formatBytes(stats.disk_used)}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Disk Total</span>
                    <p className="text-foreground font-medium">{formatBytes(stats.disk_total)}</p>
                  </div>
                </div>

                {/* Data flow indicator */}
                <div className="mt-6 pt-4 border-t border-primary/10">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-success status-online" />
                    <span>All systems operational</span>
                    <span className="ml-auto tabular-nums">Refresh: 3s</span>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
};

export default SystemStats;
