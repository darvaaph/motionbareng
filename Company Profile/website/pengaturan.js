/* ============================================================
   PENGATURAN WEBSITE motionbareng
   Cukup ubah isi file ini. Simpan, lalu muat ulang halaman.
   Teks yang ada tanda kutip "..." boleh diganti, tanda kutipnya jangan dihapus.
   ============================================================ */
window.PENGATURAN = {

  /* 1. LINK CHECKOUT (cadangan)
     Dipakai kalau halaman jualan dibuka di LUAR Scalev (misalnya di Vercel):
     tombol "Beli" membuka link ini. Kalau halaman jualan dipasang di Scalev
     (HTML Checkout Page), formulir di halaman yang dipakai, bukan link ini. */
  linkCheckout: "https://motion-bareng.myscalev.com/p/kelas-motionbareng",

  /* ALAMAT (isi setelah website online)
     alamatWebsite       : alamat website di Vercel, tanpa garis miring di akhir.
                           Contoh: "https://motionbareng.vercel.app"
                           Dipakai halaman versi Scalev untuk tautan balik ke halaman bio
                           dan untuk memuat gambar karya dari folder aset/.
     alamatHalamanJualan : alamat halaman jualan yang dipasang di Scalev.
                           Contoh: "https://motion-bareng.myscalev.com/kelas"
                           Kalau diisi, semua tautan "Lihat kelasnya" di halaman bio
                           mengarah ke sana. Kosong = pakai kelas.html di Vercel. */
  alamatWebsite: "",
  alamatHalamanJualan: "",

  /* LINK HALAMAN BIO (index.html). Kosong = tautannya otomatis disembunyikan.
     linkMasukKelas : alamat area member / login kelas untuk yang sudah beli
     linkTipsGratis : konten tips gratis. Kosong = memakai link Instagram di bawah. */
  linkMasukKelas: "",
  linkTipsGratis: "",

  /* LOGO ALAT
     Logo yang muncul di penanda "Claude Code" dan "ElevenLabs".
     File logo disimpan di folder aset/gambar/logo/. Kosong "" = memakai ikon netral.
     Logo Claude sudah dipasang (dari file pilihan Darva). ElevenLabs masih ikon netral. */
  logoAlat: { claude: "aset/gambar/logo/claude.svg", elevenlabs: "" },

  /* 2. HARGA (angka saja, tanpa titik) */
  hargaNormal: 249000,
  hargaPromo: 149000,
  labelPromo: "Harga promo perdana",

  /* 3. KONTAK & MEDIA SOSIAL (kosongkan "" kalau belum ada, ikonnya otomatis disembunyikan)
     WhatsApp: pakai format 62..., tanpa +, spasi, atau tanda hubung. */
  whatsapp: "",
  email: "",
  instagram: "https://instagram.com/motionbareng",
  tiktok: "https://tiktok.com/@motionbareng",
  youtube: "https://youtube.com/@motionbareng",

  /* 4. CONTOH KARYA
     jenis  : "explainer" (16:9) atau "shorts" (9:16)
     link   : link video (YouTube / TikTok / Instagram). Kosong = tidak bisa diklik.
     gambar : link atau nama file thumbnail, misalnya "gambar/karya-1.jpg". Kosong = pakai animasi contoh.
     warna  : "teal", "terakota", "kuning", atau "malam" (hanya dipakai kalau gambar kosong)
     contoh : true = muncul label "CONTOH". Ubah jadi false kalau sudah karya asli. */
  karya: [
    { judul: "Kenapa langit berwarna biru?", jenis: "explainer", oleh: "Data contoh", durasi: "1:12", link: "", gambar: "", warna: "teal",     contoh: true },
    { judul: "Cara kerja QRIS dalam 60 detik", jenis: "explainer", oleh: "Data contoh", durasi: "0:58", link: "", gambar: "", warna: "terakota", contoh: true },
    { judul: "Sejarah singkat kopi Nusantara", jenis: "explainer", oleh: "Data contoh", durasi: "1:40", link: "", gambar: "", warna: "malam",    contoh: true },
    { judul: "3 tips hemat listrik", jenis: "shorts", oleh: "Data contoh", durasi: "0:32", link: "", gambar: "", warna: "kuning",   contoh: true },
    { judul: "Promo warung kopi", jenis: "shorts", oleh: "Data contoh", durasi: "0:20", link: "", gambar: "", warna: "terakota", contoh: true },
    { judul: "Fakta unik kucing", jenis: "shorts", oleh: "Data contoh", durasi: "0:28", link: "", gambar: "", warna: "teal",     contoh: true },
    { judul: "Belajar pecahan itu gampang", jenis: "shorts", oleh: "Data contoh", durasi: "0:45", link: "", gambar: "", warna: "malam",    contoh: true }
  ]
};
