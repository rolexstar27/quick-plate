import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useScrollSpy } from '../hooks/useScrollSpy'

const sections = [
  { id: 'home', label: 'Fresh' },
  { id: 'about', label: 'Source' },
  { id: 'goals', label: 'Goals' },
  { id: 'lifestyle', label: 'Lifestyle' },
  { id: 'ingredients', label: 'Ingredients' },
  { id: 'menu', label: 'Menu' },
  { id: 'contact', label: 'Our Family' },
  { id: 'delivery', label: 'Table' },
]

export default function DotNavigation() {
  const { isDark } = useTheme()
  const activeId = useScrollSpy(sections.map(s => s.id), 200)

  const handleClick = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3">
      {sections.map(section => {
        const isActive = activeId === section.id
        return (
          <button
            key={section.id}
            onClick={() => handleClick(section.id)}
            className="group flex items-center gap-3"
            aria-label={`Navigate to ${section.label}`}
          >
            {/* Label - shows on hover */}
            <span className={`text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 ${
              isDark ? 'text-white/70' : 'text-text-light/70'
            }`}>
              {section.label}
            </span>

            {/* Dot */}
            <motion.div
              className={`relative rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-3 h-3 bg-brand-orange'
                  : `w-2 h-2 ${isDark ? 'bg-white/30 hover:bg-white/50' : 'bg-black/20 hover:bg-black/40'}`
              }`}
              animate={isActive ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.4 }}
            >
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-brand-orange"
                  initial={{ scale: 0, opacity: 0.5 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.div>
          </button>
        )
      })}
    </div>
  )
}
