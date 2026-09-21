import React from "react";
import { Link } from "react-router-dom";
import { FilePlus2, ReceiptText, FileText, TrendingUp, ArrowRight } from "lucide-react";
import { getDocuments } from "../../lib/storage";
import { rupiah, formatDateID } from "../../lib/format";

function invoiceTotal(doc) {
  if (doc.type === "kwitansi") return Number(doc.amount) || 0;
  const sub = (doc.items || []).reduce((a, i) => a + i.qty * i.price, 0);
  return sub + Math.round((sub * (doc.taxRate || 0)) / 100);
}

export default function Dashboard() {
  const docs = getDocuments();
  const invoices = docs.filter((d) => d.type === "invoice");
  const kwitansi = docs.filter((d) => d.type === "kwitansi");
  const totalValue = docs.reduce((a, d) => a + invoiceTotal(d), 0);

  const cards = [
    { label: "Total Dokumen", value: docs.length, icon: FileText },
    { label: "Invoice", value: invoices.length, icon: FilePlus2 },
    { label: "Kwitansi", value: kwitansi.length, icon: ReceiptText },
    { label: "Total Nilai", value: rupiah(totalValue), icon: TrendingUp, small: true },
  ];

  return (
    <div>
      <h1 className="font-display font-extrabold text-white text-3xl">Dashboard</h1>
      <p className="text-slate-400 mt-1">Ringkasan dokumen invoice & kwitansi Anda.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
        {cards.map((c) => (
          <div key={c.label} className="card-dark rounded-2xl p-6">
            <div className="h-11 w-11 grid place-items-center rounded-xl bg-[#2f7bff]/15 border border-[#4facfe]/30 text-[#4facfe]">
              <c.icon size={22} />
            </div>
            <div className={`mt-4 font-display font-extrabold text-white ${c.small ? "text-xl" : "text-3xl"}`}>{c.value}</div>
            <div className="text-slate-400 text-sm">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mt-6">
        <Link to="/admin/invoice/baru" className="card-dark rounded-2xl p-7 flex items-center justify-between hover:border-[#4facfe]/50 transition-brand group">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 grid place-items-center rounded-xl bg-gradient-to-r from-[#2f7bff] to-[#1f5fe0] text-white"><FilePlus2 size={24} /></div>
            <div>
              <div className="text-white font-bold text-lg">Buat Invoice Baru</div>
              <div className="text-slate-400 text-sm">Tagihan dengan kop surat & PPN</div>
            </div>
          </div>
          <ArrowRight className="text-[#4facfe] group-hover:translate-x-1 transition-brand" />
        </Link>
        <Link to="/admin/kwitansi/baru" className="card-dark rounded-2xl p-7 flex items-center justify-between hover:border-[#4facfe]/50 transition-brand group">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 grid place-items-center rounded-xl bg-gradient-to-r from-[#2f7bff] to-[#1f5fe0] text-white"><ReceiptText size={24} /></div>
            <div>
              <div className="text-white font-bold text-lg">Buat Kwitansi Baru</div>
              <div className="text-slate-400 text-sm">Tanda terima pembayaran</div>
            </div>
          </div>
          <ArrowRight className="text-[#4facfe] group-hover:translate-x-1 transition-brand" />
        </Link>
      </div>

      {/* Recent */}
      <div className="card-dark rounded-2xl p-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold text-lg">Dokumen Terbaru</h2>
          <Link to="/admin/dokumen" className="text-[#4facfe] text-sm hover:underline">Lihat semua</Link>
        </div>
        <div className="space-y-2">
          {docs.slice(0, 5).map((d) => (
            <Link key={d.id} to={`/admin/dokumen/${d.id}`} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-brand">
              <div className="flex items-center gap-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${d.type === "invoice" ? "bg-[#2f7bff]/15 text-[#4facfe]" : "bg-emerald-500/15 text-emerald-400"}`}>
                  {d.type === "invoice" ? "Invoice" : "Kwitansi"}
                </span>
                <div>
                  <div className="text-white font-medium">{d.number}</div>
                  <div className="text-slate-400 text-xs">{d.clientName} • {formatDateID(d.date)}</div>
                </div>
              </div>
              <div className="text-white font-semibold">{rupiah(invoiceTotal(d))}</div>
            </Link>
          ))}
          {docs.length === 0 && <p className="text-slate-500 text-sm text-center py-6">Belum ada dokumen.</p>}
        </div>
      </div>
    </div>
  );
}
