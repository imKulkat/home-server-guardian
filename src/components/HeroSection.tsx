import { useEffect, useState } from 'react';
import { useSystemStats } from '@/hooks/useSystemStats';

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  const { data: stats, isError } = useSystemStats();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isOnline = !isError && stats;

  return (
    <section className="relative min-h-[60vh] flex flex-col items-center justify-center px-4 py-20">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Content */}
      <div className={`relative z-10 text-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* System Online Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-success status-online' : 'bg-destructive'}`} />
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {isOnline ? 'System Online' : 'Connecting...'}
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
          <span className="text-primary neon-text">Vesastar</span>
          <span className="text-foreground"> Systems</span>
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 tracking-wide">
          Owner-controlled. Modular. Always online.
        </p>

        {/* Glowing Line */}
        <div className="w-full max-w-md mx-auto h-[2px] glow-line rounded-full" />

        {/* Decorative brackets */}
        <div className="mt-8 flex items-center justify-center gap-4 text-primary/50 text-sm">
          <span className="tracking-widest">{'[ '}</span>
          <span className="text-muted-foreground tracking-[0.2em]">COMMAND CENTER v2.0</span>
          <span className="tracking-widest">{' ]'}</span>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-primary/30" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-primary/30" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-primary/30" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-primary/30" />
    </section>
  );
};

export default HeroSection;
