# 🍎 Apple-Style Boilerplate for Debuild Architecture

## Design System: Apple's Minimalist Philosophy

**Core Principles:**
- Generous whitespace (padding: 120px+ on sections)
- Large, bold typography (64px+ headlines)
- Subtle, meaningful animations
- Content-first hierarchy
- Smooth scroll behavior
- Glass morphism effects

---

## 🎯 Section 1: HERO - Full Bleed Immersive

```jsx
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.2]);

  return (
    <motion.section
      className="relative h-screen w-full overflow-hidden bg-black"
      style={{ opacity }}
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ scale }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
        <img
          src="/hero-architecture.jpg"
          alt="Modern architecture"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.h1
          className="text-white text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Crafting Spaces
          <br />
          <span className="text-white/80">That Inspire</span>
        </motion.h1>

        <motion.p
          className="text-white/70 text-xl md:text-2xl max-w-2xl mb-12 font-light"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Award-winning architectural design firm in Kenya
          <br />
          transforming visions into timeless reality
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <AppleButton primary>Explore Projects</AppleButton>
          <AppleButton>Start Your Project</AppleButton>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// Apple-style Button Component
const AppleButton = ({ children, primary = false }) => (
  <motion.button
    className={`
      px-8 py-4 rounded-full text-lg font-medium
      transition-all duration-300
      ${primary
        ? 'bg-white text-black hover:bg-white/90'
        : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-xl'
      }
    `}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
  >
    {children}
  </motion.button>
);
```

**Key Apple Elements:**
- 100vh height, full-bleed image
- Parallax scroll effect (image zooms as you scroll)
- Fade out on scroll
- Large typography (9xl on desktop)
- Pill-shaped buttons with blur
- Animated scroll indicator

---

## 🎯 Section 2: STATS - Scroll-Triggered Counter

```jsx
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section
      ref={ref}
      className="py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <StatItem value={50} suffix="+" label="Projects Completed" isInView={isInView} />
          <StatItem value={12} suffix="" label="Years of Excellence" isInView={isInView} delay={0.1} />
          <StatItem value={15} suffix="+" label="Industry Awards" isInView={isInView} delay={0.2} />
          <StatItem value={98} suffix="%" label="Client Satisfaction" isInView={isInView} delay={0.3} />
        </div>
      </div>
    </section>
  );
};

const StatItem = ({ value, suffix, label, isInView, delay = 0 }) => {
  const count = useMotionValue(0);
  const rounded = useSpring(count, {
    stiffness: 50,
    damping: 30,
    duration: 2000
  });

  const [displayValue, setDisplayValue] = React.useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = count.set(value);
    }
  }, [isInView, value, count]);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return unsubscribe;
  }, [rounded]);

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="text-6xl lg:text-7xl font-semibold mb-3 tracking-tight">
        {displayValue}{suffix}
      </div>
      <div className="text-lg text-black/60 font-light">
        {label}
      </div>
    </motion.div>
  );
};
```

**Key Apple Elements:**
- Spring-based counter animation
- Generous vertical padding (32 = 128px)
- Large numbers (7xl = 72px)
- Light weight secondary text
- Stagger animation on scroll

---

## 🎯 Section 3: VISION & MISSION - Split Screen

```jsx
const VisionMissionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative py-32 bg-black text-white overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-sm uppercase tracking-widest text-white/40 mb-6 font-medium">
              Vision
            </div>
            <h2 className="text-5xl lg:text-6xl font-semibold leading-tight mb-8 tracking-tight">
              Building Kenya's
              <br />
              Architectural Future
            </h2>
            <p className="text-xl text-white/70 leading-relaxed font-light">
              To be Kenya's leading architectural firm, creating spaces that inspire,
              endure, and contribute positively to communities and the environment.
            </p>

            {/* Decorative line */}
            <motion.div
              className="h-px bg-gradient-to-r from-white/20 to-transparent mt-12"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              style={{ transformOrigin: 'left' }}
            />
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-sm uppercase tracking-widest text-white/40 mb-6 font-medium">
              Mission
            </div>
            <h2 className="text-5xl lg:text-6xl font-semibold leading-tight mb-8 tracking-tight">
              Excellence in
              <br />
              Every Detail
            </h2>
            <p className="text-xl text-white/70 leading-relaxed font-light">
              Deliver exceptional architectural solutions through innovative design,
              sustainable practices, and unparalleled client service.
            </p>

            {/* Decorative line */}
            <motion.div
              className="h-px bg-gradient-to-r from-white/20 to-transparent mt-12"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
              style={{ transformOrigin: 'left' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
```

**Key Apple Elements:**
- Full black background with subtle gradient
- Opposite slide-in animations
- Small caps labels (tracking-widest)
- Huge typography with tight line-height
- Decorative animated lines
- Light font weights for body text

---

## 🎯 Section 4: SERVICES - Hoverable Cards

```jsx
const ServicesSection = () => {
  const services = [
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

const ServiceCard = ({ service, index }) => {
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
```

**Key Apple Elements:**
- Rounded-3xl cards (24px border radius)
- Lift on hover (y: -8px)
- Icon wiggle animation
- Bullet points as circles
- Animated arrow CTA
- Generous internal padding (p-10)

---

## 🎯 Section 5: PROJECTS - Horizontal Scroll Gallery

```jsx
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ProjectsSection = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  const projects = [
    { title: 'Urban Villa Residence', category: 'Residential', year: '2024', color: '#1a1a1a' },
    { title: 'Tech Hub Nairobi', category: 'Commercial', year: '2023', color: '#2a2a2a' },
    { title: 'Eco Lodge Retreat', category: 'Sustainable', year: '2024', color: '#3a3a3a' },
    { title: 'Modern Loft Living', category: 'Residential', year: '2023', color: '#1a1a1a' },
    { title: 'Cultural Center', category: 'Cultural', year: '2024', color: '#2a2a2a' },
  ];

  return (
    <section ref={targetRef} className="relative py-32 bg-black text-white overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-6xl lg:text-7xl font-semibold mb-6 tracking-tight">
            Featured Projects
          </h2>
          <p className="text-xl text-white/60 font-light">
            Explore our portfolio of transformative architectural works
          </p>
        </motion.div>
      </div>

      {/* Horizontal Scrolling Gallery */}
      <motion.div
        className="flex gap-8 px-6"
        style={{ x }}
      >
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
        {/* Duplicate for seamless loop effect */}
        {projects.map((project, index) => (
          <ProjectCard key={`dup-${index}`} project={project} index={index} />
        ))}
      </motion.div>
    </section>
  );
};

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      className="flex-shrink-0 w-[500px] h-[600px] rounded-3xl overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
    >
      <div className="relative w-full h-full">
        {/* Image placeholder */}
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor: project.color }}
          whileHover={{ scale: 1.1, transition: { duration: 0.4 } }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </motion.div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-sm uppercase tracking-widest text-white/60 mb-3 font-medium">
              {project.category} • {project.year}
            </div>
            <h3 className="text-4xl font-semibold mb-4 tracking-tight">
              {project.title}
            </h3>
            <motion.div
              className="flex items-center gap-2 text-white group-hover:gap-3 transition-all"
              whileHover={{ x: 5 }}
            >
              View Project →
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
```

**Key Apple Elements:**
- Horizontal scroll controlled by vertical scroll
- Large cards (500x600px)
- Image scale on hover (overflow hidden)
- Bottom-gradient overlay
- Smooth parallax effect
- Category labels in small caps

---

## 🎯 Section 6: PROCESS - Vertical Timeline

```jsx
const ProcessSection = () => {
  const steps = [
    {
      num: '01',
      title: 'Discovery',
      description: 'Understanding your vision, needs, and project requirements through comprehensive consultation'
    },
    {
      num: '02',
      title: 'Design',
      description: 'Creating innovative solutions with detailed plans, 3D visualizations, and material selections'
    },
    {
      num: '03',
      title: 'Development',
      description: 'Bringing designs to life with precision engineering and quality craftsmanship'
    },
    {
      num: '04',
      title: 'Delivery',
      description: 'Ensuring your complete satisfaction with the final exceptional result'
    },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-6xl lg:text-7xl font-semibold mb-6 tracking-tight">
            Our Process
          </h2>
          <p className="text-xl text-black/60 font-light">
            A proven methodology that brings your vision to life
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-32">
          {steps.map((step, index) => (
            <ProcessStep key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProcessStep = ({ step, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className={`grid lg:grid-cols-2 gap-16 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Number */}
      <motion.div
        className={`${!isEven ? 'lg:order-2' : ''}`}
        whileInView={{ scale: [0.8, 1.05, 1] }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="text-[200px] lg:text-[280px] font-bold leading-none text-black/5 tracking-tighter">
          {step.num}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className={`${!isEven ? 'lg:order-1' : ''}`}
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <h3 className="text-5xl font-semibold mb-6 tracking-tight">
          {step.title}
        </h3>
        <p className="text-xl text-black/60 leading-relaxed font-light">
          {step.description}
        </p>

        {/* Progress bar */}
        <motion.div
          className="h-1 bg-black/10 rounded-full mt-8 overflow-hidden"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          style={{ transformOrigin: 'left' }}
        >
          <motion.div
            className="h-full bg-black"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
```

**Key Apple Elements:**
- Massive step numbers (280px font size) as background
- Alternating left/right layout
- Scale pulse animation on numbers
- Progress bar animation
- Generous vertical spacing (space-y-32)

---

## 🎯 Section 7: WAITLIST - Split CTA

```jsx
const WaitlistSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setStatus('success');
    setEmail('');

    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section className="py-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">
          {/* Waitlist */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-5xl lg:text-6xl font-semibold mb-6 tracking-tight">
              Join Our
              <br />
              Waitlist
            </h2>
            <p className="text-xl text-white/60 mb-12 font-light leading-relaxed">
              Get early access to new features, exclusive insights,
              and architectural inspiration delivered to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="relative">
              <motion.input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-8 py-5 text-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all"
                whileFocus={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.4)' }}
                disabled={status === 'loading' || status === 'success'}
              />

              <motion.button
                type="submit"
                className={`absolute right-2 top-1/2 -translate-y-1/2 px-8 py-3 rounded-full font-medium transition-all ${
                  status === 'success'
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-black hover:bg-white/90'
                }`}
                whileHover={status === 'idle' ? { scale: 1.05 } : {}}
                whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                disabled={status === 'loading' || status === 'success'}
              >
                {status === 'loading' && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    ⟳
                  </motion.div>
                )}
                {status === 'success' && '✓ Joined!'}
                {status === 'idle' && 'Subscribe'}
              </motion.button>
            </form>

            {status === 'success' && (
              <motion.p
                className="mt-4 text-green-400 text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Thanks! Check your email for confirmation.
              </motion.p>
            )}
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-5xl lg:text-6xl font-semibold mb-6 tracking-tight">
              Start Your
              <br />
              Project
            </h2>
            <p className="text-xl text-white/60 mb-12 font-light leading-relaxed">
              Ready to transform your vision into reality?
              Let's discuss your architectural needs.
            </p>

            <div className="space-y-6">
              <ContactItem icon="✉️" label="Email" value="hello@debuild.co.ke" />
              <ContactItem icon="📞" label="Phone" value="+254 712 345 678" />
              <ContactItem icon="📍" label="Location" value="Westlands, Nairobi" />
            </div>

            <motion.button
              className="mt-12 w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-8 py-5 text-lg font-medium hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Schedule Consultation →
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ContactItem = ({ icon, label, value }) => (
  <motion.div
    className="flex items-start gap-4"
    whileHover={{ x: 5, transition: { duration: 0.2 } }}
  >
    <span className="text-3xl">{icon}</span>
    <div>
      <div className="text-sm text-white/40 uppercase tracking-wider mb-1">{label}</div>
      <div className="text-lg">{value}</div>
    </div>
  </motion.div>
);
```

**Key Apple Elements:**
- Pill-shaped input with glass morphism
- Button inside input field
- Loading and success states
- Smooth state transitions
- Contact items with hover slide
- Backdrop blur effects

---

## 🎯 Section 8: FOOTER - Minimal & Clean

```jsx
const Footer = () => {
  const links = {
    company: ['About', 'Projects', 'Services', 'Team', 'Careers'],
    resources: ['Blog', 'Case Studies', 'Press Kit', 'Contact'],
    legal: ['Privacy', 'Terms', 'Cookies']
  };

  return (
    <footer className="bg-neutral-50 pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-3xl font-semibold mb-4 tracking-tight">
              Debuild
            </h3>
            <p className="text-black/60 leading-relaxed font-light">
              Crafting spaces that inspire, endure, and contribute positively
              to communities.
            </p>
          </div>

          {/* Links */}
          <FooterColumn title="Company" links={links.company} />
          <FooterColumn title="Resources" links={links.resources} />

          {/* Newsletter */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-black/40 mb-6 font-medium">
              Newsletter
            </h4>
            <p className="text-black/60 mb-6 font-light">
              Monthly design insights
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 bg-white rounded-full px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
              />
              <motion.button
                className="bg-black text-white rounded-full px-6 py-3 text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                →
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-black/40">
            © 2024 Debuild Architecture. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex gap-8">
            {links.legal.map((link, i) => (
              <motion.a
                key={i}
                href="#"
                className="text-sm text-black/40 hover:text-black transition-colors"
                whileHover={{ y: -2 }}
              >
                {link}
              </motion.a>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            {['Twitter', 'Instagram', 'LinkedIn'].map((social, i) => (
              <motion.a
                key={i}
                href="#"
                className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center text-sm hover:bg-black hover:text-white transition-all"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                {social[0]}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, links }) => (
  <div>
    <h4 className="text-sm uppercase tracking-wider text-black/40 mb-6 font-medium">
      {title}
    </h4>
    <ul className="space-y-4">
      {links.map((link, i) => (
        <motion.li key={i} whileHover={{ x: 5 }}>
          <a href="#" className="text-black/60 hover:text-black transition-colors font-light">
            {link}
          </a>
        </motion.li>
      ))}
    </ul>
  </div>
);
```

**Key Apple Elements:**
- Light gray background (neutral-50)
- Generous padding (pt-32)
- Uppercase section labels
- Circular social icons
- Hover lift on links
- Minimal border separators

---

## 🎨 Global Framer Motion Utilities

```jsx
// Reusable animation variants
export const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] // Apple's signature easing
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const scaleIn = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Custom hook for scroll progress
export const useScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return useTransform(scrollYProgress, [0, 1], [0, 100]);
};
```

This boilerplate gives you Apple's signature minimalist aesthetic with smooth, purposeful animations! 🍎✨