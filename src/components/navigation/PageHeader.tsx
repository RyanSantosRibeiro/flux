import Link from "next/link";
import type { ReactNode } from "react";

/* ============================================================
   PageHeader — cabeçalho padrão de página interna
   ============================================================ */

interface PageHeaderProps {
  title: string;
  backHref?: string;
  rightSlot?: ReactNode;
}

export function PageHeader({ title, backHref, rightSlot }: PageHeaderProps) {
  return (
    <div className="page-header">
      {backHref && (
        <Link
          href={backHref}
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "var(--flux-gray-100)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            color: "var(--flux-gray-700)",
          }}
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path
              d="M19 12H5M12 19l-7-7 7-7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      )}
      <h1 className="page-header-title" style={{ flex: 1 }}>
        {title}
      </h1>
      {rightSlot && rightSlot}
    </div>
  );
}
