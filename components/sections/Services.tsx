"use client";

import { motion } from "framer-motion";

type Service = {
  icon: string;
  title: string;
  description: string;
  features: string[];
};

const services: Service[] = [
  {
    icon: '🏠',
    title: 'Residential Design',
    description: 'Custom homes that reflect your lifestyle and aspirations',
    features: ['Villa Design', 'Apartment Layouts', 'Interior Architecture']
  },
  {
    icon: '🏢',
    title: 'Commercial Projects',
    description: 'Functional spaces that drive business success',
    features: ['Office Complexes', 'Retail Spaces', 'Mixed-Use Development']
  },
  {
    icon: '🌿',
    title: 'Sustainable Architecture',
    description: 'Eco-conscious designs for a better tomorrow',
    features: ['Green Building', 'Energy Efficiency', 'LEED Certification']
  }
];

const Services = () => {

  return (
    <section className="py-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-6xl lg:text-7xl font-semibold mb-6 tracking-tight">
            Our Services
          </h2>
          <p className="text-xl text-black/60 max-w-2xl mx-auto font-light">
            Comprehensive architectural solutions tailored to your vision
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, index }: { service: typeof services[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="bg-white rounded-3xl p-10 h-full cursor-pointer group"
        whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
      >
        {/* Icon */}
        <motion.div
          className="text-6xl mb-8"
          whileHover={{
            rotate: [0, -10, 10, -10, 0],
            transition: { duration: 0.5 }
          }}
        >
          {service.icon}
        </motion.div>

        {/* Title */}
        <h3 className="text-3xl font-semibold mb-4 tracking-tight">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-lg text-black/60 mb-8 leading-relaxed font-light">
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {service.features.map((feature, i) => (
            <li key={i} className="flex items-center text-black/70 font-light">
              <span className="w-1.5 h-1.5 rounded-full bg-black mr-3" />
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <motion.div
          className="flex items-center text-black font-medium group-hover:gap-2 transition-all"
          initial={{ gap: 0 }}
        >
          Learn more
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export { ServiceCard, Services };

