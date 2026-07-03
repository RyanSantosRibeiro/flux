import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flux — Vendas B2B",
  description: "Plataforma de vendas B2B para fábricas de tinta. Pedidos rápidos, catálogo digital e inteligência artificial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
