import { useState } from 'react'
import { WASTE_DATA, CONTAINER_STYLES } from '../../constants'
import Button from '../ui/Button'

const CONTAINERS = [
  {
    key: 'Azul',
    name: 'Azul: Papel y Cartón',
    icon: 'auto_stories',
    iconBg: 'bg-blue-600',
    iconText: 'text-white',
    cardBg: 'bg-surface-container-lowest',
    border: 'border-border',
    items: ['Cajas de cartón', 'Periódicos y revistas', 'Bolsas de papel', 'Sobres de correo'],
    tip: 'Pliégalos siempre. El cartón plegado ocupa 4 veces menos espacio, facilitando la logística de reciclaje.',
    tipColor: 'bg-blue-50 border-blue-100 text-blue-900',
    tipLabel: 'text-blue-700',
    colSpan: 'md:col-span-2 lg:col-span-2',
    no: '',
  },
  {
    key: 'Verde',
    name: 'Verde: Vidrio',
    icon: 'wine_bar',
    iconBg: 'bg-green-700',
    iconText: 'text-white',
    cardBg: 'bg-mint-green',
    border: 'border-outline-variant',
    items: ['Botellas de vino y cerveza', 'Tarros de conservas', 'Frascos de vidrio'],
    tip: '',
    tipColor: '',
    tipLabel: '',
    colSpan: '',
    no: 'Cristal, cerámica o espejos',
  },
  {
    key: 'Amarillo',
    name: 'Amarillo: Envases',
    icon: 'inventory_2',
    iconBg: 'bg-idea-yellow',
    iconText: 'text-text-main',
    cardBg: 'bg-surface-container-lowest',
    border: 'border-border',
    items: ['Botellas de plástico', 'Latas y aerosoles', 'Briks de leche y zumo'],
    tip: '',
    tipColor: '',
    tipLabel: '',
    colSpan: '',
    no: '',
    hint: 'Vacía el contenido antes de depositar',
  },
  {
    key: 'Marrón',
    name: 'Marrón: Orgánico',
    icon: 'compost',
    iconBg: 'bg-amber-800',
    iconText: 'text-white',
    cardBg: 'bg-surface-container',
    border: 'border-outline-variant',
    items: ['Restos de comida', 'Posos de café y té', 'Plantas y hojas secas', 'Servilletas usadas'],
    tip: '"Un suelo sano comienza en tu cocina."',
    tipColor: 'bg-white/50 border-amber-200 text-amber-800',
    tipLabel: '',
    colSpan: 'md:col-span-2 lg:col-span-2',
    no: '',
  },
  {
    key: 'Gris',
    name: 'Gris: Resto',
    icon: 'delete_outline',
    iconBg: 'bg-inverse-surface',
    iconText: 'text-white',
    cardBg: 'bg-inverse-surface',
    border: '',
    items: ['Pañales y productos de higiene', 'Cerámica rota', 'Colillas y chicles'],
    tip: 'Todo aquello que no se puede reciclar.',
    tipColor: '',
    tipLabel: '',
    colSpan: 'lg:col-span-2',
    no: '',
  },
]

const VisualGuide = ({ onNavigate }) => {
  const [activeContainer, setActiveContainer] = useState(null)

  const activeItems = activeContainer
    ? WASTE_DATA.filter(w => w.container === activeContainer)
    : []

  return (
    <div className="max-w-safe-width mx-auto px-space-4 py-space-6 space-y-space-6">

      {/* Header */}
      <header className="max-w-3xl">
        <h1 className="font-display text-headline-xl text-primary mb-space-3">Guía Visual de Contenedores</h1>
        <p className="text-body-lg text-on-surface-variant">
          Domina el arte de la separación de residuos. Aprende qué depositar en cada contenedor para asegurar un ciclo de vida circular.
        </p>
      </header>

      {/* Container Grid */}
      <section aria-label="Contenedores de reciclaje" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-4">
        {CONTAINERS.map(c => (
          <article
            key={c.key}
            className={`${c.cardBg} ${c.colSpan} rounded-lg p-space-4 ${c.border ? `border ${c.border}` : ''} custom-shadow transition-bezier hover:-translate-y-1`}
          >
            {/* Header row */}
            <div className="flex items-center gap-space-3 mb-space-4">
              <div className={`w-12 h-12 rounded-lg ${c.iconBg} ${c.iconText} flex items-center justify-center shrink-0`}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{c.icon}</span>
              </div>
              <h2 className={`font-display text-headline-md ${c.key === 'Gris' ? 'text-white' : 'text-primary'}`}>{c.name}</h2>
            </div>

            {/* Two-column layout for wide cards */}
            <div className={c.colSpan?.includes('col-span-2') ? 'grid md:grid-cols-2 gap-space-4' : ''}>
              <div>
                <span className="text-label-md text-primary uppercase tracking-wider block mb-2">Qué depositar</span>
                <ul className="space-y-1 text-on-surface-variant">
                  {c.items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-body-md">
                      <span className="material-symbols-outlined text-primary-container text-[18px]">check_circle</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {c.tip && (
                <div className={`p-space-3 rounded-lg border ${c.tipColor} text-sm mt-space-3 md:mt-0`}>
                  {c.tipLabel && <span className="font-bold block mb-1">{c.tipLabel}</span>}
                  <p>{c.tip}</p>
                </div>
              )}

              {c.no && (
                <div className="mt-space-3 border-t border-green-200 pt-space-2">
                  <span className="text-label-md font-bold text-error">NO: {c.no}</span>
                </div>
              )}
              {c.hint && (
                <div className="mt-space-3 flex items-center gap-2 text-primary">
                  <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                  <span className="text-label-md font-medium">{c.hint}</span>
                </div>
              )}
            </div>

            {/* Drill-down toggle */}
            <Button
              variant="ghost"
              onClick={() => setActiveContainer(activeContainer === c.key ? null : c.key)}
              aria-expanded={activeContainer === c.key}
              className={`mt-space-4 text-label-md font-bold flex items-center gap-1 transition-base focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 focus-visible:rounded-sm ${c.key === 'Gris' ? 'text-inverse-on-surface' : 'text-primary'}`}
            >
              <span className="material-symbols-outlined text-[16px]">{activeContainer === c.key ? 'expand_less' : 'expand_more'}</span>
              {activeContainer === c.key ? 'Ocultar objetos' : `Ver todos los objetos (${WASTE_DATA.filter(w => w.container === c.key).length})`}
            </Button>
          </article>
        ))}
      </section>

      {/* Expanded item list */}
      {activeContainer && activeItems.length > 0 && (
        <section aria-label={`Objetos del contenedor ${activeContainer}`} className="bg-surface-container-lowest rounded-lg border border-border p-space-5 custom-shadow">
          <h3 className="font-display text-headline-sm text-primary mb-space-4">
            Objetos — Contenedor {activeContainer}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-3">
            {activeItems.map(item => (
              <div key={item.name} className="bg-surface-container rounded-lg p-space-3 border border-border">
                <div className="flex items-start gap-2 mb-2">
                  <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">{item.icon}</span>
                  <div>
                    <p className="font-display text-headline-sm text-primary text-sm leading-snug">{item.name}</p>
                    <p className="text-label-md text-on-surface-variant">LER {item.lerCode}</p>
                  </div>
                </div>
                <p className="text-body-md text-on-surface-variant text-sm mb-2">{item.preparation}</p>
                <div className="flex items-start gap-1 bg-idea-yellow/20 rounded-md px-2 py-1">
                  <span className="material-symbols-outlined text-idea-yellow text-[14px] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>tips_and_updates</span>
                  <p className="text-label-md text-on-secondary-fixed-variant italic">{item.funFact}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="bg-primary-container rounded-lg p-space-6 flex flex-col md:flex-row items-center justify-between gap-space-5">
        <div className="max-w-xl text-center md:text-left">
          <h2 className="font-display text-headline-lg text-on-primary-container mb-space-2">¿Dudas con un residuo específico?</h2>
          <p className="text-body-lg text-on-primary-container opacity-80">
            Utiliza nuestro buscador inteligente para saber exactamente dónde tirar cualquier objeto de tu hogar.
          </p>
        </div>
        <Button
          variant="ghost"
          onClick={() => onNavigate('search')}
          className="bg-primary text-on-primary text-button font-display px-8 py-4 rounded-xl hover:opacity-90 transition-base custom-shadow min-h-11 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 whitespace-nowrap"
        >
          Probar Buscador
        </Button>
      </section>
    </div>
  )
}

export default VisualGuide

