import { useTheme } from '../../contexts/ThemeContext'
import Button from './Button'

export default function DarkmodeInput() {
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <Button
      variant={darkMode ? 'secondary-darkmode' : 'secondary'}
      onClick={toggleDarkMode}
      aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className="p-2 rounded-full min-w-11 min-h-11 flex items-center justify-center"
    >
      <span className="material-symbols-outlined">{darkMode ? 'light_mode' : 'dark_mode'}</span>
    </Button>
  )
}
