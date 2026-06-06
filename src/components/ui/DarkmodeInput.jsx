import { useTheme } from '../../contexts/ThemeContext'
import './DarkmodeInput.css'

export default function DarkmodeInput() {
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className="darkmode-toggle min-w-11 min-h-11 flex items-center justify-center"
    >
      <span className="darkmode-toggle__icon">
        {darkMode ? (
          <img src="/icons/moon.svg" alt="" className="darkmode-toggle__img" aria-hidden="true" />
        ) : (
          <img src="/icons/sun.svg" alt="" className="darkmode-toggle__img" aria-hidden="true" />
        )}
      </span>
    </button>
  )
}
