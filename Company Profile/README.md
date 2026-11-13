# Company Profile motionbareng

Peta folder supaya gampang dicari dan diubah.

```
Company Profile/
├── README.md                 ← file ini
├── website/                  ← YANG DI-UPLOAD (isi folder ini saja)
│   ├── index.html            ← halaman link bio (taruh di bio Instagram/TikTok)
│   ├── kelas.html            ← halaman jualan lengkap
│   ├── pengaturan.js         ← ★ yang paling sering diubah: link checkout, harga, kontak, karya, logo
│   ├── favicon.svg           ← ikon tab browser
│   └── aset/
│       ├── css/gaya.css      ← warna, font, tata letak (dipakai kedua halaman)
│       ├── js/umum.js        ← maskot kucing, animasi, harga, karya (dipakai kedua halaman)
│       └── gambar/
│           ├── karya/        ← thumbnail contoh karya (karya-1.jpg, dst.)
│           └── logo/         ← logo resmi alat (Claude, ElevenLabs), opsional
├── dokumen/                  ← catatan kerja, TIDAK di-upload
│   ├── LANGKAH-PUBLISH.md         ← ★ urutan publish: Vercel, pembayaran, isi konten
│   ├── DATA-YANG-PERLU-DIISI.md   ← daftar centang data yang masih placeholder
│   ├── PANDUAN-WEBSITE.md         ← cara mengisi, mengubah, dan upload
│   └── REFERENSI-MOTIONFORMAT.md  ← catatan teknik dari pesaing (bukan untuk ditiru mentah)
└── arsip/
    └── maskot-kertas/        ← konsep maskot lembar kertas lama (tidak dipakai lagi)
```

## Mau mengubah apa? Buka file ini

| Mau mengubah… | Buka |
|---|---|
| Link checkout, harga, WhatsApp, media sosial | `website/pengaturan.js` |
| Contoh karya (judul, link, thumbnail) | `website/pengaturan.js` + taruh gambar di `website/aset/gambar/karya/` |
| Logo Claude / ElevenLabs | taruh file di `website/aset/gambar/logo/`, lalu isi `logoAlat` di `pengaturan.js` |
| Teks halaman link bio | `website/index.html` |
| Teks halaman jualan (materi, FAQ, yang didapat) | `website/kelas.html` (cari `GANTI:`) |
| Warna & font | `website/aset/css/gaya.css` (bagian `:root` paling atas) |
| Bentuk maskot kucing, animasi | `website/aset/js/umum.js` |

## Melihat website di laptop sendiri

```bash
python -m http.server 8765 --directory "F:/Motion Bareng/Company Profile/website"
```

Lalu buka http://localhost:8765 (link bio) atau http://localhost:8765/kelas.html (halaman jualan).
