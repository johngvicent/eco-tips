import { useState, useCallback } from 'react'
import { ECO_TIPS } from '../../constants'
import Button from '../ui/Button'
import NEWS from '../../data/news.json'

const CATEGORIES = [
  { key: 'Todos',      label: 'Todos',      icon: 'grid_view' },
  { key: 'agua',       label: 'Agua',       icon: 'water_drop' },
  { key: 'energía',    label: 'Energía',    icon: 'bolt' },
  { key: 'residuos',   label: 'Residuos',   icon: 'delete_outline' },
  { key: 'transporte', label: 'Transporte', icon: 'directions_car' },
]

const CAT_LABEL = {
  agua: 'AGUA', energía: 'ENERGÍA', residuos: 'RESIDUOS', transporte: 'TRANSPORTE',
}

// Rotating palettes for the featured card
const PALETTES = [
  { bg: 'bg-idea-yellow',        text: 'text-primary',                 sub: 'text-primary/80',             icon: 'text-primary',                 badge: 'bg-primary/10 text-primary border-primary/20',    blur: 'bg-black/5' },
  { bg: 'bg-mint-green',         text: 'text-primary',                 sub: 'text-primary/80',             icon: 'text-primary',                 badge: 'bg-primary/10 text-primary border-primary/20',    blur: 'bg-black/5' },
  { bg: 'bg-surface-container',  text: 'text-primary',                 sub: 'text-on-surface-variant',     icon: 'text-primary',                 badge: 'bg-primary/10 text-primary border-primary/20',    blur: 'bg-black/5' },
  { bg: 'bg-surface-variant',    text: 'text-primary',                 sub: 'text-on-surface-variant',     icon: 'text-primary',                 badge: 'bg-primary/10 text-primary border-primary/20',    blur: 'bg-black/5' },
  { bg: 'bg-primary',            text: 'text-white',                   sub: 'text-white/80',               icon: 'text-white',                   badge: 'bg-white/10 text-white border-white/20',          blur: 'bg-white/5' },
  { bg: 'bg-secondary-container',text: 'text-on-secondary-fixed-variant', sub: 'text-on-secondary-fixed-variant', icon: 'text-on-secondary-fixed-variant', badge: 'bg-primary/10 text-primary border-primary/20', blur: 'bg-black/5' },
]


const EcoTips = () => {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [currentTip, setCurrentTip] = useState(ECO_TIPS.find(t => t.featured) ?? ECO_TIPS[0])
  const [paletteIdx, setPaletteIdx] = useState(0)
  const [fading, setFading] = useState(false)

  const handleGenerate = useCallback(() => {
    const pool = activeCategory === 'Todos'
      ? ECO_TIPS
      : ECO_TIPS.filter(t => t.category === activeCategory)

    setFading(true)
    setTimeout(() => {
      let next
      do {
        next = pool[Math.floor(Math.random() * pool.length)]
      } while (next.id === currentTip.id && pool.length > 1)
      setCurrentTip(next)
      setPaletteIdx(p => (p + 1) % PALETTES.length)
      setFading(false)
    }, 150)
  }, [activeCategory, currentTip.id])

  const palette = PALETTES[paletteIdx]

  return (
    <div className="max-w-safe-width mx-auto px-space-4 py-space-6">

      {/* Hero */}
      <header className="mb-space-6 max-w-3xl">
        <h1 className="font-display text-headline-xl text-primary mb-space-2">
          Pequeños pasos, <br />
          <span className="text-secondary">grandes impactos.</span>
        </h1>
        <p className="text-body-lg text-on-surface-variant">
          Un repositorio editorial de consejos prácticos para una vida circular. Filtrado por lo que más importa para el planeta.
        </p>
      </header>

      {/* Category Filter */}
      <div
        role="group"
        aria-label="Filtrar por categoría"
        className="flex flex-wrap gap-space-3 mb-space-6"
      >
        {CATEGORIES.map(cat => (
          <Button
            key={cat.key}
            variant="ghost"
            onClick={() => setActiveCategory(cat.key)}
            aria-pressed={activeCategory === cat.key}
            className={`px-space-4 py-space-2 rounded-xl font-button text-button flex items-center gap-2 transition-colors duration-200 ${
              activeCategory === cat.key
                ? 'bg-primary text-on-primary'
                : 'bg-mint-green text-secondary hover:bg-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-sm">{cat.icon}</span>
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Featured Tip Card */}
      <section className="max-w-4xl mx-auto mb-space-6">
        <div className={`${palette.bg} rounded-lg p-space-6 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.05)] relative overflow-hidden group min-h-87.5 transition-all duration-300`}>

          {/* Content */}
          <div
            className="relative z-10"
            style={{
              opacity: fading ? 0 : 1,
              transform: fading ? 'translateY(10px)' : 'translateY(0)',
              transition: 'opacity 0.15s ease, transform 0.15s ease',
            }}
          >
            <div className="flex justify-between items-start mb-space-5">
              <span className={`bg-white/30 backdrop-blur-md px-space-3 py-1 rounded-md text-label-md font-bold uppercase tracking-wider ${palette.text}`}>
                {CAT_LABEL[currentTip.category] ?? 'DESTACADO'}
              </span>
              <span className={`material-symbols-outlined text-5xl ${palette.icon}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                {currentTip.icon}
              </span>
            </div>
            <h3 className={`font-display text-headline-lg mb-space-4 ${palette.text}`}>
              {currentTip.title}
            </h3>
            <p className={`text-body-lg mb-space-6 max-w-2xl ${palette.sub}`}>
              {currentTip.body}
            </p>
            <div className="flex flex-wrap items-center gap-space-3">
              <span className={`px-space-3 py-1 rounded-md text-label-md font-medium border ${palette.badge}`}>
                Dificultad: {currentTip.difficulty}
              </span>
              <span className={`px-space-3 py-1 rounded-md text-label-md font-medium border ${palette.badge}`}>
                Impacto: {currentTip.impact}
              </span>
            </div>
          </div>

          {/* Abstract blur decoration */}
          <div className={`absolute -right-20 -bottom-20 w-64 h-64 ${palette.blur} rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700`} />
        </div>

        {/* Generate button */}
        <div className="mt-space-5 flex justify-center">
          <Button
            onClick={handleGenerate}
            variant="primary"
            className="bg-primary text-on-primary px-10 py-4 rounded-xl font-button text-button hover:bg-primary-container hover:shadow-lg transition-all active:scale-95 flex items-center gap-3"
          >
            <span className="material-symbols-outlined">auto_awesome</span>
            <span>¡Dame un Tip!</span>
          </Button>
        </div>
      </section>

      {/* News Section */}
      <section className="mt-20 border-t border-border pt-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-space-6">
          <div>
            <h2 className="font-display text-headline-lg text-primary mb-2">Noticias de Impacto</h2>
            <p className="text-body-md text-on-surface-variant">
              Avances y descubrimientos globales para un futuro más sostenible.
            </p>
          </div>
          <a href="#" className="text-primary font-button text-label-md hover:underline flex items-center gap-1 mt-4 md:mt-0">
            Ver todas las noticias{' '}
            <span className="material-symbols-outlined text-sm">arrow_outward</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-5">
          {NEWS.map(news => (
            <article
              key={news.id}
              className="bg-surface rounded-lg overflow-hidden border border-border shadow-[0_10px_30px_rgba(0,0,0,0.05)] flex flex-col group"
            >
              {/* Placeholder image area */}
              <div className="h-48 bg-surface-container relative overflow-hidden flex items-center justify-center">
                <span className="material-symbols-outlined text-outline-variant text-[72px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                  {news.icon}
                </span>
                <span className="absolute top-4 left-4 bg-primary/80 backdrop-blur-sm text-white px-space-2 py-1 rounded text-[10px] font-medium uppercase tracking-widest">
                  {news.category}
                </span>
              </div>

              <div className="p-space-4 flex flex-col grow">
                <h4 className="font-display text-headline-sm text-text-main mb-space-2 line-clamp-2">
                  {news.title}
                </h4>
                <p className="text-body-md text-on-surface-variant mb-space-4 line-clamp-3">
                  {news.excerpt}
                </p>
                <div className="mt-auto pt-space-3 border-t border-border flex justify-between items-center">
                  <span className="text-on-surface-variant text-label-md">{news.readTime}</span>
                  <a href="#" className="text-primary font-bold text-label-md flex items-center gap-1">
                    Leer más{' '}
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default EcoTips

