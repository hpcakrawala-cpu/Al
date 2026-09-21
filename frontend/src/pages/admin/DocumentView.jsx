import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Download, ArrowLeft, Printer } from "lucide-react";
import { getDocument } from "../../lib/storage";
import { rupiah, terbilang, formatDateID } from "../../lib/format";
import { COMPANY } from "../../mock";
import { Button } from "../../components/ui/button";

function Letterhead() {
  return (
    <div className="flex items-start justify-between border-b-4 border-[#0d2350] pb-5">
      <div className="flex items-center gap-4">
        <img src="/logo88.png" alt="PT Delapan Delapan Industri" className="h-20 w-auto object-contain" />
        <div className="pt-2">
          <div className="text-[#2f7bff] text-xs font-semibold tracking-[0.25em]">KAROSERI UNIVERSAL INDUSTRI</div>
        </div>
      </div>
      <div className="text-right text-[11px] text-slate-600 max-w-[240px] leading-relaxed">
        <div>{COMPANY.address}</div>
        <div>{COMPANY.email}</div>
        <div>{COMPANY.phone}</div>
      </div>
    </div>
  );
}

function SignBlock({ place, dateStr, signer }) {
  return (
    <div className="text-center text-sm">
      <div>{place}, {formatDateID(dateStr)}</div>
      <div className="mt-1 text-slate-600">Hormat kami,</div>
      <div className="h-16" />
      <div className="font-bold text-[#0d2350] border-t border-slate-300 inline-block pt-1 px-6">{signer || "Direktur"}</div>
      <div className="text-xs text-slate-500">{COMPANY.shortName}</div>
    </div>
  );
}

function InvoiceDoc({ d }) {
  const subtotal = (d.items || []).reduce((a, i) => a + i.qty * i.price, 0);
  const tax = Math.round((subtotal * (d.taxRate || 0)) / 100);
  const total = subtotal + tax;
  return (
    <div className="p-10">
      <Letterhead />
      <div className="flex items-center justify-between mt-8">
        <div>
          <h1 className="font-display font-extrabold text-3xl text-[#0d2350]">INVOICE</h1>
          <div className="text-slate-500 text-sm mt-1">No: {d.number}</div>
        </div>
        <div className="text-right text-sm">
          <div><span className="text-slate-500">Tanggal: </span>{formatDateID(d.date)}</div>
          <div><span className="text-slate-500">Jatuh Tempo: </span>{formatDateID(d.dueDate)}</div>
          <span className={`inline-block mt-2 text-xs font-semibold px-3 py-1 rounded-full ${d.status==="Lunas"?"bg-emerald-100 text-emerald-700":"bg-amber-100 text-amber-700"}`}>{d.status || "Belum Lunas"}</span>
        </div>
      </div>

      <div className="mt-6 bg-slate-50 rounded-lg p-4 text-sm">
        <div className="text-slate-500 mb-1">Ditagihkan kepada:</div>
        <div className="font-bold text-[#0d2350]">{d.clientName}</div>
        {d.clientAddress && <div className="text-slate-600">{d.clientAddress}</div>}
        {d.clientPhone && <div className="text-slate-600">{d.clientPhone}</div>}
      </div>

      <table className="w-full mt-6 text-sm">
        <thead>
          <tr className="bg-[#0d2350] text-white">
            <th className="p-3 text-left rounded-l-lg">Deskripsi</th>
            <th className="p-3 text-center">Qty</th>
            <th className="p-3 text-right">Harga</th>
            <th className="p-3 text-right rounded-r-lg">Jumlah</th>
          </tr>
        </thead>
        <tbody>
          {(d.items || []).map((it, i) => (
            <tr key={i} className="border-b border-slate-100">
              <td className="p-3 text-slate-700">{it.desc}</td>
              <td className="p-3 text-center text-slate-700">{it.qty}</td>
              <td className="p-3 text-right text-slate-700">{rupiah(it.price)}</td>
              <td className="p-3 text-right text-slate-700">{rupiah(it.qty * it.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mt-4">
        <div className="w-64 text-sm space-y-1">
          <div className="flex justify-between"><span className="text-slate-500">Subtotal</span><span>{rupiah(subtotal)}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">PPN {d.taxRate}%</span><span>{rupiah(tax)}</span></div>
          <div className="flex justify-between font-bold text-lg text-[#0d2350] pt-2 border-t border-slate-200"><span>Total</span><span>{rupiah(total)}</span></div>
        </div>
      </div>

      <div className="mt-4 text-sm italic text-slate-600">Terbilang: {terbilang(total)}</div>
      {d.notes && <div className="mt-6 text-sm text-slate-600 bg-slate-50 rounded-lg p-4"><b>Catatan:</b> {d.notes}</div>}

      <div className="flex justify-end mt-10"><SignBlock place="Pekanbaru" dateStr={d.date} signer="Direktur" /></div>
    </div>
  );
}

function KwitansiDoc({ d }) {
  return (
    <div className="p-10">
      <Letterhead />
      <div className="flex items-center justify-between mt-8">
        <h1 className="font-display font-extrabold text-3xl text-[#0d2350]">KWITANSI</h1>
        <div className="text-slate-500 text-sm">No: {d.number}</div>
      </div>

      <div className="mt-8 space-y-5 text-[15px]">
        <div className="flex gap-4"><div className="w-52 text-slate-500">Telah terima dari</div><div className="flex-1 font-semibold text-[#0d2350] border-b border-dotted border-slate-300">{d.clientName}</div></div>
        <div className="flex gap-4"><div className="w-52 text-slate-500">Uang sejumlah</div><div className="flex-1 italic text-[#0d2350] border-b border-dotted border-slate-300 bg-slate-50 px-2 py-1 rounded">{terbilang(d.amount)}</div></div>
        <div className="flex gap-4"><div className="w-52 text-slate-500">Untuk pembayaran</div><div className="flex-1 text-[#0d2350] border-b border-dotted border-slate-300">{d.forPayment}</div></div>
      </div>

      <div className="flex items-end justify-between mt-12">
        <div className="bg-[#0d2350] text-white rounded-xl px-6 py-4">
          <div className="text-xs text-slate-300">Jumlah</div>
          <div className="font-display font-extrabold text-2xl">{rupiah(d.amount)}</div>
        </div>
        <SignBlock place={d.place || "Pekanbaru"} dateStr={d.date} signer={d.signer} />
      </div>
    </div>
  );
}

export default function DocumentView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const d = getDocument(id);

  if (!d) return <div className="text-slate-300">Dokumen tidak ditemukan. <button onClick={()=>navigate("/admin/dokumen")} className="text-[#4facfe] underline">Kembali</button></div>;

  return (
    <div>
      <div className="no-print flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white"><ArrowLeft size={18} /> Kembali</button>
        <div className="flex gap-3">
          <Button onClick={() => window.print()} className="rounded-full h-11 px-6 bg-gradient-to-r from-[#2f7bff] to-[#1f5fe0] text-white gap-2"><Download size={18} /> Download PDF</Button>
          <Button onClick={() => window.print()} variant="outline" className="rounded-full h-11 px-5 border-[#4facfe]/40 bg-transparent text-white hover:bg-[#4facfe]/10 hover:text-white gap-2"><Printer size={18} /> Cetak</Button>
        </div>
      </div>

      <div className="print-area max-w-[820px] mx-auto bg-white text-slate-800 shadow-2xl print:shadow-none rounded-lg overflow-hidden">
        {d.type === "invoice" ? <InvoiceDoc d={d} /> : <KwitansiDoc d={d} />}
      </div>
    </div>
  );
}
