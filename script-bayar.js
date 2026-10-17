// Client Key Midtrans (tetap disimpan)
const MIDTRANS_CLIENT_KEY = "Mid‑client‑It0EFIBOdQG2v3hv";

let pesanan = JSON.parse(localStorage.getItem('pesananKafe')) || null;
if (!pesanan) {
  alert('Tidak ada pesanan, silakan kembali ke menu');
  window.location.href = 'index.html';
}

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

// Versi uji‑coba (tanpa panggil server dulu)
const tempatQris = document.getElementById('tempatQris');
tempatQris.innerHTML = `
  <p>Ini tampilan uji‑coba QRIS</p>
  <div style="width:160px;height:160px;background:#ddd;margin:10px auto;display:flex;align-items:center;justify-content:center;">
    <span>QRIS UJI‑COBA</span>
  </div>
  <button id="btnBayarBerhasil" style="padding:12px 20px; background:#16a34a; color:white; border:none; border‑radius:8px; margin‑top:10px;">
    Sudah Bayar (Uji‑coba)
  </button>
`;

document.getElementById('btnBayarBerhasil').addEventListener('click', () => {
  // Simpan pesanan ke daftar kasir
  const semua = JSON.parse(localStorage.getItem('semuaPesananKafe')) || [];
  pesanan.status = "Sudah Bayar (Uji‑Coba)";
  semua.push(pesanan);
  localStorage.setItem('semuaPesananKafe', JSON.stringify(semua));
  alert('Pembayaran berhasil! Pesanan terkirim ke halaman kasir');
  window.location.href = 'kasir.html';
});
