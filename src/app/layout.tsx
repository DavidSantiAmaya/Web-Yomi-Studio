import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/components/store/StoreProvider";

export const metadata: Metadata = {
  title: "YOMI Estudios",
  description: "Historias que se pueden tocar, leer, jugar y recorrer.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body><StoreProvider>{children}</StoreProvider></body></html>;
}
