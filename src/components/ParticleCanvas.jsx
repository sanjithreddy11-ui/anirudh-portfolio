import React, { useRef, useEffect } from 'react';

export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let time = 0;

    const blobs = [
      { xPct: 0.18, yPct: 0.28, wPct: 0.50, hPct: 0.35, phase: 0 },
      { xPct: 0.72, yPct: 0.18, wPct: 0.45, hPct: 0.32, phase: 1.5 },
      { xPct: 0.55, yPct: 0.72, wPct: 0.55, hPct: 0.38, phase: 3.0 },
      { xPct: 0.10, yPct: 0.75, wPct: 0.42, hPct: 0.30, phase: 4.5 },
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 72; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.56,
        vy: (Math.random() - 0.5) * 0.56,
        size: Math.random() * 1.6 + 0.4,
        opacity: Math.random() * 0.18 + 0.04,
      });
    }

    const drawBlobs = () => {
      blobs.forEach(blob => {
        const driftX = Math.sin(time * 0.0004 + blob.phase) * 40;
        const driftY = Math.cos(time * 0.0005 + blob.phase) * 30;
        const cx = blob.xPct * canvas.width + driftX;
        const cy = blob.yPct * canvas.height + driftY;
        const rx = blob.wPct * canvas.width;
        const ry = blob.hPct * canvas.height;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(rx / 300, ry / 300);
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.028)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, 300, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    };

    const drawMesh = () => {
      // Connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            const lineOpacity = 0.06 * (1 - dist / 110);
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Particles
      particles.forEach(p => {
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawBlobs();

      // Update particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      drawMesh();

      time++;
      animationId = requestAnimationFrame(animate);
    };

    if (!prefersReduced) {
      animate();
    } else {
      drawBlobs();
      drawMesh();
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      />
      {/* Film grain */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
        aria-hidden="true"
      />
    </>
  );
}