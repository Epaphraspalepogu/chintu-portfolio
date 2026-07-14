import { useState, useEffect } from 'react';
import Background from './components/Background';
import Cursor from './components/Cursor';
import Preloader from './components/Preloader';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import GitHub from './components/GitHub';
import LeetCode from './components/LeetCode';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Terminal from './components/Terminal';
import AIAssistant from './components/AIAssistant';
import CommandPalette from './components/CommandPalette';
import Konami from './components/Konami';
import { useRevealAll } from './hooks/useReveal';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useRevealAll();

  // Re-run reveal observer after load completes (preloader covers content)
  useEffect(() => {
    if (!loaded) return;
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add('visible'); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [loaded]);

  return (
    <>
      <Preloader onDone={() => setLoaded(true)} />
      <Background />
      <Cursor />
      <Nav />
      <main className={`relative z-10 transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <GitHub />
        <LeetCode />
        <Education />
        <Contact />
        <Footer />
      </main>
      <Terminal />
      <AIAssistant />
      <CommandPalette />
      <Konami />
    </>
  );
}
