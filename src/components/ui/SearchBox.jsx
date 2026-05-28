import { useRef, useState } from 'react'
import Button from './Button'

/**
 * SearchBox reutilizable.
 *
 * Props:
 *   value            — valor controlado del input
 *   onChange(str)    — callback al escribir
 *   results          — array de items ya filtrados (WASTE_DATA shape)
 *   onSelect(item)   — callback al elegir un resultado
 *   placeholder      — texto placeholder del input
 *   id               — id del <input> (para <label htmlFor>)
 *   resultsId        — id del <ul> de resultados (aria-controls)
 *   onClear()        — si se pasa, muestra botón ✕ y llama este callback al limpiar
 *   containerStyles  — objeto CONTAINER_STYLES; si se pasa, renderiza badges de color
 *   aria-label       — aria-label del input (alternativa a <label>)
 */
const SearchBox = ({
  value,
  onChange,
  results = [],
  onSelect,
  placeholder = 'Buscar...',
  id = 'search-box',
  resultsId,
  onClear,
  containerStyles,
  'aria-label': ariaLabel,
}) => {
  const inputRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(-1)

  const handleClear = () => {
    onClear?.()
    setActiveIndex(-1)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (!results.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(i => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const target = activeIndex >= 0 ? results[activeIndex] : results[0]
      if (target) { setActiveIndex(-1); onSelect(target) }
    } else if (e.key === 'Escape') {
      setActiveIndex(-1)
    }
  }

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <span className="material-symbols-outlined text-outline text-[20px]">search</span>
      </div>

      <input
        id={id}
        ref={inputRef}
        type="search"
        aria-label={ariaLabel}
        aria-autocomplete="list"
        aria-controls={results.length && resultsId ? resultsId : undefined}
        aria-expanded={results.length > 0}
        placeholder={placeholder}
        value={value}
        aria-activedescendant={activeIndex >= 0 && resultsId ? `${resultsId}-${activeIndex}` : undefined}
        onKeyDown={handleKeyDown}
        onChange={e => { onChange(e.target.value); setActiveIndex(-1) }}
        className="w-full pl-12 pr-space-4 py-4 bg-surface-container-low border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-base custom-shadow outline-none text-body-md"
      />

      {onClear && value && (
        <Button
          variant="ghost"
          onClick={handleClear}
          aria-label="Limpiar búsqueda"
          className="absolute inset-y-0 right-4 flex items-center text-outline hover:text-primary transition-base"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </Button>
      )}

      {results.length > 0 && (
        <ul
          id={resultsId}
          role="listbox"
          className="absolute left-0 right-0 top-full mt-2 bg-surface-container-lowest rounded-xl custom-shadow border border-outline-variant overflow-hidden z-50 max-h-72 overflow-y-auto"
        >
          {results.map((item, idx) => (
            <li key={item.name} id={resultsId ? `${resultsId}-${idx}` : undefined} role="option" aria-selected={idx === activeIndex}>
              <Button
                variant="ghost"
                onClick={() => { setActiveIndex(-1); onSelect(item) }}
                className={`w-full text-left px-space-4 py-3 flex items-center gap-3 transition-base text-body-md text-on-surface focus-visible:bg-surface-container focus-visible:outline-none ${idx === activeIndex ? 'bg-surface-container' : 'hover:bg-surface-container'}`}
              >
                <span className={`material-symbols-outlined text-[18px] ${containerStyles ? 'text-primary' : 'text-on-surface-variant'}`}>
                  {item.icon}
                </span>
                <span className="flex-1">{item.name}</span>
                {containerStyles ? (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${containerStyles[item.container]?.badge ?? 'bg-surface text-on-surface'}`}>
                    {item.container}
                  </span>
                ) : (
                  <span className="text-label-md text-on-surface-variant">{item.container}</span>
                )}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBox
