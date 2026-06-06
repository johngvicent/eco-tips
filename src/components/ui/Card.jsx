import './Card.css'

/**
 * Card – Componente reutilizable con 6 variantes visuales (light + dark).
 *
 * Props:
 *   variant   : '01' | '02' | '03' | '04' | '05' | '06'  (default: '01')
 *   number    : string | number – identificador visual circular (opcional)
 *   label     : string – etiqueta superior (opcional)
 *   title     : string – título de la tarjeta (opcional)
 *   body      : string – cuerpo del texto (opcional)
 *   badges    : string[] – array de badges/tags (opcional)
 *   className : string – clases extra (opcional)
 *   children  : ReactNode – contenido personalizado (opcional)
 *   ...props  : atributos HTML / aria (article)
 */
export default function Card({
  variant = '01',
  number,
  label,
  title,
  body,
  badges = [],
  className = '',
  children,
  ...props
}) {
  const cardClass = `card card--variant-${variant}${className ? ` ${className}` : ''}`

  return (
    <article className={cardClass} {...props}>
      {/* Children render first — useful for icons, decorations, etc. */}
      {children}

      {number != null && (
        <span className="card__number" aria-hidden="true">
          {String(number).padStart(2, '0')}
        </span>
      )}

      {label && <span className="card__label">{label}</span>}

      {title && <h3 className="card__title">{title}</h3>}

      {body && <p className="card__body">{body}</p>}

      {badges.length > 0 && (
        <div className="card__badges">
          {badges.map((badge, i) => (
            <span key={i} className="card__badge">{badge}</span>
          ))}
        </div>
      )}
    </article>
  )
}
