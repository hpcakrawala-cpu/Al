import React from "react";
import { Phone, ArrowRight } from "lucide-react";
import { COMPANY } from "../../mock";
import { Button } from "../ui/button";

export default function CTASection() {
  return (
    <section className="py-16 lg:py-20 bg-[#04070f]">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0d2350] to-[#0a1a38] border border-[#4facfe]/25 px-8 py-12 lg:px-16 lg:py-16">
          <div className="absolute -right-16 -top-16 h-64 w-64 bg-[#2f7bff]/25 blur-3xl rounded-full" />
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="font-display font-extrabold text-white text-3xl sm:text-4xl leading-tight">
                Siap Wujudkan Karoseri Impian Bisnis Anda?
              </h2>
              <p className="mt-4 text-slate-300 text-lg">
                Konsultasikan kebutuhan unit Anda dengan tim ahli kami sekarang juga—gratis tanpa komitmen.
              </p>
            </div>
            <a href={`https://wa.me/${COMPANY.phoneRaw}`} target="_blank" rel="noreferrer" className="shrink-0">
              <Button className="rounded-full h-14 px-8 text-[15px] bg-gradient-to-r from-[#2f7bff] to-[#1f5fe0] hover:from-[#3f8bff] hover:to-[#2f6fe8] text-white font-semibold gap-2 brand-glow">
                <Phone size={18} /> Hubungi Kami <ArrowRight size={18} />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
