import React, { useState } from 'react';
import { X, CheckCircle2, Clock, AlertTriangle, ChevronRight, Utensils, Bike } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({ isOpen, onClose }) => {
  const { activeDemoOrder, setActiveDemoOrder } = useRestaurant();
  const [simulatedStatus, setSimulatedStatus] = useState<'received' | 'preparing' | 'ready'>('received');

  if (!isOpen || !activeDemoOrder) return null;

  const currentStatus = activeDemoOrder.status || simulatedStatus;

  const advanceDemoStatus = () => {
    if (simulatedStatus === 'received') setSimulatedStatus('preparing');
    else if (simulatedStatus === 'preparing') setSimulatedStatus('ready');
  };

  const steps = [
    {
      id: 'received',
      label: '1. Recibido en entorno de pruebas',
      desc: 'El pedido fue registrado localmente en este dispositivo.',
    },
    {
      id: 'preparing',
      label: '2. En preparación simulada',
      desc: 'Comanda ficticia en proceso de ensamblaje.',
    },
    {
      id: 'ready',
      label: '3. Listo según modalidad',
      desc:
        activeDemoOrder.mode === 'dine-in'
          ? 'Servicio listo en mesa'
          : activeDemoOrder.mode === 'takeout'
          ? 'Empaque listo para retiro en barra'
          : 'En camino con repartidor ficticio',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#07080A]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-[#2A2E3B] bg-[#12151C] shadow-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#232733] p-5">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C87D55]">
              Simulación de Pedido Interno
            </span>
            <h3 className="font-serif-display text-xl font-medium text-[#F6F4EE]">
              Orden {activeDemoOrder.code}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-[#ABA599] hover:bg-[#1A1E27] hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto no-scrollbar">
          {/* Important Honest Disclaimer */}
          <div className="rounded-xl border border-[#7D5A27]/40 bg-[#251E14] p-4 text-xs text-[#E8D1A7] flex items-start gap-3">
            <AlertTriangle className="h-4 w-4 text-[#E5A84B] shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="block font-semibold text-[#F7DEB4]">
                Aviso de Entorno de Demostración
              </strong>
              Este es un registro de prueba interactivo guardado en memoria local. No afirma que el
              pedido haya llegado a una cocina física ni que el restaurante lo haya recibido.
            </div>
          </div>

          {/* Stepper tracker */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D8D4CA]">
              Estado del Flujo Demo
            </h4>

            <div className="space-y-3">
              {steps.map((step, idx) => {
                const isCurrent = simulatedStatus === step.id;
                const isPassed =
                  (simulatedStatus === 'preparing' && step.id === 'received') ||
                  (simulatedStatus === 'ready' && (step.id === 'received' || step.id === 'preparing'));

                return (
                  <div
                    key={step.id}
                    className={`flex items-start gap-3.5 p-3 rounded-xl border transition-all ${
                      isCurrent
                        ? 'border-[#C87D55] bg-[#1F1914] text-[#F6F4EE]'
                        : isPassed
                        ? 'border-[#263529] bg-[#121A14] text-[#A2CCA7]'
                        : 'border-[#20242E] bg-[#141720] text-[#7E7A70]'
                    }`}
                  >
                    <div
                      className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                        isPassed
                          ? 'bg-[#256B30] text-white'
                          : isCurrent
                          ? 'bg-[#C87D55] text-[#0E1013]'
                          : 'bg-[#222630] text-[#7E7A70]'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                    </div>

                    <div className="flex-1">
                      <p className="text-xs font-semibold">{step.label}</p>
                      <p className="text-[11px] text-[#A6A092] mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {simulatedStatus !== 'ready' && (
              <button
                onClick={advanceDemoStatus}
                className="w-full flex items-center justify-center gap-2 rounded-lg border border-[#3A4050] bg-[#181C26] hover:bg-[#202533] p-2 text-xs font-medium text-[#C87D55] transition-colors"
              >
                <span>Avanzar simulación de estado</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Order Summary */}
          <div className="rounded-xl border border-[#232835] bg-[#141822] p-4 space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-[#232835] pb-2">
              <span className="text-[#9E988D]">Modalidad</span>
              <span className="font-semibold text-[#F6F4EE] capitalize">
                {activeDemoOrder.mode === 'dine-in'
                  ? `Mesa (${activeDemoOrder.customerInfo.tableOrRoom || 'Salón'})`
                  : activeDemoOrder.mode === 'takeout'
                  ? 'Retiro en local'
                  : 'Entrega a domicilio'}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-[#232835] pb-2">
              <span className="text-[#9E988D]">Cliente</span>
              <span className="font-semibold text-[#F6F4EE]">
                {activeDemoOrder.customerInfo.name || 'Cliente Demo'}
              </span>
            </div>

            {/* Items */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C87D55]">
                Productos ordenados
              </span>
              {activeDemoOrder.items.map((item, i) => (
                <div key={i} className="flex justify-between text-xs text-[#DCD7CD]">
                  <span>
                    {item.quantity}x {item.name}
                  </span>
                  <span className="font-mono tabular-nums">${item.totalPrice.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-2 border-t border-[#232835] text-sm font-semibold text-[#F6F4EE]">
              <span>Total registrado</span>
              <span className="font-mono text-[#E5986C] tabular-nums">
                ${activeDemoOrder.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#232733] bg-[#0E1016] p-4 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-[#C87D55] hover:bg-[#B76F48] px-5 py-2.5 text-xs font-semibold text-[#0E1013] transition-colors"
          >
            Cerrar seguimiento
          </button>
        </div>
      </div>
    </div>
  );
};
