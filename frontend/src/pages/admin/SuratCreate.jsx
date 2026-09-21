import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, ArrowLeft, FileSignature } from "lucide-react";
import { saveLetter, nextLetterNumber, getLetter } from "../../lib/letters";
import Letterhead from "../../components/Letterhead";
import { formatDateID } from "../../lib/format";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { useToast } from "../../hooks/use-toast";

const inputCls = "h-11 bg-[#0a152b] border-[#4facfe]/20 text-white placeholder:text-slate-500";
const labelCls = "text-sm text-slate-300";

export default function SuratCreate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const editing = id ? getLetter(decodeURIComponent(id)) : null;
  const today = new Date().toISOString().slice(0, 10);

  const [form, setForm] = useState(
    editing || {
      number: nextLetterNumber(),
      date: today,
      perihal: "",
      lampiran: "-",
      recipientName: "",
      recipientTitle: "",
      recipientCompany: "",
      recipientAddress: "",
      recipientEmail: "",
      salutation: "Dengan hormat,",
      body: "",
      closing: "Demikian surat ini kami sampaikan. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.",
      place: "Pekanbaru",
      signerName: "",
      signerTitle: "Direktur Utama",
      status: "Draft",
    }
  );
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = () => {
    if (!form.perihal || !form.recipientName || !form.body) {
      toast({ title: "Lengkapi data", description: "Perihal, penerima, dan isi surat wajib diisi." });
      return;
    }
    const doc = { ...form, id: form.number };
    saveLetter(doc);
    toast({ title: "Surat tersimpan", description: form.number });
    navigate(`/admin/surat/${encodeURIComponent(doc.id)}`);
  };

  return (
    <div className="grid xl:grid-cols-2 gap-8 items-start">
      {/* Editor */}
      <div className="max-w-xl">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white mb-4"><ArrowLeft size={18} /> Kembali</button>
        <h1 className="font-display font-extrabold text-white text-3xl flex items-center gap-2"><FileSignature className="text-[#4facfe]" /> {editing ? "Edit Surat" : "Buat Surat"}</h1>
        <p className="text-slate-400 mt-1">Surat otomatis memakai kop perusahaan. Pratinjau di sebelah kanan.</p>

        <div className="card-dark rounded-2xl p-6 mt-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className={labelCls}>Nomor Surat</label><Input value={form.number} onChange={(e)=>set("number",e.target.value)} className={`mt-1.5 ${inputCls}`} /></div>
            <div><label className={labelCls}>Tanggal</label><Input type="date" value={form.date} onChange={(e)=>set("date",e.target.value)} className={`mt-1.5 ${inputCls}`} /></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className={labelCls}>Perihal</label><Input value={form.perihal} onChange={(e)=>set("perihal",e.target.value)} placeholder="Penawaran Kerjasama" className={`mt-1.5 ${inputCls}`} /></div>
            <div><label className={labelCls}>Lampiran</label><Input value={form.lampiran} onChange={(e)=>set("lampiran",e.target.value)} placeholder="1 berkas / -" className={`mt-1.5 ${inputCls}`} /></div>
          </div>
        </div>

        <div className="card-dark rounded-2xl p-6 mt-5 space-y-5">
          <h2 className="text-white font-bold">Penerima</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className={labelCls}>Nama</label><Input value={form.recipientName} onChange={(e)=>set("recipientName",e.target.value)} placeholder="Bapak/Ibu ..." className={`mt-1.5 ${inputCls}`} /></div>
            <div><label className={labelCls}>Jabatan</label><Input value={form.recipientTitle} onChange={(e)=>set("recipientTitle",e.target.value)} placeholder="Direktur" className={`mt-1.5 ${inputCls}`} /></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className={labelCls}>Perusahaan / Instansi</label><Input value={form.recipientCompany} onChange={(e)=>set("recipientCompany",e.target.value)} className={`mt-1.5 ${inputCls}`} /></div>
            <div><label className={labelCls}>Email Penerima</label><Input value={form.recipientEmail} onChange={(e)=>set("recipientEmail",e.target.value)} placeholder="email@contoh.com" className={`mt-1.5 ${inputCls}`} /></div>
          </div>
          <div><label className={labelCls}>Alamat</label><Textarea value={form.recipientAddress} onChange={(e)=>set("recipientAddress",e.target.value)} rows={2} className="mt-1.5 bg-[#0a152b] border-[#4facfe]/20 text-white" /></div>
        </div>

        <div className="card-dark rounded-2xl p-6 mt-5 space-y-5">
          <h2 className="text-white font-bold">Isi Surat</h2>
          <div><label className={labelCls}>Salam Pembuka</label><Input value={form.salutation} onChange={(e)=>set("salutation",e.target.value)} className={`mt-1.5 ${inputCls}`} /></div>
          <div><label className={labelCls}>Isi (pisahkan paragraf dengan Enter)</label><Textarea value={form.body} onChange={(e)=>set("body",e.target.value)} rows={7} placeholder="Tulis isi surat di sini..." className="mt-1.5 bg-[#0a152b] border-[#4facfe]/20 text-white" /></div>
          <div><label className={labelCls}>Penutup</label><Textarea value={form.closing} onChange={(e)=>set("closing",e.target.value)} rows={2} className="mt-1.5 bg-[#0a152b] border-[#4facfe]/20 text-white" /></div>
        </div>

        <div className="card-dark rounded-2xl p-6 mt-5 space-y-5">
          <h2 className="text-white font-bold">Penandatangan</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div><label className={labelCls}>Tempat</label><Input value={form.place} onChange={(e)=>set("place",e.target.value)} className={`mt-1.5 ${inputCls}`} /></div>
            <div><label className={labelCls}>Nama</label><Input value={form.signerName} onChange={(e)=>set("signerName",e.target.value)} placeholder="Nama penandatangan" className={`mt-1.5 ${inputCls}`} /></div>
            <div><label className={labelCls}>Jabatan</label><Input value={form.signerTitle} onChange={(e)=>set("signerTitle",e.target.value)} className={`mt-1.5 ${inputCls}`} /></div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={save} className="h-12 px-8 rounded-full bg-gradient-to-r from-[#2f7bff] to-[#1f5fe0] text-white font-semibold gap-2"><Save size={18} /> Simpan & Lihat</Button>
        </div>
      </div>

      {/* Live preview */}
      <div className="hidden xl:block sticky top-8">
        <p className="text-slate-400 text-sm mb-3">Pratinjau</p>
        <div className="bg-white text-slate-800 rounded-lg shadow-2xl p-8 text-[13px] max-h-[80vh] overflow-auto">
          <Letterhead />
          <div className="mt-5 flex justify-between">
            <div>
              <div>Nomor&nbsp;&nbsp;: {form.number}</div>
              <div>Lampiran: {form.lampiran}</div>
              <div>Perihal&nbsp;&nbsp;: <b>{form.perihal || "-"}</b></div>
            </div>
            <div>{form.place}, {formatDateID(form.date)}</div>
          </div>
          <div className="mt-5">
            <div>Kepada Yth,</div>
            <div className="font-semibold">{form.recipientTitle} {form.recipientCompany}</div>
            <div>{form.recipientName}</div>
            <div className="whitespace-pre-line text-slate-600">{form.recipientAddress}</div>
          </div>
          <div className="mt-5">{form.salutation}</div>
          <div className="mt-3 space-y-3 text-justify leading-relaxed">
            {(form.body || "").split("\n").filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <p className="mt-3 text-justify leading-relaxed">{form.closing}</p>
          <div className="mt-8 flex justify-end text-center">
            <div>
              <div>Hormat kami,</div>
              <div className="h-14" />
              <div className="font-bold underline">{form.signerName || "(............)"}</div>
              <div className="text-slate-600">{form.signerTitle}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
