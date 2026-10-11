import { Category, Dish, Promotion, RestaurantConfig } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'promociones',
    name: 'Promociones',
    description: 'Experiencias combinadas y maridajes con valor preferencial',
  },
  {
    id: 'entradas',
    name: 'Entradas',
    description: 'Aperturas ligeras, crudos de temporada y bocados al carbón',
  },
  {
    id: 'ceviches-mariscos',
    name: 'Ceviches y mariscos',
    description: 'La frescura del litoral templada por toques de humo y cítricos',
  },
  {
    id: 'carnes',
    name: 'Carnes a la brasa',
    description: 'Cortes seleccionados, maduración controlada y fuego de leña',
  },
  {
    id: 'platos-principales',
    name: 'Platos principales',
    description: 'Creaciones contemporáneas que unen el fuego y las olas',
  },
  {
    id: 'hamburguesas',
    name: 'Hamburguesas',
    description: 'Carne dry-aged picada a cuchillo, brioche artesanal y ahumado',
  },
  {
    id: 'acompanamientos',
    name: 'Acompañamientos',
    description: 'Guarniciones de autor preparadas al calor de las brasas',
  },
  {
    id: 'bebidas',
    name: 'Bebidas y coctelería',
    description: 'Coctelería de autor ahumada, vinos selectos y refrescos naturales',
  },
  {
    id: 'postres',
    name: 'Postres',
    description: 'Cierres dulces con contrastes tostados y aromas marinos',
  },
];

export const INITIAL_RESTAURANT_CONFIG: RestaurantConfig = {
  name: 'BRASA & MAR',
  tagline: 'El fuego del carbón. La pureza del mar.',
  description:
    'Alta cocina contemporánea que rinde tributo a la riqueza del océano Pacífico y a la nobleza de las brasas de encina. Una experiencia sensorial donde la frescura y el humo convergen.',
  phone: '+1 (555) 749-2810',
  whatsappNumber: '15557492810',
  address: 'Av. Costanera del Mar 1420, Bahía Gourmet',
  mapsUrl: 'https://maps.google.com/?q=Bahia+Gourmet+Restaurant',
  hours: 'Mar a Dom: 12:30 - 23:30 (Brasas activas hasta 00:00). Lunes cerrado.',
  deliveryFee: 4.5,
  currencySymbol: '$',
  instagram: '@brasa.y.mar',
  facebook: 'brasaymar.restaurante',
};

export const INITIAL_PROMOTIONS: Promotion[] = [
  {
    id: 'promo-1',
    title: 'Experiencia Dúo Brasa & Océano',
    subtitle: 'Tomahawk 900g para compartir + Pulpo braseado + Botella de Malbec Reserva',
    discountBadge: '20% OFF',
    image: '/src/assets/images/hero_brasa_grill_1791739490337.jpg',
    priceBefore: 168.0,
    priceNow: 134.0,
    terms: 'Válido para consumo en salón o retiro previo pedido.',
    active: true,
  },
  {
    id: 'promo-2',
    title: 'Festival de Ostras & Champagne',
    subtitle: 'Docena de ostras del Pacífico con mignonette + 2 copas de Champagne Brut',
    discountBadge: 'Especial Fin de Semana',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1200&q=80',
    priceBefore: 78.0,
    priceNow: 62.0,
    terms: 'Disponible viernes a domingo a partir de las 18:00.',
    active: true,
  },
  {
    id: 'promo-3',
    title: 'Almuerzo Ejecutivo Contemporáneo',
    subtitle: 'Ceviche degustación o Tiradito + Salmón al miso o Picaña a las brasas + Bebida',
    discountBadge: 'Menú Mediodía',
    image: '/src/assets/images/ceviche_degustacion_1791739499677.jpg',
    priceBefore: 42.0,
    priceNow: 34.0,
    terms: 'Martes a viernes de 12:30 a 16:00.',
    active: true,
  },
];

export const INITIAL_DISHES: Dish[] = [
  // 1. CEVICHES Y MARISCOS
  {
    id: 'ceviche-degustacion',
    categoryId: 'ceviches-mariscos',
    name: 'Ceviche Clásico Brasa & Mar',
    price: 24.5,
    description:
      'Pesca del día en corte grueso, leche de tigre perfumada con ají amarillo ahumado, choclo tostado a la brasa, cebolla chalota y crema sedosa de aguacate.',
    image: '/src/assets/images/ceviche_degustacion_1791739499677.jpg',
    ingredients: ['Corvina silvestre', 'Leche de tigre al ají amarillo', 'Choclo a las brasas', 'Cebolla chalota', 'Aguacate', 'Cilantro fresco'],
    allergens: ['Mariscos', 'Pescado'],
    dietary: ['gluten-free', 'seafood'],
    isPopular: true,
    isSpecialty: true,
    available: true,
    variants: [
      {
        id: 'picante',
        title: 'Nivel de picor',
        required: true,
        options: [
          { id: 'medio', name: 'Picor medio (clásico peruano)', priceModifier: 0 },
          { id: 'suave', name: 'Suave y cítrico', priceModifier: 0 },
          { id: 'intenso', name: 'Intenso con rocoto asado', priceModifier: 0 },
        ],
      },
    ],
    extras: [
      { id: 'extra-camarones', name: 'Camarones jumbo braseados (+4 uds)', price: 6.5 },
      { id: 'extra-chulpe', name: 'Porción adicional de choclo tostado', price: 2.5 },
    ],
  },
  {
    id: 'pulpo-brasa',
    categoryId: 'ceviches-mariscos',
    name: 'Pulpo a la Brasa con Parmentier',
    price: 31.0,
    description:
      'Tentáculo de pulpo del Atlántico cocinado a baja temperatura y caramelizado en carbón de leña, laqueado con pimentón de la Vera y aceite de oliva virgen sobre cremoso de papa trufada.',
    image: '/src/assets/images/pulpo_brasa_1791739517483.jpg',
    ingredients: ['Pulpo atlántico', 'Puré parmentier', 'Pimentón de la Vera', 'Aceite de oliva extra virgen', 'Sal negra volcánica', 'Microbrotes'],
    allergens: ['Mariscos', 'Lácteos'],
    dietary: ['gluten-free', 'seafood'],
    isPopular: true,
    isSpecialty: true,
    available: true,
    extras: [
      { id: 'extra-trufa', name: 'Láminas de trufa negra fresca', price: 7.0 },
      { id: 'extra-alioli', name: 'Alioli de ajo negro ahumado', price: 2.5 },
    ],
  },
  {
    id: 'ostras-mignonette',
    categoryId: 'ceviches-mariscos',
    name: 'Ostras del Pacífico al Hielo & Fuego',
    price: 28.0,
    description:
      'Media docena de ostras vivas abiertas al momento, acompañadas de mignonette artesanal de manzana verde, toques de granizado de pepino y limón quemado.',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Ostras vivas del Pacífico', 'Mignonette de chalota y manzana', 'Granita de pepino', 'Limón parrillero', 'Sal marina en escamas'],
    allergens: ['Moluscos'],
    dietary: ['gluten-free', 'seafood'],
    isNew: true,
    available: true,
    variants: [
      {
        id: 'cantidad',
        title: 'Porción',
        required: true,
        options: [
          { id: 'media-docena', name: 'Media docena (6 uds)', priceModifier: 0 },
          { id: 'docena', name: 'Docena completa (12 uds)', priceModifier: 24.0 },
        ],
      },
    ],
  },
  {
    id: 'camarones-ajillo-brasa',
    categoryId: 'ceviches-mariscos',
    name: 'Langostinos Colosales al Carbón',
    price: 29.5,
    description:
      'Langostinos salvajes enteros asados sobre brasas abiertas, pincelados con mantequilla de ajo confitado, perejil de hoja ancha y reducción de vino blanco marino.',
    image: 'https://images.unsplash.com/photo-1559742811-82286364ceaf?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Langostinos salvajes', 'Ajo confitado', 'Mantequilla de campo', 'Vino blanco albariño', 'Guindilla ahumada'],
    allergens: ['Crustáceos', 'Lácteos'],
    dietary: ['gluten-free', 'seafood'],
    available: true,
    extras: [
      { id: 'pan-brioche', name: 'Tostadas de hogaza con mantequilla de algas', price: 3.5 },
    ],
  },

  // 2. ENTRADAS
  {
    id: 'tiradito-atun',
    categoryId: 'entradas',
    name: 'Tiradito de Atún Aleta Amarilla',
    price: 22.0,
    description:
      'Láminas finas de atún fresco sellado brevemente al soplete de carbón, emulsión de maracuyá y sésamo negro tostado, crujiente de piel de pescado.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Atún aleta amarilla', 'Ponzu de maracuyá', 'Aceite de sésamo', 'Cebollino', 'Furikake marino'],
    allergens: ['Pescado', 'Sésamo', 'Soya'],
    dietary: ['seafood'],
    available: true,
  },
  {
    id: 'croquetas-bogavante',
    categoryId: 'entradas',
    name: 'Croquetas Melosas de Bogavante',
    price: 18.5,
    description:
      'Croquetas cremosas con bechamel infusionada en cabezas de bogavante rostizadas, corazón jugoso y velo de papada ibérica curada con crujiente dorado.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Bogavante azul', 'Leche entera infusionada', 'Papada ibérica', 'Panko japonés', 'Alioli de azafrán'],
    allergens: ['Crustáceos', 'Gluten', 'Lácteos', 'Huevo'],
    isPopular: true,
    available: true,
  },
  {
    id: 'provoleta-ahumada',
    categoryId: 'entradas',
    name: 'Provoleta al Fuego de Leña',
    price: 17.0,
    description:
      'Queso provolone hilado fundido en cazuela de hierro fundido, tomates cherry confitados al romero, orégano de montaña y chimichurri tibio de la casa.',
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Queso provolone', 'Tomates cherry rostizados', 'Orégano fresco', 'Chimichurri de hierbas'],
    allergens: ['Lácteos'],
    dietary: ['vegetarian', 'gluten-free'],
    available: true,
    extras: [
      { id: 'extra-prosciutto', name: 'Láminas de jamón serrano 18 meses', price: 5.0 },
    ],
  },
  {
    id: 'carpaccio-madurado',
    categoryId: 'entradas',
    name: 'Carpaccio de Res Madurada 60 Días',
    price: 21.5,
    description:
      'Corte milimétrico de lomo madurado en seco, emulsión trufada de piñones, alcaparras fritas crujientes y láminas de Parmigiano Reggiano 24 meses.',
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Res madurada en seco', 'Parmigiano Reggiano', 'Aceite de trufa blanca', 'Alcaparras', 'Rúcula salvaje'],
    allergens: ['Lácteos', 'Frutos secos'],
    dietary: ['meat'],
    available: true,
  },

  // 3. CARNES
  {
    id: 'tomahawk-prime',
    categoryId: 'carnes',
    name: 'Tomahawk Prime Dry-Aged 45 Días',
    price: 89.0,
    description:
      'Corte insignia de 1.1 kg con hueso largo expuesto, marmoleado USDA Prime madurado en seco. Sellado a fuego vivo de roble y terminado al calor suave de la brasa con sal Maldon.',
    image: '/src/assets/images/tomahawk_brasa_1791739508786.jpg',
    ingredients: ['Tomahawk Prime 1100g', 'Sal marina en escamas Maldon', 'Mantequilla de romero y ajo', 'Chimichurri rústico'],
    dietary: ['gluten-free', 'meat'],
    isPopular: true,
    isSpecialty: true,
    available: true,
    variants: [
      {
        id: 'termino',
        title: 'Término de la carne',
        required: true,
        options: [
          { id: 'medio-rojo', name: 'Término Medio Rojo (Recomendado por el Chef)', priceModifier: 0 },
          { id: 'medio', name: 'Término Medio', priceModifier: 0 },
          { id: 'tres-cuartos', name: 'Tres Cuartos', priceModifier: 0 },
          { id: 'bien-cocido', name: 'Bien Cocido', priceModifier: 0 },
        ],
      },
    ],
    extras: [
      { id: 'mantequilla-trufa', name: 'Mantequilla artesanal de trufa negra', price: 4.5 },
      { id: 'cola-langosta', name: 'Añadir cola de langosta a la brasa (Surf & Turf)', price: 18.0 },
    ],
  },
  {
    id: 'ojo-bife-angus',
    categoryId: 'carnes',
    name: 'Ojo de Bife Angus al Carbón (Ribeye 450g)',
    price: 44.0,
    description:
      'Ribeye de novillo Angus certificado con infiltración óptima de grasa. Jugoso, tierno y con costra caramelizada inconfundible gracias a nuestra parrilla de hierro angulado.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Ojo de bife Angus 450g', 'Sal marina ahumada', 'Romero fresco', 'Ajo asado'],
    dietary: ['gluten-free', 'meat'],
    isPopular: true,
    available: true,
    variants: [
      {
        id: 'termino',
        title: 'Término de cocción',
        required: true,
        options: [
          { id: 'jugoso', name: 'Jugoso / Medio Rojo', priceModifier: 0 },
          { id: 'medio', name: 'Medio', priceModifier: 0 },
          { id: 'tres-cuartos', name: 'Tres Cuartos', priceModifier: 0 },
        ],
      },
    ],
    extras: [
      { id: 'salsa-pimienta', name: 'Reducción de pimienta verde y coñac', price: 3.5 },
    ],
  },
  {
    id: 'picanha-prime',
    categoryId: 'carnes',
    name: 'Picaña Prime con Sal Gruesa',
    price: 36.5,
    description:
      'Corte de picaña con generosa capa de grasa crujiente y dorada a fuego lento sobre brasas de quebracho blanco, servida en finos cortes jugosos con farofa artesanal.',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Picaña Prime 400g', 'Sal parrillera', 'Farofa con panceta ahumada', 'Vinagreta fresca'],
    dietary: ['meat'],
    available: true,
    variants: [
      {
        id: 'termino',
        title: 'Término deseado',
        required: true,
        options: [
          { id: 'medio-rojo', name: 'Medio Rojo (Punto óptimo)', priceModifier: 0 },
          { id: 'medio', name: 'Término Medio', priceModifier: 0 },
          { id: 'cocido', name: 'Cocido', priceModifier: 0 },
        ],
      },
    ],
  },
  {
    id: 'costillas-cordero',
    categoryId: 'carnes',
    name: 'Chuletas de Cordero Patagónico',
    price: 39.0,
    description:
      'Costillitas francesas de cordero marinadas 24 horas en hierbas de ribera, selladas a fuego alto y glaseadas con miel silvestre y reducción de aceto balsámico.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Cordero patagónico', 'Miel pura de azahar', 'Romero y tomillo fresco', 'Zanahorias baby glaseadas'],
    dietary: ['meat', 'gluten-free'],
    isNew: true,
    available: true,
  },

  // 4. PLATOS PRINCIPALES
  {
    id: 'arroz-meloso-mariscos',
    categoryId: 'platos-principales',
    name: 'Arroz Meloso de Mariscos & Socarrat',
    price: 33.5,
    description:
      'Arroz bomba cocinado a fuego de leña en fumet concentrado de cigalas y carabineros, coronado con mejillones de roca, calamar a la brasa y alioli de azafrán.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Arroz bomba', 'Fumet de carabineros', 'Calamar de potera', 'Mejillones', 'Alioli de azafrán'],
    allergens: ['Mariscos', 'Pescado', 'Moluscos', 'Huevo'],
    dietary: ['seafood'],
    isPopular: true,
    available: true,
    variants: [
      {
        id: 'porciones',
        title: 'Tamaño del plato',
        required: true,
        options: [
          { id: 'individual', name: 'Porción individual', priceModifier: 0 },
          { id: 'pareja', name: 'Para compartir (2 personas)', priceModifier: 26.0 },
        ],
      },
    ],
  },
  {
    id: 'salmon-miso-citricos',
    categoryId: 'platos-principales',
    name: 'Salmón Salvaje con Glaseado de Miso',
    price: 29.0,
    description:
      'Filete de salmón fresco con piel crujiente a la plancha de hierro, glaseado con miso blanco y jugo de naranja agria, acompañado de espárragos trigueros al carbón.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Salmón atlántico', 'Miso blanco dulce', 'Cítricos de huerto', 'Espárragos verdes', 'Aceite de sésamo'],
    allergens: ['Pescado', 'Soya'],
    dietary: ['seafood', 'gluten-free'],
    available: true,
  },
  {
    id: 'lubina-parrilla-carbon',
    categoryId: 'platos-principales',
    name: 'Lubina Entera a la Espalda al Carbón',
    price: 35.0,
    description:
      'Lubina salvaje abierta en mariposa, asada con aceite de oliva, ajo en láminas doradas y guindilla, salpicada con vinagre de sidra natural al salir del fuego.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Lubina salvaje 700g', 'Ajo confitado', 'Guindilla seca', 'Aceite de oliva virgen', 'Vinagre de sidra'],
    allergens: ['Pescado'],
    dietary: ['seafood', 'gluten-free'],
    available: true,
  },

  // 5. HAMBURGUESAS
  {
    id: 'burger-brasa-mar-trufada',
    categoryId: 'hamburguesas',
    name: 'Burger Brasa & Mar Trufada',
    price: 22.5,
    description:
      '220g de corte Dry-Aged picado a cuchillo a la parrilla, queso Gruyère fundido, hongos portobello al vino tinto, emulsión de trufa negra y pan brioche artesanal dorado con mantequilla.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Carne madurada 220g', 'Queso Gruyère', 'Portobellos salteados', 'Mayonesa de trufa negra', 'Pan brioche tostado'],
    allergens: ['Gluten', 'Lácteos', 'Huevo'],
    dietary: ['meat'],
    isPopular: true,
    isSpecialty: true,
    available: true,
    variants: [
      {
        id: 'panceta',
        title: 'Opción de tocino',
        required: true,
        options: [
          { id: 'con-bacon', name: 'Con panceta ahumada crujiente', priceModifier: 0 },
          { id: 'sin-bacon', name: 'Sin panceta', priceModifier: 0 },
        ],
      },
    ],
    extras: [
      { id: 'extra-patatas', name: 'Cambiar a papas trufadas con parmesano', price: 3.5 },
      { id: 'doble-carne', name: 'Medallón adicional 150g dry-aged', price: 6.0 },
    ],
  },
  {
    id: 'burger-maritima-langostino',
    categoryId: 'hamburguesas',
    name: 'Burger Surf & Turf de Langostino',
    price: 25.0,
    description:
      'Blend de res angus a las brasas coronado con langostinos al ajillo salteados en manteca de hierbas, queso provolone fundido y salsa tártara de alcaparras en pan brioche de tinta de calamar.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Carne angus 180g', 'Langostinos salteados', 'Queso provolone', 'Salsa tártara casera', 'Pan brioche negro'],
    allergens: ['Gluten', 'Crustáceos', 'Lácteos', 'Huevo'],
    dietary: ['meat', 'seafood'],
    isNew: true,
    available: true,
  },

  // 6. ACOMPAÑAMIENTOS
  {
    id: 'papas-trufadas-parmesano',
    categoryId: 'acompanamientos',
    name: 'Papas Rústicas Trufadas con Parmigiano',
    price: 9.5,
    description:
      'Papas cortadas a mano en doble cocción con piel crujiente, perfumadas con aceite de trufa blanca, escamas de queso Parmigiano Reggiano 24 meses y perejil fresco picado.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Papa criolla', 'Aceite de trufa blanca', 'Parmigiano Reggiano', 'Sal marina'],
    allergens: ['Lácteos'],
    dietary: ['vegetarian'],
    isPopular: true,
    available: true,
  },
  {
    id: 'vegetales-carbon',
    categoryId: 'acompanamientos',
    name: 'Verduras de Temporada al Carbón de Quebracho',
    price: 8.5,
    description:
      'Zanahorias orgánicas, calabacín, espárragos y cebolletas braseadas al fuego directo, rociadas con reducción balsámica añeja y sal Maldon.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Espárragos', 'Zanahorias baby', 'Calabacín', 'Cebollines', 'Aceite de oliva'],
    dietary: ['vegetarian', 'gluten-free'],
    available: true,
  },
  {
    id: 'pure-ahumado',
    categoryId: 'acompanamientos',
    name: 'Puré Criollo con Mantequilla Ahumada',
    price: 8.0,
    description:
      'Puré sedoso y untuoso de papa amarilla batido con mantequilla de vaca ahumada sobre brasas y toques de nuez moscada recién molida.',
    image: 'https://images.unsplash.com/photo-1514944298352-dfb83b3e0c0d?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Papa amarilla', 'Mantequilla ahumada en leña', 'Crema de leche de campo', 'Nuez moscada'],
    allergens: ['Lácteos'],
    dietary: ['vegetarian', 'gluten-free'],
    available: true,
  },

  // 7. BEBIDAS
  {
    id: 'coctel-brasa-mar-signature',
    categoryId: 'bebidas',
    name: 'Cóctel Brasa & Mar Ahumado en Roble',
    price: 15.0,
    description:
      'Bourbon añejado infusionado con romero silvestre, licor de naranja amarga, bitter de cacao y ahumado en campana de cristal con virutas de roble francés ante el comensal.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Bourbon selecto', 'Romero quemado', 'Licor de naranja', 'Bitter de cacao', 'Humo de roble'],
    isPopular: true,
    isSpecialty: true,
    available: true,
  },
  {
    id: 'pisco-sour-costero',
    categoryId: 'bebidas',
    name: 'Pisco Sour Marino de Quebranta',
    price: 13.5,
    description:
      'Pisco puro Quebranta, jugo de limón recién exprimido, jarabe simple aromático, clara de huevo pasteurizada y gotas de amargo de Angostura.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Pisco Quebranta', 'Limón criollo', 'Clara de huevo', 'Amargo de Angostura'],
    allergens: ['Huevo'],
    available: true,
  },
  {
    id: 'vino-malbec-reserva',
    categoryId: 'bebidas',
    name: 'Copa Malbec Reserva de la Casa',
    price: 12.0,
    description:
      'Vino tinto de altura del Valle de Uco, con notas de ciruela negra, vainilla sutil y taninos redondos, ideal para armonizar con nuestras carnes al carbón.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Uva Malbec 100%', 'Crianza de 12 meses en barrica de roble'],
    available: true,
    variants: [
      {
        id: 'formato',
        title: 'Presentación',
        required: true,
        options: [
          { id: 'copa', name: 'Copa (150 ml)', priceModifier: 0 },
          { id: 'botella', name: 'Botella completa (750 ml)', priceModifier: 36.0 },
        ],
      },
    ],
  },
  {
    id: 'limonada-coco-menta',
    categoryId: 'bebidas',
    name: 'Limonada de Coco & Menta Fresca (Sin Alcohol)',
    price: 7.0,
    description:
      'Leche de coco cremosa batida con zumo de limón verde, hojas frescas de menta macerada y hielo frappeado.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Leche de coco artesanal', 'Limón verde fresco', 'Menta orgánica', 'Hielo frappe'],
    dietary: ['vegetarian', 'gluten-free'],
    available: true,
  },

  // 8. POSTRES
  {
    id: 'volcan-chocolate-sal-marina',
    categoryId: 'postres',
    name: 'Volcán de Cacao 70% al Fuego & Sal Marina',
    price: 12.5,
    description:
      'Bizcocho tibio de chocolate negro 70% origen único con corazón fundente, escamas de sal marina atlántica y helado artesanal de vainilla Bourbon con humo frío.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Chocolate amargo 70%', 'Sal marina en escamas', 'Mantequilla pura', 'Helado de vainilla Bourbon'],
    allergens: ['Gluten', 'Lácteos', 'Huevo'],
    isPopular: true,
    isSpecialty: true,
    available: true,
  },
  {
    id: 'milhojas-dulce-leche',
    categoryId: 'postres',
    name: 'Milhojas de Dulce de Leche & Nuez Pecán',
    price: 11.5,
    description:
      'Finas capas de hojaldre caramelizado e intercalado con dulce de leche rústico a la antigua y crocante de nueces pecán tostadas al sartén.',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Hojaldre invertido artesanal', 'Dulce de leche de campo', 'Nuez pecán', 'Azúcar glas'],
    allergens: ['Gluten', 'Lácteos', 'Frutos secos'],
    available: true,
  },
];
