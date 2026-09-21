import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, ShieldCheck, Settings, Clock, Headphones } from "lucide-react";
import { HERO_IMAGE, FEATURES } from "../../mock";
import { Button } from "../ui/button";

const iconMap = { ShieldCheck, Settings, Clock, Headphones };

export default function Hero() {
  return (
    <section className="relative hero-radial overflow-hidden pt-[76px]">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center min-h-[calc(100vh-76px)] py-12">
          {/* Left */}
          <div className="fade-up">
            <p className="section-line">Karoseri Universal Industri</p>
            <h1 className="mt-4 font-display font-extrabold text-white leading-[1.05] text-4xl sm:text-5xl xl:text-[64px]">
              Solusi Karoseri{" "}
              <span className="text-gradient-blue">Untuk Segala Kebutuhan Bisnis Anda</span>
            </h1>
            <p className="mt-6 text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
              Kami hadir sebagai mitra terpercaya dalam pembuatan karoseri berkualitas tinggi
              dengan desain modern, kuat, dan fungsional untuk mendukung pertumbuhan bisnis Anda.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link to="/layanan">
                <Button className="rounded-full h-14 px-8 text-[15px] bg-gradient-to-r from-[#2f7bff] to-[#1f5fe0] hover:from-[#3f8bff] hover:to-[#2f6fe8] text-white font-semibold gap-2 brand-glow">
                  Lihat Layanan Kami <ArrowRight size={18} />
                </Button>
              </Link>
              <button className="flex items-center gap-3 group">
                <span className="h-14 w-14 grid place-items-center rounded-full border-2 border-[#4facfe] text-[#4facfe] group-hover:bg-[#4facfe] group-hover:text-white transition-brand">
                  <Play size={20} fill="currentColor" />
                </span>
                <span className="text-left">
                  <span className="block text-white font-semibold">Tonton Profil Kami</span>
                  <span className="block text-slate-400 text-sm">Video Company Profile</span>
                </span>
              </button>
            </div>
          </div>

          {/* Right image */}
          <div className="relative fade-up">
            <div className="absolute -inset-6 bg-[#2f7bff]/20 blur-3xl rounded-full" />
            <div className="relative rounded-2xl overflow-hidden border border-[#4facfe]/20 shadow-2xl shadow-[#2f7bff]/20 float-slow">
              <img src={HERO_IMAGE} alt="Karoseri truk premium" className="w-full h-[340px] sm:h-[440px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060d1a]/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Feature bar */}
      <div className="border-t border-[#4facfe]/15 bg-[#071226]/60 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => {
              const Icon = iconMap[f.icon];
              return (
                <div
                  key={f.title}
                  className={`flex items-center gap-4 py-7 px-2 lg:px-6 ${
                    i !== FEATURES.length - 1 ? "lg:border-r border-[#4facfe]/12" : ""
                  }`}
                >
                  <span className="h-14 w-14 shrink-0 grid place-items-center rounded-full bg-[#0e1c36] border border-[#4facfe]/25 text-[#4facfe]">
                    <Icon size={24} />
                  </span>
                  <div>
                    <div className="text-white font-semibold">{f.title}</div>
                    <div className="text-slate-400 text-sm">{f.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
