import { Product, Review } from './types';

export const HERO_IMAGE = '/src/assets/images/hero_african_summer_1782235857297.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'vestido-keisha',
    name: 'Vestido Keisha Maxi',
    description: 'Espectacular vestido largo con cuello descubierto e imponentes estampados Ankara tradicionales. Ligero, fresco y de algodón premium, en una deslumbrante combinación de rosa fucsia, negro profundo y blanco puro, ideal para eventos de verano.',
    price: 59.99,
    image: '/src/assets/images/vestido_keisha_1782235872465.jpg',
    category: 'vestidos',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Rosa Fucsia', 'Negro Obsidiana', 'Blanco Estelar'],
    rating: 4.9,
    reviewsCount: 24,
    tag: 'Más vendido'
  },
  {
    id: 'camisa-kenzo',
    name: 'Camisa Dashiki Kenzo',
    description: 'Camisa de corte moderno con diseño clásico Dashiki. Rediseñada con intrincados bordados tribales en negro ébano, acentos de rosa brillante y fondo blanco lino ultra fresco.',
    price: 35.99,
    image: '/src/assets/images/camisa_kenzo_1782235886308.jpg',
    category: 'camisas',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Negro Ébano', 'Rosa Pastel', 'Blanco Puro'],
    rating: 4.8,
    reviewsCount: 18,
    tag: 'Exclusivo'
  },
  {
    id: 'falda-kiara',
    name: 'Falda Kiara Wrap',
    description: 'Falda cruzada envolvente de talle alto con un vibrante patrón Kente en rosa magenta, negro carbón y blanco marfil. Su diseño ajustable con lazo lateral permite un ajuste perfecto y un movimiento fluido y elegante.',
    price: 29.99,
    image: '/src/assets/images/falda_kiara_1782235903739.jpg',
    category: 'faldas',
    sizes: ['S', 'M', 'L'],
    colors: ['Rosa Intenso', 'Negro Geométrico', 'Blanco Marfil'],
    rating: 4.7,
    reviewsCount: 15,
    tag: 'Tendencia'
  },
  {
    id: 'conjunto-nala',
    name: 'Conjunto Nala Dos Piezas',
    description: 'Chic crop top y pantalones holgados de pierna ancha a juego con un estampado geométrico de alto contraste en fucsia, negro y blanco. Una propuesta audaz para destacar con un aire sofisticado.',
    price: 79.99,
    image: 'https://picsum.photos/seed/nala-set/600/800',
    category: 'conjuntos',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Rosa & Negro Ankara', 'Blanco Minimalista'],
    rating: 4.9,
    reviewsCount: 31,
    tag: 'Colección Limitada'
  },
  {
    id: 'conjunto-zola',
    name: 'Shorts y Crop Top de Playa Zola',
    description: 'Atrevido y súper fresco conjunto playero de dos piezas con mini-shorts y crop top a juego con un deslumbrante patrón Ankara en rosa fucsia, negro ébano y blanco puro. Confeccionado en algodón de lino ultraligero y transpirable, perfecto para tus días de verano más cálidos y paseos soleados.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1595959183075-c1d0a1653de6?w=600&auto=format&fit=crop&q=80',
    category: 'playa',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Rosa Fucsia', 'Negro Ébano', 'Blanco Marfil'],
    rating: 4.8,
    reviewsCount: 12,
    tag: 'Corto y Fresco'
  },
  {
    id: 'bikini-binti',
    name: 'Bikini Ankara Corto Binti',
    description: 'Bikini de dos piezas premium con un llamativo y atrevido estampado geométrico Kente en rosa vibrante, negro obsidiana y blanco estelar. Presenta un top de corte halter ultra corto y braguitas de talle alto regulables, ideal para un bronceado veraniego perfecto.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=600&auto=format&fit=crop&q=80',
    category: 'playa',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Rosa Ankara', 'Negro Obsidiana'],
    rating: 4.9,
    reviewsCount: 22,
    tag: 'Bikini Corto'
  },
  {
    id: 'sandalias-amina',
    name: 'Chancletas de Playa Amina',
    description: 'Modernas y súper cómodas chancletas de playa con suela de goma ligera y tiras con un precioso estampado Ankara en rosa fucsia y negro ébano. Resistentes al agua, ideales para caminar sobre la arena templada o relajarte bajo la sombrilla.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1582966772680-860e372bb558?w=600&auto=format&fit=crop&q=80',
    category: 'zapatos',
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: ['Rosa Fucsia', 'Negro Ébano'],
    rating: 4.8,
    reviewsCount: 18,
    tag: 'Playeras'
  },
  {
    id: 'alpargatas-lulu',
    name: 'Chanclas de Dedo Lulu',
    description: 'Atrevidas chanclas tipo slides de playa antideslizantes de color rosa brillante con detalles Kente de alto contraste en negro ébano y blanco marfil. Súper fáciles de poner y quitar, ideales para tus días de piscina y playa.',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&auto=format&fit=crop&q=80',
    category: 'zapatos',
    sizes: ['36', '37', '38', '39', '40'],
    colors: ['Rosa Imperial', 'Negro Carbón', 'Blanco Marfil'],
    rating: 4.9,
    reviewsCount: 22,
    tag: 'Antideslizantes'
  },
  {
    id: 'vestido-corto-yara',
    name: 'Vestido Ankara Corto Yara',
    description: 'Vestido corto y fresco de verano con cuello halter, escote en la espalda y falda mini con volantes fluidos. Confeccionado en algodón premium Ankara de colores rosa fucsia, negro profundo y blanco marfil, ideal para destacar en tus paseos soleados.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1611042553975-08733608b2db?w=600&auto=format&fit=crop&q=80',
    category: 'vestidos',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Rosa Fucsia', 'Negro Obsidiana', 'Blanco Marfil'],
    rating: 4.8,
    reviewsCount: 16,
    tag: 'Estilo Corto'
  },
  {
    id: 'minifalda-layla',
    name: 'Minifalda Tribal Layla',
    description: 'Atrevida minifalda de talle alto con un precioso ajuste ceñido y cremallera trasera. Luce un dinámico estampado geométrico Kente en tonos fucsia, carbón y blanco marfil. Perfecta para un look nocturno o de playa.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&auto=format&fit=crop&q=80',
    category: 'faldas',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Fucsia Imperial', 'Carbón', 'Marfil'],
    rating: 4.6,
    reviewsCount: 11,
    tag: 'Nueva Tendencia'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    userName: 'Amara Diop',
    rating: 5,
    comment: '¡La calidad del vestido Keisha en rosa y negro es espectacular! Los colores son súper brillantes, idénticos a las fotos. He recibido innumerables elogios cada vez que lo uso.',
    date: '15 de Junio, 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'rev-2',
    userName: 'Carlos Santana',
    rating: 5,
    comment: 'La camisa Kenzo blanca y negra con toques rosas es increíblemente fresca para el verano de Madrid. El diseño Dashiki tiene un nivel de detalle hermoso. Envío súper rápido.',
    date: '10 de Junio, 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'rev-3',
    userName: 'Elena Ruiz',
    rating: 4,
    comment: 'Preciosa falda Kiara, tiene una caída bellísima. El sistema de wrap se ajusta muy bien. El tejido en rosa magenta y negro es resistente y de alta calidad.',
    date: '02 de Junio, 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  }
];

export const PRESET_PATTERNS = [
  {
    id: 'pat-1',
    name: 'Ankara Rosa Imperial',
    prompt: 'Vibrant circular hot pink and magenta sunburst patterns with deep black spirals and white tribal dots, traditional West African wax print design, high contrast.',
    color: '#ec4899'
  },
  {
    id: 'pat-2',
    name: 'Kente Negro y Blanco',
    prompt: 'Traditional Ghanaian Kente cloth weave pattern, parallel bands of stark black and pure white geometric structures, very elegant high-end fashion design.',
    color: '#000000'
  },
  {
    id: 'pat-3',
    name: 'Fucsia y Ébano',
    prompt: 'Waves of electric fuchsia pink and stark black organic leaf swirls and white background, African tribal batik print texture, fresh beach luxury aesthetics.',
    color: '#db2777'
  },
  {
    id: 'pat-4',
    name: 'Cebra Rosa Étnica',
    prompt: 'Modern high-fashion abstract zebra patterns with pink, charcoal black, and white tribal geometries, seamless elegant canvas pattern.',
    color: '#f43f5e'
  }
];
