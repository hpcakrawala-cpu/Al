// Currency + Indonesian "terbilang" helpers
export function rupiah(n) {
  const num = Number(n) || 0;
  return "Rp " + num.toLocaleString("id-ID");
}

export function formatDateID(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
}

const SATUAN = [
  "", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan",
  "sepuluh", "sebelas",
];

function toWords(n) {
  n = Math.floor(n);
  if (n < 12) return SATUAN[n];
  if (n < 20) return toWords(n - 10) + " belas";
  if (n < 100) return toWords(Math.floor(n / 10)) + " puluh" + (n % 10 ? " " + toWords(n % 10) : "");
  if (n < 200) return "seratus" + (n % 100 ? " " + toWords(n % 100) : "");
  if (n < 1000) return toWords(Math.floor(n / 100)) + " ratus" + (n % 100 ? " " + toWords(n % 100) : "");
  if (n < 2000) return "seribu" + (n % 1000 ? " " + toWords(n % 1000) : "");
  if (n < 1000000) return toWords(Math.floor(n / 1000)) + " ribu" + (n % 1000 ? " " + toWords(n % 1000) : "");
  if (n < 1000000000) return toWords(Math.floor(n / 1000000)) + " juta" + (n % 1000000 ? " " + toWords(n % 1000000) : "");
  if (n < 1000000000000) return toWords(Math.floor(n / 1000000000)) + " miliar" + (n % 1000000000 ? " " + toWords(n % 1000000000) : "");
  return toWords(Math.floor(n / 1000000000000)) + " triliun" + (n % 1000000000000 ? " " + toWords(n % 1000000000000) : "");
}

export function terbilang(n) {
  const num = Math.floor(Number(n) || 0);
  if (num === 0) return "nol rupiah";
  const words = toWords(num).replace(/\s+/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1) + " rupiah";
}
