import Link from "next/link";

/* ============================================================
   Confirmação Page — tela de pedido enviado com sucesso
   ============================================================ */

export default function ConfirmacaoPage() {
  const numeroPedido = 1027; // Simulado; viria do DB

  return (
    <div
      style={{
        background: "var(--flux-bg)", minHeight: "100%",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "40px 24px", textAlign: "center",
      }}
    >
      {/* Check circle animado */}
      <div
        className="animate-scale-in"
        style={{
          width: 100, height: 100, borderRadius: "50%",
          background: "linear-gradient(135deg, var(--flux-success), #0f9e56)",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 24, boxShadow: "0 12px 40px rgba(24, 197, 106, 0.35)",
        }}
      >
        <svg width="52" height="52" fill="none" viewBox="0 0 24 24">
          <path
            d="M5 13l4 4L19 7"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 100,
              strokeDashoffset: 0,
              animation: "checkDraw 0.6s ease 0.3s both",
            }}
          />
        </svg>
      </div>

      {/* Title */}
      <h2
        className="animate-fade-up delay-1"
        style={{ fontSize: 24, fontWeight: 800, color: "var(--flux-gray-900)", marginBottom: 8 }}
      >
        Pedido Enviado!
      </h2>
      <p
        className="animate-fade-up delay-2"
        style={{ color: "var(--flux-gray-500)", fontSize: 14, lineHeight: 1.6, maxWidth: 280 }}
      >
        Seu pedido foi recebido pela fábrica e está sendo processado.
      </p>

      {/* Order Card */}
      <div
        className="flux-card animate-fade-up delay-3"
        style={{ width: "100%", maxWidth: 320, padding: "20px 24px", marginTop: 28, textAlign: "left" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontSize: 13, color: "var(--flux-gray-500)", fontWeight: 600 }}>Número do Pedido</span>
        </div>
        <p style={{ fontSize: 32, fontWeight: 800, color: "var(--flux-navy)", marginBottom: 16 }}>
          #{numeroPedido}
        </p>

        <div className="flux-divider" style={{ marginBottom: 16 }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, color: "var(--flux-gray-500)" }}>Data do Pedido</span>
            <span style={{ fontSize: 13, fontWeight: 700 }}>
              {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "var(--flux-gray-500)" }}>Status</span>
            <span className="badge badge-info">Pedido Recebido</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div
        className="animate-fade-up delay-4"
        style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 320, marginTop: 24 }}
      >
        <Link
          href="/app/pedidos"
          className="btn btn-primary btn-full"
          id="btn-ver-pedidos"
          style={{ textDecoration: "none", display: "flex" }}
        >
          Ver meus pedidos
        </Link>
        <Link
          href="/app/dashboard"
          className="btn btn-ghost btn-full"
          id="btn-ir-inicio"
          style={{ textDecoration: "none", display: "flex" }}
        >
          Ir para o Início
        </Link>
      </div>

      <style>{`
        @keyframes checkDraw {
          from { stroke-dashoffset: 100; }
          to   { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
