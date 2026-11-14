# Data yang perlu diisi sebelum website di-upload

Saat ini semua bagian di bawah masih berisi **placeholder** (data contoh). Centang kalau sudah diganti.
Semua path di bawah relatif terhadap folder `Company Profile/`.

## Wajib

- [ ] **Link checkout**
  - Di mana: `website/pengaturan.js` → `linkCheckout: ""`
  - Isi dengan: link halaman bayar dari Scalev / Mayar / Lynk.id, dll.
  - Selama kosong, muncul peringatan kuning di layar dan tombol beli hanya menggulir ke bagian harga.

- [ ] **Isi kelas (modul)**
  - Di mana: `website/kelas.html` → section `id="materi"` (cari `GANTI:`)
  - Sekarang: 6 modul contoh (Install Claude Code, Pasang skill motionbareng, Sambungkan ElevenLabs, Video pertama shorts 9:16, Explainer 16:9, Revisi & portofolio)
  - Siapkan: judul tiap modul + 1 kalimat penjelasan. Jumlah video & total durasi kalau ada.

- [x] **Yang didapat pembeli**: sudah disesuaikan (14 Nov 2026): akses semua video, akses selamanya, sekali bayar. Grup komunitas, sesi bikin bareng, dan etalase karya dihapus dari halaman (ditunda, evaluasi setelah 1 bulan pertama).
  - Kalau nanti ada bonus atau komunitas, tambahkan di `website/kelas.html` (kartu harga + section `id="bareng"`) hanya setelah benar-benar ada.

- [ ] **Cara akses setelah bayar**
  - Di mana: `website/kelas.html` → FAQ "Setelah bayar, aksesnya bagaimana?" (cari `GANTI:`)
  - Sekarang: "link akses dikirim ke email"
  - Sesuaikan dengan platform checkout: email, WhatsApp, atau login dashboard.

- [ ] **Skill motionbareng**
  - Di mana: `website/kelas.html` → materi modul 2 dan FAQ "Apa itu skill motionbareng?" (cari `GANTI:`)
  - Pastikan nama skill dan penjelasannya sesuai skill yang benar-benar kamu bagikan di kelas.

- [x] **Tiga pilar "Kenapa bareng"**: sudah diganti ke Dipandu dari nol, Praktik langsung di layar, Akses selamanya (tidak lagi menjanjikan komunitas).

## Formulir pembayaran di Scalev

- [ ] Halaman **HTML Checkout Page** di Scalev dibuat dan di-publish (langkah lengkap: `dokumen/PASANG-DI-SCALEV.md`)
- [ ] **`alamatWebsite`** di `pengaturan.js` diisi alamat Vercel
- [ ] **`alamatHalamanJualan`** di `pengaturan.js` diisi alamat halaman Scalev
- [ ] `hargaPromo` di `pengaturan.js` sama dengan harga produk di Scalev
- [ ] Uji pesan & bayar dari halaman Scalev berhasil

## Halaman link bio (`index.html`)

- [ ] **Link masuk kelas** (untuk yang sudah beli) → `pengaturan.js` → `linkMasukKelas: ""`
  - Selama kosong, tautan "Sudah beli? Masuk kelas" disembunyikan.
- [ ] **Link tips gratis** → `pengaturan.js` → `linkTipsGratis: ""` (kosong = memakai link Instagram)
- [ ] **Poin di kartu "Kelas unggulan"** → `index.html`, daftar `dapat-ringkas` (cari `GANTI:`). Samakan dengan poin di kartu harga `kelas.html`.
- [ ] Tautan "Tanya dulu" memakai WhatsApp. Kalau WhatsApp kosong, tautannya ke Instagram.

## Kontak & media sosial

- [ ] **WhatsApp** → `pengaturan.js` → `whatsapp: ""` (format `62812...`, tanpa + atau spasi)
- [ ] **Email** → `pengaturan.js` → `email: ""`
- [ ] **Instagram / TikTok / YouTube** → `pengaturan.js`
  - Sekarang terisi `@motionbareng` tapi **belum dicek** apakah akunnya milikmu. Kosongkan (`""`) kalau belum ada, ikonnya otomatis hilang.

## Contoh karya

- [ ] Ganti 7 karya contoh di `pengaturan.js` → `karya: [...]`
  - Per karya: `judul`, `jenis` ("explainer" / "shorts"), `oleh`, `durasi`, `link` video, `gambar` thumbnail (taruh di folder `website/aset/gambar/karya/`)
  - Ubah `contoh: true` jadi `false` kalau sudah karya asli (label "CONTOH" hilang).

## Logo alat (opsional)

- [x] **Logo Claude**: sudah dipasang (`website/aset/gambar/logo/claude.svg`).
- [ ] **Logo ElevenLabs** (opsional)
  - Sekarang: penanda "ElevenLabs" memakai ikon netral.
  - Kalau mau logo resmi: taruh filenya di `website/aset/gambar/logo/`, lalu isi `logoAlat.elevenlabs` di `website/pengaturan.js`.

## Perlu dicek ulang

- [ ] **FAQ "Apa saja yang perlu disiapkan?"**: pastikan paket langganan Claude yang kamu sarankan memang sudah termasuk Claude Code, dan ElevenLabs masih punya paket gratis.
- [ ] **Garansi / refund**: belum ada di FAQ. Tambahkan kalau ada kebijakannya, jangan dijanjikan kalau tidak ada.
- [ ] **Harga**: `pengaturan.js` → `hargaNormal: 249000`, `hargaPromo: 149000`. Pastikan sama dengan harga di halaman checkout.
- [ ] **Testimoni**: sengaja belum ada. Tambahkan hanya dari murid sungguhan.
