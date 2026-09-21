import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Trash2, FileSignature, Search, Plus } from "lucide-react";
import { getLetters, deleteLetter } from "../../lib/letters";
import { formatDateID } from "../../lib/format";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

const statusStyle = {
  Draft: "bg-slate-500/20 text-slate-300",
  Terkirim: "bg-emerald-500/15 text-emerald-400",
};

export default function SuratList() {
  const [items, setItems] = useState(getLetters());
  const [q, setQ] = useState("");

  const remove = (id) => {
    deleteLetter(id);
    setItems(getLetters());
  };

  const filtered = items.filter(
    (d) => !q || (d.number + d.perihal + d.recipientName).toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-white text-3xl">Kop Surat</h1>
          <p className="text-slate-400 mt-1">Buat, edit, cetak & kirim surat resmi perusahaan.</p>
        </div>
        <Link to="/admin/surat/baru">
          <Button className="rounded-full h-11 px-5 bg-gradient-to-r from-[#2f7bff] to-[#1f5fe0] text-white gap-2"><Plus size={18} /> Buat Surat</Button>
        </Link>
      </div>

      <div className="relative mt-8 max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari nomor / perihal / penerima..." className="pl-10 h-12 bg-[#0a152b] border-[#4facfe]/20 text-white placeholder:text-slate-500" />
      </div>

      <div className="card-dark rounded-2xl mt-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-sm border-b border-white/10">
                <th className="p-4 font-medium">Nomor</th>
                <th className="p-4 font-medium">Perihal</th>
                <th className="p-4 font-medium">Penerima</th>
                <th className="p-4 font-medium">Tanggal</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4 text-white font-medium whitespace-nowrap">{d.number}</td>
                  <td className="p-4 text-slate-300 max-w-[240px]">{d.perihal}</td>
                  <td className="p-4 text-slate-400">{d.recipientCompany || d.recipientName}</td>
                  <td className="p-4 text-slate-400 whitespace-nowrap">{formatDateID(d.date)}</td>
                  <td className="p-4"><span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle[d.status] || statusStyle.Draft}`}>{d.status || "Draft"}</span></td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <Link to={`/admin/surat/${encodeURIComponent(d.id)}`} className="h-9 w-9 grid place-items-center rounded-lg bg-[#2f7bff]/15 text-[#4facfe] hover:bg-[#2f7bff]/25"><Eye size={18} /></Link>
                      <button onClick={() => remove(d.id)} className="h-9 w-9 grid place-items-center rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="p-10 text-center text-slate-500"><FileSignature className="mx-auto mb-2 opacity-40" /> Belum ada surat.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
