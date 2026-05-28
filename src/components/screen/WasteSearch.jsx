import { useState, useEffect } from "react"
import { WASTE_DATA, CONTAINER_STYLES } from "../../constants"
import Button from "../ui/Button"
import SearchBox from "../ui/SearchBox"

const WasteSearch = ({ onNavigate }) => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [selected, setSelected] = useState(null)
  const [activeTab, setActiveTab] = useState("prep")

  const normalize = (str) =>
    str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

  useEffect(() => {
    const q = normalize(query.trim())
    if (!q) { setResults([]); return }
    setResults(
      WASTE_DATA.filter(
        item =>
          normalize(item.name).includes(q) ||
          normalize(item.examples).includes(q) ||
          item.lerCode.includes(q) ||
          normalize(item.container).includes(q)
      )
    )
    setSelected(null)
  }, [query])

  const selectItem = (item) => {
    setSelected(item)
    setResults([])
    setQuery(item.name)
    setActiveTab("prep")
  }

  const containerStyle = selected ? CONTAINER_STYLES[selected.container] : null

  return (
    <div className="max-w-safe-width mx-auto px-space-4 py-space-6 space-y-space-6">

      {/* Header */}
      <header className="max-w-2xl">
        <h1 className="font-display text-headline-xl text-primary mb-space-3">
          Buscador de Residuos
        </h1>
        <p className="text-body-lg text-on-surface-variant">
          Escribe el nombre de cualquier objeto, material o código LER para saber cómo reciclarlo correctamente.
        </p>
      </header>

      {/* Search Box */}
      <section aria-label="Búsqueda" className="relative max-w-2xl">
        <label htmlFor="waste-search" className="sr-only">Buscar residuo</label>
        <SearchBox
          value={query}
          onChange={setQuery}
          results={results}
          onSelect={selectItem}
          onClear={() => { setQuery(""); setSelected(null); setResults([]) }}
          placeholder="Ej: botella de vidrio, cartón pizza, LER 15 01 01…"
          id="waste-search"
          resultsId="search-results"
          containerStyles={CONTAINER_STYLES}
        />
      </section>

      {/* Result Panel */}
      {selected && containerStyle && (
        <section aria-label={`Resultado para ${selected.name}`} className="space-y-space-4">
          {/* Container badge + item name */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-space-4 p-space-5 rounded-xl custom-shadow" style={{ backgroundColor: "var(--color-surface-container-lowest)" }}>
            <div className={`flex items-center gap-3 ${containerStyle.text}`}>
              <div className={`w-14 h-14 rounded-xl ${containerStyle.bg} flex items-center justify-center shrink-0`}>
                <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>{selected.icon}</span>
              </div>
              <div>
                <p className="text-label-md text-on-surface-variant uppercase tracking-wider text-xs mb-0.5">Contenedor</p>
                <span className={`text-button font-display px-4 py-1.5 rounded-full ${containerStyle.badge}`}>
                  {selected.container}
                </span>
              </div>
            </div>
            <div className="flex-1 border-t sm:border-t-0 sm:border-l border-border pt-space-3 sm:pt-0 sm:pl-space-4">
              <h2 className="font-display text-headline-lg text-primary">{selected.name}</h2>
              <p className="text-label-md text-on-surface-variant">LER {selected.lerCode} · {selected.category}</p>
              <p className="text-body-md text-on-secondary-container mt-1">{selected.examples}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-border" role="tablist" aria-label="Secciones del resultado">
            {[
              { key: "prep",  label: "Preparación" },
              { key: "tip",   label: "Eco-Tip" },
              { key: "fact",  label: "¿Sabías que…?" },
            ].map(tab => (
              <Button
                variant="ghost"
                key={tab.key}
                role="tab"
                aria-selected={activeTab === tab.key}
                aria-controls={`tab-panel-${tab.key}`}
                id={`tab-${tab.key}`}
                onClick={() => setActiveTab(tab.key)}
                className={`inline-block pb-3 mr-6 text-label-md font-bold border-b-2 transition-base focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
                  activeTab === tab.key
                    ? "border-primary text-primary"
                    : "border-transparent text-on-surface-variant hover:text-primary"
                }`}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Tab panels */}
          <div className="min-h-20">
            {activeTab === "prep" && (
              <div id="tab-panel-prep" role="tabpanel" aria-labelledby="tab-prep" className="bg-surface-container-lowest p-space-4 rounded-xl border border-border">
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-primary text-[22px] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>checklist</span>
                  <p className="text-body-lg text-on-surface">{selected.preparation}</p>
                </div>
              </div>
            )}
            {activeTab === "tip" && (
              <div id="tab-panel-tip" role="tabpanel" aria-labelledby="tab-tip" className="bg-mint-green p-space-4 rounded-xl">
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-primary text-[22px] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                  <p className="text-body-lg text-primary">{selected.tip}</p>
                </div>
              </div>
            )}
            {activeTab === "fact" && (
              <div id="tab-panel-fact" role="tabpanel" aria-labelledby="tab-fact" className="bg-idea-yellow p-space-4 rounded-xl">
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-primary text-[22px] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>tips_and_updates</span>
                  <p className="text-body-lg text-on-secondary-fixed-variant italic">{selected.funFact}</p>
                </div>
              </div>
            )}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-space-3">
            <Button
              variant="ghost"
              onClick={() => onNavigate("calculator")}
              className="flex items-center gap-2 bg-primary text-on-primary text-button font-display px-6 py-3 rounded-xl hover:opacity-90 transition-bezier min-h-11 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            >
              <span className="material-symbols-outlined text-[18px]">calculate</span>
              Calcular impacto
            </Button>
            <Button
              variant="ghost"
              onClick={() => onNavigate("guide")}
              className="flex items-center gap-2 border-2 border-primary text-primary text-button font-display px-6 py-3 rounded-xl hover:bg-primary hover:text-on-primary transition-bezier min-h-11 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            >
              <span className="material-symbols-outlined text-[18px]">book</span>
              Ver guía completa
            </Button>
          </div>
        </section>
      )}

      {/* Empty state */}
      {query.trim() && results.length === 0 && !selected && (
        <div className="flex flex-col items-center justify-center py-space-6 text-center gap-space-4">
          <span className="material-symbols-outlined text-primary text-6xl opacity-30">search_off</span>
          <p className="text-body-lg text-on-surface-variant max-w-sm">
            No encontramos "<strong>{query}</strong>" en nuestra base de datos. Prueba con sinónimos o el código LER.
          </p>
          <Button
            variant="ghost"
            onClick={() => onNavigate("guide")}
            className="text-label-md text-primary font-bold hover:underline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 focus-visible:rounded-sm"
          >
            Consultar Guía de Contenedores →
          </Button>
        </div>
      )}

      {/* Initial empty state */}
      {!query.trim() && !selected && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-3">
          {["Botella de vidrio", "Caja de pizza", "Batería", "Ropa usada"].map(s => (
            <Button
              variant="ghost"
              key={s}
              onClick={() => setQuery(s)}
              className="bg-surface-container-lowest border border-border rounded-xl px-4 py-3 text-body-md text-on-surface-variant hover:border-primary hover:text-primary transition-base text-left focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            >
              {s}
            </Button>
          ))}
        </div>
      )}

    </div>
  )
}

export default WasteSearch

