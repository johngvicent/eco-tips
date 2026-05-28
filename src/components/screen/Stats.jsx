// Simulated static data for the Stats view
import Button from '../ui/Button'
const MONTHLY_DATA = [
  { month: 'Ene', kg: 12 },
  { month: 'Feb', kg: 8  },
  { month: 'Mar', kg: 15 },
  { month: 'Abr', kg: 10 },
  { month: 'May', kg: 18 },
  { month: 'Jun', kg: 22 },
  { month: 'Jul', kg: 14 },
  { month: 'Ago', kg: 9  },
  { month: 'Sep', kg: 20 },
  { month: 'Oct', kg: 25 },
  { month: 'Nov', kg: 17 },
  { month: 'Dic', kg: 30 },
]
const MAX_KG = Math.max(...MONTHLY_DATA.map(d => d.kg))

const CATEGORY_BREAKDOWN = [
  { label: 'Papel',    pct: 35, color: '#93c5fd' },  // blue-300
  { label: 'Vidrio',   pct: 25, color: '#6ee7b7' },  // emerald-300
  { label: 'Plástico', pct: 20, color: '#fde68a' },  // amber-200
  { label: 'Metal',    pct: 12, color: '#c4b5fd' },  // violet-300
  { label: 'Orgánico', pct: 8,  color: '#86efac' },  // green-300
]

const RANKING = [
  { pos: 1, name: 'Tú',        points: 340, icon: 'emoji_events',  iconColor: 'text-yellow-500' },
  { pos: 2, name: 'María G.',  points: 298, icon: 'military_tech', iconColor: 'text-slate-400'  },
  { pos: 3, name: 'Carlos R.', points: 275, icon: 'military_tech', iconColor: 'text-amber-700'  },
]

const MILESTONES = [
  { label: '10 kg',  reached: true  },
  { label: '50 kg',  reached: true  },
  { label: '100 kg', reached: false },
  { label: '250 kg', reached: false },
]
const TOTAL_KG = MONTHLY_DATA.reduce((s, d) => s + d.kg, 0)
const PROGRESS_PCT = Math.min(100, Math.round((TOTAL_KG / 100) * 100))

// Donut SVG — pure CSS, no chart library
const DonutChart = () => {
  const cx = 60, cy = 60, r = 48
  const circ = 2 * Math.PI * r
  let offset = 0
  const slices = CATEGORY_BREAKDOWN.map(cat => {
    const len = (cat.pct / 100) * circ
    const slice = { ...cat, offset, len }
    offset += len
    return slice
  })
  return (
    <svg viewBox="0 0 120 120" className="w-36 h-36" aria-hidden="true">
      {slices.map(s => (
        <circle
          key={s.label}
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={s.color}
          strokeWidth={22}
          strokeDasharray={`${s.len} ${circ - s.len}`}
          strokeDashoffset={-s.offset}
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      ))}
      <text x={cx} y={cy + 5} textAnchor="middle" className="fill-primary font-bold text-xs" style={{ fontSize: 11 }}>
        {TOTAL_KG} kg
      </text>
    </svg>
  )
}

const Stats = ({ onNavigate }) => (
  <div className="max-w-safe-width mx-auto px-space-4 py-space-6 space-y-space-6">

    {/* Header */}
    <header className="max-w-2xl">
      <h1 className="font-display text-headline-xl text-primary mb-space-3">Mis Estadísticas</h1>
      <p className="text-body-lg text-on-surface-variant">
        Visualiza tu impacto acumulado, progreso mensual y tu posición en la comunidad recicladora.
      </p>
    </header>

    {/* Top KPI row */}
    <section aria-label="Resumen de impacto" className="grid grid-cols-2 md:grid-cols-4 gap-space-4">
      {[
        { icon: 'recycling',  label: 'Total reciclado',  value: `${TOTAL_KG} kg`,  bg: 'bg-mint-green'              },
        { icon: 'co2',        label: 'CO₂ evitado',      value: `${(TOTAL_KG * 0.9).toFixed(0)} kg`,  bg: 'bg-surface-container-high' },
        { icon: 'bolt',       label: 'Energía ahorrada', value: `${(TOTAL_KG * 1.5).toFixed(0)} kWh`, bg: 'bg-idea-yellow'            },
        { icon: 'water_drop', label: 'Agua conservada',  value: `${(TOTAL_KG * 4.2).toFixed(0)} L`,   bg: 'bg-primary-fixed'          },
      ].map(({ icon, label, value, bg }) => (
        <article key={label} className={`${bg} p-space-4 rounded-xl custom-shadow flex flex-col items-center text-center transition-bezier hover:-translate-y-1`}>
          <span className="material-symbols-outlined text-primary text-4xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
          <span className="font-display text-headline-lg text-primary">{value}</span>
          <span className="text-label-md text-on-secondary-container">{label}</span>
        </article>
      ))}
    </section>

    {/* Monthly bar chart + donut */}
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-space-5">

      {/* Bar chart — 2/3 width */}
      <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-border p-space-5 custom-shadow">
        <h2 className="font-display text-headline-sm text-primary mb-space-4">Reciclaje mensual (kg)</h2>
        <div className="flex items-end gap-space-2 h-40" role="img" aria-label="Gráfico de barras de reciclaje mensual">
          {MONTHLY_DATA.map(({ month, kg }) => (
            <div key={month} className="flex flex-col items-center flex-1 min-w-0 gap-1">
              <span className="text-[10px] font-bold text-primary hidden sm:block">{kg}</span>
              <div
                className="w-full bg-primary rounded-t-sm transition-all duration-500 hover:opacity-80"
                style={{ height: `${Math.round((kg / MAX_KG) * 100)}%` }}
                title={`${month}: ${kg} kg`}
              />
              <span className="text-[10px] text-on-surface-variant">{month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Donut + legend — 1/3 */}
      <div className="bg-surface-container-lowest rounded-xl border border-border p-space-5 custom-shadow flex flex-col gap-space-4">
        <h2 className="font-display text-headline-sm text-primary">Por categoría</h2>
        <div className="flex items-center gap-space-4">
          <DonutChart />
          <ul className="space-y-1.5 flex-1" aria-label="Leyenda de categorías">
            {CATEGORY_BREAKDOWN.map(cat => (
              <li key={cat.label} className="flex items-center gap-2 text-body-md">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: cat.color }} aria-hidden="true" />
                <span className="text-on-surface text-xs">{cat.label}</span>
                <span className="ml-auto font-bold text-primary text-xs">{cat.pct}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    {/* Ranking + Water comparison */}
    <section className="grid grid-cols-1 md:grid-cols-2 gap-space-5">

      {/* Ranking */}
      <div className="bg-surface-container-lowest rounded-xl border border-border p-space-5 custom-shadow">
        <h2 className="font-display text-headline-sm text-primary mb-space-4">Ranking comunitario</h2>
        <ol className="space-y-space-3">
          {RANKING.map(({ pos, name, points, icon, iconColor }) => (
            <li key={pos} className={`flex items-center gap-3 p-3 rounded-lg ${pos === 1 ? 'bg-idea-yellow/40' : 'bg-surface-container'}`}>
              <span className={`material-symbols-outlined text-2xl ${iconColor}`} style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
              <span className="font-display text-headline-sm text-primary flex-1">{name}</span>
              <span className="text-label-md font-bold text-primary">{points} pts</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Water comparison */}
      <div className="bg-surface-container-lowest rounded-xl border border-border p-space-5 custom-shadow">
        <h2 className="font-display text-headline-sm text-primary mb-space-4">Agua: comparación</h2>
        <div className="space-y-space-3">
          {[
            { label: 'Duchas ahorradas',    value: Math.round(TOTAL_KG * 4.2 / 60),  icon: 'shower',  max: 30 },
            { label: 'Bañeras ahorradas',   value: Math.round(TOTAL_KG * 4.2 / 150), icon: 'bathtub', max: 10 },
          ].map(({ label, value, icon, max }) => (
            <div key={label} className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">{icon}</span>
                  <span className="text-body-md text-on-surface">{label}</span>
                </div>
                <span className="font-display text-headline-sm text-primary">{value}</span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-2.5 overflow-hidden" role="progressbar" aria-valuenow={Math.min(100, Math.round((value / max) * 100))} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
                <div
                  className="bg-blue-400 h-full rounded-full transition-all duration-700"
                  style={{ width: `${Math.min(100, Math.round((value / max) * 100))}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Milestone progress */}
    <section className="bg-primary-container rounded-xl p-space-5 custom-shadow">
      <h2 className="font-display text-headline-sm text-on-primary-container mb-space-4">Próximo hito: 100 kg reciclados</h2>
      <div className="flex items-center gap-space-3 mb-space-3">
        {MILESTONES.map(m => (
          <div key={m.label} className="flex flex-col items-center gap-1 flex-1">
            <span className={`material-symbols-outlined ${m.reached ? 'text-primary' : 'text-outline'}`} style={m.reached ? { fontVariationSettings: "'FILL' 1" } : {}}>
              {m.reached ? 'task_alt' : 'radio_button_unchecked'}
            </span>
            <span className={`text-[10px] font-bold ${m.reached ? 'text-on-primary-container' : 'text-outline'}`}>{m.label}</span>
          </div>
        ))}
      </div>
      <div className="w-full bg-primary/20 rounded-full h-3 overflow-hidden" role="progressbar" aria-valuenow={PROGRESS_PCT} aria-valuemin={0} aria-valuemax={100} aria-label="Progreso hacia 100 kg">
        <div
          className="bg-primary h-full rounded-full transition-all duration-700"
          style={{ width: `${PROGRESS_PCT}%` }}
        />
      </div>
      <div className="flex justify-between mt-1 text-label-md text-on-primary-container opacity-80">
        <span>{TOTAL_KG} kg de 100 kg</span>
        <span>{PROGRESS_PCT}%</span>
      </div>
    </section>

    {/* Share CTA */}
    <section className="flex flex-col sm:flex-row gap-space-3 items-center justify-center py-space-4">
      <p className="text-body-lg text-on-surface-variant text-center">¿Orgulloso de tu impacto? ¡Compártelo!</p>
      <div className="flex gap-space-3">
        <Button
          variant="ghost"
          onClick={() => onNavigate('calculator')}
          className="flex items-center gap-2 bg-primary text-on-primary text-button font-display px-6 py-3 rounded-xl hover:opacity-90 transition-bezier min-h-11 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
        >
          <span className="material-symbols-outlined text-[18px]">calculate</span>
          Nueva simulación
        </Button>
        <Button
          variant="ghost"
          className="flex items-center gap-2 border-2 border-primary text-primary text-button font-display px-6 py-3 rounded-xl hover:bg-primary hover:text-on-primary transition-bezier min-h-11 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          aria-label="Compartir mis estadísticas"
        >
          <span className="material-symbols-outlined text-[18px]">share</span>
          Compartir
        </Button>
      </div>
    </section>

  </div>
)

export default Stats

