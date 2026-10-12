export type ProductKind = "fisico" | "digital";
export type ProductVariant = { id: string; label: string; price: number; requiresShipping?: boolean };
export type Product = { id: string; slug: string; name: string; category: string; kind: ProductKind; description: string; details: string[]; variants: ProductVariant[]; available: boolean; accent: "acid" | "fog" | "ink" | "bone" };

/** Catálogo base: las imágenes finales se incorporan cuando YOMI las apruebe. */
export const products: Product[] = [
  { id: "peluche-cacciatori", slug: "peluche-cacciatori", name: "Peluche Cacciatori", category: "Universo Cacciatori", kind: "fisico", description: "Objeto de colección del universo Cacciatori. Arte de producto pendiente de aprobación.", details: ["Edición física", "Imagen final pendiente", "Envío nacional"], variants: [{ id: "peluche", label: "Edición estándar", price: 45000, requiresShipping: true }], available: true, accent: "ink" },
  { id: "camiseta-yomi", slug: "camiseta-yomi", name: "Camiseta YOMI Studio", category: "YOMI Studio", kind: "fisico", description: "Prenda de estudio con arte final pendiente de aprobación.", details: ["Edición física", "Tallas por definir", "Envío nacional"], variants: [{ id: "camiseta", label: "Edición estándar", price: 65000, requiresShipping: true }], available: true, accent: "fog" },
  { id: "poster-cacciatori", slug: "poster-cacciatori", name: "Póster Cacciatori", category: "Universo Cacciatori", kind: "fisico", description: "Pieza gráfica del universo Cacciatori. Imagen final pendiente de aprobación.", details: ["Edición física", "Formato por confirmar", "Envío nacional"], variants: [{ id: "poster", label: "Edición estándar", price: 25000, requiresShipping: true }], available: true, accent: "bone" },
  { id: "pack-stickers", slug: "pack-stickers", name: "Pack de stickers", category: "YOMI Studio", kind: "fisico", description: "Selección de gráficos adhesivos de YOMI. Arte final pendiente de aprobación.", details: ["Edición física", "Contenido por confirmar", "Envío nacional"], variants: [{ id: "stickers", label: "Pack", price: 15000, requiresShipping: true }], available: true, accent: "acid" },
];
export function getProduct(slug: string) { return products.find((product) => product.slug === slug); }
export function getVariant(product: Product, variantId: string) { return product.variants.find((variant) => variant.id === variantId) ?? product.variants[0]; }
