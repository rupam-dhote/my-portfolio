import { useEffect, useState } from "react";
import { MenuIcon } from "lucide-react";
import { motion } from "framer-motion";
import MobileMenu from "./MobileMenu";
const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "#home" },
    { name: "About", path: "#about" },
    { name: "Projects", path: "#project" },
    { name: "Skills", path: "#skill" },
    { name: "Contact", path: "#cont" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isActive, setIsActive] = useState(0);

  const setActive = (index) => {
    setIsActive(index);
  };
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // to chage active status on scroll
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.path))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = navLinks.findIndex(
              (link) => link.path === `#${entry.target.id}`,
            );
            if (index !== -1) {
              setIsActive(index);
            }
          }
        });
      },
      {
        root: null,
        threshold: 0.2, // section is active when 40% visible
        rootMargin: "-70px 0px -40% 0px", // adjust for navbar height
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeIn" }}
      className={`fixed top-0 left-0 z-999 right-0 py-5  backdrop-blur-md md:backdrop-blur-xl ${scrolled ? "bg-transparent" : "bg-bg/20"}`}
    >
      <nav className="container mx-auto  border-none flex items-center justify-between px-4 md:px-6   transition-all duration-500  ">
        {/* Logo */}
        <a href="/" className="flex gap-1">
          <img src="/my-logo.png" className="h-4 md:h-6" alt="my logo" />
          <span className="bg-primary rounded-full h-1.5 w-1.5 self-end" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8 px-3 rounded-full bg-transparent shadow shadow-slate-500/40 py-2 backdrop-blur-md md:backdrop-blur-xl">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.path}
              className={`group tracking-wider flex flex-col gap-0.5 font-semibold px-2 transition-all duration-300 rounded-full  ${isActive === i ? "text-muted-fg  shadow-sm shadow-slate-500" : "text-white"}`}
              onClick={() => setActive(i)}
            >
              {link.name}
              {isActive !== i && (
                <div
                  className={`bg-linear-to-r from-indigo-400 via-indigo-500 to-indigo-400 h-0.5 w-0 group-hover:w-full transition-all duration-300 `}
                />
              )}
            </a>
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">
          <a href="#cont">
            <button className="px-5 py-2.5 rounded-full ml-4  cursor-pointer   shadow-slate-300 bg-linear-to-r from-indigo-500 via-indigo-600 to-indigo-700 text-white font-semibold hover:bg-linear-to-r hover:from-indigo-400 hover:via-indigo-500 hover:to-indigo-700 active:scale-95 transition-all duration-150 ">
              Hire Me
            </button>
          </a>
        </div>

        {/* Mobile Menu Button */}

        <div className="flex items-center gap-3 md:hidden">
          <MenuIcon
            className="text-fg cursor-pointer size-5"
            onClick={() => setIsMenuOpen(true)}
          />
        </div>

        {/* Mobile Menu */}

        <MobileMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onClick={(i) => setActive(i)}
          navLinks={navLinks}
          isActive={isActive}
        />
      </nav>
    </motion.header>
  );
};

export default Navbar;
