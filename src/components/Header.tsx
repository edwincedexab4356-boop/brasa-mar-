import React from 'react';
import { ShoppingBag, SlidersHorizontal, MapPin, Clock } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const Header: React.FC = () => {
  const {
    cartTotalCount,
    cartTotal,
    setIsCartOpen,
    setIsAdminOpen,
    setIsInfoOpen,
    restaurantConfig,
  } = useRestaurant();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#232730] bg-[#0E1013]/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element Brand wordmark */}
        <a
          href="#inicio"
          className="group flex items-center gap-2 text-xl sm:text-2xl font-normal tracking-wide text-[#F6F4EE] whitespace-nowrap shrink-0"
        >
          <span className="font-serif-display font-medium tracking-tight">
            BRASA <span className="text-[#C87D55]">&amp;</span> MAR
          </span>
        </a>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#B8B4AC]">
          <a
            href="#carta"
            className="hover:text-[#F6F4EE] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#C87D55]"
          >
            Carta Completa
          </a>
          <a
            href="#destacados"
            className="hover:text-[#F6F4EE] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#C87D55]"
          >
            Selección del Chef
          </a>
          <a
            href="#promociones"
            className="hover:text-[#F6F4EE] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#C87D55]"
          >
            Promociones
          </a>
          <button
            onClick={() => setIsInfoOpen(true)}
            className="hover:text-[#F6F4EE] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer text-left"
          >
            <span>Horarios &amp; Ubicación</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action + subtle demo admin trigger */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            onClick={() => setIsInfoOpen(true)}
            title="Horarios y ubicación"
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-[#272B35] bg-[#16191E] text-[#C4C0B8] hover:text-[#F6F4EE] transition-colors"
          >
            <Clock className="h-4 w-4" />
          </button>

          <button
            onClick={() => setIsAdminOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-[#2B2F3A] bg-[#14171D] px-2.5 py-1.5 text-xs font-medium text-[#C4C0B8] hover:border-[#C87D55]/50 hover:text-[#F6F4EE] transition-colors whitespace-nowrap shrink-0"
            title="Panel administrativo de demostración"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#C87D55]" />
            <span className="hidden sm:inline">Modo Restaurante</span>
          </button>

          {/* Primary CTA: Cart bag */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2.5 rounded-lg bg-[#C87D55] hover:bg-[#B76F48] px-3.5 py-2 text-xs sm:text-sm font-semibold text-[#0E1013] transition-all whitespace-nowrap shrink-0 shadow-md shadow-[#C87D55]/10"
            aria-label="Ver pedido"
          >
            <ShoppingBag className="h-4 w-4 text-[#0E1013]" />
            <span className="font-medium">Tu Pedido</span>
            {cartTotalCount > 0 && (
              <span className="ml-0.5 rounded-full bg-[#0E1013] px-1.5 py-0.2 text-[11px] font-bold text-[#F6F4EE] tabular-nums">
                {cartTotalCount}
              </span>
            )}
            {cartTotal > 0 && (
              <span className="hidden sm:inline border-l border-[#0E1013]/25 pl-2 font-mono text-xs font-bold tabular-nums">
                ${cartTotal.toFixed(2)}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
