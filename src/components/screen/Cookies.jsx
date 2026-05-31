const SECTIONS = [
  {
    title: '¿Qué son las cookies?',
    content: [
      'Las cookies son pequeños archivos de texto que los sitios web almacenan en tu navegador o dispositivo cuando los visitas. Se utilizan ampliamente para que los sitios web funcionen correctamente, de forma más eficiente, y para proporcionar información a los propietarios del sitio.',
      'Las cookies pueden ser de sesión (se eliminan al cerrar el navegador) o persistentes (permanecen durante un periodo determinado). También pueden ser propias (servidas por el propio sitio) o de terceros (servidas por dominios externos).',
    ],
  },
  {
    title: 'Cookies que Utiliza EcoTips',
    content: [
      'EcoTips es una aplicación web que funciona principalmente en el cliente (navegador). Actualmente utiliza las siguientes categorías de almacenamiento local:',
      '**Preferencias de tema (localStorage):** almacena si has activado el modo oscuro o claro para recordar tu preferencia entre sesiones. No se transmite a ningún servidor.',
      '**Estado de navegación (sessionStorage):** almacena temporalmente la vista activa durante la sesión de uso. Se elimina automáticamente al cerrar la pestaña.',
      '**Datos de búsqueda reciente (localStorage):** guarda las últimas búsquedas de materiales realizadas en la aplicación para ofrecerte acceso rápido. Permanece en tu dispositivo hasta que lo borres manualmente.',
    ],
  },
  {
    title: 'Cookies de Terceros',
    content: [
      'En su versión actual, EcoTips no incorpora cookies de terceros con fines publicitarios ni de rastreo. Los únicos recursos externos cargados son:',
      '**Google Fonts (Material Symbols):** la fuente de iconos se carga desde los servidores de Google. Esta petición puede generar una cookie técnica por parte de Google sujeta a su propia política de privacidad (policies.google.com).',
      'En caso de integrar en el futuro herramientas de analítica (p. ej. Google Analytics) u otras librerías externas que usen cookies, esta política se actualizará con antelación.',
    ],
  },
  {
    title: 'Clasificación por Finalidad',
    content: [
      '**Cookies estrictamente necesarias:** permiten el funcionamiento básico de la aplicación (navegación, preferencias de tema). No requieren consentimiento según la normativa vigente.',
      '**Cookies de preferencias:** almacenan ajustes personalizados (tema, búsquedas recientes) para mejorar tu experiencia. Se activan con tu uso continuado de la aplicación.',
      '**Cookies analíticas:** actualmente no se utilizan. Se informará de cualquier cambio en esta política.',
      '**Cookies publicitarias:** no se utilizan en ningún caso.',
    ],
  },
  {
    title: 'Gestión y Desactivación de Cookies',
    content: [
      'Puedes gestionar, bloquear o eliminar las cookies y datos de almacenamiento local desde la configuración de tu navegador. A continuación se indican los accesos directos de los navegadores más comunes:',
      '**Google Chrome:** Configuración → Privacidad y seguridad → Cookies y otros datos de sitios.',
      '**Mozilla Firefox:** Opciones → Privacidad y seguridad → Cookies y datos del sitio.',
      '**Safari:** Preferencias → Privacidad → Gestionar datos del sitio web.',
      '**Microsoft Edge:** Configuración → Privacidad, búsqueda y servicios → Cookies y permisos del sitio.',
      'Ten en cuenta que desactivar ciertas cookies puede afectar al correcto funcionamiento de la aplicación o hacer que algunas preferencias no se recuerden entre sesiones.',
    ],
  },
  {
    title: 'Base Jurídica',
    content: [
      'El uso de cookies estrictamente necesarias está amparado en el interés legítimo del responsable (art. 6.1.f RGPD) para garantizar el correcto funcionamiento técnico de la aplicación.',
      'Las cookies de preferencias se instalan sobre la base del consentimiento del usuario (art. 6.1.a RGPD) materializado en el uso continuado de la aplicación tras haber sido informado mediante esta política.',
      'Esta política se adecúa a lo establecido en la Ley 34/2002 de Servicios de la Sociedad de la Información (LSSICE), el RGPD y las directrices de la AEPD sobre el uso de cookies.',
    ],
  },
  {
    title: 'Actualizaciones de esta Política',
    content: [
      'EcoTips se reserva el derecho a modificar esta Política de Cookies para adaptarla a cambios legislativos, técnicos o de funcionamiento de la aplicación.',
      'Cualquier modificación relevante será comunicada mediante un aviso visible en la aplicación antes de que entre en vigor.',
      'Última actualización: mayo de 2026.',
    ],
  },
]

export default function Cookies({ onNavigate }) {
  return (
    <div className="max-w-safe-width mx-auto px-space-4 py-space-6">

      {/* Back */}
      <button
        onClick={() => onNavigate('dashboard')}
        className="flex items-center gap-1 text-label-md text-on-surface-variant hover:text-primary transition-colors mb-space-5"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Volver al inicio
      </button>

      {/* Header */}
      <header className="mb-space-6 max-w-3xl">
        <div className="flex items-center gap-space-3 mb-space-3">
          <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>cookie</span>
          </div>
          <div>
            <h1 className="font-display text-headline-xl text-primary">Política de Cookies</h1>
            <p className="text-label-md text-on-surface-variant">Última actualización: mayo de 2026</p>
          </div>
        </div>
        <p className="text-body-lg text-on-surface-variant">
          Información sobre el uso de cookies y tecnologías de almacenamiento local en EcoTips, conforme a la LSSICE, el RGPD y las directrices de la AEPD.
        </p>
      </header>

      {/* Sections */}
      <div className="space-y-space-5 max-w-3xl">
        {SECTIONS.map((section, i) => (
          <section key={section.title} className="bg-surface-container-lowest rounded-lg border border-border p-space-5">
            <div className="flex items-start gap-space-3 mb-space-3">
              <span className="shrink-0 w-7 h-7 rounded-full bg-primary-container flex items-center justify-center font-bold text-on-primary-container text-xs">
                {i + 1}
              </span>
              <h2 className="font-display text-headline-sm text-primary">{section.title}</h2>
            </div>
            <div className="space-y-space-2 pl-10">
              {section.content.map((para, j) => {
                const isBold = para.startsWith('**')
                if (isBold) {
                  const [key, ...rest] = para.replace(/\*\*(.*?)\*\*/, '$1').split(':')
                  return (
                    <p key={j} className="text-body-md text-on-surface-variant leading-relaxed">
                      <span className="font-semibold text-on-surface">{key}:</span>
                      {rest.join(':')}
                    </p>
                  )
                }
                return (
                  <p key={j} className="text-body-md text-on-surface-variant leading-relaxed">
                    {para}
                  </p>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Other legal links */}
      <div className="mt-space-6 max-w-3xl bg-surface-container rounded-lg p-space-4 flex flex-col sm:flex-row items-start sm:items-center gap-space-4">
        <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>policy</span>
        <div>
          <p className="text-label-md font-semibold text-on-surface mb-1">Otros documentos legales</p>
          <div className="flex flex-wrap gap-space-3">
            <button
              onClick={() => onNavigate('legal')}
              className="text-label-md text-primary hover:underline flex items-center gap-1"
            >
              Aviso legal
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </button>
            <button
              onClick={() => onNavigate('privacidad')}
              className="text-label-md text-primary hover:underline flex items-center gap-1"
            >
              Política de privacidad
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}
