// LocalStorage-backed official letters (surat) store
const KEY = "dd_letters";

const SAMPLE = [
  {
    id: "001/DDI/VII/2025",
    number: "001/DDI/VII/2025",
    date: "2025-07-10",
    perihal: "Penawaran Kerjasama Pengadaan Karoseri",
    lampiran: "1 (satu) berkas",
    recipientName: "Bapak Budi Santoso",
    recipientTitle: "Direktur Operasional",
    recipientCompany: "PT Logistik Andalan",
    recipientAddress: "Jl. Soekarno Hatta No.10, Pekanbaru",
    recipientEmail: "budi@logistikandalan.co.id",
    salutation: "Dengan hormat,",
    body: "Sehubungan dengan kebutuhan armada perusahaan Bapak, dengan ini kami PT Delapan Delapan Industri bermaksud menawarkan kerjasama dalam pengadaan karoseri berkualitas tinggi.\n\nKami menyediakan berbagai jenis karoseri seperti Box, Dump Truck, Tangki, dan Car Carrier dengan material pilihan, pengerjaan profesional, serta garansi purna jual. Rincian penawaran kami lampirkan pada berkas terlampir.\n\nBesar harapan kami untuk dapat menjalin kerjasama yang saling menguntungkan dengan perusahaan Bapak.",
    closing: "Demikian surat penawaran ini kami sampaikan. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.",
    place: "Pekanbaru",
    signerName: "H. Ahmad Delapan",
    signerTitle: "Direktur Utama",
    status: "Draft",
  },
];

export function getLetters() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(SAMPLE));
      return SAMPLE;
    }
    return JSON.parse(raw);
  } catch {
    return SAMPLE;
  }
}

export function saveLetter(letter) {
  const items = getLetters();
  const idx = items.findIndex((d) => d.id === letter.id);
  if (idx >= 0) items[idx] = letter;
  else items.unshift(letter);
  localStorage.setItem(KEY, JSON.stringify(items));
  return letter;
}

export function getLetter(id) {
  return getLetters().find((d) => d.id === id);
}

export function deleteLetter(id) {
  const items = getLetters().filter((d) => d.id !== id);
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function updateStatus(id, status) {
  const l = getLetter(id);
  if (l) saveLetter({ ...l, status });
}

const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

export function nextLetterNumber() {
  const items = getLetters();
  const now = new Date();
  const seq = String(items.length + 1).padStart(3, "0");
  return `${seq}/DDI/${ROMAN[now.getMonth() + 1]}/${now.getFullYear()}`;
}
