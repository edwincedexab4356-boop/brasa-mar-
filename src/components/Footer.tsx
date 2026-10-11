import React from 'react';
import { Flame, Waves, MapPin, Clock, Phone, MessageCircle, SlidersHorizontal } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const Footer: React.FC = () => {
  const { restaurantConfig, setIsInfoOpen, setIsAdminOpen } = useRestaurant();

  return (
    <footer className="w-full border-t border-[#232733] bg-[#0A0B0E] text-[#B5B0A4] text-xs pt-12 pb-24 sm:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-3 md:col-span-1">
            <span className="font-serif-display text-xl font-medium text-[#F6F4EE] block tracking-wide">
              BRASA <span className="text-[#C87D55]">&amp;</span> MAR
            </span>
            <p className="text-xs text-[#959084] leading-relaxed">
              {restaurantConfig.tagline}
            </p>
            <p className="text-[11px] text-[#7A756B] leading-relaxed">
              Especialistas en mariscos y pescados salvajes del Pacífico fusionados con cortes de
              res a las brasas de encina.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-semibold uppercase tracking-wider text-[#E8E4DA] text-xs">
              Carta Digital
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#carta" className="hover:text-[#F6F4EE] transition-colors">
                  Ceviches &amp; Mariscos
                </a>
              </li>
              <li>
                <a href="#carta" className="hover:text-[#F6F4EE] transition-colors">
                  Carnes a la Brasa
                </a>
              </li>
              <li>
                <a href="#destacados" className="hover:text-[#F6F4EE] transition-colors">
                  Selección del Chef
                </a>
              </li>
              <li>
                <a href="#promociones" className="hover:text-[#F6F4EE] transition-colors">
                  Maridajes &amp; Promociones
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Service Hours & Location */}
          <div className="space-y-3">
            <h4 className="font-semibold uppercase tracking-wider text-[#E8E4DA] text-xs">
              Visítanos
            </h4>
            <p className="text-[#959084]">
              {restaurantConfig.address}
            </p>
            <div className="flex flex-col gap-1.5 pt-1">
              <a
                href={restaurantConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C87D55] hover:underline"
              >
                Abrir en Google Maps &rarr;
              </a>
              <button
                onClick={() => setIsInfoOpen(true)}
                className="text-left text-[#C87D55] hover:underline"
              >
                Consultar turnos y horarios &rarr;
              </button>
            </div>
          </div>

          {/* Col 4: Contacts & Demo Panel */}
          <div className="space-y-3">
            <h4 className="font-semibold uppercase tracking-wider text-[#E8E4DA] text-xs">
              Atención &amp; Pedidos
            </h4>
            <p className="text-[#959084]">
              Teléfono: {restaurantConfig.phone}
            </p>
            <p className="text-[#959084]">
              WhatsApp: +{restaurantConfig.whatsappNumber}
            </p>

            <div className="pt-2">
              <button
                onClick={() => setIsAdminOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#2B303E] bg-[#141720] px-3 py-1.5 text-xs text-[#A8A397] hover:text-[#F6F4EE] hover:border-[#C87D55]/50 transition-colors"
              >
                <SlidersHorizontal className="h-3 w-3 text-[#C87D55]" />
                <span>Modo Restaurante (Admin)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright and legal statement */}
        <div className="border-t border-[#1C202B] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#736E64]">
          <p>
            &copy; {new Date().getFullYear()} BRASA &amp; MAR Restaurant. Todos los derechos reservados.
          </p>
          <p>
            Menú Digital Gastronómico interactivo · Diseñado con tipografía editorial y fotografía real.
          </p>
        </div>
      </div>
    </footer>
  );
};
