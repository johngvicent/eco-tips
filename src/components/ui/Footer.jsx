const LEGAL_LINKS = [
  { label: 'Aviso legal',           view: 'legal' },
  { label: 'Política de privacidad', view: 'privacidad' },
  { label: 'Cookies',               view: 'cookies' },
]

const SOCIAL_LINKS = [
  { label: 'GitHub',   img: '/branding/icon-github.png',   href: '#' },
  { label: 'LinkedIn', img: '/branding/icon-linkedin.png', href: '#' },
  { label: 'Web',      icon: 'public',                     href: '#' },
  { label: 'PayPal',   img: '/branding/icon-paypal.png',   href: '#' },
]

export default function Footer({ onNavigate }) {
  return (
    <footer className="hidden md:block bg-surface-container border-t border-border mt-auto">
      <div className="grid grid-cols-3 gap-space-6 max-w-safe-width mx-auto px-space-4 py-space-6 w-full">

        {/* Col 1 — Branding */}
        <div className="flex flex-col gap-space-2">
          <img src="/branding/ecologo.svg" alt="EcoTips" className="h-7 w-auto" />
          <p className="text-body-md text-on-surface-variant max-w-xs">
            Educación para un futuro circular y sostenible.
          </p>
        </div>

        {/* Col 2 — Legal */}
        <div className="flex flex-col gap-space-2">
          <p className="text-label-md font-bold text-on-surface uppercase tracking-wider">Legal</p>
          <nav aria-label="Legal" className="flex flex-col gap-1">
            {LEGAL_LINKS.map(({ label, view }) => (
              <button
                key={label}
                onClick={() => view && onNavigate(view)}
                className={`text-label-md text-on-surface-variant hover:text-primary transition-colors text-left ${!view ? 'cursor-default opacity-60' : ''}`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Col 3 — Copyright + social */}
        <div className="flex flex-col gap-space-3 items-start">
          <p className="text-label-md text-on-surface-variant">
            © 2026 John Vicent. Todos los Derechos Reservados
          </p>
          <div className="flex gap-space-2">
            {SOCIAL_LINKS.map(({ label, icon, img, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-mint-green transition-colors text-primary"
              >
                {img
                  ? <img src={img} alt={label} className="w-5 h-5 object-contain" />
                  : <span className="material-symbols-outlined text-[20px]">{icon}</span>
                }
              </a>
            ))}
          </div>
        </div>

      </div>
      <div className="h-1 w-full bg-mint-green" />
    </footer>
  )
}
