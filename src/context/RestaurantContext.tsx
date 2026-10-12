import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  Category,
  CategoryId,
  CustomerInfo,
  DemoOrder,
  DietaryBadge,
  Dish,
  ExtraOption,
  OrderMode,
  Promotion,
  RestaurantConfig,
  SelectedVariant,
  CartItem,
} from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_DISHES,
  INITIAL_PROMOTIONS,
  INITIAL_RESTAURANT_CONFIG,
} from '../data/initialMenu';
import { getSafeDishImage } from '../utils/imageRegistry';

interface RestaurantContextType {
  dishes: Dish[];
  categories: Category[];
  promotions: Promotion[];
  restaurantConfig: RestaurantConfig;
  cart: CartItem[];
  activeCategory: CategoryId | 'all';
  setActiveCategory: (cat: CategoryId | 'all') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  dietaryFilter: DietaryBadge | 'all';
  setDietaryFilter: (filter: DietaryBadge | 'all') => void;
  orderMode: OrderMode;
  setOrderMode: (mode: OrderMode) => void;
  customerInfo: CustomerInfo;
  setCustomerInfo: React.Dispatch<React.SetStateAction<CustomerInfo>>;
  selectedDishForDetail: Dish | null;
  setSelectedDishForDetail: (dish: Dish | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isInfoOpen: boolean;
  setIsInfoOpen: (open: boolean) => void;
  activeDemoOrder: DemoOrder | null;
  setActiveDemoOrder: (order: DemoOrder | null) => void;
  demoOrders: DemoOrder[];
  isTrackingModalOpen: boolean;
  setIsTrackingModalOpen: (open: boolean) => void;

  // Cart operations
  addToCart: (
    dish: Dish,
    quantity: number,
    selectedVariants: SelectedVariant[],
    selectedExtras: ExtraOption[],
    specialInstructions?: string
  ) => void;
  updateCartQuantity: (cartItemId: string, newQty: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  deliveryFee: number;
  cartTotal: number;
  cartTotalCount: number;

  // Ordering flows
  generateWhatsAppMessage: () => string;
  sendWhatsAppOrder: () => void;
  submitDemoInternalOrder: () => DemoOrder;

  // Admin operations
  addDish: (dish: Omit<Dish, 'id'>) => void;
  updateDish: (dish: Dish) => void;
  deleteDish: (id: string) => void;
  toggleDishAvailability: (id: string) => void;
  updateRestaurantConfig: (config: RestaurantConfig) => void;
  savePromotion: (promotion: Promotion) => void;
  deletePromotion: (id: string) => void;
  resetToDefaultData: () => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

const STORAGE_KEYS = {
  DISHES: 'brasa_mar_dishes_v2',
  PROMOTIONS: 'brasa_mar_promos_v2',
  CONFIG: 'brasa_mar_config_v2',
  CART: 'brasa_mar_cart_v2',
  DEMO_ORDERS: 'brasa_mar_demo_orders_v2',
};

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Dishes state with persistence and guaranteed image integrity
  const [dishes, setDishes] = useState<Dish[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.DISHES);
      if (stored) {
        const parsed: Dish[] = JSON.parse(stored);
        return parsed.map((d) => ({
          ...d,
          image: getSafeDishImage(d.id, d.image, d.categoryId),
        }));
      }
      return INITIAL_DISHES;
    } catch {
      return INITIAL_DISHES;
    }
  });

  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);

  // Promotions state
  const [promotions, setPromotions] = useState<Promotion[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROMOTIONS);
      return stored ? JSON.parse(stored) : INITIAL_PROMOTIONS;
    } catch {
      return INITIAL_PROMOTIONS;
    }
  });

  // Restaurant config state
  const [restaurantConfig, setRestaurantConfig] = useState<RestaurantConfig>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CONFIG);
      return stored ? JSON.parse(stored) : INITIAL_RESTAURANT_CONFIG;
    } catch {
      return INITIAL_RESTAURANT_CONFIG;
    }
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CART);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Demo orders
  const [demoOrders, setDemoOrders] = useState<DemoOrder[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.DEMO_ORDERS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietaryFilter, setDietaryFilter] = useState<DietaryBadge | 'all'>('all');
  const [orderMode, setOrderMode] = useState<OrderMode>('dine-in');

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    tableOrRoom: 'Mesa 4',
    deliveryAddress: '',
    deliveryNotes: '',
  });

  const [selectedDishForDetail, setSelectedDishForDetail] = useState<Dish | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
  const [activeDemoOrder, setActiveDemoOrder] = useState<DemoOrder | null>(null);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState<boolean>(false);

  // Persist state updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DISHES, JSON.stringify(dishes));
    } catch {
      // storage unavailable
    }
  }, [dishes]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROMOTIONS, JSON.stringify(promotions));
    } catch {
      // storage unavailable
    }
  }, [promotions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(restaurantConfig));
    } catch {
      // storage unavailable
    }
  }, [restaurantConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch {
      // storage unavailable
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DEMO_ORDERS, JSON.stringify(demoOrders));
    } catch {
      // storage unavailable
    }
  }, [demoOrders]);

  // Cart calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const deliveryFee = orderMode === 'delivery' ? restaurantConfig.deliveryFee : 0;
  const cartTotal = cartSubtotal + deliveryFee;
  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const addToCart = (
    dish: Dish,
    quantity: number,
    selectedVariants: SelectedVariant[],
    selectedExtras: ExtraOption[],
    specialInstructions?: string
  ) => {
    const variantsPrice = selectedVariants.reduce((sum, v) => sum + v.priceModifier, 0);
    const extrasPrice = selectedExtras.reduce((sum, e) => sum + e.price, 0);
    const unitPrice = dish.price + variantsPrice + extrasPrice;
    const totalPrice = unitPrice * quantity;

    // Create unique key based on dish, variants and extras to group identical customizations
    const variantKey = selectedVariants.map((v) => `${v.groupId}:${v.optionId}`).sort().join('|');
    const extraKey = selectedExtras.map((e) => e.id).sort().join('|');
    const notesKey = (specialInstructions || '').trim().toLowerCase();
    const itemFingerprint = `${dish.id}_${variantKey}_${extraKey}_${notesKey}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartItemId === itemFingerprint);
      if (existingIndex > -1) {
        const updated = [...prev];
        const existing = updated[existingIndex];
        const newQty = existing.quantity + quantity;
        updated[existingIndex] = {
          ...existing,
          quantity: newQty,
          totalPrice: existing.unitPrice * newQty,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          cartItemId: itemFingerprint,
          dishId: dish.id,
          name: dish.name,
          basePrice: dish.price,
          quantity,
          selectedVariants,
          selectedExtras,
          unitPrice,
          totalPrice,
          specialInstructions: specialInstructions?.trim() || undefined,
          image: dish.image,
        };
        return [...prev, newItem];
      }
    });

    setIsCartOpen(true);
  };

  const updateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: newQty, totalPrice: item.unitPrice * newQty }
          : item
      )
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // WhatsApp Message builder
  const generateWhatsAppMessage = (): string => {
    const modeLabel =
      orderMode === 'dine-in'
        ? `Consumo en Salón (${customerInfo.tableOrRoom || 'Mesa no especificada'})`
        : orderMode === 'takeout'
        ? 'Retiro en Local'
        : `Entrega a Domicilio (Dirección: ${customerInfo.deliveryAddress || 'Pendiente'})`;

    let msg = `*BRASA & MAR — PEDIDO DIGITAL*\n`;
    msg += `------------------------------------\n`;
    msg += `*Cliente:* ${customerInfo.name || 'Cliente'}\n`;
    msg += `*Contacto:* ${customerInfo.phone || 'No especificado'}\n`;
    msg += `*Modalidad:* ${modeLabel}\n`;
    if (orderMode === 'delivery' && customerInfo.deliveryNotes) {
      msg += `*Ref. Envío:* ${customerInfo.deliveryNotes}\n`;
    }
    msg += `------------------------------------\n`;
    msg += `*DETALLE DE PLATOS:*\n\n`;

    cart.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.quantity}x ${item.name}* — $${item.totalPrice.toFixed(2)}\n`;
      if (item.selectedVariants.length > 0) {
        item.selectedVariants.forEach((v) => {
          msg += `   • ${v.groupTitle}: ${v.optionName}${v.priceModifier > 0 ? ` (+$${v.priceModifier.toFixed(2)})` : ''}\n`;
        });
      }
      if (item.selectedExtras.length > 0) {
        item.selectedExtras.forEach((e) => {
          msg += `   • Extra: ${e.name} (+$${e.price.toFixed(2)})\n`;
        });
      }
      if (item.specialInstructions) {
        msg += `   • Nota cocina: _${item.specialInstructions}_\n`;
      }
      msg += `\n`;
    });

    msg += `------------------------------------\n`;
    msg += `*Subtotal:* $${cartSubtotal.toFixed(2)}\n`;
    if (orderMode === 'delivery') {
      msg += `*Costo de entrega:* $${deliveryFee.toFixed(2)}\n`;
    }
    msg += `*TOTAL ESTIMADO:* $${cartTotal.toFixed(2)}\n`;
    msg += `------------------------------------\n`;
    msg += `_Enviado desde el Menú Digital BRASA & MAR._`;

    return msg;
  };

  const sendWhatsAppOrder = () => {
    const message = generateWhatsAppMessage();
    const encoded = encodeURIComponent(message);
    const cleanNumber = restaurantConfig.whatsappNumber.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const submitDemoInternalOrder = (): DemoOrder => {
    const code = `#BM-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: DemoOrder = {
      id: `order-${Date.now()}`,
      code,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mode: orderMode,
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryFee,
      total: cartTotal,
      customerInfo: { ...customerInfo },
      status: 'received',
    };

    setDemoOrders((prev) => [newOrder, ...prev]);
    setActiveDemoOrder(newOrder);
    setIsCartOpen(false);
    setIsTrackingModalOpen(true);
    clearCart();
    return newOrder;
  };

  // Admin operations
  const addDish = (dishData: Omit<Dish, 'id'>) => {
    const newDish: Dish = {
      ...dishData,
      id: `dish-${Date.now()}`,
    };
    setDishes((prev) => [newDish, ...prev]);
  };

  const updateDish = (updatedDish: Dish) => {
    setDishes((prev) => prev.map((d) => (d.id === updatedDish.id ? updatedDish : d)));
  };

  const deleteDish = (id: string) => {
    setDishes((prev) => prev.filter((d) => d.id !== id));
  };

  const toggleDishAvailability = (id: string) => {
    setDishes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, available: !d.available } : d))
    );
  };

  const updateRestaurantConfig = (newConfig: RestaurantConfig) => {
    setRestaurantConfig(newConfig);
  };

  const savePromotion = (promotion: Promotion) => {
    setPromotions((prev) => {
      const idx = prev.findIndex((p) => p.id === promotion.id);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = promotion;
        return copy;
      }
      return [promotion, ...prev];
    });
  };

  const deletePromotion = (id: string) => {
    setPromotions((prev) => prev.filter((p) => p.id !== id));
  };

  const resetToDefaultData = () => {
    localStorage.removeItem(STORAGE_KEYS.DISHES);
    localStorage.removeItem(STORAGE_KEYS.PROMOTIONS);
    localStorage.removeItem(STORAGE_KEYS.CONFIG);
    setDishes(INITIAL_DISHES);
    setPromotions(INITIAL_PROMOTIONS);
    setRestaurantConfig(INITIAL_RESTAURANT_CONFIG);
  };

  return (
    <RestaurantContext.Provider
      value={{
        dishes,
        categories,
        promotions,
        restaurantConfig,
        cart,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        dietaryFilter,
        setDietaryFilter,
        orderMode,
        setOrderMode,
        customerInfo,
        setCustomerInfo,
        selectedDishForDetail,
        setSelectedDishForDetail,
        isCartOpen,
        setIsCartOpen,
        isAdminOpen,
        setIsAdminOpen,
        isInfoOpen,
        setIsInfoOpen,
        activeDemoOrder,
        setActiveDemoOrder,
        demoOrders,
        isTrackingModalOpen,
        setIsTrackingModalOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        deliveryFee,
        cartTotal,
        cartTotalCount,
        generateWhatsAppMessage,
        sendWhatsAppOrder,
        submitDemoInternalOrder,
        addDish,
        updateDish,
        deleteDish,
        toggleDishAvailability,
        updateRestaurantConfig,
        savePromotion,
        deletePromotion,
        resetToDefaultData,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = (): RestaurantContextType => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
