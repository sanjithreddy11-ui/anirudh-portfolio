import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Instagram, Youtube, Linkedin, Mail, MapPin, Clock } from 'lucide-react';

const ease = [0.25, 0.1, 0.25, 1];

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', type: '', budget: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="relative z-10 py-32 px-6 md:px-16 lg:px-24 bg-[#09090b]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24">
        {/* Left — Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-4">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-8">
            Let's Build<br />Something<br />Unforgettable.
          </h2>
          <p className="text-zinc-400 font-light leading-relaxed mb-10 max-w-sm">
            Have a project in mind? Let's talk about it. I take on select projects each month to ensure every client gets my full attention.
          </p>

          {/* Contact Details */}
          <div className="space-y-4 mb-10">
            <a href="mailto:hello@youreditor.com" className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors font-mono text-sm group">
              <Mail size={16} className="text-zinc-600 group-hover:text-white transition-colors" />
              hello@youreditor.com
            </a>
            <div className="flex items-center gap-3 text-zinc-400 font-mono text-sm">
              <MapPin size={16} className="text-zinc-600" />
              Available Worldwide · Remote
            </div>
            <div className="flex items-center gap-3 text-zinc-400 font-mono text-sm">
              <Clock size={16} className="text-zinc-600" />
              Response within 24 hours
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-6">
            {[
              { icon: Instagram, label: 'Instagram', href: '#' },
              { icon: Youtube, label: 'YouTube', href: '#' },
              { icon: Linkedin, label: 'LinkedIn', href: '#' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
              >
                <s.icon size={16} />
                <span className="hidden sm:inline font-light">{s.label}</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right — Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease }}
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-6"
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={e => updateField('name', e.target.value)}
                    required
                    className="w-full bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 px-4 py-3.5 text-sm font-light focus:border-white focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={e => updateField('email', e.target.value)}
                    required
                    className="w-full bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 px-4 py-3.5 text-sm font-light focus:border-white focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <select
                    value={form.type}
                    onChange={e => updateField('type', e.target.value)}
                    required
                    className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3.5 text-sm font-light focus:border-white focus:outline-none transition-colors appearance-none"
                  >
                    <option value="" disabled className="text-zinc-600">Project Type</option>
                    <option value="reels">Reels</option>
                    <option value="brand">Brand Film</option>
                    <option value="music">Music Video</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <select
                    value={form.budget}
                    onChange={e => updateField('budget', e.target.value)}
                    required
                    className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3.5 text-sm font-light focus:border-white focus:outline-none transition-colors appearance-none"
                  >
                    <option value="" disabled className="text-zinc-600">Budget Range</option>
                    <option value="under10k">Under ₹10k</option>
                    <option value="10k-50k">₹10k – ₹50k</option>
                    <option value="50k+">₹50k+</option>
                    <option value="discuss">Let's Discuss</option>
                  </select>
                </div>
                <div>
                  <textarea
                    rows={4}
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={e => updateField('message', e.target.value)}
                    required
                    className="w-full bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 px-4 py-3.5 text-sm font-light focus:border-white focus:outline-none transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-black font-bold py-4 text-sm tracking-wide border border-white hover:bg-transparent hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  Send Message
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease }}
                className="flex flex-col items-center justify-center py-20"
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5, ease }}
                  className="w-16 h-16 border border-white flex items-center justify-center mb-6"
                >
                  <motion.div
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <Check size={28} className="text-white" />
                  </motion.div>
                </motion.div>
                <h3 className="text-white font-bold text-xl mb-2">Message Sent</h3>
                <p className="text-zinc-400 font-light text-sm text-center">
                  I'll get back to you within 24 hours. Let's make something great.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}