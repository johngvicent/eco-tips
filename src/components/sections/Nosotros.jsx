import { useTheme } from '../../contexts/ThemeContext'
import Button from '../ui/Button'

const SOCIAL_LINKS = [
  { label: 'GitHub',   imgLight: '/icons/github-green.svg',   imgDark: '/icons/github-mint.svg',   href: 'https://github.com/johngvicent/eco-tips' },
  { label: 'LinkedIn', imgLight: '/icons/linkedin-green.svg', imgDark: '/icons/linkedin-mint.svg', href: 'https://www.linkedin.com/in/johngonzalezvicent/' },
  { label: 'Web',      imgLight: '/icons/web-green.svg',      imgDark: '/icons/web-mint.svg',      href: 'https://johnvicent.es/' },
]

const Nosotros = () => {
  const { darkMode } = useTheme()
  return (
    <div className="space-y-4 flex flex-col items-center text-center">
      <h1 className="font-display text-headline-lg text-primary">Mi Nombre es John Vicent</h1>
      <img src="/img/john.PNG" alt="John Vicent" className="w-auto h-60 rounded-2xl object-cover object-center" loading="lazy" aria-hidden="true" />
      <div className="flex gap-4 w-full justify-center">
        {SOCIAL_LINKS.map(({ label, imgLight, imgDark, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex flex-col items-center gap-1 h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-mint-green transition-colors text-primary"
          >
            <img
              src={darkMode ? imgDark : imgLight}
              alt=""
              className="w-5 h-5 object-contain"
              aria-hidden="true"
            />
            <span className="text-[10px] font-medium text-on-surface-variant whitespace-nowrap">{label}</span>
          </a>
        ))}
      </div>
      <p className="text-body-md text-secondary leading-relaxed text-left">
        Esta aplicación nace de dos convicciones personales: que la ecología empieza en las decisiones
        cotidianas de cada uno, y que la tecnología debería estar al alcance de todos, sin importar
        sus capacidades o experiencia.
      </p>
      <p className="text-body-md text-secondary leading-relaxed text-left">
        Como desarrollador, creo firmemente que una plataforma accesible no es solo una cuestión técnica,
        sino un compromiso ético. Por eso EcoTips ha sido diseñada pensando en la navegación por teclado,
        el contraste adecuado, la compatibilidad con lectores de pantalla y una experiencia clara para
        cualquier persona que quiera sumarse al cambio.
      </p>
      <p className="text-body-md text-secondary leading-relaxed text-left">
        Cada funcionalidad —desde la calculadora de impacto ambiental hasta la guía de reciclaje— busca
        demostrar que pequeños gestos, multiplicados por muchas personas, generan transformaciones reales.
      </p>
      <p className="text-body-md text-secondary leading-relaxed text-left">
        Si este proyecto te resulta útil o inspirador, puedes apoyarlo con un café virtual. Eso me ayuda
        a seguir mejorando y añadiendo nuevas funcionalidades para hacer de EcoTips un recurso cada vez
        más completo para la comunidad.
      </p>
      <Button
        variant="primary"
        onClick={() => window.open('https://buymeacoffee.com/johngvicent', '_blank', 'noopener,noreferrer')}
      >
        <span className="material-symbols-outlined text-xl pr-2">local_cafe</span>
        Regálame un café
      </Button>
    </div>
  )
}

export default Nosotros