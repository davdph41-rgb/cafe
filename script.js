const urlParam = new URLSearchParams(window.location.search);
const nomorMeja = urlParam.get('meja') || '';
document.querySelector('.nomor-meja').textContent = `Meja: ${nomorMeja || 'Belum diketahui'}`;

let keranjang = [];
const wadahKeranjang = document.getElementById('isiKeranjang');
const tampilanTotal = document.getElementById('totalHarga');
const tombolLanjut = document.getElementById('btnLanjut');
const tombolKosong = document.getElementById('btnKosong');

function perbaruiKeranjang() {
  wadahKeranjang.innerHTML = '';
  let total = 0;
  keranjang.forEach((barang, indeks) => {
    wadahKeranjang.innerHTML += `
      <div class="barang-keranjang">
        <span>${barang.nama} — Rp ${barang.harga.toLocaleString('id-ID')}</span>
        <button class="btn-hapus" data-indeks="${indeks}">Hapus</button>
      </div>
    `;
    total += barang.harga;
  });
  tampilanTotal.textContent = `Rp ${total.toLocaleString('id-ID')}`;
  tombolLanjut.disabled = (keranjang.length === 0);

  document.querySelectorAll('.btn-hapus').forEach(btn => {
    btn.addEventListener('click', function() {
      const idx = parseInt(this.dataset.indeks);
      keranjang.splice(idx, 1);
      perbaruiKeranjang();
    });
  });
}

document.querySelectorAll('.btn-tambah').forEach(tombol => {
  tombol.addEventListener('click', function() {
    const item = this.closest('.item');
    const nama = item.dataset.nama;
    const harga = parseInt(item.dataset.harga);
    keranjang.push({ nama, harga });
    perbaruiKeranjang();
  });
});

tombolKosong.addEventListener('click', () => {
  if(confirm('Yakin ingin membatalkan semua pesanan?')){
    keranjang = [];
    perbaruiKeranjang();
  }
});

tombolLanjut.addEventListener('click', () => {
  let total = keranjang.reduce((jumlah, item) => jumlah + item.harga, 0);
  const dataKirim = {
    nomorMeja: nomorMeja,
    barang: [...keranjang],
    total: total
  };
  localStorage.setItem('pesananKafe', JSON.stringify(dataKirim));
  window.location.href = 'data‑pesanan.html';
});
