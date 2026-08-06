import { Product, Category, Brand, Pack, StoreContact, Order } from '../types';

export const INITIAL_CONTACT: StoreContact = {
  name: "ELECTRO_FENNASSA",
  email: "Electro_Fennassa@proton.me",
  phone: "+212644543909",
  whatsapp: "+212644543909",
  address: "BD la Résistance, Hay Jdid",
  city: "Taourirt",
  country: "Maroc",
  googleMapsUrl: "https://maps.google.com/?q=Taourirt+Hay+Jdid",
  hours: "Lun - Sam: 09:00 - 21:00 | Dim: Sur rendez-vous"
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'refrigerateurs',
    name: 'Réfrigérateurs',
    description: 'Réfrigérateurs combinés, side-by-side et encastrables NoFrost.',
    iconName: 'Refrigerator',
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=600&q=80',
    productCount: 12
  },
  {
    id: 'lave-linge',
    name: 'Lave-linge',
    description: 'Machines à laver séchantes, chargement frontal et supérieur.',
    iconName: 'WashingMachine',
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&q=80',
    productCount: 9
  },
  {
    id: 'climatiseurs',
    name: 'Climatiseurs',
    description: 'Climatiseurs Inverter chaud/froid silencieux et économes.',
    iconName: 'Wind',
    image: 'https://images.unsplash.com/photo-1631545806062-8e7c1f810214?w=600&q=80',
    productCount: 8
  },
  {
    id: 'congelateurs',
    name: 'Congélateurs',
    description: 'Congélateurs armoires et coffres à grande capacité.',
    iconName: 'Box',
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&q=80',
    productCount: 6
  },
  {
    id: 'televiseurs',
    name: 'Téléviseurs',
    description: 'Smart TV QLED, OLED 4K UHD avec Android & Google TV.',
    iconName: 'Tv',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80',
    productCount: 15
  },
  {
    id: 'fours',
    name: 'Fours',
    description: 'Fours encastrables à chaleur tournante et nettoyage pyrolyse.',
    iconName: 'Flame',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&q=80',
    productCount: 7
  },
  {
    id: 'plaques',
    name: 'Plaques de cuisson',
    description: 'Plaques à induction, vitrocéramiques et gaz verre trempé.',
    iconName: 'Grid',
    image: 'https://images.unsplash.com/photo-1629949009765-40fc74c954c4?w=600&q=80',
    productCount: 8
  },
  {
    id: 'hottes',
    name: 'Hottes aspirantes',
    description: 'Hottes murale, îlot et encastrables haute aspiration.',
    iconName: 'Fan',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80',
    productCount: 5
  },
  {
    id: 'aspirateurs',
    name: 'Aspirateurs',
    description: 'Aspirateurs balais sans fil, robots et traîneaux silencieux.',
    iconName: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&q=80',
    productCount: 7
  },
  {
    id: 'petit-electromenager',
    name: 'Petit Électroménager',
    description: 'Blenders, cafetières, friteuses sans huile air fryer et robots.',
    iconName: 'Coffee',
    image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&q=80',
    productCount: 14
  },
  {
    id: 'chauffe-eau',
    name: 'Chauffe-eau',
    description: 'Chauffe-eau électriques et à gaz haute sécurité.',
    iconName: 'Zap',
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&q=80',
    productCount: 6
  },
  {
    id: 'accessoires',
    name: 'Accessoires',
    description: 'Supports murales TV, tuyaux gaz inox, détendeurs et entretien.',
    iconName: 'Sliders',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80',
    productCount: 10
  },
  {
    id: 'ameublement-literie',
    name: 'Ameublement & Literie',
    description: 'Matelas orthopédiques, lits capitonnés, salons et salles à manger.',
    iconName: 'Bed',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80',
    productCount: 16
  }
];

export const INITIAL_BRANDS: Brand[] = [
  { id: 'daiko', name: 'Daiko' },
  { id: 'whirlpool', name: 'Whirlpool' },
  { id: 'dolidol', name: 'Dolidol' },
  { id: 'samsung', name: 'Samsung' },
  { id: 'lg', name: 'LG Electronics' },
  { id: 'bosch', name: 'Bosch' },
  { id: 'tcl', name: 'TCL' },
  { id: 'moulinex', name: 'Moulinex' },
  { id: 'franke', name: 'Franke' },
  { id: 'richbond', name: 'Richbond Literie' },
  { id: 'fennassa-comfort', name: 'Fennassa Comfort' }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p-1',
    name: 'Réfrigérateur Samsung NoFrost Side-by-Side 617L SpaceMax',
    ref: 'REF-SAM-617-NF',
    sku: 'EF-RF-001',
    price: 11490,
    originalPrice: 12990,
    promo: true,
    discountPercent: 12,
    categoryId: 'refrigerateurs',
    categoryName: 'Réfrigérateurs',
    brand: 'Samsung',
    description: 'Réfrigérateur américain grande capacité 617 litres avec technologie All-Around Cooling, compresseur Digital Inverter et distributeur d\'eau filtrée et glaçons.',
    stock: 8,
    guaranteeYears: 3,
    availability: 'En Stock',
    images: [
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&q=80',
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=80',
      'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80'
    ],
    specs: {
      'Capacité': '617 Litres',
      'Technologie': 'NoFrost All-Around',
      'Moteur': 'Digital Inverter (Garantie 10 ans)',
      'Classe Énergétique': 'A++',
      'Dimensions': '91.2 x 178 x 71.6 cm'
    },
    isFeatured: true,
    createdAt: '2026-07-15'
  },
  {
    id: 'p-2',
    name: 'Lave-linge LG Vivace 9kg AI DD Direct Drive Vapeur',
    ref: 'LL-LG-9KG-AIDD',
    sku: 'EF-LL-002',
    price: 5490,
    originalPrice: 6200,
    promo: true,
    discountPercent: 11,
    categoryId: 'lave-linge',
    categoryName: 'Lave-linge',
    brand: 'LG Electronics',
    description: 'Machine à laver LG 9kg avec intelligence artificielle AI DD qui adapte les mouvements du tambour. Traitement anti-allergie à la vapeur Steam+ et lavage rapide TurboWash en 59 minutes.',
    stock: 12,
    guaranteeYears: 2,
    availability: 'En Stock',
    images: [
      'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=80',
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&q=80',
      'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=800&q=80'
    ],
    specs: {
      'Capacité': '9 Kg',
      'Essorage': '1400 tr/min',
      'Moteur': 'Inverter Direct Drive',
      'Fonction Vapeur': 'Steam+ Hygiène',
      'Couleur': 'Gris Inox Vded'
    },
    isFeatured: true,
    createdAt: '2026-07-20'
  },
  {
    id: 'p-3',
    name: 'Téléviseur TCL 55" QLED 4K Google TV 120Hz Gaming',
    ref: 'TV-TCL-55-QLED',
    sku: 'EF-TV-003',
    price: 4790,
    originalPrice: 5490,
    promo: true,
    discountPercent: 13,
    categoryId: 'televiseurs',
    categoryName: 'Téléviseurs',
    brand: 'TCL',
    description: 'Téléviseur Smart 55 pouces QLED Quantum Dot avec système Google TV, Dolby Vision IQ, Dolby Atmos et port HDMI 2.1 pour une expérience de jeu et cinéma ultra-fluide.',
    stock: 15,
    guaranteeYears: 2,
    availability: 'En Stock',
    images: [
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80',
      'https://images.unsplash.com/photo-1577979749830-f1d742b96791?w=800&q=80',
      'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800&q=80'
    ],
    specs: {
      'Taille écran': '55 pouces (139 cm)',
      'Définition': '4K UHD (3840 x 2160)',
      'Technologie': 'QLED HDR10+',
      'Système': 'Google TV / Chromecast',
      'Audio': 'Dolby Atmos 20W'
    },
    isFeatured: true,
    createdAt: '2026-07-22'
  },
  {
    id: 'p-4',
    name: 'Matelas Orthopédique Fennassa Royal Luxe 160x200cm Memory Foam',
    ref: 'MAT-FEN-ROYAL-160',
    sku: 'EF-AM-004',
    price: 3890,
    originalPrice: 4500,
    promo: false,
    categoryId: 'ameublement-literie',
    categoryName: 'Ameublement & Literie',
    brand: 'Fennassa Comfort',
    description: 'Matelas haut de gamme orthopédique à mémoire de forme multi-zones. Traitement anti-acariens, tissu respirant Jacquard aloe vera et soutien lombaire ferme idéal pour le dos.',
    stock: 10,
    guaranteeYears: 5,
    availability: 'En Stock',
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80'
    ],
    specs: {
      'Dimensions': '160 x 200 cm',
      'Épaisseur': '28 cm',
      'Accueil': 'Mémoire de forme moelleux',
      'Soutien': 'Orthopédique Ferme',
      'Garantie': '5 ans fabricant'
    },
    isFeatured: true,
    createdAt: '2026-07-25'
  },
  {
    id: 'p-5',
    name: 'Lit Double Capitonné Velours Premium Gris 160x200cm avec Sommier',
    ref: 'LIT-FEN-VELOURS-GRIS',
    sku: 'EF-AM-005',
    price: 4990,
    originalPrice: 5800,
    promo: false,
    categoryId: 'ameublement-literie',
    categoryName: 'Ameublement & Literie',
    brand: 'Fennassa Comfort',
    description: 'Magnifique lit double design capitonné revêtu de velours anti-taches gris. Comprend une tête de lit majestueuse de 120cm et un sommier à lattes renforcées en acier.',
    stock: 6,
    guaranteeYears: 3,
    availability: 'En Stock',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80'
    ],
    specs: {
      'Couchage': '160 x 200 cm',
      'Structure': 'Bois massif & Acier',
      'Revêtement': 'Velours premium déperlant',
      'Tête de lit': 'Inclus (Hauteur 120cm)'
    },
    isFeatured: true,
    createdAt: '2026-07-28'
  },
  {
    id: 'p-6',
    name: 'Climatiseur Whirlpool Inverter 12000 BTU 3D Cool Chaud/Froid',
    ref: 'CLIM-WHL-12K-INV',
    sku: 'EF-CL-006',
    price: 4390,
    originalPrice: 4890,
    promo: false,
    categoryId: 'climatiseurs',
    categoryName: 'Climatiseurs',
    brand: 'Whirlpool',
    description: 'Climatiseur split mural Inverter 12000 BTU 6ème Sens. Refroidissement et chauffage ultra-rapide 3D Cool, filtre HEPA purificateur d\'air et mode nuit super silencieux 19dB.',
    stock: 14,
    guaranteeYears: 2,
    availability: 'En Stock',
    images: [
      'https://images.unsplash.com/photo-1631545806062-8e7c1f810214?w=800&q=80',
      'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800&q=80',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80'
    ],
    specs: {
      'Puissance': '12000 BTU (Idéal 25-35m²)',
      'Moteur': 'Inverter Chaud / Froid',
      'Gaz': 'R32 Écologique',
      'Niveau sonore': '19 dB (Ultra Silencieux)'
    },
    isFeatured: false,
    createdAt: '2026-08-01'
  },
  {
    id: 'p-7',
    name: 'Ensemble Salle à Manger Moderne 6 Chaises Chêne & Velours',
    ref: 'SAM-FEN-CHENE-6C',
    sku: 'EF-AM-007',
    price: 6200,
    originalPrice: 7500,
    promo: false,
    categoryId: 'ameublement-literie',
    categoryName: 'Ameublement & Literie',
    brand: 'Fennassa Comfort',
    description: 'Table de salle à manger extensible en bois effet chêne avec 6 chaises ergonomiques matelassées en velours. Design scandinave chaleureux et très robuste pour recevoir toute la famille.',
    stock: 4,
    guaranteeYears: 2,
    availability: 'En Stock',
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
      'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=800&q=80',
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=800&q=80'
    ],
    specs: {
      'Table': '160-200 x 90 cm (Extensible)',
      'Chaises': '6 Chaises velours structuré',
      'Piètement': 'Métal noir thermolaqué'
    },
    isFeatured: true,
    createdAt: '2026-08-02'
  },
  {
    id: 'p-8',
    name: 'Four Encastrable Bosch Série 4 Chaleur Tournante Pyrolyse',
    ref: 'FOUR-BOSCH-SERIE4',
    sku: 'EF-FR-008',
    price: 4590,
    originalPrice: 5100,
    promo: false,
    categoryId: 'fours',
    categoryName: 'Fours',
    brand: 'Bosch',
    description: 'Four encastrable Bosch inox 71 litres avec technologie 3D Hotair pour une cuisson uniforme sur 3 niveaux. Nettoyage automatique par pyrolyse et commandes escamotables.',
    stock: 7,
    guaranteeYears: 2,
    availability: 'En Stock',
    images: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80',
      'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=80',
      'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&q=80'
    ],
    specs: {
      'Volume': '71 Litres',
      'Nettoyage': 'Pyrolyse Auto',
      'Modes': '10 Modes de cuisson',
      'Afficheur': 'LED Rouge escamotable'
    },
    isFeatured: false,
    createdAt: '2026-08-03'
  },
  {
    id: 'p-9',
    name: 'Plaque de Cuisson Franke Gaz 4 Feux Verre Trempé Noir',
    ref: 'PLQ-FRK-GAZ4-VT',
    sku: 'EF-PL-009',
    price: 2490,
    originalPrice: 2890,
    promo: false,
    categoryId: 'plaques',
    categoryName: 'Plaques de cuisson',
    brand: 'Franke',
    description: 'Plaque de cuisson encastrable gaz 4 brûleurs haute efficacité sur surface en verre trempé noir résistant aux rayures. Allumage une main et sécurité thermocouple.',
    stock: 11,
    guaranteeYears: 2,
    availability: 'En Stock',
    images: [
      'https://images.unsplash.com/photo-1629949009765-40fc74c954c4?w=800&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80',
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&q=80'
    ],
    specs: {
      'Nombre de feux': '4 Feux Gaz',
      'Matière': 'Verre trempé haute résistance',
      'Sécurité': 'Thermocouple automatique'
    },
    isFeatured: false,
    createdAt: '2026-08-04'
  },
  {
    id: 'p-10',
    name: 'Friteuse sans Huile Moulinex Easy Fry Mega Air Fryer 6L',
    ref: 'AIR-MUL-EASY-6L',
    sku: 'EF-PE-010',
    price: 1190,
    originalPrice: 1450,
    promo: false,
    categoryId: 'petit-electromenager',
    categoryName: 'Petit Électroménager',
    brand: 'Moulinex',
    description: 'Friteuse à air chaud Moulinex 6L XL pour cuire, griller, rôtir et frire sainement avec 99% d\'huile en moins. Écran tactile avec 8 programmes automatiques.',
    stock: 25,
    guaranteeYears: 2,
    availability: 'En Stock',
    images: [
      'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&q=80',
      'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80'
    ],
    specs: {
      'Capacité': '6.0 Litres (Jusqu\'à 6 personnes)',
      'Puissance': '1800 Watt',
      'Programmes': '8 Préréglages tactiles'
    },
    isFeatured: true,
    createdAt: '2026-08-04'
  },
  {
    id: 'p-11',
    name: 'Micro-ondes Moulinex Ultimate Grill 28L Inox Encastrable',
    ref: 'MO-MUL-28L-GRILL',
    sku: 'EF-PE-011',
    price: 1590,
    originalPrice: 1890,
    promo: true,
    discountPercent: 16,
    categoryId: 'petit-electromenager',
    categoryName: 'Petit Électroménager',
    brand: 'Moulinex',
    description: 'Four Micro-ondes combiné grill 28 litres avec plateau tournant 31.5cm, commande électronique, décongélation automatique et cavité inox facile à nettoyer.',
    stock: 18,
    guaranteeYears: 2,
    availability: 'En Stock',
    images: [
      'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&q=80',
      'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80'
    ],
    specs: {
      'Capacité': '28 Litres',
      'Puissance Micro-ondes': '900W',
      'Puissance Grill': '1100W',
      'Finition': 'Inox Brossé'
    },
    isFeatured: true,
    createdAt: '2026-08-04'
  },
  {
    id: 'p-12',
    name: 'Téléviseur Daiko 65" Google TV 5.0 4K UHD Frameless HDR10 Dolby (GLED65AI97DK)',
    ref: 'TV-DK-65-GLED',
    sku: 'EF-TV-012',
    price: 4290,
    originalPrice: 4990,
    promo: true,
    discountPercent: 14,
    categoryId: 'televiseurs',
    categoryName: 'Téléviseurs',
    brand: 'Daiko',
    description: 'Smart TV Daiko 65 pouces 4K Ultra HD sans bordure (Frameless) équipée du système Google TV 5.0. Image haute précision avec HDR10, HLG et son enveloppant Dolby Audio. Commande vocale Google Assistant intégrée.',
    stock: 12,
    guaranteeYears: 1,
    availability: 'En Stock',
    images: [
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80',
      'https://images.unsplash.com/photo-1577979749830-f1d742b96791?w=800&q=80',
      'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800&q=80'
    ],
    specs: {
      'Taille écran': '65 pouces (165 cm)',
      'Définition': '4K UHD (3840 x 2160)',
      'Système': 'Google TV 5.0 avec Chromecast',
      'Technologies': 'Frameless, HDR10, HLG, Dolby Audio',
      'Connectivité': 'WiFi, Bluetooth, 3x HDMI, 2x USB'
    },
    isFeatured: true,
    createdAt: '2026-08-05'
  },
  {
    id: 'p-13',
    name: 'Climatiseur Daiko Split Mural 12000 BTU Inverter Smart Wifi R410A (AC12QSLIM410BK)',
    ref: 'CLIM-DK-12K-INV',
    sku: 'EF-CL-013',
    price: 3290,
    originalPrice: 3790,
    promo: true,
    discountPercent: 13,
    categoryId: 'climatiseurs',
    categoryName: 'Climatiseurs',
    brand: 'Daiko',
    description: 'Climatiseur Split Mural Daiko 12000 BTU Inverter haute performance Chaud & Froid. Contrôlable à distance via Smart WiFi application smartphone. Design Slim élégant, fonctionnement ultra silencieux (42dB) et mode nuit économe.',
    stock: 15,
    guaranteeYears: 1,
    availability: 'En Stock',
    images: [
      'https://images.unsplash.com/photo-1631545806062-8e7c1f810214?w=800&q=80',
      'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800&q=80'
    ],
    specs: {
      'Puissance': '12000 BTU (Refroidissement 12000 / Chauffage 12500)',
      'Technologie': 'Inverter Chaud & Froid',
      'Connectivité': 'Smart WiFi contrôlable par smartphone',
      'Niveau Sonore': '42 dB Silencieux',
      'Gaz Réfrigérant': 'R410A Écologique'
    },
    isFeatured: true,
    createdAt: '2026-08-05'
  },
  {
    id: 'p-14',
    name: 'Lave-linge Daiko 8kg Automatique Inverter 1400 tr/min A+++ (WI948MX-98K)',
    ref: 'LL-DK-8KG-INV',
    sku: 'EF-LL-014',
    price: 2890,
    originalPrice: 3390,
    promo: true,
    discountPercent: 15,
    categoryId: 'lave-linge',
    categoryName: 'Lave-linge',
    brand: 'Daiko',
    description: 'Machine à laver automatique Daiko 8 kg à chargement frontal. Équipée d\'un moteur Inverter durable et économique classe A+++. 16 programmes de lavage dont lavage rapide 15min et soin des textiles délicats.',
    stock: 10,
    guaranteeYears: 1,
    availability: 'En Stock',
    images: [
      'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=80',
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&q=80'
    ],
    specs: {
      'Capacité': '8 Kg',
      'Vitesse d\'essorage': '1400 tr/min',
      'Moteur': 'Inverter haute économie d\'énergie',
      'Classe Énergétique': 'A+++',
      'Programmes': '16 Programmes intelligents'
    },
    isFeatured: true,
    createdAt: '2026-08-05'
  },
  {
    id: 'p-15',
    name: 'Téléviseur Daiko 32" HD Smart Google TV Frameless Récepteur Intégré (32H93DK)',
    ref: 'TV-DK-32-SMART',
    sku: 'EF-TV-015',
    price: 1390,
    originalPrice: 1690,
    promo: true,
    discountPercent: 18,
    categoryId: 'televiseurs',
    categoryName: 'Téléviseurs',
    brand: 'Daiko',
    description: 'Téléviseur Daiko 32 pouces HD Frameless avec récepteur satellite TNT/Sat intégré. Système Google TV avec accès direct à YouTube, Netflix et IPTV. Dolby Audio et connectivité Bluetooth.',
    stock: 20,
    guaranteeYears: 1,
    availability: 'En Stock',
    images: [
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80'
    ],
    specs: {
      'Taille écran': '32 pouces (81 cm)',
      'Définition': 'HD 1366 x 768',
      'Récepteur': 'Récepteur Satellite TNT / SAT Intégré',
      'Fonctions': 'Google TV, Bluetooth, Dolby Audio'
    },
    isFeatured: false,
    createdAt: '2026-08-05'
  },
  {
    id: 'p-16',
    name: 'Plaque de Cuisson Encastrable Daiko 4 Feux Gaz Verre Trempé Noir',
    ref: 'PLQ-DK-GAZ4-VT',
    sku: 'EF-PL-016',
    price: 1190,
    originalPrice: 1450,
    promo: true,
    discountPercent: 18,
    categoryId: 'plaques',
    categoryName: 'Plaques de cuisson',
    brand: 'Daiko',
    description: 'Plaque encastrable Daiko 4 feux gaz sur verre trempé noir résistant aux chocs et rayures. Allumage électronique intégré aux manettes et sécurité thermocouple coupe-gaz automatique.',
    stock: 14,
    guaranteeYears: 1,
    availability: 'En Stock',
    images: [
      'https://images.unsplash.com/photo-1629949009765-40fc74c954c4?w=800&q=80'
    ],
    specs: {
      'Feux': '4 Brûleurs Gaz',
      'Surface': 'Verre Trempé Noir Sécurit',
      'Sécurité': 'Thermocouple automatique'
    },
    isFeatured: false,
    createdAt: '2026-08-05'
  },
  {
    id: 'p-17',
    name: 'Réfrigérateur Whirlpool NoFrost 438L 6th Sense Dual NoFrost Inox (W7931OOX)',
    ref: 'REF-WHL-438-6S',
    sku: 'EF-RF-017',
    price: 7890,
    originalPrice: 8990,
    promo: true,
    discountPercent: 12,
    categoryId: 'refrigerateurs',
    categoryName: 'Réfrigérateurs',
    brand: 'Whirlpool',
    description: 'Réfrigérateur combiné Whirlpool 438 Litres avec technologie exclusive 6th Sense Dual NoFrost. Maintient l\'humidité idéale pour préserver les aliments frais 4x plus longtemps. Finition inox anti-traces.',
    stock: 7,
    guaranteeYears: 1,
    availability: 'En Stock',
    images: [
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&q=80',
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=80'
    ],
    specs: {
      'Capacité globale': '438 Litres',
      'Technologie': '6th Sense Dual NoFrost',
      'Moteur': 'Inverter Zen Tech',
      'Classe': 'A++',
      'Finition': 'Acier Inoxydable Anti-traces'
    },
    isFeatured: true,
    createdAt: '2026-08-05'
  },
  {
    id: 'p-18',
    name: 'Lave-linge Whirlpool FreshCare+ 9kg 1400 tr/min Inverter Steam (FFWDB964369)',
    ref: 'LL-WHL-9KG-FC',
    sku: 'EF-LL-018',
    price: 4890,
    originalPrice: 5490,
    promo: true,
    discountPercent: 11,
    categoryId: 'lave-linge',
    categoryName: 'Lave-linge',
    brand: 'Whirlpool',
    description: 'Lave-linge Whirlpool 9kg avec technologie FreshCare+ qui garde votre linge frais jusqu\'à 6 heures après la fin du cycle grâce au brassage doux et à la vapeur. Moteur induction SenseInverter ultra silencieux.',
    stock: 9,
    guaranteeYears: 1,
    availability: 'En Stock',
    images: [
      'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=80'
    ],
    specs: {
      'Capacité': '9 Kg',
      'Essorage': '1400 tr/min',
      'Technologie': 'FreshCare+ Vapeur 6h',
      'Moteur': 'SenseInverter Induction'
    },
    isFeatured: true,
    createdAt: '2026-08-05'
  },
  {
    id: 'p-19',
    name: 'Four Encastrable Whirlpool 6th Sense Chaleur Tournante 73L Inox (AKZ96290IX)',
    ref: 'FOUR-WHL-73L-6S',
    sku: 'EF-FR-019',
    price: 3990,
    originalPrice: 4500,
    promo: true,
    discountPercent: 11,
    categoryId: 'fours',
    categoryName: 'Fours',
    brand: 'Whirlpool',
    description: 'Four encastrable multifonctions Whirlpool 73 litres 6th Sense. Système de cuisson Cook3 permettant de cuire jusqu\'à 3 plats différents simultanément sans transfert d\'odeurs. Nettoyage Pyrolyse.',
    stock: 8,
    guaranteeYears: 1,
    availability: 'En Stock',
    images: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80'
    ],
    specs: {
      'Volume': '73 Litres',
      'Technologie': '6th Sense Cook3',
      'Nettoyage': 'Pyrolyse auto-nettoyante',
      'Finish': 'Inox & Verre Noir'
    },
    isFeatured: false,
    createdAt: '2026-08-05'
  },
  {
    id: 'p-20',
    name: 'Matelas Dolidol Kinédorsal Bi-Comfort Orthopédique High Density 160x200cm',
    ref: 'MAT-DOL-KINEDORSAL-160',
    sku: 'EF-AM-020',
    price: 3490,
    originalPrice: 4200,
    promo: true,
    discountPercent: 17,
    categoryId: 'ameublement-literie',
    categoryName: 'Ameublement & Literie',
    brand: 'Dolidol',
    description: 'Matelas orthopédique Dolidol Kinédorsal Bi-Comfort médicalement recommandé pour le soutien de la colonne vertébrale. Mousse haute densité HR insensible aux déformations, coutil biologique hypoallergénique et face été/hiver.',
    stock: 12,
    guaranteeYears: 1,
    availability: 'En Stock',
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80'
    ],
    specs: {
      'Dimensions': '160 x 200 cm',
      'Épaisseur': '29 cm',
      'Mousse': 'Kinédorsal High Density Dolidol',
      'Soutien': 'Orthopédique Ferme Kinésithérapie',
      'Garantie': '1 an garanti'
    },
    isFeatured: true,
    createdAt: '2026-08-05'
  },
  {
    id: 'p-21',
    name: 'Matelas Dolidol Therapedic Supreme Mémoire de Forme 140x190cm',
    ref: 'MAT-DOL-THERAPEDIC-140',
    sku: 'EF-AM-021',
    price: 2790,
    originalPrice: 3300,
    promo: true,
    discountPercent: 15,
    categoryId: 'ameublement-literie',
    categoryName: 'Ameublement & Literie',
    brand: 'Dolidol',
    description: 'Matelas Dolidol Therapedic Supreme avec plaque de mousse visco-élastique à mémoire de forme. Soulage les points de pression, assure un alignement parfait de la nuque et du dos.',
    stock: 8,
    guaranteeYears: 1,
    availability: 'En Stock',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80'
    ],
    specs: {
      'Dimensions': '140 x 190 cm',
      'Épaisseur': '26 cm',
      'Accueil': 'Mémoire de Forme Visco',
      'Traitement': 'Anti-acariens & Anti-bactérien'
    },
    isFeatured: false,
    createdAt: '2026-08-05'
  },
  {
    id: 'p-22',
    name: 'Ensemble Lit Capitonné Dolidol Royal avec Sommier Coffre & Tête de Lit 160x200cm',
    ref: 'LIT-DOL-ROYAL-COFFRE',
    sku: 'EF-AM-022',
    price: 5490,
    originalPrice: 6500,
    promo: true,
    discountPercent: 15,
    categoryId: 'ameublement-literie',
    categoryName: 'Ameublement & Literie',
    brand: 'Dolidol',
    description: 'Superbe ensemble lit capitonné Dolidol Royal avec sommier coffre à vérins hydrauliques pour un rangement maximal sous le lit. Tête de lit majestueuse de 125cm revêtue de velours anti-taches haut de gamme.',
    stock: 5,
    guaranteeYears: 1,
    availability: 'En Stock',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80'
    ],
    specs: {
      'Dimensions': '160 x 200 cm',
      'Sommier': 'Coffre Hydraulique Sécurisé',
      'Revêtement': 'Velours Dolidol Premium Anti-taches',
      'Tête de lit': 'Capitonnée 125 cm inclus'
    },
    isFeatured: true,
    createdAt: '2026-08-05'
  },
  {
    id: 'p-23',
    name: 'Salon Marocain Moderne Dolidol Mousse HR Anti-Affaissement (3 Banquettes 2m)',
    ref: 'SAL-DOL-MODERNE-3B',
    sku: 'EF-AM-023',
    price: 7490,
    originalPrice: 8900,
    promo: true,
    discountPercent: 16,
    categoryId: 'ameublement-literie',
    categoryName: 'Ameublement & Literie',
    brand: 'Dolidol',
    description: 'Ensemble salon marocain contemporain équipé de mousses Dolidol Haute Résilience (HR35) guaranteed anti-affaissement. Comprend 3 banquettes de 2 mètres, structure bois cèdre et tissu Mobrara brodé.',
    stock: 4,
    guaranteeYears: 1,
    availability: 'En Stock',
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
      'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=800&q=80'
    ],
    specs: {
      'Composition': '3 Banquettes de 2m (Total 6m)',
      'Mousse': 'Dolidol HR35 Haute Résilience',
      'Bois': 'Cèdre Massif sculpté moderne',
      'Tissu': 'Mobrara Velours brodé déperlant'
    },
    isFeatured: true,
    createdAt: '2026-08-05'
  }
];

export const INITIAL_PACKS: Pack[] = [
  {
    id: 'pack-trio-salon',
    name: 'Pack Trio Équipement Spécial (Réfrigérateur + Télévision 4K + Micro-ondes)',
    type: 'Pack 3 produits',
    itemCount: 3,
    description: 'Le trio incontournable recommandé pour équiper votre foyer : Réfrigérateur Samsung NoFrost Side-by-Side 617L + Smart TV TCL 55" QLED 4K + Micro-ondes Moulinex Grill 28L. Économisez 3 580 DH.',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80',
    products: [INITIAL_PRODUCTS[0], INITIAL_PRODUCTS[2], INITIAL_PRODUCTS[10]],
    originalPrice: 17870,
    packPrice: 14290,
    savings: 3580,
    badge: 'Offre Star -20%'
  },
  {
    id: 'pack-duo-cuisine',
    name: 'Pack Duo Cuisine Essentielle (Réfrigérateur + Lave-linge)',
    type: 'Pack 2 produits',
    itemCount: 2,
    description: 'Combinaison gagnante : Réfrigérateur Samsung Side-by-Side 617L + Lave-linge LG Vivace 9kg AI DD. Économisez 2 500 DH sur vos deux appareils indispensables.',
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&q=80',
    products: [INITIAL_PRODUCTS[0], INITIAL_PRODUCTS[1]],
    originalPrice: 16980,
    packPrice: 14480,
    savings: 2500,
    badge: 'Pack Duo -15%'
  },
  {
    id: 'pack-mariage-luxe',
    name: 'Pack Grand Mariage & Nouveau Foyer (Réfrigérateur + Lave-linge + Smart TV + Lit Orthopédique)',
    type: 'Pack 4 produits',
    itemCount: 4,
    description: 'Le pack ultime complet pour les nouveaux mariés : Réfrigérateur 617L, Lave-linge 9kg, TV 55" QLED et Ensemble Lit & Matelas Orthopédique Royal 160x200cm.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
    products: [INITIAL_PRODUCTS[0], INITIAL_PRODUCTS[1], INITIAL_PRODUCTS[2], INITIAL_PRODUCTS[3]],
    originalPrice: 25660,
    packPrice: 19990,
    savings: 5670,
    badge: 'Super Pack Mariage -22%'
  },
  {
    id: 'pack-cuisson-encastrable',
    name: 'Pack Trio Cuisson Encastrable (Four Bosch + Plaque Franke + Micro-ondes Moulinex)',
    type: 'Pack 3 produits',
    itemCount: 3,
    description: 'Équipez votre cuisine sur mesure : Four encastrable Pyrolyse Bosch + Plaque 4 Feux Gaz verre trempé Franke + Micro-ondes Inox Moulinex.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80',
    products: [INITIAL_PRODUCTS[7], INITIAL_PRODUCTS[8], INITIAL_PRODUCTS[10]],
    originalPrice: 8670,
    packPrice: 7190,
    savings: 1480,
    badge: 'Pack Cuisine -17%'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'EF-2026-1001',
    customerName: 'Youssef El Amrani',
    customerEmail: 'youssef.amrani@gmail.com',
    customerPhone: '+212661234567',
    address: 'Quartier Al Wafaa, N°45',
    city: 'Taourirt',
    totalAmount: 11490,
    shippingFee: 0,
    paymentMethod: 'Paiement à la livraison',
    status: 'Livrée',
    createdAt: '2026-08-01T10:30:00Z',
    items: [
      {
        productId: 'p-1',
        productName: 'Réfrigérateur Samsung NoFrost Side-by-Side 617L SpaceMax',
        productRef: 'REF-SAM-617-NF',
        unitPrice: 11490,
        quantity: 1,
        totalPrice: 11490,
        image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=400&q=80'
      }
    ]
  },
  {
    id: 'ord-1002',
    orderNumber: 'EF-2026-1002',
    customerName: 'Fatima Zohra Bennani',
    customerEmail: 'fatima.bennani@outlook.com',
    customerPhone: '+212662987654',
    address: 'Boulevard Mohammed V, Résidence Jasmine',
    city: 'Oujda',
    totalAmount: 4790,
    shippingFee: 150,
    paymentMethod: 'Carte Bancaire',
    status: 'En cours d\'expédition',
    createdAt: '2026-08-04T14:15:00Z',
    items: [
      {
        productId: 'p-3',
        productName: 'Téléviseur TCL 55" QLED 4K Google TV 120Hz Gaming',
        productRef: 'TV-TCL-55-QLED',
        unitPrice: 4790,
        quantity: 1,
        totalPrice: 4790,
        image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&q=80'
      }
    ]
  }
];

