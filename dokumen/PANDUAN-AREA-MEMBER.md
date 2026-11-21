# Panduan area member (website kelas untuk pembeli)

Folder: `member/`. HTML, CSS, dan JavaScript biasa, tanpa build step.
Kebutuhan produk lengkap ada di `dokumen/PRD-AREA-MEMBER.md`.

## File yang biasa diubah

| Mau mengubah | Buka file |
|---|---|
| Kata sandi, alamat, kontak bantuan | `member/pengaturan.js` |
| Pelajaran, video, kamus, jenis video, gaya, prompt, kabar, download, FAQ | `member/data/kelas-data.js` |
| Gambar contoh gaya | taruh di `member/aset/gambar/`, lalu isi `gambar` di data |

`aset/js/app.js` (logika) dan `aset/js/maskot.js` (kucing) tidak perlu disentuh untuk mengisi konten.

**Setelah mengubah file apa pun**, naikkan angka `?v=` file itu di `member/index.html`
(misalnya `data/kelas-data.js?v=3` jadi `?v=4`) supaya browser pembeli memuat versi baru.

## Melihat di laptop

Jalankan preview **member** (`.claude/launch.json`, port 8766), lalu buka http://localhost:8766.
Kata sandi uji ada di file catatan terpisah (tidak masuk repo). Ganti dengan kata sandi asli sebelum dibagikan.

## Ganti kata sandi

Kata sandinya sama untuk semua pembeli dan dikirim lewat email produk Scalev.
Yang disimpan di `pengaturan.js` hanya hash SHA-256-nya.

1. Buka terminal, jalankan (ketik kata sandi saat diminta, tidak akan terlihat):
   ```
   python -c "import hashlib,getpass; print(hashlib.sha256(getpass.getpass('Kata sandi: ').strip().encode()).hexdigest())"
   ```
2. Salin hasilnya (64 huruf/angka) ke `hashKataSandi` di `pengaturan.js`.
3. Naikkan `pengaturan.js?v=` di `index.html`, lalu commit dan push.
4. Ganti juga kata sandi di email produk Scalev.

Spasi di awal/akhir kata sandi diabaikan. Setelah hash diganti, semua pembeli otomatis diminta masuk lagi.

**Batas jujur:** gerbang ini bukan pengamanan sungguhan. Siapa pun yang punya link + kata sandi bisa masuk,
dan video YouTube "tidak publik" bisa dibuka lewat tautannya. Cukup untuk tahap awal; jangan menyebutnya "aman".

## Mengisi isi kelas (`data/kelas-data.js`)

Petunjuk singkat ada di komentar bagian atas tiap kelompok data. Yang paling sering:

- **Video tayang:** isi `youtubeId` (bagian setelah `watch?v=` di link YouTube) dan ubah `segeraHadir` jadi `false`.
  Selama `youtubeId` kosong, halaman pelajaran menampilkan kartu "Segera hadir" dengan kucing.
- **Tambah pelajaran:** salin satu baris pelajaran, ganti `id` (unik, contoh `"3-5"`), judul, dan isinya.
- **Jangan mengubah `id` pelajaran setelah kelas dijual.** Progres pembeli tersimpan berdasarkan id ini.
- **Tulisan kode:** apit dengan tanda petik miring, misalnya `` `claude` ``, supaya tampil sebagai kode.
- **Data contoh:** entri dengan `contoh: true` mendapat label CONTOH. Ubah jadi `false` setelah diuji/diganti.
- **Kabar baru:** tambah entri `{ tanggal: "2026-12-01", judul: "...", isi: "..." }`. Urutan diatur otomatis.
- **Download:** isi `url` (link Google Drive, dll.). Kosong = tampil "Segera hadir".

Kalau ada salah ketik (misalnya koma hilang), halaman akan kosong. Buka konsol browser (F12) untuk melihat baris yang salah.

## Progres belajar

Disimpan di browser pembeli (per email), bukan di server. Ganti perangkat berarti mulai dari awal,
kecuali pembeli memakai **Bantuan → Pindahkan progres** (salin kode di perangkat lama, tempel di yang baru).
Kalau browser memblokir penyimpanan, kelas tetap bisa dipakai, tapi harus masuk ulang setiap halaman dimuat ulang.

## Publish ke Vercel (proyek terpisah dari website jualan)

1. Vercel → Add New → Project → pilih repo `darvaaph/motionbareng`.
2. **Root Directory:** `member`. Framework: Other. Tanpa build command.
3. Deploy. `vercel.json` sudah memasang `noindex` dan header keamanan dasar.
4. Setelah dapat alamat/domain: isi `alamatMember` di `member/pengaturan.js`,
   dan `linkMasukKelas` di `website/pengaturan.js` (supaya tautan "Sudah beli? Masuk kelas" muncul di halaman bio).

Gambar dari situs lain sudah diizinkan. Kalau nanti memakai video selain YouTube (misalnya Vimeo atau Bunny),
tambahkan alamatnya di `frame-src` pada `Content-Security-Policy` di `vercel.json`, kalau tidak videonya diblokir.

## Langkah manual di Scalev

1. Di produk kelas, atur **pengiriman produk digital** berisi: link area member, dan teks kata sandi.
2. Pastikan produk tidak punya masa berlaku (akses selamanya).
3. Samakan FAQ halaman jualan dengan FAQ di `data/kelas-data.js` → `faq`.

## Wajib dites di iPhone (Safari) sebelum dijual

Belum bisa dites dari laptop. Cek di iPhone sungguhan:
- Halaman masuk: keyboard tidak menutupi tombol Masuk, tidak ada zoom otomatis saat mengetik.
- Menu HP: tombol Menu membuka panel, panel bisa digulir sampai tombol Keluar, latar tidak ikut tergulir.
- Video: ketuk tombol putar, video main di halaman, bisa layar penuh.
- Tombol Salin di Gudang Prompt: muncul "Tersalin!" dan teksnya benar saat ditempel.
- Putar layar (portrait/landscape), lalu kembali: tidak ada gulir ke samping.

## Yang masih harus diputuskan Darva

Dicatat juga di `dokumen/DATA-YANG-PERLU-DIISI.md` bagian "Area member".
- Domain area member.
- Tempat menyimpan video (asumsi sekarang: YouTube tidak publik).
- File skill motionbareng: bentuk file dan tempat menyimpannya (untuk menu Download).
- Judul akhir pelajaran dan nama gaya (sekarang usulan dari PRD).
- Satu kata sandi bersama (sekarang) atau login per pembeli.
