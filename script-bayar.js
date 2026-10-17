// Client Key Midtrans Sandbox (sudah diisi)
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

// Muat library Midtrans Snap
const scriptSnap = document.createElement('script');
scriptSnap.src = "https://app.sandbox.midtrans.com/snap/snap.js";
scriptSnap.dataset.clientKey = MIDTRANS_CLIENT_KEY;
document.body.appendChild(scriptSnap);

scriptSnap.onload = function() {
  const tempatQris = document.getElementById('tempatQris');
  tempatQris.innerHTML = `
    <p>Klik tombol di bawah untuk buka pembayaran uji‑coba</p>
    <button id="btnBukaBayar" style="padding:12px 20px; background:#2563eb; color:white; border:none; border‑radius:8px; margin‑top:10px;">
      Buka Pembayaran
    </button>
  `;

  document.getElementById('btnBukaBayar').addEventListener('click', async () => {
    try {
      const res = await fetch("/api/create‑transaction", {
        method: "POST",
        headers: {"Content‑Type":"application/json"},
        body: JSON.stringify(pesanan)
      });
      const dataTrans = await res.json();
      if(dataTrans.token) {
        window.snap.pay(dataTrans.token, {
          onSuccess: function() {
            // Simpan pesanan ke daftar kasir
            const semua = JSON.parse(localStorage.getItem('semuaPesananKafe')) || [];
            pesanan.status = "Sudah Bayar (Uji‑Coba)";
            semua.push(pesanan);
            localStorage.setItem('semuaPesananKafe', JSON.stringify(semua));
            alert('Pembayaran berhasil! Pesanan terkirim ke kasir');
            window.location.href = 'kasir.html';
          },
          onPending: function() { alert('Menunggu pembayaran'); },
          onError: function() { alert('Gagal pembayaran'); }
        });
      }
    } catch(err) {
      alert('⚠️ Belum bisa buka QRIS: Silakan tambahkan folder `api` dengan file server terlebih dahulu');
    }
  });
};
