import ServiceCard from './ServiceCard';
import { getEnabledWidgets } from '@/config/widgets';

const ServiceDashboard = () => {
  const widgets = getEnabledWidgets();

  return (
    <section className="px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-primary/30" />
          <h2 className="text-sm uppercase tracking-[0.3em] text-primary">
            Service Dashboard
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-primary/30" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {widgets.map((widget) => (
            <ServiceCard
              key={widget.id}
              name={widget.name}
              description={widget.description}
              url={widget.url}
              icon={widget.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceDashboard;
