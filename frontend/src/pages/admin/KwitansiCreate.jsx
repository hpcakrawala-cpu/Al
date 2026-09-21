import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, ArrowLeft } from "lucide-react";
import { saveDocument, nextNumber } from "../../lib/storage";
import { rupiah, terbilang } from "../../lib/format";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { useToast } from "../../hooks/use-toast";

const inputCls = "h-11 bg-[#0a152b] border-[#4facfe]/20 text-white placeholder:text-slate-500";
const labelCls = "text-sm text-slate-300";

export default function KwitansiCreate() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const today = new Date().toISOString().slice(0, 10);

  const [form, setForm] = useState({
    number: nextNumber("kwitansi"),
    date: today,
    clientName: "",
    amount: 0,
    forPayment: "",
    place: "Pekanbaru",
    signer: "Direktur",
  });
  const set = (k, v) => setForm({ ...form, [k]: v });

  const save = () => {
    if (!form.clientName || !form.amount || !form.forPayment) {
      toast({ title: "Lengkapi data", description: "Nama, jumlah, dan keterangan wajib diisi." });
      return;
    }
    const doc = { id: form.number, type: "kwitansi", ...form, amount: Number(form.amount) };
    saveDocument(doc);
    toast({ title: "Kwitansi tersimpan", description: form.number });
    navigate(`/admin/dokumen/${doc.id}`);
  };

  return (
    <div className="max-w-3xl">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white mb-4"><ArrowLeft size={18} /> Kembali</button>
      <h1 className="font-display font-extrabold text-white text-3xl">Buat Kwitansi</h1>
      <p className="text-slate-400 mt-1">Tanda terima pembayaran dengan terbilang otomatis.</p>

      <div className="card-dark rounded-2xl p-6 mt-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className={labelCls}>No. Kwitansi</label><Input value={form.number} onChange={(e)=>set("number",e.target.value)} className={`mt-1.5 ${inputCls}`} /></div>
          <div><label className={labelCls}>Tanggal</label><Input type="date" value={form.date} onChange={(e)=>set("date",e.target.value)} className={`mt-1.5 ${inputCls}`} /></div>
        </div>
        <div><label className={labelCls}>Telah Terima Dari</label><Input value={form.clientName} onChange={(e)=>set("clientName",e.target.value)} placeholder="Nama / PT pembayar" className={`mt-1.5 ${inputCls}`} /></div>
        <div>
          <label className={labelCls}>Jumlah Uang (Rp)</label>
          <Input type="number" value={form.amount} onChange={(e)=>set("amount",e.target.value)} className={`mt-1.5 ${inputCls}`} />
          {form.amount > 0 && <p className="mt-2 text-[#4facfe] text-sm italic">Terbilang: {terbilang(form.amount)}</p>}
        </div>
        <div><label className={labelCls}>Untuk Pembayaran</label><Textarea value={form.forPayment} onChange={(e)=>set("forPayment",e.target.value)} rows={2} placeholder="Contoh: DP Karoseri Box" className="mt-1.5 bg-[#0a152b] border-[#4facfe]/20 text-white" /></div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className={labelCls}>Tempat</label><Input value={form.place} onChange={(e)=>set("place",e.target.value)} className={`mt-1.5 ${inputCls}`} /></div>
          <div><label className={labelCls}>Jabatan Penandatangan</label><Input value={form.signer} onChange={(e)=>set("signer",e.target.value)} className={`mt-1.5 ${inputCls}`} /></div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button onClick={save} className="h-12 px-8 rounded-full bg-gradient-to-r from-[#2f7bff] to-[#1f5fe0] text-white font-semibold gap-2"><Save size={18} /> Simpan & Lihat</Button>
      </div>
    </div>
  );
}
