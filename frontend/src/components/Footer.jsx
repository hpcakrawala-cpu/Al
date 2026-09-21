import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Youtube, Music2, Facebook, MapPin, Mail, Phone, ArrowRight } from "lucide-react";
import { COMPANY, NAV, SERVICES } from "../mock";
import Logo from "./Logo";

const iconMap = { Instagram, Youtube, Music2, Facebook };

export default function Footer() {
  return (
    <footer className="relative bg-[#04070f] border-t border-[#4facfe]/15 pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Logo size={72} />
            <p className="mt-5 text-slate-400 text-[15px] leading-relaxed">
              {COMPANY.tagline}. Mitra terpercaya dalam pembuatan karoseri berkualitas tinggi.
            </p>
            <div className="flex gap-3 mt-5">
              {[Instagram, Youtube, Music2, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-10 w-10 grid place-items-center rounded-full bg-[#0e1c36] border border-[#4facfe]/20 text-slate-300 hover:text-white hover:bg-[#2f7bff] hover:border-[#2f7bff]"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-5">Navigasi</h4>
            <ul className="space-y-3">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-slate-400 hover:text-[#4facfe] flex items-center gap-2">
                    <ArrowRight size={14} /> {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-5">Layanan</h4>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link to="/layanan" className="text-slate-400 hover:text-[#4facfe] flex items-center gap-2">
                    <ArrowRight size={14} /> {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-5">Kontak</h4>
            <ul className="space-y-4 text-slate-400 text-[15px]">
              <li className="flex gap-3">
                <MapPin size={20} className="text-[#4facfe] shrink-0 mt-0.5" />
                <span>{COMPANY.address}</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={18} className="text-[#4facfe] shrink-0" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-[#4facfe] break-all">{COMPANY.email}</a>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={18} className="text-[#4facfe] shrink-0" />
                <a href={`tel:${COMPANY.phoneRaw}`} className="hover:text-[#4facfe]">{COMPANY.phone}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} {COMPANY.name}. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-5 text-sm">
            <Link to="/company-profile" className="text-slate-400 hover:text-[#4facfe]">Company Profile</Link>
            <Link to="/admin/login" className="text-slate-400 hover:text-[#4facfe]">Panel Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
