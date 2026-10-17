let dataPesanan = JSON.parse(localStorage.getItem('pesananKafe')) || {
  nomorMeja: '',
  barang: [],
  total: 0
};

document.getElementById('tampilMeja').textContent = `Meja: ${dataPesanan.nomorMeja || 'Belum diketahui'}`;
document.getElementById('inputMeja').value = dataPesanan.nomorMeja;

const wadahRingkasan = document.getElementById('daftarRingkasan');
wadahRingkasan.innerHTML = '';
let subtotal = 0;

dataPesanan.barang.forEach(item => {
  wadahRingkasan.innerHTML += `
    <div class="barang-ringkasan">
      <span>• ${item.nama}</span>
      <span>Rp ${item.harga.toLocaleString('id-ID')}</span>
    </div>
  `;
  subtotal += item.harga;
});

document.getElementById('subtotalRingkasan').textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
document.getElementById('totalRingkasan').textContent = `Rp ${dataPesanan.total.toLocaleString('id-ID')}`;

document.getElementById('btnKembali').addEventListener('click', () => {
  window.location.href = 'index.html?meja=' + encodeURIComponent(dataPesanan.nomorMeja);
});

document.getElementById('btnKeBayar').addEventListener('click', () => {
  const nama = document.getElementById('namaPemesan').value.trim();
  const nomorMejaBaru = document.getElementById('inputMeja').value.trim();
  const catatan = document.getElementById('catatan').value.trim();

  if (!nama) {
    alert('Silakan isi nama pemesan terlebih dahulu!');
    return;
  }
  if (!nomorMejaBaru) {
    alert('Silakan isi nomor meja Anda!');
    return;
  }

  dataPesanan.nama = nama;
  dataPesanan.nomorMeja = nomorMejaBaru;
  dataPesanan.catatan = catatan;
  localStorage.setItem('pesananKafe', JSON.stringify(dataPesanan));

  window.location.href = 'bayar.html';
});
