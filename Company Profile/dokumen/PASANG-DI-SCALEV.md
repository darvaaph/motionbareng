# Pasang halaman jualan di Scalev (formulir pembayaran langsung)

Dengan cara ini, pembeli mengisi data dan memilih metode bayar **langsung di halaman jualan kita**, lalu diarahkan ke halaman pembayaran Scalev (QRIS / VA). Cara ini sama dengan Motion Format.

## Gambaran

| Tempat | Halaman | Pembayaran |
|---|---|---|
| **Vercel** | `index.html` (link bio) dan `kelas.html` | Tombol "Beli" membuka `linkCheckout` (halaman produk Scalev) |
| **Scalev** (HTML Checkout Page) | `scalev/kelas-scalev.html` (versi satu file dari `kelas.html`) | Formulir di section **Daftar** langsung membuat pesanan |

Kode formulirnya sama. Halaman otomatis memakai formulir kalau dibuka di Scalev, dan memakai tombol `linkCheckout` kalau dibuka di tempat lain.

## Sebelum mulai

- [ ] Produk "Kelas motionbareng" sudah dibuat di Scalev (harga Rp149.000, benefit Files / Links atau LMS sudah diatur)
- [ ] Metode pembayaran (QRIS / VA) sudah aktif di toko Scalev
- [ ] `hargaPromo` di `website/pengaturan.js` sama dengan harga produk di Scalev

## Langkah 1: buat file satu halaman

Setiap kali isi website berubah, jalankan:

```bash
python "F:/Motion Bareng/Company Profile/alat/buat-halaman-scalev.py"
```

Hasilnya `Company Profile/scalev/kelas-scalev.html`. File ini **jangan diedit langsung**. Ubah file di folder `website/`, lalu jalankan skripnya lagi.

## Langkah 2: buat halaman di Scalev

1. Di dashboard Scalev buka **Pages**, lalu buat halaman baru dengan tipe **HTML Checkout Page**.
   Pilih tipe ini, **bukan** "HTML Sales Page", karena Sales Page tidak bisa membuat pesanan. Tipenya tidak bisa diubah setelah dibuat.
2. Tab **Context**:
   - **Store Context**: pilih tokomu. Pilihan ini terkunci setelah disimpan pertama kali.
   - **Products**: pilih produk "Kelas motionbareng".
   - **Aksi setelah checkout**: pilih ke halaman instruksi pembayaran (paling aman).
3. Tab **Code**: **Upload File**, lalu pilih `kelas-scalev.html`.
4. Tab **Security**: izinkan domain berikut supaya font tampil:
   - `style_src`: `https://fonts.googleapis.com`
   - `font_src`: `https://fonts.gstatic.com`
   - Kalau gambar karya dimuat dari Vercel, tambahkan alamat Vercel-mu di `img_src`.
   Cek juga bagian **Dependencies and diagnostics**: kalau masih ada domain yang diblokir, izinkan di sini.
5. Tab **Setting**: isi nama halaman, **slug** (misalnya `kelas`), judul SEO, lalu **Simpan**.
6. Lihat pratinjau, lalu **Publish**.

> Di pratinjau editor, pesanan hanya **simulasi**. Pesanan sungguhan baru terjadi di halaman yang sudah di-publish.

## Langkah 3: hubungkan dengan website Vercel

Di `website/pengaturan.js` isi:

```js
alamatWebsite: "https://alamat-vercel-kamu.vercel.app",
alamatHalamanJualan: "https://motion-bareng.myscalev.com/kelas",   // alamat halaman Scalev tadi
```

- **`alamatHalamanJualan`**: semua tombol "Lihat kelasnya" di halaman bio akan membuka halaman Scalev.
- **`alamatWebsite`**: di halaman Scalev, logo/beranda kembali ke halaman bio di Vercel.

Setelah mengubah `pengaturan.js`:
1. Naikkan `?v=` di `index.html` dan `kelas.html`, lalu commit & push (Vercel ter-update).
2. Jalankan lagi skrip di Langkah 1, lalu upload ulang file hasilnya ke Scalev (tab Code).

## Langkah 4: uji

1. Buka halaman Scalev yang sudah di-publish, lalu scroll ke **Daftar**.
2. Pastikan paket, harga, dan metode pembayaran tampil sesuai yang diatur di Scalev.
3. Ganti metode bayar. Total di ringkasan harus ikut berubah kalau ada biaya metode.
4. Isi data asli kamu, lalu klik **Buat pesanan & bayar**. Kamu harus diarahkan ke halaman pembayaran Scalev.
5. Bayar sekali (atau pakai kupon 100% kalau ada) untuk memastikan email akses terkirim.

## Kalau ada masalah

| Gejala | Kemungkinan penyebab |
|---|---|
| Section Daftar menampilkan tombol "Lanjut ke pembayaran", bukan formulir | Halaman dibuat sebagai Sales Page, atau produk belum dipilih di tab Context |
| Metode pembayaran kosong | Belum ada metode bayar yang aktif di toko Scalev |
| Muncul pesan error soal alamat/pengiriman saat pesan | Scalev mewajibkan alamat untuk produk ini. Kabari, nanti formulirnya ditambah kolom alamat |
| Font tampil seperti font biasa | `fonts.googleapis.com` / `fonts.gstatic.com` belum diizinkan di tab Security |
| Harga di formulir beda dengan di bagian atas halaman | `hargaPromo` di `pengaturan.js` beda dengan harga produk di Scalev. Samakan |

Rujukan: [Scalev HTML Mode runtime](https://dev.scalev.com/docs/html-mode-runtime), [Membuat halaman HTML Mode](https://dev.scalev.com/docs/create-landing-page-html-mode)
