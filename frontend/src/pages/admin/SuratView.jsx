import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Download, ArrowLeft, Printer, Send, Pencil } from "lucide-react";
import { getLetter, updateStatus } from "../../lib/letters";
import { formatDateID } from "../../lib/format";
import { COMPANY } from "../../mock";
import Letterhead from "../../components/Letterhead";
import { Button } from "../../components/ui/button";
import { useToast } from "../../hooks/use-toast";

export default function SuratView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const d = getLetter(decodeURIComponent(id));

  if (!d) return <div className="text-slate-300">Surat tidak ditemukan. <button onClick={()=>navigate("/admin/surat")} className="text-[#4facfe] underline">Kembali</button></div>;

  const sendEmail = () => {
    const paragraphs = (d.body || "").split("\n").filter(Boolean).join("\n\n");
    const text = `Nomor: ${d.number}\nPerihal: ${d.perihal}\n\nKepada Yth,\n${d.recipientTitle} ${d.recipientCompany}\n${d.recipientName}\n\n${d.salutation}\n\n${paragraphs}\n\n${d.closing}\n\nHormat kami,\n${d.signerName}\n${d.signerTitle}\n${COMPANY.name}`;
    const subject = encodeURIComponent(`${d.perihal} - ${COMPANY.name}`);
    const body = encodeURIComponent(text);
    const to = encodeURIComponent(d.recipientEmail || "");
    window.open(`mailto:${to}?subject=${subject}&body=${body}`, "_blank");
    updateStatus(d.id, "Terkirim");
    toast({ title: "Membuka aplikasi email", description: "Surat siap dikirim & ditandai Terkirim." });
  };

  return (
    <div>
      <div className="no-print flex flex-wrap items-center justify-between gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white"><ArrowLeft size={18} /> Kembali</button>
        <div className="flex flex-wrap gap-3">
          <Link to={`/admin/surat/edit/${encodeURIComponent(d.id)}`}>
            <Button variant="outline" className="rounded-full h-11 px-5 border-[#4facfe]/40 bg-transparent text-white hover:bg-[#4facfe]/10 hover:text-white gap-2"><Pencil size={18} /> Edit</Button>
          </Link>
          <Button onClick={sendEmail} className="rounded-full h-11 px-5 bg-emerald-600 hover:bg-emerald-500 text-white gap-2"><Send size={18} /> Kirim Email</Button>
          <Button onClick={() => window.print()} className="rounded-full h-11 px-6 bg-gradient-to-r from-[#2f7bff] to-[#1f5fe0] text-white gap-2"><Download size={18} /> Download PDF</Button>
          <Button onClick={() => window.print()} variant="outline" className="rounded-full h-11 px-5 border-[#4facfe]/40 bg-transparent text-white hover:bg-[#4facfe]/10 hover:text-white gap-2"><Printer size={18} /> Cetak</Button>
        </div>
      </div>

      <div className="print-area max-w-[820px] mx-auto bg-white text-slate-800 shadow-2xl print:shadow-none rounded-lg overflow-hidden">
        <div className="p-12 text-[14px]">
          <Letterhead />

          <div className="mt-6 flex justify-between items-start">
            <div className="space-y-0.5">
              <div className="flex gap-2"><span className="w-20 inline-block">Nomor</span>: {d.number}</div>
              <div className="flex gap-2"><span className="w-20 inline-block">Lampiran</span>: {d.lampiran}</div>
              <div className="flex gap-2"><span className="w-20 inline-block">Perihal</span>: <b>{d.perihal}</b></div>
            </div>
            <div>{d.place}, {formatDateID(d.date)}</div>
          </div>

          <div className="mt-6">
            <div>Kepada Yth,</div>
            <div className="font-semibold">{[d.recipientTitle, d.recipientCompany].filter(Boolean).join(" ")}</div>
            <div>{d.recipientName}</div>
            {d.recipientAddress && <div className="whitespace-pre-line text-slate-600">di {d.recipientAddress}</div>}
          </div>

          <div className="mt-6">{d.salutation}</div>
          <div className="mt-3 space-y-3 text-justify leading-relaxed">
            {(d.body || "").split("\n").filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <p className="mt-3 text-justify leading-relaxed">{d.closing}</p>

          <div className="mt-10 flex justify-end text-center">
            <div>
              <div>Hormat kami,</div>
              <div className="font-semibold text-[#0d2350]">{COMPANY.shortName}</div>
              <div className="h-16" />
              <div className="font-bold underline">{d.signerName || "(............)"}</div>
              <div className="text-slate-600">{d.signerTitle}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
