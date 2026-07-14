import { education, certificates } from '../data/portfolio';
import { SectionLabel } from './About';
import { GraduationCap, Award } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel num="06" title="Education & Certificates" />
        <div className="grid lg:grid-cols-2 gap-12 mt-12">
          <div>
            <h3 className="reveal text-lg font-display font-semibold text-white mb-6 flex items-center gap-2">
              <GraduationCap size={20} className="text-electric" /> Education
            </h3>
            <div className="relative pl-8">
              <div className="absolute left-2 top-2 bottom-2 w-[1px] bg-gradient-to-b from-electric/50 via-royal/30 to-transparent" />
              {education.map((e, i) => (
                <div key={e.title} className={`reveal reveal-delay-${i + 1} relative mb-8`}>
                  <div className="absolute -left-7 top-1.5 w-3 h-3 rounded-full bg-electric ring-4 ring-electric/20" />
                  <div className="text-xs font-mono text-electric/60">{e.period}</div>
                  <div className="mt-1 text-lg font-semibold text-white">{e.title}</div>
                  <div className="text-sm text-silver/50">{e.place}</div>
                  <p className="mt-2 text-sm text-silver/60 leading-relaxed">{e.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="reveal text-lg font-display font-semibold text-white mb-6 flex items-center gap-2">
              <Award size={20} className="text-royal" /> Certifications
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {certificates.map((c, i) => (
                <div
                  key={c.name}
                  className={`reveal reveal-delay-${(i % 4) + 1} glass-card rounded-2xl p-4 transition-transform duration-300 hover:-translate-y-1`}
                >
                  <div className="text-xs font-mono text-royal/60">{c.year}</div>
                  <div className="mt-1 text-sm font-medium text-white leading-snug">{c.name}</div>
                  <div className="text-xs text-silver/40 mt-1">{c.issuer}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
