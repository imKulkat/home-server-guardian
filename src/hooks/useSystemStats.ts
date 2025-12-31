import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@/config/api';

export interface SystemStats {
  hostname: string;
  uptime: number;
  cpu_percent: number;
  cpu_load: {
    '1m': number;
    '5m': number;
    '15m': number;
  };
  cpu_temperature: number | null;
  ram_total: number;
  ram_used: number;
  ram_free: number;
  disk_total: number;
  disk_used: number;
  disk_free: number;
  timestamp: string;
}

export function useSystemStats(refetchInterval = 5000) {
  return useQuery<SystemStats>({
    queryKey: ['system-stats'],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.system);
      if (!response.ok) {
        throw new Error('Failed to fetch system stats');
      }
      return response.json();
    },
    refetchInterval,
    retry: 3,
    staleTime: 2000,
  });
}
