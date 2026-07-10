import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import ScrollReveal from './ScrollReveal'

const testimonials = [
  {
    name: 'Sarah Mitchell',
    org: 'CrossFit Austin',
    quote: 'CravingGo has completely transformed how our team eats. The meals are incredible and perfectly portioned for our training.',
  },
  {
    name: 'David Chen',
    org: 'Tech Startup CEO',
    quote: "As a busy founder, I don't have time to meal prep. CravingGo delivers restaurant-quality food right to my office.",
  },
  {
    name: 'Maria Rodriguez',
    org: 'Family of 5',
    quote: 'My kids actually ask for these meals! Finally, healthy food that the whole family loves. Game changer.',
  },
]

const floatingIngredients = [
  { emoji: '🍅', top: '8%', left: '5%', duration: 8 },
  { emoji: '🌿', top: '18%', right: '7%', duration: 7 },
  { emoji: '🫒', bottom: '32%', left: '8%', duration: 9 },
  { emoji: '🧅', bottom: '12%', right: '10%', duration: 6 },
  { emoji: '🌶️', top: '42%', left: '3%', duration: 10 },
  { emoji: '🥕', top: '62%', right: '4%', duration: 7.5 },
]

export default function CTA() {
  const { isDark } = useTheme()
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const dragStart = useRef(0)

  const handleDragEnd = (_, info) => {
    const dragDistance = dragStart.current - info.point.x
    if (Math.abs(dragDistance) > 60) {
      if (dragDistance > 0) {
        setActiveTestimonial(prev => (prev + 1) % testimonials.length)
      } else {
        setActiveTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length)
      }
    }
  }

  return (
    <section
      id="contact"
      className={`snap-section relative py-24 sm:py-32 overflow-hidden ${
        isDark ? 'bg-bg-dark' : 'bg-bg-light'
      } ${isDark ? 'grid-texture-dark' : 'grid-texture-light'}`}
    >
      {/* Floating Ingredients */}
      {floatingIngredients.map((item, i) => (
        <div
          key={i}
          className="absolute pointer-events-none select-none"
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            bottom: item.bottom,
            animation: `float-drift-${(i % 3) + 1} ${item.duration}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
            opacity: 0.25,
          }}
        >
          <span className="text-3xl sm:text-4xl">{item.emoji}</span>
        </div>
      ))}

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* CTA Content */}
        <ScrollReveal>
          <div className="text-center mb-16 sm:mb-20">
            <h2 className={`text-[36px] sm:text-5xl md:text-6xl lg:text-[68px] font-bold leading-[1.05] tracking-tight text-balance ${
              isDark ? 'text-white' : 'text-text-light'
            }`}>
              Are You Ready To{' '}
              <span className="text-brand-orange">CravingGo</span>?
            </h2>
            <p className={`mt-6 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed ${
              isDark ? 'text-muted-dark' : 'text-muted-light'
            }`}>
              Customize Your Plan, or Let Us Choose For You
            </p>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="mt-10 btn-primary px-10 py-4 text-lg inline-flex items-center gap-2.5"
            >
              Get Started
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </ScrollReveal>

        {/* Testimonials */}
        <ScrollReveal delay={0.2}>
          <div className="relative">
            <div
              className="flex items-center justify-center py-4 cursor-grab active:cursor-grabbing relative"
              style={{ minHeight: '260px' }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragStart={(_, info) => { dragStart.current = info.point.x }}
              onDragEnd={handleDragEnd}
            >
              {testimonials.map((testimonial, i) => {
                const isActive = i === activeTestimonial
                const offset = i - activeTestimonial

                return (
                  <motion.div
                    key={i}
                    className={`absolute w-72 sm:w-80 md:w-96 p-6 sm:p-7 rounded-2xl ${
                      isDark
                        ? 'bg-white/[0.04] border border-white/10'
                        : 'bg-white border border-black/[0.06] shadow-lg shadow-black/5'
                    } ${isActive ? 'orange-glow' : ''}`}
                    animate={{
                      scale: isActive ? 1 : 0.88,
                      opacity: isActive ? 1 : 0.4,
                      x: offset * (typeof window !== 'undefined' && window.innerWidth < 640 ? 190 : 350),
                    }}
                    transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                    style={{ zIndex: isActive ? 10 : 1 }}
                  >
                    {/* Quote */}
                    <div className={`text-5xl leading-none font-serif mb-4 ${isDark ? 'text-brand-orange/25' : 'text-brand-orange/15'}`}>
                      "
                    </div>
                    <p className={`text-sm leading-relaxed mb-6 ${
                      isDark ? 'text-white/75' : 'text-text-light/75'
                    }`}>
                      {testimonial.quote}
                    </p>

                    {/* Author */}
                    <div className="border-t border-white/10 pt-4">
                      <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-text-light'}`}>
                        {testimonial.name}
                      </p>
                      <p className="text-brand-orange text-sm font-medium mt-0.5">
                        {testimonial.org}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Navigation Dots */}
            <div className="flex items-center justify-center gap-2.5 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeTestimonial
                      ? 'w-8 bg-brand-orange'
                      : `w-2 ${isDark ? 'bg-white/25 hover:bg-white/40' : 'bg-black/15 hover:bg-black/30'}`
                  }`}
                  aria-label={`View testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
