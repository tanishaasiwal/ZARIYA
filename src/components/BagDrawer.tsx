import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
import {ArrowRight, Minus, Plus, ShoppingBag, Trash2, X} from 'lucide-react';
import {useStore} from '../context/StoreContext';
import {formatINR, getProductById} from '../data/catalog';
import {SafeImage} from './SafeImage';

export function BagDrawer() {
  const {
    cart,
    cartSubtotal,
    cartCount,
    isBagOpen,
    setIsBagOpen,
    updateCartQuantity,
    removeFromCart,
  } = useStore();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!isBagOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsBagOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isBagOpen, setIsBagOpen]);

  return (
    <AnimatePresence>
      {isBagOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Shopping Bag"
        >
          <motion.div
            initial={prefersReduced ? false : {opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={() => setIsBagOpen(false)}
            className="fixed inset-0 bg-[#0C2B27]/55 backdrop-blur-xs"
          />

          <motion.aside
            initial={prefersReduced ? false : {x: '100%'}}
            animate={{x: 0}}
            exit={{x: '100%'}}
            transition={{duration: 0.3, ease: [0.16, 1, 0.3, 1]}}
            className="relative z-10 flex h-full w-full max-w-md flex-col bg-[#F5F3EC] border-l border-[#C3A66B]/30 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#303431]/12 px-6 py-5">
              <div>
                <h2 className="font-display text-2xl font-medium text-[#123F3A]">
                  Your Shopping Bag
                </h2>
                <p className="text-xs text-[#303431]/65 tabular-nums">
                  {cartCount} {cartCount === 1 ? 'heirloom saree' : 'heirloom sarees'} selected
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsBagOpen(false)}
                aria-label="Close shopping bag"
                className="flex h-10 w-10 items-center justify-center text-[#303431] hover:text-[#123F3A]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center py-12">
                  <ShoppingBag className="h-10 w-10 text-[#C3A66B] stroke-[1.3]" />
                  <h3 className="mt-4 font-display text-2xl text-[#123F3A]">
                    Your bag is currently empty
                  </h3>
                  <p className="mt-2 max-w-xs text-sm text-[#303431]/70">
                    Explore our handwoven Banarasi, Kanjivaram, and Chanderi edits to begin your curation.
                  </p>
                  <Link
                    to="/shop"
                    onClick={() => setIsBagOpen(false)}
                    className="mt-6 inline-flex items-center gap-2 bg-[#123F3A] px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[#E8E5D9] hover:bg-[#0C2B27]"
                  >
                    Explore Sarees
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-[#303431]/10">
                  {cart.map((item) => {
                    const product = getProductById(item.productId);
                    if (!product) return null;
                    return (
                      <li
                        key={`${item.productId}-${item.blouseOption}`}
                        className="flex gap-4 py-5 first:pt-0"
                      >
                        <Link
                          to={`/product/${product.slug}`}
                          onClick={() => setIsBagOpen(false)}
                          className="h-28 w-21 shrink-0 overflow-hidden bg-[#E8E5D9]"
                        >
                          <SafeImage
                            src={product.images[0]}
                            alt={product.name}
                            className="h-full w-full object-cover object-top"
                          />
                        </Link>
                        <div className="flex flex-1 flex-col justify-between min-w-0">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <Link
                                to={`/product/${product.slug}`}
                                onClick={() => setIsBagOpen(false)}
                                className="font-display text-lg font-medium leading-snug text-[#303431] hover:text-[#123F3A] truncate"
                              >
                                {product.name}
                              </Link>
                              <button
                                type="button"
                                onClick={() => removeFromCart(item.productId, item.blouseOption)}
                                aria-label={`Remove ${product.name}`}
                                className="text-[#303431]/50 hover:text-[#123F3A] p-1"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                            <p className="mt-0.5 text-xs text-[#303431]/65">{item.blouseOption}</p>
                            <p className="mt-1 text-sm font-medium tabular-nums text-[#123F3A]">
                              {formatINR(product.priceINR)}
                            </p>
                          </div>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center border border-[#303431]/20">
                              <button
                                type="button"
                                onClick={() =>
                                  updateCartQuantity(
                                    item.productId,
                                    item.blouseOption,
                                    item.quantity - 1
                                  )
                                }
                                aria-label="Decrease quantity"
                                className="flex h-8 w-8 items-center justify-center text-[#303431] hover:bg-[#E8E5D9]"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-8 text-center text-xs font-medium tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateCartQuantity(
                                    item.productId,
                                    item.blouseOption,
                                    item.quantity + 1
                                  )
                                }
                                aria-label="Increase quantity"
                                className="flex h-8 w-8 items-center justify-center text-[#303431] hover:bg-[#E8E5D9]"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <span className="text-sm font-medium tabular-nums text-[#303431]">
                              {formatINR(product.priceINR * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-[#303431]/12 bg-[#E8E5D9]/60 px-6 py-5 space-y-4">
                <div className="flex items-center justify-between text-xs text-[#303431]/75">
                  <span>Insured Express Shipping & Muslin Wrap</span>
                  <span className="font-medium text-[#123F3A]">Complimentary</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-[#303431]">Subtotal</span>
                  <span className="font-display text-2xl font-medium tabular-nums text-[#123F3A]">
                    {formatINR(cartSubtotal)}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  <Link
                    to="/bag"
                    onClick={() => setIsBagOpen(false)}
                    className="flex w-full items-center justify-center gap-2 bg-[#123F3A] py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-[#E8E5D9] hover:bg-[#0C2B27] transition-colors"
                  >
                    Proceed to Bag & Checkout
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
