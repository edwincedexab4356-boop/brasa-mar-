import React from 'react';
import { ShoppingBag, Clock, MapPin, MessageCircle } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const MobileQuickBar: React.FC = () => {
  const { cartTotalCount, cartTotal, setIsCartOpen, setIsInfoOpen, restaurantConfig } =
    useRestaurant();

  const handleWhatsApp = () => {
    const cleanNumber = restaurantConfig.whatsappNumber.replace(/[^0-9]/g, '');
    const greeting = encodeURIComponent(
      '¡Hola Brasa & Mar! Quiero consultar disponibilidad o enviar un pedido.'
    );
    window.open(`https://wa.me/${cleanNumber}?text=${greeting}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 sm:hidden border-t border-[#232733] bg-[#0E1015]/95 backdrop-blur-md px-3 py-2.5 transition-transform">
      <div className="flex items-center justify-between gap-2">
        {/* Hours & Info button */}
        <button
          onClick={() => setIsInfoOpen(true)}
          className="flex flex-col items-center justify-center p-1.5 text-[10px] text-[#A6A195] hover:text-white"
        >
          <Clock className="h-4 w-4 mb-0.5 text-[#C87D55]" />
          <span>Horario</span>
        </button>

        {/* Maps Location button */}
        <a
          href={restaurantConfig.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-1.5 text-[10px] text-[#A6A195] hover:text-white"
        >
          <MapPin className="h-4 w-4 mb-0.5 text-[#C87D55]" />
          <span>Ubicación</span>
        </a>

        {/* WhatsApp Direct button */}
        <button
          onClick={handleWhatsApp}
          className="flex flex-col items-center justify-center p-1.5 text-[10px] text-[#A6A195] hover:text-[#25D366]"
        >
          <MessageCircle className="h-4 w-4 mb-0.5 text-[#25D366]" />
          <span>WhatsApp</span>
        </button>

        {/* Primary Cart CTA Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex-1 ml-2 flex items-center justify-between rounded-xl bg-[#C87D55] hover:bg-[#B76F48] px-4 py-2.5 text-xs font-semibold text-[#0E1013] shadow-md active:scale-95 transition-all"
        >
          <div className="flex items-center gap-1.5">
            <ShoppingBag className="h-4 w-4" />
            <span>Ver pedido</span>
            {cartTotalCount > 0 && (
              <span className="rounded-full bg-[#0E1013] text-white px-1.5 py-0.2 text-[10px] font-bold tabular-nums">
                {cartTotalCount}
              </span>
            )}
          </div>
          <span className="font-mono font-bold tabular-nums">
            ${cartTotal.toFixed(2)}
          </span>
        </button>
      </div>
    </div>
  );
};
