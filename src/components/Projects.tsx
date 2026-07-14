import { useEffect, useRef, useState } from 'react';
import { projects } from '../data/portfolio';
import { SectionLabel } from './About';
import { Github, X } from 'lucide-react';

function TiltCard({ children, accent }: { children: React.ReactNode; accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  return (
    <div
      ref={ref}
      className="relative h-full"
      style={{ perspective: 1000 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        setTilt({ rx: (y - 0.5) * -16, ry: (x - 0.5) * 16 });
      }}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
    >
      <div className="absolute -inset-px rounded-3xl opacity-30 blur-xl" style={{ background: accent }} />
      <div
        className="relative h-full"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform .15s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel num="03" title="Selected Work" />
        <p className="reveal mt-4 text-silver/50 max-w-xl">A few projects I'm proud of — each one a study in performance, clarity, and craft.</p>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {projects.map((p, i) => (
            <div key={p.id} className={`reveal reveal-delay-${(i % 2) + 1}`}>
              <TiltCard accent={p.accent}>
                <div className="relative glass-card rounded-3xl p-6 overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20" style={{ background: p.accent }} />
                  <div className="flex items-start justify-between relative">
                    <div>
                      <div className="text-xs font-mono text-silver/40">PROJECT {String(i + 1).padStart(2, '0')}</div>
                      <h3 className="mt-1 text-2xl font-display font-bold text-white">{p.name}</h3>
                      <p className="text-sm text-silver/50 mt-1">{p.tagline}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full glass flex items-center justify-center" style={{ color: p.accent }}>
                      <span className="font-mono text-sm">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-silver/60 leading-relaxed">{p.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {p.tech.map((t) => (
                      <span key={t} className="text-[11px] px-2.5 py-1 rounded-full glass text-silver/70">{t}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-5">
                    {p.metrics.map((m) => (
                      <div key={m.label} className="text-center glass rounded-xl py-2">
                        <div className="text-sm font-display font-bold text-white">{m.value}</div>
                        <div className="text-[9px] text-silver/40 uppercase tracking-wider">{m.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 mt-5">
                    <button
                      onClick={() => setActive(i)}
                      className="text-xs px-4 py-2 rounded-full glass-strong text-white hover:bg-white/10 transition"
                    >
                      Case Study
                    </button>
                    <a href={p.github} target="_blank" rel="noreferrer" className="text-xs px-4 py-2 rounded-full glass text-silver/70 hover:text-white transition flex items-center gap-1.5">
                      <Github size={14} /> Code
                    </a>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[800] bg-black/70 backdrop-blur-md flex items-center justify-center p-6"
          style={{ animation: 'fadeInScale .3s ease-out' }}
          onClick={() => setActive(null)}
        >
          <div
            className="glass-strong rounded-3xl p-8 max-w-lg w-full relative"
            style={{ animation: 'fadeInScale .4s ease-out' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setActive(null)} className="absolute top-4 right-4 text-silver/50 hover:text-white">
              <X size={20} />
            </button>
            <h3 className="text-2xl font-display font-bold text-gradient">{projects[active].name}</h3>
            <p className="text-silver/60 mt-2">{projects[active].description}</p>
            <div className="mt-6">
              <div className="text-xs text-silver/40 uppercase tracking-wider mb-2">Key Highlights</div>
              <ul className="space-y-2">
                {projects[active].highlights.map((h) => (
                  <li key={h} className="text-sm text-silver/70 flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full" style={{ background: projects[active].accent }} />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {projects[active].tech.map((t) => (
                <span key={t} className="text-[11px] px-2.5 py-1 rounded-full glass text-silver/70">{t}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
