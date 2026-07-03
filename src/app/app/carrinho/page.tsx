"use client";

import { useCart } from "@/providers/CartProvider";
import { PageHeader } from "@/components/navigation/PageHeader";
import { formatBRL } from "@/components/ui/StatusBadge";
import Link from "next/link";

/* ============================================================
   Carrinho Page — carrinho de compras interativo
   ============================================================ */

export default function CarrinhoPage() {
  const { items, updateQty, removeItem, subtotal, total, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div style={{ background: "var(--flux-bg)", minHeight: "100%" }}>
        <PageHeader title="Carrinho" backHref="/app/produtos" />
        <div
          style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", padding: "80px 32px", gap: 16, textAlign: "center",
          }}
        >
          <span style={{ fontSize: 64 }}>🛒</span>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: "var(--flux-gray-800)" }}>
            Seu carrinho está vazio
          </h3>
          <p style={{ color: "var(--flux-gray-500)", fontSize: 14 }}>
            Adicione produtos do catálogo para montar seu pedido.
          </p>
          <Link href="/app/produtos" className="btn btn-primary" style={{ marginTop: 8, textDecoration: "none" }}>
            Ver Catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--flux-bg)", minHeight: "100%" }}>
      <PageHeader
        title={`Carrinho · ${itemCount} ite${itemCount !== 1 ? "ns" : "m"}`}
        backHref="/app/produtos"
      />

      <div style={{ padding: "12px 16px" }}>

        {/* Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
          {items.map(({ produto, quantidade }) => (
            <div key={produto.id} className="flux-card" style={{ padding: 14 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                {/* Image */}
                <div
                  style={{
                    width: 56, height: 56, borderRadius: 12, background: produto.cor,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 26, flexShrink: 0,
                  }}
                >
                  {produto.emoji}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 700, fontSize: 13, color: "var(--flux-gray-900)" }}>
                    {produto.nome}
                  </p>
                  <p style={{ fontSize: 11, color: "var(--flux-gray-500)", marginTop: 1 }}>
                    {produto.tamanho_embalagem}
                  </p>
                  <p style={{ fontWeight: 800, fontSize: 14, color: "var(--flux-blue)", marginTop: 4 }}>
                    {formatBRL(produto.preco * quantidade)}
                  </p>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(produto.id)}
                  style={{
                    width: 28, height: 28, border: "none", background: "var(--flux-gray-100)",
                    borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", color: "var(--flux-gray-500)", flexShrink: 0,
                  }}
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Qty control */}
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
                <div className="qty-control">
                  <button
                    className="qty-btn"
                    onClick={() => updateQty(produto.id, quantidade - 1)}
                  >
                    −
                  </button>
                  <span className="qty-value">{quantidade}</span>
                  <button
                    className="qty-btn primary"
                    onClick={() => updateQty(produto.id, quantidade + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Observações */}
        <div className="flux-card" style={{ padding: 16, marginBottom: 16 }}>
          <p style={{ fontWeight: 700, fontSize: 13, color: "var(--flux-gray-800)", marginBottom: 8 }}>
            Observações do pedido
          </p>
          <textarea
            className="flux-input"
            placeholder="Algum detalhe especial para este pedido?"
            rows={3}
            id="observacoes-pedido"
            style={{ resize: "none", lineHeight: 1.5 }}
          />
        </div>

        {/* Resumo */}
        <div className="flux-card" style={{ padding: 16, marginBottom: 16 }}>
          <p style={{ fontWeight: 800, fontSize: 14, color: "var(--flux-gray-900)", marginBottom: 14 }}>
            Resumo do Pedido
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--flux-gray-600)", fontSize: 14 }}>Subtotal</span>
              <span style={{ fontWeight: 700, fontSize: 14 }}>{formatBRL(subtotal)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--flux-gray-600)", fontSize: 14 }}>Desconto</span>
              <span style={{ fontWeight: 700, fontSize: 14, color: "var(--flux-success)" }}>R$ 0,00</span>
            </div>
            <div className="flux-divider" />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 800, fontSize: 16, color: "var(--flux-gray-900)" }}>Total</span>
              <span style={{ fontWeight: 800, fontSize: 18, color: "var(--flux-navy)" }}>{formatBRL(total)}</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/app/checkout"
          className="btn btn-primary btn-full"
          id="btn-finalizar-pedido"
          style={{ textDecoration: "none", display: "flex" }}
        >
          Finalizar Pedido →
        </Link>
      </div>
    </div>
  );
}
