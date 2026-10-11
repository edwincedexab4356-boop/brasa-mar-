import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  PlayCircle,
  UtensilsCrossed,
  ShoppingBag,
  Bike,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { OrderMode } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    deliveryFee,
    cartTotal,
    orderMode,
    setOrderMode,
    customerInfo,
    setCustomerInfo,
    restaurantConfig,
    sendWhatsAppOrder,
    submitDemoInternalOrder,
  } = useRestaurant();

  const [formError, setFormError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleModeChange = (mode: OrderMode) => {
    setOrderMode(mode);
    setFormError(null);
  };

  const validateOrder = (): boolean => {
    if (!customerInfo.name.trim()) {
      setFormError('Por favor ingresa tu nombre de contacto.');
      return false;
    }
    if (orderMode === 'delivery' && !customerInfo.deliveryAddress?.trim()) {
      setFormError('Por favor indica la dirección para el envío a domicilio.');
      return false;
    }
    setFormError(null);
    return true;
  };

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    if (!validateOrder()) return;
    sendWhatsAppOrder();
  };

  const handleDemoInternalCheckout = () => {
    if (cart.length === 0) return;
    if (!validateOrder()) return;
    submitDemoInternalOrder();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#07080A]/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <aside className="fixed inset-y-0 right-0 flex max-w-full pl-6">
        <div className="w-screen max-w-lg border-l border-[#262B37] bg-[#10131A] shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-[#232733] p-4 sm:p-5">
            <div className="flex items-center gap-2.5">
              <div className="rounded-lg bg-[#201814] border border-[#C87D55]/30 p-2 text-[#C87D55]">
                <ShoppingBag className="h-4 w-4" />
              </div>
              <div>
                <h2 className="font-serif-display text-lg font-medium text-[#F6F4EE]">
                  Tu Pedido
                </h2>
                <p className="text-xs text-[#9E9A8E]">
                  {cart.length === 0
                    ? 'No hay productos seleccionados'
                    : `${cart.reduce((a, b) => a + b.quantity, 0)} productos en total`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="rounded-lg p-2 text-xs text-[#948F82] hover:bg-[#1A1D27] hover:text-[#FF7F70] transition-colors"
                  title="Vaciar carrito"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-[#ABA599] hover:bg-[#1A1D27] hover:text-white transition-colors"
                aria-label="Cerrar pedido"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Drawer Content */}
          {cart.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
              <div className="rounded-full border border-[#2B303E] bg-[#151923] p-5 text-[#8D887D] mb-4">
                <UtensilsCrossed className="h-8 w-8 text-[#C87D55]" />
              </div>
              <h3 className="font-serif-display text-lg font-medium text-[#F6F4EE]">
                Tu carrito gastronómico está vacío
              </h3>
              <p className="mt-2 max-w-xs text-xs text-[#9C978A] leading-relaxed">
                Explora los cortes al carbón, ceviches frescos y cócteles de autor para armar tu
                experiencia en Brasa &amp; Mar.
              </p>
              <button
                onClick={onClose}
                className="mt-6 rounded-xl bg-[#C87D55] px-5 py-2.5 text-xs font-semibold text-[#0E1013] hover:bg-[#B76F48] transition-colors shadow-md"
              >
                Ver carta del restaurante
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6 no-scrollbar">
              {/* Order Mode Selector */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#D8D4CA] block mb-2">
                  Modalidad de consumo
                </label>
                <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-[#151822] border border-[#252A37]">
                  <button
                    type="button"
                    onClick={() => handleModeChange('dine-in')}
                    className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-lg text-xs font-medium transition-all ${
                      orderMode === 'dine-in'
                        ? 'bg-[#C87D55] text-[#0E1013] font-semibold shadow-sm'
                        : 'text-[#9E988C] hover:text-[#F6F4EE]'
                    }`}
                  >
                    <UtensilsCrossed className="h-4 w-4 mb-1" />
                    <span className="truncate">En el local</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleModeChange('takeout')}
                    className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-lg text-xs font-medium transition-all ${
                      orderMode === 'takeout'
                        ? 'bg-[#C87D55] text-[#0E1013] font-semibold shadow-sm'
                        : 'text-[#9E988C] hover:text-[#F6F4EE]'
                    }`}
                  >
                    <ShoppingBag className="h-4 w-4 mb-1" />
                    <span className="truncate">Para retirar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleModeChange('delivery')}
                    className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-lg text-xs font-medium transition-all ${
                      orderMode === 'delivery'
                        ? 'bg-[#C87D55] text-[#0E1013] font-semibold shadow-sm'
                        : 'text-[#9E988C] hover:text-[#F6F4EE]'
                    }`}
                  >
                    <Bike className="h-4 w-4 mb-1" />
                    <span className="truncate">A domicilio</span>
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#D8D4CA]">
                    Platos seleccionados ({cart.length})
                  </span>
                </div>

                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="rounded-xl border border-[#232835] bg-[#141822] p-3.5 space-y-3"
                    >
                      <div className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="h-16 w-16 rounded-lg object-cover bg-[#1B1F2A] shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-serif-display text-sm font-medium text-[#F6F4EE] leading-snug">
                              {item.name}
                            </h4>
                            <span className="font-mono text-xs font-bold text-[#E5986C] tabular-nums shrink-0">
                              ${item.totalPrice.toFixed(2)}
                            </span>
                          </div>

                          {/* Variants breakdown */}
                          {item.selectedVariants.length > 0 && (
                            <div className="mt-1 space-y-0.5 text-[11px] text-[#A6A092]">
                              {item.selectedVariants.map((v) => (
                                <p key={v.groupId}>
                                  <span className="text-[#847F74]">{v.groupTitle}:</span> {v.optionName}
                                  {v.priceModifier > 0 && ` (+$${v.priceModifier.toFixed(2)})`}
                                </p>
                              ))}
                            </div>
                          )}

                          {/* Extras breakdown */}
                          {item.selectedExtras.length > 0 && (
                            <div className="mt-1 text-[11px] text-[#C87D55]">
                              + {item.selectedExtras.map((e) => e.name).join(', ')}
                            </div>
                          )}

                          {/* Notes */}
                          {item.specialInstructions && (
                            <p className="mt-1 text-[11px] italic text-[#9B9589]">
                              Nota: «{item.specialInstructions}»
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Quantity stepper & delete */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#1F2330]">
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="flex items-center gap-1 text-[11px] text-[#8C877A] hover:text-[#FF7F70] transition-colors"
                        >
                          <Trash2 className="h-3 w-3" />
                          <span>Eliminar</span>
                        </button>

                        <div className="flex items-center rounded-lg border border-[#2B303F] bg-[#181C26] p-0.5">
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                            className="flex h-6 w-6 items-center justify-center rounded text-[#ABA598] hover:bg-[#222736] hover:text-white"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-7 text-center font-mono text-xs font-bold text-[#F6F4EE] tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                            className="flex h-6 w-6 items-center justify-center rounded text-[#ABA598] hover:bg-[#222736] hover:text-white"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Contact Inputs */}
              <div className="space-y-3 rounded-xl border border-[#232835] bg-[#141822] p-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D8D4CA]">
                  Datos del cliente &amp; Entrega
                </h4>

                <div className="space-y-2.5">
                  <div>
                    <label className="text-[11px] text-[#A6A092] block mb-1">Nombre completo *</label>
                    <input
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) =>
                        setCustomerInfo((prev) => ({ ...prev, name: e.target.value }))
                      }
                      placeholder="Ej. Carlos Mendoza"
                      className="w-full rounded-lg border border-[#2B303F] bg-[#181C26] px-3 py-2 text-xs text-[#F6F4EE] placeholder-[#767167] focus:border-[#C87D55] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-[#A6A092] block mb-1">Teléfono / WhatsApp</label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) =>
                        setCustomerInfo((prev) => ({ ...prev, phone: e.target.value }))
                      }
                      placeholder="Ej. +1 555 123 4567"
                      className="w-full rounded-lg border border-[#2B303F] bg-[#181C26] px-3 py-2 text-xs text-[#F6F4EE] placeholder-[#767167] focus:border-[#C87D55] focus:outline-none"
                    />
                  </div>

                  {orderMode === 'dine-in' && (
                    <div>
                      <label className="text-[11px] text-[#A6A092] block mb-1">
                        Mesa o Salón (si ya estás en el restaurante)
                      </label>
                      <input
                        type="text"
                        value={customerInfo.tableOrRoom}
                        onChange={(e) =>
                          setCustomerInfo((prev) => ({ ...prev, tableOrRoom: e.target.value }))
                        }
                        placeholder="Ej. Mesa 4, Terraza B"
                        className="w-full rounded-lg border border-[#2B303F] bg-[#181C26] px-3 py-2 text-xs text-[#F6F4EE] placeholder-[#767167] focus:border-[#C87D55] focus:outline-none"
                      />
                    </div>
                  )}

                  {orderMode === 'delivery' && (
                    <>
                      <div>
                        <label className="text-[11px] text-[#A6A092] block mb-1">
                          Dirección de entrega *
                        </label>
                        <input
                          type="text"
                          value={customerInfo.deliveryAddress}
                          onChange={(e) =>
                            setCustomerInfo((prev) => ({ ...prev, deliveryAddress: e.target.value }))
                          }
                          placeholder="Calle, número, depto / edificio"
                          className="w-full rounded-lg border border-[#2B303F] bg-[#181C26] px-3 py-2 text-xs text-[#F6F4EE] placeholder-[#767167] focus:border-[#C87D55] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-[#A6A092] block mb-1">
                          Referencia de timbre o entrega
                        </label>
                        <input
                          type="text"
                          value={customerInfo.deliveryNotes}
                          onChange={(e) =>
                            setCustomerInfo((prev) => ({ ...prev, deliveryNotes: e.target.value }))
                          }
                          placeholder="Ej. Portón negro, tocar timbre 4B"
                          className="w-full rounded-lg border border-[#2B303F] bg-[#181C26] px-3 py-2 text-xs text-[#F6F4EE] placeholder-[#767167] focus:border-[#C87D55] focus:outline-none"
                        />
                      </div>
                    </>
                  )}
                </div>

                {formError && (
                  <p className="text-xs text-[#FF8575] bg-[#2E1A17] p-2 rounded-lg border border-[#7D2F22]">
                    {formError}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 rounded-xl border border-[#232835] bg-[#141822] p-4 text-xs">
                <div className="flex items-center justify-between text-[#B2ACA0]">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">${cartSubtotal.toFixed(2)}</span>
                </div>
                {orderMode === 'delivery' && (
                  <div className="flex items-center justify-between text-[#B2ACA0]">
                    <span>Costo de entrega (a domicilio)</span>
                    <span className="font-mono tabular-nums">${deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-2 border-t border-[#232835] text-sm font-semibold text-[#F6F4EE]">
                  <span>Total estimado</span>
                  <span className="font-mono text-base text-[#E5986C] tabular-nums">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Checkout Action Zone (Footer of Drawer) */}
          {cart.length > 0 && (
            <div className="border-t border-[#232733] bg-[#0E1016] p-4 sm:p-5 space-y-3">
              {/* Option A: WhatsApp Official Ordering */}
              <button
                type="button"
                onClick={handleWhatsAppCheckout}
                className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-[#25D366] hover:bg-[#20BE5B] px-4 py-3 text-sm font-semibold text-[#091E11] transition-all shadow-md active:scale-[0.99]"
              >
                <MessageCircle className="h-4 w-4 fill-current" />
                <span>Pedir por WhatsApp</span>
                <span className="font-mono font-bold text-xs border-l border-[#091E11]/30 pl-2 tabular-nums">
                  ${cartTotal.toFixed(2)}
                </span>
              </button>

              {/* Option B: Internal Demo Simulation */}
              <button
                type="button"
                onClick={handleDemoInternalCheckout}
                className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-[#373C4C] hover:border-[#C87D55]/60 bg-[#171B24] hover:bg-[#1E222E] px-4 py-2.5 text-xs sm:text-sm font-medium text-[#E4DFD5] transition-all"
              >
                <PlayCircle className="h-4 w-4 text-[#C87D55]" />
                <span>Registrar pedido interno de demostración</span>
              </button>

              <p className="text-[11px] text-center text-[#7F7B72] leading-tight">
                Número configurado: {restaurantConfig.phone} · Simulación segura
              </p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};
