# EcoTips

EcoTips es una aplicación web educativa orientada a la correcta separación de residuos domésticos y a la divulgación de hábitos sostenibles. El proyecto reúne en una sola experiencia un buscador de residuos, una calculadora de impacto ambiental, una guía visual de contenedores y un espacio editorial de eco-tips.

Proyecto creado por John Vicent.

## Visión general

La aplicación funciona como una single-page application construida con React. La navegación entre módulos se resuelve en cliente, sin backend ni autenticación, y el contenido principal se sirve desde archivos JSON locales. Esto permite una experiencia rápida, directa y sencilla de mantener.

EcoTips está pensada para dos usos complementarios:

- orientar al usuario sobre dónde depositar correctamente un residuo concreto;
- explicar cómo preparar ese residuo antes de reciclarlo;
- visualizar de forma comprensible el impacto acumulado del reciclaje por material;
- ofrecer contenido divulgativo para reforzar hábitos sostenibles.

## Comportamiento actual del producto

### Inicio

La pantalla principal actúa como panel de bienvenida y descubrimiento. Presenta un eco-tip del día basado en la fecha actual, tarjetas informativas de impacto y accesos directos a los módulos más útiles de la aplicación.

### Buscador de residuos

El buscador permite localizar residuos por nombre, ejemplos de uso, contenedor o código LER. Cuando existen varias coincidencias, la interfaz muestra una lista de desambiguación para que el usuario seleccione el elemento correcto.

Cada resultado muestra:

- el contenedor recomendado;
- la categoría y el código LER asociado;
- ejemplos prácticos del residuo;
- instrucciones de preparación previa;
- un eco-tip y un dato divulgativo adicional.

Desde esta vista se puede continuar directamente hacia la calculadora de impacto o hacia la guía visual de contenedores.

### Calculadora de impacto

La calculadora permite construir un cálculo acumulado a partir de varias entradas. El flujo de uso se basa en tres pasos: elegir material, definir tamaño y ajustar cantidad. Una vez añadidos los elementos al cálculo, la interfaz muestra:

- energía ahorrada;
- agua conservada;
- CO2 no emitido;
- desglose por material en un gráfico de anillo;
- equivalencias visuales para contextualizar el resultado;
- una tarjeta resumida que puede compartirse o descargarse como imagen.

La aplicación conserva en `localStorage` el último material y tamaño seleccionados, además de la preferencia de tema.

### Guía visual de contenedores

La guía visual organiza la información por contenedor y facilita una consulta más exploratoria. Actualmente cubre las familias principales de separación doméstica y permite desplegar el detalle de cada una con ejemplos, advertencias y consejos ecológicos.

La experiencia incluye:

- vista resumida por contenedor;
- detalle expandible con recomendaciones específicas;
- listado ampliado de residuos por contenedor;
- paginación adaptada a móvil y escritorio.

### Eco-tips y contenido editorial

EcoTips incorpora una sección editorial con consejos prácticos filtrables por categoría. El usuario puede generar nuevos tips destacados y consultar una parrilla de noticias o piezas informativas relacionadas con sostenibilidad.

### Navegación, tema y páginas auxiliares

La aplicación ofrece navegación principal en cabecera y navegación inferior en móvil. Incluye modo oscuro con persistencia local, transiciones animadas entre vistas y páginas auxiliares de aviso legal, privacidad y cookies accesibles desde el pie de página.

## Cómo usar el proyecto

### Requisitos

- Node.js LTS
- npm

### Puesta en marcha local

```bash
npm install
npm run dev
```

Después, abre en el navegador la URL local que indique Vite, normalmente `http://localhost:5173`.

### Scripts disponibles

| Script | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo. |
| `npm run build` | Genera la versión optimizada para producción. |
| `npm run preview` | Sirve localmente la build generada. |
| `npm run lint` | Ejecuta la validación estática con ESLint. |

## Flujos de uso recomendados

### Para clasificar un residuo

1. Accede al buscador.
2. Escribe el nombre del objeto, un ejemplo relacionado o su código LER.
3. Selecciona la coincidencia adecuada si hay varias opciones.
4. Revisa el contenedor, la preparación previa y el eco-tip asociado.

### Para estimar impacto ambiental

1. Abre la calculadora.
2. Elige material, tamaño y cantidad.
3. Añade una o varias entradas al cálculo.
4. Consulta el impacto acumulado y exporta la tarjeta resumen si lo necesitas.

### Para aprender por categorías de reciclaje

1. Entra en la guía visual.
2. Selecciona un contenedor.
3. Revisa qué depositar, qué evitar y los consejos específicos de esa categoría.

## Stack técnico

- React 19
- Vite con Rolldown
- Tailwind CSS 4
- Framer Motion
- html-to-image
- ESLint 9

## Estructura relevante del repositorio

- `src/components/screen`: pantallas principales de la aplicación.
- `src/components/ui`: piezas reutilizables de interfaz.
- `src/data`: catálogos locales de residuos, equivalencias y contenido editorial.
- `src/contexts`: estado global compartido, como el tema visual.
- `public/branding` y `public/img`: identidad visual e imágenes de soporte.
- `prototype`: versiones HTML previas y documentación de exploración.

## Mantenimiento de contenidos

La información funcional del proyecto depende principalmente de los archivos JSON incluidos en `src/data` y de su agregación en `src/constants.js`. Para ampliar el catálogo de residuos, ajustar equivalencias o actualizar el contenido editorial, el punto de entrada recomendado es esa capa de datos.

Al no existir backend, cualquier cambio funcional o de contenido se distribuye con la build del frontend.

## Autor

John Vicent