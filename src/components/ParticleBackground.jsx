import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let particles = [];
    let raf;
    const COUNT = 90;

    function accent() {
      return getComputedStyle(document.documentElement).getPropertyValue('--graph-rgb').trim() || '139,124,246';
    }

    function resize() {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.6,
      }));
    }

    function draw() {
      const W = canvas.offsetWidth, H = canvas.offsetHeight;
      const rgb = accent();
      ctx.clearRect(0, 0, W, H);

      particles.forEach((p) => {
        // gentle drift
        p.x += p.vx;
        p.y += p.vy;

        // subtle repulsion from the cursor
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < 14000) {
          const d = Math.sqrt(dist2) || 1;
          const force = (120 - d) / 120;
          p.x += (dx / d) * force * 1.2;
          p.y += (dy / d) * force * 1.2;
        }

        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},0.55)`;
        ctx.fill();
      });

      // faint connective lines for nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 8000) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${rgb},${0.12 * (1 - d2 / 8000)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    }
    function onLeave() {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    }

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);

    if (!reducedMotion) {
      draw();
    } else {
      // render a single static frame
      draw();
      cancelAnimationFrame(raf);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full opacity-70"
    />
  );
}
