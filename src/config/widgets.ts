import { Bot, Search, Settings, Gamepad2, Globe, Shield, BarChart3, LucideIcon } from 'lucide-react';

export interface Widget {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: LucideIcon;
  enabled?: boolean;
}

// Add new widgets here - just add an entry to this array!
export const widgets: Widget[] = [
  {
    id: 'ai-assistant',
    name: 'AI Assistant',
    description: 'OpenWebUI powered conversational AI',
    url: 'https://ai.vesastar.top',
    icon: Bot,
  },
  {
    id: 'search-engine',
    name: 'Search Engine',
    description: 'Private Whoogle search instance',
    url: 'https://search.vesastar.top',
    icon: Search,
  },
  {
    id: 'webmin',
    name: 'Webmin',
    description: 'Server administration panel',
    url: 'https://webmin.vesastar.top',
    icon: Settings,
  },
  {
    id: 'amp-game-manager',
    name: 'AMP Game Manager',
    description: 'Game server management',
    url: 'https://amp.vesastar.top',
    icon: Gamepad2,
  },
  {
    id: 'main-site',
    name: 'Main Site / Caddy',
    description: 'Primary web gateway',
    url: 'https://vesastar.top',
    icon: Globe,
  },
  {
    id: 'adguard-home',
    name: 'AdGuard Home',
    description: 'Network-wide ad blocking',
    url: '#',
    icon: Shield,
  },
  {
    id: 'crowdsec',
    name: 'CrowdSec Dashboard',
    description: 'Security monitoring',
    url: '#',
    icon: BarChart3,
  },
];

// Helper to get enabled widgets only
export const getEnabledWidgets = () => widgets.filter(w => w.enabled !== false);
