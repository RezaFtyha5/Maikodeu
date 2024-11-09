'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['hero', 'about', 'services', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -50 && rect.top <= window.innerHeight / 2) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    sectionId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  const menuItems = [
    { id: 'hero', label: t('Home'), icon: '🏠' },
    { id: 'about', label: t('About'), icon: '👥' },
    { id: 'services', label: t('Services'), icon: '⚡' },
    { id: 'contact', label: t('Contact'), icon: '📱' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  const underlineVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1 }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between h-28">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <a 
              href="#hero"
              onClick={(e) => handleNavClick(e, 'hero')}
            >
              <Image 
                src="/images/logo1.png" 
                alt="Arfapro Logo" 
                width={200} 
                height={64}
                className="w-32 h-auto" // Memperbesar logo
              />
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex items-center space-x-10"
          >
            {menuItems.map((item) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                variants={itemVariants}
                className={`relative flex items-center gap-2 text-xl font-semibold transition-colors duration-300 ${
                  activeSection === item.id
                    ? 'text-blue-400'
                    : isScrolled ? 'text-gray-200' : 'text-white'
                } hover:text-blue-400`}
                style={{
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}
              >
                <span className="text-2xl">{item.icon}</span>
                {item.label}
                {/* Underline Indicator */}
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-1 bg-blue-400 rounded-full"
                  variants={underlineVariants}
                  initial="hidden"
                  animate={activeSection === item.id ? "visible" : "hidden"}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
            
            {/* Language Toggle */}
            <motion.button
              variants={itemVariants}
              onClick={toggleLanguage}
              className={`px-6 py-2 rounded-full text-lg font-semibold transition-colors duration-300 
                ${isScrolled ? 'text-gray-200' : 'text-white'} 
                bg-transparent border border-gray-200 hover:bg-blue-600 hover:text-white`}
            >
              {language === 'id' ? 'EN' : 'ID'}
            </motion.button>
          </motion.nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="text-white focus:outline-none"
              aria-label="Toggle Mobile Menu"
            >
              {/* Icon for mobile menu */}
              <svg 
                className="w-8 h-8 transition-transform duration-300 transform 
                  ${isMobileMenuOpen ? 'rotate-90' : 'rotate-0'}" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M4 6h16M4 12h16m-7 6h7" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }} 
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-black text-white overflow-hidden"
          >
            <motion.div 
              className="flex flex-col items-center py-4 space-y-4"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {menuItems.map((item) => (
                <motion.a 
                  key={item.id} 
                  href={`#${item.id}`} 
                  onClick={(e) => handleNavClick(e, item.id)} 
                  className={`relative flex items-center gap-2 text-lg font-bold transition-colors duration-300 ${
                    activeSection === item.id ? 'text-blue-400' : 'text-white'
                  } hover:text-blue-300`}
                  variants={itemVariants}
                >
                  <span className="text-2xl">{item.icon}</span>
                  {item.label}
                  {/* Underline Indicator */}
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-1 bg-blue-400 rounded-full"
                    variants={underlineVariants}
                    initial="hidden"
                    animate={activeSection === item.id ? "visible" : "hidden"}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
              <motion.button 
                onClick={toggleLanguage} 
                className="px-4 py-2 text-lg font-bold transition-colors duration-300 hover:text-blue-300"
                variants={itemVariants}
              >
                {language === 'id' ? 'EN' : 'ID'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
