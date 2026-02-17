import About from "../components/About.jsx";
import Contact from "../components/Contact.jsx";
import Hero from "../components/Hero.jsx";
import Navbar from "../components/Navbar.jsx";
import Projects from "../components/Projects.jsx";
import Skills from "../components/Skills.jsx";

const HomePage = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* UI */}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
};

export default HomePage;
