import Link from "next/link";
import { mockUser } from "@/lib/mock-data";
import { PageHeader } from "@/components/navigation/PageHeader";

/* ============================================================
   Mais Page — perfil do vendedor e configurações
   ============================================================ */

const MENU_ITEMS = [
  { label: "Ver meu perfil", href: "#", icon: "👤", section: "Vendedor" },
  { label: "Configurações", href: "#", icon: "⚙️", section: "Preferências" },
  { label: "Notificações", href: "#", icon: "🔔", section: "Preferências" },
  { label: "Sobre o aplicativo", href: "#", icon: "ℹ️", section: "Suporte" },
  { label: "Ajuda e Suporte", href: "#", icon: "🆘", section: "Suporte" },
  { label: "Sair do aplicativo", href: "/login", icon: "🚪", section: "Conta", danger: true },
];

const groups = Array.from(new Set(MENU_ITEMS.map((i) => i.section)));

export default function MaisPage() {
  return (
    <div style={{ background: "var(--flux-bg)", minHeight: "100%" }}>
      <PageHeader title="Mais" />

      <div style={{ padding: "12px 16px" }}>
        {/* Profile Card */}
        <div
          className="flux-card-navy animate-fade-up"
          style={{ padding: "24px 20px", marginBottom: 20, display: "flex", gap: 16, alignItems: "center" }}
        >
          <div
            style={{
              width: 56, height: 56, borderRadius: 16, background: "var(--flux-teal)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 800, fontSize: 20, color: "white", flexShrink: 0,
            }}
          >
            JV
          </div>
          <div>
            <p style={{ fontWeight: 800, fontSize: 17, color: "white" }}>
              {mockUser.nome}
            </p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", marginTop: 2 }}>
              {mockUser.email}
            </p>
            <span
              style={{
                display: "inline-block", marginTop: 6, background: "rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.9)", padding: "2px 10px", borderRadius: 20,
                fontSize: 12, fontWeight: 700,
              }}
            >
              Vendedor
            </span>
          </div>
        </div>

        {/* Menu Sections */}
        {groups.map((group) => {
          const items = MENU_ITEMS.filter((i) => i.section === group);
          return (
            <div key={group} className="animate-fade-up delay-1" style={{ marginBottom: 16 }}>
              <p
                style={{
                  fontSize: 11, fontWeight: 700, color: "var(--flux-gray-400)",
                  textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8, paddingLeft: 4,
                }}
              >
                {group}
              </p>
              <div className="flux-card" style={{ overflow: "hidden", padding: 0 }}>
                {items.map((item, idx) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    style={{
                      display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
                      borderBottom: idx < items.length - 1 ? "1px solid var(--flux-gray-100)" : "none",
                      textDecoration: "none", transition: "background 0.15s ease",
                    }}
                  >
                    <span style={{ fontSize: 20, width: 28, textAlign: "center" }}>
                      {item.icon}
                    </span>
                    <span
                      style={{
                        flex: 1, fontSize: 14, fontWeight: 600,
                        color: item.danger ? "var(--flux-danger)" : "var(--flux-gray-800)",
                      }}
                    >
                      {item.label}
                    </span>
                    {!item.danger && (
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" style={{ color: "var(--flux-gray-300)" }}>
                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        <p style={{ textAlign: "center", fontSize: 12, color: "var(--flux-gray-400)", marginTop: 8, paddingBottom: 8 }}>
          Flux v1.0.0 — © 2026 Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}
