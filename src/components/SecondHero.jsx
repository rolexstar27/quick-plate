import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import ScrollReveal from './ScrollReveal'

const floatingDebris = [
  { emoji: '🍰', top: '12%', left: '8%', duration: 7, delay: 0 },
  { emoji: '🍜', top: '22%', right: '10%', duration: 8, delay: 1 },
  { emoji: '🧋', bottom: '25%', left: '12%', duration: 6, delay: 2 },
  { emoji: '🍣', top: '55%', right: '6%', duration: 9, delay: 0.5 },
  { emoji: '🍲', bottom: '35%', right: '18%', duration: 7.5, delay: 1.5 },
]

const orbitIngredients = [
  { label: 'Vegetables', emoji: '🥦', angle: 0, radius: 130 },
  { label: 'Proteins', emoji: '🍗', angle: 120, radius: 140 },
  { label: 'Grains', emoji: '🌾', angle: 240, radius: 135 },
]

const stackedPills = ['Bold', 'Fresh', 'Tailored']

export default function SecondHero() {
  const { isDark } = useTheme()

  return (
    <section
      id="about"
      className={`snap-section relative min-h-screen flex items-center overflow-hidden ${
        isDark ? 'bg-bg-dark' : 'bg-bg-light'
      } ${isDark ? 'grid-texture-dark' : 'grid-texture-light'}`}
    >
      {/* Floating Debris */}
      {floatingDebris.map((item, i) => (
        <div
          key={i}
          className="absolute pointer-events-none select-none"
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            bottom: item.bottom,
            animation: `float-drift-${(i % 3) + 1} ${item.duration}s ease-in-out infinite`,
            animationDelay: `${item.delay}s`,
            opacity: 0.35,
          }}
        >
          <span className="text-3xl sm:text-4xl">{item.emoji}</span>
        </div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-24 w-full">
        <div className="text-center">
          {/* Main Heading */}
          <ScrollReveal>
            <h2 className={`font-serif text-[48px] sm:text-6xl md:text-7xl lg:text-[88px] font-bold leading-[0.95] tracking-tight ${
              isDark ? 'text-white' : 'text-text-light'
            }`}>
              <span className="block">EAT Local,</span>
              <span className="block text-brand-orange mt-1">EAT Healthy</span>
            </h2>
          </ScrollReveal>

          {/* Bowl with orbiting ingredients */}
          <ScrollReveal delay={0.2}>
            <div className="relative mx-auto mt-16 mb-14" style={{ width: '320px', height: '320px' }}>
              {/* Bowl */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className={`w-44 h-44 sm:w-52 sm:h-52 rounded-full flex items-center justify-center ${
                    isDark
                      ? 'bg-gradient-to-br from-orange-900/40 to-amber-900/25 border border-brand-orange/25 shadow-2xl shadow-brand-orange/10'
                      : 'bg-gradient-to-br from-orange-50 to-amber-50 border border-brand-orange/15 shadow-2xl shadow-orange-200/50'
                  }`}
                >
                  <span className="text-6xl sm:text-7xl">🥗</span>
                </motion.div>
              </div>

              {/* Orbiting Ingredients */}
              {orbitIngredients.map((ing, i) => (
                <motion.div
                  key={ing.label}
                  className="absolute left-1/2 top-1/2"
                  style={{ marginLeft: '-60px', marginTop: '-20px' }}
                  animate={{ rotate: [ing.angle, ing.angle + 360] }}
                  transition={{ duration: 18 + i * 3, repeat: Infinity, ease: 'linear' }}
                >
                  <div
                    className={`absolute px-4 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap shadow-lg ${
                      isDark
                        ? 'bg-white/10 border border-white/15 text-white backdrop-blur-md'
                        : 'bg-white border border-black/[0.06] text-text-light shadow-black/5'
                    }`}
                    style={{ transform: `translateX(${ing.radius}px)` }}
                  >
                    <span className="mr-1.5 text-base">{ing.emoji}</span>
                    {ing.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {/* Stacked Pills */}
          <ScrollReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
              {stackedPills.map((pill, i) => (
                <motion.span
                  key={pill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className={`px-7 py-2.5 rounded-full text-sm font-bold tracking-wider uppercase transition-all duration-200 ${
                    i === 0
                      ? 'bg-brand-orange text-white'
                      : isDark
                        ? 'bg-white/5 text-white/80 border border-white/15'
                        : 'bg-black/[0.03] text-text-light/80 border border-black/10'
                  }`}
                >
                  {pill}
                </motion.span>
              ))}
            </div>
          </ScrollReveal>

          {/* Subtext */}
          <ScrollReveal delay={0.5}>
            <p className={`text-lg sm:text-xl font-medium ${isDark ? 'text-muted-dark' : 'text-muted-light'}`}>
              From Our Kitchen to Your Door
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
