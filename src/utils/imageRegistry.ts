import heroImg from '../assets/images/hero_brasa_grill_1791739490337.jpg';
import cevicheImg from '../assets/images/ceviche_degustacion_1791739499677.jpg';
import tomahawkImg from '../assets/images/tomahawk_brasa_1791739508786.jpg';
import pulpoImg from '../assets/images/pulpo_brasa_1791739517483.jpg';
import burgerImg from '../assets/images/burger_trufada_1791762904957.jpg';
import arrozImg from '../assets/images/arroz_mariscos_1791762913604.jpg';
import volcanImg from '../assets/images/volcan_chocolate_1791762922840.jpg';
import coctelImg from '../assets/images/coctel_ahumado_1791762931461.jpg';
import papasImg from '../assets/images/papas_trufadas_1791762986814.jpg';
import tiraditoImg from '../assets/images/tiradito_atun_1791763000707.jpg';
import lubinaImg from '../assets/images/lubina_parrilla_1791763010117.jpg';
import croquetasImg from '../assets/images/croquetas_mariscos_1791763019871.jpg';

export const IMAGES = {
  hero: heroImg,
  ceviche: cevicheImg,
  tomahawk: tomahawkImg,
  pulpo: pulpoImg,
  burger: burgerImg,
  arroz: arrozImg,
  volcan: volcanImg,
  coctel: coctelImg,
  papas: papasImg,
  tiradito: tiraditoImg,
  lubina: lubinaImg,
  croquetas: croquetasImg,
};

// Map each dishId to its best matched verified local image
export const DISH_IMAGE_MAP: Record<string, string> = {
  // Ceviches & Mariscos
  'ceviche-degustacion': cevicheImg,
  'pulpo-brasa': pulpoImg,
  'ostras-mignonette': cevicheImg,
  'camarones-ajillo-brasa': arrozImg,

  // Entradas
  'tiradito-atun': tiraditoImg,
  'croquetas-bogavante': croquetasImg,
  'provoleta-ahumada': papasImg,
  'carpaccio-madurado': tiraditoImg,

  // Carnes
  'tomahawk-prime': tomahawkImg,
  'ojo-bife-angus': tomahawkImg,
  'picanha-prime': tomahawkImg,
  'costillas-cordero': tomahawkImg,

  // Platos Principales
  'arroz-meloso-mariscos': arrozImg,
  'salmon-miso-citricos': lubinaImg,
  'lubina-parrilla-carbon': lubinaImg,

  // Hamburguesas
  'burger-brasa-mar-trufada': burgerImg,
  'burger-maritima-langostino': burgerImg,

  // Acompañamientos
  'papas-trufadas-parmesano': papasImg,
  'vegetales-carbon': papasImg,
  'pure-ahumado': papasImg,

  // Bebidas
  'coctel-brasa-mar-signature': coctelImg,
  'pisco-sour-costero': coctelImg,
  'vino-malbec-reserva': coctelImg,
  'limonada-coco-menta': coctelImg,

  // Postres
  'volcan-chocolate-sal-marina': volcanImg,
  'milhojas-dulce-leche': volcanImg,

  // Promociones
  'promo-1': heroImg,
  'promo-2': cevicheImg,
  'promo-3': tomahawkImg,
};

export const CATEGORY_DEFAULT_IMAGE: Record<string, string> = {
  entradas: tiraditoImg,
  'ceviches-mariscos': cevicheImg,
  carnes: tomahawkImg,
  'platos-principales': lubinaImg,
  hamburguesas: burgerImg,
  acompanamientos: papasImg,
  bebidas: coctelImg,
  postres: volcanImg,
  promociones: heroImg,
};

/**
 * Returns a robust, bundled image for any dish or URL.
 * Never returns an empty string or broken external link.
 */
export function getSafeDishImage(dishId?: string, currentImage?: string, categoryId?: string): string {
  // If we have a verified mapping for this dish ID, prefer it
  if (dishId && DISH_IMAGE_MAP[dishId]) {
    return DISH_IMAGE_MAP[dishId];
  }

  // If currentImage is valid and starts with data: or http/https (and is not an unreachable external)
  if (currentImage && !currentImage.includes('/src/assets/')) {
    // If it's a relative path starting with /images/
    if (currentImage.startsWith('/images/')) {
      return currentImage;
    }
  }

  // Fallback to category default
  if (categoryId && CATEGORY_DEFAULT_IMAGE[categoryId]) {
    return CATEGORY_DEFAULT_IMAGE[categoryId];
  }

  return heroImg;
}
