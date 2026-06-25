import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const ease = [0.25, 0.1, 0.25, 1];

const testimonials = [
  {
    quote: 'Working with Anirudh completely transformed our brand content. The edits weren\'t just clean — they were cinematic. Our engagement tripled within the first month.',
    name: 'Ananya Mehta',
    role: 'Founder, Studio Lux',
  },
  {
    quote: 'He doesn\'t just edit videos, he tells stories. Every cut has a purpose, every transition hits at exactly the right moment. Best editor I\'ve worked with.',
    name: 'Marcus Chen',
    role: 'Creative Director, Volta Media',
  },
  {
    quote: 'The turnaround time is insane. I sent footage at midnight, had a polished reel by morning. And the quality? Festival-grade. Every single time.',
    name: 'Priya Sharma',
    role: 'Content Lead, GrowthStack',
  },
  {
    quote: 'Anirudh has an intuition for pacing that most editors take years to develop. He understood our brand voice from day one and delivered beyond expectations.',
    name: 'David Park',
    role: 'CEO, Nomad Pictures',
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const containerRef = useRef(null);
  const [dragStart, setDragStart] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDragEnd = (_, info) => {
    if (info.offset.x < -50) {
      setActive(prev => Math.min(prev + 1, testimonials.length - 1));
    } else if (info.offset.x > 50) {
      setActive(prev => Math.max(prev - 1, 0));
    }
  };

  return (
    <section className="relative z-10 py-32 px-6 md:px-16 lg:px-24 bg-[#09090b] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-20"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-4">Kind Words</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">What Clients Say</h2>
        </motion.div>

        {/* Carousel */}
        <div ref={containerRef} className="relative">
          {/* Desktop: show 3, Mobile: show 1 */}
          <div className="hidden md:grid md:grid-cols-3 gap-4">
            {testimonials.slice(0, 3).map((t, i) => (
              <TestimonialCard key={i} testimonial={t} index={i} />
            ))}
          </div>

          {/* Mobile carousel */}
          <div className="md:hidden">
            <motion.div
              drag="x"
              dragConstraints={{ left: -((testimonials.length - 1) * 300), right: 0 }}
              onDragEnd={handleDragEnd}
              className="cursor-grab active:cursor-grabbing"
            >
              <motion.div
                animate={{ x: -active * 100 + '%' }}
                transition={{ duration: 0.5, ease }}
                className="flex"
              >
                {testimonials.map((t, i) => (
                  <div key={i} className="w-full flex-shrink-0 px-2">
                    <TestimonialCard testimonial={t} index={i} />
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2 h-2 transition-all duration-300 ${
                    active === i ? 'bg-white w-6' : 'bg-zinc-700'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-zinc-900 border border-zinc-800 p-8 flex flex-col justify-between hover:border-white transition-colors duration-300 group"
    >
      <div>
        <span className="text-6xl font-serif text-zinc-700 leading-none block mb-4">"</span>
        <p className="text-zinc-300 font-light italic leading-relaxed text-base mb-8">
          {testimonial.quote}
        </p>
      </div>
      <div>
        <div className="text-white text-xs mb-1">★★★★★</div>
        <p className="font-semibold text-white text-sm">{testimonial.name}</p>
        <p className="font-mono text-xs text-zinc-500 mt-0.5">{testimonial.role}</p>
      </div>
    </motion.div>
  );
}