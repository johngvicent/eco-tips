const SECTIONS = [
  {
    title: 'Identificación del Titular',
    content: [
      'En cumplimiento con el deber de información dispuesto en la Ley 34/2002 de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSICE), se facilitan los siguientes datos:',
      '**Titular:** John Vicent',
      '**Aplicación:** EcoTips — Plataforma de educación ambiental',
      '**Contacto:** disponible a través del formulario de contacto de la aplicación.',
    ],
  },
  {
    title: 'Objeto y Ámbito de Aplicación',
    content: [
      'El presente Aviso Legal regula el acceso y uso de la aplicación web EcoTips (en adelante, "la Aplicación"), cuyo objeto es facilitar información educativa sobre reciclaje, sostenibilidad y hábitos de vida circular.',
      'El acceso y uso de la Aplicación implica la aceptación plena y sin reservas del presente Aviso Legal. Si no estás de acuerdo con alguno de los términos aquí expuestos, debes abstenerte de utilizar la Aplicación.',
    ],
  },
  {
    title: 'Propiedad Intelectual e Industrial',
    content: [
      'Todos los contenidos de la Aplicación —incluyendo, sin carácter limitativo, textos, gráficos, imágenes, su diseño y los códigos fuente— son titularidad de John Vicent o de terceros que han autorizado su uso, y están protegidos por los derechos de propiedad intelectual e industrial.',
      'Queda expresamente prohibida la reproducción, distribución, comunicación pública o transformación de dichos contenidos sin la autorización expresa y por escrito del titular, salvo en los casos previstos en la legislación vigente.',
    ],
  },
  {
    title: 'Exención de Responsabilidad',
    content: [
      'La información proporcionada en EcoTips tiene carácter meramente divulgativo y educativo. El titular no garantiza la exactitud, integridad o actualización de los contenidos y no se hace responsable de los daños que pudieran derivarse de su uso.',
      'EcoTips puede contener enlaces a sitios web de terceros. El titular no controla dichos sitios y no asume responsabilidad alguna por sus contenidos, política de privacidad o prácticas.',
    ],
  },
  {
    title: 'Protección de Datos Personales',
    content: [
      'El tratamiento de los datos personales de los usuarios se rige por la Política de Privacidad de la Aplicación, disponible de forma independiente, y por el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos Personales (LOPDGDD).',
    ],
  },
  {
    title: 'Política de Cookies',
    content: [
      'La Aplicación puede utilizar cookies técnicas necesarias para el correcto funcionamiento del servicio. Para más información, consulta nuestra Política de Cookies, accesible desde el pie de página.',
    ],
  },
  {
    title: 'Legislación Aplicable y Jurisdicción',
    content: [
      'El presente Aviso Legal se rige por la legislación española. Para la resolución de cualquier controversia derivada del acceso o uso de la Aplicación, las partes se someten, con renuncia expresa a cualquier otro fuero que pudiera corresponderles, a los Juzgados y Tribunales del domicilio del usuario.',
    ],
  },
  {
    title: 'Modificaciones',
    content: [
      'El titular se reserva el derecho a modificar, en cualquier momento y sin previo aviso, la presentación y configuración de la Aplicación, así como el presente Aviso Legal. Se recomienda a los usuarios que lo lean periódicamente, ya que puede ser modificado.',
      'Última actualización: mayo de 2026.',
    ],
  },
]

export default function Legal({ onNavigate }) {
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
            <span className="material-symbols-outlined text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
          </div>
          <div>
            <h1 className="font-display text-headline-xl text-primary">Aviso Legal</h1>
            <p className="text-label-md text-on-surface-variant">Última actualización: mayo de 2026</p>
          </div>
        </div>
        <p className="text-body-lg text-on-surface-variant">
          Información legal relativa al acceso y uso de la aplicación EcoTips, en cumplimiento de la normativa española y europea vigente.
        </p>
      </header>

      {/* Sections */}
      <div className="space-y-space-5 max-w-3xl">
        {SECTIONS.map((section, i) => (
          <section key={section.title} className="bg-surface-container-lowest rounded-lg border border-border p-space-5">
            <div className="flex items-start gap-space-3 mb-space-3">
              <span className="shrink-0 w-7 h-7 rounded-full bg-primary-container flex items-center justify-center text-label-md font-bold text-on-primary-container text-xs">
                {i + 1}
              </span>
              <h2 className="font-display text-headline-sm text-primary">{section.title}</h2>
            </div>
            <div className="space-y-space-2 pl-10">
              {section.content.map((para, j) => (
                <p key={j} className="text-body-md text-on-surface-variant leading-relaxed">
                  {para.startsWith('**') ? (
                    <>
                      <span className="font-semibold text-on-surface">
                        {para.replace(/\*\*(.*?)\*\*/g, '$1').split(':')[0]}:
                      </span>
                      {para.replace(/\*\*(.*?)\*\*/g, '$1').split(':').slice(1).join(':')}
                    </>
                  ) : para}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Icon attribution */}
      <div className="mt-space-4 max-w-3xl bg-surface-container-lowest rounded-lg border border-border p-space-4">
        <div className="flex items-start gap-space-3">
          <span className="material-symbols-outlined text-on-surface-variant text-[20px] shrink-0 mt-0.5">image</span>
          <div>
            <p className="text-label-md font-semibold text-on-surface mb-space-2">Atribución de iconos</p>
            <ul className="space-y-1">
              <li className="text-body-md text-on-surface-variant">
                <a href="https://www.flaticon.com/free-icon/github_2111432" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline">Github icon</a>
                {' '}by{' '}
                <a href="https://www.flaticon.com/authors/pixel-perfect" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline">Pixel perfect</a>
                {' '}— Flaticon Editorial License
              </li>
              <li className="text-body-md text-on-surface-variant">
                <a href="https://www.flaticon.com/free-icon/linkedin_3128219" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline">Linkedin icon</a>
                {' '}by{' '}
                <a href="https://www.flaticon.com/authors/najmunnahar" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline">NajmunNahar</a>
                {' '}— Flaticon Editorial License
              </li>
              <li className="text-body-md text-on-surface-variant">
                <a href="https://www.flaticon.com/free-icon/logo_11423218" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline">PayPal icon</a>
                {' '}by{' '}
                <a href="https://www.flaticon.com/authors/lafs" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline">LAFS</a>
                {' '}— Flaticon License
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Other legal links */}
      <div className="mt-space-4 max-w-3xl bg-surface-container rounded-lg p-space-4 flex flex-col sm:flex-row items-start sm:items-center gap-space-4">
        <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>policy</span>
        <div>
          <p className="text-label-md font-semibold text-on-surface mb-1">Otros documentos legales</p>
          <div className="flex flex-wrap gap-space-3">
            <button
              onClick={() => onNavigate('privacidad')}
              className="text-label-md text-primary hover:underline flex items-center gap-1"
            >
              Política de privacidad
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </button>
            <button
              onClick={() => onNavigate('cookies')}
              className="text-label-md text-primary hover:underline flex items-center gap-1"
            >
              Política de cookies
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}
