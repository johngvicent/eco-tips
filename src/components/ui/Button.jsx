import { useTheme } from '../../contexts/ThemeContext'
import './Button.css'

/**
 * Botón reutilizable.
 *
 * Props:
 *   - children   : contenido del botón
 *   - variant    : 'primary' (degradado animado, default) | 'secondary' | 'ghost' (solo className)
 *   - onClick    : manejador de clic
 *   - type       : 'button' | 'submit' | 'reset'  (default: 'button')
 *   - disabled   : boolean
 *   - className  : clases extra opcionales
 *   - ...props   : aria-*, role, data-*, key, etc.
 */
export default function Button({ children, onClick, type = 'button', disabled = false, className = '', variant = 'primary', ...props }) {
  const { darkMode } = useTheme()

  // Auto-switch to darkmode variant when in dark mode
  const effectiveVariant = darkMode
    ? variant === 'primary'
      ? 'primary-darkmode'
      : variant === 'secondary'
        ? 'secondary-darkmode'
        : variant
    : variant

  const variantClass = effectiveVariant === 'primary'
    ? 'btn-primary color-primary'
    : effectiveVariant === 'secondary'
      ? 'btn-secondary'
      : effectiveVariant === 'primary-darkmode'
        ? 'btn-primary-darkmode color-primary'
        : effectiveVariant === 'secondary-darkmode'
          ? 'btn-secondary-darkmode'
          : ''

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variantClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
}
