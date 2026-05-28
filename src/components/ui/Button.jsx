import './Button.css'

/**
 * Botón reutilizable.
 *
 * Props:
 *   - children   : contenido del botón
 *   - variant    : 'primary' (degradado animado, default) | 'ghost' (solo className)
 *   - onClick    : manejador de clic
 *   - type       : 'button' | 'submit' | 'reset'  (default: 'button')
 *   - disabled   : boolean
 *   - className  : clases extra opcionales
 *   - ...props   : aria-*, role, data-*, key, etc.
 */
export default function Button({ children, onClick, type = 'button', disabled = false, className = '', variant = 'primary', ...props }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={variant === 'primary' ? `btn-primary color-primary ${className}` : variant === 'secondary' ? `btn-secondary ${className}` : className}
      {...props}
    >
      {children}
    </button>
  )
}
