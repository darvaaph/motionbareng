# Langkah publish website motionbareng

Kode sudah ada di GitHub: https://github.com/darvaaph/motionbareng (branch `main`).
Dokumen ini berisi urutan supaya website **benar-benar bisa dipakai jualan**.

Urutannya:
1. Online-kan website (Vercel)
2. Siapkan pembayaran (link checkout)
3. Isi konten asli
4. Cek akhir sebelum promosi

---

## 1. Online-kan website di Vercel (gratis)

Kenapa Vercel: gratis untuk website seperti ini, langsung tersambung ke GitHub, dan **setiap kali kamu push, website otomatis ter-update** dalam ±1 menit. Netlify juga sama bagusnya, dan langkahnya mirip.

1. Buka **vercel.com** → **Sign Up** → pilih **Continue with GitHub** (login pakai akun `darvaaph`).
2. Klik **Add New… → Project**.
3. Di daftar repo, cari **motionbareng** → **Import**.
   - Kalau repo tidak muncul: klik *Adjust GitHub App Permissions*, lalu beri izin ke repo `motionbareng`.
4. Di halaman **Configure Project**:
   - **Framework Preset**: `Other`
   - **Root Directory**: klik **Edit**, lalu pilih folder `Company Profile/website` ← **penting**
   - **Build Command** dan **Output Directory**: biarkan kosong
5. Klik **Deploy**. Tunggu sampai muncul tulisan selamat.
6. Kamu dapat alamat seperti `motionbareng.vercel.app` (namanya bisa sedikit beda kalau sudah dipakai orang).
   - `https://…vercel.app/` = halaman link bio, alamat ini yang ditaruh di bio Instagram/TikTok
   - `https://…vercel.app/kelas` = halaman jualan

### Domain sendiri (opsional, berbayar)

Alamat seperti `motionbareng.com` atau `motionbareng.id` lebih meyakinkan untuk jualan.

1. Beli domain di registrar Indonesia (misalnya Niagahoster, Domainesia, Rumahweb) atau Cloudflare.
2. Di Vercel: **Project → Settings → Domains → Add**, lalu ketik domainnya.
3. Vercel akan menampilkan record DNS (A / CNAME) yang harus dipasang. Salin record itu ke pengaturan DNS di tempat kamu membeli domain.
4. Tunggu beberapa menit sampai beberapa jam. HTTPS (gembok) dipasang otomatis oleh Vercel.

> Repo sekarang **publik**. Vercel tetap jalan kalau nanti repo dijadikan **private**: Settings → General → Danger Zone → Change visibility.

---

## 2. Pembayaran (link checkout)

Website ini statis, jadi **tidak bisa menerima uang sendiri**. Uangnya diterima oleh **platform checkout**. Website cukup mengarahkan tombol "Beli" ke halaman bayar milik platform itu.

### Pilih platform

| Pilihan | Cocok kalau… | Catatan |
|---|---|---|
| **Mayar** | Mau cepat jualan produk digital/kelas | Ada QRIS, VA bank, e-wallet. Cek apakah fitur kelas/membership-nya cocok untuk menaruh materi |
| **Scalev** | Mau checkout + halaman order yang serius | Platform yang dipakai pesaing. Banyak fitur jualan |
| **Lynk.id** | Mau paling simpel | Cocok untuk mulai kecil |
| Midtrans / Xendit (gateway langsung) | Nanti, kalau sudah besar | **Butuh server/backend sendiri** dan verifikasi bisnis. Belum perlu sekarang |

Biaya per transaksi dan syarat verifikasi tiap platform berbeda dan bisa berubah, jadi **cek langsung di halaman harga masing-masing** sebelum memilih.

### Langkah (umumnya sama di semua platform)

1. **Daftar & verifikasi akun**: biasanya KTP dan rekening bank untuk pencairan dana. Ikuti petunjuk platformnya.
2. **Buat produk** bernama "Kelas motionbareng":
   - Harga **Rp149.000**. Kalau ada kolom harga coret, isi Rp249.000.
   - Deskripsi singkat dan gambar (boleh screenshot hero website).
3. **Atur apa yang diterima pembeli setelah bayar.** Ini penting:
   - Email atau halaman "terima kasih" berisi **link akses kelas** dan **link grup komunitas**.
   - Selama website kelas (member area) belum jadi, aksesnya bisa lewat fitur kelas di platform itu (kalau ada) atau link sementara (misalnya playlist YouTube *unlisted*).
4. **Salin link checkout** produk itu.
5. **Tempel di website**: buka `Company Profile/website/pengaturan.js`, lalu isi:
   ```js
   linkCheckout: "https://…link-checkout-kamu…",
   ```
   Naikkan juga nomor versi di `index.html` dan `kelas.html` (`?v=2` → `?v=3`). Setelah itu commit & push (lihat bagian 3).
6. **Uji beli sendiri.** Kalau platformnya bisa membuat kupon diskon 100% atau punya mode uji, pakai itu. Pastikan:
   - tombol "Beli" di website membuka halaman checkout yang benar,
   - harga di checkout **sama** dengan di website,
   - email/akses kelas benar-benar terkirim setelah bayar.
7. Peringatan kuning "Link checkout belum diisi" di website akan hilang sendiri setelah `linkCheckout` terisi.

---

## 3. Cara mengisi & mengubah konten

Semua daftar yang harus diisi ada di `dokumen/DATA-YANG-PERLU-DIISI.md`. Ada dua cara mengubahnya:

### Cara A: langsung di GitHub (tanpa install apa pun)

1. Buka https://github.com/darvaaph/motionbareng → masuk ke folder `Company Profile/website`.
2. Klik file yang mau diubah (misalnya `pengaturan.js`) → klik ikon **pensil** (Edit).
3. Ubah isinya → klik **Commit changes…** → **Commit changes**.
4. Tunggu ±1 menit, Vercel otomatis memperbarui website.

**Upload thumbnail karya:** masuk ke `Company Profile/website/aset/gambar/karya` → **Add file → Upload files** → seret gambarnya → **Commit changes**. Setelah itu tulis path-nya di `pengaturan.js`, misalnya `gambar: "aset/gambar/karya/karya-1.jpg"`.

### Cara B: di laptop (pakai Claude Code / editor)

1. Ubah file di folder `F:\Motion Bareng\Company Profile\website`.
2. Lihat hasilnya dulu di laptop:
   ```bash
   python -m http.server 8765 --directory "F:/Motion Bareng/Company Profile/website"
   ```
   Lalu buka http://localhost:8765.
3. Kirim ke GitHub (Vercel ikut ter-update):
   ```bash
   cd "F:/Motion Bareng"
   git add -A
   git commit -m "Isi data asli: link checkout dan materi"
   git push
   ```

### Ingat

- Setelah mengubah `gaya.css`, `umum.js`, atau `pengaturan.js`, **naikkan nomor `?v=`** di `index.html` dan `kelas.html`.
- Bagian teks yang masih contoh ditandai `GANTI:` di `kelas.html` dan `index.html`. Cari kata itu (Ctrl+F).

---

## 4. Cek akhir sebelum promosi

- [ ] Website bisa dibuka di HP dan laptop (alamat Vercel atau domain)
- [ ] Tombol "Beli" membuka checkout yang benar, dan harganya sama (Rp149.000)
- [ ] Uji beli berhasil, dan akses kelas + grup terkirim
- [ ] Semua `GANTI:` sudah diganti dengan isi asli (materi, yang didapat, cara akses, skill)
- [ ] Poin yang belum benar-benar ada (misalnya sesi bikin bareng) sudah dihapus
- [ ] Contoh karya diganti karya asli (`contoh: false`), atau dibiarkan berlabel CONTOH
- [ ] WhatsApp/email dan akun media sosial di `pengaturan.js` benar dan milikmu
- [ ] Tautan "Sudah beli? Masuk kelas" (`linkMasukKelas`) diisi kalau area member sudah ada
- [ ] Alamat halaman link bio dipasang di bio Instagram/TikTok

---

## Setelah ini: website kelas (member area)

Ini tahap berikutnya: tempat pembeli menonton materi. Hal yang perlu diputuskan nanti:
- Pakai fitur kelas di platform checkout (paling cepat), atau bikin sendiri (lebih bebas, tapi butuh login dan proteksi video).
- Tempat menyimpan video (YouTube unlisted, Bunny Stream, Vimeo, dll.).
- Setelah ada alamatnya, isi `linkMasukKelas` di `pengaturan.js`.
