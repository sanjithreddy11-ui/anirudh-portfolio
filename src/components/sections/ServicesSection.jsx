import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];

const IconCamera = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="white" strokeWidth="1.2">
    <rect x="3" y="12" width="22" height="16" />
    <path d="M25 16l12-5v18l-12-5z" />
  </svg>
);

const IconClapper = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="white" strokeWidth="1.2">
    <rect x="5" y="15" width="30" height="21" />
    <path d="M5 15l30-4v6l-30 4z" />
    <line x1="10" y1="12" x2="14" y2="18" />
    <line x1="18" y1="10" x2="22" y2="16" />
    <line x1="26" y1="8" x2="30" y2="14" />
  </svg>
);

const IconMusic = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="white" strokeWidth="1.2">
    <circle cx="10" cy="30" r="4" />
    <line x1="14" y1="30" x2="14" y2="8" />
    <path d="M14 8l12 4v6l-12-4z" />
    <path d="M28 20l7 6-7 6z" />
  </svg>
);

const IconSun = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="white" strokeWidth="1.2">
    <circle cx="20" cy="20" r="7" />
    <line x1="20" y1="4" x2="20" y2="8" />
    <line x1="20" y1="32" x2="20" y2="36" />
    <line x1="4" y1="20" x2="8" y2="20" />
    <line x1="32" y1="20" x2="36" y2="20" />
    <line x1="8.5" y1="8.5" x2="11" y2="11" />
    <line x1="29" y1="29" x2="31.5" y2="31.5" />
    <line x1="31.5" y1="8.5" x2="29" y2="11" />
    <line x1="11" y1="29" x2="8.5" y2="31.5" />
  </svg>
);

const IconGrid = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="white" strokeWidth="1.2">
    <rect x="5" y="5" width="13" height="13" />
    <rect x="22" y="5" width="13" height="13" />
    <rect x="5" y="22" width="13" height="13" />
    <rect x="22" y="22" width="13" height="13" />
  </svg>
);

const IconWave = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="white" strokeWidth="1.2">
    <line x1="6" y1="17" x2="6" y2="23" />
    <line x1="11" y1="13" x2="11" y2="27" />
    <line x1="16" y1="8" x2="16" y2="32" />
    <line x1="21" y1="14" x2="21" y2="26" />
    <line x1="26" y1="10" x2="26" y2="30" />
    <line x1="31" y1="16" x2="31" y2="24" />
  </svg>
);

const services = [
  {
    num: '01',
    title: 'Short-Form Reels',
    description: 'Instagram, TikTok, and YouTube Shorts edits engineered to stop the scroll. Fast-paced, rhythm-driven, platform-optimized.',
    tags: ['Instagram', 'TikTok', 'Shorts'],
    Icon: IconCamera,
  },
  {
    num: '02',
    title: 'Brand Films',
    description: 'Corporate and commercial video editing with narrative depth. Story-driven content that builds trust and drives action.',
    tags: ['Corporate', 'Commercial', 'Documentary'],
    Icon: IconClapper,
  },
  {
    num: '03',
    title: 'Music Video Editing',
    description: 'Rhythm-synced cuts and visual storytelling for artists. Every beat has a visual counterpart. Every transition serves the song.',
    tags: ['Sync Cuts', 'Mood', 'Artist Reels'],
    Icon: IconMusic,
  },
  {
    num: '04',
    title: 'Color Grading',
    description: 'Cinematic color work that sets the mood and defines the visual identity. From clean corporate to filmic grain.',
    tags: ['LUTs', 'DaVinci', 'Cinematic'],
    Icon: IconSun,
  },
  {
    num: '05',
    title: 'Motion Graphics',
    description: 'Titles, transitions, lower-thirds, animated elements. Everything moves with purpose and polish.',
    tags: ['After Effects', 'Titles', 'Animation'],
    Icon: IconGrid,
  },
  {
    num: '06',
    title: 'Sound Design',
    description: 'Atmospheric audio layering, clean dialogue mixing, and sound effects that make the visuals come alive.',
    tags: ['SFX', 'Mixing', 'Audition'],
    Icon: IconWave,
  },
];

function ServiceCard({ service, index }) {
  const { num, title, description, tags, Icon } = service;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease }}
      className="group relative bg-[#09090b] p-9 transition-colors duration-[250ms] hover:bg-[#111113]"
    >
      {/* Top row: number + arrow */}
      <div className="flex items-start justify-between mb-6">
        <span className="font-mono text-sm text-zinc-700 font-bold">{num}</span>
        <ArrowUpRight
          size={18}
          className="text-zinc-700 transition-all duration-[250ms] group-hover:text-white group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
        />
      </div>

      {/* Icon */}
      <div className="mb-6">
        <Icon />
      </div>

      {/* Title */}
      <h3
        className="font-bold text-white mb-3"
        style={{ fontSize: '17px', letterSpacing: '-0.01em' }}
      >
        {title}
      </h3>

      {/* Description */}
      <p className="font-light text-zinc-400 mb-6" style={{ fontSize: '13px', lineHeight: '1.7' }}>
        {description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="font-mono uppercase border border-zinc-800 px-2.5 py-1 text-zinc-500 transition-colors duration-[250ms] group-hover:border-zinc-600"
            style={{ fontSize: '10px' }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom sweep line */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-full bg-white origin-left scale-x-0 group-hover:scale-x-100"
        style={{ transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)' }}
      />
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="relative z-10 py-32 px-6 md:px-16 lg:px-24 bg-[#09090b]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease }}
          className="mb-20"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-4">— What I Do</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Services Built for{' '}
            <span style={{ WebkitTextStroke: '1.5px white', color: 'transparent' }}>
              Impact.
            </span>
          </h2>
        </motion.div>

        {/* Card grid — 3 cols × 2 rows, 1px gap, grid bg shows as thin lines */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1c1c1f]">
          {services.map((service, i) => (
            <ServiceCard key={service.num} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}