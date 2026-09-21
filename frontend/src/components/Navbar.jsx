import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, UserRound } from "lucide-react";
import { NAV, COMPANY } from "../mock";
import Logo from "./Logo";
import { Button } from "./ui/button";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-brand ${
        scrolled
          ? "bg-[#060d1a]/95 backdrop-blur-md border-b border-[#4facfe]/15 shadow-lg shadow-black/40"
          : "bg-gradient-to-b from-[#060d1a]/80 to-transparent"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-5 lg:px-8 h-[76px] flex items-center justify-between">
        <Link to="/" aria-label="Beranda">
          <Logo size={46} />
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {NAV.map((item) => {
            const active = location.pathname === item.to;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`relative text-[15px] font-medium transition-brand hover:text-[#4facfe] ${
                    active ? "text-[#4facfe]" : "text-slate-200"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-[#4facfe] rounded-full" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <a href={`https://wa.me/${COMPANY.phoneRaw}`} target="_blank" rel="noreferrer">
            <Button className="rounded-full h-11 px-6 bg-gradient-to-r from-[#2f7bff] to-[#1f5fe0] hover:from-[#3f8bff] hover:to-[#2f6fe8] text-white font-semibold gap-2 brand-glow">
              <UserRound size={18} /> Konsultasi Sekarang
            </Button>
          </a>
        </div>

        <button
          className="lg:hidden text-white p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#060d1a]/98 backdrop-blur-md border-t border-[#4facfe]/15 px-5 py-5">
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`block py-3 px-3 rounded-lg text-[15px] font-medium ${
                    location.pathname === item.to
                      ? "text-[#4facfe] bg-[#4facfe]/10"
                      : "text-slate-200"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href={`https://wa.me/${COMPANY.phoneRaw}`} target="_blank" rel="noreferrer">
            <Button className="mt-4 w-full rounded-full h-12 bg-gradient-to-r from-[#2f7bff] to-[#1f5fe0] text-white font-semibold gap-2">
              <UserRound size={18} /> Konsultasi Sekarang
            </Button>
          </a>
        </div>
      )}
    </header>
  );
}
