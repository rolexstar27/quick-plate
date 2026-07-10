import { ThemeProvider, useTheme } from './context/ThemeContext'
import Navbar from './components/Navbar'
import DotNavigation from './components/DotNavigation'
import Hero from './components/Hero'
import SecondHero from './components/SecondHero'
import Goals from './components/Goals'
import Lifestyle from './components/Lifestyle'
import Ingredients from './components/Ingredients'
import CTA from './components/CTA'
import Menu from './components/Menu'
import Delivery from './components/Delivery'

function AppContent() {
  const { isDark } = useTheme()

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDark ? 'bg-bg-dark text-white' : 'bg-bg-light text-text-light'
    }`}>
      <Navbar />
      <DotNavigation />
      <main>
        <Hero />
        <SecondHero />
        <Goals />
        <Lifestyle />
        <Ingredients />
        <CTA />
        <Menu />
        <Delivery />
      </main>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
