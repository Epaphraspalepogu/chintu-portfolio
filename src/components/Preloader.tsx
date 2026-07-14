import { useEffect, useState } from 'react';

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 8 + 2;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setTimeout(() => setHiding(true), 400);
        setTimeout(onDone, 1000);
      }
      setProgress(Math.floor(p));
    }, 90);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-ink-950"
      style={{
        transition: 'opacity .6s ease, filter .6s ease',
        opacity: hiding ? 0 : 1,
        filter: hiding ? 'blur(16px)' : 'none',
        pointerEvents: hiding ? 'none' : 'all',
      }}
    >
      <div className="relative">
        <div className="preloader-logo w-24 h-24 rounded-2xl glass-strong flex items-center justify-center text-4xl font-display font-bold text-gradient">
          PE
        </div>
        <div className="preloader-ring absolute inset-0 rounded-2xl border border-electric/40" style={{ '--tw-ring-color': '#38bdf8' } as React.CSSProperties} />
      </div>
      <div className="mt-10 w-56 h-[2px] bg-white/10 overflow-hidden rounded-full">
        <div
          className="h-full bg-gradient-to-r from-electric to-royal transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-4 font-mono text-xs text-silver/60 tracking-[0.3em]">
        {progress}% · LOADING EXPERIENCE
      </div>
    </div>
  );
}
