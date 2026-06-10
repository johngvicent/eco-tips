import { useEffect, useRef } from 'react'
import './Modal.css'

/**
 * Modal – Componente reutilizable de diálogo modal.
 *
 * Props:
 *   isOpen    : boolean – controla la visibilidad del modal
 *   onClose   : () => void – callback al cerrar (backdrop, ESC, botón)
 *   title     : string – título opcional del modal
 *   children  : ReactNode – contenido del modal
 *   ...props  : atributos HTML / aria
 */
export default function Modal({ isOpen, onClose, title, children, ...props }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-backdrop" onClick={onClose} aria-hidden="true">
      <dialog
        ref={dialogRef}
        className="modal"
        open
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Modal'}
        {...props}
      >
        <div className="modal__header">
          {title && <h2 className="modal__title">{title}</h2>}
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="modal__close"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="modal__body">
          {children}
        </div>
      </dialog>
    </div>
  )
}
