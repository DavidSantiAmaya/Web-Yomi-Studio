import type { Metadata } from "next";
import localFont from "next/font/local";

// @ts-expect-error Next.js handles global CSS imports at build time.
import "./globals.css";
import { SVGFilters } from "@/components/SVGFilters";
import { settings } from "@/data/settings";
import { StoreProvider } from "@/components/store/StoreProvider";

const geist = localFont({ src: "./fonts/GeistVF.woff", variable: "--font-geist" });
const geistMono = localFont({ src: "./fonts/GeistMonoVF.woff", variable: "--font-geist-mono" });

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: settings.site_title,
    description: settings.meta_description,
  };
}

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
        <SVGFilters />
      </body>
    </html>
  );
}
