import Button from './Button'

export default function Footer() {
  return (
    <footer className="hidden md:block bg-surface-container border-t border-border mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-safe-width mx-auto px-space-4 py-space-6 gap-space-4 w-full">
        <div className="flex flex-col gap-1">
          <img src="/branding/ecologo.svg" alt="EcoTips" className="h-7 w-auto" />
          <p className="text-body-md text-on-surface-variant max-w-xs">© 2026 John Vicent. Educación para un futuro circular y sostenible.</p>
        </div>
        <nav aria-label="Pie de página" className="flex gap-space-4 flex-wrap justify-center">
          {['Principios', 'Privacidad', 'Contacto', 'Impacto'].map(l => (
            <Button variant="ghost" key={l} className="text-label-md text-on-surface-variant hover:text-primary transition-base focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-1 focus-visible:rounded-sm">
              {l}
            </Button>
          ))}
        </nav>
        <div className="flex gap-space-2">
          {['share', 'public'].map(icon => (
            <Button variant="ghost" key={icon} aria-label={icon} className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-mint-green transition-base text-primary focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">
              <span className="material-symbols-outlined text-[20px]">{icon}</span>
            </Button>
          ))}
        </div>
      </div>
      <div className="h-1 w-full bg-mint-green" />
    </footer>
  )
}
