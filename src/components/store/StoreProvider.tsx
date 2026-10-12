"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct, getVariant } from "@/data/products";

export type CartItem = { productId: string; variantId: string; quantity: number };
export type Customer = { name: string; email: string; phone: string; address: string; city: string };
export type Order = { id: string; items: CartItem[]; customer: Customer; subtotal: number; shipping: number; total: number; createdAt: string };
type StoreContextValue = { ready: boolean; items: CartItem[]; customer: Customer; lastOrder: Order | null; addItem: (productId: string, variantId: string, quantity?: number) => void; updateQuantity: (productId: string, variantId: string, quantity: number) => void; removeItem: (productId: string, variantId: string) => void; setCustomer: (customer: Customer) => void; completeOrder: () => Order | null; clearCart: () => void };

const emptyCustomer: Customer = { name: "", email: "", phone: "", address: "", city: "" };
const StoreContext = createContext<StoreContextValue | undefined>(undefined);
const STORAGE_KEY = "yomi-store-v1";

function getTotals(items: CartItem[]) {
  const subtotal = items.reduce((total, item) => { const product = getProduct(item.productId); return product ? total + getVariant(product, item.variantId).price * item.quantity : total; }, 0);
  const shipping = items.some((item) => { const product = getProduct(item.productId); return product && getVariant(product, item.variantId).requiresShipping; }) && subtotal ? 12000 : 0;
  return { subtotal, shipping, total: subtotal + shipping };
}

function validItems(items: unknown): CartItem[] { if (!Array.isArray(items)) return []; return items.filter((item): item is CartItem => Boolean(item && typeof item === "object" && typeof (item as CartItem).productId === "string" && typeof (item as CartItem).variantId === "string" && Number.isFinite((item as CartItem).quantity) && (item as CartItem).quantity > 0)).map((item) => ({ ...item, quantity: Math.min(10, Math.floor(item.quantity)) })); }

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false); const [items, setItems] = useState<CartItem[]>([]); const [customer, setCustomerState] = useState<Customer>(emptyCustomer); const [lastOrder, setLastOrder] = useState<Order | null>(null);
  useEffect(() => { try { const saved = window.localStorage.getItem(STORAGE_KEY); if (saved) { const parsed = JSON.parse(saved) as Partial<{ items: unknown; customer: Customer; lastOrder: Order }>; setItems(validItems(parsed.items)); setCustomerState({ ...emptyCustomer, ...parsed.customer }); setLastOrder(parsed.lastOrder ?? null); } } catch { /* La tienda sigue funcionando cuando el almacenamiento no está disponible. */ } finally { setReady(true); } }, []);
  useEffect(() => { if (ready) { try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, customer, lastOrder })); } catch { /* Persistencia opcional. */ } } }, [ready, items, customer, lastOrder]);
  const addItem = useCallback((productId: string, variantId: string, quantity = 1) => setItems((current) => { const safeQuantity = Math.max(1, Math.min(10, Math.floor(quantity))); const existing = current.find((item) => item.productId === productId && item.variantId === variantId); return existing ? current.map((item) => item === existing ? { ...item, quantity: Math.min(10, item.quantity + safeQuantity) } : item) : [...current, { productId, variantId, quantity: safeQuantity }]; }), []);
  const updateQuantity = useCallback((productId: string, variantId: string, quantity: number) => setItems((current) => quantity < 1 ? current.filter((item) => item.productId !== productId || item.variantId !== variantId) : current.map((item) => item.productId === productId && item.variantId === variantId ? { ...item, quantity: Math.min(10, Math.floor(quantity)) } : item)), []);
  const removeItem = useCallback((productId: string, variantId: string) => setItems((current) => current.filter((item) => item.productId !== productId || item.variantId !== variantId)), []);
  const setCustomer = useCallback((next: Customer) => setCustomerState({ ...emptyCustomer, ...next }), []); const clearCart = useCallback(() => setItems([]), []);
  const completeOrder = useCallback(() => { if (!items.length) return null; const order: Order = { id: `YOMI-${Date.now().toString(36).toUpperCase()}`, items, customer, ...getTotals(items), createdAt: new Date().toISOString() }; setLastOrder(order); setItems([]); return order; }, [items, customer]);
  const value = useMemo(() => ({ ready, items, customer, lastOrder, addItem, updateQuantity, removeItem, setCustomer, completeOrder, clearCart }), [ready, items, customer, lastOrder, addItem, updateQuantity, removeItem, setCustomer, completeOrder, clearCart]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
export function useStore() { const context = useContext(StoreContext); if (!context) throw new Error("useStore debe utilizarse dentro de StoreProvider"); return context; }
export function calculateTotals(items: CartItem[]) { return getTotals(items); }
