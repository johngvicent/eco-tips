import { useTheme } from '../../contexts/ThemeContext'
import Button from '../ui/Button'

const ReglamentoEuropeo = () => {
  const { darkMode } = useTheme()
  return (
    <div className="space-y-4">
      <div>
      <h1 className="font-display text-headline-lg text-primary">Europa regula el exceso de envases</h1>
      <p>El 19 de diciembre de 2024, la Unión Europea aprobó el Reglamento (UE) 2025/40 sobre envases y residuos de envases, una normativa que marcará un antes y un después en la forma en que se diseñan, fabrican y reciclan los envases que utilizamos cada día.</p>
      <p>Aunque pueda parecer una cuestión técnica, la realidad es que este reglamento afectará directamente a nuestras compras online, a los productos de supermercado, a la comida para llevar e incluso a la manera en que reciclamos en casa.</p>

      <h3 className="font-display text-headline-sm text-primary pt-2">¿Por qué era necesario un nuevo reglamento?</h3>
      <p>Europa se enfrenta a un problema creciente: cada año se generan más residuos de envases. Según los datos utilizados por la Comisión Europea, los envases consumen aproximadamente el 40% del plástico y el 50% del papel utilizados en la Unión Europea, además de representar una parte muy importante de los residuos urbanos.</p>
      <p>La UE considera que el modelo actual de "usar y tirar" ya no es sostenible y que es necesario avanzar hacia una economía circular, donde los materiales permanezcan en uso durante más tiempo y generen menos residuos.</p>

      <h3 className="font-display text-headline-sm text-primary pt-2">Los cambios más importantes</h3>

      <h4 className="font-display text-title-md text-primary">1. Menos envases innecesarios</h4>
      <p>Uno de los objetivos principales es reducir el exceso de embalaje. ¿Alguna vez has recibido un producto pequeño dentro de una caja enorme llena de plástico protector? Precisamente este tipo de situaciones son las que la normativa pretende evitar. Las empresas deberán justificar mejor el tamaño y el peso de sus envases, eliminando elementos superfluos.</p>

      <h4 className="font-display text-title-md text-primary">2. Más reutilización y menos usar y tirar</h4>
      <p>La nueva legislación impulsa los sistemas reutilizables. El objetivo es que determinados tipos de envases puedan utilizarse varias veces antes de convertirse en residuos. Esto podría traducirse en más envases retornables, sistemas de depósito y modelos de reutilización en sectores como la restauración, las bebidas o el comercio electrónico.</p>

      <h4 className="font-display text-title-md text-primary">3. Todos los envases deberán ser reciclables</h4>
      <p>Europa quiere que los envases se diseñen pensando en su segunda vida desde el principio. La meta es que todos los envases comercializados en la Unión sean reutilizables o reciclables de manera eficiente, facilitando la separación de materiales y mejorando los procesos de reciclaje.</p>

      <h4 className="font-display text-title-md text-primary">4. Más plástico reciclado</h4>
      <p>Otro cambio importante afecta a los fabricantes de envases de plástico. La normativa fomenta el uso de materiales reciclados en lugar de materias primas vírgenes, reduciendo así la dependencia de recursos fósiles y disminuyendo la huella ambiental de los productos.</p>

      <h3 className="font-display text-headline-sm text-primary pt-2">Etiquetas más claras para reciclar mejor</h3>
      <p>¿Cuántas veces has dudado sobre en qué contenedor tirar un envase?</p>
      <p>La Unión Europea quiere acabar con esa confusión mediante sistemas de etiquetado más claros y homogéneos. El objetivo es que cualquier ciudadano pueda identificar fácilmente cómo separar correctamente los residuos independientemente del país europeo en el que se encuentre.</p>

      <h3 className="font-display text-headline-sm text-primary pt-2">Adiós a algunas sustancias preocupantes</h3>
      <p>La normativa también pone el foco en la salud.</p>
      <p>Entre otras medidas, limita la presencia de determinadas sustancias químicas consideradas problemáticas para las personas y el medio ambiente. Destaca especialmente la atención sobre los PFAS, conocidos popularmente como "químicos eternos", utilizados en algunos materiales por su resistencia al agua y la grasa.</p>
      <p>La UE considera que estas sustancias representan un riesgo ambiental debido a su persistencia y busca reducir su presencia, especialmente en envases en contacto con alimentos.</p>

      <h3 className="font-display text-headline-sm text-primary pt-2">¿Cómo afecta a los consumidores?</h3>
      <p>A corto plazo, probablemente no notarás cambios drásticos de un día para otro. Sin embargo, durante los próximos años será cada vez más habitual encontrar:</p>
      <ul className="list-disc list-inside space-y-1">
        <li>Envases más pequeños y optimizados.</li>
        <li>Menos plástico innecesario.</li>
        <li>Sistemas de reutilización y devolución.</li>
        <li>Etiquetas de reciclaje más fáciles de entender.</li>
        <li>Productos fabricados con materiales reciclados.</li>
        <li>Menor presencia de sustancias químicas controvertidas.</li>
      </ul>
      <p>Para los consumidores, especialmente aquellos preocupados por la sostenibilidad, esta normativa representa un paso importante hacia productos más responsables y transparentes.</p>

      <h3 className="font-display text-headline-sm text-primary pt-2">Un cambio de mentalidad para toda Europa</h3>
        <p>Más allá de las obligaciones para fabricantes y distribuidores, el Reglamento (UE) 2025/40 refleja un cambio de enfoque: dejar de considerar los envases como un residuo inevitable y empezar a verlos como recursos que pueden reutilizarse, reciclarse y mantenerse en circulación durante más tiempo.</p>
        <p>La transición no será inmediata, pero el mensaje es claro: el futuro del consumo en Europa pasa por generar menos residuos, aprovechar mejor los materiales y diseñar productos pensando en todo su ciclo de vida, no solo en el momento de la compra.</p>
      </div>
      <div className="flex justify-center">
      <Button
              variant="primary"
              onClick={() => window.open('https://www.boe.es/doue/2025/040/L00001-00124.pdf', '_blank', 'noopener,noreferrer')}
            >
              <span className="material-symbols-outlined text-xl pr-2">balance</span>
              Ver reglamento
      </Button>
    </div>
    </div>

    
  )
}

export default ReglamentoEuropeo
