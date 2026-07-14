import { useEffect, useRef } from 'react';

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let stars: { x: number; y: number; z: number; r: number }[] = [];
    const count = Math.min(140, Math.floor((w * h) / 12000));
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 0.8 + 0.2,
        r: Math.random() * 1.4 + 0.3,
      });
    }
    let raf = 0;
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t += 0.0015;
      for (const s of stars) {
        const tw = 0.5 + 0.5 * Math.sin(t * 3 + s.x);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * s.z, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,220,255,${0.3 * s.z * tw})`;
        ctx.fill();
        s.y += 0.04 * s.z;
        if (s.y > h) { s.y = 0; s.x = Math.random() * w; }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-ink-950" />
      <div className="aurora-blob w-[60vw] h-[60vw] bg-electric/20 -top-[20%] -left-[10%] animate-aurora" />
      <div className="aurora-blob w-[50vw] h-[50vw] bg-royal/20 top-[30%] -right-[15%] animate-aurora" style={{ animationDelay: '-6s' }} />
      <div className="aurora-blob w-[40vw] h-[40vw] bg-cyan/15 bottom-[10%] left-[30%] animate-aurora" style={{ animationDelay: '-12s' }} />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="noise-overlay" />
    </div>
  );
}
