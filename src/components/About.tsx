import { useEffect, useRef, useState } from 'react';
import { about, stats } from '../data/portfolio';

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    let cur = 0;
    const step = value / 40;
    const id = setInterval(() => {
      cur += step;
      if (cur >= value) { cur = value; clearInterval(id); }
      setN(Math.floor(cur));
    }, 30);
    return () => clearInterval(id);
  }, [started, value]);
  return <span ref={ref}>{n}{suffix}</span>;
}

export function SectionLabel({ num, title }: { num: string; title: string }) {
  return (
    <div className="reveal flex items-center gap-4">
      <span className="font-mono text-sm text-electric/60">{num}</span>
      <span className="h-[1px] w-12 bg-white/20" />
      <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">{title}</h2>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel num="01" title="About" />
        <div className="grid md:grid-cols-2 gap-12 items-start mt-12">
          <div>
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className={`reveal reveal-delay-${i + 1} text-lg text-silver/70 leading-relaxed mb-6`}
              >
                {p}
              </p>
            ))}
            <div className="grid grid-cols-2 gap-3 mt-8">
              {about.highlights.map((h, i) => (
                <div
                  key={h}
                  className={`reveal reveal-delay-${(i % 4) + 1} glass rounded-xl px-4 py-3 text-sm text-silver/80 flex items-center gap-2`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-electric" />
                  {h}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`reveal reveal-delay-${(i % 4) + 1} glass-card rounded-2xl p-6 text-center`}
              >
                <div className="text-4xl font-display font-bold text-gradient">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-xs text-silver/50 tracking-wider uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
