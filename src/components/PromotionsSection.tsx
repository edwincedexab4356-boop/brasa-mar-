import React from 'react';
import { Tag, Sparkles, ArrowRight } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { Promotion } from '../types';
import { IMAGES } from '../utils/imageRegistry';

export const PromotionsSection: React.FC = () => {
  const { promotions, setIsCartOpen, sendWhatsAppOrder, setSelectedDishForDetail, dishes } =
    useRestaurant();

  const activePromos = promotions.filter((p) => p.active);

  if (activePromos.length === 0) return null;

  return (
    <section id="promociones" className="w-full py-10 bg-[#0E1015] border-y border-[#20242E]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C87D55]">
              <Tag className="h-3.5 w-3.5" />
              <span>Experiencias &amp; Maridajes</span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-medium text-[#F6F4EE] mt-1">
              Promociones Destacadas
            </h2>
          </div>
          <p className="text-xs text-[#9E988D] max-w-md">
            Combinaciones pensadas por nuestro chef para disfrutar el contraste perfecto entre el
            fuego y el océano.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {activePromos.map((promo) => (
            <div
              key={promo.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#272B36] bg-[#141720] hover:border-[#C87D55]/40 transition-all"
            >
              {/* Media */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#1B1F2A]">
                <img
                  src={promo.image || IMAGES.hero}
                  alt={promo.title}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = IMAGES.hero;
                  }}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141720] via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="rounded bg-[#C87D55] px-2.5 py-1 text-xs font-bold text-[#0E1013] shadow-md">
                    {promo.discountBadge}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
                <div>
                  <h3 className="font-serif-display text-lg font-medium text-[#F6F4EE] leading-snug">
                    {promo.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-[#AEA99E] leading-relaxed">
                    {promo.subtitle}
                  </p>
                  <p className="mt-2 text-[11px] text-[#7A756B] italic">{promo.terms}</p>
                </div>

                <div className="pt-3 border-t border-[#232733] flex items-center justify-between">
                  {promo.priceNow ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-[#7A756B] line-through tabular-nums">
                        ${promo.priceBefore?.toFixed(2)}
                      </span>
                      <span className="font-mono text-lg font-bold text-[#E5986C] tabular-nums">
                        ${promo.priceNow.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-[#C87D55] font-semibold">Valor Especial</span>
                  )}

                  <a
                    href="#carta"
                    className="flex items-center gap-1 text-xs font-semibold text-[#F6F4EE] hover:text-[#C87D55] transition-colors"
                  >
                    <span>Ver en carta</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
