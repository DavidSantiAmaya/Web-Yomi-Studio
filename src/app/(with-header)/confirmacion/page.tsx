"use client";

import Link from "next/link";
import { CartSummary, OrderLines } from "@/components/store/CartSummary";
import { useStore } from "@/components/store/StoreProvider";

export default function ConfirmationPage() {
  const { lastOrder, ready } = useStore();
  if (!ready) return <main className="mx-auto max-w-6xl px-5 py-16 sm:px-8">Cargando confirmación…</main>;
  if (!lastOrder) return <main className="mx-auto max-w-6xl px-5 py-16 sm:px-8"><h1 className="font-sans text-4xl uppercase">Aún no existe una confirmación.</h1><Link className="mt-5 inline-flex border-2 border-black px-4 py-3 font-bold uppercase" href="/catalogo">Ir al catálogo</Link></main>;
  return <section className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16"><p className="text-xs font-bold uppercase tracking-[.2em]">Confirmación</p><h1 className="mt-3 font-sans text-5xl uppercase tracking-[-.06em] sm:text-7xl">Pedido preparado.</h1><p className="mt-5 max-w-xl text-lg leading-relaxed">La operación fue una simulación; no se procesó dinero real. Guarda tu código de referencia para probar el flujo.</p><div className="mt-8 grid gap-8 md:grid-cols-[1fr_18rem]"><div><p className="border-2 border-black bg-lime-300 p-4 text-sm font-bold uppercase">Referencia: {lastOrder.id}</p><h2 className="mt-7 font-sans text-2xl uppercase">Resumen</h2><div className="mt-3"><OrderLines items={lastOrder.items} /></div><p className="mt-5 text-sm"><strong>Entrega:</strong> {lastOrder.customer.address ? `${lastOrder.customer.address}, ${lastOrder.customer.city}` : `Acceso digital a ${lastOrder.customer.email}`}</p></div><CartSummary items={lastOrder.items} /></div><Link href="/catalogo" className="mt-8 inline-flex border-2 border-black bg-black px-5 py-3 text-sm font-bold uppercase text-white hover:bg-lime-300 hover:text-black">Volver al catálogo</Link></section>;
}
