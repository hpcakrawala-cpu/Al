import React, { useState } from "react";
import { Plus, Trash2, ClipboardList } from "lucide-react";
import { getSPK, saveSPK, deleteSPK, nextSPKNumber, getMembers, memberName } from "../../lib/erp";
import { rupiah, formatDateID } from "../../lib/format";
import { StatCard, SelectField, TextField, StatusBadge } from "../../components/admin/ui";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";
import { useToast } from "../../hooks/use-toast";

const UNITS = ["Karoseri Box", "Dump Truck", "Tangki", "Car Carrier"];

export default function SPK() {
  const { toast } = useToast();
  const [items, setItems] = useState(getSPK());
  const [open, setOpen] = useState(false);
  const members = getMembers();
  const empty = { number: "", date: new Date().toISOString().slice(0, 10), memberId: "", unit: "", qty: 1, description: "", targetDate: "", value: 0, status: "Proses" };
  const [form, setForm] = useState(empty);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const openNew = () => { setForm({ ...empty, number: nextSPKNumber() }); setOpen(true); };
  const save = () => {
    if (!form.memberId || !form.unit || !form.description) {
      toast({ title: "Lengkapi data", description: "Anggota, unit, dan deskripsi wajib diisi." });
      return;
    }
    saveSPK({ ...form, id: form.number, qty: Number(form.qty), value: Number(form.value) });
    setItems(getSPK());
    setOpen(false);
    toast({ title: "SPK tersimpan", description: form.number });
  };
  const remove = (id) => { deleteSPK(id); setItems(getSPK()); };

  const totalValue = items.reduce((a, s) => a + s.value, 0);
  const selesai = items.filter((s) => s.status === "Selesai").length;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-white text-3xl">SPK per Anggota</h1>
          <p className="text-slate-400 mt-1">Surat Perintah Kerja & hasil kerja tiap anggota.</p>
        </div>
        <Button onClick={openNew} className="rounded-full h-11 px-5 bg-gradient-to-r from-[#2f7bff] to-[#1f5fe0] text-white gap-2"><Plus size={18} /> Buat SPK</Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        <StatCard icon={ClipboardList} label="Total SPK" value={items.length} />
        <StatCard icon={ClipboardList} label="Selesai" value={selesai} accent="#34d399" />
        <StatCard icon={ClipboardList} label="Total Nilai Kerja" value={rupiah(totalValue)} accent="#f59e0b" />
      </div>

      <div className="card-dark rounded-2xl mt-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-sm border-b border-white/10">
                <th className="p-4 font-medium">No. SPK</th>
                <th className="p-4 font-medium">Anggota</th>
                <th className="p-4 font-medium">Unit</th>
                <th className="p-4 font-medium text-center">Qty</th>
                <th className="p-4 font-medium">Target</th>
                <th className="p-4 font-medium text-right">Nilai</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((s) => (
                <tr key={s.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4 text-white font-medium whitespace-nowrap">{s.number}</td>
                  <td className="p-4 text-slate-300">{memberName(s.memberId)}</td>
                  <td className="p-4 text-slate-300">{s.unit}<div className="text-xs text-slate-500">{s.description}</div></td>
                  <td className="p-4 text-center text-slate-300">{s.qty}</td>
                  <td className="p-4 text-slate-400 whitespace-nowrap">{formatDateID(s.targetDate)}</td>
                  <td className="p-4 text-white font-semibold text-right whitespace-nowrap">{rupiah(s.value)}</td>
                  <td className="p-4"><StatusBadge status={s.status} /></td>
                  <td className="p-4"><button onClick={() => remove(s.id)} className="h-9 w-9 grid place-items-center rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25"><Trash2 size={16} /></button></td>
                </tr>
              ))}
              {items.length === 0 && <tr><td colSpan={8} className="p-10 text-center text-slate-500">Belum ada SPK.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#0b1426] border-[#4facfe]/20 text-white max-w-lg">
          <DialogHeader><DialogTitle className="text-white">Buat SPK</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <TextField label="No. SPK" value={form.number} onChange={(e) => set("number", e.target.value)} />
              <TextField label="Tanggal" type="date" value={form.date} onChange={(e) => set("date", e.target.value)} />
            </div>
            <SelectField label="Anggota" value={form.memberId} onChange={(v) => set("memberId", v)} options={members.map((m) => ({ value: m.id, label: `${m.name} — ${m.role}` }))} />
            <div className="grid grid-cols-2 gap-4">
              <SelectField label="Unit" value={form.unit} onChange={(v) => set("unit", v)} options={UNITS.map((u) => ({ value: u, label: u }))} />
              <TextField label="Jumlah Unit" type="number" value={form.qty} onChange={(e) => set("qty", e.target.value)} />
            </div>
            <div><label className="text-sm text-slate-300">Deskripsi Pekerjaan</label><Textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={2} className="mt-1.5 bg-[#0a152b] border-[#4facfe]/20 text-white" /></div>
            <div className="grid grid-cols-2 gap-4">
              <TextField label="Target Selesai" type="date" value={form.targetDate} onChange={(e) => set("targetDate", e.target.value)} />
              <TextField label="Nilai/Upah (Rp)" type="number" value={form.value} onChange={(e) => set("value", e.target.value)} />
            </div>
            <SelectField label="Status" value={form.status} onChange={(v) => set("status", v)} options={[{ value: "Proses", label: "Proses" }, { value: "Selesai", label: "Selesai" }]} />
          </div>
          <DialogFooter>
            <Button onClick={save} className="rounded-full bg-gradient-to-r from-[#2f7bff] to-[#1f5fe0] text-white">Simpan SPK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
