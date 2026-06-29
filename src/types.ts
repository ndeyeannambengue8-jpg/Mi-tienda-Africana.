export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'vestidos' | 'camisas' | 'faldas' | 'conjuntos' | 'personalizado' | 'playa' | 'zapatos';
  sizes: string[];
  colors: string[];
  rating: number;
  reviewsCount: number;
  tag?: string;
  isCustom?: boolean;
  customPrintUrl?: string;
  customPrompt?: string;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface GeneratedPrint {
  id: string;
  prompt: string;
  imageUrl: string;
  createdAt: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatarUrl?: string;
}

export interface FilterState {
  category: 'todos' | 'vestidos' | 'camisas' | 'faldas' | 'conjuntos' | 'personalizado' | 'playa' | 'zapatos';
  search: string;
  maxPrice: number;
  sortBy: 'popular' | 'price-asc' | 'price-desc' | 'rating';
}
