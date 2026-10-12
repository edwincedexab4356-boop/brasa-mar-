import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, Flame, AlertCircle, ShoppingBag } from 'lucide-react';
import { Dish, ExtraOption, SelectedVariant } from '../types';
import { useRestaurant } from '../context/RestaurantContext';
import { getSafeDishImage } from '../utils/imageRegistry';

interface DishDetailModalProps {
  dish: Dish | null;
  onClose: () => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({ dish, onClose }) => {
  const { addToCart } = useRestaurant();

  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<SelectedVariant[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<ExtraOption[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [imgError, setImgError] = useState(false);

  // Initialize defaults whenever dish changes
  useEffect(() => {
    if (!dish) return;

    setQuantity(1);
    setSpecialInstructions('');
    setSelectedExtras([]);
    setImgError(false);

    // Auto-select first option for required variant groups
    if (dish.variants && dish.variants.length > 0) {
      const initial: SelectedVariant[] = dish.variants.map((group) => {
        const defaultOption = group.options[0];
        return {
          groupId: group.id,
          groupTitle: group.title,
          optionId: defaultOption.id,
          optionName: defaultOption.name,
          priceModifier: defaultOption.priceModifier,
        };
      });
      setSelectedVariants(initial);
    } else {
      setSelectedVariants([]);
    }
  }, [dish]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!dish) return null;

  const handleVariantSelect = (
    groupId: string,
    groupTitle: string,
    optionId: string,
    optionName: string,
    priceModifier: number
  ) => {
    setSelectedVariants((prev) => {
      const filtered = prev.filter((v) => v.groupId !== groupId);
      return [
        ...filtered,
        { groupId, groupTitle, optionId, optionName, priceModifier },
      ];
    });
  };

  const handleToggleExtra = (extra: ExtraOption) => {
    setSelectedExtras((prev) => {
      const exists = prev.some((e) => e.id === extra.id);
      if (exists) {
        return prev.filter((e) => e.id !== extra.id);
      } else {
        return [...prev, extra];
      }
    });
  };

  // Calculate dynamic unit price and total price
  const variantsSum = selectedVariants.reduce((sum, v) => sum + v.priceModifier, 0);
  const extrasSum = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const unitPrice = dish.price + variantsSum + extrasSum;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    addToCart(dish, quantity, selectedVariants, selectedExtras, specialInstructions);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#07080A]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-[#2B2F3C] bg-[#12151C] shadow-2xl transition-all my-auto max-h-[90vh] flex flex-col">
        {/* Header / Close button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-[#0E1013]/80 text-[#D8D4CB] hover:bg-[#1B1E27] hover:text-white transition-colors"
          aria-label="Cerrar detalle"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Scrollable container */}
        <div className="overflow-y-auto flex-1 no-scrollbar">
          {/* Hero Image */}
          <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-[#181C26]">
            <img
              src={
                imgError
                  ? getSafeDishImage(dish.id, '', dish.categoryId)
                  : getSafeDishImage(dish.id, dish.image, dish.categoryId)
              }
              alt={dish.name}
              onError={() => {
                if (!imgError) setImgError(true);
              }}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-center filter brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#12151C] via-[#12151C]/30 to-transparent" />

            {/* Base tags in image */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[#C87D55] font-semibold">
                {dish.isSpecialty ? 'Plato Insignia' : 'Selección Gastronómica'}
              </span>
              <span className="font-mono text-xl sm:text-2xl font-bold text-[#F6F4EE] tabular-nums">
                ${unitPrice.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Dish Details Body */}
          <div className="p-5 sm:p-7 space-y-6">
            <div>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-medium text-[#F6F4EE]">
                {dish.name}
              </h2>
              <p className="mt-2 text-sm text-[#B4AEA3] leading-relaxed">
                {dish.description}
              </p>
            </div>

            {/* Ingredients block */}
            <div className="rounded-xl border border-[#232733] bg-[#161922] p-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C87D55]">
                Ingredientes Principales
              </h4>
              <p className="mt-1.5 text-xs text-[#D8D4CB] leading-relaxed">
                {dish.ingredients.join(' · ')}
              </p>

              {/* Allergens only when specified */}
              {dish.allergens && dish.allergens.length > 0 && (
                <div className="mt-3 pt-3 border-t border-[#232733] flex items-center gap-2 text-xs text-[#E5A88B]">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>Alérgenos presentes: <strong>{dish.allergens.join(', ')}</strong></span>
                </div>
              )}
            </div>

            {/* Variants options (e.g. Cooking temperature, portion size) */}
            {dish.variants && dish.variants.length > 0 && (
              <div className="space-y-4">
                {dish.variants.map((group) => {
                  const currentSelected = selectedVariants.find((v) => v.groupId === group.id);
                  return (
                    <div key={group.id} className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold uppercase tracking-wider text-[#E8E4DA]">
                          {group.title}
                        </label>
                        {group.required && (
                          <span className="text-[11px] text-[#A6A093]">Obligatorio</span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {group.options.map((opt) => {
                          const isSelected = currentSelected?.optionId === opt.id;
                          return (
                            <button
                              type="button"
                              key={opt.id}
                              onClick={() =>
                                handleVariantSelect(
                                  group.id,
                                  group.title,
                                  opt.id,
                                  opt.name,
                                  opt.priceModifier
                                )
                              }
                              className={`flex items-center justify-between rounded-xl border p-3 text-left transition-all ${
                                isSelected
                                  ? 'border-[#C87D55] bg-[#221B16] text-[#F6F4EE]'
                                  : 'border-[#262A35] bg-[#151820] text-[#B5B0A4] hover:bg-[#1A1D27]'
                              }`}
                            >
                              <span className="text-xs font-medium">{opt.name}</span>
                              {opt.priceModifier > 0 && (
                                <span className="font-mono text-xs font-semibold text-[#E0946B]">
                                  +${opt.priceModifier.toFixed(2)}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Extras options */}
            {dish.extras && dish.extras.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#E8E4DA]">
                    Extras &amp; Personalización Opcional
                  </label>
                  <span className="text-[11px] text-[#A6A093]">Selección múltiple</span>
                </div>

                <div className="space-y-2">
                  {dish.extras.map((extra) => {
                    const isChecked = selectedExtras.some((e) => e.id === extra.id);
                    return (
                      <button
                        type="button"
                        key={extra.id}
                        onClick={() => handleToggleExtra(extra)}
                        className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all ${
                          isChecked
                            ? 'border-[#C87D55] bg-[#221B16] text-[#F6F4EE]'
                            : 'border-[#262A35] bg-[#151820] text-[#B5B0A4] hover:bg-[#1A1D27]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
                              isChecked
                                ? 'border-[#C87D55] bg-[#C87D55] text-[#0E1013]'
                                : 'border-[#3D4250] bg-transparent'
                            }`}
                          >
                            {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                          </div>
                          <span className="text-xs font-medium">{extra.name}</span>
                        </div>
                        <span className="font-mono text-xs font-semibold text-[#E0946B]">
                          +${extra.price.toFixed(2)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special kitchen instructions */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#E8E4DA]">
                Instrucciones para la Cocina (Opcional)
              </label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Ej. Sin cebolla en el ceviche, salsa servida al lado, aderezo ligero..."
                rows={2}
                className="w-full rounded-xl border border-[#2B2F3C] bg-[#151820] p-3 text-xs sm:text-sm text-[#F6F4EE] placeholder-[#79746A] focus:border-[#C87D55] focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Modal Bottom Sticky Action Bar */}
        <div className="border-t border-[#262A36] bg-[#0F1117] p-4 sm:p-5 flex items-center justify-between gap-4">
          {/* Quantity stepper */}
          <div className="flex items-center rounded-xl border border-[#2B2F3C] bg-[#151821] p-1">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#AEA99E] hover:bg-[#1F232D] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-9 text-center font-mono text-sm font-bold text-[#F6F4EE] tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#AEA99E] hover:bg-[#1F232D] hover:text-white transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Add to order CTA */}
          <button
            type="button"
            disabled={!dish.available}
            onClick={handleAdd}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 px-5 text-sm font-semibold transition-all shadow-md ${
              !dish.available
                ? 'bg-[#1F232C] text-[#636875] cursor-not-allowed'
                : 'bg-[#C87D55] text-[#0E1013] hover:bg-[#B76F48] shadow-[#C87D55]/20 active:scale-[0.99]'
            }`}
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Añadir al pedido</span>
            <span className="font-mono font-bold border-l border-[#0E1013]/25 pl-2 tabular-nums">
              ${totalPrice.toFixed(2)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
