import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Timeline from "./components/sections/Timeline";
import ShellSection from "./components/sections/ShellSection";
import Contact from "./components/sections/Contact";

export default function App() {
  return (
    <>
      <a className="skip" href="#about-section">Skip to content</a>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <ShellSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
