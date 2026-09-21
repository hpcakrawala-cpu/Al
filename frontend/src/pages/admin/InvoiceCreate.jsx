import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, Save, ArrowLeft } from "lucide-react";
import { saveDocument, nextNumber } from "../../lib/storage";
import { rupiah } from "../../lib/format";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { useToast } from "../../hooks/use-toast";

const inputCls = "h-11 bg-[#0a152b] border-[#4facfe]/20 text-white placeholder:text-slate-500";
const labelCls = "text-sm text-slate-300";

export default function InvoiceCreate() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const today = new Date().toISOString().slice(0, 10);

  const [form, setForm] = useState({
    number: nextNumber("invoice"),
    date: today,
    dueDate: today,
    clientName: "",
    clientAddress: "",
    clientPhone: "",
    taxRate: 11,
    notes: "Pembayaran melalui transfer Bank a.n PT Delapan Delapan Industri.",
    status: "Belum Lunas",
  });
  const [items, setItems] = useState([{ desc: "", qty: 1, price: 0 }]);

  const set = (k, v) => setForm({ ...form, [k]: v });
  const setItem = (i, k, v) => {
    const next = [...items];
    next[i][k] = k === "desc" ? v : Number(v);
    setItems(next);
  };
  const addItem = () => setItems([...items, { desc: "", qty: 1, price: 0 }]);
  const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i));

  const subtotal = items.reduce((a, i) => a + i.qty * i.price, 0);
  const tax = Math.round((subtotal * form.taxRate) / 100);
  const total = subtotal + tax;

  const save = () => {
    if (!form.clientName || items.some((i) => !i.desc)) {
      toast({ title: "Lengkapi data", description: "Nama klien & deskripsi item wajib diisi." });
      return;
    }
    const doc = { id: form.number, type: "invoice", ...form, items };
    saveDocument(doc);
    toast({ title: "Invoice tersimpan", description: form.number });
    navigate(`/admin/dokumen/${doc.id}`);
  };

  return (
    <div className="max-w-4xl">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white mb-4"><ArrowLeft size={18} /> Kembali</button>
      <h1 className="font-display font-extrabold text-white text-3xl">Buat Invoice</h1>
      <p className="text-slate-400 mt-1">Isi detail tagihan. Nomor & total dihitung otomatis.</p>

      <div className="card-dark rounded-2xl p-6 mt-6 space-y-5">
        <div className="grid sm:grid-cols-3 gap-4">
          <div><label className={labelCls}>No. Invoice</label><Input value={form.number} onChange={(e)=>set("number",e.target.value)} className={`mt-1.5 ${inputCls}`} /></div>
          <div><label className={labelCls}>Tanggal</label><Input type="date" value={form.date} onChange={(e)=>set("date",e.target.value)} className={`mt-1.5 ${inputCls}`} /></div>
          <div><label className={labelCls}>Jatuh Tempo</label><Input type="date" value={form.dueDate} onChange={(e)=>set("dueDate",e.target.value)} className={`mt-1.5 ${inputCls}`} /></div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className={labelCls}>Nama Klien</label><Input value={form.clientName} onChange={(e)=>set("clientName",e.target.value)} placeholder="PT / Nama" className={`mt-1.5 ${inputCls}`} /></div>
          <div><label className={labelCls}>No. Telepon Klien</label><Input value={form.clientPhone} onChange={(e)=>set("clientPhone",e.target.value)} className={`mt-1.5 ${inputCls}`} /></div>
        </div>
        <div><label className={labelCls}>Alamat Klien</label><Textarea value={form.clientAddress} onChange={(e)=>set("clientAddress",e.target.value)} rows={2} className="mt-1.5 bg-[#0a152b] border-[#4facfe]/20 text-white" /></div>
      </div>

      {/* Items */}
      <div className="card-dark rounded-2xl p-6 mt-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold text-lg">Item Tagihan</h2>
          <Button onClick={addItem} variant="outline" className="h-10 border-[#4facfe]/40 bg-transparent text-white hover:bg-[#4facfe]/10 hover:text-white gap-2"><Plus size={16} /> Tambah</Button>
        </div>
        <div className="space-y-3">
          {items.map((it, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 items-center">
              <Input value={it.desc} onChange={(e)=>setItem(i,"desc",e.target.value)} placeholder="Deskripsi" className={`col-span-6 ${inputCls}`} />
              <Input type="number" value={it.qty} onChange={(e)=>setItem(i,"qty",e.target.value)} placeholder="Qty" className={`col-span-2 ${inputCls}`} />
              <Input type="number" value={it.price} onChange={(e)=>setItem(i,"price",e.target.value)} placeholder="Harga" className={`col-span-3 ${inputCls}`} />
              <button onClick={()=>removeItem(i)} className="col-span-1 h-11 grid place-items-center rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center gap-3">
            <label className={labelCls}>PPN (%)</label>
            <Input type="number" value={form.taxRate} onChange={(e)=>set("taxRate",Number(e.target.value))} className={`w-24 ${inputCls}`} />
          </div>
          <div className="text-right space-y-1 min-w-[240px]">
            <div className="flex justify-between text-slate-300"><span>Subtotal</span><span>{rupiah(subtotal)}</span></div>
            <div className="flex justify-between text-slate-300"><span>PPN {form.taxRate}%</span><span>{rupiah(tax)}</span></div>
            <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-white/10"><span>Total</span><span className="text-[#4facfe]">{rupiah(total)}</span></div>
          </div>
        </div>
      </div>

      <div className="card-dark rounded-2xl p-6 mt-5">
        <label className={labelCls}>Catatan</label>
        <Textarea value={form.notes} onChange={(e)=>set("notes",e.target.value)} rows={2} className="mt-1.5 bg-[#0a152b] border-[#4facfe]/20 text-white" />
      </div>

      <div className="flex justify-end mt-6">
        <Button onClick={save} className="h-12 px-8 rounded-full bg-gradient-to-r from-[#2f7bff] to-[#1f5fe0] text-white font-semibold gap-2"><Save size={18} /> Simpan & Lihat</Button>
      </div>
    </div>
  );
}
