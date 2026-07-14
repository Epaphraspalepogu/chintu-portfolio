import { useEffect, useRef, useState } from 'react';
import { Sparkles, X, Send } from 'lucide-react';
import { profile, projects, skills, education, certificates } from '../data/portfolio';

type Msg = { role: 'user' | 'ai'; text: string };

const prompts = ['Tell me about Epaphras', 'Show projects', 'Skills', 'Experience', 'Education', 'Contact', 'Resume'];

function answer(q: string): string {
  const c = q.toLowerCase();
  if (c.includes('about') || c.includes('epaphras') || c.includes('who'))
    return `${profile.name} — ${profile.title}. ${profile.summary}`;
  if (c.includes('project') || c.includes('work'))
    return 'Featured projects:\n' + projects.map((p) => `• ${p.name} — ${p.tagline}`).join('\n');
  if (c.includes('skill'))
    return 'Core skills:\n' + skills.map((s) => `• ${s.name} (${s.level}%)`).join('\n');
  if (c.includes('experience') || c.includes('education'))
    return 'Education:\n' + education.map((e) => `• ${e.period} — ${e.title}, ${e.place}`).join('\n');
  if (c.includes('certificate'))
    return 'Certifications:\n' + certificates.map((c) => `• ${c.name} — ${c.issuer} (${c.year})`).join('\n');
  if (c.includes('contact'))
    return `Email: ${profile.email}\nGitHub: ${profile.socials.github}\nLinkedIn: ${profile.socials.linkedin}`;
  if (c.includes('resume'))
    return `${profile.name} — ${profile.title}\n${profile.summary}\nGitHub: ${profile.socials.github}\nLeetCode: ${profile.socials.leetcode}`;
  return "I can tell you about Epaphras's projects, skills, experience, education, or contact info. Try one of the suggested prompts!";
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: 'ai', text: "Hi! I'm Epaphras's assistant. Ask me anything about his work, skills, or background." },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, typing]);

  const send = (q: string) => {
    if (!q.trim()) return;
    setMsgs((m) => [...m, { role: 'user', text: q }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { role: 'ai', text: answer(q) }]);
      setTyping(false);
    }, 700);
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 left-6 z-[700] w-12 h-12 rounded-full glass-strong flex items-center justify-center text-royal hover:scale-110 transition glow-royal"
        aria-label="AI assistant"
      >
        {open ? <X size={20} /> : <Sparkles size={20} />}
      </button>

      {open && (
        <div
          className="fixed bottom-6 left-6 z-[800] w-[min(92vw,380px)] h-[min(70vh,520px)] glass-strong rounded-2xl overflow-hidden flex flex-col shadow-2xl"
          style={{ animation: 'fadeInScale .3s ease-out' }}
        >
          <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-royal to-electric flex items-center justify-center">
              <Sparkles size={16} className="text-ink-950" />
            </div>
            <div>
              <div className="text-sm font-medium text-white">Assistant</div>
              <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> online
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs whitespace-pre-wrap ${m.role === 'user' ? 'bg-gradient-to-br from-electric to-royal text-ink-950' : 'glass text-silver/80'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="glass rounded-2xl px-4 py-3 flex gap-1">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="w-1.5 h-1.5 rounded-full bg-silver/50" style={{ animation: `blink 1s ${d * 0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {msgs.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {prompts.map((p) => (
                <button key={p} onClick={() => send(p)} className="text-[10px] px-2.5 py-1 rounded-full glass text-silver/60 hover:text-white transition">
                  {p}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2 px-4 py-3 border-t border-white/10">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything…"
              className="flex-1 bg-transparent outline-none text-xs text-white placeholder-silver/30"
            />
            <button type="submit" className="text-electric"><Send size={16} /></button>
          </form>
        </div>
      )}
    </>
  );
}
