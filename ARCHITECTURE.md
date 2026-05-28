# Architecture

---

# 1. Rendering Strategy

EcoTips is a client-side Single Page Application (SPA)
built with React 19 and bundled by Vite (rolldown-vite).

There is no server-side rendering or static site generation.
All rendering happens in the browser after the initial JS bundle loads.

---

# 2. View Navigation

Navigation is handled through a `currentView` state variable in `App.jsx`.

Views are mapped to lazily-loaded components via `React.lazy()` and rendered
inside a `Suspense` boundary. No external router is used.

Available views:
- `dashboard` → Dashboard
- `search` → WasteSearch
- `calculator` → ImpactCounter
- `guide` → VisualGuide
- `stats` → Stats
- `tips` → EcoTips

---

# 3. Component Structure

```
src/
    App.jsx                 # Root: view state, top nav, layout shell
    main.jsx                # Entry point; mounts <ThemeProvider> + <App>
    components/
        screen/
            Dashboard.jsx
            WasteSearch.jsx
            ImpactCounter.jsx
            VisualGuide.jsx
            EcoTips.jsx
            Stats.jsx
        ui/
            BottomNav.jsx         # Mobile bottom navigation
            Button.jsx
            Card.jsx
            Footer.jsx
            Header.jsx
    contexts/
        ThemeContext.jsx       # Dark mode state + localStorage persistence
    data/
        amarillo.json          # Waste category data (yellow bin)
        azul.json              # Waste category data (blue bin)
        gris.json              # Waste category data (grey bin)
        marron.json            # Waste category data (brown bin)
        verde.json             # Waste category data (green bin)
        daily-tip.json         # Rotating eco tips content
```

---

# 4. State Management

Global state is managed via React Context API.

`ThemeContext` provides:
- `darkMode` boolean
- `toggleDarkMode()` — toggles class on `<html>` and persists to `localStorage`

Component-level state uses `useState` and `useEffect` hooks directly.
No external state library (Redux, Zustand, etc.) is used.

---

# 5. Animations

View transitions use **Framer Motion** (`AnimatePresence` + `motion.div`).

Each view fades and slides in/out with:
- `initial`: `{ opacity: 0, y: 8 }`
- `animate`: `{ opacity: 1, y: 0 }`
- `exit`: `{ opacity: 0, y: -8 }`

---

# 6. Styling Strategy

Styles are managed with **Tailwind CSS v4** via PostCSS.

Global styles (`src/index.css`):
- CSS custom properties (design tokens)
- typography scale
- layout primitives

Component styles:
- utility classes inline (Tailwind)
- token-based color and spacing system
- dark mode via the `dark` class on the root element

---

# 7. Data Layer

Content is stored as static JSON files in `src/data/`.

Each waste-category file contains classification rules and
recycling instructions. `daily-tip.json` provides eco tip content.

No external API or database is used.

---

# 8. Performance Strategy

- Route-level code splitting via `React.lazy()` + `Suspense`
- Vite (rolldown-vite) for fast HMR and optimized production bundles
- No unnecessary re-renders through isolated component state

---

# 9. Accessibility

Accessibility is enforced through:
- semantic landmarks (`<header>`, `<main>`, `<nav>`)
- `aria-label` and `aria-current` on navigation elements
- keyboard-navigable controls with visible focus styles
- `skip to content` via `id="main-content"` on `<main>`
- contrast-safe color tokens
- `prefers-reduced-motion` awareness via Framer Motion