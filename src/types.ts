export type CategoryId =
  | 'entradas'
  | 'ceviches-mariscos'
  | 'platos-principales'
  | 'carnes'
  | 'hamburguesas'
  | 'acompanamientos'
  | 'bebidas'
  | 'postres'
  | 'promociones';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
}

export interface VariantOption {
  id: string;
  name: string;
  priceModifier: number;
}

export interface VariantGroup {
  id: string;
  title: string;
  required: boolean;
  options: VariantOption[];
}

export interface ExtraOption {
  id: string;
  name: string;
  price: number;
}

export type DietaryBadge = 'gluten-free' | 'seafood' | 'meat' | 'vegetarian' | 'spicy';

export interface Dish {
  id: string;
  categoryId: CategoryId;
  name: string;
  price: number;
  description: string;
  image: string;
  ingredients: string[];
  allergens?: string[];
  dietary?: DietaryBadge[];
  isPopular?: boolean;
  isNew?: boolean;
  isSpecialty?: boolean;
  available: boolean;
  variants?: VariantGroup[];
  extras?: ExtraOption[];
}

export interface SelectedVariant {
  groupId: string;
  groupTitle: string;
  optionId: string;
  optionName: string;
  priceModifier: number;
}

export interface CartItem {
  cartItemId: string;
  dishId: string;
  name: string;
  basePrice: number;
  quantity: number;
  selectedVariants: SelectedVariant[];
  selectedExtras: ExtraOption[];
  unitPrice: number;
  totalPrice: number;
  specialInstructions?: string;
  image: string;
}

export type OrderMode = 'dine-in' | 'takeout' | 'delivery';

export interface CustomerInfo {
  name: string;
  phone: string;
  tableOrRoom?: string;
  deliveryAddress?: string;
  deliveryNotes?: string;
  estimatedTime?: string;
}

export interface RestaurantConfig {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  whatsappNumber: string;
  address: string;
  mapsUrl: string;
  hours: string;
  deliveryFee: number;
  currencySymbol: string;
  instagram: string;
  facebook: string;
}

export interface Promotion {
  id: string;
  title: string;
  subtitle: string;
  discountBadge: string;
  image: string;
  priceBefore?: number;
  priceNow?: number;
  terms: string;
  active: boolean;
}

export interface DemoOrder {
  id: string;
  code: string;
  timestamp: string;
  mode: OrderMode;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customerInfo: CustomerInfo;
  status: 'received' | 'preparing' | 'ready' | 'completed';
}
