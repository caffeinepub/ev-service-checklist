import { ClipboardList, History, Menu, PlusCircle, X, Zap } from "lucide-react";
import { useState } from "react";
import type { Page } from "../types";

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const NAV_ITEMS: { page: Page; label: string; icon: React.ElementType }[] = [
  { page: "diagnosis", label: "New Diagnosis", icon: PlusCircle },
  { page: "reports", label: "Reports", icon: ClipboardList },
  { page: "history", label: "History", icon: History },
];

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-primary flex-shrink-0">
          <Zap size={18} className="text-white" />
        </div>
        <div>
          <div className="text-white font-bold text-base leading-tight tracking-wide">
            EV Service Pro
          </div>
          <div className="text-white/40 text-xs">Technician Dashboard</div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1" data-ocid="nav.panel">
        <div className="text-white/30 text-[10px] font-bold uppercase tracking-widest px-3 mb-3">
          Menu
        </div>
        {NAV_ITEMS.map(({ page, label, icon: Icon }) => {
          const active = currentPage === page;
          return (
            <button
              key={page}
              type="button"
              onClick={() => {
                onNavigate(page);
                setMobileOpen(false);
              }}
              data-ocid={`nav.${page}.link`}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "text-white/60 hover:text-white hover:bg-white/8"
              }`}
            >
              <Icon size={16} />
              {label}
              {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center">
            <span className="text-primary text-xs font-bold">T</span>
          </div>
          <div>
            <div className="text-white text-xs font-semibold">Technician</div>
            <div className="text-white/40 text-[10px]">Workshop Staff</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside
        className="hidden md:flex flex-col w-56 flex-shrink-0 h-screen sticky top-0"
        style={{ background: "oklch(var(--sidebar-bg))" }}
      >
        <NavContent />
      </aside>

      <button
        type="button"
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
        style={{ background: "oklch(var(--sidebar-bg))" }}
        onClick={() => setMobileOpen((v) => !v)}
        data-ocid="nav.mobile_menu.button"
      >
        {mobileOpen ? (
          <X size={18} className="text-white" />
        ) : (
          <Menu size={18} className="text-white" />
        )}
      </button>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 bg-black/50 w-full h-full cursor-default"
            onClick={() => setMobileOpen(false)}
          />
          <aside
            className="relative z-50 w-64 h-full"
            style={{ background: "oklch(var(--sidebar-bg))" }}
          >
            <NavContent />
          </aside>
        </div>
      )}
    </>
  );
}
