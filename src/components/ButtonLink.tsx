import Link, { LinkProps } from "next/link";
import clsx from "clsx";

export type ButtonProps = LinkProps & { children?: React.ReactNode; className?: string; color?: "orange" | "purple" | "lime"; size?: "sm" | "md" | "lg"; icon?: "cart" | "skateboard" | "plus" };
export function ButtonLink({ size = "md", children, className, icon, ...props }: ButtonProps) {
  return <Link className={clsx("inline-flex items-center gap-2 border-2 border-black bg-black font-bold text-white hover:bg-zinc-300 hover:text-black", size === "sm" && "px-3 py-2 text-sm", size === "md" && "px-4 py-3", size === "lg" && "px-5 py-4 text-lg", className)} {...props}>{icon === "plus" && <span aria-hidden>+</span>}{icon === "cart" && <span aria-hidden>□</span>}{children}</Link>;
}
