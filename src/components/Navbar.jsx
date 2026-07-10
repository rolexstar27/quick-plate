import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Events', href: '#goals' },
  { label: 'Contact', href: '#contact' },
]

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function DishIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" stroke="#E8622A" strokeWidth="2.5" />
      <path d="M10 20 C10 14, 22 14, 22 20" stroke="#E8622A" strokeWidth="2" fill="none" />
      <circle cx="16" cy="16" r="3" fill="#E8622A" opacity="0.4" />
      <path d="M16 6 L16 8 M26 16 L24 16 M6 16 L8 16" stroke="#E8622A" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function MobileMenuIcon({ isOpen, isDark }) {
  return (
    <button
      className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
      aria-label="Toggle menu"
    >
      <motion.span
        animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        className={`block w-5 h-0.5 rounded-full ${isDark ? 'bg-white' : 'bg-text-light'}`}
      />
      <motion.span
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        className={`block w-5 h-0.5 rounded-full ${isDark ? 'bg-white' : 'bg-text-light'}`}
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        className={`block w-5 h-0.5 rounded-full ${isDark ? 'bg-white' : 'bg-text-light'}`}
      />
    </button>
  )
}

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? `${isDark ? 'glass-dark' : 'glass-light'} shadow-lg`
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <DishIcon />
            <span className={`text-[22px] font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-text-light'
            }`}>
              Craving<span className="text-brand-orange">Go</span>
            </span>
          </a>

          {/* Center Nav Links - Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-[15px] font-medium rounded-lg transition-all duration-200 group ${
                  isDark
                    ? 'text-white/70 hover:text-white hover:bg-white/5'
                    : 'text-text-light/70 hover:text-text-light hover:bg-black/[0.03]'
                }`}
              >
                {link.label}
                <span className="absolute bottom-0.5 left-4 right-4 h-0.5 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
              </a>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isDark
                  ? 'bg-white/10 hover:bg-white/15 text-amber-400'
                  : 'bg-black/[0.04] hover:bg-black/[0.08] text-brand-orange'
              }`}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDark ? 'moon' : 'sun'}
                  initial={{ rotate: -90, scale: 0, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  {isDark ? <MoonIcon /> : <SunIcon />}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* Current Customer */}
            <a
              href="#menu"
              className={`hidden lg:inline-flex text-[14px] font-medium px-3 py-2 rounded-lg transition-all duration-200 ${
                isDark
                  ? 'text-white/60 hover:text-white hover:bg-white/5'
                  : 'text-text-light/60 hover:text-text-light hover:bg-black/[0.03]'
              }`}
            >
              Current Customer?
            </a>

            {/* Order Now */}
            <a
              href="#menu"
              className="btn-primary px-5 py-2.5 text-[14px]"
            >
              Order Now
            </a>

            {/* Mobile Menu */}
            <MobileMenuIcon isOpen={mobileOpen} isDark={isDark} />
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
