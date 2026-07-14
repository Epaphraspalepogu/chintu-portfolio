import { useEffect, useRef, useState } from 'react';
import { skills } from '../data/portfolio';
import { SectionLabel } from './About';

function Ring({ level, color }: { level: number; color: string }) {
  const ref = useRef<SVGCircleElement>(null);
  const [animate, setAnimate] = useState(false);
  const r = 28;
  const c = 2 * Math.PI * r;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setAnimate(true); obs.disconnect(); } });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
      <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
      <circle
        ref={ref}
        cx="32" cy="32" r={r} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round"
        strokeDasharray={c}
        style={{
          strokeDashoffset: animate ? c - (c * level) / 100 : c,
          filter: `drop-shadow(0 0 4px ${color})`,
          transition: 'stroke-dashoffset 1.2s ease-out',
        }}
      />
    </svg>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel num="02" title="Skills" />
        <p className="reveal mt-4 text-silver/50 max-w-xl">A constellation of tools I use to design, build, and ship.</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
          {skills.map((s, i) => (
            <div
              key={s.name}
              className={`reveal reveal-delay-${(i % 4) + 1} glass-card rounded-2xl p-5 flex flex-col items-center text-center group transition-transform duration-300 hover:-translate-y-1.5 hover:scale-[1.03]`}
              data-cursor="hover"
            >
              <div className="relative">
                <Ring level={s.level} color={s.color} />
                <span className="absolute inset-0 flex items-center justify-center text-xs font-mono text-white font-semibold">
                  {s.level}%
                </span>
              </div>
              <div className="mt-3 font-medium text-white">{s.name}</div>
              <div className="text-[10px] text-silver/40 tracking-wider uppercase mt-1">{s.category}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
