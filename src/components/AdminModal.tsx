import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Check,
  RotateCcw,
  Sliders,
  Store,
  Tag,
  AlertCircle,
  Eye,
  EyeOff,
  Image as ImageIcon,
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { CategoryId, Dish, Promotion, RestaurantConfig } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const {
    dishes,
    categories,
    promotions,
    restaurantConfig,
    addDish,
    updateDish,
    deleteDish,
    toggleDishAvailability,
    updateRestaurantConfig,
    savePromotion,
    deletePromotion,
    resetToDefaultData,
  } = useRestaurant();

  const [activeTab, setActiveTab] = useState<'dishes' | 'restaurant' | 'promociones'>('dishes');
  const [filterCategory, setFilterCategory] = useState<CategoryId | 'all'>('all');

  // Dish edit/create state
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [isCreatingDish, setIsCreatingDish] = useState(false);
  const [dishFormData, setDishFormData] = useState({
    name: '',
    categoryId: 'ceviches-mariscos' as CategoryId,
    price: 20,
    description: '',
    image: '',
    ingredients: '',
    allergens: '',
    isPopular: false,
    isSpecialty: false,
    available: true,
  });

  // Restaurant config form state
  const [configForm, setConfigForm] = useState<RestaurantConfig>({ ...restaurantConfig });
  const [configSavedToast, setConfigSavedToast] = useState(false);

  // New promotion form
  const [editingPromo, setEditingPromo] = useState<Promotion | null>(null);
  const [promoForm, setPromoForm] = useState<Omit<Promotion, 'id'>>({
    title: '',
    subtitle: '',
    discountBadge: '',
    image: '',
    priceBefore: 0,
    priceNow: 0,
    terms: '',
    active: true,
  });
  const [isCreatingPromo, setIsCreatingPromo] = useState(false);

  if (!isOpen) return null;

  // Handlers for Dish Editor
  const openNewDishModal = () => {
    setDishFormData({
      name: '',
      categoryId: 'entradas',
      price: 18,
      description: '',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
      ingredients: 'Ingrediente 1, Ingrediente 2, Sal marina',
      allergens: '',
      isPopular: false,
      isSpecialty: false,
      available: true,
    });
    setEditingDish(null);
    setIsCreatingDish(true);
  };

  const openEditDishModal = (dish: Dish) => {
    setEditingDish(dish);
    setDishFormData({
      name: dish.name,
      categoryId: dish.categoryId,
      price: dish.price,
      description: dish.description,
      image: dish.image,
      ingredients: dish.ingredients.join(', '),
      allergens: dish.allergens ? dish.allergens.join(', ') : '',
      isPopular: !!dish.isPopular,
      isSpecialty: !!dish.isSpecialty,
      available: dish.available,
    });
    setIsCreatingDish(true);
  };

  const handleSaveDish = (e: React.FormEvent) => {
    e.preventDefault();
    const ingredientsArr = dishFormData.ingredients
      .split(',')
      .map((i) => i.trim())
      .filter(Boolean);

    const allergensArr = dishFormData.allergens
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean);

    if (editingDish) {
      updateDish({
        ...editingDish,
        name: dishFormData.name,
        categoryId: dishFormData.categoryId,
        price: Number(dishFormData.price),
        description: dishFormData.description,
        image: dishFormData.image,
        ingredients: ingredientsArr,
        allergens: allergensArr.length > 0 ? allergensArr : undefined,
        isPopular: dishFormData.isPopular,
        isSpecialty: dishFormData.isSpecialty,
        available: dishFormData.available,
      });
    } else {
      addDish({
        name: dishFormData.name,
        categoryId: dishFormData.categoryId,
        price: Number(dishFormData.price),
        description: dishFormData.description,
        image: dishFormData.image,
        ingredients: ingredientsArr,
        allergens: allergensArr.length > 0 ? allergensArr : undefined,
        isPopular: dishFormData.isPopular,
        isSpecialty: dishFormData.isSpecialty,
        available: dishFormData.available,
      });
    }
    setIsCreatingDish(false);
    setEditingDish(null);
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateRestaurantConfig(configForm);
    setConfigSavedToast(true);
    setTimeout(() => setConfigSavedToast(false), 3000);
  };

  const handleSavePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPromo) {
      savePromotion({
        ...editingPromo,
        ...promoForm,
      });
    } else {
      savePromotion({
        id: `promo-${Date.now()}`,
        ...promoForm,
      });
    }
    setIsCreatingPromo(false);
    setEditingPromo(null);
  };

  const filteredDishes =
    filterCategory === 'all'
      ? dishes
      : dishes.filter((d) => d.categoryId === filterCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#07080A]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-[#2B303E] bg-[#12151D] shadow-2xl my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#232733] p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-[#241A14] border border-[#C87D55]/30 p-2 text-[#C87D55]">
              <Sliders className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-serif-display text-lg sm:text-xl font-medium text-[#F6F4EE]">
                Panel de Gestión — Demostración
              </h2>
              <p className="text-xs text-[#9D988E]">
                Configura la carta, precios, promociones e información de Brasa &amp; Mar
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-[#A8A397] hover:bg-[#1A1E27] hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Security & Architecture Disclaimer Banner */}
        <div className="bg-[#181B24] border-b border-[#232733] px-5 py-2.5 flex items-center justify-between gap-3 text-xs text-[#9E988D]">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-[#C87D55] shrink-0" />
            <span>
              <strong>Modo Demostración en Vivo:</strong> Los cambios persisten en el navegador. En
              producción, este panel requerirá autenticación RBAC con Firebase o base de datos.
            </span>
          </div>

          <button
            onClick={() => {
              if (confirm('¿Restablecer todos los datos a la versión inicial de la carta?')) {
                resetToDefaultData();
              }
            }}
            className="flex items-center gap-1.5 text-xs text-[#C87D55] hover:underline whitespace-nowrap shrink-0"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Restaurar carta original</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#232733] bg-[#0E1015] px-5 gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('dishes')}
            className={`py-3 px-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'dishes'
                ? 'border-[#C87D55] text-[#F6F4EE] font-semibold'
                : 'border-transparent text-[#9E988D] hover:text-[#E8E4DA]'
            }`}
          >
            Gestión de Platos ({dishes.length})
          </button>
          <button
            onClick={() => setActiveTab('restaurant')}
            className={`py-3 px-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'restaurant'
                ? 'border-[#C87D55] text-[#F6F4EE] font-semibold'
                : 'border-transparent text-[#9E988D] hover:text-[#E8E4DA]'
            }`}
          >
            Datos del Restaurante &amp; WhatsApp
          </button>
          <button
            onClick={() => setActiveTab('promociones')}
            className={`py-3 px-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'promociones'
                ? 'border-[#C87D55] text-[#F6F4EE] font-semibold'
                : 'border-transparent text-[#9E988D] hover:text-[#E8E4DA]'
            }`}
          >
            Promociones Activas ({promotions.length})
          </button>
        </div>

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 no-scrollbar space-y-6">
          {/* TAB 1: DISHES */}
          {activeTab === 'dishes' && (
            <div className="space-y-4">
              {/* Category Filter & New Dish Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                  <button
                    onClick={() => setFilterCategory('all')}
                    className={`rounded-lg px-2.5 py-1.5 text-xs font-medium whitespace-nowrap ${
                      filterCategory === 'all'
                        ? 'bg-[#C87D55] text-[#0E1013]'
                        : 'bg-[#181C25] text-[#A6A093] hover:text-[#F6F4EE]'
                    }`}
                  >
                    Todos ({dishes.length})
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setFilterCategory(c.id)}
                      className={`rounded-lg px-2.5 py-1.5 text-xs font-medium whitespace-nowrap ${
                        filterCategory === c.id
                          ? 'bg-[#C87D55] text-[#0E1013]'
                          : 'bg-[#181C25] text-[#A6A093] hover:text-[#F6F4EE]'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>

                <button
                  onClick={openNewDishModal}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-[#C87D55] hover:bg-[#B76F48] px-4 py-2 text-xs font-semibold text-[#0E1013] transition-colors shrink-0"
                >
                  <Plus className="h-4 w-4" />
                  <span>Nuevo plato</span>
                </button>
              </div>

              {/* Dish Table / List */}
              <div className="space-y-2">
                {filteredDishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-[#232733] bg-[#151922] hover:bg-[#181D27] transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        referrerPolicy="no-referrer"
                        className="h-12 w-12 rounded-lg object-cover bg-[#1B202A] shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif-display text-sm font-medium text-[#F6F4EE] truncate">
                            {dish.name}
                          </h4>
                          {dish.isSpecialty && (
                            <span className="text-[10px] text-[#E0946B] border border-[#C87D55]/30 rounded px-1.5 py-0.5">
                              Firma
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#9E988D] truncate max-w-md">
                          {dish.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-[#232733]">
                      <span className="font-mono text-sm font-bold text-[#E5986C] tabular-nums">
                        ${dish.price.toFixed(2)}
                      </span>

                      {/* Availability toggle */}
                      <button
                        onClick={() => toggleDishAvailability(dish.id)}
                        className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                          dish.available
                            ? 'bg-[#152B1B] text-[#55D875] border border-[#23582E]'
                            : 'bg-[#2E1614] text-[#FF8575] border border-[#6B241E]'
                        }`}
                        title="Cambiar disponibilidad"
                      >
                        {dish.available ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                        <span>{dish.available ? 'En carta' : 'Pausado'}</span>
                      </button>

                      <button
                        onClick={() => openEditDishModal(dish)}
                        className="rounded-lg p-2 text-[#A8A397] hover:bg-[#202533] hover:text-white transition-colors"
                        title="Editar plato"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`¿Eliminar ${dish.name} de la carta?`)) {
                            deleteDish(dish.id);
                          }
                        }}
                        className="rounded-lg p-2 text-[#A8A397] hover:bg-[#2E1614] hover:text-[#FF7575] transition-colors"
                        title="Eliminar plato"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: RESTAURANT & WHATSAPP CONFIG */}
          {activeTab === 'restaurant' && (
            <form onSubmit={handleSaveConfig} className="space-y-4 max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#AEA99E] block mb-1">Nombre Comercial</label>
                  <input
                    type="text"
                    value={configForm.name}
                    onChange={(e) => setConfigForm({ ...configForm, name: e.target.value })}
                    className="w-full rounded-xl border border-[#2B303E] bg-[#161922] p-2.5 text-xs sm:text-sm text-[#F6F4EE]"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#AEA99E] block mb-1">Lema o Slogan</label>
                  <input
                    type="text"
                    value={configForm.tagline}
                    onChange={(e) => setConfigForm({ ...configForm, tagline: e.target.value })}
                    className="w-full rounded-xl border border-[#2B303E] bg-[#161922] p-2.5 text-xs sm:text-sm text-[#F6F4EE]"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#AEA99E] block mb-1">
                    Número de WhatsApp para Pedidos (sin espacios ni símbolos)
                  </label>
                  <input
                    type="text"
                    value={configForm.whatsappNumber}
                    onChange={(e) =>
                      setConfigForm({ ...configForm, whatsappNumber: e.target.value })
                    }
                    placeholder="15557492810"
                    className="w-full rounded-xl border border-[#2B303E] bg-[#161922] p-2.5 text-xs sm:text-sm text-[#F6F4EE]"
                  />
                  <p className="text-[11px] text-[#7C786F] mt-1">
                    Este es el número al que se abre el chat de wa.me
                  </p>
                </div>

                <div>
                  <label className="text-xs text-[#AEA99E] block mb-1">
                    Teléfono visible al público
                  </label>
                  <input
                    type="text"
                    value={configForm.phone}
                    onChange={(e) => setConfigForm({ ...configForm, phone: e.target.value })}
                    className="w-full rounded-xl border border-[#2B303E] bg-[#161922] p-2.5 text-xs sm:text-sm text-[#F6F4EE]"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#AEA99E] block mb-1">
                    Tarifa de Entrega a Domicilio ($ USD)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={configForm.deliveryFee}
                    onChange={(e) =>
                      setConfigForm({ ...configForm, deliveryFee: Number(e.target.value) })
                    }
                    className="w-full rounded-xl border border-[#2B303E] bg-[#161922] p-2.5 text-xs sm:text-sm text-[#F6F4EE]"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#AEA99E] block mb-1">
                    Horarios de Atención
                  </label>
                  <input
                    type="text"
                    value={configForm.hours}
                    onChange={(e) => setConfigForm({ ...configForm, hours: e.target.value })}
                    className="w-full rounded-xl border border-[#2B303E] bg-[#161922] p-2.5 text-xs sm:text-sm text-[#F6F4EE]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-[#AEA99E] block mb-1">Dirección del Salón</label>
                <input
                  type="text"
                  value={configForm.address}
                  onChange={(e) => setConfigForm({ ...configForm, address: e.target.value })}
                  className="w-full rounded-xl border border-[#2B303E] bg-[#161922] p-2.5 text-xs sm:text-sm text-[#F6F4EE]"
                />
              </div>

              <div>
                <label className="text-xs text-[#AEA99E] block mb-1">
                  Enlace a Google Maps / Navegación
                </label>
                <input
                  type="text"
                  value={configForm.mapsUrl}
                  onChange={(e) => setConfigForm({ ...configForm, mapsUrl: e.target.value })}
                  className="w-full rounded-xl border border-[#2B303E] bg-[#161922] p-2.5 text-xs sm:text-sm text-[#F6F4EE]"
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="submit"
                  className="rounded-xl bg-[#C87D55] hover:bg-[#B76F48] px-5 py-2.5 text-xs font-semibold text-[#0E1013] transition-colors"
                >
                  Guardar configuración
                </button>
                {configSavedToast && (
                  <span className="text-xs text-[#55D875] flex items-center gap-1">
                    <Check className="h-4 w-4" /> ¡Configuración actualizada!
                  </span>
                )}
              </div>
            </form>
          )}

          {/* TAB 3: PROMOTIONS */}
          {activeTab === 'promociones' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-xs text-[#9E988D]">
                  Gestiona las promociones y experiencias especiales en la portada
                </p>
                <button
                  onClick={() => {
                    setPromoForm({
                      title: 'Nueva Promoción Brasa & Mar',
                      subtitle: 'Detalle del maridaje o corte con acompañamiento',
                      discountBadge: '15% OFF',
                      image:
                        'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
                      priceBefore: 80,
                      priceNow: 68,
                      terms: 'Válido para consumo en salón.',
                      active: true,
                    });
                    setEditingPromo(null);
                    setIsCreatingPromo(true);
                  }}
                  className="flex items-center gap-1.5 rounded-xl bg-[#C87D55] px-4 py-2 text-xs font-semibold text-[#0E1013]"
                >
                  <Plus className="h-4 w-4" />
                  <span>Añadir promoción</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {promotions.map((promo) => (
                  <div
                    key={promo.id}
                    className="p-4 rounded-xl border border-[#232733] bg-[#151922] flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-[#C87D55]">
                          {promo.discountBadge}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded ${
                            promo.active
                              ? 'bg-[#152B1B] text-[#55D875]'
                              : 'bg-[#2E1614] text-[#FF8575]'
                          }`}
                        >
                          {promo.active ? 'Activa' : 'Inactiva'}
                        </span>
                      </div>
                      <h4 className="font-serif-display text-base font-medium text-[#F6F4EE]">
                        {promo.title}
                      </h4>
                      <p className="text-xs text-[#A8A397] mt-1">{promo.subtitle}</p>
                      {promo.priceNow && (
                        <div className="mt-2 text-xs flex items-center gap-2">
                          <span className="text-[#847F75] line-through">
                            ${promo.priceBefore?.toFixed(2)}
                          </span>
                          <span className="font-mono font-bold text-[#E5986C]">
                            ${promo.priceNow.toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-[#232733] flex justify-end gap-2">
                      <button
                        onClick={() => {
                          savePromotion({ ...promo, active: !promo.active });
                        }}
                        className="text-xs text-[#9E988D] hover:text-white px-2 py-1"
                      >
                        {promo.active ? 'Desactivar' : 'Activar'}
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('¿Eliminar promoción?')) deletePromotion(promo.id);
                        }}
                        className="text-xs text-[#FF7575] hover:underline px-2 py-1"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal footer */}
        <div className="border-t border-[#232733] bg-[#0E1015] p-4 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-[#232733] hover:bg-[#2C3140] px-5 py-2 text-xs font-semibold text-[#F6F4EE]"
          >
            Cerrar panel
          </button>
        </div>
      </div>

      {/* SUB-MODAL: Create / Edit Dish */}
      {isCreatingDish && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setIsCreatingDish(false)}
          />
          <div className="relative z-10 w-full max-w-xl rounded-2xl border border-[#2B303E] bg-[#12151D] p-6 shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar">
            <h3 className="font-serif-display text-lg font-medium text-[#F6F4EE] mb-4">
              {editingDish ? 'Editar plato de la carta' : 'Crear nuevo plato'}
            </h3>

            <form onSubmit={handleSaveDish} className="space-y-4 text-xs">
              <div>
                <label className="text-[#AEA99E] block mb-1">Nombre del plato *</label>
                <input
                  type="text"
                  required
                  value={dishFormData.name}
                  onChange={(e) => setDishFormData({ ...dishFormData, name: e.target.value })}
                  className="w-full rounded-xl border border-[#2B303E] bg-[#181C26] p-2.5 text-[#F6F4EE]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#AEA99E] block mb-1">Categoría</label>
                  <select
                    value={dishFormData.categoryId}
                    onChange={(e) =>
                      setDishFormData({
                        ...dishFormData,
                        categoryId: e.target.value as CategoryId,
                      })
                    }
                    className="w-full rounded-xl border border-[#2B303E] bg-[#181C26] p-2.5 text-[#F6F4EE]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[#AEA99E] block mb-1">Precio ($ USD) *</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={dishFormData.price}
                    onChange={(e) =>
                      setDishFormData({ ...dishFormData, price: Number(e.target.value) })
                    }
                    className="w-full rounded-xl border border-[#2B303E] bg-[#181C26] p-2.5 text-[#F6F4EE]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#AEA99E] block mb-1">Descripción culinaria</label>
                <textarea
                  rows={2}
                  value={dishFormData.description}
                  onChange={(e) =>
                    setDishFormData({ ...dishFormData, description: e.target.value })
                  }
                  className="w-full rounded-xl border border-[#2B303E] bg-[#181C26] p-2.5 text-[#F6F4EE]"
                />
              </div>

              <div>
                <label className="text-[#AEA99E] block mb-1">URL de la Fotografía</label>
                <input
                  type="url"
                  value={dishFormData.image}
                  onChange={(e) => setDishFormData({ ...dishFormData, image: e.target.value })}
                  placeholder="https://... o ruta local"
                  className="w-full rounded-xl border border-[#2B303E] bg-[#181C26] p-2.5 text-[#F6F4EE]"
                />
              </div>

              <div>
                <label className="text-[#AEA99E] block mb-1">
                  Ingredientes principales (separados por coma)
                </label>
                <input
                  type="text"
                  value={dishFormData.ingredients}
                  onChange={(e) =>
                    setDishFormData({ ...dishFormData, ingredients: e.target.value })
                  }
                  placeholder="Langosta, Romero, Mantequilla, Sal Maldon"
                  className="w-full rounded-xl border border-[#2B303E] bg-[#181C26] p-2.5 text-[#F6F4EE]"
                />
              </div>

              <div>
                <label className="text-[#AEA99E] block mb-1">
                  Alérgenos presentes (separados por coma - dejar vacío si no tiene)
                </label>
                <input
                  type="text"
                  value={dishFormData.allergens}
                  onChange={(e) =>
                    setDishFormData({ ...dishFormData, allergens: e.target.value })
                  }
                  placeholder="Mariscos, Lácteos, Gluten"
                  className="w-full rounded-xl border border-[#2B303E] bg-[#181C26] p-2.5 text-[#F6F4EE]"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dishFormData.isPopular}
                    onChange={(e) =>
                      setDishFormData({ ...dishFormData, isPopular: e.target.checked })
                    }
                  />
                  <span>Destacar como Popular</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dishFormData.isSpecialty}
                    onChange={(e) =>
                      setDishFormData({ ...dishFormData, isSpecialty: e.target.checked })
                    }
                  />
                  <span>Especialidad de la casa</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#232733]">
                <button
                  type="button"
                  onClick={() => setIsCreatingDish(false)}
                  className="rounded-xl border border-[#2B303E] px-4 py-2 text-[#9E988D]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#C87D55] px-5 py-2 font-semibold text-[#0E1013]"
                >
                  Guardar plato
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
