import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import ScrollReveal from './ScrollReveal'

const categories = ['All', 'Poultry', 'Beef', 'Seafood', 'Vegan', 'Salads & Wraps', 'Snacks']

const menuItems = [
  {
    id: 1, name: 'Herb Grilled Chicken Breast', category: 'Poultry', price: 18.99,
    desc: 'Tender chicken breast marinated in fresh herbs and grilled to perfection.',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop',
    cals: 380, carbs: 12, protein: 42,
  },
  {
    id: 2, name: 'Grass-Fed Beef Burger', category: 'Beef', price: 21.99,
    desc: 'Premium grass-fed beef patty with artisanal toppings on a brioche bun.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    cals: 520, carbs: 35, protein: 38,
  },
  {
    id: 3, name: 'Atlantic Salmon Bowl', category: 'Seafood', price: 24.99,
    desc: 'Wild-caught salmon with organic quinoa, avocado, and sesame dressing.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
    cals: 450, carbs: 28, protein: 40,
  },
  {
    id: 4, name: 'Buddha Veggie Bowl', category: 'Vegan', price: 16.99,
    desc: 'Roasted seasonal vegetables with tahini sauce and ancient grains.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    cals: 340, carbs: 45, protein: 14,
  },
  {
    id: 5, name: 'Mediterranean Wrap', category: 'Salads & Wraps', price: 14.99,
    desc: 'Grilled vegetables, feta, and hummus wrapped in whole wheat lavash.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop',
    cals: 380, carbs: 42, protein: 18,
  },
  {
    id: 6, name: 'Sweet Potato Fries', category: 'Snacks', price: 8.99,
    desc: 'Crispy baked sweet potato fries with garlic aioli dip.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop',
    cals: 220, carbs: 32, protein: 3,
  },
  {
    id: 7, name: 'Teriyaki Chicken Rice', category: 'Poultry', price: 17.99,
    desc: 'Japanese-inspired teriyaki chicken with jasmine rice and steamed broccoli.',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
    cals: 480, carbs: 55, protein: 35,
  },
  {
    id: 8, name: 'Grilled Shrimp Salad', category: 'Seafood', price: 19.99,
    desc: 'Succulent grilled shrimp on a bed of mixed greens with citrus vinaigrette.',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop',
    cals: 290, carbs: 15, protein: 32,
  },
]

export default function Menu() {
  const { isDark } = useTheme()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.desc.toLowerCase().includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [search, activeCategory])

  return (
    <section
      id="menu"
      className={`snap-section relative py-24 sm:py-32 ${
        isDark ? 'bg-bg-dark' : 'bg-bg-light'
      } ${isDark ? 'grid-texture-dark' : 'grid-texture-light'}`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-text-light'
            }`}>
              See What's <span className="text-brand-orange">Cookin'</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Search Bar */}
        <ScrollReveal delay={0.1}>
          <div className="max-w-lg mx-auto mb-8">
            <div className={`flex items-center rounded-2xl overflow-hidden transition-all duration-300 ${
              isDark
                ? 'bg-white/[0.04] border border-white/10 focus-within:border-brand-orange/40'
                : 'bg-white border border-black/[0.08] focus-within:border-brand-orange/40 shadow-sm'
            }`}>
              <div className="pl-5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)'} strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search our menu..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`flex-1 px-4 py-4 bg-transparent outline-none text-sm ${
                  isDark ? 'text-white placeholder-white/35' : 'text-text-light placeholder-black/25'
                }`}
              />
              <button className="btn-primary m-1.5 px-5 py-2.5 text-sm flex-shrink-0">
                Search
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Category Filters */}
        <ScrollReveal delay={0.15}>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/20'
                    : isDark
                      ? 'bg-white/[0.04] text-white/65 hover:bg-white/[0.08] border border-white/10'
                      : 'bg-black/[0.03] text-text-light/65 hover:bg-black/[0.06] border border-black/[0.06]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 ${
                  isDark
                    ? 'bg-white/[0.04] border border-white/10 hover:border-brand-orange/30 hover:shadow-lg hover:shadow-brand-orange/5'
                    : 'bg-white border border-black/[0.06] hover:border-brand-orange/30 shadow-sm hover:shadow-xl hover:shadow-brand-orange/8'
                }`}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className={`font-semibold text-[14px] leading-snug ${
                      isDark ? 'text-white' : 'text-text-light'
                    }`}>
                      {item.name}
                    </h3>
                    <span className="text-brand-orange font-bold text-[15px] whitespace-nowrap">
                      ${item.price}
                    </span>
                  </div>

                  <p className={`text-xs mb-3 line-clamp-2 leading-relaxed ${isDark ? 'text-muted-dark' : 'text-muted-light'}`}>
                    {item.desc}
                  </p>

                  {/* Macro Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: `${item.cals} Cals` },
                      { label: `${item.carbs}g Carbs` },
                      { label: `${item.protein}g Protein` },
                    ].map((macro) => (
                      <span
                        key={macro.label}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium ${
                          isDark ? 'bg-white/[0.06] text-white/60' : 'bg-black/[0.04] text-text-light/60'
                        }`}
                      >
                        {macro.label}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <span className="text-4xl mb-4 block">🍽️</span>
            <p className={`text-lg font-medium ${isDark ? 'text-muted-dark' : 'text-muted-light'}`}>
              No items found
            </p>
            <p className={`text-sm mt-1 ${isDark ? 'text-muted-dark/60' : 'text-muted-light/60'}`}>
              Try a different search or category
            </p>
          </div>
        )}

        {/* Footer Notices */}
        <ScrollReveal delay={0.2}>
          <div className="text-center mt-14 space-y-2">
            <p className="text-brand-orange font-semibold text-base">
              Plans starting from $150
            </p>
            <p className={`text-xs ${isDark ? 'text-muted-dark/60' : 'text-muted-light/60'}`}>
              *Our menu changes based on seasonality
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
