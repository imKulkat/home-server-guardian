import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@/config/api';

export interface ContainerStats {
  name: string;
  status: string;
  cpu_percent: number;
  memory_usage: number;
  memory_limit: number;
  network_rx: number;
  network_tx: number;
  uptime: number;
}

export interface DockerStats {
  containers: ContainerStats[];
  timestamp: string;
}

export function useDockerStats(refetchInterval = 5000) {
  return useQuery<DockerStats>({
    queryKey: ['docker-stats'],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.docker);
      if (!response.ok) {
        throw new Error('Failed to fetch docker stats');
      }
      return response.json();
    },
    refetchInterval,
    retry: 3,
    staleTime: 2000,
  });
}
