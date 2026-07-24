export interface NasaImage {
  id: string;
  url: string;
  thumb: string;
  title: string;
  attribution: string;
  source: 'NASA' | 'ESA' | 'NOAA' | 'USGS' | 'Public Domain';
}

// Curated public-domain scientific images — each used only once across the site
export const SCIENTIFIC_IMAGES: NasaImage[] = [
  { id: 'img-001', url: 'https://images-assets.nasa.gov/image/PIA12348/PIA12348~orig.jpg', thumb: 'https://images-assets.nasa.gov/image/PIA12348/PIA12348~thumb.jpg', title: 'Andromeda Galaxy', attribution: 'NASA/JPL-Caltech', source: 'NASA' },
  { id: 'img-002', url: 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001435/GSFC_20171208_Archive_e001435~orig.jpg', thumb: 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001435/GSFC_20171208_Archive_e001435~thumb.jpg', title: 'Earth from Space', attribution: 'NASA', source: 'NASA' },
  { id: 'img-003', url: 'https://images-assets.nasa.gov/image/PIA03153/PIA03153~orig.jpg', thumb: 'https://images-assets.nasa.gov/image/PIA03153/PIA03153~thumb.jpg', title: 'Saturn and Rings', attribution: 'NASA/JPL/Space Science Institute', source: 'NASA' },
  { id: 'img-004', url: 'https://images-assets.nasa.gov/image/PIA16800/PIA16800~orig.jpg', thumb: 'https://images-assets.nasa.gov/image/PIA16800/PIA16800~thumb.jpg', title: 'Mars Surface', attribution: 'NASA/JPL-Caltech', source: 'NASA' },
  { id: 'img-005', url: 'https://images-assets.nasa.gov/image/PIA19085/PIA19085~orig.jpg', thumb: 'https://images-assets.nasa.gov/image/PIA19085/PIA19085~thumb.jpg', title: 'Jupiter Great Red Spot', attribution: 'NASA/ESA', source: 'NASA' },
  { id: 'img-006', url: 'https://images-assets.nasa.gov/image/PIA17563/PIA17563~orig.jpg', thumb: 'https://images-assets.nasa.gov/image/PIA17563/PIA17563~thumb.jpg', title: 'Neptune', attribution: 'NASA', source: 'NASA' },
  { id: 'img-007', url: 'https://images-assets.nasa.gov/image/PIA00271/PIA00271~orig.jpg', thumb: 'https://images-assets.nasa.gov/image/PIA00271/PIA00271~thumb.jpg', title: 'Venus', attribution: 'NASA/JPL', source: 'NASA' },
  { id: 'img-008', url: 'https://images-assets.nasa.gov/image/PIA18182/PIA18182~orig.jpg', thumb: 'https://images-assets.nasa.gov/image/PIA18182/PIA18182~thumb.jpg', title: 'Mercury', attribution: 'NASA/Johns Hopkins University Applied Physics Laboratory/Carnegie Institution of Washington', source: 'NASA' },
  { id: 'img-009', url: 'https://images-assets.nasa.gov/image/PIA19953/PIA19953~orig.jpg', thumb: 'https://images-assets.nasa.gov/image/PIA19953/PIA19953~thumb.jpg', title: 'Pluto', attribution: 'NASA/Johns Hopkins University Applied Physics Laboratory/Southwest Research Institute', source: 'NASA' },
  { id: 'img-010', url: 'https://images-assets.nasa.gov/image/PIA21449/PIA21449~orig.jpg', thumb: 'https://images-assets.nasa.gov/image/PIA21449/PIA21449~thumb.jpg', title: 'Black Hole Illustration', attribution: 'NASA\'s Goddard Space Flight Center', source: 'NASA' },
  { id: 'img-011', url: 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000136/GSFC_20171208_Archive_e000136~orig.jpg', thumb: 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000136/GSFC_20171208_Archive_e000136~thumb.jpg', title: 'Solar Flare', attribution: 'NASA/SDO', source: 'NASA' },
  { id: 'img-012', url: 'https://images-assets.nasa.gov/image/PIA15415/PIA15415~orig.jpg', thumb: 'https://images-assets.nasa.gov/image/PIA15415/PIA15415~thumb.jpg', title: 'Milky Way Center', attribution: 'NASA/JPL-Caltech', source: 'NASA' },
  { id: 'img-013', url: 'https://images-assets.nasa.gov/image/PIA04921/PIA04921~orig.jpg', thumb: 'https://images-assets.nasa.gov/image/PIA04921/PIA04921~thumb.jpg', title: 'Eagle Nebula Pillars', attribution: 'NASA/ESA/STScI', source: 'NASA' },
  { id: 'img-014', url: 'https://images-assets.nasa.gov/image/PIA04213/PIA04213~orig.jpg', thumb: 'https://images-assets.nasa.gov/image/PIA04213/PIA04213~thumb.jpg', title: 'Orion Nebula', attribution: 'NASA/JPL-Caltech', source: 'NASA' },
  { id: 'img-015', url: 'https://images-assets.nasa.gov/image/PIA23645/PIA23645~orig.jpg', thumb: 'https://images-assets.nasa.gov/image/PIA23645/PIA23645~thumb.jpg', title: 'International Space Station', attribution: 'NASA', source: 'NASA' },
  { id: 'img-016', url: 'https://images-assets.nasa.gov/image/iss065e002990/iss065e002990~orig.jpg', thumb: 'https://images-assets.nasa.gov/image/iss065e002990/iss065e002990~thumb.jpg', title: 'Aurora from ISS', attribution: 'NASA', source: 'NASA' },
  { id: 'img-017', url: 'https://images-assets.nasa.gov/image/PIA23653/PIA23653~orig.jpg', thumb: 'https://images-assets.nasa.gov/image/PIA23653/PIA23653~thumb.jpg', title: 'Moon Surface', attribution: 'NASA/GSFC/Arizona State University', source: 'NASA' },
  { id: 'img-018', url: 'https://images-assets.nasa.gov/image/PIA18185/PIA18185~orig.jpg', thumb: 'https://images-assets.nasa.gov/image/PIA18185/PIA18185~thumb.jpg', title: 'Uranus', attribution: 'NASA/JPL-Caltech', source: 'NASA' },
  { id: 'img-019', url: 'https://images-assets.nasa.gov/image/PIA18186/PIA18186~orig.jpg', thumb: 'https://images-assets.nasa.gov/image/PIA18186/PIA18186~thumb.jpg', title: 'Uranus Moons', attribution: 'NASA/JPL-Caltech', source: 'NASA' },
  { id: 'img-020', url: 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001219/GSFC_20171208_Archive_e001219~orig.jpg', thumb: 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001219/GSFC_20171208_Archive_e001219~thumb.jpg', title: 'Hubble Deep Field', attribution: 'NASA/ESA', source: 'NASA' },
  { id: 'img-021', url: 'https://images-assets.nasa.gov/image/PIA12235/PIA12235~orig.jpg', thumb: 'https://images-assets.nasa.gov/image/PIA12235/PIA12235~thumb.jpg', title: 'Comet', attribution: 'NASA/JPL-Caltech', source: 'NASA' },
  { id: 'img-022', url: 'https://images-assets.nasa.gov/image/PIA16828/PIA16828~orig.jpg', thumb: 'https://images-assets.nasa.gov/image/PIA16828/PIA16828~thumb.jpg', title: 'Asteroid', attribution: 'NASA/JPL-Caltech', source: 'NASA' },
  { id: 'img-023', url: 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001124/GSFC_20171208_Archive_e001124~orig.jpg', thumb: 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001124/GSFC_20171208_Archive_e001124~thumb.jpg', title: 'Supernova Remnant', attribution: 'NASA/CXC/SAO', source: 'NASA' },
  { id: 'img-024', url: 'https://images-assets.nasa.gov/image/PIA16884/PIA16884~orig.jpg', thumb: 'https://images-assets.nasa.gov/image/PIA16884/PIA16884~thumb.jpg', title: 'Neutron Star', attribution: 'NASA', source: 'NASA' },
  { id: 'img-025', url: 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000709/GSFC_20171208_Archive_e000709~orig.jpg', thumb: 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000709/GSFC_20171208_Archive_e000709~thumb.jpg', title: 'Pulsar', attribution: 'NASA', source: 'NASA' },
];

export function getImageByIndex(index: number): NasaImage {
  return SCIENTIFIC_IMAGES[index % SCIENTIFIC_IMAGES.length];
}

export function getImageById(id: string): NasaImage | undefined {
  return SCIENTIFIC_IMAGES.find((img) => img.id === id);
}
