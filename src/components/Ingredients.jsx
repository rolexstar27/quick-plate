import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import ScrollReveal from './ScrollReveal'

const plates = [
  {
    id: 1,
    name: 'Lemon Herb Garlic Chicken',
    sub: 'W/ Organic Quinoa And Grilled Asparagus',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800&h=800&fit=crop',
    ingredients: ['Veggies', 'Protein', 'Grains', 'Herbs', 'Sauce', 'Fruit'],
    emojis: ['🥦', '🍗', '🌾', '🌿', '🫙', '🍋'],
  },
  {
    id: 2,
    name: 'Pan-Seared Salmon Bowl',
    sub: 'W/ Wild Rice And Roasted Vegetables',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=800&fit=crop',
    ingredients: ['Protein', 'Grains', 'Veggies', 'Sauce', 'Herbs', 'Fruit'],
    emojis: ['🐟', '🌾', '🥕', '🫙', '🌿', '🍊'],
  },
  {
    id: 3,
    name: 'Mediterranean Steak Plate',
    sub: 'W/ Sweet Potato Mash And Garden Salad',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=800&fit=crop',
    ingredients: ['Protein', 'Veggies', 'Grains', 'Fruit', 'Herbs', 'Sauce'],
    emojis: ['🥩', '🥬', '🍠', '🫒', '🌿', '🧄'],
  },
]

const badgePositions = [
  { top: '2%', left: '50%', transform: 'translateX(-50%)' },
  { top: '28%', right: '-2%' },
  { top: '58%', right: '-4%' },
  { bottom: '10%', right: '12%' },
  { bottom: '10%', left: '12%' },
  { top: '58%', left: '-4%' },
]

export default function Ingredients() {
  const { isDark } = useTheme()
  const [activePlate, setActivePlate] = useState(0)
  const [direction, setDirection] = useState(0)

  const plate = plates[activePlate]

  const nextPlate = () => {
    setDirection(1)
    setActivePlate((activePlate + 1) % plates.length)
  }

  const prevPlate = () => {
    setDirection(-1)
    setActivePlate((activePlate - 1 + plates.length) % plates.length)
  }

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 150 : -150, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir) => ({ x: dir > 0 ? -150 : 150, opacity: 0, scale: 0.95 }),
  }

  return (
    <section
      id="ingredients"
      className={`snap-section relative py-24 sm:py-32 overflow-hidden ${
        isDark ? 'bg-bg-dark' : 'bg-bg-light'
      } ${isDark ? 'grid-texture-dark' : 'grid-texture-light'}`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-text-light'
            }`}>
              Ingredients That <span className="text-brand-orange">Matter</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Navigation Arrows */}
          <div className="flex lg:flex-col items-center gap-3">
            <button
              onClick={prevPlate}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                isDark
                  ? 'bg-white/[0.06] hover:bg-white/10 text-white/70 hover:text-white border border-white/10'
                  : 'bg-black/[0.04] hover:bg-black/[0.08] text-text-light/60 hover:text-text-light border border-black/[0.06]'
              }`}
              aria-label="Previous plate"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={nextPlate}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                isDark
                  ? 'bg-white/[0.06] hover:bg-white/10 text-white/70 hover:text-white border border-white/10'
                  : 'bg-black/[0.04] hover:bg-black/[0.08] text-text-light/60 hover:text-text-light border border-black/[0.06]'
              }`}
              aria-label="Next plate"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Plate Image with Orbiting Badges */}
          <div className="relative flex-1 max-w-md lg:max-w-lg">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activePlate}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative"
              >
                {/* Plate Image */}
                <div className="relative mx-auto w-72 h-72 sm:w-80 sm:h-80 md:w-[360px] md:h-[360px]">
                  <div className={`absolute inset-0 rounded-full overflow-hidden ${
                    isDark
                      ? 'border-[3px] border-brand-orange/20 shadow-2xl shadow-brand-orange/10'
                      : 'border-[3px] border-brand-orange/10 shadow-2xl shadow-black/10'
                  }`}>
                    <img
                      src={plate.image}
                      alt={plate.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Orbiting Ingredient Badges */}
                  {plate.ingredients.map((ing, i) => (
                    <motion.div
                      key={`${activePlate}-${ing}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.08, type: 'spring', stiffness: 300 }}
                      className={`absolute px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap z-10 shadow-md ${
                        isDark
                          ? 'bg-white/10 border border-white/15 text-white backdrop-blur-md'
                          : 'bg-white border border-black/[0.08] text-text-light shadow-black/5'
                      }`}
                      style={{
                        ...badgePositions[i],
                        animation: `float-drift-${(i % 3) + 1} ${5 + i}s ease-in-out infinite`,
                        animationDelay: `${i * 0.3}s`,
                      }}
                    >
                      <span className="mr-1">{plate.emojis[i]}</span>
                      {ing}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dish Info */}
          <div className="flex-1 max-w-md text-center lg:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePlate}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold leading-tight ${
                  isDark ? 'text-white' : 'text-text-light'
                }`}>
                  {plate.name}
                </h3>
                <p className={`mt-2 text-base sm:text-lg ${isDark ? 'text-muted-dark' : 'text-muted-light'}`}>
                  {plate.sub}
                </p>

                {/* Ingredient Tags */}
                <div className="flex flex-wrap gap-2 mt-6 justify-center lg:justify-start">
                  {plate.ingredients.map((ing, i) => (
                    <span
                      key={ing}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        i === 0
                          ? 'bg-brand-orange text-white'
                          : isDark
                            ? 'bg-white/5 text-white/80 border border-white/15'
                            : 'bg-black/[0.03] text-text-light/80 border border-black/10'
                      }`}
                    >
                      {plate.emojis[i]} {ing}
                    </span>
                  ))}
                </div>

                {/* Plate Counter */}
                <div className="flex items-center gap-2.5 mt-8 justify-center lg:justify-start">
                  {plates.map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === activePlate
                          ? 'w-7 bg-brand-orange'
                          : `w-2 ${isDark ? 'bg-white/25' : 'bg-black/15'}`
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
