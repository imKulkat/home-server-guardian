import { Server, Bot, LayoutDashboard, Workflow, HardDrive } from 'lucide-react';

const projects = [
  {
    name: 'Minecraft Server',
    description: 'Custom modded Minecraft server with automated backups and player management.',
    icon: Server,
    status: 'Active',
  },
  {
    name: 'JARVIS Multi-Agent System',
    description: 'AI-powered automation framework with multiple specialized agents working in concert.',
    icon: Bot,
    status: 'Development',
  },
  {
    name: 'Custom Dashboards',
    description: 'Bespoke monitoring dashboards for real-time system insights and analytics.',
    icon: LayoutDashboard,
    status: 'Active',
  },
  {
    name: 'Automation Pipelines',
    description: 'CI/CD workflows, scheduled tasks, and event-driven automation scripts.',
    icon: Workflow,
    status: 'Active',
  },
  {
    name: 'Home Server Architecture',
    description: 'Self-hosted infrastructure with redundancy, security, and modular service deployment.',
    icon: HardDrive,
    status: 'Active',
  },
];

const ProjectsSection = () => {
  return (
    <section className="px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-primary/30" />
          <h2 className="text-sm uppercase tracking-[0.3em] text-primary">
            Projects & Modules
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-primary/30" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <div
              key={project.name}
              className="cyber-card rounded-lg p-5 opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-md bg-primary/10 border border-primary/20">
                  <project.icon className="w-5 h-5 text-primary" />
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full border ${
                    project.status === 'Active'
                      ? 'border-success/30 text-success bg-success/10'
                      : 'border-primary/30 text-primary bg-primary/10'
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <h3 className="text-foreground font-medium mb-2">{project.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
