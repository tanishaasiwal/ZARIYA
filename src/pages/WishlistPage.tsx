import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowRight, Heart, ShoppingBag, Trash2} from 'lucide-react';
import {formatINR, getProductById} from '../data/catalog';
import {useStore} from '../context/StoreContext';
import {PageShell, usePageMeta} from '../components/MotionPrimitives';
import {Breadcrumbs} from '../components/Breadcrumbs';
import {SafeImage} from '../components/SafeImage';

export function WishlistPage() {
  usePageMeta('Saved Wishlist', 'Review your saved ZARIYA heirloom sarees and move them to your shopping bag.');
  const {wishlist, toggleWishlist, addToCart} = useStore();

  const savedProducts = wishlist
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <PageShell className="bg-[#F5F3EC] py-8 sm:py-16 min-h-[70vh]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Breadcrumbs items={[{label: 'Home', to: '/'}, {label: 'Wishlist'}]} />

        <div className="mt-5 sm:mt-6 flex flex-col justify-between gap-4 border-b border-[#303431]/12 pb-6 sm:pb-8 sm:flex-row sm:items-end">
          <div>
            <h1 className="font-display text-3xl font-normal text-[#123F3A] sm:text-5xl">
              Your Saved Wishlist
            </h1>
            <p className="mt-2 text-sm text-[#303431]/75 tabular-nums">
              {savedProducts.length} {savedProducts.length === 1 ? 'saree' : 'sarees'} curated
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#123F3A] hover:text-[#9E8249] whitespace-nowrap"
          >
            Continue Browsing
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {savedProducts.length === 0 ? (
          <div className="mt-10 sm:mt-12 border border-[#303431]/12 bg-[#E8E5D9]/40 py-14 sm:py-20 px-6 text-center">
            <Heart className="mx-auto h-10 w-10 text-[#C3A66B] stroke-[1.3]" />
            <h2 className="mt-4 font-display text-2xl sm:text-3xl text-[#123F3A]">
              No Sarees Saved Yet
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-[#303431]/75">
              Tap the heart icon on any Banarasi, Kanjivaram, or Chanderi piece to preserve it in
              your personal shortlist.
            </p>
            <Link
              to="/shop"
              className="mt-7 inline-flex items-center gap-2 bg-[#123F3A] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#E8E5D9] hover:bg-[#0C2B27]"
            >
              Explore Sarees
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-3.5 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {savedProducts.map((product) => (
              <article
                key={product.id}
                className="flex flex-col justify-between border border-[#303431]/12 bg-[#E8E5D9]/30 p-2.5 sm:p-4"
              >
                <div>
                  <Link
                    to={`/product/${product.slug}`}
                    className="block aspect-[3/4] overflow-hidden bg-[#E8E5D9]"
                  >
                    <SafeImage
                      src={product.images[0]}
                      alt={product.name}
                      fallbackTitle={product.name}
                      className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-[1.03]"
                    />
                  </Link>
                  <div className="mt-2.5 sm:mt-4">
                    <p className="text-[10px] sm:text-xs text-[#303431]/65 truncate">
                      {product.collectionName} · {product.fabric}
                    </p>
                    <Link
                      to={`/product/${product.slug}`}
                      className="mt-1 block font-display text-base sm:text-2xl text-[#123F3A] hover:text-[#9E8249] leading-snug line-clamp-2 sm:line-clamp-none"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 text-sm sm:text-base font-medium tabular-nums text-[#303431]">
                      {formatINR(product.priceINR)}
                    </p>
                  </div>
                </div>

                <div className="mt-3 sm:mt-5 flex items-center gap-1.5 sm:gap-2.5 pt-2.5 sm:pt-4 border-t border-[#303431]/10">
                  <button
                    type="button"
                    onClick={() => addToCart(product.id, 1, 'Unstitched Blouse Included', true)}
                    className="flex flex-1 items-center justify-center gap-1.5 sm:gap-2 bg-[#123F3A] px-2 py-2.5 sm:py-3 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.1em] sm:tracking-[0.14em] text-[#E8E5D9] hover:bg-[#0C2B27] transition-colors whitespace-nowrap"
                  >
                    <ShoppingBag className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                    <span className="truncate">Move to Bag</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={`Remove ${product.name} from wishlist`}
                    className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center border border-[#303431]/20 text-[#303431] hover:border-[#7A1F24] hover:text-[#7A1F24]"
                  >
                    <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
