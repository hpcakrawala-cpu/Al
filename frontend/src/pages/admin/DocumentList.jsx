import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Trash2, FilePlus2, ReceiptText, Search } from "lucide-react";
import { getDocuments, deleteDocument } from "../../lib/storage";
import { rupiah, formatDateID } from "../../lib/format";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

function docTotal(doc) {
  if (doc.type === "kwitansi") return Number(doc.amount) || 0;
  const sub = (doc.items || []).reduce((a, i) => a + i.qty * i.price, 0);
  return sub + Math.round((sub * (doc.taxRate || 0)) / 100);
}

export default function DocumentList() {
  const [docs, setDocs] = useState(getDocuments());
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("all");

  const remove = (id) => {
    deleteDocument(id);
    setDocs(getDocuments());
  };

  const filtered = docs.filter((d) => {
    const matchTab = tab === "all" || d.type === tab;
    const matchQ = !q || (d.number + d.clientName).toLowerCase().includes(q.toLowerCase());
    return matchTab && matchQ;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-white text-3xl">Semua Dokumen</h1>
          <p className="text-slate-400 mt-1">Kelola invoice dan kwitansi.</p>
        </div>
        <div className="flex gap-2">
          <Link to="/admin/invoice/baru"><Button className="rounded-full h-11 px-5 bg-gradient-to-r from-[#2f7bff] to-[#1f5fe0] text-white gap-2"><FilePlus2 size={18} /> Invoice</Button></Link>
          <Link to="/admin/kwitansi/baru"><Button variant="outline" className="rounded-full h-11 px-5 border-[#4facfe]/40 bg-transparent text-white hover:bg-[#4facfe]/10 hover:text-white gap-2"><ReceiptText size={18} /> Kwitansi</Button></Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari nomor / nama klien..." className="pl-10 h-12 bg-[#0a152b] border-[#4facfe]/20 text-white placeholder:text-slate-500" />
        </div>
        <div className="flex gap-2">
          {[{k:"all",l:"Semua"},{k:"invoice",l:"Invoice"},{k:"kwitansi",l:"Kwitansi"}].map((t) => (
            <button key={t.k} onClick={() => setTab(t.k)} className={`px-4 rounded-lg text-sm font-medium border ${tab===t.k?"bg-[#2f7bff] text-white border-transparent":"text-slate-300 border-[#4facfe]/30"}`}>{t.l}</button>
          ))}
        </div>
      </div>

      <div className="card-dark rounded-2xl mt-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-sm border-b border-white/10">
                <th className="p-4 font-medium">Nomor</th>
                <th className="p-4 font-medium">Tipe</th>
                <th className="p-4 font-medium">Klien</th>
                <th className="p-4 font-medium">Tanggal</th>
                <th className="p-4 font-medium text-right">Nilai</th>
                <th className="p-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4 text-white font-medium">{d.number}</td>
                  <td className="p-4"><span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${d.type==="invoice"?"bg-[#2f7bff]/15 text-[#4facfe]":"bg-emerald-500/15 text-emerald-400"}`}>{d.type==="invoice"?"Invoice":"Kwitansi"}</span></td>
                  <td className="p-4 text-slate-300">{d.clientName}</td>
                  <td className="p-4 text-slate-400">{formatDateID(d.date)}</td>
                  <td className="p-4 text-white font-semibold text-right">{rupiah(docTotal(d))}</td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <Link to={`/admin/dokumen/${d.id}`} className="h-9 w-9 grid place-items-center rounded-lg bg-[#2f7bff]/15 text-[#4facfe] hover:bg-[#2f7bff]/25"><Eye size={18} /></Link>
                      <button onClick={() => remove(d.id)} className="h-9 w-9 grid place-items-center rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="p-10 text-center text-slate-500">Tidak ada dokumen ditemukan.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
