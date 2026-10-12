import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { StoreProvider } from "@/components/store/StoreProvider";

const geist = localFont({ src: "./fonts/GeistVF.woff", variable: "--font-geist" });
const geistMono = localFont({ src: "./fonts/GeistMonoVF.woff", variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "YOMI Estudios",
  description: "Narrativas, juegos, cómics y experiencias de YOMI Estudios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geist.variable} ${geistMono.variable} bg-[#f6f5f1] antialiased font-mono text-zinc-950`}
      >
        <StoreProvider><main>{children}</main></StoreProvider>
      </body>
    </html>
  );
}
