/* ============================================================
   PENGATURAN AREA MEMBER motionbareng
   Cukup ubah isi file ini. Simpan, lalu muat ulang halaman.
   Teks di dalam tanda kutip "..." boleh diganti, tanda kutipnya jangan dihapus.
   Isi konten kelas (pelajaran, kamus, prompt, dll.) ada di data/kelas-data.js.
   ============================================================ */
window.PENGATURAN = {

  /* 1. KATA SANDI BERSAMA (yang dikirim lewat email produk Scalev)
     Yang disimpan di sini HASH-nya (SHA-256), bukan kata sandinya.
     Cara membuat hash baru: lihat dokumen/PANDUAN-AREA-MEMBER.md bagian "Ganti kata sandi".
     Mengganti hash = semua pembeli yang sudah masuk otomatis diminta masuk lagi.
     GANTI: hash di bawah ini masih kata sandi UJI. Ganti sebelum area member dibagikan. */
  hashKataSandi: "b622b29c53e5f43f3d81e635c16fa86ca8ff7b07bdb68fa6cc03922a00b9e698",

  /* 2. ALAMAT
     alamatMember : alamat area member ini setelah online, tanpa garis miring di akhir.
                    GANTI: domain area member belum diputuskan.
     alamatJualan : halaman jualan, untuk tautan "Belum punya akses?". */
  alamatMember: "",
  alamatJualan: "https://motion-bareng.myscalev.com/kelas",

  /* 3. KONTAK BANTUAN (kosong "" = tidak ditampilkan)
     WhatsApp: format 62..., tanpa +, spasi, atau tanda hubung.
     GANTI: isi nomor WhatsApp dan email bantuan. */
  whatsapp: "",
  email: "",

  /* 4. LOGO ALAT (sama dengan website). Kosong "" = ikon netral. */
  logoAlat: { claude: "aset/gambar/logo/claude.svg", elevenlabs: "" },

  /* versi tampilan: naikkan kalau file gaya/kode diubah supaya browser memuat yang baru */
  versi: "1"
};
