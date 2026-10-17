// Client Key disimpan dulu (belum dipakai untuk uji‑coba)
const MIDTRANS_CLIENT_KEY = "Mid‑client‑It0EFIBOdQG2v3hv";

let pesanan = JSON.parse(localStorage.getItem('pesananKafe')) || null;
if (!pesanan) {
  alert('Tidak ada pesanan, silakan kembali ke menu');
  window.location.href = 'index.html';
}

// Hitung ulang total agar tidak jadi Rp 0
let totalHitung = pesanan.barang.reduce((jumlah, item) => jumlah + item.harga, 0);
pesanan.total = totalHitung;

document.getElementById('infoMeja').textContent = `Meja: ${pesanan.nomorMeja}`;
document.getElementById('infoNama').textContent = pesanan.nama;
document.getElementById('infoCatatan').textContent = pesanan.catatan || '-';
document.getElementById('totalBayar').textContent = `Rp ${pesanan.total.toLocaleString('id‑ID')}`;

const wadahBarang = document.getElementById('daftarBarangBayar');
wadahBarang.innerHTML = '';
pesanan.barang.forEach(item => {
  wadahBarang.innerHTML += `<div>• ${item.nama} — Rp ${item.harga.toLocaleString('id‑ID')}</div>`;
});

document.getElementById('btnKembaliData').addEventListener('click', () => {
  window.location.href = 'data‑pesanan.html';
});

// Tampilan uji‑coba QRIS (tanpa panggil server dulu)
const tempatQris = document.getElementById('tempatQris');
tempatQris.innerHTML = `
  <p>🔹 Uji‑coba Pembayaran</p>
  <div style="width:160px;height:160px;background:#e5e7eb;margin:12px auto;display:flex;align-items:center;justify-content:center;border-radius:8px;">
    <span style="font‑size:14px;">QRIS Contoh</span>
  </div>
  <button id="btnSudahBayar" style="padding:12px 20px;background:#16a34a;color:white;border:none;border‑radius:8px;margin‑top:8px;">
    ✅ Sudah Bayar (Uji‑coba)
  </button>
`;

document.getElementById('btnSudahBayar').addEventListener('click', () => {
  const semuaPesanan = JSON.parse(localStorage.getItem('semuaPesananKafe')) || [];
  pesanan.status = "Sudah Bayar (Uji‑Coba)";
  semuaPesanan.push(pesanan);
  localStorage.setItem('semuaPesananKafe', JSON.stringify(semuaPesanan));
  alert('Pembayaran berhasil! Pesanan masuk ke kasir');
  window.location.href = 'kasir.html';
});
