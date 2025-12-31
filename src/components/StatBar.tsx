import { useEffect, useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface StatBarProps {
  label: string;
  value: number;
  icon: LucideIcon;
  unit?: string;
}

const StatBar = ({ label, value, icon: Icon, unit = '%' }: StatBarProps) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    // Smooth transition animation
    const step = (value - displayValue) / 10;
    if (Math.abs(step) < 0.5) {
      setDisplayValue(value);
      return;
    }
    const timer = setTimeout(() => {
      setDisplayValue(prev => prev + step);
    }, 30);
    return () => clearTimeout(timer);
  }, [value, displayValue]);

  const getColorClass = (val: number) => {
    if (val >= 90) return 'bg-destructive';
    if (val >= 70) return 'bg-warning';
    return 'bg-primary';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon className="w-4 h-4 text-primary" />
          <span>{label}</span>
        </div>
        <span className="text-primary font-medium tabular-nums">
          {Math.round(displayValue)}{unit}
        </span>
      </div>
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
        <div
          className={`h-full ${getColorClass(displayValue)} progress-glow rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${Math.min(displayValue, 100)}%` }}
        />
      </div>
    </div>
  );
};

export default StatBar;
