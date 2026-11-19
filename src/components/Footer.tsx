import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {ArrowRight, Check} from 'lucide-react';
import {COLLECTIONS} from '../data/catalog';
import {useStore} from '../context/StoreContext';

export function Footer() {
  const {newsletterSubscribed, subscribeNewsletter, resetHomeView} = useStore();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    subscribeNewsletter(trimmed);
    setEmail('');
  };

  return (
    <footer className="border-t border-[#C3A66B]/30 bg-[#123F3A] text-[#E8E5D9]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-4">
            <Link
              to="/"
              onClick={() => {
                if (location.pathname === '/') {
                  resetHomeView();
                }
              }}
              className="inline-block font-accent text-3xl tracking-[0.26em] text-[#E8E5D9]"
            >
              ZARIYA
            </Link>
            <p className="font-display text-lg italic text-[#C3A66B]">
              The Art of Tradition, Reimagined.
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-[#E8E5D9]/80">
              Handwoven heirloom sarees crafted alongside master karigars across Varanasi,
              Kanchipuram, Patan, Chanderi, and Yeola—designed for modern Indian couture.
            </p>
            <div className="pt-2 text-xs text-[#E8E5D9]/65 space-y-1">
              <p>Flagship Atelier · Kala Ghoda, Fort, Mumbai 400001</p>
              <p>By Appointment · Mehrauli Craft Studio, New Delhi</p>
            </div>
          </div>

          {/* Collections Links */}
          <div className="sm:col-span-1 lg:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C3A66B]">
              Collections
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-[#E8E5D9]/80">
              {COLLECTIONS.map((col) => (
                <li key={col.slug}>
                  <Link
                    to={`/collections/${col.slug}`}
                    className="hover:text-[#E8E5D9] transition-colors truncate block"
                  >
                    {col.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* House & Client Care Links */}
          <div className="sm:col-span-1 lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C3A66B]">
              The House
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#E8E5D9]/80">
              <li>
                <Link to="/shop" className="hover:text-[#E8E5D9] transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/bridal" className="hover:text-[#E8E5D9] transition-colors">
                  Bridal Edit
                </Link>
              </li>
              <li>
                <Link to="/heritage" className="hover:text-[#E8E5D9] transition-colors">
                  Our Heritage
                </Link>
              </li>
              <li>
                <Link to="/journal" className="hover:text-[#E8E5D9] transition-colors">
                  Lookbook & Journal
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#E8E5D9] transition-colors">
                  About & Contact
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-[#E8E5D9] transition-colors">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/bag" className="hover:text-[#E8E5D9] transition-colors">
                  Shopping Bag
                </Link>
              </li>
            </ul>
          </div>

          {/* Atelier Newsletter */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C3A66B]">
              Atelier Dispatch
            </h3>
            <p className="text-sm leading-relaxed text-[#E8E5D9]/80">
              Receive private invitations to seasonal loom releases, bridal previews, and craft notes.
            </p>

            {newsletterSubscribed ? (
              <div className="flex items-start gap-2.5 border border-[#C3A66B]/40 bg-[#0C2B27]/60 p-4 text-xs text-[#E8E5D9]">
                <Check className="h-4 w-4 text-[#C3A66B] shrink-0 mt-0.5" />
                <span>
                  Subscribed as <strong className="font-medium">{newsletterSubscribed}</strong>.
                  Thank you for joining the ZARIYA Circle.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-2">
                <div className="flex border-b border-[#E8E5D9]/35 focus-within:border-[#C3A66B]">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    aria-label="Email address for atelier newsletter"
                    className="w-full bg-transparent py-2.5 text-sm text-[#E8E5D9] placeholder:text-[#E8E5D9]/45 focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="flex items-center gap-1 px-2 text-xs font-medium uppercase tracking-[0.14em] text-[#C3A66B] hover:text-[#E8E5D9]"
                  >
                    Join
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
                {error && <p className="text-xs text-[#E8E5D9]/90">{error}</p>}
              </form>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-[#E8E5D9]/15 pt-8 text-xs text-[#E8E5D9]/60 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} ZARIYA Atelier. All rights reserved.</p>
          <p>Handwoven in India · Complimentary Insured Shipping</p>
        </div>
      </div>
    </footer>
  );
}
