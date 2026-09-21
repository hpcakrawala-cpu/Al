import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SERVICES } from "../../mock";
import { Button } from "../ui/button";

export default function ServicesSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#060d1a]">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="section-line">Layanan Kami</p>
            <h2 className="mt-4 font-display font-extrabold text-white text-3xl sm:text-4xl leading-tight">
              Produk Karoseri Berkualitas, Untuk Berbagai Industri
            </h2>
            <p className="mt-5 text-slate-400 leading-relaxed">
              Kami menyediakan berbagai jenis karoseri dengan teknologi modern dan tenaga ahli
              berpengalaman, untuk mendukung operasional bisnis Anda.
            </p>
            <Link to="/layanan">
              <Button variant="outline" className="mt-8 rounded-full h-13 px-7 py-6 border-[#4facfe]/40 bg-transparent text-white hover:bg-[#4facfe]/10 hover:text-white gap-2">
                Lihat Semua Layanan <ArrowRight size={18} className="text-[#4facfe]" />
              </Button>
            </Link>
          </div>

          <div className="lg:col-span-8 grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {SERVICES.map((s) => (
              <div
                key={s.slug}
                className="card-dark rounded-2xl p-5 group hover:border-[#4facfe]/50 hover:-translate-y-1 transition-brand"
              >
                <div className="rounded-xl overflow-hidden mb-4 h-28">
                  <img src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-brand" />
                </div>
                <h3 className="text-white font-bold text-lg">{s.name}</h3>
                <p className="mt-2 text-slate-400 text-sm leading-relaxed min-h-[60px]">{s.short}</p>
                <Link
                  to="/layanan"
                  className="mt-4 inline-grid h-10 w-10 place-items-center rounded-full border border-[#4facfe]/40 text-[#4facfe] hover:bg-[#4facfe] hover:text-white transition-brand"
                >
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
