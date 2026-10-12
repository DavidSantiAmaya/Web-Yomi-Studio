"use client";
import { useState } from "react";
import { useStore } from "./StoreProvider";

export function AddToCart({ productId, variantId, quantity = 1, disabled = false, compact = false }: { productId: string; variantId: string; quantity?: number; disabled?: boolean; compact?: boolean }) {
  const { addItem } = useStore(); const [added, setAdded] = useState(false);
  function add() { addItem(productId, variantId, quantity); setAdded(true); window.setTimeout(() => setAdded(false), 1800); }
  return <button type="button" disabled={disabled} onClick={add} className="inline-flex min-h-11 items-center justify-center border-2 border-black bg-black px-5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-zinc-300 hover:text-black disabled:cursor-not-allowed disabled:border-zinc-400 disabled:bg-zinc-300">{disabled ? "No disponible" : added ? "Añadido ✓" : compact ? "+ Carrito" : "Añadir al carrito"}</button>;
}
