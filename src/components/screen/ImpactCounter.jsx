import { useState, useMemo, useEffect, useRef, Fragment } from "react"
import { IMPACT_EQUIVALENTS } from "../../constants"
import { useTheme } from "../../contexts/ThemeContext"
import Button from "../ui/Button"
import { toPng } from "html-to-image"
import StatsCard from "../ui/StatsCard"

// ~10% at 1 vidrio-medium unit; 100% reached around 10 units — challenging but rewarding
const MAX_BASE = { energia: 5, agua: 10, co2: 1.5 }

const clamp = (val, max) => Math.min(100, Math.round((val / max) * 100))

// Average weight (kg) per unit, by material and size
const SIZE_WEIGHTS = {
  vidrio:   { small: 0.20,  medium: 0.50, large: 1.00 },
  papel:    { small: 0.10,  medium: 0.50, large: 2.00 },
  plastico: { small: 0.03,  medium: 0.10, large: 0.50 },
  metal:    { small: 0.015, medium: 0.06, large: 0.20 },
  organico: { small: 0.10,  medium: 0.50, large: 2.00 },
}

// Descriptive example per material + size
const SIZE_DESCRIPTIONS = {
  vidrio:   { small: "Tarro pequeño",   medium: "Botella",          large: "Tarro grande"      },
  papel:    { small: "Periódico",        medium: "Pila de papeles",  large: "Caja de cartón"    },
  plastico: { small: "Tapón / bolsa",    medium: "Botella 1 L",      large: "Contenedor"        },
  metal:    { small: "Lata pequeña",     medium: "Lata estándar",    large: "Bote grande"       },
  organico: { small: "Restos de fruta",  medium: "Restos diarios",   large: "Restos semanales"  },
}

const SIZES = [
  { key: "small",  label: "Pequeño", icon: "density_small"  },
  { key: "medium", label: "Mediano", icon: "density_medium" },
  { key: "large",  label: "Grande",  icon: "density_large"  },
]

// Color per material key for the donut chart
const MATERIAL_COLORS = {
  vidrio:   "#6ee7b7",  // emerald-300
  papel:    "#93c5fd",  // blue-300
  plastico: "#fde68a",  // amber-200
  metal:    "#c4b5fd",  // violet-300
  organico: "#35524A", // green-900
}

// Dynamic donut chart — slices: [{ label, kg, pct, color }]
const DonutChart = ({ slices, totalKg }) => {
  const cx = 60, cy = 60, r = 48
  const circ = 2 * Math.PI * r
  let offset = 0
  const computed = slices.map(s => {
    const len   = (s.pct / 100) * circ
    const slice = { ...s, offset, len }
    offset += len
    return slice
  })
  return (
    <svg viewBox="0 0 120 120" className="w-32 h-32 shrink-0" aria-hidden="true">
      {computed.map(s => (
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
      <text x={cx} y={cy - 4} textAnchor="middle" style={{ fontSize: 10, fontWeight: 700, fill: "var(--color-primary, #006837)" }}>
        {totalKg} kg
      </text>
      <text x={cx} y={cy + 9} textAnchor="middle" style={{ fontSize: 8, fill: "var(--color-on-surface-variant, #555)" }}>
        total
      </text>
    </svg>
  )
}

const STEPS = [
  { n: 1, label: "Material" },
  { n: 2, label: "Tamaño"   },
  { n: 3, label: "Cantidad" },
]

const DEFAULT_MATERIAL = "vidrio"
const DEFAULT_SIZE     = "medium"
const DEFAULT_UNITS    = 1

// Compute impact for one entry
const computeImpact = (material, size, units) => {
  const m  = IMPACT_EQUIVALENTS[material]
  const kg = +(SIZE_WEIGHTS[material][size] * units).toFixed(2)
  return {
    energia: +(m.energia * kg).toFixed(1),
    agua:    +(m.agua    * kg).toFixed(1),
    co2:     +(m.co2     * kg).toFixed(2),
  }
}

let _nextId = 1

const ImpactCounter = ({ onNavigate }) => {
  const { darkMode } = useTheme()
  const [material, setMaterial] = useState(() => localStorage.getItem("ic_material") ?? DEFAULT_MATERIAL)
  const [size,     setSize]     = useState(() => localStorage.getItem("ic_size")     ?? DEFAULT_SIZE)
  const [units,    setUnits]    = useState(DEFAULT_UNITS)
  // Locked entries: { id, material, size, units }
  const [entries,  setEntries]  = useState([])

  const [materialOpen, setMaterialOpen] = useState(false)
  const [sizeOpen,     setSizeOpen]     = useState(false)

  const [step1Done, setStep1Done] = useState(false)
  const [step2Done, setStep2Done] = useState(false)
  const [step3Done, setStep3Done] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const shareCardRef = useRef(null)

  // Persist material + size selections across sessions
  useEffect(() => {
    localStorage.setItem("ic_material", material)
    localStorage.setItem("ic_size",     size)
  }, [material, size])

  useEffect(() => {
    if (!showShareModal) return
    const onKeyDown = (e) => {
      if (e.key === "Escape") setShowShareModal(false)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [showShareModal])

  const mat        = IMPACT_EQUIVALENTS[material]
  const sizeWeight = SIZE_WEIGHTS[material][size]
  const sizeDesc   = SIZE_DESCRIPTIONS[material][size]
  const currentKg  = +(sizeWeight * units).toFixed(2)

  // Totals = locked entries + current form item (live preview)
  const totals = useMemo(() => {
    return entries.reduce(
      (acc, e) => {
        const r = computeImpact(e.material, e.size, e.units)
        return {
          energia: +(acc.energia + +r.energia).toFixed(1),
          agua:    +(acc.agua    + +r.agua   ).toFixed(1),
          co2:     +(acc.co2     + +r.co2    ).toFixed(2),
        }
      },
      { energia: 0, agua: 0, co2: 0 }
    )
  }, [entries])

  const trees    = +(totals.co2 / 21).toFixed(2)
  const ledHours = Math.round(totals.energia / 0.01)

  const totalKg = useMemo(() =>
    +entries
      .reduce((sum, e) => sum + SIZE_WEIGHTS[e.material][e.size] * e.units, 0)
      .toFixed(2),
    [entries]
  )

  // Fixed MAX — bars fill naturally as you add more items
  const MAX = MAX_BASE

  const hasEntries = entries.length > 0

  // Material breakdown for donut: group all items (entries + current) by material key
  const donutSlices = useMemo(() => {
    const all = [...entries, { material, size, units }]
    const grouped = {}
    all.forEach(e => {
      const kg = SIZE_WEIGHTS[e.material][e.size] * e.units
      grouped[e.material] = (grouped[e.material] ?? 0) + kg
    })
    const total = Object.values(grouped).reduce((s, v) => s + v, 0) || 1
    return Object.entries(grouped).map(([key, kg]) => ({
      label: IMPACT_EQUIVALENTS[key].label,
      kg:    +kg.toFixed(2),
      pct:   Math.round((kg / total) * 100),
      color: MATERIAL_COLORS[key],
    }))
  }, [entries, material, size, units])

  const shareMaterials = useMemo(() => {
    const grouped = {}
    entries.forEach((e) => {
      const kg = SIZE_WEIGHTS[e.material][e.size] * e.units
      grouped[e.material] = (grouped[e.material] ?? 0) + kg
    })
    return Object.entries(grouped).map(([key, kg]) => ({
      key,
      label: IMPACT_EQUIVALENTS[key].label,
      kg: +kg.toFixed(2),
      color: MATERIAL_COLORS[key],
    }))
  }, [entries])

  const getCardPngDataUrl = async () => {
    if (!shareCardRef.current) return null
    return toPng(shareCardRef.current, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: "#f6fbf3",
    })
  }

  const handleDownloadCard = async () => {
    if (!shareCardRef.current || isExporting) return
    try {
      setIsExporting(true)
      const dataUrl = await getCardPngDataUrl()
      if (!dataUrl) return
      const link = document.createElement("a")
      link.download = `eco-tips-impacto-${new Date().toISOString().slice(0, 10)}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error("No se pudo descargar la tarjeta:", err)
    } finally {
      setIsExporting(false)
    }
  }

  const handleShareCard = async () => {
    if (isExporting) return
    try {
      setIsExporting(true)
      const title = "Mi impacto de reciclaje en EcoTips"
      const text = "Mira mi progreso reciclando en EcoTips"
      const url = "https://eco-tips-ochre.vercel.app/"

      if (!navigator.share) {
        await handleDownloadCard()
        return
      }

      const dataUrl = await getCardPngDataUrl()
      if (!dataUrl) return
      const imageRes = await fetch(dataUrl)
      const imageBlob = await imageRes.blob()
      const imageFile = new File([imageBlob], "eco-tips-impacto.png", { type: "image/png" })

      if (navigator.canShare?.({ files: [imageFile] })) {
        await navigator.share({
          title,
          text,
          url,
          files: [imageFile],
        })
      } else {
        await navigator.share({ title, text, url })
      }
    } catch (err) {
      if (err?.name !== "AbortError") {
        console.error("No se pudo compartir la tarjeta:", err)
      }
    } finally {
      setIsExporting(false)
    }
  }

  const handleAddEntry = () => {
    setEntries(prev => [...prev, { id: _nextId++, material, size, units }])
    // Reset quantity only; keep material+size for fast repeated entry
    setUnits(DEFAULT_UNITS)
    setStep1Done(false)
    setStep2Done(false)
    setStep3Done(false)
  }

  const handleRemoveEntry = (id) => {
    setEntries(prev => prev.filter(e => e.id !== id))
  }

  const handleReset = () => {
    setMaterial(DEFAULT_MATERIAL)
    setSize(DEFAULT_SIZE)
    setUnits(DEFAULT_UNITS)
    setEntries([])
    setMaterialOpen(false)
    setSizeOpen(false)
    setStep1Done(false)
    setStep2Done(false)
    setStep3Done(false)
    localStorage.removeItem("ic_material")
    localStorage.removeItem("ic_size")
  }

  // First incomplete step determines which circle is "active"
  const activeStep = !step1Done ? 1 : !step2Done ? 2 : 3

  return (
    <div className="max-w-safe-width mx-auto px-space-4 py-space-6 space-y-space-6">

      {/* Header */}
      <header className="max-w-2xl">
        <h1 className="font-display text-headline-xl text-primary mb-space-3">Calculadora de Impacto</h1>
        <p className="text-body-lg text-on-surface-variant">
          Descubre cuánta energía, agua y CO₂ evitas al reciclar. Añade distintos materiales y calcula tu impacto combinado.
        </p>
      </header>

      {/* Progress indicator */}
      <nav aria-label="Pasos del formulario" className="flex items-start">
        {STEPS.map(({ n, label }, i) => {
          const done   = n === 1 ? step1Done : n === 2 ? step2Done : step3Done
          const active = n === activeStep
          return (
            <Fragment key={n}>
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-label-md font-bold transition-all duration-300 ${
                  done
                    ? "bg-primary text-on-primary"
                    : active
                    ? "bg-surface-container-high border-2 border-primary text-primary"
                    : "bg-surface-container border-2 border-border text-on-surface-variant"
                }`}>
                  {done
                    ? <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                    : n
                  }
                </div>
                <span className={`text-label-sm whitespace-nowrap transition-colors duration-300 ${
                  done ? "text-primary font-medium" : active ? "text-primary" : "text-on-surface-variant"
                }`}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-3 mt-4 transition-colors duration-500 ${
                  (i === 0 && step1Done) || (i === 1 && step2Done) ? "bg-primary" : "bg-border"
                }`} />
              )}
            </Fragment>
          )
        })}
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-6">

        {/* Left — inputs */}
        <section aria-label="Parámetros de cálculo" className="space-y-space-4">

          {/* 1. Material selector — accordion */}
          <div className="border border-border rounded-xl overflow-hidden">
            <button
              type="button"
              aria-expanded={materialOpen}
              aria-controls="material-panel"
              onClick={() => setMaterialOpen(v => !v)}
              className="w-full flex items-center justify-between px-space-4 py-space-3 bg-surface-container-lowest hover:bg-surface-container transition-bezier min-h-11 focus-visible:outline-2 focus-visible:outline-primary focus-visible:-outline-offset-2"
            >
              <span className="font-display text-headline-sm text-primary">1. Elige el material</span>
              <div className="flex items-center gap-2">
                {!materialOpen && (
                  <span className="flex items-center gap-1.5 text-label-md text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>{mat.icon}</span>
                    {mat.label}
                  </span>
                )}
                <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 ${materialOpen ? "rotate-180" : ""}`}>
                  expand_more
                </span>
              </div>
            </button>

            <div
              id="material-panel"
              style={{ maxHeight: materialOpen ? "500px" : "0px" }}
              className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
            >
              <div className="p-space-3 border-t border-border bg-surface">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-3" role="radiogroup" aria-label="Material a reciclar">
                  {Object.entries(IMPACT_EQUIVALENTS).map(([key, val]) => {
                    const active = material === key
                    return (
                      <Button
                        variant="ghost"
                        key={key}
                        role="radio"
                        aria-checked={active}
                        onClick={() => { setMaterial(key); setMaterialOpen(false); setStep1Done(true) }}
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
            </div>
          </div>

          {/* 2. Size selector — accordion */}
          <div className="border border-border rounded-xl overflow-hidden">
            <button
              type="button"
              aria-expanded={sizeOpen}
              aria-controls="size-panel"
              onClick={() => setSizeOpen(v => !v)}
              className="w-full flex items-center justify-between px-space-4 py-space-3 bg-surface-container-lowest hover:bg-surface-container transition-bezier min-h-11 focus-visible:outline-2 focus-visible:outline-primary focus-visible:-outline-offset-2"
            >
              <span className="font-display text-headline-sm text-primary">2. Elige el tamaño</span>
              <div className="flex items-center gap-2">
                {!sizeOpen && (
                  <span className="text-label-md text-on-surface-variant">
                    {SIZES.find(s => s.key === size)?.label} · ~{sizeWeight} kg/ud.
                  </span>
                )}
                <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 ${sizeOpen ? "rotate-180" : ""}`}>
                  expand_more
                </span>
              </div>
            </button>

            <div
              id="size-panel"
              style={{ maxHeight: sizeOpen ? "500px" : "0px" }}
              className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
            >
              <div className="p-space-3 border-t border-border bg-surface">
                <div className="grid grid-cols-3 gap-space-3" role="radiogroup" aria-label="Tamaño del ítem">
                  {SIZES.map(({ key, label, icon }) => {
                    const active = size === key
                    const weight = SIZE_WEIGHTS[material][key]
                    const desc   = SIZE_DESCRIPTIONS[material][key]
                    return (
                      <Button
                        variant="ghost"
                        key={key}
                        role="radio"
                        aria-checked={active}
                        onClick={() => { setSize(key); setSizeOpen(false); setStep2Done(true) }}
                        className={`flex flex-col items-center gap-1.5 p-space-3 rounded-xl border-2 transition-bezier min-h-11 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
                          active
                            ? "border-primary bg-surface-container-high"
                            : "border-border bg-surface-container-lowest hover:border-primary/50 hover:bg-surface-container"
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined text-3xl ${active ? "text-primary" : "text-on-surface-variant"}`}
                          style={active ? { fontVariationSettings: "'FILL' 1" } : {}}
                        >
                          {icon}
                        </span>
                        <span className={`text-label-md font-bold ${active ? "text-primary" : "text-on-surface-variant"}`}>{label}</span>
                        <span className={`text-label-sm text-center leading-tight ${active ? "text-primary/70" : "text-on-surface-variant/70"}`}>{desc}</span>
                        <span className={`text-label-sm font-mono ${active ? "text-primary" : "text-on-surface-variant"}`}>~{weight} kg</span>
                      </Button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* 3. Quantity slider */}
          <div className="px-space-4 py-space-3 border border-border rounded-xl bg-surface-container-lowest space-y-space-3">
            <div className="flex justify-between items-baseline">
              <h2 className="font-display text-headline-sm text-primary">3. Cantidad</h2>
              <span className="font-display text-headline-lg text-primary">
                {units} <span className="text-headline-sm">ud.</span>
              </span>
            </div>
            <label htmlFor="units-slider" className="sr-only">Cantidad en unidades</label>
            <div className="flex items-center gap-space-2">
              <button
                type="button"
                aria-label="Reducir cantidad"
                onClick={() => { setUnits(u => Math.max(1, u - 1)); setStep3Done(true) }}
                disabled={units <= 1}
                className="w-9 h-9 rounded-full border-2 border-border flex items-center justify-center text-primary hover:border-primary hover:bg-surface-container transition-bezier disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 shrink-0"
              >
                <span className="material-symbols-outlined text-[20px]">remove</span>
              </button>
              <input
                id="units-slider"
                type="range"
                min={1}
                max={100}
                step={1}
                value={units}
                onChange={e => { setUnits(+e.target.value); setStep3Done(true) }}
                className="flex-1 accent-primary"
                aria-valuemin={1}
                aria-valuemax={100}
                aria-valuenow={units}
                aria-valuetext={`${units} unidades`}
              />
              <button
                type="button"
                aria-label="Aumentar cantidad"
                onClick={() => { setUnits(u => Math.min(100, u + 1)); setStep3Done(true) }}
                disabled={units >= 100}
                className="w-9 h-9 rounded-full border-2 border-border flex items-center justify-center text-primary hover:border-primary hover:bg-surface-container transition-bezier disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 shrink-0"
              >
                <span className="material-symbols-outlined text-[20px]">add</span>
              </button>
            </div>
            <div className="flex justify-between text-label-md text-on-surface-variant">
              <span>1 ud.</span>
              <span>100 ud.</span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-2 pt-space-2 border-t border-border">
              <Button
                variant="secondary"
                onClick={handleReset}
                className="!m-0 w-full sm:w-auto flex items-center justify-center gap-1.5 !px-space-4 !py-2.5 !h-auto min-h-11"
              >
                <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                Reiniciar
              </Button>
              <Button
                type="button"
                onClick={handleAddEntry}
                className="!m-0 w-full sm:flex-1 flex items-center justify-center gap-1.5 bg-primary text-on-primary px-space-4 py-2.5 !h-auto min-h-11 rounded-lg text-label-md font-bold hover:opacity-90 active:scale-95 transition-bezier focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                Añadir al cálculo
              </Button>
            </div>
          </div>

        </section>

        {/* Right — results */}
        <section aria-label="Resultados de impacto" className="bg-surface-container-lowest rounded-xl border border-border p-space-5 custom-shadow space-y-space-5">

          <div className="flex items-start justify-between gap-2">
            <h2 className="font-display text-headline-sm text-primary">
              {hasEntries ? "Impacto acumulado" : `Impacto de ${units} ud. de ${mat.label}`}
            </h2>
            {hasEntries && (
              <span className="text-label-md text-on-surface-variant shrink-0 mt-0.5">{totalKg} kg</span>
            )}
          </div>

          {/* Totals bars */}
          {[
            { key: "energia", label: "Energía ahorrada",  value: totals.energia, unit: "kWh", icon: "bolt",       color: "bg-primary"    },
            { key: "agua",    label: "Agua conservada",   value: totals.agua,    unit: "L",   icon: "water_drop", color: "bg-blue-400"   },
            { key: "co2",     label: "CO₂ no emitido",    value: totals.co2,     unit: "kg",  icon: "co2",        color: "bg-[#fde68a]"  },
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

          {/* Material breakdown donut */}
          <div className="border border-border rounded-xl p-space-4">
            <h3 className="font-display text-headline-sm text-primary mb-space-3">Por material</h3>
            <div className="flex items-center gap-space-4">
              <DonutChart slices={donutSlices} totalKg={totalKg} />
              <ul className="space-y-1.5 flex-1" aria-label="Leyenda de materiales">
                {donutSlices.map(s => (
                  <li key={s.label} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: s.color }} aria-hidden="true" />
                    <span className="text-on-surface text-xs flex-1">{s.label}</span>
                    <span className="text-xs text-on-surface-variant">{s.kg} kg</span>
                    <span className="font-bold text-primary text-xs w-8 text-right">{s.pct}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Comparison card */}
          <div className="bg-mint-green p-space-4 rounded-xl">
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

          <div className="pt-space-3 border-t border-border flex flex-col gap-space-3">
            <p className="text-body-md text-on-surface-variant">
              {hasEntries
                ? `${entries.length + 1} materiales · ${totalKg} kg totales reciclados`
                : `Cada ${sizeDesc} (~${sizeWeight} kg) de ${mat.label} reciclado evita ~${mat.co2} kg CO₂ y ahorra ${mat.energia} kWh.`
              }
            </p>
            <Button
              variant="secondary"
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">bar_chart</span>
              Ver resultados globales
            </Button>
          </div>
        </section>
      </div>

      {/* Featured article */}
      <section
        className="relative rounded-xl p-space-5 custom-shadow flex flex-col md:flex-row gap-space-4 items-center overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/img/growing-plants.jpg')" }}
      >
        {/* Dark scrim — ensures WCAG AA contrast (≥4.5:1) for white text over the photo */}
        <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

        <div className="relative z-10 w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
        </div>
        <div className="relative z-10 flex-1 min-w-0">
          <p className="text-label-md text-white/80 uppercase tracking-wider font-bold mb-1">Lectura recomendada</p>
          <h3 className="font-display text-headline-sm text-white">¿Qué ocurre con tu reciclaje después del contenedor?</h3>
          <p className="text-body-md text-white/75 mt-1">Descubre el viaje de tus residuos desde la recogida hasta la nueva materia prima.</p>
        </div>
        <Button
          variant={darkMode ? 'primary-darkmode' : 'primary'}
          onClick={() => onNavigate("guide")}
          aria-label="Ver Guía Visual completa"
          className="relative z-10 shrink-0 bg-white text-primary px-5 py-2.5 rounded-lg text-button font-display hover:opacity-90 transition-bezier min-h-11 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
        >
          Ver Guía
        </Button>
      </section>

      {showShareModal && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Tarjeta para compartir">
          <button
            type="button"
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            aria-label="Cerrar modal"
            onClick={() => setShowShareModal(false)}
          />

          <div className="relative z-10 min-h-full w-full px-space-3 py-space-4 md:px-space-6 md:py-space-6 flex items-center justify-center">
            <div className="relative w-full max-w-md rounded-2xl border border-border bg-surface p-space-3 md:p-space-4 custom-shadow space-y-space-3">
              <button
                type="button"
                onClick={() => setShowShareModal(false)}
                aria-label="Cerrar"
                className="absolute -top-3 -right-3 z-30 w-11 h-11 rounded-full bg-surface-container-lowest border-2 border-border text-on-surface-variant hover:text-primary hover:border-primary transition-bezier flex items-center justify-center shadow-lg focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>

              <div ref={shareCardRef}>
                <StatsCard
                  userName="Comunidad EcoTips"
                  energia={totals.energia}
                  agua={totals.agua}
                  co2={totals.co2}
                  materials={shareMaterials}
                />
              </div>

              <div className="pt-space-2 grid grid-cols-1 sm:grid-cols-2 gap-space-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleShareCard}
                  disabled={isExporting}
                  className="w-full m-0 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined text-[18px]">share</span>
                  Compartir
                </Button>

                <Button
                  type="button"
                  onClick={handleDownloadCard}
                  disabled={isExporting}
                  style={{ height: "44px" }}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary text-on-primary text-label-md font-semibold hover:opacity-90 active:scale-95 transition-bezier disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  Descargar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImpactCounter
