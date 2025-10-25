# Premium Docs (React + Tailwind)

A production-ready, pixel-perfect React + Tailwind CSS documentation site replicating the CrudX API docs with dark mode, responsive layout, code highlighting, sticky TOC, and accessible components.

## Tech Stack
- React 18 + Vite
- TypeScript
- Tailwind CSS 3
- Prism React Renderer (lazy loaded)
- Heroicons
- React Router
- Framer Motion

## Getting Started
1. Install dependencies
```bash
npm install
```

2. Run the dev server
```bash
npm run dev
```

3. Build for production
```bash
npm run build
```

4. Preview the production build
```bash
npm run preview
```

## Features
- Light/Dark mode with localStorage persistence
- Sticky left sidebar and “On this page” TOC
- Mobile drawer navigation and keyboard-accessible search (⌘/Ctrl+K)
- Syntax-highlighted code blocks with copy button
- REST endpoints table with method badges and cURL copy
- Accessible focus rings, ARIA labels, and keyboard navigation

## Project Structure
See `src/components`, `src/pages`, `src/utils`, and `src/styles` for implementation details. Tailwind is configured via `tailwind.config.ts` and `postcss.config.js`.

## Theming
Themes are controlled via a class on the `html` element. See `src/utils/theme.ts` and `src/hooks/useTheme.ts`.

## Licensing
This project is provided as an example documentation UI. Replace branding and content as needed.
