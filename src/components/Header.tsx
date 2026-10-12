"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";
import { useStore } from "./store/StoreProvider";

const links = [{ href: "/catalogo", label: "Catálogo" }, { href: "/#cacciatori", label: "Cacciatori" }, { href: "/#equipo", label: "Equipo" }, { href: "/#contacto", label: "Contacto" }];
export function Header() {
  const { items } = useStore(); const [open, setOpen] = useState(false); const count = items.reduce((total, item) => total + item.quantity, 0);
  return <header className="sticky top-0 z-50 border-b-2 border-black bg-zinc-100/95 backdrop-blur"><div className="mx-auto flex min-h-20 max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8"><Link href="/" aria-label="Inicio YOMI Studio"><Logo /></Link><nav aria-label="Principal" className="hidden items-center gap-5 text-sm font-bold uppercase lg:flex">{links.map((link) => <Link key={link.href} className="hover:underline" href={link.href}>{link.label}</Link>)}</nav><div className="flex items-center gap-2"><Link href="/carrito" className="inline-flex items-center gap-2 border-2 border-black bg-black px-3 py-2 text-xs font-bold uppercase text-white hover:bg-zinc-300 hover:text-black" aria-label={`Carrito, ${count} artículos`}><span aria-hidden className="text-base leading-none">▣</span><span className="hidden sm:inline">Carrito</span><span>({count})</span></Link><button type="button" className="grid size-10 place-items-center border-2 border-black text-lg lg:hidden" aria-label={open ? "Cerrar navegación" : "Abrir navegación"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>{open ? "×" : "☰"}</button></div></div>{open && <nav aria-label="Principal móvil" className="border-t-2 border-black bg-white px-5 py-4 lg:hidden"><div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm font-bold uppercase">{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="border-b border-zinc-300 pb-3">{link.label}</Link>)}</div></nav>}</header>;
}
