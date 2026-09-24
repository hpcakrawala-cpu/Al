import React, { useState } from "react";
import { Plus, Trash2, PackagePlus, PackageMinus, Boxes } from "lucide-react";
import { getGoods, saveGoods, deleteGoods } from "../../lib/erp";
import { formatDateID } from "../../lib/format";
import { StatCard, SelectField, TextField } from "../../components/admin/ui";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";
import { useToast } from "../../hooks/use-toast";

export default function Barang() {
  const { toast } = useToast();
  const [items, setItems] = useState(getGoods());
  const [open, setOpen] = useState(false);
  const empty = { date: new Date().toISOString().slice(0, 10), name: "", type: "masuk", qty: 1, unit: "unit", note: "" };
  const [form, setForm] = useState(empty);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const masuk = items.filter((g) => g.type === "masuk").reduce((a, g) => a + g.qty, 0);
  const keluar = items.filter((g) => g.type === "keluar").reduce((a, g) => a + g.qty, 0);
  const unitHasilKerja = items.filter((g) => g.type === "keluar" && g.unit === "unit").reduce((a, g) => a + g.qty, 0);

  const save = () => {
    if (!form.name || !form.qty) { toast({ title: "Lengkapi data", description: "Nama barang & jumlah wajib diisi." }); return; }
    saveGoods({ id: `BRG-${Date.now()}`, ...form, qty: Number(form.qty) });
    setItems(getGoods());
    setOpen(false);
    setForm(empty);
    toast({ title: "Barang tercatat" });
  };
  const remove = (id) => { deleteGoods(id); setItems(getGoods()); };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-white text-3xl">Pemasukan & Pengeluaran Barang</h1>
          <p className="text-slate-400 mt-1">Material masuk & unit hasil kerja keluar.</p>
        </div>
        <Button onClick={() => { setForm(empty); setOpen(true); }} className="rounded-full h-11 px-5 bg-gradient-to-r from-[#2f7bff] to-[#1f5fe0] text-white gap-2"><Plus size={18} /> Catat Barang</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
        <StatCard icon={PackagePlus} label="Total Barang Masuk" value={masuk} accent="#34d399" />
        <StatCard icon={PackageMinus} label="Total Barang Keluar" value={keluar} accent="#f87171" />
        <StatCard icon={Boxes} label="Unit Hasil Kerja Keluar" value={unitHasilKerja} accent="#4facfe" />
      </div>

      <div className="card-dark rounded-2xl mt-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead><tr className="text-slate-400 text-sm border-b border-white/10"><th className="p-4 font-medium">Tanggal</th><th className="p-4 font-medium">Barang</th><th className="p-4 font-medium">Jenis</th><th className="p-4 font-medium text-right">Jumlah</th><th className="p-4 font-medium">Ket.</th><th className="p-4"></th></tr></thead>
            <tbody>
              {items.map((g) => (
                <tr key={g.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4 text-slate-400 whitespace-nowrap">{formatDateID(g.date)}</td>
                  <td className="p-4 text-white font-medium">{g.name}</td>
                  <td className="p-4"><span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${g.type === "masuk" ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"}`}>{g.type === "masuk" ? "Masuk" : "Keluar"}</span></td>
                  <td className="p-4 text-right text-slate-300 whitespace-nowrap">{g.qty} {g.unit}</td>
                  <td className="p-4 text-slate-400 max-w-[220px]">{g.note}</td>
                  <td className="p-4"><button onClick={() => remove(g.id)} className="h-9 w-9 grid place-items-center rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25"><Trash2 size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#0b1426] border-[#4facfe]/20 text-white max-w-lg">
          <DialogHeader><DialogTitle className="text-white">Catat Barang</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <TextField label="Tanggal" type="date" value={form.date} onChange={(e) => set("date", e.target.value)} />
              <SelectField label="Jenis" value={form.type} onChange={(v) => set("type", v)} options={[{ value: "masuk", label: "Masuk (Material)" }, { value: "keluar", label: "Keluar (Unit/Hasil Kerja)" }]} />
            </div>
            <TextField label="Nama Barang" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Plat Baja / Karoseri Box" />
            <div className="grid grid-cols-2 gap-4">
              <TextField label="Jumlah" type="number" value={form.qty} onChange={(e) => set("qty", e.target.value)} />
              <SelectField label="Satuan" value={form.unit} onChange={(v) => set("unit", v)} options={["unit", "lembar", "batang", "kaleng", "pcs", "kg"].map((u) => ({ value: u, label: u }))} />
            </div>
            <TextField label="Keterangan" value={form.note} onChange={(e) => set("note", e.target.value)} />
          </div>
          <DialogFooter><Button onClick={save} className="rounded-full bg-gradient-to-r from-[#2f7bff] to-[#1f5fe0] text-white">Simpan</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
