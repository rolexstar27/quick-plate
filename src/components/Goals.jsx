import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import ScrollReveal from './ScrollReveal'

const goals = [
  {
    id: 1,
    title: 'Gain Muscle + Enhance Performance',
    icon: '💪',
    description: 'High-protein meal plans designed to fuel your gains and optimize athletic performance.',
    meals: [
      { time: 'Breakfast', img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop', name: 'Protein Oats Bowl' },
      { time: 'Lunch', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop', name: 'Grilled Chicken Salad' },
      { time: 'Dinner', img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop', name: 'Salmon with Quinoa' },
    ],
  },
  {
    id: 2,
    title: 'Maintain + Healthy Habits',
    icon: '⚖️',
    description: 'Balanced meals that keep you on track with sustainable nutrition and wholesome ingredients.',
    meals: [
      { time: 'Breakfast', img: 'https://images.unsplash.com/photo-1494597564530-871f2b93ac55?w=400&h=300&fit=crop', name: 'Avocado Toast' },
      { time: 'Lunch', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', name: 'Mediterranean Bowl' },
      { time: 'Dinner', img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop', name: 'Herb Roasted Veggies' },
    ],
  },
  {
    id: 3,
    title: 'Lose Weight + Clean Eating',
    icon: '🔥',
    description: 'Calorie-smart meals packed with nutrients to support your weight loss journey.',
    expanded: true,
    kcal: { current: 2200, ideal: 1900 },
    progress: 78,
    meals: [
      { time: 'Breakfast', img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop', name: 'Egg White Scramble' },
      { time: 'Lunch', img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop', name: 'Grilled Veggie Wrap' },
      { time: 'Dinner', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop', name: 'Lean Protein Plate' },
    ],
  },
]

function CircularProgress({ progress, size = 110, strokeWidth = 8, isDark }) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E8622A"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-text-light'}`}>
          {progress}%
        </span>
      </div>
    </div>
  )
}

function GoalCard({ goal, isExpanded, onToggle, isDark }) {
  return (
    <motion.div
      layout
      className={`rounded-2xl overflow-hidden transition-colors duration-400 ${
        isExpanded
          ? 'bg-gradient-to-br from-orange-950 via-orange-900/80 to-amber-950 border border-brand-orange/30 shadow-xl shadow-brand-orange/10'
          : isDark
            ? 'bg-white/[0.04] border border-white/10 hover:border-white/15'
            : 'bg-white border border-black/[0.06] hover:border-black/10 shadow-sm hover:shadow-md'
      }`}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors duration-200 ${
          isExpanded ? '' : isDark ? 'hover:bg-white/[0.03]' : 'hover:bg-black/[0.02]'
        }`}
      >
        <div className="flex items-center gap-4">
          <span className="text-2xl sm:text-3xl w-12 h-12 flex items-center justify-center rounded-xl bg-brand-orange/10 flex-shrink-0">
            {goal.icon}
          </span>
          <h3 className={`text-base sm:text-lg font-bold leading-tight ${
            isExpanded ? 'text-white' : isDark ? 'text-white' : 'text-text-light'
          }`}>
            {goal.title}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex-shrink-0 ml-4"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isExpanded ? 'white' : isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="px-5 sm:px-6 pb-6">
              <p className="text-white/70 text-sm leading-relaxed mb-6">{goal.description}</p>

              {/* Kcal Metrics + Progress */}
              {goal.kcal && (
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 p-4 rounded-xl bg-white/[0.05] border border-white/[0.08]">
                  <CircularProgress progress={goal.progress} isDark={isDark} />
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-brand-orange flex-shrink-0" />
                      <span className="text-white/80 text-sm">
                        Your Kcal now: <span className="font-bold text-white">{goal.kcal.current.toLocaleString()}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-brand-green-dark flex-shrink-0" />
                      <span className="text-white/80 text-sm">
                        Your Ideal Kcal: <span className="font-bold text-white">{goal.kcal.ideal.toLocaleString()}</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Progress Slider */}
              {goal.progress && (
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-white/50">Progress</span>
                    <span className="text-xs text-white/50">{goal.progress}%</span>
                  </div>
                  <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-brand-orange to-brand-orange-light rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${goal.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              )}

              {/* Meal Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {goal.meals.map((meal, i) => (
                  <motion.div
                    key={meal.time}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-xl overflow-hidden bg-white/[0.08] border border-white/[0.1] group hover:border-brand-orange/30 transition-all duration-300"
                  >
                    <div className="relative h-28 overflow-hidden">
                      <img
                        src={meal.img}
                        alt={meal.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                    <div className="p-3">
                      <span className="text-brand-orange text-[11px] font-bold uppercase tracking-wider">
                        {meal.time}
                      </span>
                      <p className="text-white text-sm font-medium mt-0.5 leading-snug">{meal.name}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Goals() {
  const { isDark } = useTheme()
  const [expandedId, setExpandedId] = useState(3)

  return (
    <section
      id="goals"
      className={`snap-section relative py-24 sm:py-32 ${
        isDark ? 'bg-bg-dark' : 'bg-bg-light'
      } ${isDark ? 'grid-texture-dark' : 'grid-texture-light'}`}
    >
      <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-14">
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-text-light'
            }`}>
              Whatever Your <span className="text-brand-orange">Goal</span>
            </h2>
            <p className={`mt-4 text-base sm:text-lg ${isDark ? 'text-muted-dark' : 'text-muted-light'}`}>
              Choose your path. We'll craft the perfect meal plan for you.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {goals.map((goal, i) => (
            <ScrollReveal key={goal.id} delay={i * 0.1}>
              <GoalCard
                goal={goal}
                isExpanded={expandedId === goal.id}
                onToggle={() => setExpandedId(expandedId === goal.id ? null : goal.id)}
                isDark={isDark}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
