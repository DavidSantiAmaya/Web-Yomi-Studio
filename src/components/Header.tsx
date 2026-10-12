"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { useStore } from "./store/StoreProvider";

export function Header() {
  const { items } = useStore();
  const count = items.reduce((total, item) => total + item.quantity, 0);
  return <header className="sticky top-0 z-50 border-b-2 border-black bg-[#f6f5f1]/95 backdrop-blur">
    <div className="mx-auto flex min-h-20 max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
      <Link href="/" aria-label="Inicio YOMI"><Logo /></Link>
      <nav aria-label="Principal" className="hidden gap-5 text-sm font-bold uppercase sm:flex"><Link className="hover:underline" href="/catalogo">Catálogo</Link><Link className="hover:underline" href="/#manifiesto">Estudio</Link></nav>
      <Link href="/carrito" className="border-2 border-black bg-black px-3 py-2 text-xs font-bold uppercase text-white hover:bg-lime-300 hover:text-black">Carrito <span aria-label={`${count} artículos`}>({count})</span></Link>
    </div>
  </header>;
}
