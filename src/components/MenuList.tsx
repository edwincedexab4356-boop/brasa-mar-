import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { DishCard } from './DishCard';
import { UtensilsCrossed, RotateCcw } from 'lucide-react';
import { CategoryId } from '../types';

export const MenuList: React.FC = () => {
  const {
    dishes,
    categories,
    activeCategory,
    searchQuery,
    setSearchQuery,
    dietaryFilter,
    setDietaryFilter,
  } = useRestaurant();

  // Filter dishes by search and dietary requirements
  const filteredDishes = dishes.filter((dish) => {
    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const nameMatch = dish.name.toLowerCase().includes(q);
      const descMatch = dish.description.toLowerCase().includes(q);
      const ingMatch = dish.ingredients.some((i) => i.toLowerCase().includes(q));
      if (!nameMatch && !descMatch && !ingMatch) return false;
    }

    // 2. Dietary Filter
    if (dietaryFilter !== 'all') {
      if (!dish.dietary || !dish.dietary.includes(dietaryFilter)) {
        return false;
      }
    }

    // 3. Category Filter
    if (activeCategory !== 'all') {
      if (dish.categoryId !== activeCategory) return false;
    }

    return true;
  });

  // Group dishes by category if "all" is active, or show single category
  const categoriesToRender =
    activeCategory === 'all'
      ? categories
      : categories.filter((c) => c.id === activeCategory);

  const hasAnyResults = filteredDishes.length > 0;

  const handleResetFilters = () => {
    setSearchQuery('');
    setDietaryFilter('all');
  };

  return (
    <section id="carta" className="w-full py-12 sm:py-16 bg-[#0B0C0E]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Empty State */}
        {!hasAnyResults && (
          <div className="rounded-2xl border border-[#232732] bg-[#12151D] p-12 text-center max-w-md mx-auto my-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1A1E29] text-[#C87D55] mb-4">
              <UtensilsCrossed className="h-6 w-6" />
            </div>
            <h3 className="font-serif-display text-xl font-medium text-[#F6F4EE]">
              No encontramos platos con estos criterios
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#9E988D] leading-relaxed">
              Prueba buscando por otro término como "pulpo", "res", "ceviche" o restablece los
              filtros dietéticos.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#C87D55] hover:bg-[#B76F48] px-5 py-2.5 text-xs font-semibold text-[#0E1013] transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Ver toda la carta</span>
            </button>
          </div>
        )}

        {/* Grouped Categories */}
        {hasAnyResults && (
          <div className="space-y-16">
            {categoriesToRender.map((category) => {
              const categoryDishes = filteredDishes.filter(
                (d) => d.categoryId === category.id
              );

              if (categoryDishes.length === 0) return null;

              return (
                <div key={category.id} id={`cat-${category.id}`} className="scroll-mt-32 space-y-6">
                  {/* Category Section Header */}
                  <div className="border-b border-[#232733] pb-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <div>
                      <h3 className="font-serif-display text-2xl sm:text-3xl font-normal text-[#F6F4EE]">
                        {category.name}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-[#9E988D]">
                        {category.description}
                      </p>
                    </div>

                    <span className="text-xs text-[#C87D55] font-mono tabular-nums shrink-0">
                      {categoryDishes.length} {categoryDishes.length === 1 ? 'plato' : 'platos'}
                    </span>
                  </div>

                  {/* Dishes Grid: 3 cols desktop, 2 cols tablet, 1 col mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryDishes.map((dish) => (
                      <DishCard key={dish.id} dish={dish} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
