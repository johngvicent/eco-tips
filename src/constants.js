export const WASTE_DATA = [
  // CONTENEDOR AZUL - Papel y Cartón
  {
    name: "Papel",
    container: "Azul",
    color: "bg-blue-500",
    category: "Papel y cartón",
    tip: "Recicla papel y cartón para ahorrar agua y energía en la producción de papel nuevo.",
    examples: "Folios, revistas, periódicos, libretas",
    avoid: "Papel sucio, plastificado o con restos de comida"
  },
  {
    name: "Cartón",
    container: "Azul",
    color: "bg-blue-500",
    category: "Papel y cartón",
    tip: "El cartón reciclado reduce la deforestación y el consumo de agua. Pliega las cajas para ahorrar espacio.",
    examples: "Cajas de cartón, envases de cereales, hueveras de cartón",
    avoid: "Cartón sucio con grasa o manchado"
  },
  {
    name: "Periódico",
    container: "Azul",
    color: "bg-blue-500",
    category: "Papel y cartón",
    tip: "Los periódicos son 100% reciclables. Cada tonelada reciclada salva 17 árboles.",
    examples: "Diarios, revistas, catálogos publicitarios",
    avoid: "Papel térmico de tickets o faxes"
  },
  {
    name: "Sobre",
    container: "Azul",
    color: "bg-blue-500",
    category: "Papel y cartón",
    tip: "Los sobres van al contenedor azul, incluso con ventanas de plástico (se separan en la planta).",
    examples: "Sobres de correo, carpetas de cartón",
    avoid: "Sobres acolchados con plástico de burbujas (van al amarillo)"
  },
  {
    name: "Bolsas de papel para palomitas",
    container: "Azul",
    color: "bg-blue-500",
    category: "Papel y cartón",
    tip: "Las bolsas de papel para palomitas de maíz se reciclan en el contenedor azul, contribuyendo a la reducción del desperdicio de papel.",
    examples: "Bolsas de palomitas de maíz, bolsas de papel para snacks",
    avoid: "Bolsas sucias con grasa o restos de comida"
  },

  // CONTENEDOR AMARILLO - Envases de plástico, latas y briks
  {
    name: "Botella de plástico",
    container: "Amarillo",
    color: "bg-yellow-500",
    category: "Envases de plástico",
    tip: "Aplasta las botellas para reducir su volumen. Pueden reciclarse hasta 7 veces.",
    examples: "Botellas de agua, refrescos, detergentes, champús",
    avoid: "Botellas de vidrio (van al verde)"
  },
  {
    name: "Lata de aluminio",
    container: "Amarillo",
    color: "bg-yellow-500",
    category: "Latas y metales",
    tip: "Reciclar latas de aluminio ahorra un 95% de energía. Una lata se recicla en 60 días.",
    examples: "Latas de refrescos, cerveza, conservas",
    avoid: "Latas de pintura o productos químicos (punto limpio)"
  },
  {
    name: "Brick",
    container: "Amarillo",
    color: "bg-yellow-500",
    category: "Envases compuestos",
    tip: "Los briks están hechos de cartón, plástico y aluminio. Se reciclan por separado en plantas especializadas.",
    examples: "Briks de leche, zumo, caldo, vino",
    avoid: "Briks con restos de líquido (vacíalos antes)"
  },
  {
    name: "Film de plástico",
    container: "Amarillo",
    color: "bg-yellow-500",
    category: "Envases de plástico",
    tip: "El film y las bolsas de plástico se reciclan para crear nuevos productos.",
    examples: "Film transparente, bolsas de plástico, envases de plástico flexible",
    avoid: "Bolsas de plástico biodegradables compostables (van al marrón u orgánico)"
  },
  {
    name: "Tapones de plástico",
    container: "Amarillo",
    color: "bg-yellow-500",
    category: "Envases de plástico",
    tip: "Los tapones de plástico son muy valiosos para el reciclaje. Algunos se usan en proyectos solidarios.",
    examples: "Tapones de botellas, tapas de botes",
    avoid: "Tapones de corcho (punto limpio o compost)"
  },
  {
    name: "Bandeja de poliespán",
    container: "Amarillo",
    color: "bg-yellow-500",
    category: "Envases de plástico",
    tip: "Las bandejas de poliespán (corcho blanco) son reciclables al 100%.",
    examples: "Bandejas de carne, pescado, frutas",
    avoid: "Bandejas muy sucias (lávalas o ve al gris)"
  },
  {
    name: "Aerosol",
    container: "Amarillo",
    color: "bg-yellow-500",
    category: "Latas y metales",
    tip: "Los aerosoles vacíos van al amarillo. Si están llenos o contienen productos peligrosos, al punto limpio.",
    examples: "Desodorantes en spray, lacas, ambientadores",
    avoid: "Aerosoles de productos tóxicos o inflamables (punto limpio)"
  },
  {
    name: "Papel de aluminio",
    container: "Amarillo",
    color: "bg-yellow-500",
    category: "Latas y metales",
    tip: "El papel de aluminio y film transparente se reciclan en el contenedor amarillo si están limpios.",
    examples: "Papel de aluminio, bandejas de aluminio desechables",
    avoid: "Papel de aluminio muy sucio con restos orgánicos"
  },

  // CONTENEDOR VERDE - Vidrio
  {
    name: "Botella de vidrio",
    container: "Verde",
    color: "bg-green-500",
    category: "Vidrio",
    tip: "El vidrio reciclado se puede reutilizar infinitamente sin perder calidad.",
    examples: "Botellas de vino, cerveza, aceite, frascos de conservas",
    avoid: "Cristales, espejos, bombillas (no son vidrio reciclable)"
  },
  {
    name: "Tarro de vidrio",
    container: "Verde",
    color: "bg-green-500",
    category: "Vidrio",
    tip: "Los tarros de vidrio son perfectos para el reciclaje. Retira las tapas metálicas antes.",
    examples: "Tarros de mermelada, conservas, salsas",
    avoid: "Cerámica, porcelana o cristal de copas (punto limpio)"
  },
  {
    name: "Frasco de perfume",
    container: "Verde",
    color: "bg-green-500",
    category: "Vidrio",
    tip: "Los frascos de perfume de vidrio son reciclables. Retira el tapón antes de depositarlo.",
    examples: "Frascos de perfume, colonias",
    avoid: "Frascos con restos de producto peligroso (punto limpio)"
  },
  {
    name: "Vajilla Duralex",
    container: "Verde",
    color: "bg-green-500",
    category: "Vidrio",
    tip: "La vajilla Duralex (vidrio templado) es 100% reciclable. Se funde para crear nuevos productos de vidrio.",
    examples: "Platos Duralex, vasos Duralex, tazas de vidrio templado",
    avoid: "Vajilla rota en pedazos muy pequeños o mezclada con cerámica"
  },

  // CONTENEDOR MARRÓN - Orgánico
  {
    name: "Restos de comida",
    container: "Marrón",
    color: "bg-amber-600",
    category: "Residuos orgánicos",
    tip: "Los restos de comida se convierten en compost, reduciendo emisiones de metano en un 50%.",
    examples: "Frutas, verduras, cáscaras, restos de carne y pescado",
    avoid: "Aceites, líquidos, productos procesados con mucho plástico"
  },
  {
    name: "Cáscaras de huevo",
    container: "Marrón",
    color: "bg-amber-600",
    category: "Residuos orgánicos",
    tip: "Las cáscaras de huevo aportan calcio al compost. Son 100% biodegradables.",
    examples: "Cáscaras de huevo, frutos secos",
    avoid: "Cáscaras con restos de alimentos no orgánicos"
  },
  {
    name: "Restos de café",
    container: "Marrón",
    color: "bg-amber-600",
    category: "Residuos orgánicos",
    tip: "Los posos de café son excelentes para el compost. Incluye los filtros de papel.",
    examples: "Posos de café, bolsitas de té, infusiones",
    avoid: "Cápsulas de café de aluminio (amarillo) o plástico"
  },
  {
    name: "Plantas y flores",
    container: "Marrón",
    color: "bg-amber-600",
    category: "Residuos orgánicos",
    tip: "Las plantas marchitas y flores son materia orgánica perfecta para compostaje.",
    examples: "Flores marchitas, hojas secas, pequeñas ramas",
    avoid: "Tierra de macetas con productos químicos"
  },
  {
    name: "Servilletas y papel de cocina usado",
    container: "Marrón",
    color: "bg-amber-600",
    category: "Residuos orgánicos",
    tip: "El papel sucio con restos orgánicos va al marrón, no al azul.",
    examples: "Servilletas usadas, papel de cocina con comida",
    avoid: "Papel plastificado o con tintas tóxicas"
  },

  // CONTENEDOR GRIS - Resto/Rechazo
  {
    name: "Pañales",
    container: "Gris",
    color: "bg-gray-500",
    category: "Residuos no reciclables",
    tip: "Los pañales y productos de higiene no son reciclables actualmente.",
    examples: "Pañales, compresas, tampones",
    avoid: "Mezclarlos con reciclables"
  },
  {
    name: "Cerámica",
    container: "Gris",
    color: "bg-gray-500",
    category: "Residuos no reciclables",
    tip: "La cerámica y porcelana no son reciclables con vidrio. Van al contenedor gris.",
    examples: "Platos rotos, tazas, jarrones de cerámica",
    avoid: "Depositarlos en el contenedor verde (contaminan el vidrio)"
  },
  {
    name: "Chicles",
    container: "Gris",
    color: "bg-gray-500",
    category: "Residuos no reciclables",
    tip: "Los chicles están hechos de polímeros sintéticos no biodegradables.",
    examples: "Chicles, colillas de cigarros",
    avoid: "Tirarlos al suelo (contaminan)"
  },
  {
    name: "Cepillos de dientes",
    container: "Gris",
    color: "bg-gray-500",
    category: "Residuos no reciclables",
    tip: "Los cepillos de dientes convencionales no son reciclables. Considera opciones de bambú compostables.",
    examples: "Cepillos de dientes, peines, cuchillas de afeitar",
    avoid: "Opciones de plástico de un solo uso"
  },
  {
    name: "Fotos",
    container: "Gris",
    color: "bg-gray-500",
    category: "Residuos no reciclables",
    tip: "Las fotografías impresas contienen químicos que impiden su reciclaje.",
    examples: "Fotos reveladas, papel fotográfico",
    avoid: "Depositarlas en el contenedor azul"
  },

  // PUNTO LIMPIO / CONTENEDORES ESPECIALES
  {
    name: "Bombilla LED",
    container: "Punto limpio",
    color: "bg-purple-500",
    category: "Residuos especiales",
    tip: "Las bombillas LED contienen componentes electrónicos. Llévalas a un punto limpio o punto de recogida.",
    examples: "Bombillas LED, fluorescentes, halógenas",
    avoid: "Tirarlas al contenedor amarillo o gris"
  },
  {
    name: "Bombilla fluorescente",
    container: "Punto limpio",
    color: "bg-purple-500",
    category: "Residuos especiales",
    tip: "Las bombillas fluorescentes contienen mercurio, recicla en puntos específicos o tiendas.",
    examples: "Tubos fluorescentes, bombillas de bajo consumo",
    avoid: "Romperlas (liberan mercurio)"
  },
  {
    name: "Batería",
    container: "Punto limpio",
    color: "bg-purple-500",
    category: "Residuos especiales",
    tip: "Las baterías contienen metales pesados; deposítalas en contenedores especiales o puntos de recogida.",
    examples: "Pilas alcalinas, baterías de botón, baterías recargables",
    avoid: "Mezclarlas con residuos normales (contaminan)"
  },
  {
    name: "Aceite de cocina usado",
    container: "Punto limpio",
    color: "bg-purple-500",
    category: "Residuos especiales",
    tip: "Un litro de aceite contamina 1.000 litros de agua. Llévalo a puntos de recogida específicos.",
    examples: "Aceite de freír, aceite de conservas",
    avoid: "Tirarlo por el fregadero (contamina tuberías y agua)"
  },
  {
    name: "Móvil viejo",
    container: "Punto limpio",
    color: "bg-purple-500",
    category: "Aparatos electrónicos",
    tip: "Los móviles contienen materiales valiosos reciclables: oro, plata, cobre y tierras raras.",
    examples: "Teléfonos móviles, tablets, ordenadores",
    avoid: "Tirarlos a la basura (pierdes materiales valiosos)"
  },
  {
    name: "Electrodoméstico",
    container: "Punto limpio",
    color: "bg-purple-500",
    category: "Aparatos electrónicos",
    tip: "Los electrodomésticos grandes se recogen gratuitamente al comprar uno nuevo, o llévalos al punto limpio.",
    examples: "Neveras, lavadoras, microondas, hornos",
    avoid: "Abandonarlos en la calle (es ilegal)"
  },
  {
    name: "Pintura",
    container: "Punto limpio",
    color: "bg-purple-500",
    category: "Residuos peligrosos",
    tip: "Las pinturas y disolventes son residuos peligrosos que deben ir al punto limpio.",
    examples: "Botes de pintura, barnices, disolventes",
    avoid: "Tirarlas al desagüe o basura normal"
  },
  {
    name: "Medicamentos",
    container: "Punto SIGRE",
    color: "bg-red-500",
    category: "Residuos especiales",
    tip: "Los medicamentos caducados deben llevarse a puntos SIGRE en farmacias para su correcta gestión.",
    examples: "Medicamentos caducados, envases de medicamentos, radiografías",
    avoid: "Tirarlos al inodoro o basura normal (contaminan el agua)"
  },
  {
    name: "Ropa y textiles",
    container: "Contenedor textil",
    color: "bg-pink-500",
    category: "Textiles",
    tip: "La ropa y calzado usados pueden reutilizarse o reciclarse. Deposítalos en contenedores textiles.",
    examples: "Ropa, zapatos, bolsos, cortinas, sábanas",
    avoid: "Depositarlos sucios o húmedos (mejor lavarlos antes)"
  },
  {
    name: "Muebles",
    container: "Punto limpio",
    color: "bg-purple-500",
    category: "Residuos voluminosos",
    tip: "Los muebles grandes deben llevarse al punto limpio. Muchos ayuntamientos ofrecen recogida a domicilio.",
    examples: "Sofás, colchones, armarios, sillas",
    avoid: "Abandonarlos en la calle sin avisar al ayuntamiento"
  }
];

export const ECO_TIPS = [
  "Usa una botella reutilizable en lugar de plásticos desechables.",
  "Apaga luces y electrodomésticos cuando no los uses.",
  "Compra productos locales para reducir emisiones de transporte.",
  "Recicla tus electrónicos en centros especializados.",
  "Elige transporte público o bicicleta para distancias cortas.",
  "Reduce el consumo de carne para bajar tu huella de carbono.",
  "Planta árboles o participa en reforestación.",
  "Usa bolsas de tela en lugar de plásticas.",
  "Ahorra agua cerrando el grifo mientras te cepillas los dientes.",
  "Compra productos con menos embalaje."
];

export const IMPACT_EQUIVALENTS = {
  papel: { energia: 0.5, agua: 10 }, // kWh y litros por kg
  plastico: { energia: 2, agua: 5 },
  vidrio: { energia: 1, agua: 2 },
  metal: { energia: 3, agua: 1 },
  organico: { energia: 0.2, agua: 0.5 }
};