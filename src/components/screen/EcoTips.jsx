import { useState, useCallback } from 'react'
import { ECO_TIPS } from '../../constants'
import Button from '../ui/Button'
import Card from '../ui/Card'

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

// Card variant cycle for the featured card (maps to Card.jsx variant prop)
const VARIANT_CYCLE = ['03', '02', '01', '05', '06', '04']

const FAQ = [
  {
    id: 1,
    question: '¿Se pueden reciclar los envases sucios?',
    answer: 'No. Los envases deben estar vacíos y limpios para reciclarse correctamente. Un envase con restos de comida puede contaminar todo el lote de reciclaje. Un aclarado rápido es suficiente.',
  },
  {
    id: 2,
    question: '¿El vidrio se puede reciclar infinitamente?',
    answer: 'Sí. El vidrio es 100% reciclable y no pierde calidad ni pureza al reprocesarse, por lo que puede reciclarse infinitas veces. Además, reciclar vidrio ahorra hasta un 30% de energía comparado con producirlo desde cero.',
  },
  {
    id: 3,
    question: '¿Las bolsas compostables van al contenedor marrón?',
    answer: 'Solo si están certificadas como compostables (norma UNE EN 13432). Las bolsas compostables necesitan condiciones específicas de temperatura y humedad que solo se dan en plantas de tratamiento biológico.',
  },
  {
    id: 4,
    question: '¿Qué hago con los medicamentos caducados?',
    answer: 'Llévalos al punto SIGRE de tu farmacia más cercana. Nunca los tires a la basura ni al inodoro. Los medicamentos contienen compuestos químicos que pueden contaminar el agua y el suelo si se gestionan incorrectamente.',
  },
  {
    id: 5,
    question: '¿Los bricks van al contenedor amarillo?',
    answer: 'Sí. Los bricks (de leche, zumo, caldo) van al contenedor amarillo. Están compuestos de cartón, plástico y aluminio, y las plantas de reciclaje pueden separar estos materiales para darles una nueva vida.',
  },
  {
    id: 6,
    question: '¿Las pilas se tiran a la basura normal?',
    answer: 'Nunca. Las pilas y baterías contienen metales pesados tóxicos (mercurio, cadmio, plomo). Deben depositarse en los contenedores específicos que encontrarás en tiendas, supermercados o puntos limpios.',
  },
  {
    id: 7,
    question: '¿Los cubiertos de plástico se reciclan?',
    answer: 'Depende del material. Los cubiertos de plástico duro (PS o poliestireno) suelen tener baja demanda en reciclaje. Si son de un solo uso y están limpios, al contenedor amarillo; como alternativa, opta por cubiertos reutilizables.',
  },
  {
    id: 8,
    question: '¿Qué significa el código de reciclaje en los envases?',
    answer: 'El código de reciclaje (triángulo con un número del 1 al 7) identifica el tipo de plástico del envase. Por ejemplo: 1 (PET, botellas de agua), 2 (PEAD, envases de leche), 5 (PP, tapas y pajitas). Esto ayuda a clasificarlos correctamente.',
  },
]

function FAQItem({ item }) {
  const [open, setOpen] = useState(false)
  const panelId = `faq-panel-${item.id}`
  const btnId = `faq-btn-${item.id}`

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        id={btnId}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-3 px-space-4 py-space-3 bg-surface-container-lowest hover:bg-surface-container transition-bezier min-h-11 focus-visible:outline-2 focus-visible:outline-primary focus-visible:-outline-offset-2"
      >
        <span className="font-display text-headline-sm text-primary text-left">{item.question}</span>
        <span className={`material-symbols-outlined text-on-surface-variant shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        style={{ maxHeight: open ? '300px' : '0px' }}
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
      >
        <div className="px-space-4 pb-space-3 border-t border-border pt-space-3 bg-surface">
          <p className="text-body-md text-on-surface-variant">{item.answer}</p>
        </div>
      </div>
    </div>
  )
}


const EcoTips = () => {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [currentTip, setCurrentTip] = useState(ECO_TIPS.find(t => t.featured) ?? ECO_TIPS[0])
  const [variantIdx, setVariantIdx] = useState(0)
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
      setVariantIdx(p => (p + 1) % VARIANT_CYCLE.length)
      setFading(false)
    }, 150)
  }, [activeCategory, currentTip.id])

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
        <Card
          variant={VARIANT_CYCLE[variantIdx]}
          label={CAT_LABEL[currentTip.category] ?? 'DESTACADO'}
          title={currentTip.title}
          body={currentTip.body}
          badges={[`Dificultad: ${currentTip.difficulty}`, `Impacto: ${currentTip.impact}`]}
          className="min-h-87.5 group"
        >
          {/* Animated icon row */}
          <div
            className="relative z-10"
            style={{
              opacity: fading ? 0 : 1,
              transform: fading ? 'translateY(10px)' : 'translateY(0)',
              transition: 'opacity 0.15s ease, transform 0.15s ease',
            }}
          >
            <div className="flex justify-end items-start">
              <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                {currentTip.icon}
              </span>
            </div>
          </div>

          {/* Abstract blur decoration */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full blur-3xl bg-black/5 group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
        </Card>

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

      {/* FAQ – Preguntas frecuentes sobre reciclaje */}
      <section className="mt-20 border-t border-border pt-20">
        <div className="mb-space-6">
          <h2 className="font-display text-headline-lg text-primary mb-2">Dudas frecuentes al reciclar</h2>
          <p className="text-body-md text-on-surface-variant">
            Respuestas claras a las preguntas más comunes para que reciclar sea más fácil.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-space-2">
          {FAQ.map((item) => (
            <FAQItem key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default EcoTips

