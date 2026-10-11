import React from 'react';
import { ArrowDown, Flame, Waves, Clock, MapPin, MessageCircle } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const HeroSection: React.FC = () => {
  const { restaurantConfig, setIsInfoOpen, setIsCartOpen } = useRestaurant();

  const handleWhatsAppDirect = () => {
    const cleanNumber = restaurantConfig.whatsappNumber.replace(/[^0-9]/g, '');
    const greeting = encodeURIComponent(
      '¡Hola Brasa & Mar! Deseo consultar sobre la carta y disponibilidad para hacer un pedido.'
    );
    window.open(`https://wa.me/${cleanNumber}?text=${greeting}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="inicio" className="relative w-full overflow-hidden bg-[#0B0C0E] pt-2 pb-10 sm:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Hero Container */}
        <div className="relative overflow-hidden rounded-2xl border border-[#232732] bg-[#12151B]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[480px] sm:min-h-[520px]">
            {/* Left Content Column */}
            <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-10 lg:p-12 z-10">
              <div className="space-y-4">
                {/* Clean unboxed editorial kicker */}
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C87D55] font-semibold">
                  <Flame className="h-3.5 w-3.5 text-[#C87D55]" />
                  <span>Fuego de Encina</span>
                  <span className="text-[#4E5463]" aria-hidden="true">·</span>
                  <Waves className="h-3.5 w-3.5 text-[#88B8C8]" />
                  <span>Pesca del Día</span>
                </div>

                {/* Primary Headline with balanced wrap */}
                <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#F6F4EE] leading-[1.15] text-balance">
                  El fuego del carbón. <br />
                  <span className="italic text-[#EAE6DD] font-light">La pureza del mar.</span>
                </h1>

                {/* Narrative subtext */}
                <p className="max-w-xl text-sm sm:text-base text-[#AEA99E] leading-relaxed">
                  Alta cocina contemporánea en las costas. Pescados y mariscos salvajes se fusionan
                  con cortes de res madurados al carbón, ahumados lentos y maridajes de autor.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-4 border-t border-[#232732] flex flex-wrap items-center gap-3.5">
                <a
                  href="#carta"
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#C87D55] hover:bg-[#B76F48] px-6 py-3 text-sm font-semibold text-[#0E1013] transition-all shadow-md shadow-[#C87D55]/15"
                >
                  <span>Explorar Menú</span>
                  <ArrowDown className="h-4 w-4" />
                </a>

                <a
                  href="#promociones"
                  className="flex items-center justify-center rounded-lg border border-[#303542] hover:border-[#C87D55]/50 bg-[#171A21] hover:bg-[#1D212A] px-5 py-3 text-sm font-medium text-[#E4DFD5] transition-all"
                >
                  Ver Promociones
                </a>

                <button
                  onClick={handleWhatsAppDirect}
                  className="flex items-center justify-center gap-1.5 text-xs text-[#9FA6B3] hover:text-[#25D366] transition-colors py-2 px-1"
                  title="Abrir chat de WhatsApp"
                >
                  <MessageCircle className="h-4 w-4 text-[#25D366]" />
                  <span>WhatsApp directo</span>
                </button>
              </div>
            </div>

            {/* Right Hero Image Column */}
            <div className="relative lg:col-span-6 min-h-[300px] lg:min-h-full">
              <div className="relative h-full w-full overflow-hidden">
                <img
                  src="/src/assets/images/hero_brasa_grill_1791739490337.jpg"
                  alt="Gastronomía a la brasa con langosta, camarones y corte prime"
                  className="h-full w-full object-cover object-center filter brightness-95"
                  referrerPolicy="no-referrer"
                />
                {/* Subtle gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#12151B] via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12151B] via-transparent to-transparent lg:hidden opacity-90" />

                {/* Floating gastronomic caption */}
                <div className="absolute bottom-4 right-4 max-w-xs rounded-lg border border-[#2B2F3B] bg-[#0E1013]/85 p-3 backdrop-blur-md hidden sm:block">
                  <p className="font-serif-display text-xs italic text-[#F6F4EE]">
                    «La cocina del mar encuentra su cumbre cuando el fuego la acaricia.»
                  </p>
                  <p className="mt-1 text-[11px] text-[#A69E90]">
                    Parrilla de quebracho &amp; encina · Selección del día
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Point Restaurant Context Strip (Full Width below hero) */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Item 1: Hours */}
          <button
            onClick={() => setIsInfoOpen(true)}
            className="flex items-start gap-3 rounded-xl border border-[#222630] bg-[#14171E] p-3.5 text-left transition-colors hover:border-[#C87D55]/30 hover:bg-[#181C25]"
          >
            <div className="rounded-lg bg-[#1B202A] p-2 text-[#C87D55] shrink-0">
              <Clock className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#E7E3D8]">Horario de Servicio</p>
              <p className="mt-0.5 truncate text-[11px] text-[#9D988E]">
                Mar a Dom · 12:30 a 23:30 (Cocina activa)
              </p>
            </div>
          </button>

          {/* Item 2: Location with map link */}
          <a
            href={restaurantConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 rounded-xl border border-[#222630] bg-[#14171E] p-3.5 text-left transition-colors hover:border-[#C87D55]/30 hover:bg-[#181C25]"
          >
            <div className="rounded-lg bg-[#1B202A] p-2 text-[#C87D55] shrink-0">
              <MapPin className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#E7E3D8]">Ubicación &amp; Salón</p>
              <p className="mt-0.5 truncate text-[11px] text-[#9D988E]">
                {restaurantConfig.address}
              </p>
            </div>
          </a>

          {/* Item 3: Order Modes */}
          <div className="flex items-start gap-3 rounded-xl border border-[#222630] bg-[#14171E] p-3.5 text-left">
            <div className="rounded-lg bg-[#1B202A] p-2 text-[#C87D55] shrink-0">
              <Flame className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#E7E3D8]">Modalidades de Pedido</p>
              <p className="mt-0.5 text-[11px] text-[#9D988E]">
                Mesa en Salón · Retiro · Entrega a domicilio
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
