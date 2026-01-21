import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaCalculator, FaEye, FaLightbulb, FaMoon, FaSun } from 'react-icons/fa'
import WasteSearch from './components/WasteSearch'
import ImpactCounter from './components/ImpactCounter'
import VisualGuide from './components/VisualGuide'
import EcoTips from './components/EcoTips'
import { useTheme } from './contexts/ThemeContext'

function App() {
  const [currentView, setCurrentView] = useState('search')
  const { darkMode, toggleDarkMode } = useTheme()

  const views = {
    search: WasteSearch,
    impact: ImpactCounter,
    guide: VisualGuide,
    tips: EcoTips
  }

  const CurrentComponent = views[currentView]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header 
        className="bg-white shadow-sm transition-colors"
        style={darkMode ? { backgroundColor: '#35524a' } : {}}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <img 
              src={darkMode ? "/ecologo-white.svg" : "/ecologo.png"}
              alt="EcoTips Logo" 
              className="w-62.5 h-auto pb-10"
            />
          </div>
          <nav className="mt-4">
            <div className="flex flex-wrap justify-center gap-2 items-center">
              {[
                { key: 'search', icon: FaSearch, label: 'Buscar Residuos' },
                { key: 'impact', icon: FaCalculator, label: 'Calculadora' },
                { key: 'guide', icon: FaEye, label: 'Guía Visual' },
                { key: 'tips', icon: FaLightbulb, label: 'Eco-Tips' }
              ].map(({ key, icon: Icon, label }) => (
                <button
                  key={key}
                  onClick={() => setCurrentView(key)}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentView === key
                      ? 'text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                  style={currentView === key ? { backgroundColor: '#006837' } : {}}
                >
                  <Icon className="mr-2" />
                  {label}
                </button>
              ))}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors ml-4"
                title={darkMode ? "Modo Claro (Ahorra Energía)" : "Modo Oscuro (Energy Saver)"}
              >
                {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-blue-500" />}
              </button>
            </div>
          </nav>
        </div>
      </header>
      <motion.main
        key={currentView}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <CurrentComponent />
      </motion.main>
    </div>
  )
}

export default App
