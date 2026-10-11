import React from 'react';
import {
  X,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  ExternalLink,
  Flame,
  Waves,
  Instagram,
  Facebook,
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  const { restaurantConfig } = useRestaurant();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#07080A]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-[#2B303E] bg-[#12151D] shadow-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#232733] p-5">
          <div className="flex items-center gap-2">
            <span className="font-serif-display text-lg font-medium text-[#F6F4EE]">
              BRASA <span className="text-[#C87D55]">&amp;</span> MAR
            </span>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-[#A8A397] hover:bg-[#1A1E27] hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto no-scrollbar text-xs">
          {/* Brand Philosophy */}
          <div className="rounded-xl border border-[#232733] bg-[#161923] p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C87D55]">
              <Flame className="h-3.5 w-3.5" />
              <span>Nuestra Filosofía Culinaria</span>
              <Waves className="h-3.5 w-3.5 text-[#88B8C8]" />
            </div>
            <p className="font-serif-display text-sm italic text-[#F6F4EE] leading-relaxed">
              «El mar nos entrega la nobleza de su frescura indómita; la leña de encina y el carbón
              le otorgan su alma.»
            </p>
            <p className="text-[#A49E92] leading-relaxed">
              {restaurantConfig.description}
            </p>
          </div>

          {/* Opening Hours Detailed Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D8D4CA] flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#C87D55]" />
              <span>Horarios de Atención &amp; Turnos</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="rounded-xl border border-[#232733] bg-[#151922] p-3">
                <span className="font-semibold text-[#F6F4EE] block">Almuerzos &amp; Mediodía</span>
                <span className="text-[#9E988D] text-[11px] block mt-0.5">
                  Martes a Domingo: 12:30 a 16:30
                </span>
                <span className="text-[10px] text-[#C87D55] block mt-1">Ceviches frescos &amp; Brasas</span>
              </div>

              <div className="rounded-xl border border-[#232733] bg-[#151922] p-3">
                <span className="font-semibold text-[#F6F4EE] block">Cenas &amp; Noches de Fuego</span>
                <span className="text-[#9E988D] text-[11px] block mt-0.5">
                  Martes a Domingo: 19:30 a 23:30
                </span>
                <span className="text-[10px] text-[#C87D55] block mt-1">Cortes Prime &amp; Maridajes</span>
              </div>

              <div className="rounded-xl border border-[#232733] bg-[#151922] p-3">
                <span className="font-semibold text-[#F6F4EE] block">Barra &amp; Coctelería Ahumada</span>
                <span className="text-[#9E988D] text-[11px] block mt-0.5">
                  Viernes y Sábados: hasta las 01:00
                </span>
                <span className="text-[10px] text-[#C87D55] block mt-1">Tragos de autor al roble</span>
              </div>

              <div className="rounded-xl border border-[#232733] bg-[#151922] p-3">
                <span className="font-semibold text-[#FF8575] block">Lunes</span>
                <span className="text-[#9E988D] text-[11px] block mt-0.5">
                  Cerrado por descanso del equipo
                </span>
                <span className="text-[10px] text-[#868175] block mt-1">Mantenimiento de brasas</span>
              </div>
            </div>
          </div>

          {/* Location & Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D8D4CA] flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#C87D55]" />
              <span>Ubicación del Restaurante</span>
            </h4>

            <div className="rounded-xl border border-[#232733] bg-[#151922] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-sm text-[#F6F4EE]">{restaurantConfig.address}</p>
                <p className="text-[11px] text-[#9E988D] mt-0.5">
                  Valet parking disponible · Vista panorámica a la bahía
                </p>
              </div>

              <a
                href={restaurantConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-[#C87D55] px-3.5 py-2 text-xs font-semibold text-[#0E1013] hover:bg-[#B76F48] transition-colors shrink-0"
              >
                <span>Cómo llegar</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Contact & Socials */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D8D4CA]">
              Contacto &amp; Redes Sociales
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="rounded-xl border border-[#232733] bg-[#151922] p-3 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#1B202B] text-[#C87D55]">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#888377] block">Reservas y Sala</span>
                  <span className="font-semibold text-[#F6F4EE]">{restaurantConfig.phone}</span>
                </div>
              </div>

              <div className="rounded-xl border border-[#232733] bg-[#151922] p-3 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#1B202B] text-[#25D366]">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#888377] block">WhatsApp Pedidos</span>
                  <span className="font-semibold text-[#F6F4EE]">+{restaurantConfig.whatsappNumber}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <a
                href={`https://instagram.com/${restaurantConfig.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-[#AEA99E] hover:text-[#C87D55] transition-colors"
              >
                <Instagram className="h-4 w-4" />
                <span>{restaurantConfig.instagram}</span>
              </a>

              <a
                href={`https://facebook.com/${restaurantConfig.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-[#AEA99E] hover:text-[#C87D55] transition-colors"
              >
                <Facebook className="h-4 w-4" />
                <span>{restaurantConfig.facebook}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#232733] bg-[#0E1015] p-4 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-[#232733] hover:bg-[#2C3140] px-5 py-2 text-xs font-semibold text-[#F6F4EE]"
          >
            Cerrar información
          </button>
        </div>
      </div>
    </div>
  );
};
