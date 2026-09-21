import React from "react";
import { Outlet, NavLink, useNavigate, Navigate, Link } from "react-router-dom";
import { LayoutDashboard, FileText, ReceiptText, FilePlus2, LogOut, ExternalLink } from "lucide-react";
import { isAuthed, setAuth } from "../../lib/storage";
import Logo from "../../components/Logo";
import { Button } from "../../components/ui/button";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/dokumen", label: "Semua Dokumen", icon: FileText },
  { to: "/admin/invoice/baru", label: "Buat Invoice", icon: FilePlus2 },
  { to: "/admin/kwitansi/baru", label: "Buat Kwitansi", icon: ReceiptText },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  if (!isAuthed()) return <Navigate to="/admin/login" replace />;

  const logout = () => {
    setAuth(false);
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#0a1120] flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-[#060d1a] border-r border-[#4facfe]/15 p-6 fixed inset-y-0">
        <Link to="/"><Logo size={48} /></Link>
        <nav className="mt-10 space-y-1.5 flex-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-brand ${
                  isActive ? "bg-gradient-to-r from-[#2f7bff] to-[#1f5fe0] text-white" : "text-slate-300 hover:bg-white/5"
                }`
              }
            >
              <l.icon size={20} /> {l.label}
            </NavLink>
          ))}
        </nav>
        <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-[#4facfe] px-4 py-2 text-sm">
          <ExternalLink size={16} /> Lihat Website
        </a>
        <Button onClick={logout} variant="ghost" className="justify-start gap-3 text-slate-300 hover:bg-white/5 hover:text-white mt-2">
          <LogOut size={20} /> Keluar
        </Button>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 bg-[#060d1a] border-b border-[#4facfe]/15 px-4 h-16 flex items-center justify-between">
        <Logo size={44} />
        <div className="flex gap-1 overflow-x-auto">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => `p-2.5 rounded-lg ${isActive ? "bg-[#2f7bff] text-white" : "text-slate-300"}`}>
              <l.icon size={20} />
            </NavLink>
          ))}
          <button onClick={logout} className="p-2.5 text-slate-300"><LogOut size={20} /></button>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 lg:ml-72 pt-20 lg:pt-8 px-5 lg:px-10 pb-16">
        <Outlet />
      </main>
    </div>
  );
}
