// LocalStorage-backed operations data (frontend-first mock)
// Modules: members (anggota), SPK, cash (kas), goods (barang), visitors

const K = {
  members: "dd_members",
  spk: "dd_spk",
  cash: "dd_cash",
  goods: "dd_goods",
  visits: "dd_visits",
};

// ---- date helpers ----
export function iso(daysAgo = 0) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}
const R = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// ---- generic store ----
function read(key, seed) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw);
  } catch {
    return seed;
  }
}
function write(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
function upsert(key, seed, item) {
  const list = read(key, seed);
  const i = list.findIndex((x) => x.id === item.id);
  if (i >= 0) list[i] = item;
  else list.unshift(item);
  write(key, list);
  return item;
}
function removeById(key, seed, id) {
  const list = read(key, seed).filter((x) => x.id !== id);
  write(key, list);
  return list;
}

// ================= SEED =================
const MEMBERS_SEED = [
  { id: "AGT-01", name: "Andi Saputra", role: "Kepala Produksi", phone: "0812-1111-001", joinDate: "2019-03-01" },
  { id: "AGT-02", name: "Rudi Hartono", role: "Welder Senior", phone: "0812-1111-002", joinDate: "2020-06-15" },
  { id: "AGT-03", name: "Slamet Riyadi", role: "Teknisi Hidrolik", phone: "0812-1111-003", joinDate: "2021-01-10" },
  { id: "AGT-04", name: "Bayu Pratama", role: "Painter", phone: "0812-1111-004", joinDate: "2022-08-20" },
  { id: "AGT-05", name: "Dedi Kurniawan", role: "Helper", phone: "0812-1111-005", joinDate: "2023-02-05" },
];

const UNITS = ["Karoseri Box", "Dump Truck", "Tangki", "Car Carrier"];

const SPK_SEED = [
  { id: "SPK-2025-001", number: "SPK-2025-001", date: iso(20), memberId: "AGT-01", unit: "Karoseri Box", qty: 2, description: "Pembuatan box aluminium 6m", targetDate: iso(-5), value: 12000000, status: "Selesai" },
  { id: "SPK-2025-002", number: "SPK-2025-002", date: iso(15), memberId: "AGT-02", unit: "Dump Truck", qty: 1, description: "Bak dump plat baja + hidrolik", targetDate: iso(-2), value: 9500000, status: "Selesai" },
  { id: "SPK-2025-003", number: "SPK-2025-003", date: iso(9), memberId: "AGT-03", unit: "Tangki", qty: 1, description: "Tangki CPO 16.000L", targetDate: iso(-8), value: 15000000, status: "Proses" },
  { id: "SPK-2025-004", number: "SPK-2025-004", date: iso(4), memberId: "AGT-04", unit: "Car Carrier", qty: 1, description: "Rel hidrolik 2 tingkat", targetDate: iso(-14), value: 18000000, status: "Proses" },
  { id: "SPK-2025-005", number: "SPK-2025-005", date: iso(2), memberId: "AGT-01", unit: "Karoseri Box", qty: 3, description: "Box reefer pendingin", targetDate: iso(-20), value: 21000000, status: "Proses" },
];

// Cash & goods seeded over the last ~35 days
function seedCash() {
  const list = [];
  let n = 1;
  const add = (daysAgo, type, category, amount, memberId, note) =>
    list.push({ id: `KAS-${String(n++).padStart(4, "0")}`, date: iso(daysAgo), type, category, amount, memberId: memberId || null, note: note || "" });

  // Pemasukan: hasil kerja unit keluar & pembayaran (angsuran) anggota
  add(30, "masuk", "Hasil Kerja Unit", 130000000, null, "Pelunasan 2 unit box - PT Logistik Andalan");
  add(24, "masuk", "Hasil Kerja Unit", 92000000, null, "Dump truck - PT Mineral Riau");
  add(18, "masuk", "Pembayaran Anggota", 1500000, "AGT-02", "Angsuran pinjaman");
  add(12, "masuk", "Hasil Kerja Unit", 120000000, null, "Tangki CPO - PT Sawit Sejahtera");
  add(7, "masuk", "Pembayaran Anggota", 1000000, "AGT-03", "Angsuran pinjaman");
  add(3, "masuk", "Hasil Kerja Unit", 45000000, null, "DP Car Carrier");
  add(1, "masuk", "Pembayaran Anggota", 750000, "AGT-05", "Angsuran pinjaman");

  // Pengeluaran: material, gaji, operasional, pinjaman anggota
  add(29, "keluar", "Material", 48000000, null, "Plat & aluminium");
  add(28, "keluar", "Pinjaman Anggota", 5000000, "AGT-02", "Pinjaman renovasi rumah");
  add(22, "keluar", "Gaji/Upah", 22000000, null, "Gaji mingguan tim produksi");
  add(20, "keluar", "Pinjaman Anggota", 3000000, "AGT-03", "Pinjaman keluarga");
  add(15, "keluar", "Operasional", 6500000, null, "Listrik, solar, konsumsi");
  add(10, "keluar", "Gaji/Upah", 22000000, null, "Gaji mingguan tim produksi");
  add(6, "keluar", "Material", 31000000, null, "Besi & cat");
  add(2, "keluar", "Pinjaman Anggota", 2000000, "AGT-05", "Pinjaman darurat");
  add(1, "keluar", "Operasional", 4200000, null, "Perawatan alat");
  return list;
}

function seedGoods() {
  const list = [];
  let n = 1;
  const add = (daysAgo, name, type, qty, unit, note) =>
    list.push({ id: `BRG-${String(n++).padStart(4, "0")}`, date: iso(daysAgo), name, type, qty, unit, note: note || "" });
  // masuk (material) & keluar (unit hasil kerja)
  add(31, "Plat Baja 3mm", "masuk", 40, "lembar", "Pembelian material");
  add(30, "Karoseri Box", "keluar", 2, "unit", "Kirim ke PT Logistik Andalan");
  add(25, "Aluminium Panel", "masuk", 30, "lembar", "Pembelian material");
  add(24, "Dump Truck", "keluar", 1, "unit", "Kirim ke PT Mineral Riau");
  add(16, "Cat & Primer", "masuk", 25, "kaleng", "Restock");
  add(12, "Tangki", "keluar", 1, "unit", "Kirim ke PT Sawit Sejahtera");
  add(5, "Besi Hollow", "masuk", 60, "batang", "Pembelian material");
  add(3, "Car Carrier", "keluar", 1, "unit", "Serah terima sebagian");
  return list;
}

function seedVisits() {
  const days = [];
  for (let i = 29; i >= 0; i--) {
    const base = 60 + Math.round(40 * Math.sin((29 - i) / 4));
    days.push({ date: iso(i), count: base + R(0, 35) });
  }
  return { days, total: days.reduce((a, d) => a + d.count, 0) };
}

// ================= PUBLIC API =================
export const getMembers = () => read(K.members, MEMBERS_SEED);
export const saveMember = (m) => upsert(K.members, MEMBERS_SEED, m);
export const deleteMember = (id) => removeById(K.members, MEMBERS_SEED, id);
export const memberName = (id) => getMembers().find((m) => m.id === id)?.name || "-";

export const getSPK = () => read(K.spk, SPK_SEED);
export const saveSPK = (s) => upsert(K.spk, SPK_SEED, s);
export const deleteSPK = (id) => removeById(K.spk, SPK_SEED, id);
export function nextSPKNumber() {
  const list = getSPK();
  return `SPK-${new Date().getFullYear()}-${String(list.length + 1).padStart(3, "0")}`;
}

export const getCash = () => read(K.cash, seedCash());
export const saveCash = (c) => upsert(K.cash, seedCash(), c);
export const deleteCash = (id) => removeById(K.cash, seedCash(), id);

export const getGoods = () => read(K.goods, seedGoods());
export const saveGoods = (g) => upsert(K.goods, seedGoods(), g);
export const deleteGoods = (id) => removeById(K.goods, seedGoods(), id);

// visitor tracking
export function trackVisit() {
  try {
    const v = read(K.visits, seedVisits());
    const today = iso(0);
    const last = v.days[v.days.length - 1];
    if (last && last.date === today) last.count += 1;
    else v.days.push({ date: today, count: 1 });
    if (v.days.length > 30) v.days = v.days.slice(-30);
    v.total = (v.total || 0) + 1;
    write(K.visits, v);
    return v;
  } catch {
    return seedVisits();
  }
}
export const getVisits = () => read(K.visits, seedVisits());

// ================= ANALYTICS =================
const startOfWeek = (d) => {
  const x = new Date(d);
  const day = (x.getDay() + 6) % 7; // Monday=0
  x.setDate(x.getDate() - day);
  return x.toISOString().slice(0, 10);
};

export function cashTotals() {
  const cash = getCash();
  const masuk = cash.filter((c) => c.type === "masuk").reduce((a, c) => a + c.amount, 0);
  const keluar = cash.filter((c) => c.type === "keluar").reduce((a, c) => a + c.amount, 0);
  return { masuk, keluar, saldo: masuk - keluar };
}

// group cash flow by period: 'harian' | 'mingguan' | 'bulanan'
export function cashFlowSeries(period = "harian") {
  const cash = getCash();
  const map = {};
  const keyOf = (dateStr) => {
    const d = new Date(dateStr);
    if (period === "bulanan") return d.toLocaleDateString("id-ID", { month: "short", year: "2-digit" });
    if (period === "mingguan") return startOfWeek(dateStr);
    return dateStr;
  };
  cash.forEach((c) => {
    const k = keyOf(c.date);
    if (!map[k]) map[k] = { key: k, masuk: 0, keluar: 0 };
    map[k][c.type] += c.amount;
  });
  const rows = Object.values(map).sort((a, b) => (a.key > b.key ? 1 : -1));
  return rows.map((r) => {
    let label = r.key;
    if (period === "harian" || period === "mingguan") {
      const d = new Date(r.key);
      label = d.toLocaleDateString("id-ID", { day: "2-digit", month: "short" });
    }
    return { label, masuk: r.masuk, keluar: r.keluar, saldo: r.masuk - r.keluar };
  });
}

// pengeluaran by category (pie)
export function expenseByCategory() {
  const cash = getCash().filter((c) => c.type === "keluar");
  const map = {};
  cash.forEach((c) => (map[c.category] = (map[c.category] || 0) + c.amount));
  return Object.entries(map).map(([name, value]) => ({ name, value }));
}

// units keluar (hasil kerja) per period
export function unitsOutSeries(period = "mingguan") {
  const goods = getGoods().filter((g) => g.type === "keluar");
  const map = {};
  goods.forEach((g) => {
    const d = new Date(g.date);
    let k;
    if (period === "bulanan") k = d.toLocaleDateString("id-ID", { month: "short", year: "2-digit" });
    else if (period === "harian") k = g.date;
    else k = startOfWeek(g.date);
    map[k] = (map[k] || 0) + g.qty;
  });
  return Object.entries(map)
    .sort((a, b) => (a[0] > b[0] ? 1 : -1))
    .map(([key, qty]) => {
      let label = key;
      if (period !== "bulanan") label = new Date(key).toLocaleDateString("id-ID", { day: "2-digit", month: "short" });
      return { label, unit: qty };
    });
}

// per-member finance: pinjaman, pembayaran (angsuran), sisa utang, upah
export function memberFinance() {
  const cash = getCash();
  return getMembers().map((m) => {
    const mine = cash.filter((c) => c.memberId === m.id);
    const pinjaman = mine.filter((c) => c.category === "Pinjaman Anggota").reduce((a, c) => a + c.amount, 0);
    const pembayaran = mine.filter((c) => c.category === "Pembayaran Anggota").reduce((a, c) => a + c.amount, 0);
    const upah = getCash().filter((c) => c.category === "Gaji/Upah" && c.memberId === m.id).reduce((a, c) => a + c.amount, 0);
    return { ...m, pinjaman, pembayaran, upah, sisaUtang: Math.max(0, pinjaman - pembayaran) };
  });
}

export const CASH_CATEGORIES = {
  masuk: ["Hasil Kerja Unit", "Pembayaran Anggota", "Lainnya"],
  keluar: ["Pinjaman Anggota", "Gaji/Upah", "Material", "Operasional", "Lainnya"],
};
