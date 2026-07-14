import { useEffect, useRef, useState } from 'react';
import { leetcodeStats } from '../data/portfolio';
import { SectionLabel } from './About';
import { Flame, Trophy } from 'lucide-react';

function ProgressRing({ value, total, color, label }: { value: number; total: number; color: string; label: string }) {
  const ref = useRef<SVGCircleElement>(null);
  const [animate, setAnimate] = useState(false);
  const pct = total > 0 ? (value / total) * 100 : 0;
  const r = 40;
  const c = 2 * Math.PI * r;
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setAnimate(true); obs.disconnect(); } });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
          <circle
            ref={ref}
            cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={c}
            style={{
              strokeDashoffset: animate ? c - (c * pct) / 100 : c,
              filter: `drop-shadow(0 0 6px ${color})`,
              transition: 'stroke-dashoffset 1.4s ease-out',
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-display font-bold text-white">{value}</span>
        </div>
      </div>
      <span className="text-xs text-silver/50 mt-2">{label}</span>
    </div>
  );
}

export default function LeetCode() {
  const s = leetcodeStats;
  return (
    <section id="leetcode" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel num="05" title="LeetCode" />
        <p className="reveal mt-4 text-silver/50 max-w-xl">DSA is a daily practice. {s.solved} problems and counting.</p>

        <div className="grid lg:grid-cols-3 gap-6 mt-12">
          <div className="reveal glass-card rounded-2xl p-6 lg:col-span-1">
            <div className="text-sm text-silver/60 mb-6">Solved by difficulty</div>
            <div className="flex justify-around">
              <ProgressRing value={s.easy} total={s.solved} color="#34d399" label="Easy" />
              <ProgressRing value={s.medium} total={s.solved} color="#fbbf24" label="Medium" />
              <ProgressRing value={s.hard} total={s.solved} color="#f87171" label="Hard" />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="glass rounded-xl p-3 flex items-center gap-2">
                <Flame size={18} className="text-orange-400" />
                <div>
                  <div className="text-lg font-bold text-white">{s.streak}</div>
                  <div className="text-[10px] text-silver/40 uppercase">Day Streak</div>
                </div>
              </div>
              <div className="glass rounded-xl p-3 flex items-center gap-2">
                <Trophy size={18} className="text-yellow-400" />
                <div>
                  <div className="text-lg font-bold text-white">#{s.ranking.toLocaleString()}</div>
                  <div className="text-[10px] text-silver/40 uppercase">Ranking</div>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal reveal-delay-2 glass-card rounded-2xl p-6 lg:col-span-2">
            <div className="text-sm text-silver/60 mb-6">Problems by category</div>
            <div className="space-y-4">
              {s.categories.map((cat, i) => {
                const max = Math.max(...s.categories.map((c) => c.count));
                return (
                  <CategoryBar key={cat.name} cat={cat} max={max} delay={i * 0.08} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryBar({ cat, max, delay }: { cat: { name: string; count: number; color: string }; max: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setW((cat.count / max) * 100), 100); obs.disconnect(); } });
    obs.observe(el); return () => obs.disconnect();
  }, [cat.count, max]);
  return (
    <div ref={ref}>
      <div className="flex items-center justify-between text-sm mb-1.5">
        <span className="text-silver/70">{cat.name}</span>
        <span className="font-mono text-xs text-silver/40">{cat.count}</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <div className="h-full rounded-full" style={{ background: cat.color, width: `${w}%`, transition: 'width 1s ease-out' }} />
      </div>
    </div>
  );
}
