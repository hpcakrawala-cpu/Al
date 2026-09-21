// Mock data for PT DELAPAN DELAPAN INDUSTRI website (frontend-first)

export const COMPANY = {
  name: 'PT DELAPAN DELAPAN INDUSTRI',
  shortName: 'Delapan Delapan Industri',
  tagline: 'Karoseri Berkualitas untuk Masa Depan yang Lebih Baik',
  address: 'Jl. Gunung Gayo Gg. Darunnur No.22 RT002/011, Pematang Kapau, Kulim, Kota Pekanbaru, Riau',
  email: 'delapan8industri@gmail.com',
  phone: '+62 811 767 188',
  phoneRaw: '62811767188',
  founded: '2015',
  npwp: '88.888.888.8-888.000',
};

export const NAV = [
  { label: 'Beranda', to: '/' },
  { label: 'Tentang Kami', to: '/tentang' },
  { label: 'Layanan', to: '/layanan' },
  { label: 'Portofolio', to: '/portofolio' },
  { label: 'Blog', to: '/blog' },
  { label: 'Kontak', to: '/kontak' },
];

export const HERO_IMAGE = 'https://images.pexels.com/photos/28520996/pexels-photo-28520996.jpeg';

export const FEATURES = [
  { icon: 'ShieldCheck', title: 'Kualitas Terjamin', desc: 'Material pilihan & pengerjaan profesional' },
  { icon: 'Settings', title: 'Desain Custom', desc: 'Sesuai kebutuhan bisnis Anda' },
  { icon: 'Clock', title: 'Tepat Waktu', desc: 'Komitmen pada deadline' },
  { icon: 'Headphones', title: 'Layanan Purna Jual', desc: 'Selalu siap membantu' },
];

export const SERVICES = [
  {
    slug: 'karoseri-box',
    name: 'Karoseri Box',
    short: 'Aman, kuat, dan tahan lama untuk berbagai kebutuhan pengiriman.',
    desc: 'Karoseri box dengan konstruksi rangka kuat, panel aluminium/plat, dan sistem penguncian aman. Cocok untuk logistik, ekspedisi, dan distribusi barang.',
    image: 'https://images.unsplash.com/photo-1601912552080-0fb89fd08042',
    price: 'Mulai Rp 65.000.000',
  },
  {
    slug: 'karoseri-dump-truck',
    name: 'Karoseri Dump Truck',
    short: 'Untuk pekerjaan berat dengan performa maksimal.',
    desc: 'Dump truck dengan sistem hidrolik presisi, bak plat baja tebal, dan daya tahan tinggi untuk material tambang, pasir, dan proyek konstruksi.',
    image: 'https://images.unsplash.com/photo-1671022412547-75c4cb01f47e?crop=entropy&cs=srgb&fm=jpg&q=85',
    price: 'Mulai Rp 85.000.000',
  },
  {
    slug: 'karoseri-tangki',
    name: 'Karoseri Tangki',
    short: 'Solusi transportasi cairan dengan standar keamanan tinggi.',
    desc: 'Tangki stainless/plat dengan sekat gelombang, sistem katup aman, dan sertifikasi untuk pengangkutan BBM, air, CPO, dan cairan industri.',
    image: 'https://images.unsplash.com/photo-1528458538087-f58e9ad895da?crop=entropy&cs=srgb&fm=jpg&q=85',
    price: 'Mulai Rp 120.000.000',
  },
  {
    slug: 'karoseri-car-carrier',
    name: 'Karoseri Car Carrier',
    short: 'Mengangkut kendaraan dengan aman dan efisien.',
    desc: 'Car carrier dua tingkat dengan rel hidrolik, sistem pengikat kendaraan, dan konstruksi ringan namun kokoh untuk pengiriman kendaraan.',
    image: 'https://images.pexels.com/photos/18468412/pexels-photo-18468412.jpeg',
    price: 'Mulai Rp 150.000.000',
  },
];

export const STATS = [
  { value: '500+', label: 'Unit Terkirim' },
  { value: '10+', label: 'Tahun Pengalaman' },
  { value: '150+', label: 'Klien Perusahaan' },
  { value: '98%', label: 'Kepuasan Klien' },
];

export const PORTFOLIO = [
  { id: 1, title: 'Fleet Box Logistik Nasional', category: 'Karoseri Box', image: 'https://images.unsplash.com/photo-1601912552080-0fb89fd08042', client: 'PT Logistik Andalan' },
  { id: 2, title: 'Dump Truck Proyek Tambang', category: 'Dump Truck', image: 'https://images.unsplash.com/photo-1671022412547-75c4cb01f47e?crop=entropy&cs=srgb&fm=jpg&q=85', client: 'PT Mineral Riau' },
  { id: 3, title: 'Tangki CPO 20.000L', category: 'Tangki', image: 'https://images.pexels.com/photos/16100082/pexels-photo-16100082.jpeg', client: 'PT Sawit Sejahtera' },
  { id: 4, title: 'Car Carrier Dealer', category: 'Car Carrier', image: 'https://images.pexels.com/photos/18468412/pexels-photo-18468412.jpeg', client: 'Auto Distribusi Nusantara' },
  { id: 5, title: 'Box Pendingin (Reefer)', category: 'Karoseri Box', image: 'https://images.pexels.com/photos/28520996/pexels-photo-28520996.jpeg', client: 'Fresh Food Distribusi' },
  { id: 6, title: 'Tangki Air Bersih', category: 'Tangki', image: 'https://images.pexels.com/photos/36228061/pexels-photo-36228061.jpeg', client: 'PDAM Pekanbaru' },
];

export const PROCESS = [
  { step: '01', title: 'Konsultasi', desc: 'Diskusi kebutuhan & spesifikasi unit bersama tim ahli kami.' },
  { step: '02', title: 'Desain & Penawaran', desc: 'Pembuatan desain teknis dan penawaran harga transparan.' },
  { step: '03', title: 'Produksi', desc: 'Fabrikasi presisi dengan kontrol kualitas di setiap tahap.' },
  { step: '04', title: 'Serah Terima', desc: 'Uji kelayakan, dokumen lengkap, dan garansi purna jual.' },
];

export const TESTIMONIALS = [
  { name: 'Budi Santoso', role: 'Direktur Operasional, PT Logistik Andalan', text: 'Kualitas karoseri box-nya sangat rapi dan kuat. Pengiriman tepat waktu, tim sangat profesional.' },
  { name: 'Rina Wijaya', role: 'Procurement, PT Mineral Riau', text: 'Dump truck hasil produksi Delapan Delapan Industri tahan banting untuk medan tambang yang berat.' },
  { name: 'Ahmad Fauzi', role: 'Owner, Ekspedisi Sumatera', text: 'Pelayanan purna jual mereka juara. Setiap kendala langsung ditangani cepat.' },
];

export const BLOG = [
  { id: 1, title: 'Tips Memilih Karoseri Box yang Tepat untuk Bisnis Logistik', category: 'Tips', date: '12 Jun 2025', image: 'https://images.pexels.com/photos/28520996/pexels-photo-28520996.jpeg', excerpt: 'Memilih karoseri box yang sesuai dapat menghemat biaya operasional jangka panjang. Simak panduannya.' },
  { id: 2, title: 'Standar Keamanan Karoseri Tangki untuk Pengangkutan BBM', category: 'Edukasi', date: '05 Jun 2025', image: 'https://images.pexels.com/photos/36228061/pexels-photo-36228061.jpeg', excerpt: 'Keamanan adalah prioritas utama dalam transportasi cairan. Berikut standar yang wajib dipenuhi.' },
  { id: 3, title: 'Teknologi Modern dalam Produksi Karoseri 2025', category: 'Teknologi', date: '28 Mei 2025', image: 'https://images.unsplash.com/photo-1730584474196-b0e8a29303e8?crop=entropy&cs=srgb&fm=jpg&q=85', excerpt: 'Inovasi fabrikasi presisi meningkatkan kualitas dan mempercepat waktu produksi karoseri.' },
];

export const SOCIALS = [
  { name: 'Instagram', icon: 'Instagram', url: '#' },
  { name: 'Youtube', icon: 'Youtube', url: '#' },
  { name: 'TikTok', icon: 'Music2', url: '#' },
  { name: 'Facebook', icon: 'Facebook', url: '#' },
];

// ===== Admin mock (localStorage-backed in components) =====
export const ADMIN_CREDENTIALS = { username: 'admin', password: 'admin88' };

export const SAMPLE_INVOICES = [
  {
    id: 'INV-2025-001',
    type: 'invoice',
    number: 'INV-2025-001',
    date: '2025-06-10',
    dueDate: '2025-06-24',
    clientName: 'PT Logistik Andalan',
    clientAddress: 'Jl. Soekarno Hatta No.10, Pekanbaru',
    clientPhone: '0761-123456',
    items: [
      { desc: 'Karoseri Box Aluminium 6m', qty: 2, price: 65000000 },
      { desc: 'Instalasi pintu samping', qty: 2, price: 3500000 },
    ],
    taxRate: 11,
    notes: 'Pembayaran melalui transfer Bank BCA a.n PT Delapan Delapan Industri.',
    status: 'Lunas',
  },
  {
    id: 'KW-2025-001',
    type: 'kwitansi',
    number: 'KW-2025-001',
    date: '2025-06-12',
    clientName: 'PT Mineral Riau',
    terbilang: '',
    amount: 85000000,
    forPayment: 'Pembayaran DP Karoseri Dump Truck',
    notes: '',
  },
];
