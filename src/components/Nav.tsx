import { useEffect, useRef, useState } from 'react';
import { navItems } from '../data/portfolio';

export default function Nav() {
  const [active, setActive] = useState('home');
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 300);
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 200);
      last = y;
      const sections = navItems
        .map((n) => document.getElementById(n.id))
        .filter(Boolean) as HTMLElement[];
      const mid = y + window.innerHeight / 2;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop <= mid) { setActive(sections[i].id); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      {/* Desktop nav */}
      <nav
        className="fixed top-4 left-1/2 z-[500] hidden md:block"
        style={{
          transform: `translateX(-50%) translateY(${hidden ? '-80px' : '0'})`,
          opacity: mounted ? 1 : 0,
          transition: 'transform .4s ease, opacity .5s ease',
        }}
      >
        <div className="glass-strong rounded-full px-2 py-2 flex items-center gap-1 shadow-2xl">
          {navItems.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className="relative px-4 py-2 text-sm font-medium transition-colors"
              style={{ color: active === n.id ? '#fff' : 'rgba(203,213,225,0.7)' }}
            >
              {active === n.id && (
                <span className="absolute inset-0 rounded-full bg-white/10 border border-white/10" />
              )}
              <span className="relative z-10">{n.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile toggle */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed top-4 right-4 z-[600] md:hidden glass-strong rounded-full w-11 h-11 flex items-center justify-center"
        aria-label="Menu"
      >
        <div className="space-y-1.5">
          <span className="block w-5 h-[1.5px] bg-white transition-all duration-300" style={{ transform: open ? 'rotate(45deg) translateY(8px)' : '' }} />
          <span className="block w-5 h-[1.5px] bg-white transition-all duration-300" style={{ opacity: open ? 0 : 1 }} />
          <span className="block w-5 h-[1.5px] bg-white transition-all duration-300" style={{ transform: open ? 'rotate(-45deg) translateY(-8px)' : '' }} />
        </div>
      </button>

      {/* Mobile drawer */}
      <div
        className="fixed top-20 right-4 z-[600] md:hidden glass-strong rounded-2xl p-3 w-48"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0)' : 'translateY(-12px)',
          pointerEvents: open ? 'all' : 'none',
          transition: 'opacity .25s ease, transform .25s ease',
        }}
      >
        {navItems.map((n) => (
          <button
            key={n.id}
            onClick={() => go(n.id)}
            className={`block w-full text-left px-4 py-3 rounded-xl text-sm ${active === n.id ? 'bg-white/10 text-white' : 'text-silver/70'}`}
          >
            {n.label}
          </button>
        ))}
      </div>
    </>
  );
}
