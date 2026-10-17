// Kunci Client‑Key Midtrans Sandbox (boleh ada di halaman depan)
const MIDTRANS_CLIENT_KEY = "Mid‑client‑It0EFIBOdQG2v3hv";

// Ambil data pesanan dari penyimpanan browser
let pesanan = JSON.parse(localStorage.getItem('pesananKafe')) || null;
if (!pesanan) {
  alert('Tidak ada pesanan, silakan kembali ke menu');
  window.location.href = 'index.html';
}

// Tampilkan ringkasan pesanan
document.getElementById('infoMeja').textContent = `Meja: ${pesanan.nomorMeja}`;
document.getElementById('infoNama').textContent = pesanan.nama;
document.getElementById('infoCatatan').textContent = pesanan.catatan || '-';
document.getElementById('totalBayar').textContent = `Rp ${pesanan.total.toLocaleString('id‑ID')}`;

const wadahBarang = document.getElementById('daftarBarangBayar');
wadahBarang.innerHTML = '';
pesanan.barang.forEach(item => {
  wadahBarang.innerHTML += `<div>• ${item.nama} — Rp ${item.harga.toLocaleString('id‑ID')}</div>`;
});

// Tombol kembali ke halaman data
document.getElementById('btnKembaliData').addEventListener('click', () => {
  window.location.href = 'data‑pesanan.html';
});

// Muat library Midtrans Snap
const scriptSnap = document.createElement('script');
scriptSnap.src = "https://app.sandbox.midtrans.com/snap/snap.js";
scriptSnap.dataset.clientKey = MIDTRANS_CLIENT_KEY;
document.body.appendChild(scriptSnap);

// Setelah library Midtrans siap
scriptSnap.onload = function() {
  const tempatQris = document.getElementById('tempatQris');
  tempatQris.innerHTML = `
    <p>Klik tombol di bawah untuk memulai pembayaran (uji coba)</p>
    <button id="btnBukaBayar" style="padding:12px 20px; background:#2563eb; color:white; border:none; border‑radius:8px; margin‑top:10px;">
      Buka Pembayaran
    </button>
  `;

  document.getElementById('btnBukaBayar').addEventListener('click', () => {
    alert('⚠️ Belum bisa tampilkan QRIS: masih perlu tambahan file server untuk mengambil token transaksi dari Midtrans. Kita akan buat file server ini selanjutnya.');
  });
};
