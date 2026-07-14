import { useEffect, useState } from 'react';

const SEQ = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export default function Konami() {
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === SEQ[idx]) {
        idx++;
        if (idx === SEQ.length) {
          idx = 0;
          setActive(true);
          setTimeout(() => setActive(false), 4000);
        }
      } else {
        idx = key === SEQ[0] ? 1 : 0;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!active) { setProgress(0); return; }
    let p = 0;
    const id = setInterval(() => {
      p += 2.5;
      if (p >= 100) { p = 100; clearInterval(id); }
      setProgress(p);
    }, 30);
    return () => clearInterval(id);
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[9500] flex items-center justify-center pointer-events-none" style={{ animation: 'fadeInScale .4s ease-out' }}>
      <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-xl" />
      <div className="relative text-center" style={{ animation: 'fadeInScale .5s ease-out' }}>
        <div className="text-6xl sm:text-8xl font-display font-black text-gradient mb-4">DEVELOPER MODE</div>
        <div className="font-mono text-sm text-cyan tracking-[0.3em]">UNLOCKED</div>
        <div className="mt-8 w-64 h-1 mx-auto bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-electric to-royal" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-4 text-xs text-silver/40">You found the secret. Nice reflexes.</div>
      </div>
    </div>
  );
}
