import { useState } from 'react';
import { profile } from '../data/portfolio';
import { SectionLabel } from './About';
import { Mail, Github, Linkedin, Code2, Send, Check } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (form.message.trim().length < 10) e.message = 'Tell me a bit more';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: '', email: '', message: '' }); }, 3000);
  };

  const socials = [
    { icon: Github, label: 'GitHub', href: profile.socials.github },
    { icon: Linkedin, label: 'LinkedIn', href: profile.socials.linkedin },
    { icon: Code2, label: 'LeetCode', href: profile.socials.leetcode },
  ];

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionLabel num="07" title="Contact" />
        <p className="reveal mt-6 text-2xl sm:text-3xl font-display text-white max-w-xl leading-tight">
          Have a project in mind, or just want to say hello? Let's build something great.
        </p>

        <div className="grid md:grid-cols-5 gap-6 mt-12">
          <div className="reveal md:col-span-3">
            <form onSubmit={submit} className="glass-card rounded-3xl p-6 space-y-4">
              <Field label="Name" error={errors.name}>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-transparent text-white placeholder-silver/30 outline-none text-sm"
                  placeholder="Your name"
                />
              </Field>
              <Field label="Email" error={errors.email}>
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-transparent text-white placeholder-silver/30 outline-none text-sm"
                  placeholder="you@example.com"
                />
              </Field>
              <Field label="Message" error={errors.message}>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  className="w-full bg-transparent text-white placeholder-silver/30 outline-none text-sm resize-none"
                  placeholder="What's on your mind?"
                />
              </Field>
              <button
                type="submit"
                disabled={sent}
                className="w-full py-3 rounded-full bg-gradient-to-r from-electric to-royal text-ink-950 font-semibold text-sm flex items-center justify-center gap-2 glow-electric disabled:opacity-70 transition"
              >
                {sent ? (<><Check size={16} /> Message Sent</>) : (<>Send Message <Send size={14} /></>)}
              </button>
            </form>
          </div>

          <div className="md:col-span-2 space-y-3">
            <a href={`mailto:${profile.email}`} className="reveal reveal-delay-1 glass-card rounded-2xl p-5 flex items-center gap-3 hover:bg-white/5 transition block">
              <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-electric"><Mail size={18} /></div>
              <div>
                <div className="text-xs text-silver/40 uppercase tracking-wider">Email</div>
                <div className="text-sm text-white">{profile.email}</div>
              </div>
            </a>
            {socials.map((s, i) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className={`reveal reveal-delay-${i + 2} glass-card rounded-2xl p-5 flex items-center gap-3 hover:bg-white/5 transition block`}>
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-royal"><s.icon size={18} /></div>
                <div>
                  <div className="text-xs text-silver/40 uppercase tracking-wider">{s.label}</div>
                  <div className="text-sm text-white">@{profile.shortName}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs text-silver/50 uppercase tracking-wider">{label}</label>
        {error && <span className="text-[10px] text-red-400">{error}</span>}
      </div>
      <div className="glass rounded-xl px-4 py-3 focus-within:border-electric/40 transition">
        {children}
      </div>
    </div>
  );
}
