/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom';
import {MotionConfig} from 'motion/react';
import {StoreProvider, useStore} from './context/StoreContext';
import {Navbar} from './components/Navbar';
import {Footer} from './components/Footer';
import {BagDrawer} from './components/BagDrawer';
import {SearchOverlay} from './components/SearchOverlay';
import {QuickViewModal} from './components/QuickViewModal';
import {ToastNotification} from './components/ToastNotification';
import {HomePage} from './pages/HomePage';
import {ShopPage} from './pages/ShopPage';
import {CollectionsPage} from './pages/CollectionsPage';
import {CollectionDetailPage} from './pages/CollectionDetailPage';
import {ProductDetailPage} from './pages/ProductDetailPage';
import {BridalEditPage} from './pages/BridalEditPage';
import {HeritagePage} from './pages/HeritagePage';
import {JournalPage} from './pages/JournalPage';
import {AboutContactPage} from './pages/AboutContactPage';
import {WishlistPage} from './pages/WishlistPage';
import {BagCheckoutPage} from './pages/BagCheckoutPage';

function ScrollToTop() {
  const {pathname} = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomeRoute() {
  const {homeResetKey} = useStore();
  return <HomePage key={homeResetKey} />;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <StoreProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="flex min-h-screen flex-col bg-[#F5F3EC] text-[#303431]">
            <Navbar />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<HomeRoute />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/collections" element={<CollectionsPage />} />
                <Route path="/collections/:slug" element={<CollectionDetailPage />} />
                <Route path="/product/:slug" element={<ProductDetailPage />} />
                <Route path="/bridal" element={<BridalEditPage />} />
                <Route path="/heritage" element={<HeritagePage />} />
                <Route path="/journal" element={<JournalPage />} />
                <Route path="/about" element={<AboutContactPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/bag" element={<BagCheckoutPage />} />
                <Route path="*" element={<HomeRoute />} />
              </Routes>
            </div>
            <Footer />
            <BagDrawer />
            <SearchOverlay />
            <QuickViewModal />
            <ToastNotification />
          </div>
        </BrowserRouter>
      </StoreProvider>
    </MotionConfig>
  );
}
