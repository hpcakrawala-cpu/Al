import React from "react";
import { useNavigate } from "react-router-dom";
import { Download, ArrowLeft, Phone, Mail, MapPin, ShieldCheck, Settings, Clock, Headphones, CheckCircle2 } from "lucide-react";
import { COMPANY, SERVICES, STATS } from "../mock";
import Logo from "../components/Logo";
import { Button } from "../components/ui/button";

export default function CompanyProfile() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0a1120] py-8 print:bg-white print:py-0">
      {/* Toolbar */}
      <div className="no-print max-w-[820px] mx-auto px-4 mb-6 flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate(-1)} className="text-white gap-2 hover:bg-white/10">
          <ArrowLeft size={18} /> Kembali
        </Button>
        <Button onClick={() => window.print()} className="rounded-full h-11 px-6 bg-gradient-to-r from-[#2f7bff] to-[#1f5fe0] text-white gap-2">
          <Download size={18} /> Download PDF
        </Button>
      </div>

      {/* Document */}
      <div className="print-area max-w-[820px] mx-auto bg-white text-slate-800 shadow-2xl print:shadow-none">
        {/* Cover */}
        <div className="bg-gradient-to-br from-[#0a1a38] to-[#0d2350] text-white p-12">
          <Logo size={64} />
          <div className="mt-16">
            <p className="text-[#4facfe] font-semibold tracking-[0.2em] uppercase text-sm">Company Profile</p>
            <h1 className="mt-3 font-display font-extrabold text-4xl leading-tight">Solusi Karoseri Untuk Segala Kebutuhan Bisnis Anda</h1>
            <p className="mt-4 text-slate-300 max-w-lg">{COMPANY.tagline}</p>
          </div>
          <div className="mt-16 grid grid-cols-4 gap-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display font-extrabold text-2xl text-[#4facfe]">{s.value}</div>
                <div className="text-xs text-slate-300">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="p-12 space-y-10">
          <section>
            <h2 className="font-display font-bold text-2xl text-[#0d2350]">Tentang Perusahaan</h2>
            <div className="h-1 w-16 bg-[#2f7bff] rounded-full mt-2 mb-4" />
            <p className="leading-relaxed text-slate-600">
              {COMPANY.name} adalah perusahaan manufaktur karoseri yang berdiri sejak {COMPANY.founded}.
              Kami berkomitmen menghadirkan solusi kendaraan niaga berkualitas tinggi dengan desain modern,
              kuat, dan fungsional. Dengan tenaga ahli berpengalaman dan teknologi fabrikasi terkini,
              kami dipercaya berbagai perusahaan di seluruh Indonesia.
            </p>
          </section>

          <section className="grid sm:grid-cols-2 gap-6">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <h3 className="font-bold text-lg text-[#0d2350]">Visi</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">Menjadi perusahaan karoseri terdepan dan terpercaya di Indonesia yang mengedepankan kualitas, inovasi, dan kepuasan pelanggan.</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <h3 className="font-bold text-lg text-[#0d2350]">Misi</h3>
              <ul className="mt-2 text-sm text-slate-600 space-y-1.5">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-[#2f7bff] shrink-0 mt-0.5" /> Menghasilkan produk bermutu tinggi.</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-[#2f7bff] shrink-0 mt-0.5" /> Pelayanan terbaik & tepat waktu.</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-[#2f7bff] shrink-0 mt-0.5" /> Mengembangkan SDM & teknologi.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-[#0d2350]">Produk & Layanan</h2>
            <div className="h-1 w-16 bg-[#2f7bff] rounded-full mt-2 mb-4" />
            <div className="grid sm:grid-cols-2 gap-4">
              {SERVICES.map((s) => (
                <div key={s.slug} className="flex gap-4 border border-slate-100 rounded-xl p-4">
                  <img src={s.image} alt={s.name} className="h-16 w-20 object-cover rounded-lg" />
                  <div>
                    <h3 className="font-bold text-[#0d2350]">{s.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{s.short}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-[#0d2350]">Mengapa Memilih Kami</h2>
            <div className="h-1 w-16 bg-[#2f7bff] rounded-full mt-2 mb-4" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[{i:ShieldCheck,t:"Kualitas Terjamin"},{i:Settings,t:"Desain Custom"},{i:Clock,t:"Tepat Waktu"},{i:Headphones,t:"Purna Jual"}].map((f) => (
                <div key={f.t} className="text-center">
                  <div className="h-12 w-12 mx-auto grid place-items-center rounded-full bg-[#2f7bff]/10 text-[#2f7bff]"><f.i size={22} /></div>
                  <div className="mt-2 text-sm font-medium text-slate-700">{f.t}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Contact footer */}
        <div className="bg-[#0a1a38] text-white p-10 grid sm:grid-cols-3 gap-6 text-sm">
          <div className="flex gap-3"><MapPin size={18} className="text-[#4facfe] shrink-0" /> {COMPANY.address}</div>
          <div className="flex gap-3 items-center"><Mail size={18} className="text-[#4facfe] shrink-0" /> {COMPANY.email}</div>
          <div className="flex gap-3 items-center"><Phone size={18} className="text-[#4facfe] shrink-0" /> {COMPANY.phone}</div>
        </div>
      </div>
    </div>
  );
}
