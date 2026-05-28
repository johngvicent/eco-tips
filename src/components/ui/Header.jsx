import { useTheme } from '../../contexts/ThemeContext'
import Button from './Button'

const NAV_LINKS = [
  { key: 'dashboard',  label: 'Inicio' },
  { key: 'search',     label: 'Buscador' },
  { key: 'calculator', label: 'Calculadora' },
  { key: 'guide',      label: 'Guía' },
  { key: 'stats',      label: 'Estadísticas' },
  { key: 'tips',       label: 'Tips' },
]

export default function Header({ currentView, onNavigate }) {
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <header className="bg-surface sticky top-0 z-50 border-b border-border">
      <div className="flex justify-between items-center max-w-safe-width mx-auto px-space-4 h-20 w-full">

        {/* Brand */}
        <Button
          variant="ghost"
          onClick={() => onNavigate('dashboard')}
          className="focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 focus-visible:rounded-sm"
          aria-label="EcoTips — volver al inicio"
        >
          <img src="/branding/ecologo.svg" alt="EcoTips" className="h-16 w-auto" />
        </Button>

        {/* Desktop nav */}
        <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-space-4">
          {NAV_LINKS.map(({ key, label }) => {
            const active = currentView === key
            return (
              <Button
                variant="ghost"
                key={key}
                onClick={() => onNavigate(key)}
                aria-current={active ? 'page' : undefined}
                className={`text-label-md font-medium transition-base focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 focus-visible:rounded-sm pb-0.5 ${
                  active
                    ? 'text-primary font-bold border-b-2 border-primary'
                    : 'text-on-secondary-container hover:text-primary'
                }`}
              >
                {label}
              </Button>
            )
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-space-3">
          <Button
            variant="ghost"
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            className="p-2 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container transition-base focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 min-w-11 min-h-11 flex items-center justify-center"
          >
            <span className="material-symbols-outlined">{darkMode ? 'light_mode' : 'dark_mode'}</span>
          </Button>
          <Button
            onClick={() => onNavigate('search')}
            className="focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          >
            Comenzar
          </Button>
        </div>
      </div>
    </header>
  )
}
