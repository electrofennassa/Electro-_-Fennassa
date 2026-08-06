export type CategoryId = 
  | 'refrigerateurs'
  | 'lave-linge'
  | 'climatiseurs'
  | 'congelateurs'
  | 'televiseurs'
  | 'fours'
  | 'plaques'
  | 'hottes'
  | 'aspirateurs'
  | 'petit-electromenager'
  | 'chauffe-eau'
  | 'accessoires'
  | 'ameublement-literie';

export interface Product {
  id: string;
  name: string;
  ref: string;
  sku: string;
  price: number;
  originalPrice?: number;
  promo: boolean;
  discountPercent?: number;
  categoryId: CategoryId;
  categoryName: string;
  brand: string;
  description: string;
  stock: number;
  guaranteeYears: number;
  availability: 'En Stock' | 'Sur Commande' | 'Rupture';
  images: string[];
  specs?: Record<string, string>;
  isFeatured?: boolean;
  createdAt: string;
}

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  iconName: string;
  image: string;
  productCount?: number;
}

export interface Brand {
  id: string;
  name: string;
  logo?: string;
}

export interface Pack {
  id: string;
  name: string;
  type: 'Pack 2 produits' | 'Pack 3 produits' | 'Pack 4 produits';
  itemCount: 2 | 3 | 4;
  description: string;
  image: string;
  products: Product[];
  originalPrice: number;
  packPrice: number;
  savings: number;
  badge?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productRef: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  image: string;
}

export type OrderStatus = 'En attente' | 'Confirmée' | 'En cours d\'expédition' | 'Livrée' | 'Annulée';

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  city: string;
  totalAmount: number;
  shippingFee: number;
  paymentMethod: 'Paiement à la livraison' | 'Carte Bancaire' | 'Virement Bancaire';
  status: OrderStatus;
  items: OrderItem[];
  createdAt: string;
  notes?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'customer';
  phone?: string;
  address?: string;
  city?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterState {
  search: string;
  categoryId: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  promoOnly: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest';
}

export interface StoreContact {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  city: string;
  country: string;
  googleMapsUrl: string;
  hours: string;
}

export interface AdminStats {
  totalSales: number;
  totalRevenue: number;
  ordersCount: number;
  productsCount: number;
  customersCount: number;
  lowStockCount: number;
  pendingOrdersCount: number;
}
