import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import ScrollReveal from './ScrollReveal'

function DeliveryBag({ isInView }) {
  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ type: 'spring', stiffness: 100, damping: 15, mass: 1.2 }}
      className="relative"
    >
      <motion.div
        animate={isInView ? { y: [0, -15, 0, -8, 0] } : {}}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
      >
        <svg width="260" height="300" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Shadow */}
          <ellipse cx="100" cy="225" rx="60" ry="8" fill="#E8622A" opacity="0.15" />

          {/* Bag Body */}
          <rect x="25" y="55" width="150" height="165" rx="14" fill="#E8622A" />

          {/* Bag Highlight */}
          <rect x="25" y="55" width="150" height="165" rx="14" fill="url(#bagGrad)" />

          {/* Bag Handle */}
          <path d="M58 55 C58 25, 142 25, 142 55" stroke="#C44D1A" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M58 55 C58 25, 142 25, 142 55" stroke="#E8622A" strokeWidth="6" fill="none" strokeLinecap="round" />

          {/* Brand Circle */}
          <circle cx="100" cy="135" r="42" fill="white" opacity="0.12" />
          <circle cx="100" cy="135" r="32" fill="white" opacity="0.08" />

          {/* Brand Text */}
          <text x="100" y="130" textAnchor="middle" fill="white" fontSize="16" fontWeight="700" fontFamily="Inter, sans-serif" letterSpacing="0.5">
            Craving
          </text>
          <text x="100" y="150" textAnchor="middle" fill="white" fontSize="16" fontWeight="700" fontFamily="Inter, sans-serif" letterSpacing="0.5">
            Go
          </text>

          {/* Decorative Lines */}
          <line x1="50" y1="180" x2="150" y2="180" stroke="white" strokeWidth="1.5" opacity="0.15" />
          <line x1="60" y1="190" x2="140" y2="190" stroke="white" strokeWidth="1" opacity="0.1" />
          <line x1="70" y1="198" x2="130" y2="198" stroke="white" strokeWidth="0.75" opacity="0.08" />

          <defs>
            <linearGradient id="bagGrad" x1="25" y1="55" x2="175" y2="220" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="white" stopOpacity="0.15" />
              <stop offset="0.5" stopColor="white" stopOpacity="0" />
              <stop offset="1" stopColor="black" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </motion.div>
  )
}

const stats = [
  { value: '50K+', label: 'Meals Delivered', icon: '🍽️' },
  { value: '98%', label: 'On-Time Rate', icon: '⚡' },
  { value: '4.9★', label: 'Customer Rating', icon: '⭐' },
  { value: '30min', label: 'Avg Delivery', icon: '🚀' },
]

export default function Delivery() {
  const { isDark } = useTheme()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.25 })

  return (
    <section
      ref={sectionRef}
      id="delivery"
      className={`snap-section relative min-h-screen overflow-hidden ${
        isDark ? 'bg-bg-dark' : 'bg-bg-light'
      }`}
    >
      {/* Background Layer */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&h=900&fit=crop')`,
            opacity: isDark ? 0.08 : 0.06,
            filter: 'grayscale(100%) blur(1px)',
          }}
        />
        <div className={`absolute inset-0 ${
          isDark
            ? 'bg-gradient-to-b from-bg-dark via-bg-dark/95 to-bg-dark'
            : 'bg-gradient-to-b from-bg-light via-bg-light/95 to-bg-light'
        }`} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-32 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left max-w-xl">
            <ScrollReveal>
              <span className="inline-block text-brand-orange text-sm font-bold uppercase tracking-[0.2em] mb-4">
                Fast & Fresh
              </span>
              <h2 className={`text-[42px] sm:text-5xl md:text-6xl lg:text-[68px] font-bold leading-[1.05] tracking-tight ${
                isDark ? 'text-white' : 'text-text-light'
              }`}>
                To Your{' '}
                <span className="text-brand-orange relative">
                  Table
                  <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                    <path d="M2 6C40 2 80 2 100 4C120 6 160 6 198 2" stroke="#E8622A" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="mt-8 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-brand-orange/10 border border-brand-orange/20">
                <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                <span className="text-brand-orange text-sm font-semibold">
                  For An Incredible Healthy Life
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className={`mt-8 text-base sm:text-lg leading-relaxed ${
                isDark ? 'text-muted-dark' : 'text-muted-light'
              }`}>
                From our kitchen to your doorstep. Every meal is freshly prepared, carefully packaged, and delivered with care to ensure it arrives hot and ready to enjoy.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary px-8 py-4 text-base shadow-lg shadow-brand-orange/25"
                >
                  Track Your Order
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className={`btn-secondary px-8 py-4 text-base ${
                    isDark
                      ? 'bg-white/[0.05] text-white border-white/15 hover:bg-white/10'
                      : 'bg-black/[0.03] text-text-light border-black/10 hover:bg-black/[0.06]'
                  }`}
                >
                  Learn More
                </motion.button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right - Delivery Bag */}
          <div className="flex-1 flex items-center justify-center relative">
            {/* Glow behind bag */}
            <div className="absolute w-64 h-64 bg-brand-orange/15 rounded-full blur-[80px]" />
            <DeliveryBag isInView={isInView} />
          </div>
        </div>

        {/* Stats Row */}
        <ScrollReveal delay={0.4}>
          <div className="mt-20 sm:mt-24">
            <div className="text-center mb-8">
              <span className={`text-sm font-medium ${isDark ? 'text-muted-dark' : 'text-muted-light'}`}>
                Trusted by thousands
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -4 }}
                  className={`text-center p-6 sm:p-7 rounded-2xl transition-all duration-300 ${
                    isDark
                      ? 'bg-white/[0.03] border border-white/[0.06] hover:border-brand-orange/25 hover:bg-white/[0.05]'
                      : 'bg-white border border-black/[0.04] shadow-sm hover:shadow-lg hover:shadow-brand-orange/5'
                  }`}
                >
                  <span className="text-2xl mb-3 block">{stat.icon}</span>
                  <p className="text-3xl sm:text-4xl font-bold text-brand-orange">{stat.value}</p>
                  <p className={`text-xs sm:text-sm mt-2 font-medium ${isDark ? 'text-muted-dark' : 'text-muted-light'}`}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Footer */}
      <div className={`relative z-10 border-t ${
        isDark ? 'border-white/[0.06]' : 'border-black/[0.04]'
      }`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-text-light'}`}>
              Craving<span className="text-brand-orange">Go</span>
            </span>
            <span className={`text-xs ${isDark ? 'text-muted-dark/50' : 'text-muted-light/50'}`}>
              © 2026
            </span>
          </div>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Contact Support'].map(link => (
              <a
                key={link}
                href="#"
                className={`text-xs font-medium transition-colors duration-200 ${
                  isDark ? 'text-muted-dark/50 hover:text-white' : 'text-muted-light/50 hover:text-text-light'
                }`}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
