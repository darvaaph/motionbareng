# Referensi tampilan motionformat.com

Dicek 13 November 2026. Catatan ini merangkum **teknik dan struktur**, bukan menyalin teks atau gambar mereka.

## Halaman yang ada

| Halaman | Isi |
|---|---|
| `motionformat.com` | Halaman "link bio": kartu kelas unggulan, daftar tautan, contoh karya (geser), shorts, FAQ, penutup "giliranmu" |
| `motionformat.com/motion-course` | Halaman jualan panjang (±14.000 px), 10 section |
| `kelas.motionformat.com` | Area member (login), tidak dibuka |

## Kenapa tampilan mereka tidak kaku

### 1. Latar berganti gelap ↔ terang
Urutan section di halaman jualan:

| # | Section | Latar |
|---|---|---|
| 1 | Hero | **Gelap** (navy, gradasi radial) |
| 2 | Perkenalan kelas | Krem |
| 3 | Hasil / fitur | **Gelap** |
| 4 | Buat siapa | Krem |
| 5 | Bukti karya | **Gelap** |
| 6 | Cara pakai | Krem |
| 7 | Harga | **Gelap** |
| 8 | Checkout | **Ungu** (warna kejutan, hanya sekali) |
| 9 | FAQ | Krem |
| 10 | Penutup | **Gelap** |

- Antar section disambung **garis gelombang** (SVG di atas dan bawah section gelap), bukan garis lurus.
- Latar gelap tidak polos: ada **gradasi radial** (lebih terang di satu sudut), **bintang berkelip**, **bintang jatuh**, dan **tekstur grain** halus (gambar noise, opacity ±7%, mode *overlay*) di seluruh layar.

### 2. Setiap section punya "demo hidup", bukan kartu statis
- Hero: tiruan jendela Claude Code yang mengetik sendiri, di sebelah tiruan pemutar video.
- Fitur: tiap kartu fitur punya ilustrasi mini beranimasi (garis waktu durasi, gelombang suara, ponsel, alur Brief → Konsep → Naskah → Suara → MP4).
- Cara pakai: panel demo besar di kiri yang berganti mengikuti langkah 1–6 di kanan.
- Buat siapa: **tab persona** (Pemula / Kreator / Bisnis / Guru) yang mengganti isi.
- Karya: **carousel** dengan tombol filter (Kartun / 2D / 3D) dan thumbnail yang terlihat seperti cuplikan video sungguhan.
- Total ada ±90 animasi CSS berbeda di halaman jualan.

### 3. Maskot hadir terus
Maskot menempel di **tepi kanan layar** (posisi tetap) dan **ekspresinya berubah** sesuai section yang sedang dilihat: kedip, senyum, mata hati. Di halaman jualan, maskot juga muncul di dalam ilustrasi.

### 4. Tipografi yang "ramai tapi rapi"
- Label kecil berhuruf kapital berwarna di atas judul (*kicker*).
- Kata kunci di judul diberi **blok stabilo kuning** (kotak penuh, bukan garis bawah).
- **Coretan tulisan tangan kecil** di sebelah judul section, misalnya "geser →" atau "klik aja".
- Ada emoji atau logo kecil di dalam kalimat (logo Claude Code, ElevenLabs, After Effects).

### 5. Jualan
- **Bar harga menempel di bawah layar** di desktop juga, bukan cuma di HP.
- **Formulir checkout ditanam langsung di halaman** (section ungu): pilih paket, isi data, pilih QRIS atau VA. Pembeli tidak keluar halaman.
- Kotak "Rekap semua yang bakal kamu dapetin" berbentuk grid centang dengan label BARU / BETA.
- Catatan: angka harga mereka **tidak konsisten** di satu halaman (Rp184rb coret Rp299rb di kartu harga, tombol Rp249rb, checkout Rp249.000 coret Rp375.000). Ini bisa jadi celah kepercayaan, jadi **harga kita harus sama di semua tempat**.

## Apa yang kita ambil (tekniknya), dengan versi motionbareng

| Teknik mereka | Versi motionbareng (beda wujud) |
|---|---|
| Section navy + bintang berkelip | Section **malam teal tua + kunang-kunang** kuning yang melayang pelan (sesuai opsi web "malam kunang-kunang" di CLAUDE.md) |
| Pemisah gelombang | Pemisah **kertas sobek** / garis tinta goyang, sesuai tema buku sketsa |
| Grain noise | **Tekstur kertas** halus di section krem |
| Maskot tetap di tepi kanan, ekspresi berubah | **Kepala kucing ngintip dari tepi bawah kiri**, telinga & ekspresi berubah per section; tapak tetap nongol di pinggir |
| Ungu sekali untuk checkout | **Terakota** sekali untuk section harga |
| Demo Claude Code mengetik | Demo **storyboard**: naskah → frame sketsa → video jadi, digambar gaya sketsa |
| Tab persona | Boleh dipakai (pola umum), isi kita sendiri |
| Carousel karya + filter | Boleh dipakai, thumbnail dibuat lebih mirip cuplikan video |

## Yang JANGAN ditiru
- Frasa: "ngobrol jadi motion", "ngobrol sama AI", "kamu yang cerita", "giliranmu / idemu tinggal diketik".
- Palet navy + ungu + kuning, dan font Fredoka / Nunito / Gochi Hand.
- Maskot berbentuk garis panjang (cacing), bulan berwajah, atau posisi maskot persis di tepi kanan tengah.
- Urutan section yang sama persis. Struktur jualan umum boleh, tapi susunan dan isinya harus versi kita.
