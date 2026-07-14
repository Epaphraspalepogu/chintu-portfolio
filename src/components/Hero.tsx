import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/portfolio';

export default function Hero() {
  const roles = profile.roles;
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glow, setGlow] = useState({ x: '50%', y: '50%' });
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  // Typing effect
  useEffect(() => {
    const current = roles[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && typed.length < current.length) {
      timeout = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 70);
    } else if (!deleting && typed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1600);
    } else if (deleting && typed.length > 0) {
      timeout = setTimeout(() => setTyped(current.slice(0, typed.length - 1)), 35);
    } else if (deleting && typed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [typed, deleting, roleIdx, roles]);

  // Mouse spotlight + phone tilt
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setGlow({ x: `${x * 100}%`, y: `${y * 100}%` });
      setTilt({ rx: (y - 0.5) * -20, ry: (x - 0.5) * 30 });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const words = profile.name.split(' ');

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16">
      {/* Cursor spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-300"
        style={{ background: `radial-gradient(600px circle at ${glow.x} ${glow.y}, rgba(56,189,248,0.12), transparent 70%)` }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8 text-xs text-silver/70 tracking-widest uppercase"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)', transition: 'all .6s ease .2s' }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Available for opportunities
        </div>

        <h1 className="font-display font-bold leading-[0.95] tracking-tight">
          {words.map((w, i) => (
            <span
              key={i}
              className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-gradient"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(60px)',
                filter: mounted ? 'blur(0px)' : 'blur(12px)',
                transition: `opacity .8s ease ${0.3 + i * 0.15}s, transform .8s ease ${0.3 + i * 0.15}s, filter .8s ease ${0.3 + i * 0.15}s`,
              }}
            >
              {w}
            </span>
          ))}
        </h1>

        <div
          className="mt-8 h-9 flex items-center justify-center gap-2 font-mono text-lg sm:text-xl text-cyan"
          style={{ opacity: mounted ? 1 : 0, transition: 'opacity .6s ease 1s' }}
        >
          <span className="text-silver/40">&gt;</span>
          <span>{typed}</span>
          <span className="blink inline-block w-[2px] h-5 bg-cyan" />
        </div>

        <p
          className="mt-8 max-w-2xl mx-auto text-base sm:text-lg text-silver/60 leading-relaxed"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)', transition: 'all .6s ease 1.2s' }}
        >
          {profile.summary}
        </p>

        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)', transition: 'all .6s ease 1.4s' }}
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-7 py-3 rounded-full bg-gradient-to-r from-electric to-royal text-ink-950 font-semibold text-sm overflow-hidden glow-electric"
          >
            <span className="relative z-10">View My Work</span>
            <span className="absolute inset-0 bg-white/20 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3 rounded-full glass text-sm font-medium text-white hover:bg-white/10 transition"
          >
            Get in Touch
          </button>
        </div>
      </div>

      {/* Floating glass phone mockup */}
      <div
        ref={phoneRef}
        className="absolute right-[8%] top-1/2 -translate-y-1/2 hidden lg:block float-slow"
        style={{
          opacity: mounted ? 1 : 0,
          transform: `translateY(-50%) perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: 'opacity 1s ease 1.6s, transform .2s ease-out',
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="relative w-44 h-80 rounded-[2.5rem] glass-strong border border-white/15 p-2 shadow-2xl">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-black/60 z-10" />
          <div className="w-full h-full rounded-[2rem] bg-gradient-to-br from-ink-800 to-ink-900 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-electric/20 via-transparent to-royal/20" />
            <div className="absolute top-8 left-0 right-0 text-center px-3">
              <div className="text-[10px] text-silver/50 tracking-widest">PORTFOLIO</div>
              <div className="mt-2 text-2xl font-display font-bold text-gradient">PE</div>
              <div className="mt-1 text-[9px] text-silver/60">Software Engineer</div>
            </div>
            <div className="absolute bottom-6 left-3 right-3 space-y-1.5">
              {['MERN', 'Java', 'ML', 'DSA'].map((t, i) => (
                <div
                  key={t}
                  className="glass rounded-lg px-2 py-1 text-[9px] text-center text-cyan"
                  style={{ animation: `floatY 2s ease-in-out ${i * 0.3}s infinite alternate` }}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-silver/40"
        style={{ opacity: mounted ? 1 : 0, transition: 'opacity .6s ease 2s' }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="scroll-bob w-[1px] h-8 bg-gradient-to-b from-silver/40 to-transparent" />
      </div>
    </section>
  );
}
