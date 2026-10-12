import React, { useState } from 'react';
import { Plus, Eye, Flame, AlertCircle } from 'lucide-react';
import { Dish } from '../types';
import { useRestaurant } from '../context/RestaurantContext';
import { getSafeDishImage } from '../utils/imageRegistry';

interface DishCardProps {
  dish: Dish;
}

export const DishCard: React.FC<DishCardProps> = ({ dish }) => {
  const { setSelectedDishForDetail, addToCart } = useRestaurant();
  const [imgError, setImgError] = useState(false);

  const displayImage = imgError
    ? getSafeDishImage(dish.id, '', dish.categoryId)
    : getSafeDishImage(dish.id, dish.image, dish.categoryId);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // If the dish has required variants or customizable extras, open detail modal instead
    const hasRequiredVariants = dish.variants?.some((v) => v.required);
    if (hasRequiredVariants || (dish.extras && dish.extras.length > 0)) {
      setSelectedDishForDetail(dish);
    } else {
      addToCart(dish, 1, [], []);
    }
  };

  return (
    <article
      onClick={() => setSelectedDishForDetail(dish)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-[#232732] bg-[#14171E] transition-all hover:border-[#C87D55]/40 hover:bg-[#181C25] cursor-pointer"
    >
      {/* Visual media slot */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1D212B]">
        <img
          src={displayImage}
          alt={dish.name}
          onError={() => {
            if (!imgError) setImgError(true);
          }}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 filter brightness-95"
        />

        {/* Subtle top indicator - clean unboxed or singular availability badge */}
        {!dish.available && (
          <div className="absolute inset-0 bg-[#0E1013]/70 backdrop-blur-[2px] flex items-center justify-center">
            <span className="rounded bg-[#2B1B18] border border-[#7D2D20] px-3 py-1 text-xs font-semibold text-[#FF9E90]">
              Agotado hoy
            </span>
          </div>
        )}

        {dish.available && dish.isSpecialty && (
          <div className="absolute top-2.5 left-2.5">
            <span className="rounded bg-[#0B0C0E]/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase text-[#E5986C] border border-[#C87D55]/30">
              Especialidad
            </span>
          </div>
        )}

        {dish.available && dish.isNew && !dish.isSpecialty && (
          <div className="absolute top-2.5 left-2.5">
            <span className="rounded bg-[#0B0C0E]/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase text-[#88B8C8] border border-[#88B8C8]/30">
              Novedad
            </span>
          </div>
        )}

        {/* Quick detail overlay hint */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center gap-1 rounded bg-[#0E1013]/80 px-2 py-1 text-[11px] text-[#D8D4CA] backdrop-blur-sm">
          <Eye className="h-3 w-3 text-[#C87D55]" />
          <span>Ver detalle</span>
        </div>
      </div>

      {/* Content & Metadata */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          {/* Unboxed metadata line */}
          <div className="flex items-center justify-between text-xs text-[#9B968B] mb-1.5">
            <span className="uppercase tracking-wider text-[11px] font-medium text-[#C87D55]">
              {dish.isPopular ? 'Plato Popular' : 'Cocina de Autor'}
            </span>
            {dish.dietary && dish.dietary.includes('gluten-free') && (
              <span className="text-[11px] text-[#A6A298]">Sin Gluten</span>
            )}
          </div>

          {/* Dish title & price row */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-serif-display text-base sm:text-lg font-medium text-[#F6F4EE] group-hover:text-[#FBF9F5] transition-colors leading-snug">
              {dish.name}
            </h3>
            <span className="font-mono text-base font-bold text-[#E5986C] tabular-nums shrink-0">
              ${dish.price.toFixed(2)}
            </span>
          </div>

          {/* Description */}
          <p className="mt-2 text-xs sm:text-sm text-[#A8A398] line-clamp-2 leading-relaxed">
            {dish.description}
          </p>

          {/* Honest Allergen list ONLY when present */}
          {dish.allergens && dish.allergens.length > 0 && (
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#8E8A80]">
              <span className="font-medium text-[#7C786E]">Contiene:</span>
              <span className="italic">{dish.allergens.join(', ')}</span>
            </div>
          )}
        </div>

        {/* Bottom card CTA */}
        <div className="mt-4 pt-3 border-t border-[#232732] flex items-center justify-between gap-2">
          <span className="text-xs text-[#8E897F]">
            {dish.variants && dish.variants.length > 0
              ? 'Con opciones personalizables'
              : 'Preparación fresca al momento'}
          </span>

          <button
            type="button"
            disabled={!dish.available}
            onClick={handleQuickAdd}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              !dish.available
                ? 'bg-[#1F232C] text-[#636875] cursor-not-allowed'
                : 'bg-[#C87D55] text-[#0E1013] hover:bg-[#B76F48] shadow-sm active:scale-95'
            }`}
          >
            <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
            <span>Añadir</span>
          </button>
        </div>
      </div>
    </article>
  );
};
