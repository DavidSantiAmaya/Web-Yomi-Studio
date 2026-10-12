import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return <footer className="border-t-2 border-black bg-black text-white"><div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-[1fr_auto] sm:px-8"><div><Logo className="text-lime-300" /><p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-300">Narrativas, juegos, cómics y experiencias en desarrollo. Este catálogo usa datos de demostración sustituibles mientras se integra el inventario definitivo.</p></div><nav aria-label="Pie de página" className="flex flex-wrap content-start gap-x-6 gap-y-3 text-sm font-bold uppercase"><Link href="/catalogo">Catálogo</Link><Link href="/carrito">Carrito</Link><Link href="/">Inicio</Link></nav></div></footer>;
}
