import HeroSection from '@/components/HeroSection';
import ServiceDashboard from '@/components/ServiceDashboard';
import SystemStats from '@/components/SystemStats';
import DockerStats from '@/components/DockerStats';
import AdminTools from '@/components/AdminTools';
import ProjectsSection from '@/components/ProjectsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background scanlines">
      {/* Grid background overlay */}
      <div className="fixed inset-0 grid-bg opacity-20 pointer-events-none" />

      <main className="relative z-10">
        <HeroSection />
        <ServiceDashboard />
        <SystemStats />
        <DockerStats />
        <AdminTools />
        <ProjectsSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
