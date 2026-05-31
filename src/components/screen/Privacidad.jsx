const SECTIONS = [
  {
    title: 'Responsable del Tratamiento',
    content: [
      '**Titular:** John Vicent',
      '**Aplicación:** EcoTips — Plataforma de educación ambiental',
      '**Finalidad del tratamiento:** Proporcionar la funcionalidad de la aplicación y mejorar la experiencia del usuario.',
      '**Contacto:** disponible a través del formulario de contacto de la aplicación.',
    ],
  },
  {
    title: 'Datos que Recopilamos',
    content: [
      'EcoTips es una aplicación web de carácter informativo y educativo que funciona principalmente en el lado del cliente (navegador). En su versión actual, no recopila datos personales identificativos como nombre, correo electrónico ni dirección.',
      'Datos de uso técnico: la aplicación puede almacenar preferencias locales (como el modo oscuro o el historial de búsquedas) mediante el almacenamiento local del navegador (localStorage). Estos datos no se transmiten a ningún servidor externo.',
      'Datos de analítica: en caso de integrarse herramientas de analítica de terceros en el futuro, se informará de ello actualizando esta política.',
    ],
  },
  {
    title: 'Finalidad y Base Jurídica',
    content: [
      'Los datos técnicos almacenados localmente en tu dispositivo se tratan exclusivamente con la finalidad de mejorar tu experiencia de uso, recordar tus preferencias y ofrecer las funcionalidades de la aplicación.',
      'La base jurídica del tratamiento es el interés legítimo del responsable (art. 6.1.f RGPD) en proporcionar un servicio funcional y personalizado, así como el consentimiento del usuario al continuar usando la aplicación (art. 6.1.a RGPD).',
    ],
  },
  {
    title: 'Conservación de los Datos',
    content: [
      'Los datos almacenados localmente en tu navegador persisten hasta que decidas eliminarlos desde la configuración de tu navegador o desde las opciones de la aplicación.',
      'En ningún caso se transmiten a servidores de terceros ni se asocian a un perfil de usuario identificado.',
    ],
  },
  {
    title: 'Derechos del Usuario',
    content: [
      'De conformidad con el RGPD y la LOPDGDD, puedes ejercer los siguientes derechos respecto a tus datos personales:',
      '**Acceso:** obtener confirmación sobre si se están tratando tus datos.',
      '**Rectificación:** corregir datos inexactos o incompletos.',
      '**Supresión:** solicitar la eliminación de tus datos cuando ya no sean necesarios.',
      '**Limitación:** solicitar la restricción del tratamiento en determinadas circunstancias.',
      '**Portabilidad:** recibir tus datos en un formato estructurado y legible.',
      '**Oposición:** oponerte al tratamiento en cualquier momento cuando se base en interés legítimo.',
      'Para ejercer cualquiera de estos derechos, puedes contactar a través del formulario de la aplicación. Tienes también derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).',
    ],
  },
  {
    title: 'Transferencias Internacionales',
    content: [
      'Actualmente, EcoTips no realiza transferencias internacionales de datos personales fuera del Espacio Económico Europeo. En caso de que esto cambiase en el futuro, se garantizarán las medidas de protección adecuadas conforme al RGPD y se informará de ello en esta política.',
    ],
  },
  {
    title: 'Seguridad de los Datos',
    content: [
      'EcoTips adopta las medidas técnicas y organizativas necesarias para garantizar la seguridad de los datos y evitar su alteración, pérdida, tratamiento o acceso no autorizado, teniendo en cuenta el estado de la tecnología, la naturaleza de los datos y los riesgos a los que están expuestos.',
      'Al ser una aplicación que opera principalmente en el cliente y no transmite datos a servidores propios, el riesgo de exposición de datos personales es mínimo.',
    ],
  },
  {
    title: 'Modificaciones de esta Política',
    content: [
      'El responsable del tratamiento se reserva el derecho a modificar la presente Política de Privacidad para adaptarla a novedades legislativas, jurisprudenciales o de funcionamiento de la aplicación.',
      'Se recomienda revisar esta política periódicamente. Los cambios entrarán en vigor desde su publicación en la aplicación.',
      'Última actualización: mayo de 2026.',
    ],
  },
]

export default function Privacidad({ onNavigate }) {
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
            <span className="material-symbols-outlined text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>shield_person</span>
          </div>
          <div>
            <h1 className="font-display text-headline-xl text-primary">Política de Privacidad</h1>
            <p className="text-label-md text-on-surface-variant">Última actualización: mayo de 2026</p>
          </div>
        </div>
        <p className="text-body-lg text-on-surface-variant">
          En EcoTips respetamos tu privacidad. Esta política explica qué datos tratamos, con qué finalidad y qué derechos tienes como usuario, conforme al RGPD y la LOPDGDD.
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
