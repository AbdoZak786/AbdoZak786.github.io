import { useState } from 'react';
import useTheme from './hooks/useTheme';
import Nav from './components/Nav';
import ScrollProgress from './components/ScrollProgress';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Extras from './components/Extras';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Toast from './components/Toast';

export default function App() {
  const { theme, setTheme } = useTheme();
  const [toast, setToast] = useState(false);

  const showToast = () => {
    setToast(true);
    window.setTimeout(() => setToast(false), 3200);
  };

  return (
    <div className="min-h-screen bg-bg text-ink">
      <ScrollProgress />
      <Nav theme={theme} setTheme={setTheme} />

      <main>
        <Hero />
        <About />
        <Timeline />
        <Projects />
        <Skills />
        <Extras />
        <Contact onSubmitted={showToast} />
      </main>

      <Footer />
      <Toast show={toast} message="Message sent — I'll get back to you soon." />
    </div>
  );
}
