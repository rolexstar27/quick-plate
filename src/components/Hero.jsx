import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

function PerspectiveGrid({ isDark }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 3D Grid */}
      <div className="absolute inset-0" style={{ perspective: '1000px' }}>
        <div
          className="absolute left-1/2 top-[60%] -translate-x-1/2"
          style={{
            width: '160%',
            height: '160%',
            transformStyle: 'preserve-3d',
            transform: 'rotateX(65deg) translateZ(-50px)',
          }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(${isDark ? 'rgba(232,98,42,0.12)' : 'rgba(232,98,42,0.08)'} 1px, transparent 1px),
                linear-gradient(90deg, ${isDark ? 'rgba(232,98,42,0.12)' : 'rgba(232,98,42,0.08)'} 1px, transparent 1px)
              `,
              backgroundSize: '70px 70px',
            }}
          />
        </div>
      </div>

      {/* Floating City Blocks */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-xl ${isDark ? 'bg-white/[0.04]' : 'bg-black/[0.04]'}`}
          style={{
            width: `${50 + i * 25}px`,
            height: `${70 + i * 18}px`,
            left: `${18 + i * 15}%`,
            bottom: `${8 + (i % 3) * 10}%`,
            border: `1px solid ${isDark ? 'rgba(232,98,42,0.15)' : 'rgba(232,98,42,0.1)'}`,
          }}
          animate={{
            y: [0, -8 - i * 3, 0],
          }}
          transition={{
            duration: 5 + i * 0.7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Glow Orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-brand-orange/5 rounded-full blur-[100px]" />
    </div>
  )
}

export default function Hero() {
  const { isDark } = useTheme()

  return (
    <section
      id="home"
      className={`snap-section relative min-h-screen flex items-center overflow-hidden ${
        isDark ? 'bg-bg-dark' : 'bg-bg-light'
      } ${isDark ? 'grid-texture-dark' : 'grid-texture-light'}`}
    >
      <PerspectiveGrid isDark={isDark} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/10 border border-brand-orange/20 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
            <span className="text-brand-orange text-sm font-semibold">Fresh Meals Daily</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`text-[40px] sm:text-5xl md:text-6xl lg:text-[72px] font-bold leading-[1.08] tracking-tight text-balance ${
              isDark ? 'text-white' : 'text-text-light'
            }`}
          >
            Chef-Made Meals That{' '}
            <span className="text-brand-orange">Fuel</span>{' '}
            Your Body and Your Community
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className={`mt-7 text-lg sm:text-xl leading-relaxed max-w-xl ${
              isDark ? 'text-muted-dark' : 'text-muted-light'
            }`}
          >
            Fresh, chef-made meals delivered daily. Tailored to your goals and your community.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a href="#menu" className="btn-primary px-8 py-4 text-base">
              Order Now
            </a>
            <a
              href="#about"
              className={`btn-secondary px-8 py-4 text-base ${
                isDark
                  ? 'bg-white/5 text-white border-white/15 hover:bg-white/10'
                  : 'bg-black/[0.03] text-text-light border-black/10 hover:bg-black/[0.06]'
              }`}
            >
              Learn More
            </a>
          </motion.div>

          {/* Floating Badge Card */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className={`mt-14 inline-flex items-start gap-4 p-5 rounded-2xl max-w-sm ${
              isDark
                ? 'bg-white/[0.04] border border-white/10 backdrop-blur-sm'
                : 'bg-white border border-black/[0.06] shadow-xl shadow-black/5'
            }`}
          >
            <div className="w-11 h-11 rounded-xl bg-brand-orange/15 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🌿</span>
            </div>
            <div>
              <p className={`font-semibold text-[15px] ${isDark ? 'text-white' : 'text-text-light'}`}>
                Fresh, Never Frozen
              </p>
              <p className={`text-sm mt-1 leading-relaxed ${isDark ? 'text-muted-dark' : 'text-muted-light'}`}>
                Streamlined deliveries that accommodate YOUR lifestyle
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className={`w-7 h-11 rounded-full border-2 flex justify-center pt-2.5 ${
            isDark ? 'border-white/20' : 'border-black/15'
          }`}
        >
          <motion.div
            className="w-1.5 h-3 rounded-full bg-brand-orange"
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
