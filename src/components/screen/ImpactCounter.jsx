import { useState, useMemo } from "react"
import { IMPACT_EQUIVALENTS } from "../../constants"
import Button from "../ui/Button"

// Max values for bar % calculation
const MAX = { energia: 150, agua: 500, co2: 105 }

const clamp = (val, max) => Math.min(100, Math.round((val / max) * 100))

const ImpactCounter = ({ onNavigate }) => {
  const [material, setMaterial] = useState("vidrio")
  const [kg, setKg] = useState(5)

  const mat = IMPACT_EQUIVALENTS[material]

  const results = useMemo(() => ({
    energia: +(mat.energia * kg).toFixed(1),
    agua:    +(mat.agua    * kg).toFixed(1),
    co2:     +(mat.co2     * kg).toFixed(2),
  }), [mat, kg])

  // Equivalents
  const trees   = +(results.co2 / 21).toFixed(2)   // avg tree absorbs ~21 kg CO2/year
  const ledHours = Math.round(results.energia / 0.01) // 10W LED bulb = 0.01 kWh/h

  return (
    <div className="max-w-safe-width mx-auto px-space-4 py-space-6 space-y-space-6">

      {/* Header */}
      <header className="max-w-2xl">
        <h1 className="font-display text-headline-xl text-primary mb-space-3">Calculadora de Impacto</h1>
        <p className="text-body-lg text-on-surface-variant">
          Descubre cuánta energía, agua y CO₂ evitas al reciclar. Selecciona el material y ajusta la cantidad.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-6">

        {/* Left — inputs */}
        <section aria-label="Parámetros de cálculo" className="space-y-space-5">

          {/* Material selector */}
          <div>
            <h2 className="font-display text-headline-sm text-primary mb-space-3">1. Elige el material</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-3" role="radiogroup" aria-label="Material a reciclar">
              {Object.entries(IMPACT_EQUIVALENTS).map(([key, val]) => {
                const active = material === key
                return (
                  <Button
                    variant="ghost"
                    key={key}
                    role="radio"
                    aria-checked={active}
                    onClick={() => setMaterial(key)}
                    className={`flex flex-col items-center gap-2 p-space-3 rounded-xl border-2 transition-bezier min-h-11 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
                      active
                        ? "border-primary bg-surface-container-high"
                        : "border-border bg-surface-container-lowest hover:border-primary/50 hover:bg-surface-container"
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-3xl ${active ? "text-primary" : "text-on-surface-variant"}`}
                      style={active ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                      {val.icon}
                    </span>
                    <span className={`text-label-md font-bold ${active ? "text-primary" : "text-on-surface-variant"}`}>{val.label}</span>
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Quantity slider */}
          <div>
            <div className="flex justify-between items-baseline mb-space-2">
              <h2 className="font-display text-headline-sm text-primary">2. Cantidad</h2>
              <span className="font-display text-headline-lg text-primary">{kg} kg</span>
            </div>
            <label htmlFor="kg-slider" className="sr-only">Cantidad en kilogramos</label>
            <input
              id="kg-slider"
              type="range"
              min={0.5}
              max={50}
              step={0.5}
              value={kg}
              onChange={e => setKg(+e.target.value)}
              className="w-full accent-primary"
              aria-valuemin={0.5}
              aria-valuemax={50}
              aria-valuenow={kg}
              aria-valuetext={`${kg} kilogramos`}
            />
            <div className="flex justify-between text-label-md text-on-surface-variant mt-1">
              <span>0.5 kg</span>
              <span>50 kg</span>
            </div>
          </div>

          {/* Comparison card */}
          <div className="bg-mint-green p-space-4 rounded-xl custom-shadow">
            <h3 className="font-display text-headline-sm text-primary mb-space-3">Equivale a…</h3>
            <div className="grid grid-cols-2 gap-space-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>forest</span>
                <div>
                  <p className="font-display text-headline-md text-primary">{trees}</p>
                  <p className="text-label-md text-on-secondary-container">árboles/año</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                <div>
                  <p className="font-display text-headline-md text-primary">{ledHours.toLocaleString("es")}</p>
                  <p className="text-label-md text-on-secondary-container">horas de LED</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right — results */}
        <section aria-label="Resultados de impacto" className="bg-surface-container-lowest rounded-xl border border-border p-space-5 custom-shadow space-y-space-5">
          <h2 className="font-display text-headline-sm text-primary">Impacto de reciclar {kg} kg de {mat.label}</h2>

          {[
            { key: "energia", label: "Energía ahorrada",  value: results.energia, unit: "kWh",  icon: "bolt",       color: "bg-primary" },
            { key: "agua",    label: "Agua conservada",   value: results.agua,    unit: "L",    icon: "water_drop", color: "bg-blue-400" },
            { key: "co2",     label: "CO₂ no emitido",    value: results.co2,     unit: "kg",   icon: "co2",        color: "bg-mint-green" },
          ].map(({ key, label, value, unit, icon, color }) => (
            <div key={key} className="space-y-1.5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                  <span className="text-label-md text-on-surface font-medium">{label}</span>
                </div>
                <span className="font-display text-headline-sm text-primary">{value} {unit}</span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-2.5 overflow-hidden" role="progressbar" aria-valuenow={clamp(value, MAX[key])} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
                <div
                  className={`${color} h-full rounded-full transition-all duration-500`}
                  style={{ width: `${clamp(value, MAX[key])}%` }}
                />
              </div>
            </div>
          ))}

          <div className="pt-space-3 border-t border-border flex flex-col gap-space-3">
            <p className="text-body-md text-on-surface-variant">
              Cada kilo de {mat.label} reciclado evita ~{mat.co2} kg CO₂ y ahorra {mat.energia} kWh de energía.
            </p>
            <Button
              variant="ghost"
              onClick={() => onNavigate("stats")}
              className="flex items-center gap-2 text-primary text-label-md font-bold hover:underline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 focus-visible:rounded-sm"
            >
              <span className="material-symbols-outlined text-[18px]">bar_chart</span>
              Ver mis estadísticas históricas
            </Button>
          </div>
        </section>
      </div>

      {/* Featured article */}
      <section className="bg-primary-fixed rounded-xl p-space-5 custom-shadow flex flex-col md:flex-row gap-space-4 items-center">
        <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-label-md text-primary uppercase tracking-wider font-bold mb-1">Lectura recomendada</p>
          <h3 className="font-display text-headline-sm text-primary">¿Qué ocurre con tu reciclaje después del contenedor?</h3>
          <p className="text-body-md text-on-primary-fixed-variant mt-1">Descubre el viaje de tus residuos desde la recogida hasta la nueva materia prima.</p>
        </div>
        <Button
          variant="ghost"
          onClick={() => onNavigate("guide")}
          aria-label="Ver Guía Visual completa"
          className="shrink-0 bg-primary text-on-primary px-5 py-2.5 rounded-lg text-button font-display hover:opacity-90 transition-bezier min-h-11 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
        >
          Ver Guía
        </Button>
      </section>
    </div>
  )
}

export default ImpactCounter

