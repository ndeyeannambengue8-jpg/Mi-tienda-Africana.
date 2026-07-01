import { Product, Review } from './types';

export const HERO_IMAGE = '/assets/images/hero_african_summer_1782235857297.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'conjunto-nala',
    name: 'Conjunto Nala Dos Piezas',
    description: 'Chic crop top y pantalones holgados de pierna ancha a juego con un estampado geométrico de alto contraste en fucsia, negro y blanco. Una propuesta audaz para destacar con un aire sofisticado.',
    price: 79.99,
    image: '/assets/images/conjunto_nala_1782752006347.jpg',
    category: 'conjuntos',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Rosa & Negro Ankara', 'Blanco Minimalista'],
    rating: 4.9,
    reviewsCount: 31,
    tag: 'Colección Limitada'
  },
  {
    id: 'camisa-kenzo',
    name: 'Camisa de Verano Kenzo',
    description: 'Fresca camisa de manga corta estilo Dashiki con un refinado patrón en blanco y negro con sutiles toques de rosa fucsia. Una prenda sumamente ligera, transpirable y cómoda para los días calurosos de verano.',
    price: 45.99,
    image: '/assets/images/camisa_verano_kenzo_1782920122569.jpg',
    category: 'camisas',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Blanco & Negro Dashiki', 'Rosa Fucsia'],
    rating: 4.9,
    reviewsCount: 17,
    tag: 'Colección Verano'
  },
  {
    id: 'falda-kiara',
    name: 'Falda Wrap Kiara',
    description: 'Hermosa falda tipo wrap de caída fluida con un precioso ajuste regulable en la cintura. Exhibe un dinámico diseño tradicional en tonos rosa magenta, blanco y negro profundo, ideal para combinar con tus crop tops de verano.',
    price: 34.99,
    image: '/assets/images/falda_kiara_1782235903739.jpg',
    category: 'faldas',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Rosa Magenta', 'Negro Obsidiana'],
    rating: 4.7,
    reviewsCount: 15,
    tag: 'Vuelo Elegante'
  },
  {
    id: 'vestido-keisha',
    name: 'Vestido Keisha Maxi',
    description: 'Espectacular vestido largo con cuello descubierto e imponentes estampados Ankara tradicionales. Ligero, fresco y de algodón premium, en una deslumbrante combinación de rosa fucsia, negro profundo y blanco puro, ideal para eventos de verano.',
    price: 59.99,
    image: '/assets/images/vestido_keisha_1782235872465.jpg',
    category: 'vestidos',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Rosa Fucsia', 'Negro Obsidiana', 'Blanco Estelar'],
    rating: 4.9,
    reviewsCount: 24,
    tag: 'Más vendido'
  },
  {
    id: 'vestido-kemi',
    name: 'Vestido Kemi Royal Maxi',
    description: 'Elegante vestido largo de tirantes finos con un espectacular estampado Ankara circular en tonos naranja vibrante, amarillo mostaza y blanco sobre un fondo azul real profundo. Una prenda majestuosa y fluida que irradia sofisticación y frescura.',
    price: 64.99,
    image: '/assets/images/vestido_kemi_blue_orange_1782752232676.jpg',
    category: 'vestidos',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Azul Real & Naranja', 'Azul Imperial'],
    rating: 4.9,
    reviewsCount: 28,
    tag: 'Nuevo'
  },
  {
    id: 'vestido-amani',
    name: 'Vestido Amani Turquesa Maxi',
    description: 'Espectacular vestido largo de tirantes finos con un vibrante estampado Ankara circular en tonos rojo carmesí sobre un fondo turquesa brillante. Una prenda fluida y majestuosa perfecta para tus eventos más distinguidos.',
    price: 69.99,
    image: '/assets/images/vestido_kemi_turquoise_red_1782752384259.jpg',
    category: 'vestidos',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Turquesa & Rojo', 'Rojo Ankara'],
    rating: 4.8,
    reviewsCount: 19,
    tag: 'Nueva Colección'
  },
  {
    id: 'conjunto-zola',
    name: 'Shorts y Crop Top de Playa Zola',
    description: 'Atrevido y súper fresco conjunto playero de dos piezas con mini-shorts y crop top a juego con un deslumbrante patrón Ankara en rosa fucsia, negro ébano y blanco puro. Confeccionado en algodón de lino ultraligero y transpirable, perfecto para tus días de verano más cálidos y paseos soleados.',
    price: 34.99,
    image: '/assets/images/conjunto_playa_zola_1782918558774.jpg',
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
    image: '/assets/images/bikini_binti_pink_black_1782918351767.jpg',
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
    image: '/assets/images/sandalias_amina_1782919481860.jpg',
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
    image: '/assets/images/slides_lulu_1782919495035.jpg',
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
    image: '/assets/images/vestido_yara_fuchsia_black_1782918971457.jpg',
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
    image: '/assets/images/minifalda_layla_fuchsia_charcoal_1782918987016.jpg',
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
