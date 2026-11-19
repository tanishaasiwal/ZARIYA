import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {CartItem, Product} from '../types';
import {getProductById, PRODUCTS} from '../data/catalog';

interface ToastState {
  id: number;
  message: string;
  actionLabel?: string;
  actionHref?: string;
}

interface StoreContextValue {
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: string[];
  cartCount: number;
  cartSubtotal: number;
  isBagOpen: boolean;
  isSearchOpen: boolean;
  quickViewProduct: Product | null;
  toast: ToastState | null;
  newsletterSubscribed: string | null;
  setIsBagOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setQuickViewProduct: (product: Product | null) => void;
  addToCart: (
    productId: string,
    quantity?: number,
    blouseOption?: CartItem['blouseOption'],
    openDrawer?: boolean
  ) => void;
  updateCartQuantity: (productId: string, blouseOption: CartItem['blouseOption'], quantity: number) => void;
  removeFromCart: (productId: string, blouseOption: CartItem['blouseOption']) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  recordRecentlyViewed: (productId: string) => void;
  subscribeNewsletter: (email: string) => void;
  dismissToast: () => void;
  homeResetKey: number;
  resetHomeView: () => void;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

const STORAGE_KEYS = {
  cart: 'zariya_cart_v1',
  wishlist: 'zariya_wishlist_v1',
  recent: 'zariya_recent_v1',
  newsletter: 'zariya_newsletter_v1',
};

function readJsonStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function StoreProvider({children}: {children: React.ReactNode}) {
  const [cart, setCart] = useState<CartItem[]>(() =>
    readJsonStorage<CartItem[]>(STORAGE_KEYS.cart, [
      {
        productId: 'zar-001',
        quantity: 1,
        blouseOption: 'Unstitched Blouse Included',
      },
    ])
  );
  const [wishlist, setWishlist] = useState<string[]>(() =>
    readJsonStorage<string[]>(STORAGE_KEYS.wishlist, ['zar-002', 'zar-004'])
  );
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() =>
    readJsonStorage<string[]>(STORAGE_KEYS.recent, ['zar-003', 'zar-006', 'zar-001'])
  );
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<string | null>(() =>
    readJsonStorage<string | null>(STORAGE_KEYS.newsletter, null)
  );

  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [homeResetKey, setHomeResetKey] = useState(0);

  const resetHomeView = () => {
    setIsBagOpen(false);
    setIsSearchOpen(false);
    setQuickViewProduct(null);
    setHomeResetKey((k) => k + 1);
    window.requestAnimationFrame(() => {
      window.scrollTo({top: 0, behavior: 'smooth'});
    });
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
    } catch {
      // Ignore storage quota errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(wishlist));
    } catch {
      // Ignore storage quota errors
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.recent, JSON.stringify(recentlyViewed));
    } catch {
      // Ignore storage quota errors
    }
  }, [recentlyViewed]);

  useEffect(() => {
    try {
      if (newsletterSubscribed) {
        localStorage.setItem(STORAGE_KEYS.newsletter, JSON.stringify(newsletterSubscribed));
      }
    } catch {
      // Ignore storage quota errors
    }
  }, [newsletterSubscribed]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const showToast = (message: string, actionLabel?: string, actionHref?: string) => {
    setToast({id: Date.now(), message, actionLabel, actionHref});
  };

  const addToCart = (
    productId: string,
    quantity = 1,
    blouseOption: CartItem['blouseOption'] = 'Unstitched Blouse Included',
    openDrawer = true
  ) => {
    const product = getProductById(productId) || PRODUCTS[0];
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === productId && item.blouseOption === blouseOption
      );
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Math.min(10, updated[existingIndex].quantity + quantity),
        };
        return updated;
      }
      return [...prev, {productId, quantity, blouseOption}];
    });
    if (openDrawer) {
      setIsBagOpen(true);
    } else {
      showToast(`${product.name} added to your bag`, 'View Bag', '/bag');
    }
  };

  const updateCartQuantity = (
    productId: string,
    blouseOption: CartItem['blouseOption'],
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, blouseOption);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId && item.blouseOption === blouseOption
          ? {...item, quantity: Math.min(10, quantity)}
          : item
      )
    );
  };

  const removeFromCart = (productId: string, blouseOption: CartItem['blouseOption']) => {
    setCart((prev) =>
      prev.filter((item) => !(item.productId === productId && item.blouseOption === blouseOption))
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    const product = getProductById(productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter((id) => id !== productId) : [productId, ...prev];
      if (product) {
        showToast(
          exists ? `Removed ${product.name} from wishlist` : `Saved ${product.name} to wishlist`,
          exists ? undefined : 'View Wishlist',
          exists ? undefined : '/wishlist'
        );
      }
      return next;
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const recordRecentlyViewed = (productId: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 6);
    });
  };

  const subscribeNewsletter = (email: string) => {
    setNewsletterSubscribed(email);
    showToast('Welcome to the ZARIYA Atelier Circle.');
  };

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const cartSubtotal = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const product = getProductById(item.productId);
        return sum + (product ? product.priceINR * item.quantity : 0);
      }, 0),
    [cart]
  );

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        recentlyViewed,
        cartCount,
        cartSubtotal,
        isBagOpen,
        isSearchOpen,
        quickViewProduct,
        toast,
        newsletterSubscribed,
        setIsBagOpen,
        setIsSearchOpen,
        setQuickViewProduct,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isWishlisted,
        recordRecentlyViewed,
        subscribeNewsletter,
        dismissToast,
        homeResetKey,
        resetHomeView,
      }}
    >
      {children}
    </StoreContext.Provider>
  );

  function dismissToast() {
    setToast(null);
  }
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}
