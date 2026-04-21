# 🤖 Admin Panel — Agent Instructions

> These instructions guide the local agent on styling, architecture, and development standards for building the admin panel. Read this fully before touching any file.

---

## 🎯 Project Overview

You are building a **top-notch Admin Panel** based on the **Material Dashboard React** template by Creative Tim.

- **Live Reference**: https://demos.creative-tim.com/material-dashboard-react/#/dashboard
- **GitHub**: material-dashboard-react (Creative Tim)
- **Goal**: Extend and customize it — not rebuild from scratch. Keep the base, elevate everything on top of it.

---

## 🧱 Tech Stack (strictly follow this)

| Layer | Technology |
|---|---|
| UI Framework | React 18 |
| Component Library | Material UI (MUI v5) |
| Language | JavaScript (ES2022+) |
| CSS-in-JS | Emotion.js (via MUI's `sx` prop and `styled`) |
| Charts | Chart.js (via react-chartjs-2) |
| Color Utilities | chroma-js |
| Linting | ESLint |
| Formatting | Prettier |

**Do NOT introduce:** Tailwind, Bootstrap, plain CSS files, Sass, or any other styling system. All styles go through MUI + Emotion only.

---

## 🎨 Styling Philosophy — Read This Carefully

### Core Principle
This dashboard lives alongside a **frontend site that has rich animations and premium aesthetics**. The admin panel must feel equally polished — not like a generic CRUD panel.

### Color System
- Use `chroma-js` for all dynamic color manipulation (lightening, darkening, alpha, gradients between values).
- Define a central theme in `src/theme/` using MUI's `createTheme()`.
- Use CSS variables via MUI's theme tokens — never hardcode hex colors in components.
- Example palette direction: deep navy or charcoal base + electric accent (teal, indigo, or amber). Match it to the frontend site's palette if you have access to it.

```js
// Example chroma usage
import chroma from "chroma-js";
const accentLight = chroma("#5C6BC0").alpha(0.15).css(); // soft glow
const gradientScale = chroma.scale(["#1A237E", "#42A5F5"]).colors(5);
```

### Typography
- Use MUI's `typography` theme config. Set a **distinctive font pairing**:
  - Display/Headings: something with personality (e.g., `Plus Jakarta Sans`, `DM Sans`, `Syne`)
  - Body: clean and readable (e.g., `Inter`, `Figtree`)
- Load via Google Fonts in `public/index.html` or via `@fontsource` packages.
- Never use system-ui or Arial.

### Component Styling Rules
- Use MUI's `sx` prop for one-off styles.
- Use `styled()` from `@emotion/styled` or `MUI styled` for reusable styled components.
- Use MUI's `theme.spacing()`, `theme.palette.*`, `theme.shadows[]` — never raw pixel values.
- Apply `borderRadius` consistently from theme (e.g., `theme.shape.borderRadius * 2`).

### Cards & Surfaces
- Cards should have subtle `box-shadow` — use MUI's shadow scale or define custom ones in theme.
- Apply a very slight glassmorphism on stat cards: `backdrop-filter: blur(10px)` with semi-transparent background.
- Use `MUI Paper` with `elevation` prop or custom `sx` for surfaces.

### Animations & Micro-interactions
The frontend site is animation-heavy. Mirror that energy here:

1. **Page transitions**: Use `@mui/material/Fade` or `Grow` for route changes. Wrap page content in `<Fade in timeout={400}>`.
2. **Stat cards**: Animate numbers counting up on load — use a simple `useEffect` counter or a library like `react-countup`.
3. **Sidebar**: Smooth expand/collapse with MUI `Collapse` + `easing` transitions.
4. **Charts**: Enable Chart.js animation config — `animation.duration: 1000`, `animation.easing: "easeInOutQuart"`.
5. **Table rows**: Stagger-fade rows on load using `Fade` + `transitionDelay` based on row index.
6. **Hover effects on cards**: Use `sx` with `'&:hover': { transform: 'translateY(-4px)', boxShadow: ... }` + `transition: 'all 0.25s ease'`.
7. **Buttons**: Add `position: relative; overflow: hidden` ripple-feel via MUI's built-in ripple (already in ButtonBase — keep it enabled).

```js
// Stagger animation example for table rows
rows.map((row, i) => (
  <Fade in timeout={300 + i * 60} key={row.id}>
    <TableRow .../>
  </Fade>
))
```

---

## 🏗️ Folder Structure

Follow this structure strictly:

```
src/
├── api/              # All API call functions (axios instances, endpoints)
├── assets/           # Images, icons, static files
├── components/       # Reusable UI components
│   ├── charts/       # Chart.js wrapper components
│   ├── common/       # Buttons, Badges, Loaders, etc.
│   └── layout/       # Sidebar, Navbar, PageWrapper
├── hooks/            # Custom React hooks
├── layouts/          # Page layout shells
├── pages/            # Route-level page components
├── store/            # State management (Context API or Zustand)
├── theme/            # MUI theme config, palette, typography, overrides
│   ├── index.js      # createTheme() export
│   ├── palette.js
│   ├── typography.js
│   └── overrides/    # Per-component MUI overrides
└── utils/            # Helpers, formatters, constants
```

---

## ⚙️ Backend Standards

### API Layer
- All API calls live in `src/api/` — never inline fetch/axios in components.
- Use `axios` with a configured instance:

```js
// src/api/axiosInstance.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
});

// Request interceptor: attach auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor: handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // redirect to login
    }
    return Promise.reject(err);
  }
);

export default api;
```

### Data Fetching Pattern
- Use custom hooks in `src/hooks/` for data fetching. Example:

```js
// src/hooks/useUsers.js
import { useState, useEffect } from "react";
import { getUsers } from "../api/users";

export function useUsers() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
```

### State Management
- Use **React Context + useReducer** for global auth/session state.
- For server state (lists, detail data), prefer local hook state or **Zustand** (lightweight, no boilerplate).
- Do NOT use Redux unless the project already has it.

### Error Handling
- Every API call must have `.catch()` handling.
- Show MUI `Snackbar` + `Alert` for user-facing errors — never `console.error` only.
- Use a global error boundary component wrapping the app.

### Authentication
- JWT stored in `localStorage` (or `httpOnly` cookie if backend supports it).
- Protected routes via a `<PrivateRoute>` wrapper component.
- Auto-logout on token expiry using axios interceptor.

---

## 📊 Chart.js Usage

- Wrap every chart in a dedicated component inside `src/components/charts/`.
- Register only the Chart.js components you use (tree-shakeable):

```js
import { Chart as ChartJS, LineElement, CategoryScale, ... } from "chart.js";
ChartJS.register(LineElement, CategoryScale, ...);
```

- Always enable animations:

```js
const options = {
  animation: { duration: 900, easing: "easeInOutCubic" },
  responsive: true,
  maintainAspectRatio: false,
};
```

- Use `chroma-js` to generate chart color arrays programmatically:

```js
const colors = chroma.scale(["#3949AB", "#00ACC1"]).mode("lch").colors(6);
```

---

## ✅ Code Quality

### ESLint Rules (enforce these)
- `react-hooks/rules-of-hooks` — always on
- `react-hooks/exhaustive-deps` — always on
- `no-unused-vars` — error
- `no-console` — warn (remove before PR)

### Prettier Config (use this)
```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

### General Rules
- Functional components only — no class components.
- Destructure props always.
- `key` props must be unique and stable (never array index unless list is static).
- Memoize expensive computations with `useMemo`. Memoize callbacks passed as props with `useCallback`.
- All components must have PropTypes defined or use JSDoc `@param` comments.

---

## 🚫 What NOT to Do

- ❌ Do not write inline styles using `style={{}}` — use `sx` prop or `styled()`.
- ❌ Do not hardcode colors, spacing, or font sizes — always use theme tokens.
- ❌ Do not put API logic in components — always use `src/api/` + custom hooks.
- ❌ Do not add new npm packages without checking if MUI or an existing dep already covers it.
- ❌ Do not skip loading and error states — every async operation needs both.
- ❌ Do not disable ESLint rules inline without a comment explaining why.

---

## 🔁 When Modifying Existing Material Dashboard Files

1. **Never edit node_modules.**
2. Override MUI components via `theme/overrides/` using MUI's `components` key in `createTheme`.
3. If modifying a Creative Tim example page, copy it to `src/pages/` first, then edit.
4. Keep Creative Tim's layout structure (`DashboardLayout`, `Sidenav`, `Navbar`) — extend, don't replace.

---

## 💡 Quick Reference: Key Patterns

| Task | How |
|---|---|
| Style a component | `sx` prop or `styled()` |
| Access theme in `sx` | `sx={{ color: theme => theme.palette.primary.main }}` |
| Animate on mount | `<Fade in><YourComponent/></Fade>` |
| Dynamic color | `chroma("#hex").darken(1.5).hex()` |
| API call | Create fn in `src/api/`, consume via hook in `src/hooks/` |
| Global error toast | MUI `Snackbar` + `Alert` via context |
| Chart colors | `chroma.scale([...]).colors(n)` |
| Protected route | Wrap with `<PrivateRoute>` |

---

*These instructions are the source of truth for this project. When in doubt, refer back here.*
