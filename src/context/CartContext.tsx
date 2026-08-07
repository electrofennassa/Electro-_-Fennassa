import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product, CartItem, Order, OrderStatus, Pack, StoreContact, Category } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_CONTACT, INITIAL_PACKS, INITIAL_CATEGORIES } from '../data/initialData';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  addPackToCart: (pack: Pack) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  totalAmount: number;
  subtotalAmount: number;
  itemCount: number;
  promoDiscount: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  // Orders State
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  // Dynamic Products List for Admin CRUD & Shop reactivity
  products: Product[];
  addProduct: (p: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  // Dynamic Packs List for Admin CRUD
  packs: Pack[];
  addPack: (p: Omit<Pack, 'id'>) => void;
  updatePack: (p: Pack) => void;
  deletePack: (id: string) => void;
  // Dynamic Categories List for Admin CRUD & Image customization
  categories: Category[];
  addCategory: (c: Omit<Category, 'id'> & { id?: string }) => void;
  updateCategory: (c: Category) => void;
  deleteCategory: (id: string) => void;
  // Store Contact Management
  storeContact: StoreContact;
  updateStoreContact: (newContact: StoreContact) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('ef_products_v4');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const existingIds = new Set(parsed.map((p: Product) => p.id));
        const missing = INITIAL_PRODUCTS.filter(p => !existingIds.has(p.id));
        if (missing.length > 0) {
          return [...parsed, ...missing];
        }
        return parsed;
      } catch (e) {
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  });

  const [packs, setPacks] = useState<Pack[]>(() => {
    const saved = localStorage.getItem('ef_packs');
    return saved ? JSON.parse(saved) : INITIAL_PACKS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('ef_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [storeContact, setStoreContact] = useState<StoreContact>(() => {
    const saved = localStorage.getItem('ef_store_contact_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.phone && parsed.phone.includes('665-657310')) {
          return parsed;
        }
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_CONTACT;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('ef_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('ef_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('ef_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponPercent, setCouponPercent] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem('ef_products_v4', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('ef_packs', JSON.stringify(packs));
  }, [packs]);

  useEffect(() => {
    localStorage.setItem('ef_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ef_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('ef_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('ef_store_contact_v2', JSON.stringify(storeContact));
  }, [storeContact]);

  useEffect(() => {
    localStorage.setItem('ef_categories', JSON.stringify(categories));
  }, [categories]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity }];
      }
    });
  };

  const addPackToCart = (pack: Pack) => {
    pack.products.forEach(product => {
      addToCart(product, 1);
    });
  };

  const updateStoreContact = (newContact: StoreContact) => {
    setStoreContact(newContact);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setCouponPercent(0);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(p => p.id === productId);
  };

  const subtotalAmount = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const promoDiscount = (subtotalAmount * couponPercent) / 100;
  const totalAmount = Math.max(0, subtotalAmount - promoDiscount);
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const applyCoupon = (code: string) => {
    const formattedCode = code.trim().toUpperCase();
    if (formattedCode === 'FENNASSA10' || formattedCode === 'TAOURIRT10') {
      setAppliedCoupon(formattedCode);
      setCouponPercent(10);
      return { success: true, message: 'Code promo appliqué (-10%).' };
    }
    if (formattedCode === 'MARIAGE15') {
      setAppliedCoupon(formattedCode);
      setCouponPercent(15);
      return { success: true, message: 'Code promo mariage appliqué (-15%).' };
    }
    return { success: false, message: 'Code promo non valide.' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponPercent(0);
  };

  // Order Management
  const createOrder = async (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>): Promise<Order> => {
    const newOrderNumber = `EF-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: newOrderNumber,
      status: 'En attente',
      createdAt: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(ord => (ord.id === orderId ? { ...ord, status } : ord))
    );
  };

  // Product CRUD for Admin
  const addProduct = (p: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...p,
      id: `p-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Pack CRUD for Admin
  const addPack = (p: Omit<Pack, 'id'>) => {
    const newPack: Pack = {
      ...p,
      id: `pack-${Date.now()}`
    };
    setPacks(prev => [newPack, ...prev]);
  };

  const updatePack = (updated: Pack) => {
    setPacks(prev => prev.map(pk => (pk.id === updated.id ? updated : pk)));
  };

  const deletePack = (id: string) => {
    setPacks(prev => prev.filter(pk => pk.id !== id));
  };

  const addCategory = (c: Omit<Category, 'id'> & { id?: string }) => {
    const generatedId = c.id && c.id.trim() 
      ? c.id.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      : c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `cat-${Date.now()}`;
    const newCategory: Category = {
      ...c,
      id: generatedId,
      productCount: c.productCount || 0
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (updated: Category) => {
    setCategories(prev => prev.map(cat => (cat.id === updated.id ? updated : cat)));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        addPackToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        totalAmount,
        subtotalAmount,
        itemCount,
        promoDiscount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        orders,
        createOrder,
        updateOrderStatus,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        packs,
        addPack,
        updatePack,
        deletePack,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        storeContact,
        updateStoreContact
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
