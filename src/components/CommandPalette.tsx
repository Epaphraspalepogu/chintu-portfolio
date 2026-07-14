import { useEffect, useState } from 'react';
import { Search, CornerDownLeft } from 'lucide-react';
import { navItems } from '../data/portfolio';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const items = navItems.filter((n) => n.label.toLowerCase().includes(q.toLowerCase()));

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
    setQ('');
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[900] bg-black/60 backdrop-blur-md flex items-start justify-center pt-[20vh] px-6"
      style={{ animation: 'fadeInScale .25s ease-out' }}
      onClick={() => setOpen(false)}
    >
      <div
        className="glass-strong rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <Search size={16} className="text-silver/40" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Jump to section…"
            className="flex-1 bg-transparent outline-none text-sm text-white placeholder-silver/30"
          />
          <kbd className="text-[10px] text-silver/40 glass px-1.5 py-0.5 rounded">ESC</kbd>
        </div>
        <div className="p-2 max-h-64 overflow-y-auto">
          {items.length === 0 && <div className="px-3 py-6 text-center text-sm text-silver/40">No results</div>}
          {items.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-silver/70 hover:bg-white/10 hover:text-white transition"
            >
              {n.label}
              <CornerDownLeft size={14} className="text-silver/30" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
