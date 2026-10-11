import React from 'react';
import { Search, X, Tag, Sparkles } from 'lucide-react';
import { CategoryId, DietaryBadge } from '../types';
import { useRestaurant } from '../context/RestaurantContext';

export const CategoryNav: React.FC = () => {
  const {
    categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    dietaryFilter,
    setDietaryFilter,
  } = useRestaurant();

  const dietaryOptions: { id: DietaryBadge | 'all'; label: string }[] = [
    { id: 'all', label: 'Toda la carta' },
    { id: 'seafood', label: 'Mariscos & Pesca' },
    { id: 'meat', label: 'Carnes a la brasa' },
    { id: 'gluten-free', label: 'Sin Gluten' },
    { id: 'vegetarian', label: 'Vegetariano' },
  ];

  return (
    <div className="sticky top-[57px] z-30 w-full border-b border-[#232732] bg-[#0E1013]/95 backdrop-blur-md transition-all py-3">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-3">
        {/* Top line: Search and quick count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C887E]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por plato, ingrediente (pulpo, trufa, ribeye)..."
              className="w-full rounded-xl border border-[#2B2F3B] bg-[#14171E] py-2 pl-10 pr-9 text-xs sm:text-sm text-[#F6F4EE] placeholder-[#807B71] focus:border-[#C87D55] focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C887E] hover:text-[#F6F4EE]"
                title="Limpiar búsqueda"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Dietary toggle buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            {dietaryOptions.map((opt) => {
              const isActive = dietaryFilter === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setDietaryFilter(opt.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'bg-[#29221C] text-[#E0946B] border border-[#C87D55]/50'
                      : 'border border-[#262A34] bg-[#13161C] text-[#9D988E] hover:text-[#F6F4EE] hover:bg-[#1A1D25]'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories Tab Strip */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => setActiveCategory('all')}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-all ${
              activeCategory === 'all'
                ? 'bg-[#C87D55] text-[#0E1013] font-semibold shadow-sm'
                : 'bg-[#151820] text-[#B8B3A8] hover:bg-[#1D212B] hover:text-[#F6F4EE] border border-[#242833]'
            }`}
          >
            <span>Todos los Platos</span>
          </button>

          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? 'bg-[#C87D55] text-[#0E1013] font-semibold shadow-sm'
                    : 'bg-[#151820] text-[#B8B3A8] hover:bg-[#1D212B] hover:text-[#F6F4EE] border border-[#242833]'
                }`}
              >
                {cat.id === 'promociones' && <Tag className="h-3.5 w-3.5 text-inherit" />}
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
