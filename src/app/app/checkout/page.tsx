"use client";

import { useState } from "react";
import { useCart } from "@/providers/CartProvider";
import { PageHeader } from "@/components/navigation/PageHeader";
import { formatBRL } from "@/components/ui/StatusBadge";
import { mockClientes } from "@/lib/mock-data";
import { useRouter } from "next/navigation";

/* ============================================================
   Checkout Page — finalização do pedido
   ============================================================ */

const FORMAS_PAGAMENTO = [
  "Faturado 30 dias",
  "Faturado 28/56 dias",
  "À vista",
  "Boleto",
  "PIX",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, subtotal, clearCart } = useCart();
  const [clienteId, setClienteId] = useState(mockClientes[0].id);
  const [pagamento, setPagamento] = useState(FORMAS_PAGAMENTO[0]);
  const [loading, setLoading] = useState(false);

  const cliente = mockClientes.find((c) => c.id === clienteId)!;

  const handleEnviar = async () => {
    setLoading(true);
    // Simula envio ao Supabase
    await new Promise((r) => setTimeout(r, 1200));
    clearCart();
    router.push("/app/confirmacao");
  };

  return (
    <div style={{ background: "var(--flux-bg)", minHeight: "100%" }}>
      <PageHeader title="Finalizar Pedido" backHref="/app/carrinho" />

      <div style={{ padding: "12px 16px" }}>

        {/* Cliente */}
        <div className="flux-card" style={{ padding: 16, marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <p style={{ fontWeight: 800, fontSize: 14 }}>Cliente</p>
            <span style={{ fontSize: 12, color: "var(--flux-blue)", fontWeight: 700, cursor: "pointer" }}>
              Alterar
            </span>
          </div>
          <select
            className="flux-input"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            id="select-cliente"
            style={{ fontFamily: "Manrope, sans-serif", cursor: "pointer" }}
          >
            {mockClientes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.razao_social_nome}
              </option>
            ))}
          </select>
          {cliente && (
            <p style={{ fontSize: 12, color: "var(--flux-gray-500)", marginTop: 8 }}>
              {cliente.cnpj_cpf} · {cliente.endereco_rua}, {cliente.endereco_numero} — {cliente.endereco_bairro}
            </p>
          )}
        </div>

        {/* Resumo dos Itens */}
        <div className="flux-card" style={{ padding: 16, marginBottom: 12 }}>
          <p style={{ fontWeight: 800, fontSize: 14, marginBottom: 12 }}>Resumo do Pedido</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {items.map(({ produto, quantidade }) => (
              <div key={produto.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <div
                    style={{
                      width: 36, height: 36, borderRadius: 8, background: produto.cor,
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                    }}
                  >
                    {produto.emoji}
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "var(--flux-gray-900)" }}>
                      {produto.nome}
                    </p>
                    <p style={{ fontSize: 11, color: "var(--flux-gray-500)" }}>Qtd. {quantidade}</p>
                  </div>
                </div>
                <span style={{ fontWeight: 800, fontSize: 14, color: "var(--flux-navy)" }}>
                  {formatBRL(produto.preco * quantidade)}
                </span>
              </div>
            ))}
          </div>

          <div className="flux-divider" style={{ margin: "12px 0" }} />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--flux-gray-600)", fontSize: 14 }}>Subtotal</span>
            <span style={{ fontWeight: 700 }}>{formatBRL(subtotal)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <span style={{ color: "var(--flux-gray-600)", fontSize: 14 }}>Desconto</span>
            <span style={{ fontWeight: 700, color: "var(--flux-success)" }}>R$ 0,00</span>
          </div>
          <div className="flux-divider" style={{ margin: "12px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontWeight: 800, fontSize: 15 }}>Total do Pedido</span>
            <span style={{ fontWeight: 800, fontSize: 16, color: "var(--flux-navy)" }}>
              {formatBRL(total)}
            </span>
          </div>
        </div>

        {/* Forma de Pagamento */}
        <div className="flux-card" style={{ padding: 16, marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <p style={{ fontWeight: 800, fontSize: 14 }}>Forma de Pagamento</p>
            <span style={{ fontSize: 12, color: "var(--flux-blue)", fontWeight: 700, cursor: "pointer" }}>
              Alterar
            </span>
          </div>
          <select
            className="flux-input"
            value={pagamento}
            onChange={(e) => setPagamento(e.target.value)}
            id="select-pagamento"
            style={{ fontFamily: "Manrope, sans-serif", cursor: "pointer" }}
          >
            {FORMAS_PAGAMENTO.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        {/* CTA */}
        <button
          className="btn btn-primary btn-full"
          id="btn-enviar-pedido"
          onClick={handleEnviar}
          disabled={loading || items.length === 0}
        >
          {loading ? (
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{
                width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)",
                borderTopColor: "white", borderRadius: "50%",
                animation: "spin 0.7s linear infinite", display: "inline-block"
              }} />
              Enviando Pedido...
            </span>
          ) : (
            "Enviar Pedido"
          )}
        </button>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
