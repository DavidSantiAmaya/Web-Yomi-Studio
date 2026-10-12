import Link from "next/link";
import { ScrollModel } from "@/components/home/ScrollModel";
import { products } from "@/data/products";
import { ProductCard } from "@/components/store/ProductCard";

export default function Page() {
  return <>
    <section className="relative min-h-[270vh] border-b-2 border-black">
      <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-hidden"><ScrollModel />
        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-between px-5 py-8 sm:px-8 sm:py-12">
          <div className="max-w-xl"><p className="mb-3 text-xs font-bold uppercase tracking-[.22em]">YOMI Estudios / 2026</p><h1 className="font-sans text-6xl uppercase leading-[.78] tracking-[-.07em] sm:text-8xl">Historias<br />que muerden.</h1></div>
          <div className="ml-auto max-w-sm border-2 border-black bg-[#f6f5f1] p-5"><p className="text-sm leading-relaxed">Narrativas interactivas, juegos de mesa, cómics y videojuegos con una ternura un poco incómoda.</p><Link href="/catalogo" className="mt-4 inline-flex border-2 border-black bg-black px-4 py-3 text-sm font-bold uppercase text-white hover:bg-lime-300 hover:text-black">Entrar al catálogo</Link></div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-5 bottom-8 z-20 mx-auto flex max-w-6xl justify-between text-xs font-bold uppercase"><span>Desliza para alterar el encuadre</span><span>↓</span></div>
    </section>
    <section id="manifiesto" className="border-b-2 border-black bg-black px-5 py-16 text-white sm:px-8 sm:py-24"><div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[.6fr_1fr]"><p className="text-xs font-bold uppercase tracking-[.2em] text-lime-300">Manifiesto</p><div><h2 className="font-sans text-4xl uppercase leading-[.86] tracking-[-.05em] sm:text-6xl">No hacemos objetos inocentes.</h2><p className="mt-6 max-w-xl leading-relaxed text-zinc-300">YOMI explora lo extraño desde formatos que se pueden tocar, leer, jugar y recorrer. Esta primera web presenta una estructura de tienda lista para recibir el inventario y los recursos definitivos.</p></div></div></section>
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.2em]">Selección</p><h2 className="font-sans text-4xl uppercase tracking-[-.05em]">En el archivo</h2></div><Link href="/catalogo" className="border-b-2 border-black text-sm font-bold uppercase">Ver todo →</Link></div><div className="grid gap-5 md:grid-cols-2">{products.slice(0, 2).map((product) => <ProductCard key={product.id} product={product} />)}</div></section>
  </>;
}
