import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.25, 0.1, 0.25, 1];

const items = [
  {
    num: '01',
    title: 'Story-First Thinking',
    body: 'Every edit starts with "what\'s the feeling?" not "what\'s the format?" The story drives every decision.',
  },
  {
    num: '02',
    title: 'Frame-Perfect Precision',
    body: 'No sloppy cuts. Every transition is intentional and invisible when it should be. The craft is in the details.',
  },
  {
    num: '03',
    title: 'Fast Turnaround',
    body: 'Revisions within 24–48 hours. Deadlines are non-negotiable. Your timeline is my timeline.',
  },
  {
    num: '04',
    title: 'Seamless Collaboration',
    body: 'Clear communication, shared folders, revision rounds built into every project. No surprises.',
  },
  {
    num: '05',
    title: 'Platform Native',
    body: 'I know what works on Instagram vs YouTube vs LinkedIn. Edits are optimized for where they live.',
  },
];

export default function WhySection() {
  return (
    <section className="relative z-10 py-32 px-6 md:px-16 lg:px-24 bg-[#18181b]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24">
        {/* Left — Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-4">Why Me</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Why Editors<br />Choose to Work<br />With Me
          </h2>
          <p className="text-zinc-400 font-light mt-6 max-w-sm leading-relaxed">
            It's not just about cutting footage. It's about building something that connects, converts, and stays in someone's head.
          </p>
        </motion.div>

        {/* Right — Items */}
        <div className="space-y-0">
          {items.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease }}
              className="flex gap-6 py-8 border-b border-zinc-700 last:border-b-0"
            >
              <span className="font-mono text-2xl text-zinc-700 font-bold shrink-0 w-10">{item.num}</span>
              <div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="font-light text-zinc-400 text-sm leading-relaxed">{item.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}