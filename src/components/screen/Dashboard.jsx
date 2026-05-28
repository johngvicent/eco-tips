import { useState, useEffect } from 'react'
import { WASTE_DATA, ECO_TIPS } from '../../constants'
import Button from '../ui/Button'

// Randomly pick a daily tip seeded by today's date
const getDailyTip = () => {
  const idx = new Date().getDate() % ECO_TIPS.length
  return ECO_TIPS[idx]
}

const KPI_CARDS = [
  { icon: 'co2',        value: '1.2 t',  label: 'CO₂ evitado este mes',   bg: 'bg-mint-green',           text: 'text-primary' },
  { icon: 'water_drop', value: '850 L',  label: 'Agua conservada',         bg: 'bg-surface-container-high', text: 'text-primary' },
  { icon: 'bolt',       value: '420 kWh',label: 'Energía ahorrada',        bg: 'bg-surface-container-high', text: 'text-primary' },
]

const LEARN_CARDS = [
  {
    title: 'Economía Circular en el Hogar',
    desc: 'Cómo cerrar el ciclo de tus consumos diarios.',
    tag: 'Avanzado',
    bg: 'bg-surface-container',
    view: 'guide',
  },
  {
    title: 'Primeros Pasos en el Reciclaje',
    desc: 'Los 5 materiales que más impacto tienen al reciclar.',
    tag: 'Principiante',
    bg: 'bg-mint-green',
    view: 'search',
  },
]

const Dashboard = ({ onNavigate }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const dailyTip = getDailyTip()

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    const q = query.toLowerCase()
    setResults(
      WASTE_DATA.filter(
        item =>
          item.name.toLowerCase().includes(q) ||
          item.examples.toLowerCase().includes(q) ||
          item.lerCode.includes(q)
      ).slice(0, 5)
    )
  }, [query])

  const handleResultClick = (item) => {
    setQuery(item.name)
    setResults([])
    onNavigate('search')
  }

  return (
    <div className="max-w-safe-width mx-auto px-space-4 py-space-6 space-y-space-6">

      {/* ── Hero + Search ── */}
      <section className="flex flex-col md:flex-row gap-space-5 items-center justify-between py-space-4">
        <div className="w-full md:w-1/2 space-y-space-4">
          <h1 className="font-display text-headline-xl text-primary max-w-lg">
            Transforma tus residuos en impacto positivo
          </h1>
          <p className="text-body-lg text-secondary max-w-md">
            Descubre cómo reciclar correctamente cualquier objeto y visualiza el cambio que generas.
          </p>

          {/* Quick search widget */}
          <div className="relative max-w-lg mt-space-5 group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-outline text-[20px]">search</span>
            </div>
            <input
              type="search"
              aria-label="Búsqueda rápida de residuos"
              aria-autocomplete="list"
              aria-controls="hero-results"
              placeholder="¿Qué quieres desechar hoy?"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-12 pr-space-4 py-4 bg-surface-container-low border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-base custom-shadow outline-none text-body-md"
            />
            {results.length > 0 && (
              <ul
                id="hero-results"
                role="listbox"
                className="absolute left-0 right-0 top-full mt-2 bg-surface-container-lowest rounded-xl custom-shadow border border-outline-variant overflow-hidden z-50"
              >
                {results.map(item => (
                  <li key={item.name} role="option">
                    <Button
                      variant="ghost"
                      onClick={() => handleResultClick(item)}
                      className="w-full text-left px-space-4 py-3 flex items-center gap-3 hover:bg-surface-container transition-base text-body-md text-on-surface focus-visible:bg-surface-container focus-visible:outline-none"
                    >
                      <span className="material-symbols-outlined text-[18px] text-on-surface-variant">{item.icon}</span>
                      <span className="flex-1">{item.name}</span>
                      <span className="text-label-md text-on-surface-variant">{item.container}</span>
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Hero visual — gradient block with icon */}
        <div
          aria-hidden="true"
          className="w-full md:w-1/2 aspect-video rounded-xl overflow-hidden custom-shadow border border-surface-variant bg-linear-to-br from-mint-green via-surface-container to-primary-fixed flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-primary opacity-30" style={{ fontSize: '180px', fontVariationSettings: "'FILL' 1" }}>
            recycling
          </span>
        </div>
      </section>

      {/* ── Bento Grid: Tip + KPIs ── */}
      <section aria-label="Estadísticas de impacto" className="grid grid-cols-1 md:grid-cols-4 gap-space-4">

        {/* Daily Tip — spans 2 cols */}
        <article className="md:col-span-2 bg-idea-yellow p-space-4 rounded-lg flex flex-col justify-between custom-shadow transition-bezier hover:-translate-y-1">
          <div className="space-y-space-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
              <span className="text-label-md text-primary uppercase tracking-wider font-bold">Eco-Tip del día</span>
            </div>
            <h2 className="font-display text-headline-md text-primary">{dailyTip.title}</h2>
            <p className="text-body-md text-on-secondary-fixed-variant">{dailyTip.body}</p>
          </div>
          <div className="mt-space-4 flex gap-space-2 flex-wrap">
            <span className="bg-primary/10 px-3 py-1 rounded-full text-xs font-bold text-primary capitalize">{dailyTip.category}</span>
            <span className="bg-primary/10 px-3 py-1 rounded-full text-xs font-bold text-primary">Impacto: {dailyTip.impact}</span>
          </div>
        </article>

        {/* KPI Cards */}
        {KPI_CARDS.map(({ icon, value, label, bg, text }) => (
          <article key={label} className={`${bg} p-space-4 rounded-lg flex flex-col justify-center items-center text-center custom-shadow transition-bezier hover:-translate-y-1`}>
            <span className={`material-symbols-outlined text-4xl mb-2 ${text}`} style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
            <span className={`font-display text-headline-lg ${text}`}>{value}</span>
            <span className="text-label-md text-on-secondary-container">{label}</span>
          </article>
        ))}

        {/* Community banner — spans 3 cols */}
        <article className="md:col-span-3 bg-surface-container-lowest p-space-4 rounded-lg border border-border flex items-center gap-space-4 custom-shadow">
          <div className="h-14 w-14 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary text-3xl">groups</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-headline-sm text-primary">Impacto Comunitario</h3>
            <p className="text-body-md text-secondary">Has contribuido al top 5% de recicladores en tu zona esta semana. ¡Sigue así!</p>
          </div>
          <Button
            variant="ghost"
            onClick={() => onNavigate('stats')}
            aria-label="Ver estadísticas completas"
            className="shrink-0 min-w-11 min-h-11 flex items-center justify-center text-outline hover:text-primary transition-base focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 focus-visible:rounded-md"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </Button>
        </article>
      </section>

      {/* ── Learn Section ── */}
      <section aria-label="Guías de aprendizaje" className="py-space-6">
        <div className="flex flex-col md:flex-row gap-space-6">
          <div className="w-full md:w-1/3">
            <h2 className="font-display text-headline-lg text-primary mb-space-3">Próximos Pasos Circulares</h2>
            <p className="text-body-md text-secondary mb-space-4">Nuestra guía editorial para llevar tu sostenibilidad al siguiente nivel.</p>
            <Button
              variant="ghost"
              onClick={() => onNavigate('guide')}
              className="text-button text-primary font-display border-2 border-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-on-primary transition-bezier min-h-11 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            >
              Ver Guía Completa
            </Button>
          </div>

          <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-space-4">
            {LEARN_CARDS.map(card => (
              <Button
                variant="ghost"
                key={card.title}
                onClick={() => onNavigate(card.view)}
                className={`group text-left ${card.bg} rounded-xl p-space-4 custom-shadow transition-bezier hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2`}
              >
                <div className="flex items-center justify-between mb-space-3">
                  <span className="bg-surface-container-lowest/80 backdrop-blur-md px-2 py-1 rounded-md text-label-md text-primary text-xs font-bold">{card.tag}</span>
                  <span className="material-symbols-outlined text-primary text-[18px] group-hover:translate-x-1 transition-bezier">arrow_forward</span>
                </div>
                <h4 className="font-display text-headline-sm text-primary group-hover:underline">{card.title}</h4>
                <p className="text-body-md text-on-surface-variant text-sm mt-1">{card.desc}</p>
              </Button>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default Dashboard

