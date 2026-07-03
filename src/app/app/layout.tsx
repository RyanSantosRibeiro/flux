import { CartProvider } from "@/providers/CartProvider";
import { BottomNavigation } from "@/components/navigation/BottomNavigation";

/* ============================================================
   App Layout — layout mobile-first para todas as telas autenticadas
   ============================================================ */

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="app-shell">
        {/* Conteúdo com scroll, respeitando a bottom nav */}
        <main className="app-screen">{children}</main>

        {/* Barra de navegação fixada na parte inferior */}
        <BottomNavigation />
      </div>
    </CartProvider>
  );
}
