import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  name: string;
  description: string;
  url: string;
  icon: LucideIcon;
  status?: 'online' | 'offline';
}

const ServiceCard = ({ name, description, url, icon: Icon, status = 'online' }: ServiceCardProps) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="cyber-card rounded-lg p-5 block group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded-md bg-primary/10 border border-primary/20 group-hover:border-primary/40 transition-colors">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-success status-online' : 'bg-destructive'}`} />
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            {status}
          </span>
        </div>
      </div>

      <h3 className="text-foreground font-medium mb-1 group-hover:text-primary transition-colors">
        {name}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Bottom accent line */}
      <div className="mt-4 h-[1px] w-0 bg-primary group-hover:w-full transition-all duration-500" />
    </a>
  );
};

export default ServiceCard;
