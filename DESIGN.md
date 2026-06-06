# EcoTips 🌿 — Sistema de Diseño

**Propietario:** John Vicent
**Última actualización:** 18 de mayo de 2026

EcoTips es una aplicación web moderna y educativa que ayuda a los usuarios a aprender sobre reciclaje y calcular su impacto ambiental de forma interactiva.

El sistema visual busca transmitir:

* accesibilidad
* claridad
* sostenibilidad
* sofisticación tecnológica
* experiencia mobile-first

---

# 1. Propósito

Este documento define:

* el lenguaje visual
* los principios de interacción
* los estándares de accesibilidad
* la arquitectura UI
* las reglas de consistencia visual

El objetivo es garantizar:

* consistencia visual
* implementación frontend escalable
* cumplimiento de accesibilidad
* patrones UX predecibles
* sistemas de componentes mantenibles

---

# 2. Principios de Diseño

## 2.1 Claridad antes que decoración

Las interfaces deben priorizar:

* legibilidad
* jerarquía visual
* simplicidad funcional

Antes que efectos visuales innecesarios.

---

## 2.2 Accesibilidad por defecto

Cada componente debe poder utilizarse sin depender exclusivamente de:

* color
* animaciones
* precisión del cursor

---

## 2.3 Minimalismo editorial

La composición visual debe transmitir una estética limpia y premium inspirada en:

* tecnología
* diseño editorial
* marcas contemporáneas

---

## 2.4 Movimiento funcional

Las animaciones deben:

* comunicar cambios de estado
* mejorar la comprensión
* reforzar la interacción

Nunca utilizarse únicamente como decoración.

---

# 3. Lenguaje de Marca

## Personalidad

* Precisa
* Elegante
* Natural
* Humana
* Tecnológica
* Mobile-first

---

## Evitar

* Skeuomorfismo excesivo
* Saturación visual
* Sombras agresivas
* Interfaces sobrecargadas

---

# 4. Sistema de Color

## 4.1 Paleta Principal

### Colores Primarios

| Color             | Hex       | Uso                                                    |
| ----------------- | --------- | ------------------------------------------------------ |
| **Verde Bosque**  | `#006837` | Botones principales, acciones CTA y elementos de marca |
| **Verde Pizarra** | `#35524A` | Navegación, encabezados y títulos de sección           |

---

### Colores Secundarios

| Color             | Hex       | Uso                                   |
| ----------------- | --------- | ------------------------------------- |
| **Amarillo Idea** | `#F4D35E` | Destacados, tips y alertas visuales   |
| **Verde Menta**   | `#D8E2DC` | Fondos suaves, tarjetas y separadores |

---

### Colores Neutros

| Color               | Hex       | Uso                                    |
| ------------------- | --------- | -------------------------------------- |
| **Fondo General**   | `#F8FAF7` | Fondo principal de la aplicación       |
| **Texto Principal** | `#2D3332` | Texto principal y contenido de lectura |
| **Bordes**          | `#E0E7E1` | Inputs, divisores y contenedores       |

---

## 4.2 Reglas de Uso

* Utilizar máximo un color de acento por sección.
* Evitar fondos saturados en áreas de lectura extensa.
* Mantener suficiente contraste entre texto y fondo.
* El color verde principal debe reservarse para acciones importantes.

---

# 5. Tipografía

## Tipografía Principal — Montserrat

**Uso:**

* títulos
* encabezados
* botones

**Pesos recomendados:**

* Bold (700)
* SemiBold (600)
* Medium (500)

**Razón:**
Tipografía geométrica, moderna y altamente legible.

---

## Tipografía Secundaria — Inter

**Uso:**

* párrafos
* formularios
* etiquetas
* texto auxiliar

**Peso recomendado:**

* Regular (400)

**Razón:**
Excelente legibilidad en pantallas y dispositivos móviles.

---

## Reglas Tipográficas

* No utilizar más de 3 tamaños tipográficos por sección.
* El ancho máximo de lectura debe ser de `72ch`.
* Mantener ritmo vertical consistente.
* Evitar bloques extensos de texto centrado.

---

# 6. Sistema de Espaciado

Unidad base: `8px`

| Token     | Valor |
| --------- | ----- |
| `space-1` | 4px   |
| `space-2` | 8px   |
| `space-3` | 16px  |
| `space-4` | 24px  |
| `space-5` | 32px  |
| `space-6` | 48px  |

---

## Reglas

* Mantener espaciados consistentes entre componentes.
* Priorizar aire visual antes que densidad.
* Utilizar múltiplos de 8 siempre que sea posible.

---

# 7. Grid y Layout

## Desktop

Grid de 12 columnas.

---

## Tablet

Grid de 8 columnas.

---

## Mobile

Grid de 4 columnas.

---

## Contenedores

| Elemento           | Valor  |
| ------------------ | ------ |
| Max Width          | 1440px |
| Safe Content Width | 1200px |

---

# 8. Border Radius

| Token       | Valor |
| ----------- | ----- |
| `radius-sm` | 6px   |
| `radius-md` | 12px  |
| `radius-lg` | 20px  |
| `radius-xl` | 32px  |

---

## Reglas

* Evitar mezclar más de dos escalas de radio dentro de un mismo componente.
* Mantener coherencia visual entre tarjetas, inputs y botones.

---

# 9. Sistema de Sombras

Las sombras deben transmitir profundidad de forma sutil.

---

## Evitar

* Sombras negras puras
* Blur excesivo
* Neumorfismo

---

## Sombra Recomendada

```css
0 10px 30px rgba(0, 0, 0, 0.08)
```

---

# 10. Sistema de Movimiento

## Duraciones

| Token         | Duración |
| ------------- | -------- |
| `motion-fast` | 120ms    |
| `motion-base` | 200ms    |
| `motion-slow` | 320ms    |

---

## Easing

```css
cubic-bezier(0.22, 1, 0.36, 1)
```

---

## Reglas

* Las animaciones nunca deben bloquear la interacción.
* Evitar experiencias pesadas basadas en parallax.
* Respetar preferencias de reducción de movimiento.
* Priorizar transiciones suaves y naturales.

---

# 11. Estándares de Accesibilidad

## Objetivo

Cumplimiento WCAG 2.2 AA.

---

## Requisitos

* Navegación mediante teclado
* Estados de foco visibles
* Contraste mínimo 4.5:1
* Targets interactivos mínimos de 44px
* Labels obligatorios en formularios
* Texto blanco sobre botones verdes
* Jerarquía semántica correcta

---

# 12. Arquitectura de Componentes

Todos los componentes deben seguir:

* estructura atómica
* props reutilizables
* variantes escalables
* estados aislados
* consistencia visual

---

## Estructura Base

```txt
/components
  /ui
    /button
    /card
    /modal
  /layout
  /forms
```

---

# 13. Botones

## Botón Primario

### Propósito

Acciones principales de la interfaz.

---

## Reglas

* Solo una acción principal por sección.
* Mantener contraste incluso en estado disabled.
* Los botones deben conservar tamaño táctil accesible.

---

## Estados

* Default
* Hover
* Active
* Loading
* Disabled

---

# 14. Formularios

## Validación

La validación debe:

* aparecer inline
* evitar modales invasivos
* explicar claramente cómo solucionar errores

---

## Mensajes de Error

Los mensajes deben ser:

* claros
* humanos
* accionables
* concisos

---

# 15. Responsive Design

## Mobile First

Todos los layouts deben diseñarse inicialmente para mobile.

---

## Breakpoints

| Nombre | Width  |
| ------ | ------ |
| `sm`   | 640px  |
| `md`   | 768px  |
| `lg`   | 1024px |
| `xl`   | 1280px |

---

# 16. Integración Frontend

## Stack Tecnológico

* Astro
* React
* TailwindCSS
* Framer Motion
* GSAP

---

## Tokens

Todas las decisiones visuales deben mapearse a design tokens.

Nunca hardcodear:

* colores
* tipografías
* spacing
* sombras

---

# 17. Convenciones de Nomenclatura

## Componentes

Utilizar PascalCase.

### Ejemplo

```txt
UserCard.jsx
```

---

## Variables CSS

```css
--color-primary
```

---

## Tailwind

Preferir abstracciones semánticas antes que valores arbitrarios.

---

# 18. Reglas de Figma

* Los componentes deben coincidir con producción.
* Auto-layout obligatorio.
* Variants obligatorias.
* Componentes obsoletos archivados inmediatamente.

---

# 19. Rendimiento

## Evitar

* Blur excesivo
* Hero sections pesadas en vídeo
* Layout shifts
* SVGs sobredimensionados

---

## Objetivo

```txt
Lighthouse >= 90
```

---

# 20. Checklist QA

Antes del release:

* [ ] Responsive validado
* [ ] Accesibilidad comprobada
* [ ] Dark mode verificado
* [ ] Estados loading implementados
* [ ] Empty states implementados
* [ ] Error states implementados

---

# 21. Mejoras Futuras

* Automatización de tokens
* Soporte multi-tema
* Espaciado adaptado a localización
* Modos de contraste adaptativos
* Sistema de dark mode avanzado

---

# 22. Referencias

* Apple Human Interface Guidelines
* Material Design 3
* Stripe Design System
* Vercel Design Language
* Zara Editorial Layouts
