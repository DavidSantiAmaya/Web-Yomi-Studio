import clsx from "clsx";
import { Product } from "@/data/products";

export function ProductArtwork({ product, className }: { product: Pick<Product, "name" | "accent">; className?: string }) {
  return (
    <div className={clsx("relative isolate overflow-hidden border border-black bg-white", className)} aria-label={`Arte de portada de ${product.name}`}>
      <div className={clsx(
        "absolute inset-[12%] border-2 border-black",
        product.accent === "acid" && "bg-lime-300",
        product.accent === "fog" && "bg-zinc-300",
        product.accent === "ink" && "bg-zinc-900",
        product.accent === "bone" && "bg-stone-100",
      )} />
      <div className={clsx("absolute left-[18%] top-[18%] h-[55%] w-[55%] border-2 border-black", product.accent === "ink" ? "bg-white" : "bg-black")} />
      <div className={clsx("absolute bottom-[16%] right-[16%] size-[36%] rounded-full border-2 border-black", product.accent === "acid" ? "bg-black" : "bg-lime-300")} />
      <p className={clsx("absolute bottom-3 left-3 max-w-[72%] text-left font-sans text-2xl uppercase leading-[.82] tracking-tight", product.accent === "ink" && "text-white mix-blend-difference")}>{product.name}</p>
      <span className="absolute right-2 top-2 text-[10px] font-bold uppercase tracking-[.2em]">YOMI / 01</span>
    </div>
  );
}
