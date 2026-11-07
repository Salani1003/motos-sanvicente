# San Vicente Automotores — Frontend

Landing de captación de leads (React + TypeScript + Vite). Sin backend: el formulario es una simulación.

## Ejecutar
```bash
npm install
npm run dev      # desarrollo
npm run build    # producción (carpeta dist/)
npm run preview  # servir el build
```
Configuración editable (WhatsApp, Instagram, contacto): copiar `.env.example` a `.env`.

## Estructura
- `src/config/site.ts`: datos del sitio, navegación, WhatsApp/Instagram/contacto (placeholders)
- `src/data/motos.ts`: catálogo mock centralizado
- `src/services/`: `catalog.ts` y `leads.ts` (únicos puntos a reemplazar por una API)
- `src/context/`: catálogo y moto seleccionada (persistida en sessionStorage)
- `src/components/`, `src/sections/`, `src/utils/`, `src/types/`, `src/styles/`
- `public/images/motos/`: fotos locales; `public/images/brand/`: logo

## Páginas
- `/` inicio: hero, formulario, cómo funciona, financiación
- `/motos` catálogo con filtro por marca y búsqueda (`/motos?marca=Honda`, `/motos?q=wave`)

El formulario está en ambas páginas. Al publicar, el hosting debe redirigir todas las rutas a `index.html` (SPA).
