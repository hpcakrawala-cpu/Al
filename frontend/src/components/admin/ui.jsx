import React from "react";
import { rupiah } from "../../lib/format";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";

export function rupiahShort(n) {
  const num = Number(n) || 0;
  if (Math.abs(num) >= 1e9) return "Rp " + (num / 1e9).toFixed(1).replace(/\.0$/, "") + " M";
  if (Math.abs(num) >= 1e6) return "Rp " + (num / 1e6).toFixed(0) + " Jt";
  if (Math.abs(num) >= 1e3) return "Rp " + (num / 1e3).toFixed(0) + " Rb";
  return rupiah(num);
}

export function StatCard({ icon: Icon, label, value, accent = "#4facfe", sub }) {
  return (
    <div className="card-dark rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div className="h-11 w-11 grid place-items-center rounded-xl" style={{ background: `${accent}22`, color: accent, border: `1px solid ${accent}44` }}>
          <Icon size={22} />
        </div>
      </div>
      <div className="mt-4 font-display font-extrabold text-white text-2xl">{value}</div>
      <div className="text-slate-400 text-sm">{label}</div>
      {sub && <div className="text-xs mt-1" style={{ color: accent }}>{sub}</div>}
    </div>
  );
}

export function PeriodToggle({ value, onChange }) {
  const opts = [
    { k: "harian", l: "Harian" },
    { k: "mingguan", l: "Mingguan" },
    { k: "bulanan", l: "Bulanan" },
  ];
  return (
    <div className="inline-flex bg-[#0a152b] border border-[#4facfe]/20 rounded-full p-1">
      {opts.map((o) => (
        <button
          key={o.k}
          onClick={() => onChange(o.k)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-brand ${
            value === o.k ? "bg-gradient-to-r from-[#2f7bff] to-[#1f5fe0] text-white" : "text-slate-300"
          }`}
        >
          {o.l}
        </button>
      ))}
    </div>
  );
}

const inputCls = "h-11 bg-[#0a152b] border-[#4facfe]/20 text-white placeholder:text-slate-500";
const labelCls = "text-sm text-slate-300";

export function TextField({ label, className = "", ...props }) {
  return (
    <div className={className}>
      <label className={labelCls}>{label}</label>
      <Input {...props} className={`mt-1.5 ${inputCls}`} />
    </div>
  );
}

export function SelectField({ label, value, onChange, options, placeholder = "Pilih...", className = "" }) {
  return (
    <div className={className}>
      <label className={labelCls}>{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={`mt-1.5 ${inputCls}`}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-[#0e1c36] border-[#4facfe]/25 text-white">
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value} className="focus:bg-[#2f7bff]/20 focus:text-white">
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function StatusBadge({ status }) {
  const map = {
    Selesai: "bg-emerald-500/15 text-emerald-400",
    Proses: "bg-amber-500/15 text-amber-400",
    Lunas: "bg-emerald-500/15 text-emerald-400",
  };
  return <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${map[status] || "bg-slate-500/20 text-slate-300"}`}>{status}</span>;
}
