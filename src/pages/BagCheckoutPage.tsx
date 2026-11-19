import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {ArrowRight, Check, Info, Minus, Plus, ShoppingBag, Tag, Trash2} from 'lucide-react';
import {formatINR, getProductById} from '../data/catalog';
import {useStore} from '../context/StoreContext';
import {PageShell, usePageMeta} from '../components/MotionPrimitives';
import {Breadcrumbs} from '../components/Breadcrumbs';
import {SafeImage} from '../components/SafeImage';

interface ConfirmedOrder {
  orderNumber: string;
  customerName: string;
  email: string;
  address: string;
  paymentMethod: string;
  totalINR: number;
  itemCount: number;
}

export function BagCheckoutPage() {
  usePageMeta(
    'Shopping Bag & Checkout',
    'Review your ZARIYA saree order, apply privilege codes, and complete demo checkout.'
  );

  const {cart, cartSubtotal, cartCount, updateCartQuantity, removeFromCart, clearCart} = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{code: string; rate: number} | null>(null);
  const [promoMessage, setPromoMessage] = useState('');

  const [shipping, setShipping] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'UPI / Netbanking (Demo Preview)',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);

  const discountAmount = appliedPromo ? Math.round(cartSubtotal * appliedPromo.rate) : 0;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (!code) {
      setPromoMessage('Enter a privilege code such as ZARIYA10.');
      return;
    }
    if (code === 'ZARIYA10') {
      setAppliedPromo({code: 'ZARIYA10', rate: 0.1});
      setPromoMessage('Privilege code ZARIYA10 applied (10% off).');
      return;
    }
    if (code === 'HERITAGE15') {
      if (cartSubtotal < 12000) {
        setPromoMessage('HERITAGE15 applies to orders above ₹12,000.');
        return;
      }
      setAppliedPromo({code: 'HERITAGE15', rate: 0.15});
      setPromoMessage('Privilege code HERITAGE15 applied (15% off).');
      return;
    }
    setPromoMessage('Unrecognized code. Try ZARIYA10 for 10% off or HERITAGE15 on orders ₹12,000+.');
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!shipping.fullName.trim()) errors.fullName = 'Full name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shipping.email.trim())) {
      errors.email = 'Valid email address is required.';
    }
    if (!/^[0-9]{10}$/.test(shipping.phone.replace(/\D/g, ''))) {
      errors.phone = 'Enter a valid 10-digit mobile number.';
    }
    if (!shipping.address.trim()) errors.address = 'Street address is required.';
    if (!shipping.city.trim()) errors.city = 'City is required.';
    if (!shipping.state.trim()) errors.state = 'State is required.';
    if (!/^[1-9][0-9]{5}$/.test(shipping.pincode.trim())) {
      errors.pincode = 'Enter a valid 6-digit pincode.';
    }
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const orderNum = `ZAR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setConfirmedOrder({
        orderNumber: orderNum,
        customerName: shipping.fullName.trim(),
        email: shipping.email.trim(),
        address: `${shipping.address}, ${shipping.city}, ${shipping.state} - ${shipping.pincode}`,
        paymentMethod: shipping.paymentMethod,
        totalINR: grandTotal,
        itemCount: cartCount,
      });
      clearCart();
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  };

  if (confirmedOrder) {
    return (
      <PageShell className="bg-[#F5F3EC] py-10 sm:py-20">
        <div className="mx-auto max-w-2xl px-5 sm:px-8">
          <div className="border border-[#C3A66B]/40 bg-[#E8E5D9]/55 p-6 sm:p-12">
            <div className="flex h-12 w-12 items-center justify-center bg-[#123F3A] text-[#E8E5D9]">
              <Check className="h-6 w-6" />
            </div>
            <p className="mt-5 sm:mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#9E8249]">
              Demo Order Confirmed
            </p>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl font-normal text-[#123F3A]">
              Order #{confirmedOrder.orderNumber}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-[#303431]/80">
              Thank you, {confirmedOrder.customerName}. Your demo order summary has been recorded
              with no live payment charged. In production, a provenance certificate and courier
              tracking link are sent to {confirmedOrder.email}.
            </p>

            <dl className="mt-6 sm:mt-8 space-y-3 border-y border-[#303431]/12 py-5 sm:py-6 text-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4">
                <dt className="text-[#303431]/65">Pieces Reserved</dt>
                <dd className="font-medium tabular-nums text-[#303431]">
                  {confirmedOrder.itemCount} Saree{confirmedOrder.itemCount === 1 ? '' : 's'}
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4">
                <dt className="text-[#303431]/65">Delivery Address</dt>
                <dd className="sm:text-right font-medium text-[#303431] sm:max-w-xs">
                  {confirmedOrder.address}
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4">
                <dt className="text-[#303431]/65">Payment Mode</dt>
                <dd className="font-medium text-[#303431]">{confirmedOrder.paymentMethod}</dd>
              </div>
              <div className="flex justify-between gap-4 pt-2 border-t border-[#303431]/10">
                <dt className="font-semibold text-[#123F3A]">Order Total</dt>
                <dd className="font-display text-2xl font-medium tabular-nums text-[#123F3A]">
                  {formatINR(confirmedOrder.totalINR)}
                </dd>
              </div>
            </dl>

            <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-[#123F3A] px-6 sm:px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#E8E5D9] hover:bg-[#0C2B27] whitespace-nowrap"
              >
                Continue Exploring Sarees
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/"
                className="inline-flex items-center border border-[#303431]/25 px-6 sm:px-7 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-[#303431] hover:border-[#123F3A] whitespace-nowrap"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell className="bg-[#F5F3EC] py-8 sm:py-16 min-h-[75vh]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Breadcrumbs items={[{label: 'Home', to: '/'}, {label: 'Shopping Bag & Checkout'}]} />

        <div className="mt-5 sm:mt-6 border-b border-[#303431]/12 pb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="font-display text-3xl font-normal text-[#123F3A] sm:text-5xl">
              Shopping Bag & Checkout
            </h1>
            <p className="mt-2 text-sm text-[#303431]/75 tabular-nums">
              {cartCount} {cartCount === 1 ? 'saree' : 'sarees'} in your bag
            </p>
          </div>
          <div className="flex items-center gap-2 border border-[#C3A66B]/45 bg-[#E8E5D9]/60 px-3.5 py-2 text-xs text-[#303431]">
            <Info className="h-4 w-4 text-[#123F3A] shrink-0" />
            <span>Demo Checkout Mode — No real payment or card charge is processed.</span>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="mt-12 border border-[#303431]/12 bg-[#E8E5D9]/40 py-20 px-6 text-center">
            <ShoppingBag className="mx-auto h-10 w-10 text-[#C3A66B] stroke-[1.3]" />
            <h2 className="mt-4 font-display text-3xl text-[#123F3A]">
              Your Shopping Bag is Empty
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-[#303431]/75">
              Discover handwoven Banarasi, Kanjivaram, and Chanderi creations to begin your order.
            </p>
            <Link
              to="/shop"
              className="mt-7 inline-flex items-center gap-2 bg-[#123F3A] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#E8E5D9] hover:bg-[#0C2B27]"
            >
              Browse Sarees
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            {/* Left: Itemized Cart + Shipping Form */}
            <div className="lg:col-span-7 space-y-10">
              <div className="divide-y divide-[#303431]/12 border-y border-[#303431]/12">
                {cart.map((item) => {
                  const product = getProductById(item.productId);
                  if (!product) return null;
                  return (
                    <div
                      key={`${item.productId}-${item.blouseOption}`}
                      className="flex flex-col gap-4 py-5 sm:py-6 sm:flex-row sm:items-center"
                    >
                      <div className="flex gap-3.5 sm:gap-4 flex-1 min-w-0 items-start sm:items-center">
                        <Link
                          to={`/product/${product.slug}`}
                          className="h-28 w-21 sm:h-32 sm:w-24 shrink-0 overflow-hidden bg-[#E8E5D9]"
                        >
                          <SafeImage
                            src={product.images[0]}
                            alt={product.name}
                            className="h-full w-full object-cover object-top"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] sm:text-xs text-[#9E8249]">{product.collectionName}</p>
                          <Link
                            to={`/product/${product.slug}`}
                            className="font-display text-xl sm:text-2xl text-[#123F3A] hover:underline block leading-snug"
                          >
                            {product.name}
                          </Link>
                          <p className="mt-1 text-xs text-[#303431]/70">{item.blouseOption}</p>
                          <p className="mt-1 text-sm font-medium tabular-nums text-[#303431]">
                            {formatINR(product.priceINR)} each
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end pl-24.5 sm:pl-0">
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
                            className="flex h-9 w-9 items-center justify-center hover:bg-[#E8E5D9]"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-9 text-center text-xs font-medium tabular-nums">
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
                            className="flex h-9 w-9 items-center justify-center hover:bg-[#E8E5D9]"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-base font-medium tabular-nums text-[#123F3A]">
                            {formatINR(product.priceINR * item.quantity)}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.productId, item.blouseOption)}
                            aria-label={`Remove ${product.name}`}
                            className="p-1.5 text-[#303431]/55 hover:text-[#7A1F24]"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Shipping & Demo Checkout Form */}
              <form
                id="checkout-form"
                onSubmit={handleCheckoutSubmit}
                noValidate
                className="border border-[#303431]/12 bg-[#E8E5D9]/35 p-6 sm:p-8 space-y-6"
              >
                <h2 className="font-display text-2xl text-[#123F3A]">
                  Shipping Details & Demo Checkout
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="ship-name" className="block text-xs font-medium text-[#303431]">
                      Recipient Full Name *
                    </label>
                    <input
                      id="ship-name"
                      type="text"
                      value={shipping.fullName}
                      onChange={(e) => setShipping({...shipping, fullName: e.target.value})}
                      className="mt-1.5 w-full border border-[#303431]/25 bg-white/85 px-3 py-2.5 text-sm focus:border-[#123F3A] focus:outline-none"
                    />
                    {formErrors.fullName && (
                      <p className="mt-1 text-xs text-[#7A1F24]">{formErrors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="ship-email" className="block text-xs font-medium text-[#303431]">
                      Email Address *
                    </label>
                    <input
                      id="ship-email"
                      type="email"
                      value={shipping.email}
                      onChange={(e) => setShipping({...shipping, email: e.target.value})}
                      className="mt-1.5 w-full border border-[#303431]/25 bg-white/85 px-3 py-2.5 text-sm focus:border-[#123F3A] focus:outline-none"
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-xs text-[#7A1F24]">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="ship-phone" className="block text-xs font-medium text-[#303431]">
                      10-Digit Mobile Number *
                    </label>
                    <input
                      id="ship-phone"
                      type="tel"
                      maxLength={10}
                      value={shipping.phone}
                      onChange={(e) =>
                        setShipping({...shipping, phone: e.target.value.replace(/\D/g, '')})
                      }
                      className="mt-1.5 w-full border border-[#303431]/25 bg-white/85 px-3 py-2.5 text-sm tabular-nums focus:border-[#123F3A] focus:outline-none"
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-xs text-[#7A1F24]">{formErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="ship-pincode" className="block text-xs font-medium text-[#303431]">
                      6-Digit Pincode *
                    </label>
                    <input
                      id="ship-pincode"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={shipping.pincode}
                      onChange={(e) =>
                        setShipping({...shipping, pincode: e.target.value.replace(/\D/g, '')})
                      }
                      className="mt-1.5 w-full border border-[#303431]/25 bg-white/85 px-3 py-2.5 text-sm tabular-nums focus:border-[#123F3A] focus:outline-none"
                    />
                    {formErrors.pincode && (
                      <p className="mt-1 text-xs text-[#7A1F24]">{formErrors.pincode}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="ship-address" className="block text-xs font-medium text-[#303431]">
                    Street Address / Residence *
                  </label>
                  <input
                    id="ship-address"
                    type="text"
                    value={shipping.address}
                    onChange={(e) => setShipping({...shipping, address: e.target.value})}
                    className="mt-1.5 w-full border border-[#303431]/25 bg-white/85 px-3 py-2.5 text-sm focus:border-[#123F3A] focus:outline-none"
                  />
                  {formErrors.address && (
                    <p className="mt-1 text-xs text-[#7A1F24]">{formErrors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="ship-city" className="block text-xs font-medium text-[#303431]">
                      City *
                    </label>
                    <input
                      id="ship-city"
                      type="text"
                      value={shipping.city}
                      onChange={(e) => setShipping({...shipping, city: e.target.value})}
                      className="mt-1.5 w-full border border-[#303431]/25 bg-white/85 px-3 py-2.5 text-sm focus:border-[#123F3A] focus:outline-none"
                    />
                    {formErrors.city && (
                      <p className="mt-1 text-xs text-[#7A1F24]">{formErrors.city}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="ship-state" className="block text-xs font-medium text-[#303431]">
                      State *
                    </label>
                    <input
                      id="ship-state"
                      type="text"
                      value={shipping.state}
                      onChange={(e) => setShipping({...shipping, state: e.target.value})}
                      className="mt-1.5 w-full border border-[#303431]/25 bg-white/85 px-3 py-2.5 text-sm focus:border-[#123F3A] focus:outline-none"
                    />
                    {formErrors.state && (
                      <p className="mt-1 text-xs text-[#7A1F24]">{formErrors.state}</p>
                    )}
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#303431]/75">
                    Payment Method (Demo Preview)
                  </span>
                  <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {[
                      'UPI / Netbanking (Demo Preview)',
                      'Credit / Debit Card (Demo Preview)',
                      'Cash on Delivery (Demo Preview)',
                    ].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setShipping({...shipping, paymentMethod: method})}
                        className={`border p-3 text-left text-xs font-medium transition-colors ${
                          shipping.paymentMethod === method
                            ? 'border-[#123F3A] bg-[#123F3A]/8 text-[#123F3A]'
                            : 'border-[#303431]/20 text-[#303431]/80'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>
              </form>
            </div>

            {/* Right: Order Summary & Promo Code */}
            <aside className="lg:col-span-5 lg:sticky lg:top-24 border border-[#303431]/15 bg-[#E8E5D9]/55 p-6 sm:p-8 space-y-6">
              <h2 className="font-display text-2xl font-medium text-[#123F3A]">Order Summary</h2>

              {/* Discount Code UI */}
              <form onSubmit={handleApplyPromo} className="space-y-2 border-b border-[#303431]/12 pb-6">
                <label
                  htmlFor="promo-code"
                  className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#9E8249]"
                >
                  <Tag className="h-3.5 w-3.5" />
                  Privilege Code
                </label>
                <div className="flex gap-2">
                  <input
                    id="promo-code"
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Try ZARIYA10 or HERITAGE15"
                    className="min-w-0 flex-1 border border-[#303431]/20 bg-white/85 px-3 py-2 text-xs uppercase tracking-wider focus:border-[#123F3A] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="shrink-0 border border-[#123F3A] px-4 py-2 text-xs font-medium text-[#123F3A] hover:bg-[#123F3A] hover:text-[#E8E5D9] transition-colors whitespace-nowrap"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p className="text-xs text-[#123F3A]">{promoMessage}</p>
                )}
              </form>

              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-[#303431]/75">Subtotal</dt>
                  <dd className="font-medium tabular-nums text-[#303431]">
                    {formatINR(cartSubtotal)}
                  </dd>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-[#123F3A]">
                    <dt>Discount ({appliedPromo.code})</dt>
                    <dd className="font-medium tabular-nums">−{formatINR(discountAmount)}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-[#303431]/75">Insured Express Delivery</dt>
                  <dd className="font-medium text-[#123F3A]">Complimentary</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#303431]/75">Muslin Storage & Fall-Pico</dt>
                  <dd className="font-medium text-[#123F3A]">Included</dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-[#303431]/15 pt-4">
                  <dt className="text-base font-semibold text-[#123F3A]">Total Payable</dt>
                  <dd className="font-display text-3xl font-medium tabular-nums text-[#123F3A]">
                    {formatINR(grandTotal)}
                  </dd>
                </div>
              </dl>

              <button
                type="submit"
                form="checkout-form"
                className="w-full bg-[#123F3A] py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#E8E5D9] hover:bg-[#0C2B27] transition-colors"
              >
                Place Demo Order — {formatINR(grandTotal)}
              </button>

              <p className="text-[11px] leading-relaxed text-[#303431]/65 text-center">
                This storefront uses a simulated demo checkout. Submitting places a sample order
                confirmation with zero financial transaction.
              </p>
            </aside>
          </div>
        )}
      </div>
    </PageShell>
  );
}
