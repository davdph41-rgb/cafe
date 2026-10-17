function muatPesanan() {
  const wadah = document.getElementById('daftarPesananKasir');
  const semuaPesanan = JSON.parse(localStorage.getItem('semuaPesananKafe')) || [];

  wadah.innerHTML = '';
  if (semuaPesanan.length === 0) {
    wadah.innerHTML = `<p style="text‑align:center; padding:30px 0;">Belum ada pesanan masuk</p>`;
    return;
  }

  semuaPesanan.forEach((pesan, indeks) => {
    let daftarBarang = pesan.barang.map(b => `${b.nama} (Rp ${b.harga.toLocaleString('id‑ID')})`).join('<br>');
    wadah.innerHTML += `
      <div style="background:#fff; padding:16px; border‑radius:12px; margin‑bottom:12px; box‑shadow:0 1px 3px #ddd;">
        <h3>Pesanan #${indeks+1}</h3>
        <p><strong>Nama:</strong> ${pesan.nama || '-'}</p>
        <p><strong>Meja:</strong> ${pesan.nomorMeja || '-'}</p>
        <p><strong>Catatan:</strong> ${pesan.catatan || '-'}</p>
        <p><strong>Pesanan:</strong><br>${daftarBarang}</p>
        <p><strong>Total:</strong> Rp ${pesan.total.toLocaleString('id‑ID')}</p>
        <p><strong>Status:</strong> ${pesan.status || 'Menunggu Pembayaran'}</p>
      </div>
    `;
  });
}

muatPesanan();
document.getElementById('btnSegarkan').addEventListener('click', muatPesanan);
