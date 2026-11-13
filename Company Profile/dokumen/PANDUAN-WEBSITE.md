# Panduan website motionbareng

Website ada di folder `Company Profile/website/`, dan terdiri dari dua halaman. Peta folder lengkap ada di `Company Profile/README.md`.

| File | Gunanya |
|---|---|
| `index.html` | **Halaman link bio**: pasang alamat ini di bio Instagram/TikTok. Isinya kenalan, kartu kelas, daftar tautan, contoh karya, dan FAQ singkat |
| `kelas.html` | **Halaman jualan** lengkap (tombol di halaman bio mengarah ke sini dengan label `?utm_source=linkbio`) |
| `pengaturan.js` | **File yang kamu ubah**: link checkout, harga, kontak, tautan bio, contoh karya |
| `aset/css/gaya.css` | Tampilan (warna, font, tata letak) untuk kedua halaman |
| `aset/js/umum.js` | Kode bersama untuk kedua halaman: maskot, animasi, harga, karya |
| `aset/gambar/` | Thumbnail karya (`karya/`) dan logo alat (`logo/`) |
| `favicon.svg` | Ikon kecil di tab browser |

Alurnya: **Instagram/TikTok → `index.html` (link bio) → `kelas.html` (jualan) → checkout.**

## 1. Wajib dicek sebelum upload

- [ ] **Link checkout** di `pengaturan.js` (`linkCheckout`). Selama masih kosong, akan muncul peringatan kuning di layar.
- [ ] **Isi kelas** (bagian "Isi kelas" di `kelas.html`, cari tulisan `GANTI:`). Enam modul yang ada sekarang hanya contoh.
- [ ] **Yang didapat pembeli** di kartu harga (cari `GANTI:`). Hapus poin yang tidak benar, misalnya kalau belum ada sesi bikin bareng.
- [ ] **Cara akses setelah bayar** di FAQ (cari `GANTI:`). Sesuaikan dengan platform checkout-mu: lewat email, WhatsApp, atau dashboard.
- [ ] **Contoh karya**: ganti data contoh di `pengaturan.js`, lalu ubah `contoh: true` jadi `false`.
- [ ] **Akun media sosial**: pastikan @motionbareng di Instagram, TikTok, dan YouTube memang milikmu. Kalau belum, kosongkan isinya.
- [ ] **WhatsApp / email** untuk kontak (opsional).
- [ ] **Syarat alat di FAQ**: cek lagi apakah paket langganan Claude yang sekarang sudah termasuk Claude Code, dan apakah ElevenLabs masih punya paket gratis.

## 2. Menambah contoh karya asli

1. Taruh thumbnail di folder `website/aset/gambar/karya/` (misalnya `karya-1.jpg`). Ukurannya 16:9 untuk explainer dan 9:16 untuk shorts.
2. Di `pengaturan.js`, isi bagian `gambar: "aset/gambar/karya/karya-1.jpg"` dan `link: "https://..."` (link YouTube, TikTok, atau Instagram).
3. Ubah `oleh: "Data contoh"` jadi nama pembuatnya, lalu `contoh: false`.

## 3. Cara upload (pilih salah satu)

- **Netlify Drop (paling gampang, gratis)**: buka app.netlify.com/drop, lalu seret folder `website` ke halaman itu. Website langsung online, dan domain sendiri bisa dipasang belakangan.
- **Hosting cPanel**: upload semua file di folder `website` ke folder `public_html`.
- **Vercel / GitHub Pages**: bisa juga, tapi perlu akun GitHub.

Upload **isi folder `website`** saja (termasuk folder `aset`). Folder `dokumen` dan `arsip` tidak perlu ikut di-upload.

## 4. Mengubah warna atau tampilan

- Semua warna ada di bagian paling atas `aset/css/gaya.css`, di dalam `:root { ... }`. Ganti kode warnanya di situ, nanti seluruh halaman ikut berubah.
- Warna latar tiap section ditentukan oleh kelasnya: `class="krem"`, `class="malam"` (teal tua + kunang-kunang), atau `class="terakota"`. Tepi kertas sobek dibuat otomatis untuk section yang punya `data-sobek`.
- Ekspresi kucing yang ngintip di atas bar harga diatur per section lewat `data-eks`. Pilihannya: `biasa`, `senang`, `kagum`, `fokus`, `kaget`, `mikir`.
- Jumlah kunang-kunang diatur lewat `data-n` di elemen `<div class="kunang">`.

## 5. Setelah mengubah file, naikkan nomor versi

Di `index.html` dan `kelas.html`, link ke `gaya.css`, `umum.js`, dan `pengaturan.js` diberi nomor versi, misalnya `aset/js/umum.js?v=2`.
Setiap kali salah satu file itu diubah lalu di-upload ulang, **ganti angkanya** (misalnya `?v=2` jadi `?v=3`) di kedua file HTML. Tanpa ini, browser pengunjung lama bisa tetap memakai versi lama yang tersimpan di cache.
