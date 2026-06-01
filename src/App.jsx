import { useState, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BottomNav from './components/ui/BottomNav'
import Header from './components/ui/Header'
import Footer from './components/ui/Footer'
import { useTheme } from './contexts/ThemeContext'

const Dashboard    = lazy(() => import('./components/screen/Dashboard'))
const WasteSearch  = lazy(() => import('./components/screen/WasteSearch'))
const ImpactCounter= lazy(() => import('./components/screen/ImpactCounter'))
const VisualGuide  = lazy(() => import('./components/screen/VisualGuide'))
const EcoTips      = lazy(() => import('./components/screen/EcoTips'))
const Legal        = lazy(() => import('./components/screen/Legal'))
const Privacidad   = lazy(() => import('./components/screen/Privacidad'))
const Cookies      = lazy(() => import('./components/screen/Cookies'))

const VIEWS = {
  dashboard:  Dashboard,
  search:     WasteSearch,
  calculator: ImpactCounter,
  guide:      VisualGuide,
  tips:       EcoTips,
  legal:      Legal,
  privacidad: Privacidad,
  cookies:    Cookies,
}

function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  const { darkMode } = useTheme()
  const CurrentComponent = VIEWS[currentView]

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-background text-text-main flex flex-col">

        {/* ── Top Navigation Bar ── */}
        <Header currentView={currentView} onNavigate={setCurrentView} />

        {/* ── Page Content ── */}
        <main className="flex-1 pb-16 md:pb-0" id="main-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <Suspense fallback={
                <div className="flex items-center justify-center min-h-[60vh]">
                  <span className="material-symbols-outlined text-primary text-4xl animate-spin">recycling</span>
                </div>
              }>
                <CurrentComponent onNavigate={setCurrentView} />
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* ── Footer ── */}
        <Footer onNavigate={setCurrentView} />

        {/* ── Mobile Bottom Navigation ── */}
        <BottomNav currentView={currentView} onNavigate={setCurrentView} />
      </div>
    </div>
  )
}

export default App


