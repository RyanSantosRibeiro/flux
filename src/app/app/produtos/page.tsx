"use client";

import { useState } from "react";
import Link from "next/link";
import { mockProdutos } from "@/lib/mock-data";
import { ProductCard } from "@/components/produtos/ProductCard";
import { PageHeader } from "@/components/navigation/PageHeader";
import { useCart } from "@/providers/CartProvider";

/* ============================================================
   Produtos Page — catálogo de produtos com busca e filtros
   ============================================================ */

const CATEGORIAS = ["Todos", "Tintas Internas", "Tintas Externas", "Massas", "Vernizes"];

export default function ProdutosPage() {
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const { itemCount } = useCart();

  const filtered = mockProdutos.filter((p) => {
    const matchQuery =
      query === "" ||
      p.nome.toLowerCase().includes(query.toLowerCase()) ||
      p.codigo.includes(query);
    const matchCat = categoria === "Todos" || p.categoria === categoria;
    return matchQuery && matchCat;
  });

  return (
    <div style={{ background: "var(--flux-bg)", minHeight: "100%" }}>
      <PageHeader
        title="Catálogo de Produtos"
        rightSlot={
          <Link
            href="/app/carrinho"
            style={{
              width: 40, height: 40, borderRadius: 12,
              background: "var(--flux-blue)", color: "white",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", flexShrink: 0,
            }}
            id="btn-carrinho"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {itemCount > 0 && (
              <span
                style={{
                  position: "absolute", top: -5, right: -5,
                  background: "var(--flux-danger)", color: "white",
                  fontSize: 10, fontWeight: 800, width: 18, height: 18,
                  borderRadius: "50%", display: "flex", alignItems: "center",
                  justifyContent: "center", border: "2px solid white",
                }}
              >
                {itemCount}
              </span>
            )}
          </Link>
        }
      />

      <div style={{ padding: "12px 16px" }}>
        {/* Search */}
        <div className="input-wrapper" style={{ marginBottom: 12 }}>
          <span className="input-icon">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
              <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <input
            className="search-bar"
            type="text"
            placeholder="Buscar produto, código..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            id="search-produtos"
          />
        </div>

        {/* Filter Pills */}
        <div className="filter-pills" style={{ marginBottom: 16 }}>
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              className={`filter-pill ${categoria === cat ? "active" : ""}`}
              onClick={() => setCategoria(cat)}
              style={{ border: "none", fontFamily: "Manrope, sans-serif" }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p style={{ fontSize: 12, color: "var(--flux-gray-500)", marginBottom: 12, fontWeight: 600 }}>
          {filtered.length} produto{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Products List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.length > 0 ? (
            filtered.map((produto) => (
              <ProductCard key={produto.id} produto={produto} />
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <span style={{ fontSize: 48 }}>🔍</span>
              <p style={{ color: "var(--flux-gray-500)", marginTop: 12, fontWeight: 600 }}>
                Nenhum produto encontrado
              </p>
            </div>
          )}
        </div>

        {/* CTA Carrinho flutuante (se tem itens) */}
        {itemCount > 0 && (
          <div
            style={{
              position: "fixed", bottom: 88, left: 16, right: 16,
              zIndex: 100,
            }}
          >
            <Link
              href="/app/carrinho"
              className="btn btn-primary btn-full"
              style={{ boxShadow: "0 8px 24px rgba(30,136,229,0.4)", textDecoration: "none" }}
            >
              🛒 Ver Carrinho · {itemCount} item{itemCount !== 1 ? "s" : ""}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
