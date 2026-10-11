import React from 'react';
import { Flame, Sparkles, ArrowRight } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { DishCard } from './DishCard';

export const FeaturedDishes: React.FC = () => {
  const { dishes } = useRestaurant();

  // Find popular or specialty dishes
  const featured = dishes.filter((d) => d.isSpecialty || d.isPopular).slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <section id="destacados" className="w-full py-12 sm:py-16 bg-[#0B0C0E]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C87D55]">
              <Flame className="h-3.5 w-3.5" />
              <span>Selección del Chef</span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-normal text-[#F6F4EE] mt-1.5">
              Platos Insignia &amp; Más Populares
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#9E988D] leading-relaxed">
            Las creaciones más aclamadas de nuestra cocina: maduración artesanal al carbón y la
            frescura sublime de la pesca costera.
          </p>
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      </div>
    </section>
  );
};
