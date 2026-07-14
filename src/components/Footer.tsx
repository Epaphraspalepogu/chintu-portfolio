import { profile } from '../data/portfolio';
import { Github, Linkedin, Code2, Mail } from 'lucide-react';

export default function Footer() {
  const socials = [
    { icon: Github, href: profile.socials.github },
    { icon: Linkedin, href: profile.socials.linkedin },
    { icon: Code2, href: profile.socials.leetcode },
    { icon: Mail, href: `mailto:${profile.email}` },
  ];
  return (
    <footer className="relative py-12 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-sm text-silver/40">
          © {new Date().getFullYear()} {profile.name}. Crafted with care.
        </div>
        <div className="flex items-center gap-3">
          {socials.map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full glass flex items-center justify-center text-silver/50 hover:text-white hover:scale-110 transition">
              <s.icon size={16} />
            </a>
          ))}
        </div>
        <div className="text-xs text-silver/30 font-mono">Built with React · TypeScript · Framer Motion</div>
      </div>
    </footer>
  );
}
