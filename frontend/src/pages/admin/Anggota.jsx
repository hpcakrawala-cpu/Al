import React, { useState } from "react";
import { Plus, Trash2, Users, HandCoins, Receipt } from "lucide-react";
import { getMembers, saveMember, deleteMember, memberFinance, saveCash } from "../../lib/erp";
import { rupiah } from "../../lib/format";
import { StatCard, TextField } from "../../components/admin/ui";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";
import { useToast } from "../../hooks/use-toast";

export default function Anggota() {
  const { toast } = useToast();
  const [rows, setRows] = useState(memberFinance());
  const [openMember, setOpenMember] = useState(false);
  const [tx, setTx] = useState(null); // { member, mode: 'pinjaman'|'angsuran' }
  const [mForm, setMForm] = useState({ name: "", role: "", phone: "" });
  const [amount, setAmount] = useState(0);

  const refresh = () => setRows(memberFinance());
  const totalPinjaman = rows.reduce((a, r) => a + r.pinjaman, 0);
  const totalUtang = rows.reduce((a, r) => a + r.sisaUtang, 0);

  const addMember = () => {
    if (!mForm.name) { toast({ title: "Nama wajib diisi" }); return; }
    const id = `AGT-${String(getMembers().length + 1).padStart(2, "0")}`;
    saveMember({ id, name: mForm.name, role: mForm.role || "Anggota", phone: mForm.phone, joinDate: new Date().toISOString().slice(0, 10) });
    setMForm({ name: "", role: "", phone: "" });
    setOpenMember(false);
    refresh();
    toast({ title: "Anggota ditambahkan" });
  };
  const removeMember = (id) => { deleteMember(id); refresh(); };

  const submitTx = () => {
    if (!amount) { toast({ title: "Nominal wajib diisi" }); return; }
    const isLoan = tx.mode === "pinjaman";
    saveCash({
      id: `KAS-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      type: isLoan ? "keluar" : "masuk",
      category: isLoan ? "Pinjaman Anggota" : "Pembayaran Anggota",
      memberId: tx.member.id,
      amount: Number(amount),
      note: isLoan ? "Pinjaman anggota" : "Angsuran pinjaman",
    });
    setTx(null);
    setAmount(0);
    refresh();
    toast({ title: isLoan ? "Pinjaman dicatat" : "Angsuran dicatat" });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-white text-3xl">Anggota</h1>
          <p className="text-slate-400 mt-1">Pembayaran, pinjaman & sisa utang tiap anggota.</p>
        </div>
        <Button onClick={() => setOpenMember(true)} className="rounded-full h-11 px-5 bg-gradient-to-r from-[#2f7bff] to-[#1f5fe0] text-white gap-2"><Plus size={18} /> Tambah Anggota</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
        <StatCard icon={Users} label="Total Anggota" value={rows.length} />
        <StatCard icon={HandCoins} label="Total Pinjaman Diberikan" value={rupiah(totalPinjaman)} accent="#f59e0b" />
        <StatCard icon={Receipt} label="Total Sisa Utang" value={rupiah(totalUtang)} accent="#f87171" />
      </div>

      <div className="card-dark rounded-2xl mt-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead><tr className="text-slate-400 text-sm border-b border-white/10"><th className="p-4 font-medium">Anggota</th><th className="p-4 font-medium">Jabatan</th><th className="p-4 font-medium text-right">Pinjaman</th><th className="p-4 font-medium text-right">Dibayar</th><th className="p-4 font-medium text-right">Sisa Utang</th><th className="p-4 font-medium text-center">Aksi</th></tr></thead>
            <tbody>
              {rows.map((m) => (
                <tr key={m.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4"><div className="flex items-center gap-3"><div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#2f7bff] to-[#1f5fe0] grid place-items-center text-white font-bold">{m.name.charAt(0)}</div><div><div className="text-white font-medium">{m.name}</div><div className="text-xs text-slate-500">{m.phone}</div></div></div></td>
                  <td className="p-4 text-slate-300">{m.role}</td>
                  <td className="p-4 text-right text-amber-400 whitespace-nowrap">{rupiah(m.pinjaman)}</td>
                  <td className="p-4 text-right text-emerald-400 whitespace-nowrap">{rupiah(m.pembayaran)}</td>
                  <td className="p-4 text-right font-semibold text-white whitespace-nowrap">{rupiah(m.sisaUtang)}</td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => { setTx({ member: m, mode: "pinjaman" }); setAmount(0); }} className="text-xs px-3 py-1.5 rounded-lg bg-amber-500/15 text-amber-400 hover:bg-amber-500/25">+ Pinjaman</button>
                      <button onClick={() => { setTx({ member: m, mode: "angsuran" }); setAmount(0); }} className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25">+ Angsuran</button>
                      <button onClick={() => removeMember(m.id)} className="h-8 w-8 grid place-items-center rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add member */}
      <Dialog open={openMember} onOpenChange={setOpenMember}>
        <DialogContent className="bg-[#0b1426] border-[#4facfe]/20 text-white max-w-md">
          <DialogHeader><DialogTitle className="text-white">Tambah Anggota</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <TextField label="Nama" value={mForm.name} onChange={(e) => setMForm({ ...mForm, name: e.target.value })} />
            <TextField label="Jabatan" value={mForm.role} onChange={(e) => setMForm({ ...mForm, role: e.target.value })} placeholder="Welder / Teknisi" />
            <TextField label="No. Telepon" value={mForm.phone} onChange={(e) => setMForm({ ...mForm, phone: e.target.value })} />
          </div>
          <DialogFooter><Button onClick={addMember} className="rounded-full bg-gradient-to-r from-[#2f7bff] to-[#1f5fe0] text-white">Simpan</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tx dialog */}
      <Dialog open={!!tx} onOpenChange={(o) => !o && setTx(null)}>
        <DialogContent className="bg-[#0b1426] border-[#4facfe]/20 text-white max-w-md">
          <DialogHeader><DialogTitle className="text-white">{tx?.mode === "pinjaman" ? "Beri Pinjaman" : "Catat Angsuran"} — {tx?.member?.name}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <TextField label="Nominal (Rp)" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <DialogFooter><Button onClick={submitTx} className="rounded-full bg-gradient-to-r from-[#2f7bff] to-[#1f5fe0] text-white">Simpan</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
