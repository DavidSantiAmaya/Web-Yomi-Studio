import { HTMLAttributes } from "react";
import clsx from "clsx";

export function Logo({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={clsx("inline-flex flex-col font-sans text-3xl uppercase leading-[.72] tracking-[-.08em]", className)} {...props}><span>YOMI</span><span className="ml-[.28em] text-[.42em] tracking-[.18em]">Studio</span></span>;
}
