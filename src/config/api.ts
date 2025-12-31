// Configure your vesa-stats backend URL here
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000';

export const API_ENDPOINTS = {
  system: `${API_BASE_URL}/system`,
  docker: `${API_BASE_URL}/docker`,
} as const;
