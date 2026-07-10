import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const ThemeContext = createContext()

const THEME_KEY = 'cravinggo-theme'

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY)
      if (saved !== null) return saved === 'dark'
    } catch {}
    return false
  })

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light')
    } catch {}
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  const toggleTheme = useCallback(() => setIsDark(prev => !prev), [])

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

export const themeColors = {
  dark: {
    bg: '#0a0a0a',
    bgClass: 'bg-bg-dark',
    text: '#FFFFFF',
    textClass: 'text-text-dark',
    muted: '#A0A0A0',
    mutedClass: 'text-muted-dark',
    cardBg: 'rgba(255,255,255,0.05)',
    cardBorder: 'rgba(255,255,255,0.08)',
    green: '#2D6A2F',
    greenClass: 'text-brand-green-dark',
    gridClass: 'grid-texture-dark',
    glassClass: 'glass-dark',
  },
  light: {
    bg: '#F9F9F7',
    bgClass: 'bg-bg-light',
    text: '#1A1A1A',
    textClass: 'text-text-light',
    muted: '#6B7280',
    mutedClass: 'text-muted-light',
    cardBg: 'rgba(0,0,0,0.03)',
    cardBorder: 'rgba(0,0,0,0.08)',
    green: '#3B8256',
    greenClass: 'text-brand-green-light',
    gridClass: 'grid-texture-light',
    glassClass: 'glass-light',
  },
}
