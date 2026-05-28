import { useState, useEffect } from 'react'
import { WASTE_DATA } from '../../constants'
import Button from '../ui/Button'

const normalize = (str) =>
  str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

const Hero = ({ onNavigate }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    const q = normalize(query)
    setResults(
      WASTE_DATA.filter(
        item =>
          normalize(item.name).includes(q) ||
          normalize(item.examples).includes(q) ||
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
    <section
      className="relative flex flex-col md:flex-row gap-space-5 items-center justify-between min-h-screen overflow-hidden"
      style={{
        backgroundImage: 'url(/img/hero-lightmode.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="w-full md:w-1/2 space-y-space-4 px-space-6 md:pl-[64px] pt-[60px] md:pt-space-5 pb-space-5">
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

      {/* Spacer — keeps layout on md+ screens */}
      <div aria-hidden="true" className="hidden md:block md:w-1/2" />
    </section>
  )
}

export default Hero
