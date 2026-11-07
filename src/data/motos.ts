import type { Moto } from '../types'

/**
 * Fuente única del catálogo (mock). Para pasar a una API alcanza con
 * reemplazar la implementación de `src/services/catalog.ts`.
 * Las descripciones sólo incluyen datos publicados por cada fabricante.
 */
export const MOTOS: Moto[] = [
  {
    id: 'honda-wave-110s',
    brand: 'Honda',
    model: 'Wave 110S',
    name: 'Honda Wave 110S',
    displacement: '110 cc',
    description: 'Motor monocilíndrico de 4 tiempos refrigerado por aire.',
    availability: 'Disponible para consultar',
    image: {
      src: '/images/motos/honda-wave-110s.webp',
      alt: 'Honda Wave 110S roja, vista lateral',
    },
    moreInfoUrl: 'https://motos.honda.com.ar/modelos/wave-110s',
  },
  {
    id: 'honda-glh-150',
    brand: 'Honda',
    model: 'GLH 150',
    name: 'Honda GLH 150',
    displacement: '150 cc',
    description: 'Inyección electrónica de combustible. Ensamblada en Argentina.',
    availability: 'Disponible para consultar',
    image: {
      src: '/images/motos/honda-glh-150.webp',
      alt: 'Honda GLH 150 roja, vista lateral',
    },
    moreInfoUrl: 'https://motos.honda.com.ar/modelos/glh-150',
  },
  {
    id: 'siam-qu-110',
    brand: 'Siam',
    model: 'QU 110',
    name: 'Siam QU 110',
    displacement: '110 cc',
    description: 'Con baulera bajo el asiento y puerto USB.',
    availability: 'Disponible para consultar',
    image: {
      src: '/images/motos/siam-qu-110.webp',
      alt: 'Siam QU 110 azul, vista lateral',
    },
    moreInfoUrl: 'https://siammotos.com.ar/qu',
  },
  {
    id: 'keller-crono-eco-110',
    brand: 'Keller',
    model: 'Crono Eco 110',
    name: 'Keller Crono Eco 110',
    displacement: '110 cc',
    description: 'Versión Eco de la línea Crono Classic, con freno a tambor.',
    availability: 'Consultar disponibilidad',
    image: {
      src: '/images/motos/keller-crono-eco-110.webp',
      alt: 'Keller Crono Eco 110 azul, vista lateral',
    },
    moreInfoUrl: 'https://motoskeller.com.ar/crono-classic-eco-110/',
  },
  {
    id: 'motomel-blitz-110',
    brand: 'Motomel',
    model: 'Blitz 110',
    name: 'Motomel Blitz 110',
    displacement: '110 cc',
    description: 'Motor de 4 tiempos refrigerado por aire, con arranque eléctrico y a pedal.',
    availability: 'Disponible para consultar',
    image: {
      src: '/images/motos/motomel-blitz-110.webp',
      alt: 'Motomel Blitz 110 gris, vista lateral',
    },
    moreInfoUrl: 'https://motomel.com.ar/productos/blitz-110-v8-start/',
  },
]
