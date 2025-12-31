import { Shield, Zap, Eye } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="px-4 py-12 mt-8 border-t border-primary/10">
      <div className="max-w-6xl mx-auto">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-medium text-primary neon-text mb-1">
              Vesastar Core
            </h3>
            <p className="text-xs text-muted-foreground">
              Owner-controlled infrastructure
            </p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-muted-foreground">Powered by Vesastar Core</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5">
              <Shield className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-muted-foreground">Cloudflare Tunnel Secured</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5">
              <Eye className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-muted-foreground">No ads. No tracking.</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-primary/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} Vesastar Systems. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-success status-online" />
              <span>System Status: Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
