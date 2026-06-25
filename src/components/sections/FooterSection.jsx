import React, { useState, useEffect } from 'react';
import { Instagram, Youtube, Linkedin } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

function SMPTEClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const ms = String(Math.floor(now.getMilliseconds() / (1000 / 24))).padStart(2, '0');
      setTime(`${h}:${m}:${s}:${ms}`);
    };
    tick();
    const interval = setInterval(tick, 42); // ~24fps
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="font-mono text-xs text-zinc-600 tabular-nums">{time}</span>
  );
}

export default function FooterSection() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 bg-[#09090b] border-t border-zinc-800 pt-16 pb-8 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <p className="font-mono font-bold text-white text-sm tracking-wider mb-3">Anirudh Rodda</p>
            <p className="text-zinc-500 font-light text-sm mb-6">Cuts that move people.</p>
            <div className="flex gap-4">
              {[
                { icon: Instagram, label: 'Instagram', href: '#' },
                { icon: Youtube, label: 'YouTube', href: '#' },
                { icon: Linkedin, label: 'LinkedIn', href: '#' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-zinc-600 hover:text-white hover:scale-110 transition-all duration-300"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-4">Navigation</p>
            <div className="space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="block text-zinc-400 font-light text-sm hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-4">Contact</p>
            <div className="space-y-3">
              <a href="mailto: crazyanirudhr1@gmail.com" className="block font-mono text-sm text-zinc-500 hover:text-white transition-colors">
                 crazyanirudhr1@gmail.com
              </a>
               <p className="font-mono text-sm text-zinc-600">+91 96762 33519</p>
              <p className="font-mono text-sm text-zinc-600">Available Worldwide · Remote</p>
              <div className="pt-2">
                <p className="font-mono text-xs text-zinc-700 mb-1 uppercase tracking-widest">Local Time</p>
                <SMPTEClock />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-zinc-600">
            © 2025 Anirudh Rodda. All rights reserved.
          </p>
          <p className="text-xs text-zinc-700 italic">
            Every frame tells a story.
          </p>
        </div>
      </div>
    </footer>
  );
}