import { useTheme } from '../../contexts/ThemeContext'
import Button from './Button'
import DarkmodeInput from './DarkmodeInput'

const NAV_LINKS = [
  { key: 'dashboard',  label: 'Inicio' },
  { key: 'search',     label: 'Buscador' },
  { key: 'calculator', label: 'Calculadora' },
  { key: 'guide',      label: 'Guía' },
  { key: 'tips',       label: 'Tips' },
]

export default function Header({ currentView, onNavigate }) {
  const { darkMode } = useTheme()

  return (
    <header className="bg-surface sticky top-0 z-50 border-b border-border">
      <div className="flex items-center md:justify-between max-w-safe-width mx-auto px-space-4 h-20 w-full">

        {/* Brand — 40% on mobile */}
        <div className="w-[40%] md:w-auto flex justify-start">
          <Button
            variant="ghost"
            onClick={() => onNavigate('dashboard')}
            className="focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 focus-visible:rounded-sm"
            aria-label="EcoTips — volver al inicio"
          >
            <img src={darkMode ? "/branding/ecologo-white.svg" : "/branding/ecologo.svg"} alt="EcoTips" className="h-[45px] w-auto" />
          </Button>
        </div>

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

        {/* Darkmode — centered, 20% on mobile */}
        <div className="w-[20%] md:w-auto flex justify-center md:hidden">
          <DarkmodeInput />
        </div>

        {/* Actions — 40% on mobile */}
        <div className="w-[40%] md:w-auto flex items-center justify-end gap-space-3">
          <div className="hidden md:block">
            <DarkmodeInput />
          </div>
          <Button
            variant={darkMode ? 'primary-darkmode' : 'primary'}
            onClick={() => onNavigate('search')}
            className="max-md:!m-0 max-md:!px-[35px] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          >
            Comenzar
          </Button>
        </div>
      </div>
    </header>
  )
}
