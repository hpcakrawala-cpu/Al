import React, { useState } from "react";
import { MapPin, Mail, Phone, Send, Clock } from "lucide-react";
import { COMPANY } from "../mock";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useToast } from "../hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Lengkapi data", description: "Nama, email, dan pesan wajib diisi." });
      return;
    }
    toast({ title: "Pesan terkirim!", description: "Terima kasih, tim kami akan menghubungi Anda segera." });
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <>
      <section className="pt-[120px] pb-14 hero-radial">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
          <p className="section-line">Kontak</p>
          <h1 className="mt-4 font-display font-extrabold text-white text-4xl sm:text-5xl max-w-3xl leading-tight">
            Mari Berbicara Tentang Kebutuhan Anda
          </h1>
        </div>
      </section>

      <section className="py-16 bg-[#060d1a]">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-10">
          {/* Info */}
          <div className="space-y-5">
            {[
              { icon: MapPin, title: "Alamat", value: COMPANY.address },
              { icon: Mail, title: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
              { icon: Phone, title: "Telepon / WhatsApp", value: COMPANY.phone, href: `https://wa.me/${COMPANY.phoneRaw}` },
              { icon: Clock, title: "Jam Operasional", value: "Senin - Sabtu, 08.00 - 17.00 WIB" },
            ].map((c) => (
              <div key={c.title} className="card-dark rounded-2xl p-6 flex gap-4">
                <div className="h-12 w-12 shrink-0 grid place-items-center rounded-xl bg-[#2f7bff]/15 border border-[#4facfe]/30 text-[#4facfe]">
                  <c.icon size={22} />
                </div>
                <div>
                  <div className="text-white font-semibold">{c.title}</div>
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#4facfe] break-words">{c.value}</a>
                  ) : (
                    <div className="text-slate-400">{c.value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="card-dark rounded-2xl p-8">
            <h2 className="font-display font-bold text-white text-2xl">Kirim Pesan</h2>
            <form onSubmit={submit} className="mt-6 space-y-4">
              <div>
                <label className="text-sm text-slate-300">Nama Lengkap</label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nama Anda" className="mt-1.5 bg-[#0a152b] border-[#4facfe]/20 text-white placeholder:text-slate-500 h-12" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-300">Email</label>
                  <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@contoh.com" className="mt-1.5 bg-[#0a152b] border-[#4facfe]/20 text-white placeholder:text-slate-500 h-12" />
                </div>
                <div>
                  <label className="text-sm text-slate-300">No. Telepon</label>
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="08xx" className="mt-1.5 bg-[#0a152b] border-[#4facfe]/20 text-white placeholder:text-slate-500 h-12" />
                </div>
              </div>
              <div>
                <label className="text-sm text-slate-300">Pesan</label>
                <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Ceritakan kebutuhan karoseri Anda..." rows={5} className="mt-1.5 bg-[#0a152b] border-[#4facfe]/20 text-white placeholder:text-slate-500" />
              </div>
              <Button type="submit" className="w-full h-13 py-6 rounded-full bg-gradient-to-r from-[#2f7bff] to-[#1f5fe0] hover:from-[#3f8bff] hover:to-[#2f6fe8] text-white font-semibold gap-2">
                <Send size={18} /> Kirim Pesan
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
