export const SITE = {
  name: 'AstraLumen',
  tagline: 'Illuminate the Universe of Science',
  description:
    'Explore the cosmos, Earth sciences, biology, physics, and discovery through immersive educational experiences. AstraLumen is your digital science museum and space observatory.',
  url: import.meta.env.PUBLIC_SITE_URL || 'https://astralumen.science',
  locale: 'en-US',
  twitter: '@AstraLumen',
  email: 'contact@astralumen.science',
  founded: '2024',
  gaId: import.meta.env.PUBLIC_GA_ID || '',
  gtmId: import.meta.env.PUBLIC_GTM_ID || '',
} as const;

export const BRAND = {
  colors: {
    void: '#050510',
    deepSpace: '#0a0a1a',
    nebula: '#1a1040',
    cosmic: '#2d1b69',
    stellar: '#7c3aed',
    aurora: '#06b6d4',
    gold: '#fbbf24',
    starlight: '#e2e8f0',
    moon: '#94a3b8',
    mars: '#ef4444',
    earth: '#3b82f6',
    jupiter: '#d97706',
    saturn: '#f59e0b',
  },
  fonts: {
    display: "'Orbitron', 'Segoe UI', sans-serif",
    body: "'Inter', 'Segoe UI', system-ui, sans-serif",
    mono: "'JetBrains Mono', 'Consolas', monospace",
  },
} as const;

export const NAVIGATION = [
  {
    label: 'Space',
    href: '/space',
    children: [
      { label: 'Astronomy', href: '/astronomy' },
      { label: 'Planets', href: '/planets' },
      { label: 'Stars', href: '/stars' },
      { label: 'Galaxies', href: '/galaxies' },
      { label: 'Black Holes', href: '/black-holes' },
    ],
  },
  {
    label: 'Earth Science',
    href: '/earth-science',
    children: [
      { label: 'Geology', href: '/geology' },
      { label: 'Climate Science', href: '/climate-science' },
      { label: 'Oceans', href: '/earth-science/oceans' },
    ],
  },
  {
    label: 'Biology',
    href: '/biology',
    children: [
      { label: 'Animals', href: '/animals' },
      { label: 'Human Body', href: '/human-body' },
    ],
  },
  { label: 'Physics', href: '/physics' },
  { label: 'Chemistry', href: '/chemistry' },
  { label: 'Technology', href: '/technology-science' },
  {
    label: 'Discover',
    href: '/science-facts',
    children: [
      { label: 'Science Facts', href: '/science-facts' },
      { label: 'Science News', href: '/science-news' },
      { label: 'Experiments', href: '/experiments' },
      { label: 'Science Tools', href: '/science-tools' },
    ],
  },
] as const;

export const FOOTER_LINKS = {
  explore: [
    { label: 'Space', href: '/space' },
    { label: 'Astronomy', href: '/astronomy' },
    { label: 'Earth Science', href: '/earth-science' },
    { label: 'Biology', href: '/biology' },
    { label: 'Physics', href: '/physics' },
    { label: 'Chemistry', href: '/chemistry' },
  ],
  resources: [
    { label: 'Science Tools', href: '/science-tools' },
    { label: 'Science Facts', href: '/science-facts' },
    { label: 'Experiments', href: '/experiments' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Authors', href: '/authors' },
    { label: 'Search', href: '/search' },
  ],
  legal: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
    { label: 'Editorial Policy', href: '/editorial-policy' },
    { label: 'Corrections Policy', href: '/corrections-policy' },
    { label: 'Disclaimer', href: '/disclaimer' },
    { label: 'Sitemap', href: '/sitemap' },
  ],
} as const;

export const CATEGORIES = [
  'space',
  'astronomy',
  'planets',
  'stars',
  'galaxies',
  'black-holes',
  'earth-science',
  'geology',
  'climate-science',
  'biology',
  'animals',
  'human-body',
  'physics',
  'chemistry',
  'technology-science',
  'science-facts',
  'science-news',
  'experiments',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_META: Record<
  Category,
  { title: string; description: string; icon: string }
> = {
  space: {
    title: 'Space',
    description: 'Explore the cosmos, missions, and the frontier of space exploration.',
    icon: '🚀',
  },
  astronomy: {
    title: 'Astronomy',
    description: 'Telescopes, constellations, celestial events, and observational science.',
    icon: '🔭',
  },
  planets: {
    title: 'Planets',
    description: 'Worlds of our solar system and beyond — geology, atmospheres, and moons.',
    icon: '🪐',
  },
  stars: {
    title: 'Stars',
    description: 'Stellar birth, life cycles, supernovae, and the building blocks of galaxies.',
    icon: '⭐',
  },
  galaxies: {
    title: 'Galaxies',
    description: 'Spiral arms, ellipticals, collisions, and the large-scale structure of the universe.',
    icon: '🌌',
  },
  'black-holes': {
    title: 'Black Holes',
    description: 'Event horizons, gravitational waves, and the most extreme objects in nature.',
    icon: '⚫',
  },
  'earth-science': {
    title: 'Earth Science',
    description: 'Our planet\'s systems — oceans, atmosphere, geology, and climate.',
    icon: '🌍',
  },
  geology: {
    title: 'Geology',
    description: 'Rocks, minerals, plate tectonics, volcanoes, and Earth\'s deep history.',
    icon: '🪨',
  },
  'climate-science': {
    title: 'Climate Science',
    description: 'Weather systems, climate change, atmospheric science, and global patterns.',
    icon: '🌡️',
  },
  biology: {
    title: 'Biology',
    description: 'Life in all its forms — cells, ecosystems, evolution, and biodiversity.',
    icon: '🧬',
  },
  animals: {
    title: 'Animals',
    description: 'Animal behavior, adaptations, classification, and wildlife science.',
    icon: '🦁',
  },
  'human-body': {
    title: 'Human Body',
    description: 'Anatomy, physiology, neuroscience, and the science of human health.',
    icon: '🫀',
  },
  physics: {
    title: 'Physics',
    description: 'Forces, energy, quantum mechanics, relativity, and the laws of nature.',
    icon: '⚛️',
  },
  chemistry: {
    title: 'Chemistry',
    description: 'Elements, reactions, molecular science, and the periodic table.',
    icon: '🧪',
  },
  'technology-science': {
    title: 'Technology & Science',
    description: 'Innovation, engineering, space technology, and scientific instruments.',
    icon: '💡',
  },
  'science-facts': {
    title: 'Science Facts',
    description: 'Quick, fascinating facts across every branch of science.',
    icon: '💫',
  },
  'science-news': {
    title: 'Science News',
    description: 'Evergreen educational coverage of major scientific discoveries and milestones.',
    icon: '📰',
  },
  experiments: {
    title: 'Experiments',
    description: 'Hands-on science experiments you can try at home or in the classroom.',
    icon: '🔬',
  },
};
