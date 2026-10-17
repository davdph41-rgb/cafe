// Ambil data pesanan dari penyimpanan browser
let pesanan = JSON.parse(localStorage.getItem('pesananKafe')) || null;
if (!pesanan) {
  alert('Tidak ada pesanan, silakan kembali ke menu');
  window.location.href = 'index.html';
}

// Tampilkan ringkasan
document.getElementById('infoMeja').textContent = `Meja: ${pesanan.nomorMeja}`;
document.getElementById('infoNama').textContent = pesanan.nama;
document.getElementById('infoCatatan').textContent = pesanan.catatan || '-';
document.getElementById('totalBayar').textContent = `Rp ${pesanan.total.toLocaleString('id‑ID')}`;

const wadahBarang = document.getElementById('daftarBarangBayar');
wadahBarang.innerHTML = '';
pesanan.barang.forEach(item => {
  wadahBarang.innerHTML += `<div>• ${item.nama} — Rp ${item.harga.toLocaleString('id‑ID')}</div>`;
});

// Tombol kembali
document.getElementById('btnKembaliData').addEventListener('click', () => {
  window.location.href = 'data‑pesanan.html';
});

// Nanti fungsi ini akan dihubungkan ke Midtrans (belum berfungsi uang asli dulu)
// Saat ini hanya tampilan:
document.getElementById('tempatQris').innerHTML = `
  <div style="text‑align:center; padding:20px; background:#eee; border‑radius:10px;">
    <p>QRIS pembayaran akan muncul<br>setelah kamu daftar akun Midtrans</p>
  </div>
`;
