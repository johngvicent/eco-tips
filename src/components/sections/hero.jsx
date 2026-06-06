import { useState, useEffect } from 'react'
import { WASTE_DATA } from '../../constants'
import { useTheme } from '../../contexts/ThemeContext'
import SearchBox from '../ui/SearchBox'

const normalize = (str) =>
  str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

const Hero = ({ onNavigate }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const { darkMode } = useTheme()

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
    setQuery('')
    setResults([])
    onNavigate('search', { item })
  }

  return (
    <section
      className="relative flex flex-col md:flex-row gap-space-5 items-center justify-between min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${darkMode ? '/img/hero-darkmode.png' : '/img/hero-lightmode.png'})`,
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
        <div className="relative max-w-lg mt-space-5">
          <SearchBox
            value={query}
            onChange={setQuery}
            results={results}
            onSelect={handleResultClick}
            placeholder="¿Qué quieres desechar hoy?"
            id="hero-search"
            resultsId="hero-results"
            aria-label="Búsqueda rápida de residuos"
          />
        </div>
      </div>

      {/* Spacer — keeps layout on md+ screens */}
      <div aria-hidden="true" className="hidden md:block md:w-1/2" />
    </section>
  )
}

export default Hero
