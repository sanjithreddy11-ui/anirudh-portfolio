import React from "react";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

const tickerItems = [
  "CINEMATOGRAPHY", "COLOR GRADING", "MOTION GRAPHICS", "SOUND DESIGN",
  "REELS", "SHORTS", "BRAND FILMS", "MUSIC VIDEOS", "STORYTELLING"
];

export default function HeroSection() {
  const tickerContent = tickerItems.join("  .  ") + "  .  ";

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-20">
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-white opacity-[0.08]" />
      
      <div className="relative z-10 flex flex-row items-center justify-between w-full max-w-6xl">
        
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-zinc-500" />
            <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              Visual Storyteller - Editor
            </p>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight leading-[0.9] mb-8 text-white">
            Anirudh<br />Rodda
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease }}
            className="text-zinc-400 font-light text-lg md:text-xl max-w-md leading-relaxed mb-10">
            I am a video editor who turns raw footage into cinematic stories.
            Every cut is intentional. Every frame has a purpose.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease }}
            className="flex flex-wrap gap-4 mb-16">
            <a href="#work"
              className="bg-white text-black font-bold px-8 py-3.5 text-sm tracking-wide transition-all duration-300 hover:bg-transparent hover:text-white border border-white hover:scale-[1.02]">
              View My Work
            </a>
            <a href="#contact"
              className="border border-white text-white font-bold px-8 py-3.5 text-sm tracking-wide transition-all duration-300 hover:bg-white hover:text-black hover:scale-[1.02]">
              Lets Talk
            </a>
          </motion.div>
        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-zinc-800 overflow-hidden py-4 mx-4 my-2">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap font-mono text-xs tracking-widest text-zinc-600">
          {tickerContent + tickerContent}
        </motion.div>
      </div>
    </section>
  );
}
