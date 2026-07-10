import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import ScrollReveal from './ScrollReveal'

const lifestyleCards = [
  {
    id: 1,
    title: 'Professional',
    subtitle: 'Fuel Your Hustle',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=800&fit=crop',
    description: 'Premium meals designed for the ambitious professional who demands excellence.',
  },
  {
    id: 2,
    title: 'Family',
    subtitle: 'Feed Everyone',
    image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&h=800&fit=crop',
    description: 'Wholesome family-style meals that bring everyone to the table.',
  },
  {
    id: 3,
    title: 'Active',
    subtitle: 'Train Hard',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=800&fit=crop',
    description: 'Performance nutrition for athletes and fitness enthusiasts.',
  },
]

export default function Lifestyle() {
  const { isDark } = useTheme()
  const [activeIndex, setActiveIndex] = useState(1)
  const dragStart = useRef(0)

  const handleDragStart = (_, info) => {
    dragStart.current = info.point.x
  }

  const handleDragEnd = (_, info) => {
    const dragDistance = dragStart.current - info.point.x
    if (Math.abs(dragDistance) > 60) {
      if (dragDistance > 0 && activeIndex < lifestyleCards.length - 1) {
        setActiveIndex(prev => prev + 1)
      } else if (dragDistance < 0 && activeIndex > 0) {
        setActiveIndex(prev => prev - 1)
      }
    }
  }

  const getCardStyles = (index) => {
    const offset = index - activeIndex
    const absOffset = Math.abs(offset)

    if (offset === 0) {
      // Active card
      return {
        scale: 1,
        opacity: 1,
        zIndex: 10,
        x: 0,
        filter: 'blur(0px)',
      }
    }
    // Inactive cards
    return {
      scale: 0.78 - (absOffset > 1 ? 0.05 : 0),
      opacity: 0.5 - (absOffset > 1 ? 0.2 : 0),
      zIndex: 5 - absOffset,
      x: offset * (typeof window !== 'undefined' && window.innerWidth < 640 ? 180 : 320),
      filter: `blur(${2 + absOffset}px)`,
    }
  }

  return (
    <section
      id="lifestyle"
      className={`snap-section relative py-24 sm:py-32 overflow-hidden ${
        isDark ? 'bg-bg-dark' : 'bg-bg-light'
      } ${isDark ? 'grid-texture-dark' : 'grid-texture-light'}`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16 sm:mb-20">
            <span className="inline-block text-brand-orange text-sm font-bold uppercase tracking-[0.2em] mb-4">
              Our Approach
            </span>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight ${
              isDark ? 'text-white' : 'text-text-light'
            }`}>
              Designed For Your <span className="text-brand-orange">Taste</span>,
              <br className="hidden sm:block" />
              Built For Your <span className="text-brand-orange">Day</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Carousel Container */}
        <div className="relative">
          {/* Cards Container - Fixed Height */}
          <div
            className="relative mx-auto cursor-grab active:cursor-grabbing"
            style={{ height: '460px', maxWidth: '900px' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            {lifestyleCards.map((card, i) => {
              const styles = getCardStyles(i)

              return (
                <motion.div
                  key={card.id}
                  className="absolute top-0 left-1/2"
                  style={{ marginLeft: '-140px' }}
                  animate={{
                    scale: styles.scale,
                    opacity: styles.opacity,
                    x: styles.x,
                    filter: styles.filter,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  onClick={() => setActiveIndex(i)}
                  initial={false}
                >
                  <div
                    className={`relative w-[280px] sm:w-[300px] h-[400px] sm:h-[420px] rounded-3xl overflow-hidden transition-shadow duration-500 ${
                      i === activeIndex ? 'shadow-2xl shadow-black/30' : 'shadow-lg shadow-black/10'
                    }`}
                  >
                    {/* Background Image */}
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />

                    {/* Gradient Overlay - Stronger at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
                      {/* Category Badge */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/20 backdrop-blur-sm mb-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                        <span className="text-brand-orange text-[11px] font-bold uppercase tracking-wider">
                          {card.title}
                        </span>
                      </div>

                      <h3 className="text-white text-2xl sm:text-[26px] font-bold leading-tight">
                        {card.subtitle}
                      </h3>

                      <p className="text-white/60 text-sm mt-2.5 leading-relaxed line-clamp-2">
                        {card.description}
                      </p>

                      {i === activeIndex && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.3 }}
                          className="mt-5"
                        >
                          <button className="btn-primary px-6 py-2.5 text-sm">
                            View Meals
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Navigation Dots */}
          <div className="flex items-center justify-center gap-3 mt-10">
            {lifestyleCards.map((card, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="group flex items-center gap-2"
                aria-label={`View ${card.title} card`}
              >
                <span className={`text-xs font-medium transition-all duration-300 ${
                  i === activeIndex
                    ? 'opacity-100 text-brand-orange'
                    : `opacity-0 group-hover:opacity-100 ${isDark ? 'text-white/60' : 'text-text-light/60'}`
                }`}>
                  {card.title}
                </span>
                <div
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? 'w-8 h-2.5 bg-brand-orange'
                      : `w-2.5 h-2.5 ${isDark ? 'bg-white/25 hover:bg-white/40' : 'bg-black/15 hover:bg-black/30'}`
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
