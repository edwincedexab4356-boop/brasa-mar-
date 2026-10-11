import React from 'react';
import { RestaurantProvider, useRestaurant } from './context/RestaurantContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryNav } from './components/CategoryNav';
import { FeaturedDishes } from './components/FeaturedDishes';
import { PromotionsSection } from './components/PromotionsSection';
import { MenuList } from './components/MenuList';
import { Footer } from './components/Footer';
import { DishDetailModal } from './components/DishDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { AdminModal } from './components/AdminModal';
import { InfoModal } from './components/InfoModal';
import { MobileQuickBar } from './components/MobileQuickBar';

function MenuAppContent() {
  const {
    selectedDishForDetail,
    setSelectedDishForDetail,
    isCartOpen,
    setIsCartOpen,
    isAdminOpen,
    setIsAdminOpen,
    isInfoOpen,
    setIsInfoOpen,
    isTrackingModalOpen,
    setIsTrackingModalOpen,
  } = useRestaurant();

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-[#F4F1EA] flex flex-col font-sans selection:bg-[#C87D55] selection:text-white">
      {/* Top Bar */}
      <Header />

      {/* Main Experience Flow */}
      <main className="flex-1">
        {/* Restaurant Hero Presentation */}
        <HeroSection />

        {/* Featured Chef Selection */}
        <FeaturedDishes />

        {/* Promotions and Pairings */}
        <PromotionsSection />

        {/* Sticky Category Navigation & Search */}
        <CategoryNav />

        {/* Interactive Menu List with 9 Categories */}
        <MenuList />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* One-handed Mobile Quick Navigation Bar */}
      <MobileQuickBar />

      {/* Modals & Slide-over Drawers */}
      <DishDetailModal
        dish={selectedDishForDetail}
        onClose={() => setSelectedDishForDetail(null)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      <OrderTrackingModal
        isOpen={isTrackingModalOpen}
        onClose={() => setIsTrackingModalOpen(false)}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      <InfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <RestaurantProvider>
      <MenuAppContent />
    </RestaurantProvider>
  );
}
