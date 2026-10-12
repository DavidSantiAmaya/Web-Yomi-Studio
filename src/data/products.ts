export type ProductKind = "fisico" | "digital";

export type ProductVariant = {
  id: string;
  label: string;
  price: number;
  requiresShipping?: boolean;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  kind: ProductKind;
  description: string;
  details: string[];
  variants: ProductVariant[];
  available: boolean;
  accent: "acid" | "fog" | "ink" | "bone";
};

/**
 * Catálogo de demostración: sustituir estas fichas por el inventario y los
 * recursos aprobados por YOMI cuando estén disponibles.
 */
export const products: Product[] = [
  {
    id: "archivo-umbra",
    slug: "archivo-umbra",
    name: "Archivo Umbra",
    category: "Juego narrativo",
    kind: "fisico",
    description: "Prototipo de juego de mesa narrativo para explorar una ciudad que se niega a dormir.",
    details: ["Caja de prototipo", "Cartas y libreto", "Edición de demostración"],
    variants: [
      { id: "mesa", label: "Edición de mesa", price: 78000, requiresShipping: true },
      { id: "archivo", label: "Archivo digital", price: 24000 },
    ],
    available: true,
    accent: "acid",
  },
  {
    id: "hilo-negro",
    slug: "hilo-negro",
    name: "Hilo Negro",
    category: "Cómic",
    kind: "fisico",
    description: "Cómic de horror cute sobre mensajes que aparecen cosidos en las paredes.",
    details: ["32 páginas", "Riso en blanco y negro", "Edición de demostración"],
    variants: [
      { id: "impreso", label: "Impreso", price: 32000, requiresShipping: true },
      { id: "pdf", label: "PDF", price: 12000 },
    ],
    available: true,
    accent: "fog",
  },
  {
    id: "habitacion-09",
    slug: "habitacion-09",
    name: "Habitación 09",
    category: "Experiencia interactiva",
    kind: "digital",
    description: "Experiencia breve de narrativa interactiva para abrir a oscuras y con audífonos.",
    details: ["Acceso digital", "Duración aproximada: 40 min", "Edición de demostración"],
    variants: [{ id: "acceso", label: "Acceso digital", price: 18000 }],
    available: true,
    accent: "ink",
  },
  {
    id: "manual-de-criaturas",
    slug: "manual-de-criaturas",
    name: "Manual de criaturas",
    category: "Zine",
    kind: "fisico",
    description: "Zine ilustrado para inventar monstruos domésticos y registrar sus hábitos.",
    details: ["48 páginas", "Cubierta serigrafiada", "Edición de demostración"],
    variants: [{ id: "zine", label: "Zine impreso", price: 28000, requiresShipping: true }],
    available: false,
    accent: "bone",
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getVariant(product: Product, variantId: string) {
  return product.variants.find((variant) => variant.id === variantId) ?? product.variants[0];
}
