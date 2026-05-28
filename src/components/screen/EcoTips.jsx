import { useState } from 'react'
import { ECO_TIPS } from '../../constants'
import Button from '../ui/Button'

const CATEGORIES = ['Todos', 'agua', 'energía', 'residuos', 'transporte']

const CAT_LABELS = {
  agua: 'Agua',
  energía: 'Energía',
  residuos: 'Residuos',
  transporte: 'Transporte',
}

const DIFFICULTY_COLOR = {
  Fácil: 'bg-mint-green text-primary',
  Medio: 'bg-idea-yellow text-text-main',
  Difícil: 'bg-secondary-container text-on-secondary-container',
}

const IMPACT_COLOR = {
  Alto: 'text-primary font-bold',
  Medio: 'text-secondary font-semibold',
  Bajo: 'text-on-surface-variant',
}

const TipCard = ({ tip }) => {
  const isFeatured = tip.featured

  if (isFeatured) {
    return (
      <article className="md:col-span-2 bg-idea-yellow rounded-xl p-space-5 custom-shadow transition-bezier hover:-translate-y-1 flex flex-col justify-between">
        <div className="space-y-space-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>{tip.icon}</span>
            <span className="text-label-md text-primary uppercase tracking-wider font-bold">Destacado</span>
          </div>
          <h2 className="font-display text-headline-lg text-primary">{tip.title}</h2>
          <p className="text-body-lg text-on-secondary-fixed-variant">{tip.body}</p>
        </div>
        <div className="mt-space-4 flex flex-wrap gap-2">
          <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-bold capitalize">{CAT_LABELS[tip.category] ?? tip.category}</span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${DIFFICULTY_COLOR[tip.difficulty] ?? 'bg-surface text-on-surface'}`}>{tip.difficulty}</span>
          <span className="px-3 py-1 rounded-full bg-white/60 text-xs font-bold text-primary">
            Impacto: {tip.impact}
          </span>
        </div>
      </article>
    )
  }

  return (
    <article className="bg-surface-container-lowest rounded-xl p-space-4 border border-border custom-shadow transition-bezier hover:-translate-y-1 flex flex-col justify-between">
      <div className="space-y-space-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-primary text-[20px]">{tip.icon}</span>
          <span className="text-label-md text-on-surface-variant capitalize text-xs">{CAT_LABELS[tip.category] ?? tip.category}</span>
        </div>
        <h3 className="font-display text-headline-sm text-primary">{tip.title}</h3>
        <p className="text-body-md text-on-secondary-container">{tip.body}</p>
      </div>
      <div className="mt-space-3 flex flex-wrap gap-2 items-center pt-space-3 border-t border-outline-variant">
        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${DIFFICULTY_COLOR[tip.difficulty] ?? 'bg-surface text-on-surface'}`}>{tip.difficulty}</span>
        <span className={`text-xs ${IMPACT_COLOR[tip.impact] ?? ''}`}>
          <span className="material-symbols-outlined text-[14px] align-middle mr-0.5">trending_up</span>
          {tip.impact}
        </span>
      </div>
    </article>
  )
}

const INITIAL_VISIBLE = 6

const EcoTips = () => {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [visible, setVisible] = useState(INITIAL_VISIBLE)

  const filtered = activeCategory === 'Todos'
    ? ECO_TIPS
    : ECO_TIPS.filter(t => t.category === activeCategory)

  const shown = filtered.slice(0, visible)

  return (
    <div className="max-w-safe-width mx-auto px-space-4 py-space-6 space-y-space-6">

      {/* Header */}
      <header className="max-w-2xl">
        <h1 className="font-display text-headline-xl text-primary mb-space-3">Eco-Tips Prácticos</h1>
        <p className="text-body-lg text-on-surface-variant">
          Pequeños cambios diarios con gran impacto ambiental. Filtra por categoría y encuentra los más relevantes para ti.
        </p>
      </header>

      {/* Category Filter Pills */}
      <div role="group" aria-label="Filtrar por categoría" className="flex gap-space-2 flex-wrap">
        {CATEGORIES.map(cat => {
          const active = activeCategory === cat
          const label = cat === 'Todos' ? 'Todos' : (CAT_LABELS[cat] ?? cat)
          return (
            <Button
              variant="ghost"
              key={cat}
              onClick={() => { setActiveCategory(cat); setVisible(INITIAL_VISIBLE) }}
              aria-pressed={active}
              className={`px-4 py-2 rounded-full text-label-md font-bold transition-bezier min-h-11 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
                active
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container text-on-surface-variant border border-border hover:bg-surface-container-high hover:text-primary'
              }`}
            >
              {label}
            </Button>
          )
        })}
      </div>

      {/* Bento Grid */}
      <section
        aria-label="Lista de eco-tips"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-4"
      >
        {shown.map(tip => <TipCard key={tip.id} tip={tip} />)}
        {shown.length === 0 && (
          <p className="col-span-full text-body-lg text-on-surface-variant text-center py-space-6">
            No hay tips para esta categoría todavía.
          </p>
        )}
      </section>

      {/* Load More */}
      {visible < filtered.length && (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => setVisible(v => v + INITIAL_VISIBLE)}
            className="bg-surface-container border border-primary text-primary text-button font-display px-8 py-4 rounded-xl hover:bg-primary hover:text-on-primary transition-bezier min-h-11 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          >
            Cargar más
            <span className="material-symbols-outlined align-middle ml-1 text-[18px]">expand_more</span>
          </Button>
        </div>
      )}
    </div>
  )
}

export default EcoTips

