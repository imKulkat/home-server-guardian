import { useState } from 'react';
import { Settings, Gamepad2, Cloud, ChevronDown, Lock } from 'lucide-react';

const adminLinks = [
  {
    name: 'Webmin',
    description: 'Server configuration',
    url: 'https://webmin.vesastar.top',
    icon: Settings,
  },
  {
    name: 'AMP',
    description: 'Game server management',
    url: 'https://amp.vesastar.top',
    icon: Gamepad2,
  },
  {
    name: 'Cloudflare Zero Trust',
    description: 'Access management',
    url: '#',
    icon: Cloud,
  },
];

const AdminTools = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-primary/30" />
          <h2 className="text-sm uppercase tracking-[0.3em] text-primary">
            Admin Tools
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-primary/30" />
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full cyber-card rounded-lg p-4 flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-primary" />
            <span className="text-foreground font-medium">
              {isExpanded ? 'Hide Admin Panel' : 'Show Admin Panel'}
            </span>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-primary transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Admin Links Panel */}
        <div
          className={`overflow-hidden transition-all duration-500 ${
            isExpanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {adminLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-card rounded-lg p-4 flex items-center gap-3 group"
              >
                <div className="p-2 rounded-md bg-primary/10 border border-primary/20 group-hover:border-primary/40 transition-colors">
                  <link.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-foreground font-medium text-sm group-hover:text-primary transition-colors">
                    {link.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{link.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminTools;
