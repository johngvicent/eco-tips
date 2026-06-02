import { useRef, useState, useEffect } from 'react'
import Button from './Button'

/**
 * SearchBox — WCAG 2.2 AA combobox.
 *
 * Props:
 *   value            — controlled input value
 *   onChange(str)    — called on every keystroke
 *   results          — pre-filtered items array (WASTE_DATA shape)
 *   onSelect(item)   — called when an option is committed (click or Enter on active)
 *   onEnter(results) — called when Enter is pressed with no active option (pass-all-results)
 *   placeholder      — input placeholder text
 *   id               — <input> id (for <label htmlFor>)
 *   resultsId        — base id for the listbox and its options
 *   onClear()        — if provided, renders a clear ✕ button
 *   containerStyles  — CONTAINER_STYLES map; enables coloured badges
 *   aria-label       — aria-label override for the input
 *
 * Keyboard contract (ARIA 1.2 combobox pattern):
 *   ArrowDown / ArrowUp  — navigate options; focus stays in input (aria-activedescendant)
 *   Enter                — commit active option, or fire onEnter with full result set
 *   Escape               — close the dropdown, keep typed value
 *   Tab                  — close the dropdown, move focus naturally
 */
const SearchBox = ({
  value,
  onChange,
  results = [],
  onSelect,
  onEnter,
  placeholder = 'Buscar...',
  id = 'search-box',
  resultsId,
  onClear,
  containerStyles,
  'aria-label': ariaLabel,
}) => {
  const inputRef = useRef(null)
  const listRef  = useRef(null)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [open, setOpen]               = useState(false)

  const listboxId = resultsId ?? `${id}-listbox`

  // Open/close in sync with incoming results
  useEffect(() => {
    if (results.length > 0) {
      setOpen(true)
    } else {
      setOpen(false)
      setActiveIndex(-1)
    }
  }, [results])

  // Scroll active option into view during keyboard navigation
  useEffect(() => {
    if (activeIndex < 0 || !listRef.current) return
    const options = listRef.current.querySelectorAll('[role="option"]')
    options[activeIndex]?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  // Close on outside pointer-down
  useEffect(() => {
    const onPointerDown = (e) => {
      if (
        listRef.current?.contains(e.target) ||
        inputRef.current?.contains(e.target)
      ) return
      setOpen(false)
      setActiveIndex(-1)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  const isOpen = open && results.length > 0

  // Commit a selection: close dropdown, notify parent, return focus to input
  const commitSelection = (item) => {
    setActiveIndex(-1)
    setOpen(false)
    onSelect(item)
    // Return focus to input so screen reader announces the result
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  const handleClear = () => {
    onClear?.()
    setActiveIndex(-1)
    setOpen(false)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (!isOpen) { setOpen(results.length > 0); return }
        setActiveIndex(i => Math.min(i + 1, results.length - 1))
        break

      case 'ArrowUp':
        e.preventDefault()
        if (!isOpen) return
        setActiveIndex(i => {
          if (i <= 0) { setOpen(false); return -1 }
          return i - 1
        })
        break

      case 'Enter':
        e.preventDefault()
        if (activeIndex >= 0 && results[activeIndex]) {
          commitSelection(results[activeIndex])
        } else if (onEnter) {
          setOpen(false)
          onEnter(results)
        } else if (results[0]) {
          commitSelection(results[0])
        }
        break

      case 'Escape':
        e.preventDefault()
        setActiveIndex(-1)
        setOpen(false)
        break

      case 'Tab':
        // Let Tab propagate naturally; just close the dropdown
        setActiveIndex(-1)
        setOpen(false)
        break

      default:
        break
    }
  }

  return (
    <div className="relative">
      {/* Search icon — decorative */}
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none" aria-hidden="true">
        <span className="material-symbols-outlined text-outline text-[20px]">search</span>
      </div>

      {/*
        role="combobox" — ARIA 1.2 combobox pattern.
        Focus stays here at all times; active option communicated via aria-activedescendant.
        autoComplete="off" prevents the browser's native autocomplete from overlapping.
      */}
      <input
        id={id}
        ref={inputRef}
        type="search"
        role="combobox"
        aria-label={ariaLabel}
        aria-autocomplete="list"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listboxId : undefined}
        aria-activedescendant={activeIndex >= 0 && isOpen ? `${listboxId}-opt-${activeIndex}` : undefined}
        placeholder={placeholder}
        value={value}
        autoComplete="off"
        onKeyDown={handleKeyDown}
        onChange={e => { onChange(e.target.value); setActiveIndex(-1) }}
        className="w-full pl-12 pr-space-4 py-4 bg-surface-container-low border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-base custom-shadow outline-none text-body-md"
      />

      {/* Clear button — onMouseDown prevents input blur before click fires */}
      {onClear && value && (
        <Button
          variant="ghost"
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleClear}
          aria-label="Limpiar búsqueda"
          className="absolute inset-y-0 right-4 flex items-center text-outline hover:text-primary transition-base focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 focus-visible:rounded-sm"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </Button>
      )}

      {/*
        Autocomplete dropdown.

        Each <li role="option"> is the interactive element — no nested <button>.
        onMouseDown + e.preventDefault() keeps focus in the input so the
        subsequent click fires correctly (single click to select).
        aria-selected marks the keyboard-active option.
      */}
      {isOpen && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-label="Resultados de búsqueda"
          className="absolute left-0 right-0 top-full mt-2 bg-surface-container-lowest rounded-xl custom-shadow border border-outline-variant overflow-hidden z-50 max-h-72 overflow-y-auto"
        >
          {results.map((item, idx) => (
            <li
              key={item.name}
              id={`${listboxId}-opt-${idx}`}
              role="option"
              aria-selected={idx === activeIndex}
              onMouseDown={(e) => {
                // Prevent input from losing focus before click resolves
                e.preventDefault()
                commitSelection(item)
              }}
              className={`w-full text-left px-space-4 py-3 flex items-center gap-3 transition-base text-body-md text-on-surface cursor-pointer select-none ${
                idx === activeIndex ? 'bg-surface-container' : 'hover:bg-surface-container'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[18px] ${containerStyles ? 'text-primary' : 'text-on-surface-variant'}`}
                aria-hidden="true"
              >
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
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBox
