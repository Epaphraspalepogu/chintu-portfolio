import { useEffect, useRef, useState } from 'react';
import { Terminal as TermIcon, X } from 'lucide-react';
import { profile, projects, skills, education, certificates } from '../data/portfolio';

type Line = { type: 'in' | 'out'; text: string };

const help = `Available commands:
  help        show this list
  about       who I am
  projects    featured work
  skills      tech stack
  experience  education & timeline
  resume      quick summary
  contact     how to reach me
  github      github profile
  leetcode    leetcode profile
  clear       clear the screen`;

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<Line[]>([
    { type: 'out', text: 'macOS Terminal — epaphras@portfolio' },
    { type: 'out', text: 'Type "help" to begin.' },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [lines]);

  const run = (cmd: string) => {
    const c = cmd.trim().toLowerCase();
    const out: string[] = [];
    switch (c) {
      case 'help': out.push(help); break;
      case 'about': out.push(profile.summary); break;
      case 'projects': projects.forEach((p) => out.push(`${p.name} — ${p.tagline}  [${p.tech.join(', ')}]`)); break;
      case 'skills': skills.forEach((s) => out.push(`${s.name.padEnd(22)} ${'█'.repeat(Math.round(s.level / 10))} ${s.level}%`)); break;
      case 'experience': case 'education': education.forEach((e) => out.push(`${e.period}  ${e.title} — ${e.place}`)); break;
      case 'resume': out.push(`${profile.name} — ${profile.title}`); out.push(profile.summary); out.push(`Profiles: ${profile.socials.github} · ${profile.socials.leetcode}`); break;
      case 'contact': out.push(`Email: ${profile.email}`); out.push(`GitHub: ${profile.socials.github}`); out.push(`LinkedIn: ${profile.socials.linkedin}`); break;
      case 'github': out.push(`GitHub: ${profile.socials.github}`); break;
      case 'leetcode': out.push(`LeetCode: ${profile.socials.leetcode} — 480+ problems solved`); break;
      case 'certificates': certificates.forEach((c) => out.push(`${c.year}  ${c.name} — ${c.issuer}`)); break;
      case 'clear': setLines([]); return;
      case '': break;
      default: out.push(`command not found: ${c} — type "help"`);
    }
    setLines((l) => [...l, { type: 'in', text: cmd }, ...out.map((t) => ({ type: 'out' as const, text: t }))]);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[700] w-12 h-12 rounded-full glass-strong flex items-center justify-center text-electric hover:scale-110 transition glow-electric"
        aria-label="Open terminal"
      >
        <TermIcon size={20} />
      </button>

      {open && (
        <div
          className="fixed bottom-6 right-6 z-[800] w-[min(92vw,560px)] h-[min(60vh,420px)] glass-strong rounded-2xl overflow-hidden flex flex-col shadow-2xl"
          style={{ animation: 'fadeInScale .3s ease-out' }}
        >
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-black/30">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <span className="w-3 h-3 rounded-full bg-green-400/80" />
            </div>
            <span className="text-xs text-silver/50 font-mono ml-2">epaphras@portfolio — zsh</span>
            <button onClick={() => setOpen(false)} className="ml-auto text-silver/40 hover:text-white"><X size={16} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-relaxed">
            {lines.map((l, i) => (
              <div key={i} className={l.type === 'in' ? 'text-cyan' : 'text-silver/70'} style={{ whiteSpace: 'pre-wrap' }}>
                {l.type === 'in' ? <span className="text-electric/60">❯ </span> : null}{l.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); run(input); setInput(''); }}
            className="flex items-center gap-2 px-4 py-3 border-t border-white/10 bg-black/30"
          >
            <span className="text-electric font-mono text-xs">❯</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
              className="flex-1 bg-transparent outline-none font-mono text-xs text-white"
              placeholder="type a command…"
            />
          </form>
        </div>
      )}
    </>
  );
}
