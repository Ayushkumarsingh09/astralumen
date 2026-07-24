export type ElementCategory =
  | 'alkali'
  | 'alkaline-earth'
  | 'transition'
  | 'post-transition'
  | 'metalloid'
  | 'nonmetal'
  | 'halogen'
  | 'noble'
  | 'lanthanide'
  | 'actinide'
  | 'unknown';

export interface Element {
  z: number;
  symbol: string;
  name: string;
  mass: number;
  category: ElementCategory;
  row: number;
  col: number;
  electronConfig?: string;
  discovered?: string;
  uses?: string;
}

const CAT = {
  alkali: 'alkali' as const,
  alkalineEarth: 'alkaline-earth' as const,
  transition: 'transition' as const,
  postTransition: 'post-transition' as const,
  metalloid: 'metalloid' as const,
  nonmetal: 'nonmetal' as const,
  halogen: 'halogen' as const,
  noble: 'noble' as const,
  lanthanide: 'lanthanide' as const,
  actinide: 'actinide' as const,
  unknown: 'unknown' as const,
};

function el(
  z: number,
  symbol: string,
  name: string,
  mass: number,
  category: ElementCategory,
  row: number,
  col: number,
  extra?: Partial<Element>
): Element {
  return { z, symbol, name, mass, category, row, col, ...extra };
}

/** All 118 elements with standard periodic-table grid positions */
export const ELEMENTS: Element[] = [
  el(1, 'H', 'Hydrogen', 1.008, CAT.nonmetal, 1, 1, { electronConfig: '1s¹', discovered: '1766', uses: 'Fuel, water, industrial chemistry' }),
  el(2, 'He', 'Helium', 4.003, CAT.noble, 1, 18, { electronConfig: '1s²', discovered: '1868', uses: 'Cryogenics, balloons, MRI cooling' }),
  el(3, 'Li', 'Lithium', 6.94, CAT.alkali, 2, 1, { electronConfig: '[He] 2s¹', discovered: '1817', uses: 'Batteries, mood-stabilizing medicine' }),
  el(4, 'Be', 'Beryllium', 9.012, CAT.alkalineEarth, 2, 2, { electronConfig: '[He] 2s²', discovered: '1798', uses: 'Aerospace alloys, X-ray windows' }),
  el(5, 'B', 'Boron', 10.81, CAT.metalloid, 2, 13, { electronConfig: '[He] 2s² 2p¹', discovered: '1808', uses: 'Glass, detergents, semiconductors' }),
  el(6, 'C', 'Carbon', 12.011, CAT.nonmetal, 2, 14, { electronConfig: '[He] 2s² 2p²', discovered: 'Ancient', uses: 'Life, fuels, materials, diamonds' }),
  el(7, 'N', 'Nitrogen', 14.007, CAT.nonmetal, 2, 15, { electronConfig: '[He] 2s² 2p³', discovered: '1772', uses: 'Fertilizers, atmosphere, food preservation' }),
  el(8, 'O', 'Oxygen', 15.999, CAT.nonmetal, 2, 16, { electronConfig: '[He] 2s² 2p⁴', discovered: '1774', uses: 'Respiration, combustion, steelmaking' }),
  el(9, 'F', 'Fluorine', 18.998, CAT.halogen, 2, 17, { electronConfig: '[He] 2s² 2p⁵', discovered: '1886', uses: 'Toothpaste, Teflon, uranium enrichment' }),
  el(10, 'Ne', 'Neon', 20.180, CAT.noble, 2, 18, { electronConfig: '[He] 2s² 2p⁶', discovered: '1898', uses: 'Neon signs, lasers, cryogenics' }),
  el(11, 'Na', 'Sodium', 22.990, CAT.alkali, 3, 1, { electronConfig: '[Ne] 3s¹', discovered: '1807', uses: 'Table salt, street lighting, chemicals' }),
  el(12, 'Mg', 'Magnesium', 24.305, CAT.alkalineEarth, 3, 2, { electronConfig: '[Ne] 3s²', discovered: '1755', uses: 'Lightweight alloys, fireworks, medicine' }),
  el(13, 'Al', 'Aluminum', 26.982, CAT.postTransition, 3, 13, { electronConfig: '[Ne] 3s² 3p¹', discovered: '1825', uses: 'Packaging, aircraft, construction' }),
  el(14, 'Si', 'Silicon', 28.086, CAT.metalloid, 3, 14, { electronConfig: '[Ne] 3s² 3p²', discovered: '1824', uses: 'Semiconductors, glass, solar cells' }),
  el(15, 'P', 'Phosphorus', 30.974, CAT.nonmetal, 3, 15, { electronConfig: '[Ne] 3s² 3p³', discovered: '1669', uses: 'DNA, fertilizers, matches' }),
  el(16, 'S', 'Sulfur', 32.06, CAT.nonmetal, 3, 16, { electronConfig: '[Ne] 3s² 3p⁴', discovered: 'Ancient', uses: 'Sulfuric acid, vulcanized rubber, gunpowder' }),
  el(17, 'Cl', 'Chlorine', 35.45, CAT.halogen, 3, 17, { electronConfig: '[Ne] 3s² 3p⁵', discovered: '1774', uses: 'Water purification, PVC, bleach' }),
  el(18, 'Ar', 'Argon', 39.95, CAT.noble, 3, 18, { electronConfig: '[Ne] 3s² 3p⁶', discovered: '1894', uses: 'Welding shield gas, incandescent bulbs' }),
  el(19, 'K', 'Potassium', 39.098, CAT.alkali, 4, 1, { electronConfig: '[Ar] 4s¹', discovered: '1807', uses: 'Fertilizers, glass, biological signaling' }),
  el(20, 'Ca', 'Calcium', 40.078, CAT.alkalineEarth, 4, 2, { electronConfig: '[Ar] 4s²', discovered: '1808', uses: 'Bones, cement, steel refining' }),
  el(21, 'Sc', 'Scandium', 44.956, CAT.transition, 4, 3, { electronConfig: '[Ar] 3d¹ 4s²', discovered: '1879', uses: 'Aerospace alloys, stadium lighting' }),
  el(22, 'Ti', 'Titanium', 47.867, CAT.transition, 4, 4, { electronConfig: '[Ar] 3d² 4s²', discovered: '1791', uses: 'Biomedical implants, aircraft, pigments' }),
  el(23, 'V', 'Vanadium', 50.942, CAT.transition, 4, 5, { electronConfig: '[Ar] 3d³ 4s²', discovered: '1801', uses: 'Steel alloys, catalysts, batteries' }),
  el(24, 'Cr', 'Chromium', 51.996, CAT.transition, 4, 6, { electronConfig: '[Ar] 3d⁵ 4s¹', discovered: '1797', uses: 'Stainless steel, chrome plating, pigments' }),
  el(25, 'Mn', 'Manganese', 54.938, CAT.transition, 4, 7, { electronConfig: '[Ar] 3d⁵ 4s²', discovered: '1774', uses: 'Steel production, batteries, glass' }),
  el(26, 'Fe', 'Iron', 55.845, CAT.transition, 4, 8, { electronConfig: '[Ar] 3d⁶ 4s²', discovered: 'Ancient', uses: 'Steel, hemoglobin, magnets' }),
  el(27, 'Co', 'Cobalt', 58.933, CAT.transition, 4, 9, { electronConfig: '[Ar] 3d⁷ 4s²', discovered: '1735', uses: 'Batteries, pigments, superalloys' }),
  el(28, 'Ni', 'Nickel', 58.693, CAT.transition, 4, 10, { electronConfig: '[Ar] 3d⁸ 4s²', discovered: '1751', uses: 'Stainless steel, coins, catalysts' }),
  el(29, 'Cu', 'Copper', 63.546, CAT.transition, 4, 11, { electronConfig: '[Ar] 3d¹⁰ 4s¹', discovered: 'Ancient', uses: 'Electrical wiring, plumbing, alloys' }),
  el(30, 'Zn', 'Zinc', 65.38, CAT.transition, 4, 12, { electronConfig: '[Ar] 3d¹⁰ 4s²', discovered: '1746', uses: 'Galvanization, brass, batteries' }),
  el(31, 'Ga', 'Gallium', 69.723, CAT.postTransition, 4, 13, { electronConfig: '[Ar] 3d¹⁰ 4s² 4p¹', discovered: '1875', uses: 'Semiconductors, LEDs, thermometers' }),
  el(32, 'Ge', 'Germanium', 72.630, CAT.metalloid, 4, 14, { electronConfig: '[Ar] 3d¹⁰ 4s² 4p²', discovered: '1886', uses: 'Fiber optics, infrared optics, transistors' }),
  el(33, 'As', 'Arsenic', 74.922, CAT.metalloid, 4, 15, { electronConfig: '[Ar] 3d¹⁰ 4s² 4p³', discovered: 'Ancient', uses: 'Semiconductors, wood preservatives (historical)' }),
  el(34, 'Se', 'Selenium', 78.971, CAT.nonmetal, 4, 16, { electronConfig: '[Ar] 3d¹⁰ 4s² 4p⁴', discovered: '1817', uses: 'Photocopiers, glass, nutrition' }),
  el(35, 'Br', 'Bromine', 79.904, CAT.halogen, 4, 17, { electronConfig: '[Ar] 3d¹⁰ 4s² 4p⁵', discovered: '1826', uses: 'Flame retardants, photography, medicine' }),
  el(36, 'Kr', 'Krypton', 83.798, CAT.noble, 4, 18, { electronConfig: '[Ar] 3d¹⁰ 4s² 4p⁶', discovered: '1898', uses: 'Lighting, lasers, insulation' }),
  el(37, 'Rb', 'Rubidium', 85.468, CAT.alkali, 5, 1, { electronConfig: '[Kr] 5s¹', discovered: '1861', uses: 'Atomic clocks, research, specialty glass' }),
  el(38, 'Sr', 'Strontium', 87.62, CAT.alkalineEarth, 5, 2, { electronConfig: '[Kr] 5s²', discovered: '1790', uses: 'Fireworks (red), ferrite magnets' }),
  el(39, 'Y', 'Yttrium', 88.906, CAT.transition, 5, 3, { electronConfig: '[Kr] 4d¹ 5s²', discovered: '1794', uses: 'LEDs, superconductors, lasers' }),
  el(40, 'Zr', 'Zirconium', 91.224, CAT.transition, 5, 4, { electronConfig: '[Kr] 4d² 5s²', discovered: '1789', uses: 'Nuclear reactors, ceramics, jewelry' }),
  el(41, 'Nb', 'Niobium', 92.906, CAT.transition, 5, 5, { electronConfig: '[Kr] 4d⁴ 5s¹', discovered: '1801', uses: 'Superconducting magnets, steel alloys' }),
  el(42, 'Mo', 'Molybdenum', 95.95, CAT.transition, 5, 6, { electronConfig: '[Kr] 4d⁵ 5s¹', discovered: '1781', uses: 'High-strength steel, catalysts' }),
  el(43, 'Tc', 'Technetium', 98, CAT.transition, 5, 7, { electronConfig: '[Kr] 4d⁵ 5s²', discovered: '1937', uses: 'Medical imaging, corrosion research' }),
  el(44, 'Ru', 'Ruthenium', 101.07, CAT.transition, 5, 8, { electronConfig: '[Kr] 4d⁷ 5s¹', discovered: '1844', uses: 'Electronics contacts, catalysts' }),
  el(45, 'Rh', 'Rhodium', 102.91, CAT.transition, 5, 9, { electronConfig: '[Kr] 4d⁸ 5s¹', discovered: '1803', uses: 'Catalytic converters, jewelry plating' }),
  el(46, 'Pd', 'Palladium', 106.42, CAT.transition, 5, 10, { electronConfig: '[Kr] 4d¹⁰', discovered: '1803', uses: 'Catalytic converters, electronics, jewelry' }),
  el(47, 'Ag', 'Silver', 107.87, CAT.transition, 5, 11, { electronConfig: '[Kr] 4d¹⁰ 5s¹', discovered: 'Ancient', uses: 'Jewelry, photography, electronics' }),
  el(48, 'Cd', 'Cadmium', 112.41, CAT.transition, 5, 12, { electronConfig: '[Kr] 4d¹⁰ 5s²', discovered: '1817', uses: 'Batteries (NiCd), pigments' }),
  el(49, 'In', 'Indium', 114.82, CAT.postTransition, 5, 13, { electronConfig: '[Kr] 4d¹⁰ 5s² 5p¹', discovered: '1863', uses: 'Touchscreens, solders, semiconductors' }),
  el(50, 'Sn', 'Tin', 118.71, CAT.postTransition, 5, 14, { electronConfig: '[Kr] 4d¹⁰ 5s² 5p²', discovered: 'Ancient', uses: 'Solder, tin plating, bronze alloys' }),
  el(51, 'Sb', 'Antimony', 121.76, CAT.metalloid, 5, 15, { electronConfig: '[Kr] 4d¹⁰ 5s² 5p³', discovered: 'Ancient', uses: 'Flame retardants, semiconductors' }),
  el(52, 'Te', 'Tellurium', 127.60, CAT.metalloid, 5, 16, { electronConfig: '[Kr] 4d¹⁰ 5s² 5p⁴', discovered: '1782', uses: 'Solar cells, thermoelectrics, alloys' }),
  el(53, 'I', 'Iodine', 126.90, CAT.halogen, 5, 17, { electronConfig: '[Kr] 4d¹⁰ 5s² 5p⁵', discovered: '1811', uses: 'Disinfectants, thyroid medicine, nutrition' }),
  el(54, 'Xe', 'Xenon', 131.29, CAT.noble, 5, 18, { electronConfig: '[Kr] 4d¹⁰ 5s² 5p⁶', discovered: '1898', uses: 'Ion propulsion, anesthesia, lighting' }),
  el(55, 'Cs', 'Cesium', 132.91, CAT.alkali, 6, 1, { electronConfig: '[Xe] 6s¹', discovered: '1860', uses: 'Atomic clocks, drilling fluids' }),
  el(56, 'Ba', 'Barium', 137.33, CAT.alkalineEarth, 6, 2, { electronConfig: '[Xe] 6s²', discovered: '1808', uses: 'Medical imaging, fireworks, glass' }),
  el(72, 'Hf', 'Hafnium', 178.49, CAT.transition, 6, 4, { electronConfig: '[Xe] 4f¹⁴ 5d² 6s²', discovered: '1923', uses: 'Nuclear control rods, microchips' }),
  el(73, 'Ta', 'Tantalum', 180.95, CAT.transition, 6, 5, { electronConfig: '[Xe] 4f¹⁴ 5d³ 6s²', discovered: '1802', uses: 'Capacitors, surgical implants' }),
  el(74, 'W', 'Tungsten', 183.84, CAT.transition, 6, 6, { electronConfig: '[Xe] 4f¹⁴ 5d⁴ 6s²', discovered: '1783', uses: 'Light bulb filaments, cutting tools' }),
  el(75, 'Re', 'Rhenium', 186.21, CAT.transition, 6, 7, { electronConfig: '[Xe] 4f¹⁴ 5d⁵ 6s²', discovered: '1925', uses: 'Jet engine superalloys, catalysts' }),
  el(76, 'Os', 'Osmium', 190.23, CAT.transition, 6, 8, { electronConfig: '[Xe] 4f¹⁴ 5d⁶ 6s²', discovered: '1803', uses: 'Fountain pen tips, microscopy stains' }),
  el(77, 'Ir', 'Iridium', 192.22, CAT.transition, 6, 9, { electronConfig: '[Xe] 4f¹⁴ 5d⁷ 6s²', discovered: '1803', uses: 'Spark plugs, crucibles, K-T boundary marker' }),
  el(78, 'Pt', 'Platinum', 195.08, CAT.transition, 6, 10, { electronConfig: '[Xe] 4f¹⁴ 5d⁹ 6s¹', discovered: '1735', uses: 'Catalytic converters, jewelry, electrodes' }),
  el(79, 'Au', 'Gold', 196.97, CAT.transition, 6, 11, { electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹', discovered: 'Ancient', uses: 'Jewelry, electronics, currency' }),
  el(80, 'Hg', 'Mercury', 200.59, CAT.transition, 6, 12, { electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s²', discovered: 'Ancient', uses: 'Thermometers (historical), switches' }),
  el(81, 'Tl', 'Thallium', 204.38, CAT.postTransition, 6, 13, { electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹', discovered: '1861', uses: 'Electronics, medical imaging, research' }),
  el(82, 'Pb', 'Lead', 207.2, CAT.postTransition, 6, 14, { electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²', discovered: 'Ancient', uses: 'Batteries, radiation shielding' }),
  el(83, 'Bi', 'Bismuth', 208.98, CAT.postTransition, 6, 15, { electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³', discovered: '1753', uses: 'Pharmaceuticals, cosmetics, alloys' }),
  el(84, 'Po', 'Polonium', 209, CAT.metalloid, 6, 16, { electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴', discovered: '1898', uses: 'Antistatic devices, nuclear research' }),
  el(85, 'At', 'Astatine', 210, CAT.halogen, 6, 17, { electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵', discovered: '1940', uses: 'Cancer treatment research' }),
  el(86, 'Rn', 'Radon', 222, CAT.noble, 6, 18, { electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶', discovered: '1900', uses: 'Geological surveys, health monitoring' }),
  el(87, 'Fr', 'Francium', 223, CAT.alkali, 7, 1, { electronConfig: '[Rn] 7s¹', discovered: '1939', uses: 'Fundamental physics research' }),
  el(88, 'Ra', 'Radium', 226, CAT.alkalineEarth, 7, 2, { electronConfig: '[Rn] 7s²', discovered: '1898', uses: 'Historical luminous paint, cancer therapy' }),
  el(104, 'Rf', 'Rutherfordium', 267, CAT.transition, 7, 4, { discovered: '1964', uses: 'Nuclear research' }),
  el(105, 'Db', 'Dubnium', 268, CAT.transition, 7, 5, { discovered: '1967', uses: 'Nuclear research' }),
  el(106, 'Sg', 'Seaborgium', 269, CAT.transition, 7, 6, { discovered: '1974', uses: 'Nuclear research' }),
  el(107, 'Bh', 'Bohrium', 270, CAT.transition, 7, 7, { discovered: '1981', uses: 'Nuclear research' }),
  el(108, 'Hs', 'Hassium', 277, CAT.transition, 7, 8, { discovered: '1984', uses: 'Nuclear research' }),
  el(109, 'Mt', 'Meitnerium', 278, CAT.unknown, 7, 9, { discovered: '1982', uses: 'Nuclear research' }),
  el(110, 'Ds', 'Darmstadtium', 281, CAT.unknown, 7, 10, { discovered: '1994', uses: 'Nuclear research' }),
  el(111, 'Rg', 'Roentgenium', 282, CAT.unknown, 7, 11, { discovered: '1994', uses: 'Nuclear research' }),
  el(112, 'Cn', 'Copernicium', 285, CAT.unknown, 7, 12, { discovered: '1996', uses: 'Nuclear research' }),
  el(113, 'Nh', 'Nihonium', 286, CAT.postTransition, 7, 13, { discovered: '2003', uses: 'Nuclear research' }),
  el(114, 'Fl', 'Flerovium', 289, CAT.postTransition, 7, 14, { discovered: '1998', uses: 'Nuclear research' }),
  el(115, 'Mc', 'Moscovium', 290, CAT.postTransition, 7, 15, { discovered: '2003', uses: 'Nuclear research' }),
  el(116, 'Lv', 'Livermorium', 293, CAT.postTransition, 7, 16, { discovered: '2000', uses: 'Nuclear research' }),
  el(117, 'Ts', 'Tennessine', 294, CAT.halogen, 7, 17, { discovered: '2010', uses: 'Nuclear research' }),
  el(118, 'Og', 'Oganesson', 294, CAT.noble, 7, 18, { discovered: '2002', uses: 'Nuclear research' }),
  el(57, 'La', 'Lanthanum', 138.91, CAT.lanthanide, 8, 3, { electronConfig: '[Xe] 5d¹ 6s²', discovered: '1839', uses: 'Camera lenses, catalysts, batteries' }),
  el(58, 'Ce', 'Cerium', 140.12, CAT.lanthanide, 8, 4, { discovered: '1803', uses: 'Catalytic converters, glass polishing' }),
  el(59, 'Pr', 'Praseodymium', 140.91, CAT.lanthanide, 8, 5, { discovered: '1885', uses: 'Magnets, glass colorants, lasers' }),
  el(60, 'Nd', 'Neodymium', 144.24, CAT.lanthanide, 8, 6, { discovered: '1885', uses: 'Powerful magnets, lasers' }),
  el(61, 'Pm', 'Promethium', 145, CAT.lanthanide, 8, 7, { discovered: '1945', uses: 'Nuclear batteries, luminous paint' }),
  el(62, 'Sm', 'Samarium', 150.36, CAT.lanthanide, 8, 8, { discovered: '1879', uses: 'Magnets, cancer treatment, reactors' }),
  el(63, 'Eu', 'Europium', 151.96, CAT.lanthanide, 8, 9, { discovered: '1901', uses: 'Phosphors in displays and Euro notes' }),
  el(64, 'Gd', 'Gadolinium', 157.25, CAT.lanthanide, 8, 10, { discovered: '1880', uses: 'MRI contrast agents, neutron capture' }),
  el(65, 'Tb', 'Terbium', 158.93, CAT.lanthanide, 8, 11, { discovered: '1843', uses: 'Green phosphors, magnets, sonar' }),
  el(66, 'Dy', 'Dysprosium', 162.50, CAT.lanthanide, 8, 12, { discovered: '1886', uses: 'High-performance magnets, lasers' }),
  el(67, 'Ho', 'Holmium', 164.93, CAT.lanthanide, 8, 13, { discovered: '1878', uses: 'Strongest magnetic field per atom, lasers' }),
  el(68, 'Er', 'Erbium', 167.26, CAT.lanthanide, 8, 14, { discovered: '1843', uses: 'Fiber-optic amplifiers, pink glass' }),
  el(69, 'Tm', 'Thulium', 168.93, CAT.lanthanide, 8, 15, { discovered: '1879', uses: 'Portable X-ray devices, lasers' }),
  el(70, 'Yb', 'Ytterbium', 173.05, CAT.lanthanide, 8, 16, { discovered: '1878', uses: 'Fiber lasers, atomic clocks' }),
  el(71, 'Lu', 'Lutetium', 174.97, CAT.lanthanide, 8, 17, { discovered: '1907', uses: 'PET scan detectors, catalysts' }),
  el(89, 'Ac', 'Actinium', 227, CAT.actinide, 9, 3, { discovered: '1899', uses: 'Neutron source research, cancer therapy' }),
  el(90, 'Th', 'Thorium', 232.04, CAT.actinide, 9, 4, { discovered: '1828', uses: 'Potential nuclear fuel, gas mantles' }),
  el(91, 'Pa', 'Protactinium', 231.04, CAT.actinide, 9, 5, { discovered: '1913', uses: 'Scientific research' }),
  el(92, 'U', 'Uranium', 238.03, CAT.actinide, 9, 6, { discovered: '1789', uses: 'Nuclear power, weapons, dating rocks' }),
  el(93, 'Np', 'Neptunium', 237, CAT.actinide, 9, 7, { discovered: '1940', uses: 'Neutron detection, research' }),
  el(94, 'Pu', 'Plutonium', 244, CAT.actinide, 9, 8, { discovered: '1940', uses: 'Nuclear reactors, weapons, RTGs' }),
  el(95, 'Am', 'Americium', 243, CAT.actinide, 9, 9, { discovered: '1944', uses: 'Smoke detectors, industrial gauges' }),
  el(96, 'Cm', 'Curium', 247, CAT.actinide, 9, 10, { discovered: '1944', uses: 'Space power sources, research' }),
  el(97, 'Bk', 'Berkelium', 247, CAT.actinide, 9, 11, { discovered: '1949', uses: 'Synthesis of heavier elements' }),
  el(98, 'Cf', 'Californium', 251, CAT.actinide, 9, 12, { discovered: '1950', uses: 'Neutron source, cancer treatment' }),
  el(99, 'Es', 'Einsteinium', 252, CAT.actinide, 9, 13, { discovered: '1952', uses: 'Scientific research' }),
  el(100, 'Fm', 'Fermium', 257, CAT.actinide, 9, 14, { discovered: '1952', uses: 'Scientific research' }),
  el(101, 'Md', 'Mendelevium', 258, CAT.actinide, 9, 15, { discovered: '1955', uses: 'Scientific research' }),
  el(102, 'No', 'Nobelium', 259, CAT.actinide, 9, 16, { discovered: '1958', uses: 'Scientific research' }),
  el(103, 'Lr', 'Lawrencium', 266, CAT.actinide, 9, 17, { discovered: '1961', uses: 'Scientific research' }),
];
