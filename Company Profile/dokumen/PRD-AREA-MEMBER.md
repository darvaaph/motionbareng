# PRD: Area Member motionbareng (website kelas untuk pembeli)

Dokumen ini dibuat untuk dieksekusi di **chat baru** yang khusus membangun area member.
Baca dulu `F:\Motion Bareng\CLAUDE.md` (konteks, larangan, aturan commit), lalu dokumen ini. Kalau ada yang bertentangan, `CLAUDE.md` menang.

Status: draft v1, 14 Nov 2026. Pemilik: Darva.

---

## 1. Ringkasan

motionbareng menjual kelas video (bayar sekali Rp149.000, akses **selamanya**). Pembayaran dan email produk ditangani **Scalev**. Setelah bayar, pembeli menerima email berisi **link area member + kata sandi**. Dokumen ini mendefinisikan area member itu: website terpisah dari website jualan, dengan domain baru, tempat pembeli menonton video dan memakai alat bantu belajar.

Pesan merek: **"Tulis idenya, Claude Code yang bikin animasinya"** (+ ElevenLabs untuk suara). "Bareng" = pembeli merasa **ditemani** dari langkah pertama (bukan komunitas; komunitas ditunda).

## 2. Tujuan dan bukan-tujuan

**Tujuan (tahap 1)**
1. Pembeli bisa masuk, menonton pelajaran berurutan, dan melihat progres belajarnya.
2. Semua menu sudah ada dan terasa utuh, walaupun isinya masih "segera hadir".
3. Tampilan **konsisten dengan website jualan** (palet, font, kucing, tepi kertas sobek).
4. Mudah diisi Darva tanpa menyentuh logika: semua konten ada di satu file data.

**Bukan tujuan (tahap 1)**
- Komunitas, grup, jadwal sesi, etalase karya murid (ditunda, dievaluasi setelah 1 bulan penjualan).
- Login per pembeli dengan server/database. Pembayaran di dalam area member.
- Alat bantu rumit yang butuh backend (Bikin Prompt versi pintar). Cukup placeholder "Segera hadir".
- Testimoni palsu atau klaim yang belum pasti.

## 3. Pengguna dan alur

Pengguna utama: pembeli kelas, pemula, kebanyakan di HP. Bisa belum pernah memakai Claude Code.

```
Halaman jualan (Scalev) → bayar → email Scalev (link + kata sandi) → halaman masuk
→ Beranda → Kelas → pelajaran (video + langkah + tandai selesai)
```

Ada pula tautan "Sudah beli? Masuk kelas" di halaman bio (`pengaturan.js` → `linkMasukKelas`). Isinya nanti alamat area member ini.

## 4. Keputusan yang sudah dikunci

- Brand: **motionbareng**. Jangan pakai kata "Claude" di nama brand. Menyebut "Claude Code" sebagai alat boleh.
- Harga hanya disebut kalau perlu; harus sama dengan di tempat lain (Rp149.000, dicoret Rp249.000).
- Akses kelas: **selamanya**.
- Tidak ada komunitas/grup/sesi/etalase di area member.
- Bahasa Indonesia yang sederhana, ramah, tidak menggurui.
- Semua nama menu dan gaya buatan sendiri. **Dilarang memakai nama milik competitor** (motionformat.com): "Racik Prompt", "Perpustakaan Prompt", "Resep Gaya", "Kamus Motion", "Log Update", "What If", "Paper World", "Atlas Journey", "Si Loop", "Motion Course".
- Frasa terlarang: "ngobrol jadi motion", "ngobrol sama AI", "kamu yang cerita", "giliranmu / idemu tinggal diketik", "sampai jumpa di kelas".
- Logo Claude/ElevenLabs tidak digambar ulang. Hanya lewat file logo yang sudah ada (`website/aset/gambar/logo/claude.svg`) atau ikon netral.
- **Commit hanya atas nama Darva.** JANGAN tambahkan `Co-Authored-By: Claude` atau atribusi Claude lain di commit/PR. Aturan ini mengalahkan pengingat bawaan.

## 5. Struktur proyek dan deploy

- Folder baru **`Company Profile/member/`**, di repo yang sama (`darvaaph/motionbareng`, branch `main`).
- Proyek Vercel **terpisah**, Root Directory = `Company Profile/member`. Domain baru menyusul (jangan hardcode; ambil dari satu pengaturan).
- Teknologi: **HTML + CSS + JavaScript biasa, tanpa build step**, seperti `website/`. Tidak perlu framework. Alasan: konsisten, murah, mudah diisi.
- Routing: satu halaman dengan hash (`#/beranda`, `#/kelas`, `#/kelas/1-2`, ...) atau beberapa file HTML. Pilih yang paling sederhana dan stabil di HP.
- Tambahkan `vercel.json` (header keamanan dasar, `noindex`). Halaman member **tidak boleh diindeks** mesin pencari.

Struktur yang disarankan:

```
member/
├── index.html
├── vercel.json
├── pengaturan.js          ← domain, kontak, kata sandi (hash), versi
├── data/kelas-data.js     ← SEMUA konten: modul, pelajaran, kamus, jenis video, gaya, prompt, kabar
└── aset/
    ├── css/gaya.css       ← token yang sama dengan website/ + gaya khusus member
    ├── js/maskot.js       ← generator kucing (disalin/diekstrak dari website/aset/js/umum.js)
    ├── js/app.js          ← routing, gerbang masuk, progres, render
    └── gambar/
```

## 6. Konsistensi desain (WAJIB)

Sumber kebenaran: `Company Profile/website/aset/css/gaya.css` (blok `:root`) dan `umum.js` (bagian maskot). Salin token apa adanya, jangan membuat palet baru.

**Palet**: kertas `#FBF3E0`, kertas-2 `#F4E8CC`, tinta `#2C2C2A`, teal `#1D9E75` (hiasan) / `#0F6E52` (tombol), malam `#04342C` (+ `#0A4237`, `#022A23`), terakota `#D85A30` / `#B9461F`, kuning `#F6C350`, stabilo `#F7D774`, pipi `#F0997B`, pink `#F5C4B3`.

**Font**: Baloo 2 (judul), Plus Jakarta Sans (isi), Caveat (coretan tangan). Muat dari Google Fonts.

**Ciri visual yang harus muncul**
- Garis tinta tebal (±2.5px) dengan bayangan datar offset pada tombol dan kartu.
- Section/area bergantian terang (kertas) dan gelap (malam, dengan kunang-kunang), pemisah **tepi kertas sobek**.
- Judul dengan **stabilo** (garis penanda kuning di bawah kata kunci) dan coretan tangan (Caveat) untuk keterangan kecil.
- **Maskot kucing sketsa** (lihat `CLAUDE.md` bagian Maskot): telinga kanan terlipat, mata elips, pipi merona, mulut "ω", kumis, tangan bulat tanpa lengan. Yang nongol dari pinggir layar adalah **tapak kaki**, bukan buntut. Variasi warna: krem, oren, kuning, teal. Ekspresi: biasa, senang, kagum, fokus, kaget, mikir.
- Kucing dipakai untuk: sapaan beranda, keadaan kosong ("segera hadir"), tombol "tandai selesai" (kucing senang), halaman masuk.
- Animasi pelan, hormati `prefers-reduced-motion`.

**Kontras dan keterbacaan**: teks isi di atas latar gelap minimal AA. Ukuran teks isi ≥16px. Area sentuh ≥44px.

## 7. Informasi arsitektur dan menu

Menu samping (desktop) / menu bawah-lipat (HP). Nama menu buatan sendiri:

| Menu | Fungsi | Tahap 1 |
|---|---|---|
| **Beranda** | Sapaan, persen progres, "Lanjutkan belajar", kartu pintasan, kabar baru terbaru | Penuh |
| **Kelas** | Daftar modul, daftar pelajaran dengan status (belum/selesai/segera hadir) | Penuh |
| *(halaman pelajaran)* | Video tertanam, ringkasan, daftar langkah (checklist), "Tandai selesai", sebelumnya/berikutnya | Penuh |
| **Kamus Gerak** | Istilah gerak dalam kartu: arti singkat, kapan dipakai, contoh prompt. Pencarian sederhana | Penuh (isi awal) |
| **Jenis Video** | Satu halaman per jenis: kapan dipakai, struktur adegan, contoh | Kerangka + isi awal |
| **Rak Gaya** | Galeri kartu gaya visual: nama, cuplikan/gambar, prompt yang bisa disalin | Kerangka + 5 kartu |
| **Gudang Prompt** | Daftar prompt siap salin, dikelompokkan, tombol "Salin" | Kerangka + beberapa contoh |
| **Bikin Prompt** | Alat isi-isian yang menyusun prompt | **"Segera hadir"** (halaman placeholder) |
| **Kabar Baru** | Catatan update kelas (tanggal + isi) | Penuh |
| **Download** | File pendukung, terutama skill motionbareng | Penuh (tautan placeholder) |
| **Bantuan** | Kontak (WhatsApp/email dari pengaturan), FAQ singkat, "Akses selamanya" | Penuh |

Setiap menu yang isinya belum ada harus tampil rapi dengan label "Segera hadir" dan kucing, **bukan halaman kosong atau error**.

## 8. Kebutuhan fungsional

### 8.1 Gerbang masuk
- Halaman masuk berisi: kolom **email** (yang dipakai saat checkout) dan **kata sandi**.
- Kata sandi **bersama** untuk semua pembeli (sama seperti model email produk Scalev: link + kata sandi). Kata sandi tidak boleh tertulis polos di kode: simpan **hash SHA-256** di `pengaturan.js`, bandingkan di browser dengan `crypto.subtle`.
- Email tidak diverifikasi ke server; hanya disimpan lokal untuk sapaan ("Selamat siang, ...") dan format sederhana dicek.
- Sesi disimpan di `localStorage` (dibungkus try/catch). Ada tombol "Keluar".
- **Batas jujur:** ini bukan keamanan sungguhan. Siapa pun yang membagikan link + kata sandi bisa membuat orang lain masuk, dan video yang tidak terdaftar di YouTube bisa dibuka lewat tautannya. Cukup untuk tahap awal harga Rp149.000. Jangan menyebut ini "aman" di teks. Siapkan opsi tahap 2 (login per pembeli) tanpa harus membongkar struktur.
- Pesan salah kata sandi ramah: "Kata sandinya belum cocok. Cek lagi di email dari Scalev."

### 8.2 Progres belajar
- Disimpan di `localStorage` per email. Tombol "Tandai selesai" per pelajaran (bisa dibatalkan).
- Beranda menampilkan persen total dan progres per modul.
- Jelaskan di Bantuan: progres tersimpan di browser ini; ganti perangkat berarti mulai dari awal (tahap 2: sinkron).
- Sediakan **Ekspor/Impor progres** sederhana (salin teks kode) kalau sempat. Tidak wajib.

### 8.3 Pelajaran dan video
- Video lewat **YouTube tertanam (`youtube-nocookie.com`)**. ID video diisi di file data. Kalau ID kosong: tampilkan kartu "Segera hadir" dengan kucing, **jangan** menampilkan pemutar rusak.
- Muat pemutar saat diklik (facade) supaya halaman ringan.
- Setiap pelajaran: judul, durasi, ringkasan 1-2 kalimat, daftar langkah/ceklis, dan tombol sebelumnya/berikutnya. Pelajaran terakhir yang dibuka diingat untuk "Lanjutkan belajar".
- Panduan menonton: modul 0 menjelaskan bahwa urutan harus runut dari awal.

### 8.4 Konten berbasis data
- **Semua** konten di `data/kelas-data.js` (objek JS biasa). Menambah pelajaran atau kartu = mengedit data, tanpa mengubah logika.
- Skema yang disarankan (boleh disesuaikan):
  - `modul[]`: `{ id, judul, ringkas, pelajaran[] }`
  - `pelajaran`: `{ id, judul, menit, youtubeId, ringkas, langkah[], segeraHadir }`
  - `kamus[]`: `{ istilah, arti, kapan, contohPrompt }`
  - `jenisVideo[]`: `{ id, nama, kapan, struktur[], contoh }`
  - `gaya[]`: `{ id, nama, deskripsi, gambar, prompt }`
  - `prompt[]`: `{ id, kelompok, judul, isi }`
  - `kabar[]`: `{ tanggal, judul, isi }`
  - `unduhan[]`: `{ nama, deskripsi, url }`
- Tombol **Salin** untuk prompt memakai Clipboard API dengan cadangan; beri umpan balik "Tersalin!".

### 8.5 Pencarian
Pencarian sederhana di Kamus Gerak (ketik, filter kartu). Pencarian global tidak wajib di tahap 1.

## 9. Konten awal (seed) yang harus dibuat

Judul dan urutan di bawah adalah **usulan**. Darva akan mengisi video sungguhan nanti; sekarang semua `youtubeId` kosong dan `segeraHadir: true`.

**Kurikulum (±27 video, 1 sampai 3 menit, tonton runut)**
0. **Mulai di sini** (1): sambutan, hasil akhir yang akan dibuat, cara menonton.
1. **Siapkan alat** (3): akun Claude dan langganan, install Claude Code, buka folder proyek dan chat pertama.
2. **Pasang skill dan suara** (3): pasang skill motionbareng, sambungkan ElevenLabs, tes semuanya jalan.
3. **Video pertamamu** (4): ide dan naskah, minta Claude Code bikin animasi, tambah suara dan subtitle, render MP4 dan unggah.
4. **Dasar gerak** (5): keyframe, easing dan overshoot, stagger, transisi, safe area.
5. **Jenis-jenis video** (5-6): explainer, promo/iklan, intro dan bumper, logo reveal, lower third.
6. **Gaya visual** (2): cara meracik gaya, satu gaya dari awal sampai jadi. (Gaya lain cukup sebagai kartu di Rak Gaya, tanpa video pelajaran.)
7. **Studi kasus** (2-3): proses apa adanya dari ide sampai jadi, termasuk salah dan perbaikannya.
8. **Revisi sampai puas** (3): cara minta revisi, error yang sering muncul dan solusinya, kumpulkan portofolio.

**Kamus Gerak (awal)**: keyframe, easing (ease in/out), overshoot, anticipation, stagger, transisi (cut, fade, wipe, zoom), loop, safe area. Isi kartu: tulis ringkas dan jujur; contoh prompt boleh placeholder.

**Rak Gaya (awal, nama buatan sendiri, boleh diganti Darva)**: Kertas Sobek, Sketsa Tinta, Peta dan Jalur, Neon Malam, Isometrik. Gambar boleh placeholder bergambar kucing; deskripsi singkat; prompt placeholder.

**Jenis Video (awal)**: explainer 16:9, shorts 9:16, promo/iklan, intro, bumper, logo reveal, lower third.

**Kabar Baru**: satu entri contoh berlabel "CONTOH". Jangan membuat kabar palsu.

**Download**: skill motionbareng (URL placeholder, tandai `GANTI:`).

## 10. Kebutuhan non-fungsional

- **Mobile first** (mayoritas pembeli di HP). Uji lebar 360px sampai desktop.
- **Pelajaran dari website jualan:** bar tetap di bawah (`position: fixed`) bermasalah di Safari iOS (tertutup toolbar saat awal). Hindari bar bawah yang bergantung `fixed` + `transform`. Kalau perlu navigasi bawah, pakai `env(safe-area-inset-bottom)` dan uji di iPhone. Hindari juga `100vh` untuk tinggi penuh; pakai `dvh`/`svh`.
- **Hindari gambar SVG tertanam (data URI) di HTML** hanya jika nanti halaman ini dipasang di Scalev. Untuk Vercel biasa tidak masalah.
- Aksesibilitas: urutan fokus, label tombol, kontras, `aria-live` untuk pesan, navigasi keyboard, semua video diberi judul.
- Performa: tanpa pustaka berat, gambar dimuat malas, font dimuat dengan `display=swap`.
- Privasi: tidak ada pelacak pihak ketiga di tahap 1. Simpan email hanya di browser pengguna.
- `localStorage` selalu dibungkus try/catch dan halaman tetap berfungsi tanpa itu.

## 11. Integrasi dengan Scalev (langkah manual Darva, bukan kode)

- Di produk "Kelas motionbareng" di Scalev, atur **pengiriman produk digital** berisi dua item: **link** area member, dan **teks kata sandi**.
- Pastikan produk tidak punya masa berlaku (akses selamanya) dan teks FAQ di halaman jualan sama dengan yang dikirim.
- Setelah area member terbit, isi `linkMasukKelas` di `website/pengaturan.js` dan `alamatMember` (pengaturan baru) bila dibutuhkan.

## 12. Kriteria selesai (tahap 1)

- [ ] Gerbang masuk berfungsi (kata sandi benar/salah, keluar, sesi bertahan setelah reload).
- [ ] Semua menu di bagian 7 ada dan terbuka tanpa error; yang belum berisi menampilkan "Segera hadir" dengan kucing.
- [ ] Kelas: 9 modul dengan daftar pelajaran sesuai bagian 9, status progres bekerja, "Tandai selesai" bekerja, "Lanjutkan belajar" benar.
- [ ] Kamus Gerak, Rak Gaya, Gudang Prompt memiliki isi awal dan tombol Salin bekerja.
- [ ] Konten hanya ada di `data/kelas-data.js`; menambah pelajaran tidak butuh perubahan logika.
- [ ] Tampilan konsisten dengan website jualan (palet, font, kucing, tepi sobek, stabilo); tampil rapi di 360px, tablet, dan desktop; tidak ada gulir horizontal.
- [ ] Diuji di Chrome desktop, Chrome Android, dan **Safari iPhone** (khusus layout bawah/viewport).
- [ ] Tidak ada nama competitor, frasa terlarang, atau janji komunitas/sesi/etalase.
- [ ] `noindex` terpasang; tidak ada pelacak pihak ketiga.
- [ ] Dokumen cara mengisi konten (`dokumen/PANDUAN-AREA-MEMBER.md`) singkat dan jelas ditulis.
- [ ] Commit hanya atas nama Darva, tanpa atribusi Claude. Siap di-deploy ke proyek Vercel baru.

## 13. Tahap berikutnya (di luar cakupan sekarang)

- Evaluasi 1 bulan: perlu komunitas? login per pembeli? sinkron progres? alat Bikin Prompt sungguhan?
- Perluasan halaman jualan agar menyebut cakupan baru (promo, intro, logo reveal), dikerjakan terpisah di `website/kelas.html`.
- Domain khusus untuk area member dan halaman jualan.

## 14. Pertanyaan terbuka

1. Nama domain area member? (Menyusul; jangan hardcode.)
2. Video final disimpan di mana? (Asumsi: YouTube tidak terdaftar. Alternatif: Vimeo/Bunny yang bisa dikunci per domain.)
3. Apakah file skill motionbareng sudah berbentuk file yang bisa dibagikan? Di mana disimpan?
4. Apakah email produk Scalev akan memuat satu kata sandi bersama (model sekarang), atau Darva ingin login per pembeli sejak awal?
5. Daftar akhir judul pelajaran dan gaya (Darva menyetujui atau mengganti usulan bagian 9).

## 15. Cara memakai dokumen ini di chat baru

Prompt awal yang disarankan untuk chat baru:

> Baca `F:\Motion Bareng\CLAUDE.md` dan `F:\Motion Bareng\Company Profile\dokumen\PRD-AREA-MEMBER.md`. Bangun kerangka area member di `Company Profile/member/` sesuai PRD. Kerjakan bertahap dan minta konfirmasi sebelum lanjut ke tahap berikutnya. Gunakan palet, font, dan maskot kucing dari `Company Profile/website/`. Commit hanya atas nama saya, tanpa Co-Authored-By Claude.
