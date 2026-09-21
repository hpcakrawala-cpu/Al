import React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { SERVICES, COMPANY } from "../mock";
import { Button } from "../components/ui/button";
import ProcessSection from "../components/sections/ProcessSection";
import CTASection from "../components/sections/CTASection";

export default function Services() {
  return (
    <>
      <section className="pt-[120px] pb-14 hero-radial">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
          <p className="section-line">Layanan Kami</p>
          <h1 className="mt-4 font-display font-extrabold text-white text-4xl sm:text-5xl max-w-3xl leading-tight">
            Produk Karoseri untuk Berbagai Kebutuhan Industri
          </h1>
          <p className="mt-6 text-slate-300 text-lg max-w-3xl leading-relaxed">
            Setiap unit dirancang khusus (custom) sesuai spesifikasi dan kebutuhan operasional bisnis Anda.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#060d1a]">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 space-y-8">
          {SERVICES.map((s, i) => (
            <div
              key={s.slug}
              className={`grid lg:grid-cols-2 gap-8 items-center card-dark rounded-3xl overflow-hidden ${
                i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="h-72 lg:h-full min-h-[320px]">
                <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 lg:p-12">
                <h2 className="font-display font-extrabold text-white text-3xl">{s.name}</h2>
                <p className="mt-4 text-slate-300 leading-relaxed">{s.desc}</p>
                <ul className="mt-6 space-y-3">
                  {["Material berkualitas & bergaransi", "Desain custom sesuai kebutuhan", "Pengerjaan presisi oleh ahli"].map((f) => (
                    <li key={f} className="flex gap-3 text-slate-300">
                      <CheckCircle2 size={20} className="text-[#4facfe] shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <span className="text-[#4facfe] font-bold text-lg">{s.price}</span>
                  <a href={`https://wa.me/${COMPANY.phoneRaw}`} target="_blank" rel="noreferrer">
                    <Button className="rounded-full h-12 px-6 bg-gradient-to-r from-[#2f7bff] to-[#1f5fe0] hover:from-[#3f8bff] hover:to-[#2f6fe8] text-white font-semibold gap-2">
                      Minta Penawaran <ArrowRight size={18} />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ProcessSection />
      <CTASection />
    </>
  );
}
