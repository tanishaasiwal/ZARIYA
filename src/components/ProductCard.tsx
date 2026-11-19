import React from 'react';
import {Link} from 'react-router-dom';
import {Eye, Heart, ShoppingBag} from 'lucide-react';
import {Product} from '../types';
import {formatINR} from '../data/catalog';
import {useStore} from '../context/StoreContext';
import {SafeImage} from './SafeImage';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({product, priority = false}: ProductCardProps) {
  const {addToCart, toggleWishlist, isWishlisted, setQuickViewProduct} = useStore();
  const saved = isWishlisted(product.id);

  return (
    <article className="group flex flex-col bg-[#F5F3EC] transition-transform duration-200 hover:-translate-y-0.5">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#E8E5D9]">
        <Link to={`/product/${product.slug}`} className="block h-full w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#123F3A]">
          <SafeImage
            src={product.images[0]}
            alt={`${product.name} — ${product.subtitle}`}
            fallbackTitle={product.name}
            priority={priority}
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </Link>

        {/* Subtle Quick Actions on Hover / Focus (Touch-accessible at bottom-right) */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-col gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
            className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#123F3A] ${
              saved
                ? 'border-[#123F3A] bg-[#123F3A] text-[#E8E5D9]'
                : 'border-[#303431]/15 bg-[#F5F3EC]/92 text-[#303431] hover:border-[#123F3A] hover:text-[#123F3A]'
            }`}
          >
            <Heart className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${saved ? 'fill-current' : ''}`} />
          </button>

          <button
            type="button"
            onClick={() => setQuickViewProduct(product)}
            aria-label={`Quick view ${product.name}`}
            className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center border border-[#303431]/15 bg-[#F5F3EC]/92 text-[#303431] opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:focus-visible:opacity-100 transition-opacity duration-150 hover:border-[#123F3A] hover:text-[#123F3A]"
          >
            <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        </div>

        {/* Bottom quick-add strip */}
        <div className="absolute inset-x-0 bottom-0 translate-y-0 lg:translate-y-full lg:group-hover:translate-y-0 lg:focus-within:translate-y-0 transition-transform duration-200">
          <button
            type="button"
            onClick={() => addToCart(product.id, 1, 'Unstitched Blouse Included', true)}
            className="flex w-full items-center justify-center gap-1.5 sm:gap-2 bg-[#123F3A]/95 px-2 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-xs font-medium tracking-[0.1em] sm:tracking-[0.14em] uppercase text-[#E8E5D9] hover:bg-[#0C2B27] transition-colors whitespace-nowrap"
          >
            <ShoppingBag className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            Add to Bag
          </button>
        </div>
      </div>

      {/* Uniform Clean Metadata — Zero Pill Badges */}
      <div className="flex flex-1 flex-col justify-between pt-2.5 pb-1 sm:pt-4 sm:pb-2">
        <div>
          <div className="flex items-center justify-between gap-2 text-[10px] sm:text-xs text-[#303431]/65">
            <span className="truncate">
              {product.collectionName} · {product.fabric}
            </span>
            {product.isNew && (
              <span className="hidden sm:inline shrink-0 font-medium text-[#9E8249]">New Arrival</span>
            )}
          </div>
          <Link
            to={`/product/${product.slug}`}
            className="mt-1 sm:mt-1.5 block font-display text-base sm:text-xl font-medium leading-snug text-[#303431] hover:text-[#123F3A] transition-colors line-clamp-2 sm:line-clamp-none"
          >
            {product.name}
          </Link>
        </div>

        <div className="mt-1.5 sm:mt-2 flex items-baseline justify-between gap-2 sm:gap-4 border-t border-[#303431]/10 pt-2 sm:pt-2.5">
          <span className="text-sm sm:text-[15px] font-medium tabular-nums text-[#123F3A] shrink-0">
            {formatINR(product.priceINR)}
          </span>
          <span className="text-[10px] sm:text-xs text-[#303431]/60 truncate">{product.artisanOrigin}</span>
        </div>
      </div>
    </article>
  );
}
