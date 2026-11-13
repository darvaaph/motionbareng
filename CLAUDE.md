# motionbareng — konteks proyek

## Apa ini
Brand kelas online untuk belajar membuat video motion (explainer & shorts) dengan **Claude Code** + ElevenLabs.
Model jualan: bayar sekali, akses kelas video tutorial. Materi dimulai dari install Claude Code → pasang skill motionbareng → sambungkan ElevenLabs → bikin video.
Pemilik: Darva. Status (13 Nov 2026): kelas dinyatakan siap dijual, website jualan sudah dibangun, data asli (link checkout, modul, kontak, karya) masih placeholder.

## Keputusan yang sudah dikunci
- Nama brand & username: **motionbareng** (ketersediaan akun IG/TikTok/YouTube belum dicek)
- Pembeda utama dari pesaing: "bareng" = belajar bersama (grup komunitas, sesi bikin bareng, etalase karya murid)
- Pesan utama: **"Tulis idenya, Claude Code yang bikin animasinya"** (+ "ElevenLabs yang isi suaranya")
- Harga: Rp249.000 dicoret → **Rp149.000** ("harga promo perdana"). Harga harus sama di semua tempat.
- Tombol beli → link checkout eksternal (Scalev / Mayar / Lynk.id, diisi Darva)
- Website dua halaman: `index.html` = link bio, `kelas.html` = halaman jualan
- Bagian atas halaman: kenalan dulu (maskot besar, nama, slogan). Harga jangan di paling atas.

## Larangan
- Jangan pakai kata "Claude" di **nama brand** (merek dagang Anthropic). Menyebut "Claude Code" sebagai alat yang dipakai boleh.
- Logo Claude/ElevenLabs jangan digambar ulang. Logo hanya lewat slot `logoAlat` di `pengaturan.js`. Logo Claude sudah dipasang dari file pilihan Darva (`website/aset/gambar/logo/claude.svg`); ElevenLabs masih ikon netral.
- Jangan pakai frasa pesaing: "ngobrol jadi motion", "ngobrol sama AI", "kamu yang cerita", "giliranmu / idemu tinggal diketik", "sampai jumpa di kelas"
- Jangan buat testimoni palsu. Data contoh harus berlabel "CONTOH".
- Jangan janjikan fitur yang belum pasti ada (sesi bikin bareng, grup, bonus, refund). Tandai dengan `GANTI:` dan masukkan ke daftar data.

## Pesaing utama (referensi, JANGAN ditiru)
motionformat.com: Rp249rb sekali bayar, maskot "Si Loop" (cacing krem, satu garis), palet navy + krem + ungu, font Fredoka/Gochi Hand/Nunito, hosting Scalev.
Dua halaman: link bio (`/`) dan halaman jualan (`/motion-course`). Catatan teknik lengkap ada di `Company Profile/dokumen/REFERENSI-MOTIONFORMAT.md`.
Teknik yang boleh dipakai (wujudnya harus beda): latar section selang-seling gelap/terang, demo bergerak per section, maskot yang bereaksi saat scroll, bar harga menempel.

## Maskot (final: kucing sketsa)
- Kucing duduk, garis tinta tebal sedikit "goyang" (filter SVG), mata elips hitam, pipi merona, mulut "ω", kumis.
- Ciri khas: **telinga kanan terlipat** (warisan "sudut terlipat" dari konsep kertas).
- Tangan/tapak: **bulat kecil** tanpa lengan.
- Yang nongol dari pinggir layar: **tapak kaki**, BUKAN buntut (buntut terlalu mirip cacing Si Loop).
- Kucing kecil ngintip di atas bar harga, ekspresinya berubah per section (biasa, senang, kagum, fokus, kaget, mikir).
- Variasi warna: krem (utama), oren, kuning, teal.
- Konsep lama (lembar kertas / flipbook / pesawat kertas) diarsipkan di `Company Profile/arsip/maskot-kertas/`.

## Palet & font (dipakai sekarang)
- Kertas #FBF3E0, tinta #2C2C2A, teal #1D9E75 (hiasan) / #0F6E52 (tombol), malam #04342C, terakota #D85A30 / #B9461F (latar), kuning #F6C350, stabilo #F7D774, pipi #F0997B
- Section malam = teal tua + kunang-kunang; pemisah section = tepi kertas sobek
- Font: Baloo 2 (judul), Plus Jakarta Sans (isi), Caveat (coretan tangan)

## Struktur folder
Semua kerja ada di `Company Profile/` (peta lengkap: `Company Profile/README.md`):
- `website/` → yang di-upload. File yang paling sering diubah: `website/pengaturan.js`
- `dokumen/` → `DATA-YANG-PERLU-DIISI.md` (daftar placeholder), `PANDUAN-WEBSITE.md`, `REFERENSI-MOTIONFORMAT.md`
- `arsip/` → konsep lama
Preview lokal: konfigurasi "website" di `.claude/launch.json` (port 8765).

## Langkah berikutnya
1. Darva mengisi data asli (lihat `Company Profile/dokumen/DATA-YANG-PERLU-DIISI.md`)
2. Cek ketersediaan akun @motionbareng
3. Coba di HP sungguhan, lalu upload (Netlify Drop paling mudah)
4. Bio IG + highlight, konten pertama

## Cara kerja dengan Darva
- Bahasa Indonesia yang sederhana
- Kritis dan jujur, sebut kelemahan dulu (terutama soal kemiripan dengan pesaing)
- Kerjakan bertahap, minta konfirmasi sebelum lanjut ke tahap berikutnya
