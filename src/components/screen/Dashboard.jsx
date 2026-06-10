import { useState } from 'react'
import { ECO_TIPS } from '../../constants'
import { useTheme } from '../../contexts/ThemeContext'
import Button from '../ui/Button'
import Card from '../ui/Card'
import Modal from '../ui/Modal'
import Hero from '../sections/hero'
import ReglamentoEuropeo from '../sections/ReglamentoEuropeo'
import Nosotros from '../sections/Nosotros'

// Select a deterministic daily tip based on the day of the year (covers all 40 tips)
const getDailyTip = () => {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const dayOfYear = Math.floor((now - start) / (1000 * 60 * 60 * 24))
  const idx = dayOfYear % ECO_TIPS.length
  return ECO_TIPS[idx]
}

const KPI_CARDS = [
  { icon: 'co2',        value: 'Emisiones evitadas',  label: 'A nivel individual, el reciclaje constante mitiga un promedio global de 100 kilos de CO₂ por persona al año.',   bg: 'bg-mint-green',           text: 'text-primary' },
  { icon: 'water_drop', value: 'Agua conservada',  label: 'Al reciclar de manera constante, una sola persona ahorra estimadamente entre 2.000 y 3.500 litros de agua al año.',         bg: 'bg-surface-container-high', text: 'text-primary' },
  { icon: 'bolt',       value: 'Energía ahorrada',label: 'Se estima un ahorro entre 250 y 400 kWh de energía al año.',        bg: 'bg-surface-container-high', text: 'text-primary' },
]

const LEARN_CARDS = [
  {
    title: 'Reglamento Europeo de Envases',
    desc: 'Cómo Europa está regulando los envases para un futuro más sostenible.',
    tag: 'Legal',
    image: '/img/recycling-bins.jpg',
    action: 'modal',
  },
  {
    title: 'Nosotros y el Reciclaje',
    desc: 'Conoce nuestra misión y el por qué creamos esta plataforma.',
    tag: 'Contacto',
    image: '/img/john-thumbnail.PNG',
    action: 'modal-nosotros',
  },
]

const Dashboard = ({ onNavigate }) => {
  const dailyTip = getDailyTip()
  const { darkMode } = useTheme()
  const [isReglamentoOpen, setIsReglamentoOpen] = useState(false)
  const [isNosotrosOpen, setIsNosotrosOpen] = useState(false)

  return (
    <>
      {/* ── Hero + Search ── */}
      <Hero onNavigate={onNavigate} />

      <div className="max-w-safe-width mx-auto px-space-4 py-space-6 space-y-space-6">

      {/* ── Bento Grid: Tip + KPIs ── */}
      <section aria-label="Estadísticas de impacto" className="grid grid-cols-1 md:grid-cols-4 gap-space-4">

        {/* Daily Tip — spans 2 cols */}
        <Card
          variant="03"
          label="Eco-Tip del día"
          title={dailyTip.title}
          body={dailyTip.body}
          badges={[dailyTip.category, `Impacto: ${dailyTip.impact}`]}
          className="md:col-span-2"
        >
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
        </Card>

        {/* KPI Cards */}
        {KPI_CARDS.map(({ icon, value, label, bg }) => {
          const variant = bg === 'bg-mint-green' ? '02' : '01'
          return (
            <Card
              key={label}
              variant={variant}
              title={value}
              body={label}
              className="items-center text-center"
            >
              <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
            </Card>
          )
        })}

        {/* Community banner — spans 3 cols */}
        <Card
          variant="05"
          className="md:col-span-3 !p-0"
        >
          <div className="flex flex-col md:flex-row items-center gap-space-4 p-0">
            {/* Image column */}
            <img
              src="/img/reciclaje.png"
              alt="Reciclaje comunitario"
              className="w-full h-auto md:w-[30%] md:h-full object-contain object-center"
              loading="lazy"
              aria-hidden="true"
            />

            {/* Title + body */}
            <div className="relative flex flex-col gap-space-2 md:flex-1 w-full p-4 md:p-0">
              <h3 className="font-display card__title text-primary">Impacto Comunitario</h3>
              <p className="text-body-md text-secondary">Descubre cuánta energía, agua y CO₂ evitas al reciclar. Añade distintos materiales y calcula tu impacto combinado.</p>
            </div>
            
            {/* Chevron button */}
            <div className="relative flex flex-col gap-space-2 md:w-[10%] w-full items-center md:items-end">
              <button
                type="button"
                onClick={() => onNavigate('calculator')}
                aria-label="Ver calculadora de impacto"
                className="material-symbols-outlined text-outline hover:text-primary transition-colors p-2 text-3xl"
              >
                chevron_right
              </button>
            </div>
          </div>
        </Card>
      </section>

      {/* ── Learn Section ── */}
      <section aria-label="Guías de aprendizaje" className="py-space-6">
        <div className="flex flex-col md:flex-row gap-space-6">
          <div className="w-full md:w-1/3">
            <h2 className="font-display text-headline-lg text-primary mb-space-3">Próximos Pasos Circulares</h2>
            <p className="text-body-md text-secondary mb-space-4">Nuestra guía editorial para llevar tu sostenibilidad al siguiente nivel.</p>
            <Button
              variant="secondary"
              onClick={() => onNavigate('guide')}
              className="text-button text-primary font-display border-2 border-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-on-primary transition-bezier min-h-11 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            >
              Ver Guía Completa
            </Button>
          </div>

          <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-space-4">
            {LEARN_CARDS.map(card => (
              <Card
                key={card.title}
                variant="05"
                onClick={() => {
                  if (card.action === 'modal') setIsReglamentoOpen(true)
                  else if (card.action === 'modal-nosotros') setIsNosotrosOpen(true)
                  else onNavigate(card.view)
                }}
                className="cursor-pointer !p-0 min-h-[220px]"
              >
                {/* Background image filling the entire card area */}
                <div
                  className="absolute inset-0 z-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${card.image}')` }}
                  aria-hidden="true"
                />

                {/* Dark overlay for text readability over background image */}
                <div
                  className={`absolute inset-0 z-[1] ${darkMode ? 'bg-black/60' : 'bg-black/45'}`}
                  aria-hidden="true"
                />

                {/* Content above overlay */}
                <div className="relative z-10 flex flex-col flex-1 p-6">
                  <h3 className="font-display text-2xl font-bold text-white">{card.title}</h3>
                  <p className="text-white/80 text-base leading-relaxed">{card.desc}</p>
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded-md text-xs font-bold text-white">{card.tag}</span>
                    <span className="material-symbols-outlined text-white text-[18px] ml-auto">arrow_forward</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      </div>

      {/* ── Reglamento Europeo Modal ── */}
      <Modal
        isOpen={isReglamentoOpen}
        onClose={() => setIsReglamentoOpen(false)}
        title="Reglamento Europeo de Envases"
      >
        <ReglamentoEuropeo />
      </Modal>

      {/* ── Nosotros Modal ── */}
      <Modal
        isOpen={isNosotrosOpen}
        onClose={() => setIsNosotrosOpen(false)}
        title="Nosotros y el Reciclaje"
      >
        <Nosotros />
      </Modal>
    </>
  )
}

export default Dashboard

