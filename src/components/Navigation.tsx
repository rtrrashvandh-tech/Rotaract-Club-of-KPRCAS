import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const clubLogo = "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411700/club-logo_wsjsmp.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Team', path: '/team' },
    { name: 'Events', path: '/events' },
    { name: 'Bulletin', path: '/bulletin' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Join Us', path: '/join' },
    { name: 'Contact', path: '/contact' },
  ];

  // Cinematic dark floating glassmorphic capsule globally for all pages
  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 transition-all duration-300 pointer-events-none">
      <nav
        className={`w-full max-w-7xl mx-auto rounded-full border transition-all duration-500 pointer-events-auto ${
          isScrolled || isOpen
            ? 'bg-black/75 backdrop-blur-xl border-white/10 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.6)] py-1.5 md:py-2 px-6'
            : 'bg-transparent border-transparent py-3 md:py-4 px-8 shadow-none'
        }`}
      >
        <div className="flex items-center justify-between h-12 md:h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src={clubLogo}
              alt="Rotaract Club Logo"
              className="h-9 w-9 md:h-11 md:w-11 transition-transform duration-500 group-hover:rotate-[360deg]"
            />
            <div className="hidden md:block">
              <h1 className="text-sm md:text-base font-extrabold tracking-tight text-white group-hover:text-gold transition-colors duration-300">
                Rotaract Club
              </h1>
              <p className="text-[10px] md:text-xs text-gray-400 font-medium tracking-widest uppercase -mt-0.5 group-hover:text-white transition-colors duration-300">
                KPRCAS
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-white/5 border border-white/5 p-1 rounded-full">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative px-4 py-1.5 rounded-full text-xs lg:text-sm font-semibold transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-gradient-to-r from-maroon to-red-700 rounded-full -z-10 shadow-[0_0_15px_rgba(128,0,0,0.5)] border border-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full text-white hover:bg-white/10 transition-colors duration-300"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-500 overflow-y-auto ${
            isOpen ? 'max-h-[75vh] pb-6 pt-4 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="space-y-1.5 pt-4 border-t border-white/10">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-5 py-3 text-sm font-semibold rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-maroon to-red-700 text-white shadow-[0_0_15px_rgba(128,0,0,0.4)] border border-white/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;