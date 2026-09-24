import React, { useState } from "react";
import { Plus, Trash2, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { getCash, saveCash, deleteCash, cashTotals, cashFlowSeries, getMembers, memberName, CASH_CATEGORIES } from "../../lib/erp";
import { rupiah, formatDateID } from "../../lib/format";
import { StatCard, PeriodToggle, SelectField, TextField } from "../../components/admin/ui";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";
import { useToast } from "../../hooks/use-toast";

export default function Kas() {
  const { toast } = useToast();
  const [items, setItems] = useState(getCash());
  const [period, setPeriod] = useState("harian");
  const [open, setOpen] = useState(false);
  const members = getMembers();
  const empty = { date: new Date().toISOString().slice(0, 10), type: "masuk", category: "Hasil Kerja Unit", memberId: "", amount: 0, note: "" };
  const [form, setForm] = useState(empty);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const totals = cashTotals();
  const series = cashFlowSeries(period);

  const save = () => {
    if (!form.amount) { toast({ title: "Lengkapi data", description: "Nominal wajib diisi." }); return; }
    const id = `KAS-${Date.now()}`;
    saveCash({ id, ...form, amount: Number(form.amount), memberId: form.memberId || null });
    setItems(getCash());
    setOpen(false);
    setForm(empty);
    toast({ title: "Transaksi kas tersimpan" });
  };
  const remove = (id) => { deleteCash(id); setItems(getCash()); };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-white text-3xl">Uang Kas Harian</h1>
          <p className="text-slate-400 mt-1">Pemasukan & pengeluaran kas — rekap harian, mingguan, bulanan.</p>
        </div>
        <Button onClick={() => { setForm(empty); setOpen(true); }} className="rounded-full h-11 px-5 bg-gradient-to-r from-[#2f7bff] to-[#1f5fe0] text-white gap-2"><Plus size={18} /> Transaksi</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
        <StatCard icon={TrendingUp} label="Total Pemasukan" value={rupiah(totals.masuk)} accent="#34d399" />
        <StatCard icon={TrendingDown} label="Total Pengeluaran" value={rupiah(totals.keluar)} accent="#f87171" />
        <StatCard icon={Wallet} label="Saldo Kas" value={rupiah(totals.saldo)} accent="#4facfe" />
      </div>

      {/* Rekap per periode */}
      <div className="card-dark rounded-2xl mt-6 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold text-lg">Rekap {period.charAt(0).toUpperCase() + period.slice(1)}</h2>
          <PeriodToggle value={period} onChange={setPeriod} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead><tr className="text-slate-400 text-sm border-b border-white/10"><th className="p-3 font-medium">Periode</th><th className="p-3 font-medium text-right">Masuk</th><th className="p-3 font-medium text-right">Keluar</th><th className="p-3 font-medium text-right">Selisih</th></tr></thead>
            <tbody>
              {series.map((r) => (
                <tr key={r.label} className="border-b border-white/5">
                  <td className="p-3 text-white">{r.label}</td>
                  <td className="p-3 text-right text-emerald-400">{rupiah(r.masuk)}</td>
                  <td className="p-3 text-right text-red-400">{rupiah(r.keluar)}</td>
                  <td className="p-3 text-right font-semibold text-white">{rupiah(r.saldo)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaksi */}
      <div className="card-dark rounded-2xl mt-6 overflow-hidden">
        <div className="p-5 border-b border-white/10"><h2 className="text-white font-bold text-lg">Riwayat Transaksi</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead><tr className="text-slate-400 text-sm border-b border-white/10"><th className="p-4 font-medium">Tanggal</th><th className="p-4 font-medium">Kategori</th><th className="p-4 font-medium">Anggota</th><th className="p-4 font-medium">Ket.</th><th className="p-4 font-medium text-right">Nominal</th><th className="p-4"></th></tr></thead>
            <tbody>
              {items.map((c) => (
                <tr key={c.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4 text-slate-400 whitespace-nowrap">{formatDateID(c.date)}</td>
                  <td className="p-4"><span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.type === "masuk" ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"}`}>{c.category}</span></td>
                  <td className="p-4 text-slate-300">{c.memberId ? memberName(c.memberId) : "-"}</td>
                  <td className="p-4 text-slate-400 max-w-[220px]">{c.note}</td>
                  <td className={`p-4 text-right font-semibold whitespace-nowrap ${c.type === "masuk" ? "text-emerald-400" : "text-red-400"}`}>{c.type === "masuk" ? "+" : "-"}{rupiah(c.amount)}</td>
                  <td className="p-4"><button onClick={() => remove(c.id)} className="h-9 w-9 grid place-items-center rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25"><Trash2 size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#0b1426] border-[#4facfe]/20 text-white max-w-lg">
          <DialogHeader><DialogTitle className="text-white">Transaksi Kas</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <TextField label="Tanggal" type="date" value={form.date} onChange={(e) => set("date", e.target.value)} />
              <SelectField label="Jenis" value={form.type} onChange={(v) => setForm((f) => ({ ...f, type: v, category: CASH_CATEGORIES[v][0] }))} options={[{ value: "masuk", label: "Pemasukan" }, { value: "keluar", label: "Pengeluaran" }]} />
            </div>
            <SelectField label="Kategori" value={form.category} onChange={(v) => set("category", v)} options={CASH_CATEGORIES[form.type].map((c) => ({ value: c, label: c }))} />
            <SelectField label="Anggota (opsional)" value={form.memberId} onChange={(v) => set("memberId", v)} options={[{ value: "", label: "- Tidak terkait -" }, ...members.map((m) => ({ value: m.id, label: m.name }))]} />
            <TextField label="Nominal (Rp)" type="number" value={form.amount} onChange={(e) => set("amount", e.target.value)} />
            <TextField label="Keterangan" value={form.note} onChange={(e) => set("note", e.target.value)} />
          </div>
          <DialogFooter><Button onClick={save} className="rounded-full bg-gradient-to-r from-[#2f7bff] to-[#1f5fe0] text-white">Simpan</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
