import React from "react";
import { Target, Eye, CheckCircle2, Award } from "lucide-react";
import { COMPANY, STATS } from "../mock";
import StatsSection from "../components/sections/StatsSection";
import CTASection from "../components/sections/CTASection";

const VALUES = [
  { icon: Award, title: "Kualitas", desc: "Standar mutu tinggi di setiap unit yang kami produksi." },
  { icon: CheckCircle2, title: "Integritas", desc: "Jujur, transparan, dan bertanggung jawab kepada klien." },
  { icon: Target, title: "Inovasi", desc: "Terus berinovasi dengan teknologi fabrikasi terkini." },
];

export default function About() {
  return (
    <>
      <section className="pt-[120px] pb-16 hero-radial">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
          <p className="section-line">Tentang Kami</p>
          <h1 className="mt-4 font-display font-extrabold text-white text-4xl sm:text-5xl max-w-3xl leading-tight">
            Membangun Karoseri Berkualitas Sejak {COMPANY.founded}
          </h1>
          <p className="mt-6 text-slate-300 text-lg max-w-3xl leading-relaxed">
            {COMPANY.name} adalah perusahaan manufaktur karoseri yang berkomitmen menghadirkan
            solusi kendaraan niaga berkualitas tinggi. Dengan pengalaman lebih dari satu dekade,
            kami dipercaya berbagai perusahaan untuk membangun unit yang kuat, aman, dan efisien.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#060d1a]">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-8">
          <div className="card-dark rounded-2xl p-9">
            <div className="h-14 w-14 grid place-items-center rounded-xl bg-[#2f7bff]/15 border border-[#4facfe]/30 text-[#4facfe]">
              <Target size={26} />
            </div>
            <h2 className="mt-5 font-display font-bold text-white text-2xl">Visi</h2>
            <p className="mt-3 text-slate-400 leading-relaxed">
              Menjadi perusahaan karoseri terdepan dan terpercaya di Indonesia yang mengedepankan
              kualitas, inovasi, dan kepuasan pelanggan.
            </p>
          </div>
          <div className="card-dark rounded-2xl p-9">
            <div className="h-14 w-14 grid place-items-center rounded-xl bg-[#2f7bff]/15 border border-[#4facfe]/30 text-[#4facfe]">
              <Eye size={26} />
            </div>
            <h2 className="mt-5 font-display font-bold text-white text-2xl">Misi</h2>
            <ul className="mt-3 space-y-2 text-slate-400">
              <li className="flex gap-2"><CheckCircle2 size={18} className="text-[#4facfe] shrink-0 mt-0.5" /> Menghasilkan produk karoseri bermutu tinggi.</li>
              <li className="flex gap-2"><CheckCircle2 size={18} className="text-[#4facfe] shrink-0 mt-0.5" /> Memberikan pelayanan terbaik & tepat waktu.</li>
              <li className="flex gap-2"><CheckCircle2 size={18} className="text-[#4facfe] shrink-0 mt-0.5" /> Mengembangkan SDM dan teknologi produksi.</li>
            </ul>
          </div>
        </div>
      </section>

      <StatsSection />

      <section className="py-20 bg-[#04070f]">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="section-line">Nilai Perusahaan</p>
            <h2 className="mt-4 font-display font-extrabold text-white text-3xl sm:text-4xl">Prinsip yang Kami Pegang</h2>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="card-dark rounded-2xl p-8 text-center">
                <div className="h-16 w-16 mx-auto grid place-items-center rounded-full bg-[#2f7bff]/15 border border-[#4facfe]/30 text-[#4facfe]">
                  <v.icon size={28} />
                </div>
                <h3 className="mt-5 text-white font-bold text-xl">{v.title}</h3>
                <p className="mt-3 text-slate-400">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
