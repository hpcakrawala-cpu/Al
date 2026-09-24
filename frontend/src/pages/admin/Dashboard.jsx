import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Wallet, TrendingUp, TrendingDown, Boxes, ClipboardList, Users, Eye, Receipt, HandCoins, ArrowRight,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";
import {
  cashTotals, cashFlowSeries, expenseByCategory, unitsOutSeries, memberFinance,
  getSPK, getVisits,
} from "../../lib/erp";
import { rupiah } from "../../lib/format";
import { StatCard, PeriodToggle, rupiahShort } from "../../components/admin/ui";

const PIE_COLORS = ["#2f7bff", "#4facfe", "#f59e0b", "#34d399", "#a78bfa", "#f87171"];

function ChartCard({ title, right, children, className = "" }) {
  return (
    <div className={`card-dark rounded-2xl p-5 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-bold">{title}</h3>
        {right}
      </div>
      {children}
    </div>
  );
}

const tooltipStyle = {
  background: "#0b1426",
  border: "1px solid rgba(79,140,255,0.3)",
  borderRadius: 12,
  color: "#fff",
};

export default function Dashboard() {
  const [period, setPeriod] = useState("harian");
  const totals = cashTotals();
  const flow = cashFlowSeries(period);
  const expenses = expenseByCategory();
  const units = unitsOutSeries("mingguan");
  const members = memberFinance();
  const spk = getSPK();
  const visits = getVisits();

  const totalPinjaman = members.reduce((a, m) => a + m.pinjaman, 0);
  const totalUtang = members.reduce((a, m) => a + m.sisaUtang, 0);
  const spkSelesai = spk.filter((s) => s.status === "Selesai").length;
  const totalUnitKeluar = units.reduce((a, u) => a + u.unit, 0);
  const todayVisits = visits.days[visits.days.length - 1]?.count || 0;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-white text-3xl">Dashboard Analitik</h1>
          <p className="text-slate-400 mt-1">Ringkasan keuangan, produksi, anggota & pengunjung website.</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <StatCard icon={Wallet} label="Saldo Kas" value={rupiahShort(totals.saldo)} accent="#4facfe" sub={`Masuk ${rupiahShort(totals.masuk)}`} />
        <StatCard icon={TrendingDown} label="Pengeluaran" value={rupiahShort(totals.keluar)} accent="#f87171" />
        <StatCard icon={Boxes} label="Unit Keluar (Hasil Kerja)" value={totalUnitKeluar} accent="#34d399" />
        <StatCard icon={Eye} label="Pengunjung Website" value={visits.total.toLocaleString("id-ID")} accent="#a78bfa" sub={`Hari ini +${todayVisits}`} />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <StatCard icon={ClipboardList} label="SPK Selesai" value={`${spkSelesai}/${spk.length}`} accent="#f59e0b" />
        <StatCard icon={Users} label="Total Anggota" value={members.length} accent="#4facfe" />
        <StatCard icon={HandCoins} label="Pinjaman Anggota" value={rupiahShort(totalPinjaman)} accent="#f59e0b" />
        <StatCard icon={Receipt} label="Sisa Utang Anggota" value={rupiahShort(totalUtang)} accent="#f87171" />
      </div>

      {/* Cash flow area */}
      <div className="grid lg:grid-cols-3 gap-5 mt-6">
        <ChartCard title="Arus Kas Masuk vs Keluar" className="lg:col-span-2" right={<PeriodToggle value={period} onChange={setPeriod} />}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={flow} margin={{ left: -10, right: 8 }}>
              <defs>
                <linearGradient id="gMasuk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gKeluar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f87171" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#f87171" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="label" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={rupiahShort} tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} width={70} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => rupiah(v)} />
              <Legend wrapperStyle={{ color: "#cbd5e1" }} />
              <Area type="monotone" dataKey="masuk" name="Pemasukan" stroke="#34d399" strokeWidth={2} fill="url(#gMasuk)" />
              <Area type="monotone" dataKey="keluar" name="Pengeluaran" stroke="#f87171" strokeWidth={2} fill="url(#gKeluar)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Komposisi Pengeluaran">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={expenses} dataKey="value" nameKey="name" cx="50%" cy="45%" innerRadius={55} outerRadius={90} paddingAngle={3}>
                {expenses.map((e, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="none" />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => rupiah(v)} />
              <Legend wrapperStyle={{ color: "#cbd5e1", fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Units bar + visitors line */}
      <div className="grid lg:grid-cols-2 gap-5 mt-5">
        <ChartCard title="Unit Keluar / Hasil Kerja (Mingguan)">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={units} margin={{ left: -20, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="label" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis allowDecimals={false} tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(47,123,255,0.08)" }} />
              <Bar dataKey="unit" name="Unit" radius={[6, 6, 0, 0]} fill="#2f7bff" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Pengunjung Website (30 Hari)">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={visits.days} margin={{ left: -20, right: 8 }}>
              <defs>
                <linearGradient id="gVisit" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#4facfe" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="date" tickFormatter={(d) => new Date(d).getDate()} tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} interval={4} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} labelFormatter={(d) => new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "long" })} formatter={(v) => [`${v} pengunjung`, ""]} />
              <Line type="monotone" dataKey="count" name="Pengunjung" stroke="url(#gVisit)" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Member finance snapshot */}
      <div className="card-dark rounded-2xl mt-5 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-bold">Keuangan Anggota</h3>
          <Link to="/admin/anggota" className="text-[#4facfe] text-sm hover:underline flex items-center gap-1">Kelola <ArrowRight size={14} /></Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead><tr className="text-slate-400 border-b border-white/10"><th className="p-3 font-medium">Anggota</th><th className="p-3 font-medium text-right">Pinjaman</th><th className="p-3 font-medium text-right">Dibayar</th><th className="p-3 font-medium text-right">Sisa Utang</th></tr></thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id} className="border-b border-white/5">
                  <td className="p-3 text-white">{m.name} <span className="text-slate-500 text-xs">• {m.role}</span></td>
                  <td className="p-3 text-right text-amber-400">{rupiah(m.pinjaman)}</td>
                  <td className="p-3 text-right text-emerald-400">{rupiah(m.pembayaran)}</td>
                  <td className="p-3 text-right font-semibold text-white">{rupiah(m.sisaUtang)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
