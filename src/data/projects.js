// Hardcoded for now — will migrate to a CMS later.
// `slide` corresponds to the placeholder gradient classes (1..5) in home.css.

export const projects = [
  {
    slug: 'nombre-proyecto-1',
    index: '01',
    title: 'Nombre proyecto',
    year: '2024',
    description:
      'Sesión privada de archivo — piezas vintage de los 90 puestas en diálogo con jóvenes diseñadores latinoamericanos.',
    credits: {
      cliente: 'Lorem Ipsum Dolor Sit Amet',
      foto: 'Lorem Ipsum Dolor Sit Amet Consectetur.',
      pelo: 'Lorem Ipsum Dolor Sit A',
      maquillage: 'Lorem Ipsum Dolor Sit Amet',
      modelo: [
        'Lorem Ipsum Dolor Sit',
        'Lorem Ipsum Dolor Sit',
        'Lorem Ipsum Dolor Sit',
        'Lorem Ipsum Dolor Sit',
      ],
    },
    coverSlide: 3,
    images: [3, 2, 5, 4, 1],
  },
  {
    slug: 'nombre-proyecto-2',
    index: '02',
    title: 'Nombre proyecto',
    year: '2024',
    description: 'Editorial spread para revista independiente. Print.',
    credits: {
      cliente: 'Lorem Ipsum Dolor Sit Amet',
      foto: 'Lorem Ipsum Dolor Sit Amet',
      pelo: 'Lorem Ipsum Dolor Sit',
      maquillage: 'Lorem Ipsum Dolor Sit Amet',
      modelo: ['Lorem Ipsum Dolor Sit', 'Lorem Ipsum Dolor Sit'],
    },
    coverSlide: 2,
    images: [2, 1, 4, 3, 5],
  },
  {
    slug: 'nombre-proyecto-3',
    index: '03',
    title: 'Nombre proyecto',
    year: '2023',
    description: 'Brand campaign. Concept & styling.',
    credits: {
      cliente: 'Lorem Ipsum Dolor Sit Amet',
      foto: 'Lorem Ipsum Dolor Sit Amet',
      pelo: 'Lorem Ipsum Dolor Sit',
      maquillage: 'Lorem Ipsum Dolor Sit Amet',
      modelo: ['Lorem Ipsum Dolor Sit'],
    },
    coverSlide: 5,
    images: [5, 1, 2, 3, 4],
  },
]
