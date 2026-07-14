import { useEffect, useRef, useState } from 'react';
import { githubStats } from '../data/portfolio';
import { SectionLabel } from './About';
import { Github, Star, GitCommit, BookOpen } from 'lucide-react';

const heatColors = ['rgba(255,255,255,0.04)', 'rgba(56,189,248,0.3)', 'rgba(56,189,248,0.5)', 'rgba(56,189,248,0.75)', 'rgba(56,189,248,1)'];

function Heatmap() {
  const weeks = 52, days = 7;
  const cells: number[] = [];
  for (let i = 0; i < weeks * days; i++) {
    const v = Math.random();
    cells.push(v < 0.4 ? 0 : v < 0.6 ? 1 : v < 0.78 ? 2 : v < 0.92 ? 3 : 4);
  }
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="grid grid-rows-7 grid-flow-col gap-[3px] w-full overflow-hidden">
      {cells.map((c, i) => (
        <div
          key={i}
          className="w-full aspect-square rounded-[2px]"
          style={{
            background: heatColors[c],
            opacity: visible ? 1 : 0,
            transform: visible ? 'scale(1)' : 'scale(0)',
            transition: `opacity .4s ease ${(i / (weeks * days)) * 0.5}s, transform .4s ease ${(i / (weeks * days)) * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function GitHub() {
  const s = githubStats;
  const cards = [
    { icon: BookOpen, label: 'Repositories', value: s.repos },
    { icon: Star, label: 'Stars', value: s.stars },
    { icon: GitCommit, label: 'Commits', value: s.commits },
    { icon: Github, label: 'Contributions', value: s.contributions },
  ];
  return (
    <section id="github" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel num="04" title="GitHub" />
        <p className="reveal mt-4 text-silver/50 max-w-xl">Where the code lives. {s.username} · open source learner.</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {cards.map((c, i) => (
            <div key={c.label} className={`reveal reveal-delay-${(i % 4) + 1} glass-card rounded-2xl p-5 flex items-center gap-4`}>
              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-electric">
                <c.icon size={22} />
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-white">{c.value.toLocaleString()}</div>
                <div className="text-xs text-silver/40 uppercase tracking-wider">{c.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          <div className="reveal glass-card rounded-2xl p-6 lg:col-span-2">
            <div className="text-sm text-silver/60 mb-4">Contribution activity · last year</div>
            <Heatmap />
            <div className="flex items-center gap-2 mt-4 justify-end text-[10px] text-silver/40">
              Less
              {heatColors.map((c, i) => <span key={i} className="w-3 h-3 rounded-[2px]" style={{ background: c }} />)}
              More
            </div>
          </div>

          <div className="reveal reveal-delay-2 glass-card rounded-2xl p-6">
            <div className="text-sm text-silver/60 mb-4">Top Languages</div>
            <div className="flex h-3 rounded-full overflow-hidden">
              {s.topLanguages.map((l) => (
                <div key={l.name} style={{ width: `${l.pct}%`, background: l.color }} />
              ))}
            </div>
            <div className="mt-4 space-y-2">
              {s.topLanguages.map((l) => (
                <div key={l.name} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-silver/70">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
                    {l.name}
                  </span>
                  <span className="text-silver/40 font-mono text-xs">{l.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          {s.reposList.map((r, i) => (
            <a
              key={r.name}
              href={`https://github.com/${s.username}/${r.name}`}
              target="_blank"
              rel="noreferrer"
              className={`reveal reveal-delay-${(i % 2) + 1} glass-card rounded-2xl p-5 flex items-start gap-3 hover:bg-white/5 transition group`}
            >
              <Github size={18} className="text-silver/50 mt-0.5" />
              <div className="flex-1">
                <div className="font-mono text-sm text-white group-hover:text-electric transition">{r.name}</div>
                <div className="text-xs text-silver/50 mt-1">{r.desc}</div>
              </div>
              <div className="flex items-center gap-1 text-xs text-silver/40">
                <Star size={12} /> {r.stars}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
