"use client";

import { useCart } from "@/providers/CartProvider";
import type { Produto } from "@/lib/mock-data";
import Link from "next/link";
import { formatBRL } from "@/components/ui/StatusBadge";

/* ============================================================
   ProductCard — card de produto para listagem no catálogo
   ============================================================ */

export function ProductCard({ produto }: { produto: Produto }) {
  const { addItem } = useCart();
  const inStock = produto.quantidade_estoque > 0;

  return (
    <div className="product-card">
      {/* Imagem / Ícone */}
      <div
        className="product-card-image"
        style={{ background: produto.cor }}
      >
        {produto.emoji}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontWeight: 700,
            fontSize: 14,
            color: "var(--flux-gray-900)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {produto.nome}
        </p>
        <p
          style={{
            fontSize: 12,
            color: "var(--flux-gray-500)",
            marginTop: 2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {produto.tamanho_embalagem}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 6,
          }}
        >
          <span
            style={{
              fontWeight: 800,
              fontSize: 15,
              color: "var(--flux-navy)",
            }}
          >
            {formatBRL(produto.preco)}
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: inStock ? "var(--flux-success)" : "var(--flux-danger)",
            }}
          >
            {inStock ? "Em estoque" : "Sem estoque"}
          </span>
        </div>
      </div>

      {/* Botão Add */}
      {inStock && (
        <button
          onClick={() => addItem(produto)}
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "var(--flux-blue)",
            color: "white",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
            fontWeight: 700,
            fontSize: 20,
            boxShadow: "0 2px 8px rgba(30,136,229,0.35)",
            transition: "all 0.15s ease",
          }}
        >
          +
        </button>
      )}
    </div>
  );
}
