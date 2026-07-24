export interface Author {
  id: string;
  name: string;
  title: string;
  bio: string;
  expertise: string[];
  avatar: string;
  credentials: string;
  reviewedTopics: string[];
}

export const AUTHORS: Author[] = [
  {
    id: 'dr-elena-vasquez',
    name: 'Dr. Elena Vasquez',
    title: 'Astrophysicist & Science Editor',
    bio: 'Dr. Vasquez holds a Ph.D. in Astrophysics from Caltech and spent twelve years at NASA\'s Jet Propulsion Laboratory studying exoplanet atmospheres. She now leads AstraLumen\'s space and astronomy editorial team.',
    expertise: ['Astrophysics', 'Exoplanets', 'Space Missions'],
    avatar: '/images/authors/elena-vasquez.svg',
    credentials: 'Ph.D. Astrophysics, Caltech',
    reviewedTopics: ['space', 'astronomy', 'planets', 'stars', 'galaxies', 'black-holes'],
  },
  {
    id: 'dr-marcus-chen',
    name: 'Dr. Marcus Chen',
    title: 'Earth Scientist & Climate Researcher',
    bio: 'Dr. Chen is a geologist and climate scientist with research experience at NOAA and the USGS. He specializes in plate tectonics, paleoclimate, and Earth system science.',
    expertise: ['Geology', 'Climate Science', 'Oceanography'],
    avatar: '/images/authors/marcus-chen.svg',
    credentials: 'Ph.D. Earth Sciences, MIT',
    reviewedTopics: ['earth-science', 'geology', 'climate-science'],
  },
  {
    id: 'dr-sarah-okonkwo',
    name: 'Dr. Sarah Okonkwo',
    title: 'Molecular Biologist & Science Educator',
    bio: 'Dr. Okonkwo researches cellular biology and genetics at a leading research university. She is passionate about making life sciences accessible to learners of all ages.',
    expertise: ['Molecular Biology', 'Genetics', 'Human Anatomy'],
    avatar: '/images/authors/sarah-okonkwo.svg',
    credentials: 'Ph.D. Molecular Biology, Stanford',
    reviewedTopics: ['biology', 'animals', 'human-body'],
  },
  {
    id: 'dr-james-whitfield',
    name: 'Dr. James Whitfield',
    title: 'Theoretical Physicist',
    bio: 'Dr. Whitfield explores quantum mechanics, relativity, and particle physics. He has published extensively on fundamental forces and energy systems.',
    expertise: ['Quantum Physics', 'Relativity', 'Particle Physics'],
    avatar: '/images/authors/james-whitfield.svg',
    credentials: 'Ph.D. Physics, Princeton',
    reviewedTopics: ['physics', 'chemistry', 'technology-science'],
  },
  {
    id: 'dr-amira-hassan',
    name: 'Dr. Amira Hassan',
    title: 'Science Communication Director',
    bio: 'Dr. Hassan oversees AstraLumen\'s editorial standards, fact-checking protocols, and science communication strategy. She holds degrees in science journalism and chemistry.',
    expertise: ['Science Communication', 'Chemistry', 'Editorial Standards'],
    avatar: '/images/authors/amira-hassan.svg',
    credentials: 'M.S. Science Journalism, Columbia; Ph.D. Chemistry',
    reviewedTopics: ['science-facts', 'science-news', 'experiments', 'chemistry'],
  },
];

export function getAuthor(id: string): Author | undefined {
  return AUTHORS.find((a) => a.id === id);
}

export function getAuthorsForCategory(category: string): Author[] {
  return AUTHORS.filter((a) => a.reviewedTopics.includes(category));
}
