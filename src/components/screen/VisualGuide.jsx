import { useState, useEffect } from 'react'
import { WASTE_DATA } from '../../constants'
import Button from '../ui/Button'

const CONTAINERS = [
  {
    key: 'Azul',
    label: 'Azul',
    subtitle: 'Papel y Cartón',
    icon: 'auto_stories',
    iconBg: 'bg-blue-600',
    cardHoverBorder: 'hover:border-blue-500',
    cardFocusRing: 'focus:ring-blue-500',
    chevronColor: 'text-blue-600',
    titleColor: 'text-blue-800',
    detailBorder: 'border-blue-600',
    detailTitle: 'text-blue-800',
    tipBg: 'bg-blue-50 border-blue-100',
    tipTitleColor: 'text-blue-700',
    tipTextColor: 'text-blue-900',
    ecotip: 'Pliégalos siempre. El cartón plegado ocupa 4 veces menos espacio, facilitando la logística y reduciendo la huella de transporte.',
    infoBg: 'bg-surface-container-low',
    infoText: 'text-on-surface-variant',
    infoTitle: 'text-on-surface',
    info: 'No deposites servilletas sucias o cartones con restos de aceite (como cajas de pizza usadas), estos van al contenedor marrón o gris.',
    infoIsWarning: false,
  },
  {
    key: 'Verde',
    label: 'Verde',
    subtitle: 'Vidrio',
    icon: 'wine_bar',
    iconBg: 'bg-green-700',
    cardHoverBorder: 'hover:border-green-600',
    cardFocusRing: 'focus:ring-green-600',
    chevronColor: 'text-green-700',
    titleColor: 'text-green-900',
    detailBorder: 'border-green-700',
    detailTitle: 'text-green-900',
    tipBg: 'bg-green-50 border-green-100',
    tipTitleColor: 'text-green-800',
    tipTextColor: 'text-green-900',
    ecotip: 'Quita siempre los tapones de corcho o metal. El vidrio es 100% reciclable infinitas veces sin perder calidad.',
    infoBg: 'bg-red-50 border border-red-100',
    infoText: 'text-red-900',
    infoTitle: 'text-red-700',
    info: '¡Cuidado! No tires bombillas, espejos, cerámica o vasos de cristal aquí. Estos contienen materiales que dificultan el reciclaje del vidrio común.',
    infoIsWarning: true,
  },
  {
    key: 'Amarillo',
    label: 'Amarillo',
    subtitle: 'Envases',
    icon: 'inventory_2',
    iconBg: 'bg-idea-yellow',
    iconText: 'text-text-main',
    cardHoverBorder: 'hover:border-yellow-400',
    cardFocusRing: 'focus:ring-yellow-400',
    chevronColor: 'text-yellow-600',
    titleColor: 'text-text-main',
    detailBorder: 'border-yellow-400',
    detailTitle: 'text-text-main',
    tipBg: 'bg-yellow-50 border-yellow-100',
    tipTitleColor: 'text-yellow-800',
    tipTextColor: 'text-yellow-900',
    ecotip: 'Vacía el contenido antes de tirar el envase. No es necesario lavarlos con agua, pero sí que estén bien escurridos.',
    infoBg: 'bg-surface-container-low',
    infoText: 'text-on-surface-variant',
    infoTitle: 'text-on-surface',
    info: 'Muchos plásticos que no son envases (juguetes, cintas de vídeo) deben ir al punto limpio, no al contenedor amarillo.',
    infoIsWarning: false,
  },
  {
    key: 'Marrón',
    label: 'Marrón',
    subtitle: 'Orgánico',
    icon: 'compost',
    iconBg: 'bg-amber-800',
    cardHoverBorder: 'hover:border-amber-700',
    cardFocusRing: 'focus:ring-amber-700',
    chevronColor: 'text-amber-800',
    titleColor: 'text-amber-900',
    detailBorder: 'border-amber-800',
    detailTitle: 'text-amber-900',
    tipBg: 'bg-amber-50 border-amber-100',
    tipTitleColor: 'text-amber-800',
    tipTextColor: 'text-amber-900',
    ecotip: 'Utiliza bolsas compostables específicas. Este residuo se convierte en compost para nutrir nuestros suelos y cerrar el ciclo natural.',
    infoBg: 'bg-surface-container-low',
    infoText: 'text-on-surface-variant',
    infoTitle: 'text-on-surface',
    info: 'Un suelo sano comienza en tu cocina. La correcta separación de lo orgánico evita que el resto de residuos se contaminen y sean imposibles de reciclar.',
    infoIsWarning: false,
  },
  {
    key: 'Gris',
    label: 'Gris',
    subtitle: 'Resto',
    icon: 'delete',
    iconBg: 'bg-gray-500',
    cardHoverBorder: 'hover:border-gray-500',
    cardFocusRing: 'focus:ring-gray-500',
    chevronColor: 'text-gray-600',
    titleColor: 'text-gray-700',
    detailBorder: 'border-gray-500',
    detailTitle: 'text-gray-700',
    tipBg: 'bg-gray-50 border-gray-200',
    tipTitleColor: 'text-gray-700',
    tipTextColor: 'text-gray-900',
    ecotip: 'Intenta reducir al máximo el volumen de este contenedor. La mayoría de lo que tiramos aquí debería ir a otros contenedores o a centros de tratamiento especial.',
    infoBg: 'bg-surface-container-low',
    infoText: 'text-on-surface-variant',
    infoTitle: 'text-on-surface',
    info: 'El contenedor de resto es el destino final para lo que no tiene otra vía. ¡Recuerda que los medicamentos caducados van al Punto SIGRE en las farmacias!',
    infoIsWarning: false,
  },
]

const VisualGuide = ({ onNavigate }) => {
  const [activeContainer, setActiveContainer] = useState(null)
  const [showAllItems, setShowAllItems] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleToggle = (key) => {
    if (activeContainer === key) {
      setActiveContainer(null)
      setShowAllItems(false)
      setCurrentPage(0)
    } else {
      setActiveContainer(key)
      setShowAllItems(false)
      setCurrentPage(0)
    }
  }

  return (
    <div className="max-w-safe-width mx-auto px-space-4 py-space-6 space-y-space-6">

      {/* Header */}
      <header className="max-w-3xl text-center md:text-left">
        <h1 className="font-display text-headline-xl text-primary mb-space-3">Guía Visual de Contenedores</h1>
        <p className="text-body-lg text-on-surface-variant">
          Domina el arte de la separación de residuos. Selecciona un contenedor para ver detalles sobre qué depositar y consejos ecológicos.
        </p>
      </header>

      {/* 5-column Card Grid */}
      <section aria-label="Contenedores de reciclaje" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-4">
        {CONTAINERS.map(c => {
          const isActive = activeContainer === c.key
          return (
            <button
              key={c.key}
              onClick={() => handleToggle(c.key)}
              aria-expanded={isActive}
              className={`group flex flex-col bg-surface-container-lowest rounded-lg p-space-4 border text-left outline-none transition-all duration-300 focus:ring-2 ${c.cardFocusRing} ${
                isActive
                  ? `${c.detailBorder.replace('border-', 'border-')} shadow-lg border-2`
                  : `border-border ${c.cardHoverBorder} hover:shadow-lg`
              }`}
            >
              <div className={`w-12 h-12 rounded-lg ${c.iconBg} ${c.iconText ?? 'text-white'} flex items-center justify-center mb-space-3 shrink-0`}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{c.icon}</span>
              </div>
              <h3 className={`font-display text-headline-sm ${c.titleColor}`}>{c.label}</h3>
              <p className="text-label-md text-on-surface-variant mt-1">{c.subtitle}</p>
              <div className={`mt-auto pt-4 flex items-center font-medium text-label-md ${c.chevronColor}`}>
                <span>{isActive ? 'Ocultar' : 'Ver detalles'}</span>
                <span
                  className={`material-symbols-outlined ml-1 text-[18px] transition-transform duration-300 ${
                    isActive ? 'rotate-180' : 'group-hover:translate-y-0.5'
                  }`}
                >
                  keyboard_arrow_down
                </span>
              </div>
            </button>
          )
        })}
      </section>

      {/* Expanded Detail Panels */}
      <div className="space-y-space-4">
        {CONTAINERS.map(c => {
          if (activeContainer !== c.key) return null
          const containerItems = WASTE_DATA.filter(w => w.container === c.key)
          const previewItems = containerItems.slice(0, 4)
          const itemsPerPage = isMobile ? 2 : 6
          const totalPages = Math.ceil(containerItems.length / itemsPerPage)
          const safePage = Math.min(currentPage, Math.max(0, totalPages - 1))
          const pageItems = containerItems.slice(safePage * itemsPerPage, (safePage + 1) * itemsPerPage)
          return (
            <div key={c.key} className={`bg-surface-container-lowest rounded-lg border-2 ${c.detailBorder} p-space-5 shadow-xl`}>
              <div className="flex flex-col md:flex-row gap-space-5">
                {/* Left: items + eco tip */}
                <div className="flex-1">
                  <h2 className={`font-display text-headline-md ${c.detailTitle} mb-space-4`}>
                    Contenedor {c.label}: {c.subtitle}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-space-4">
                    {/* What to deposit */}
                    <div>
                      <h4 className="text-label-md text-primary uppercase tracking-wider mb-2">Qué depositar</h4>
                      <ul className="space-y-2 text-on-surface-variant">
                        {previewItems.map(item => (
                          <li key={item.name} className="flex items-center gap-2 text-body-md">
                            <span className="material-symbols-outlined text-green-600 text-[20px]">check_circle</span>
                            {item.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Eco Tip */}
                    <div className={`p-space-4 rounded-lg border ${c.tipBg}`}>
                      <h4 className={`text-label-md ${c.tipTitleColor} flex items-center gap-2 mb-2`}>
                        <span className="material-symbols-outlined text-[20px]">eco</span>
                        Eco Tip
                      </h4>
                      <p className={`text-body-md ${c.tipTextColor}`}>{c.ecotip}</p>
                    </div>
                  </div>

                  {/* All items toggle */}
                  {containerItems.length > 4 && (
                    <button
                      onClick={() => { setShowAllItems(v => !v); setCurrentPage(0) }}
                      className={`mt-space-4 flex items-center gap-1 text-label-md font-medium ${c.chevronColor} hover:underline`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {showAllItems ? 'expand_less' : 'expand_more'}
                      </span>
                      {showAllItems
                        ? 'Ocultar lista completa'
                        : `Ver todos los objetos (${containerItems.length})`}
                    </button>
                  )}
                </div>

                {/* Right: info / warning panel */}
                <div className={`md:w-1/3 ${c.infoBg} p-space-4 rounded-lg`}>
                  <h4 className={`text-label-md ${c.infoTitle} mb-2 ${c.infoIsWarning ? 'font-bold' : ''}`}>
                    {c.infoIsWarning ? '⚠ Importante' : 'Información extra'}
                  </h4>
                  <p className={`text-body-md ${c.infoText} ${c.infoIsWarning ? 'font-medium' : 'italic'}`}>
                    {c.info}
                  </p>
                </div>
              </div>

              {/* Full item cards when expanded – paginated */}
              {showAllItems && (
                <div className="mt-space-5 border-t border-border pt-space-5">
                  <div className="flex items-start gap-2">
                    {/* Left arrow */}
                    <button
                      onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                      disabled={safePage === 0}
                      aria-label="Página anterior"
                      className={`shrink-0 self-center w-9 h-9 rounded-full flex items-center justify-center border border-border transition-all disabled:opacity-30 disabled:cursor-not-allowed ${c.chevronColor} enabled:hover:bg-surface-container`}
                    >
                      <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                    </button>
                    {/* Cards grid: 3 cols × 2 rows desktop, 1 col × 2 rows mobile */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-space-3">
                      {pageItems.map(item => (
                        <div key={item.name} className="bg-surface-container rounded-lg p-space-3 border border-border">
                          <div className="flex items-start gap-2 mb-2">
                            <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">{item.icon}</span>
                            <div>
                              <p className="font-display text-sm font-semibold text-primary leading-snug">{item.name}</p>
                              <p className="text-label-md text-on-surface-variant">LER {item.lerCode}</p>
                            </div>
                          </div>
                          <p className="text-body-md text-on-surface-variant text-sm mb-2">{item.preparation}</p>
                          <div className="flex items-start gap-1 bg-idea-yellow/20 rounded-md px-2 py-1">
                            <span
                              className="material-symbols-outlined text-yellow-600 text-[14px] mt-0.5"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              tips_and_updates
                            </span>
                            <p className="text-label-md text-on-secondary-fixed-variant italic">{item.funFact}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Right arrow */}
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                      disabled={safePage === totalPages - 1}
                      aria-label="Página siguiente"
                      className={`shrink-0 self-center w-9 h-9 rounded-full flex items-center justify-center border border-border transition-all disabled:opacity-30 disabled:cursor-not-allowed ${c.chevronColor} enabled:hover:bg-surface-container`}
                    >
                      <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                    </button>
                  </div>
                  {totalPages > 1 && (
                    <p className="text-center mt-space-3 text-label-md text-on-surface-variant">
                      {safePage + 1} / {totalPages}
                    </p>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* CTA Banner */}
      <section
        className="relative rounded-lg p-space-6 flex flex-col md:flex-row items-center justify-between gap-space-5 shadow-md overflow-hidden"
        style={{
          backgroundImage: "url('/img/recycling-building.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-primary/70" aria-hidden="true" />
        <div className="relative z-10 max-w-xl text-center md:text-left">
          <h2 className="font-display text-headline-lg text-surface-container mb-space-2 [text-shadow:_0_2px_8px_rgba(0,0,0,0.6)]">¿Dudas con un residuo específico?</h2>
          <p className="text-body-lg text-surface opacity-90 font-semibold [text-shadow:_0_1px_6px_rgba(0,0,0,0.5)]">
            Utiliza nuestro buscador inteligente para saber exactamente dónde tirar cualquier objeto de tu hogar.
          </p>
        </div>
        <Button
          onClick={() => onNavigate('search')}
          className="relative z-10 bg-primary text-on-primary text-button font-display px-8 py-4 rounded-xl hover:opacity-90 transition-base custom-shadow min-h-11 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 whitespace-nowrap"
        >
          Probar Buscador
        </Button>
      </section>
    </div>
  )
}

export default VisualGuide

