import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const ease = [0.16, 1, 0.3, 1];

const categories = ["All", "Car Deliveries", "Events & Weddings", "Devotional Events"];

const allProjects = [
  { title: "Reel ", category: "All", videoSrc: "/videos/all1.mp4" },
  { title: "Reel ", category: "All", videoSrc: "/videos/all2.mp4" },
  { title: "Reel ", category: "All", videoSrc: "/videos/all3.mp4" },
];

const categoryProjects = [
  { title: "Car Delivery ", category: "Car Deliveries", videoSrc: "/videos/car1.mp4" },
  { title: "Car Delivery ", category: "Car Deliveries", videoSrc: "/videos/car2.mp4" },
  { title: "Car Delivery ", category: "Car Deliveries", videoSrc: "/videos/car3.mp4" },
  { title: "Wedding Film ", category: "Events & Weddings", videoSrc: "/videos/wedding1.mp4" },
  { title: "Wedding Film ", category: "Events & Weddings", videoSrc: "/videos/wedding2.mp4" },
  { title: "Wedding Film ", category: "Events & Weddings", videoSrc: "/videos/wedding3.mp4" },
  { title: "Devotional Event ", category: "Devotional Events", videoSrc: "/videos/devotional1.mp4" },
  { title: "Devotional Event ", category: "Devotional Events", videoSrc: "/videos/devotional2.mp4" },
  { title: "Devotional Event ", category: "Devotional Events", videoSrc: "/videos/devotional3.mp4" },
];

function VideoCard({ project, cardWidth, onClick }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div
      className="flex-shrink-0 group cursor-pointer relative overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
      style={{ width: `${cardWidth}px`, aspectRatio: "9 / 11", borderRadius: "16px" }}
      onClick={onClick}
    >
      <video
        ref={videoRef}
        src={project.videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)" }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none">
        <p className="font-mono uppercase text-zinc-400 mb-1.5" style={{ fontSize: "10px" }}>{project.category}</p>
        <h3 className="font-bold text-white" style={{ fontSize: "16px" }}>{project.title}</h3>
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const containerRef = useRef(null);
  const controls = useAnimationControls();

  const filtered = activeCategory === "All"
    ? allProjects
    : categoryProjects.filter(p => p.category === activeCategory);

  const gap = 24;
  const sidePadding = 80;
  const totalSlides = Math.max(1, Math.ceil(filtered.length / cardsPerView));
  const innerWidth = Math.max(0, containerWidth - 2 * sidePadding);
  const cardWidth = Math.max(0, (innerWidth - (cardsPerView - 1) * gap) / cardsPerView);
  const slideWidth = cardsPerView * (cardWidth + gap);
  const maxTranslate = (totalSlides - 1) * slideWidth;

  useEffect(() => {
    const update = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
      const w = window.innerWidth;
      if (w < 640) setCardsPerView(1);
      else if (w < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const max = Math.max(0, Math.ceil(filtered.length / cardsPerView) - 1);
    const clamped = Math.min(currentSlide, max);
    setCurrentSlide(clamped);
    controls.start({ x: -clamped * slideWidth, transition: { duration: 0.4, ease } });
  }, [activeCategory, cardsPerView, containerWidth]);

  const goToSlide = (slide) => {
    const clamped = Math.max(0, Math.min(slide, totalSlides - 1));
    setCurrentSlide(clamped);
    controls.start({ x: -clamped * slideWidth, transition: { duration: 0.5, ease } });
  };

  const handleDragEnd = (e, info) => {
    const threshold = slideWidth / 4;
    if (info.offset.x < -threshold && currentSlide < totalSlides - 1) goToSlide(currentSlide + 1);
    else if (info.offset.x > threshold && currentSlide > 0) goToSlide(currentSlide - 1);
    else goToSlide(currentSlide);
  };

  return (
    <section id="work" className="relative z-10 py-32 bg-[#09090b]">
      <div className="text-center mb-12 px-6">
        <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-4">— Selected Work</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">The Reel.</h2>
        <p className="text-zinc-500 font-light text-sm">Explore work across categories</p>
      </div>

      <div className="flex justify-center mb-14 px-6">
        <div className="flex gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setCurrentSlide(0); }}
              className={`whitespace-nowrap transition-all duration-200 ${activeCategory === cat ? "bg-white text-black font-semibold" : "bg-transparent text-zinc-600 border border-zinc-800 hover:border-white hover:text-white"}`}
              style={{ borderRadius: "999px", padding: "10px 22px", fontSize: "13px" }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="relative" ref={containerRef}>
        <button
          onClick={() => goToSlide(currentSlide - 1)}
          disabled={currentSlide === 0}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-[52px] h-[52px] flex items-center justify-center bg-zinc-900/80 border border-zinc-700 text-white hover:bg-white hover:text-black hover:border-white transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ borderRadius: "50%" }}
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={() => goToSlide(currentSlide + 1)}
          disabled={currentSlide >= totalSlides - 1}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-[52px] h-[52px] flex items-center justify-center bg-zinc-900/80 border border-zinc-700 text-white hover:bg-white hover:text-black hover:border-white transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ borderRadius: "50%" }}
        >
          <ChevronRight size={22} />
        </button>

        <div className="overflow-hidden" style={{ padding: `0 ${sidePadding}px` }}>
          <motion.div
            drag="x"
            dragConstraints={{ left: -maxTranslate, right: 0 }}
            dragElastic={0.08}
            onDragEnd={handleDragEnd}
            animate={controls}
            className="flex"
            style={{ gap: `${gap}px`, cursor: "grab" }}
          >
            {filtered.map((project, i) => (
              <VideoCard
                key={`${project.title}-${i}`}
                project={project}
                cardWidth={cardWidth}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 mt-10">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className="transition-all duration-300"
            style={{
              width: i === currentSlide ? "24px" : "8px",
              height: "8px",
              borderRadius: "999px",
              background: i === currentSlide ? "#ffffff" : "#3f3f46"
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.4, ease }}
              className="relative w-full max-w-[900px]"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute -top-14 right-0 w-10 h-10 flex items-center justify-center bg-zinc-800 text-white hover:bg-white hover:text-black transition-colors"
                style={{ borderRadius: "50%" }}
              >
                <X size={20} />
              </button>
              <div className="relative w-full overflow-hidden bg-black" style={{ aspectRatio: "16 / 9" }}>
                <video
                  className="w-full h-full object-cover"
                  src={selectedProject.videoSrc}
                  autoPlay
                  controls
                  playsInline
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}