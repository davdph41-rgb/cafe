export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({pesan: 'Metode tidak diizinkan'});

  const serverKey = "Mid‑server‑KNdiKc1HPaivbw0Su‑WCzmAn";
  const pesanan = req.body;

  const orderId = `ORDER‑${Date.now()}`;
  const totalBayar = pesanan.total;

  const bodyPermintaan = JSON.stringify({
    transaction_details: {
      order_id: orderId,
      gross_amount: totalBayar
    },
    customer_details: {
      first_name: pesanan.nama,
      address: `Meja ${pesanan.nomorMeja}`
    }
  });

  try {
    const hasil = await fetch("https://api.sandbox.midtrans.com/v2/charge", {
      method: "POST",
      headers: {
        "Content‑Type": "application/json",
        "Authorization": "Basic " + btoa(serverKey + ":")
      },
      body: bodyPermintaan
    });
    const dataMidtrans = await hasil.json();
    res.status(200).json({ token: dataMidtrans.token, orderId });
  } catch (err) {
    res.status(500).json({pesan: "Gagal buat transaksi", error: err.message});
  }
}
