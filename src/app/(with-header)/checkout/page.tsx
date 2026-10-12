"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { CartSummary, OrderLines } from "@/components/store/CartSummary";
import { Customer, useStore } from "@/components/store/StoreProvider";
import { getProduct, getVariant } from "@/data/products";

export default function CheckoutPage() {
  const { items, customer, setCustomer, ready } = useStore();
  const [errors, setErrors] = useState<string[]>([]);
  const physical = items.some((item) => {
    const product = getProduct(item.productId);
    return product ? Boolean(getVariant(product, item.variantId).requiresShipping) : false;
  });
  if (!ready) return <main className="mx-auto max-w-6xl px-5 py-16 sm:px-8">Cargando checkout…</main>;
  if (!items.length) return <main className="mx-auto max-w-6xl px-5 py-16 sm:px-8"><h1 className="font-sans text-4xl uppercase">No hay pedido para preparar.</h1><Link className="mt-5 inline-flex border-2 border-black px-4 py-3 font-bold uppercase" href="/catalogo">Ir al catálogo</Link></main>;
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const missing = [!customer.name && "nombre", !/^\S+@\S+\.\S+$/.test(customer.email) && "correo válido", !customer.phone && "teléfono", physical && !customer.address && "dirección", physical && !customer.city && "ciudad"].filter(Boolean) as string[];
    setErrors(missing);
    if (!missing.length) window.location.assign("/pago");
  }
  function field(name: keyof Customer, label: string, type = "text", required = true) { return <label className="block text-sm font-bold uppercase">{label}<input required={required} type={type} value={customer[name]} onChange={(event) => setCustomer({ ...customer, [name]: event.target.value })} className="mt-2 block w-full border-2 border-black bg-white px-3 py-3 font-normal normal-case" /></label>; }
  return <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16"><p className="text-xs font-bold uppercase tracking-[.2em]">Checkout / 1 de 2</p><h1 className="mt-3 font-sans text-5xl uppercase tracking-[-.06em] sm:text-7xl">Preparar pedido</h1><div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]"><form onSubmit={submit} noValidate className="space-y-5"><p className="text-sm leading-relaxed">Solo usamos estos datos dentro de esta demostración local. No se guardan datos de pago.</p>{errors.length > 0 && <p role="alert" className="border-2 border-black bg-lime-300 p-3 text-sm">Completa: {errors.join(", ")}.</p>}{field("name", "Nombre completo")}{field("email", "Correo", "email")}{field("phone", "Teléfono", "tel")}{physical && <><h2 className="border-t-2 border-black pt-5 font-sans text-2xl uppercase">Entrega</h2>{field("address", "Dirección")}{field("city", "Ciudad")}</>} {!physical && <p className="border-2 border-black p-4 text-sm">Este pedido es digital: enviaremos el acceso a tu correo cuando se conecte la entrega real.</p>}<button className="min-h-12 border-2 border-black bg-black px-5 text-sm font-bold uppercase text-white hover:bg-lime-300 hover:text-black">Continuar al pago</button></form><aside className="space-y-4"><OrderLines items={items} /><CartSummary items={items} /></aside></div></section>;
}
