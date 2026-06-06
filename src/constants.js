import azul          from './data/azul.json'
import amarillo      from './data/amarillo.json'
import verde         from './data/verde.json'
import gris          from './data/gris.json'
import marron        from './data/marron.json'
import puntoLimpio   from './data/punto-limpio.json'
import sigre         from './data/sigre.json'
import textil        from './data/textil.json'
import ecoTipsData   from './data/eco-tips.json'
import impactData    from './data/impact-equivalents.json'

// containerColor maps container name to Tailwind utility classes for the new design system
export const CONTAINER_STYLES = {
  "Azul":            { bg: "bg-blue-600",    text: "text-white",     badge: "bg-blue-100 text-blue-800" },
  "Amarillo":        { bg: "bg-idea-yellow", text: "text-text-main", badge: "bg-yellow-100 text-yellow-800" },
  "Verde":           { bg: "bg-primary",     text: "text-on-primary",badge: "bg-mint-green text-primary" },
  "Marrón":          { bg: "bg-amber-700",   text: "text-white",     badge: "bg-amber-100 text-amber-800" },
  "Gris":            { bg: "bg-inverse-surface", text: "text-inverse-on-surface", badge: "bg-gray-100 text-gray-700" },
  "Punto limpio":    { bg: "bg-secondary",   text: "text-on-secondary", badge: "bg-secondary-container text-on-secondary-container" },
  "Punto SIGRE":     { bg: "bg-error",       text: "text-on-error",  badge: "bg-error-container text-on-error-container" },
  "Contenedor textil":{ bg: "bg-pink-600",  text: "text-white",     badge: "bg-pink-100 text-pink-800" },
}

export const WASTE_DATA = [
  ...azul,
  ...amarillo,
  ...verde,
  ...gris,
  ...marron,
  ...puntoLimpio,
  ...sigre,
  ...textil,
]

export const ECO_TIPS = ecoTipsData

export const IMPACT_EQUIVALENTS = impactData
