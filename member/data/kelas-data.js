/* =====================================================================
   ISI KELAS motionbareng (area member)
   SEMUA konten area member ada di file ini. Mengubah isi = mengedit file ini saja.
   Cara mengisi lengkap: dokumen/PANDUAN-AREA-MEMBER.md

   Aturan singkat:
   - Teks di dalam tanda kutip "..." boleh diganti. Tanda kutip dan koma jangan dihapus.
   - Tulisan di antara `tanda petik miring` tampil sebagai kode (untuk perintah/prompt).
   - id pelajaran harus unik dan JANGAN diubah setelah kelas dijual,
     karena progres belajar pembeli disimpan berdasarkan id ini.

   PELAJARAN
     id          : "nomorModul-nomorPelajaran", misalnya "1-2". Muncul di alamat: #/kelas/1-2
     judul       : judul pelajaran
     menit       : perkiraan durasi video (angka). GANTI: sesuaikan setelah video jadi.
     youtubeId   : ID video YouTube (bagian setelah watch?v=). Kosong "" = kartu "Segera hadir".
                   Contoh: link https://www.youtube.com/watch?v=AbC123xYz → youtubeId: "AbC123xYz"
     ringkas     : 1-2 kalimat isi pelajaran
     langkah     : daftar ceklis yang dikerjakan pembeli
     segeraHadir : true = diberi label "Segera hadir" di daftar kelas. Ubah jadi false kalau videonya sudah tayang.

   GANTI: judul dan urutan pelajaran di bawah masih USULAN (PRD bagian 9). Darva yang menetapkan versi akhirnya.
   ===================================================================== */
window.KELAS_DATA = {

  /* ---------------- KURIKULUM ---------------- */
  modul: [
    {
      id: "0", judul: "Mulai di sini",
      ringkas: "Kenalan dulu, lihat hasil akhirnya, lalu cara menonton kelas ini.",
      pelajaran: [
        { id: "0-1", judul: "Selamat datang di motionbareng", menit: 2, youtubeId: "", segeraHadir: true,
          ringkas: "Sambutan, contoh video yang nanti kamu bikin sendiri, dan cara menonton kelas ini supaya tidak bingung.",
          langkah: [
            "Tonton video ini sampai habis",
            "Lihat contoh hasil akhir yang akan kamu bikin",
            "Tonton pelajaran berurutan dari atas ke bawah. Tiap pelajaran memakai hasil pelajaran sebelumnya",
            "Tekan \"Tandai selesai\" tiap kali satu pelajaran beres, supaya progresmu tercatat"
          ] }
      ]
    },
    {
      id: "1", judul: "Siapkan alat",
      ringkas: "Akun, Claude Code, dan folder kerja pertamamu.",
      pelajaran: [
        { id: "1-1", judul: "Akun Claude dan langganan", menit: 3, youtubeId: "", segeraHadir: true,
          ringkas: "Bikin akun Claude dan pilih paket yang bisa memakai Claude Code.",
          langkah: [
            "Buka claude.ai lalu buat akun",
            "Cek di halaman harga resmi, paket mana yang sudah termasuk Claude Code",
            "Aktifkan langganan dan pastikan kamu bisa masuk"
          ] },
        { id: "1-2", judul: "Install Claude Code", menit: 3, youtubeId: "", segeraHadir: true,
          ringkas: "Pasang Claude Code di laptopmu, Windows atau Mac.",
          langkah: [
            "Buka terminal (Windows: PowerShell, Mac: Terminal)",
            "Jalankan perintah instalasi dari dokumentasi resmi Claude Code",
            "Ketik `claude` lalu masuk dengan akunmu",
            "Kalau muncul error, catat pesannya lalu cek modul 8"
          ] },
        { id: "1-3", judul: "Folder proyek dan chat pertama", menit: 2, youtubeId: "", segeraHadir: true,
          ringkas: "Buat folder khusus video, buka Claude Code di sana, lalu kirim pesan pertamamu.",
          langkah: [
            "Buat folder baru, misalnya `video-pertama`",
            "Buka folder itu di terminal",
            "Jalankan `claude` di dalam folder",
            "Kirim pesan pertama: minta Claude Code menjelaskan isi folder"
          ] }
      ]
    },
    {
      id: "2", judul: "Pasang skill dan suara",
      ringkas: "Pasang skill motionbareng dan sambungkan ElevenLabs untuk suara.",
      pelajaran: [
        { id: "2-1", judul: "Pasang skill motionbareng", menit: 3, youtubeId: "", segeraHadir: true,
          ringkas: "Skill ini berisi cara kerja motionbareng, supaya Claude Code tahu cara menyusun video.",
          langkah: [
            "Unduh file skill di menu Download",
            "Pasang skill sesuai langkah di video",
            "Cek skill sudah terbaca oleh Claude Code"
          ] },
        { id: "2-2", judul: "Sambungkan ElevenLabs", menit: 3, youtubeId: "", segeraHadir: true,
          ringkas: "Bikin akun ElevenLabs dan sambungkan supaya videomu bisa bersuara.",
          langkah: [
            "Buat akun ElevenLabs",
            "Buat API key di pengaturan akun ElevenLabs",
            "Simpan API key sesuai langkah di video. Jangan bagikan ke siapa pun"
          ] },
        { id: "2-3", judul: "Tes semuanya jalan", menit: 2, youtubeId: "", segeraHadir: true,
          ringkas: "Bikin video tes beberapa detik untuk memastikan animasi dan suara sudah jalan.",
          langkah: [
            "Minta Claude Code bikin video tes yang singkat",
            "Putar hasilnya dan dengarkan suaranya",
            "Kalau ada yang gagal, ulangi pelajaran sebelumnya atau cek modul 8"
          ] }
      ]
    },
    {
      id: "3", judul: "Video pertamamu",
      ringkas: "Dari ide sampai file MP4 yang siap diunggah.",
      pelajaran: [
        { id: "3-1", judul: "Ide dan naskah", menit: 3, youtubeId: "", segeraHadir: true,
          ringkas: "Pilih topik kecil dan tulis naskah pendek yang enak didengar.",
          langkah: [
            "Pilih satu topik yang bisa dijelaskan dalam 60 detik",
            "Tulis naskah sekitar 100 sampai 150 kata",
            "Baca keras-keras, lalu potong kalimat yang terlalu panjang"
          ] },
        { id: "3-2", judul: "Minta Claude Code bikin animasinya", menit: 3, youtubeId: "", segeraHadir: true,
          ringkas: "Tempel naskah, jelaskan gayanya, lalu biarkan Claude Code menyusun adegan.",
          langkah: [
            "Tempel naskah ke Claude Code",
            "Sebutkan ukuran video (16:9 atau 9:16) dan gaya yang kamu mau",
            "Lihat hasil pertama, lalu minta perubahan kecil satu per satu"
          ] },
        { id: "3-3", judul: "Tambah suara dan subtitle", menit: 3, youtubeId: "", segeraHadir: true,
          ringkas: "Isi suara dengan ElevenLabs dan pasang subtitle yang muncul per kata.",
          langkah: [
            "Pilih suara yang cocok dengan topik",
            "Minta Claude Code menyamakan animasi dengan suara",
            "Cek subtitle tidak tertutup elemen lain"
          ] },
        { id: "3-4", judul: "Render MP4 dan unggah", menit: 2, youtubeId: "", segeraHadir: true,
          ringkas: "Jadikan file MP4, cek sekali lagi, lalu unggah.",
          langkah: [
            "Render video jadi MP4",
            "Tonton sampai habis di HP",
            "Unggah ke platform pilihanmu"
          ] }
      ]
    },
    {
      id: "4", judul: "Dasar gerak",
      ringkas: "Istilah gerak dasar, supaya permintaanmu ke Claude Code lebih tepat.",
      pelajaran: [
        { id: "4-1", judul: "Keyframe", menit: 2, youtubeId: "", segeraHadir: true,
          ringkas: "Titik awal dan akhir sebuah gerakan. Dasar dari semua animasi.",
          langkah: ["Tonton contohnya", "Coba ubah posisi awal dan akhir satu elemen di videomu", "Baca kartu Keyframe di Kamus Gerak"] },
        { id: "4-2", judul: "Easing dan overshoot", menit: 2, youtubeId: "", segeraHadir: true,
          ringkas: "Supaya gerakan terasa hidup: pelan di awal, pelan di akhir, kadang sedikit kebablasan.",
          langkah: ["Tonton contohnya", "Minta Claude Code memakai easing di satu gerakan", "Bandingkan sebelum dan sesudah"] },
        { id: "4-3", judul: "Stagger", menit: 2, youtubeId: "", segeraHadir: true,
          ringkas: "Elemen muncul bergantian, tidak serentak, supaya mata penonton ikut berurutan.",
          langkah: ["Tonton contohnya", "Minta Claude Code memunculkan beberapa elemen bergantian", "Atur jeda sampai terasa pas"] },
        { id: "4-4", judul: "Transisi", menit: 2, youtubeId: "", segeraHadir: true,
          ringkas: "Cara pindah adegan: cut, fade, wipe, dan zoom.",
          langkah: ["Tonton contohnya", "Pilih satu transisi untuk videomu", "Pakai transisi yang sama supaya konsisten"] },
        { id: "4-5", judul: "Safe area", menit: 2, youtubeId: "", segeraHadir: true,
          ringkas: "Batas aman supaya teks tidak terpotong atau tertutup tombol aplikasi.",
          langkah: ["Tonton contohnya", "Cek posisi teks di video 9:16", "Geser teks yang terlalu dekat ke pinggir"] }
      ]
    },
    {
      id: "5", judul: "Jenis-jenis video",
      ringkas: "Pola adegan untuk bentuk video yang paling sering dibutuhkan.",
      pelajaran: [
        { id: "5-1", judul: "Explainer", menit: 3, youtubeId: "", segeraHadir: true,
          ringkas: "Video penjelasan: satu topik, dijelaskan runut dengan gambar yang bergerak.",
          langkah: ["Lihat struktur adegannya di menu Jenis Video", "Bikin satu explainer pendek", "Simpan prompt yang berhasil"] },
        { id: "5-2", judul: "Promo dan iklan", menit: 3, youtubeId: "", segeraHadir: true,
          ringkas: "Video singkat untuk menawarkan produk atau jasa.",
          langkah: ["Lihat struktur adegannya di menu Jenis Video", "Bikin satu promo 15 sampai 30 detik", "Simpan prompt yang berhasil"] },
        { id: "5-3", judul: "Intro dan bumper", menit: 2, youtubeId: "", segeraHadir: true,
          ringkas: "Pembuka dan penutup singkat yang jadi ciri khas videomu.",
          langkah: ["Lihat struktur adegannya di menu Jenis Video", "Bikin satu intro beberapa detik", "Simpan prompt yang berhasil"] },
        { id: "5-4", judul: "Logo reveal", menit: 2, youtubeId: "", segeraHadir: true,
          ringkas: "Logo muncul dengan gerakan yang rapi.",
          langkah: ["Siapkan file logo", "Bikin satu logo reveal", "Simpan prompt yang berhasil"] },
        { id: "5-5", judul: "Lower third", menit: 2, youtubeId: "", segeraHadir: true,
          ringkas: "Label nama atau keterangan di bagian bawah layar.",
          langkah: ["Lihat struktur adegannya di menu Jenis Video", "Bikin satu lower third", "Simpan prompt yang berhasil"] }
      ]
    },
    {
      id: "6", judul: "Gaya visual",
      ringkas: "Bikin videomu punya tampilan yang konsisten. Gaya lain ada di Rak Gaya.",
      pelajaran: [
        { id: "6-1", judul: "Cara menyusun gaya sendiri", menit: 3, youtubeId: "", segeraHadir: true,
          ringkas: "Tentukan warna, huruf, dan cara bergerak, lalu jadikan satu prompt gaya.",
          langkah: ["Pilih 3 sampai 4 warna", "Pilih jenis huruf", "Tulis prompt gaya dan simpan untuk dipakai lagi"] },
        { id: "6-2", judul: "Satu gaya dari awal sampai jadi", menit: 3, youtubeId: "", segeraHadir: true,
          ringkas: "Contoh lengkap satu gaya, dari prompt pertama sampai video jadi.",
          langkah: ["Ikuti contohnya", "Ganti topiknya dengan topikmu sendiri", "Bandingkan hasilnya dengan kartu di Rak Gaya"] }
      ]
    },
    {
      id: "7", judul: "Studi kasus",
      ringkas: "Proses apa adanya dari ide sampai jadi, termasuk salah dan perbaikannya.",
      pelajaran: [
        { id: "7-1", judul: "Studi kasus: dari ide sampai naskah", menit: 3, youtubeId: "", segeraHadir: true,
          ringkas: "Melihat cara memilih topik dan menulis naskah untuk video sungguhan.",
          langkah: ["Tonton prosesnya", "Catat bagian yang bisa kamu tiru", "Coba dengan topikmu sendiri"] },
        { id: "7-2", judul: "Studi kasus: animasi, salah, lalu diperbaiki", menit: 3, youtubeId: "", segeraHadir: true,
          ringkas: "Bagian yang jarang ditunjukkan: hasil yang belum pas dan cara memperbaikinya.",
          langkah: ["Tonton prosesnya", "Perhatikan cara meminta perbaikan", "Pakai cara yang sama di videomu"] }
      ]
    },
    {
      id: "8", judul: "Revisi sampai puas",
      ringkas: "Cara minta revisi, mengatasi error, dan mengumpulkan karya.",
      pelajaran: [
        { id: "8-1", judul: "Cara minta revisi", menit: 2, youtubeId: "", segeraHadir: true,
          ringkas: "Minta perubahan yang jelas dan satu per satu, supaya hasilnya tidak berantakan.",
          langkah: ["Sebutkan detik atau adegan yang mau diubah", "Minta satu perubahan dalam satu pesan", "Cek hasilnya sebelum minta perubahan berikutnya"] },
        { id: "8-2", judul: "Error yang sering muncul dan solusinya", menit: 3, youtubeId: "", segeraHadir: true,
          ringkas: "Pesan error yang paling sering muncul dan cara mengatasinya.",
          langkah: ["Salin pesan errornya", "Cocokkan dengan daftar di video", "Kalau tetap buntu, hubungi kami lewat menu Bantuan"] },
        { id: "8-3", judul: "Kumpulkan portofolio", menit: 2, youtubeId: "", segeraHadir: true,
          ringkas: "Rapikan video yang sudah jadi supaya mudah ditunjukkan ke orang lain.",
          langkah: ["Pilih 3 video terbaikmu", "Simpan di satu tempat yang mudah dibagikan", "Tulis satu kalimat penjelasan untuk tiap video"] }
      ]
    }
  ],

  /* ---------------- KAMUS GERAK ----------------
     istilah, arti, kapan (kapan dipakai), contohPrompt (boleh kosong "") */
  kamus: [
    { istilah: "Keyframe",
      arti: "Titik penanda keadaan sebuah elemen di waktu tertentu, misalnya posisi, ukuran, atau warna. Animasi terjadi di antara dua keyframe.",
      kapan: "Saat kamu mau mengatur gerakan dengan tepat: mulai dari mana, berhenti di mana, dan berapa lama.",
      contohPrompt: "Buat kotak kuning bergerak dari kiri ke tengah layar. Keyframe awal di detik 0, keyframe akhir di detik 1." },
    { istilah: "Easing (ease in, ease out)",
      arti: "Cara kecepatan gerak berubah. Ease in: mulai pelan lalu cepat. Ease out: mulai cepat lalu melambat. Ease in-out: pelan di awal dan di akhir.",
      kapan: "Hampir selalu. Gerakan dengan kecepatan rata (linear) terasa kaku seperti mesin.",
      contohPrompt: "Pakai ease-out untuk semua elemen yang masuk ke layar, dan ease-in untuk elemen yang keluar." },
    { istilah: "Overshoot",
      arti: "Gerakan sedikit melewati titik akhirnya, lalu kembali. Kesannya memantul dan hidup.",
      kapan: "Untuk elemen yang muncul dengan semangat, misalnya ikon, tombol, atau judul. Jangan dipakai di semua elemen.",
      contohPrompt: "Saat judul muncul, beri sedikit overshoot: membesar sampai 110% lalu kembali ke 100%." },
    { istilah: "Anticipation",
      arti: "Gerakan kecil ke arah berlawanan sebelum gerakan utama, seperti mundur sedikit sebelum melompat.",
      kapan: "Supaya penonton siap melihat gerakan besar. Cocok untuk karakter atau benda yang melompat dan melesat.",
      contohPrompt: "Sebelum bola melesat ke kanan, buat bola mundur sedikit ke kiri selama 0,2 detik." },
    { istilah: "Stagger",
      arti: "Beberapa elemen bergerak bergantian dengan jeda kecil, tidak serentak.",
      kapan: "Daftar poin, ikon yang berjajar, atau teks huruf per huruf. Mata penonton jadi ikut berurutan.",
      contohPrompt: "Munculkan tiga poin daftar satu per satu dengan jeda 0,15 detik." },
    { istilah: "Transisi (cut, fade, wipe, zoom)",
      arti: "Cara pindah dari satu adegan ke adegan berikutnya. Cut: langsung ganti. Fade: memudar. Wipe: disapu dari satu sisi. Zoom: membesar atau mengecil masuk ke adegan baru.",
      kapan: "Setiap ganti adegan. Pilih satu atau dua jenis saja supaya videonya konsisten.",
      contohPrompt: "Pakai transisi wipe dari kiri ke kanan setiap ganti adegan, durasinya 0,4 detik." },
    { istilah: "Loop",
      arti: "Animasi yang berulang terus tanpa terlihat sambungannya.",
      kapan: "Latar yang bergerak, ikon yang berdenyut, atau animasi saat menunggu.",
      contohPrompt: "Buat awan di latar bergerak pelan ke kanan dan berulang tanpa putus." },
    { istilah: "Safe area",
      arti: "Batas aman di dalam tepi layar. Teks penting di luar batas ini bisa terpotong atau tertutup tombol aplikasi.",
      kapan: "Selalu, terutama di video 9:16 untuk Reels, TikTok, dan Shorts yang punya tombol di sisi kanan dan bawah.",
      contohPrompt: "Pastikan semua teks ada di dalam safe area. Jauhkan dari tepi atas, bawah, dan kanan layar." }
  ],

  /* ---------------- JENIS VIDEO ----------------
     id        : huruf kecil tanpa spasi, muncul di alamat: #/jenis-video/explainer
     struktur  : urutan adegan
     contoh    : contoh prompt (bagian [dalam kurung siku] diganti pembeli)
     pelajaran : id pelajaran terkait di kurikulum (boleh kosong "") */
  jenisVideo: [
    { id: "explainer", nama: "Explainer 16:9", rasio: "16:9", durasi: "1 sampai 3 menit", pelajaran: "5-1",
      kapan: "Menjelaskan satu topik secara runut, untuk YouTube, presentasi, atau materi belajar.",
      struktur: ["Pembuka: pertanyaan atau masalah (5 sampai 10 detik)", "Konteks singkat: kenapa topik ini penting", "Isi: 2 sampai 4 poin, satu adegan untuk tiap poin", "Rangkuman dalam satu kalimat", "Penutup: ajakan atau pertanyaan untuk penonton"],
      contoh: "Buat video explainer 16:9 sekitar 60 detik tentang [topik]. Pakai naskah di bawah. Satu adegan untuk tiap poin, transisi fade, subtitle per kata.\n\nNaskah:\n[tempel naskah di sini]" },
    { id: "shorts", nama: "Shorts 9:16", rasio: "9:16", durasi: "15 sampai 60 detik", pelajaran: "",
      kapan: "Konten singkat untuk Reels, TikTok, dan YouTube Shorts.",
      struktur: ["Kait di 2 detik pertama: kalimat atau gambar yang bikin orang berhenti menggulir", "Satu ide utama, bukan banyak", "Teks besar di tengah, di dalam safe area", "Penutup cepat: kesimpulan atau ajakan"],
      contoh: "Buat video 9:16 berdurasi 30 detik tentang [topik]. Kalimat pertama harus jadi kait. Teks besar di tengah, subtitle per kata, semua teks di dalam safe area." },
    { id: "promo", nama: "Promo dan iklan", rasio: "9:16 atau 1:1", durasi: "15 sampai 30 detik", pelajaran: "5-2",
      kapan: "Menawarkan produk, jasa, atau diskon.",
      struktur: ["Masalah atau keinginan calon pembeli", "Produk muncul sebagai jawabannya", "2 sampai 3 keunggulan, singkat", "Harga atau penawaran (kalau ada)", "Ajakan: cara membeli atau menghubungi"],
      contoh: "Buat video promo 9:16 berdurasi 20 detik untuk [produk]. Urutannya: masalah, produk, 3 keunggulan, ajakan. Warnanya mengikuti logo [nama usaha]." },
    { id: "intro", nama: "Intro", rasio: "16:9 atau 9:16", durasi: "3 sampai 7 detik", pelajaran: "5-3",
      kapan: "Pembuka tetap di awal setiap video channel-mu.",
      struktur: ["Elemen visual masuk", "Nama channel atau judul seri muncul", "Diam sebentar supaya terbaca", "Keluar atau berganti ke isi video"],
      contoh: "Buat intro 5 detik untuk channel [nama channel]. Elemen masuk dengan stagger, nama channel muncul dengan sedikit overshoot." },
    { id: "bumper", nama: "Bumper", rasio: "16:9 atau 9:16", durasi: "1 sampai 3 detik", pelajaran: "5-3",
      kapan: "Penanda singkat di antara bagian video, atau sebelum dan sesudah iklan.",
      struktur: ["Satu gerakan pendek yang khas", "Logo atau nama muncul sekilas"],
      contoh: "Buat bumper 2 detik: ikon channel berputar sekali lalu berhenti, warna latar [warna]." },
    { id: "logo-reveal", nama: "Logo reveal", rasio: "16:9", durasi: "3 sampai 6 detik", pelajaran: "5-4",
      kapan: "Memunculkan logo dengan rapi, di awal atau di akhir video.",
      struktur: ["Bentuk-bentuk sederhana bergerak masuk", "Bentuk berkumpul jadi logo", "Logo diam sebentar", "Nama atau slogan muncul di bawahnya"],
      contoh: "Buat logo reveal 4 detik dari file logo [nama file]. Potongan logo masuk dari luar layar lalu menyatu. Slogan muncul sesudahnya dengan fade." },
    { id: "lower-third", nama: "Lower third", rasio: "16:9", durasi: "4 sampai 6 detik", pelajaran: "5-5",
      kapan: "Label nama, jabatan, atau keterangan di bagian bawah layar.",
      struktur: ["Bar latar masuk dari samping", "Nama muncul", "Keterangan muncul sedikit sesudahnya", "Semua keluar bersamaan"],
      contoh: "Buat lower third untuk nama [nama] dan jabatan [jabatan]. Bar warna teal masuk dari kiri, teksnya muncul dengan stagger." }
  ],

  /* ---------------- RAK GAYA ----------------
     gambar : nama file di folder aset/gambar/ (misalnya "aset/gambar/gaya-kertas.jpg"). Kosong "" = gambar kucing sementara.
     contoh : true = muncul label CONTOH.
     GANTI: nama gaya boleh diganti. Prompt di bawah masih draf, uji dulu di Claude Code lalu ganti contoh jadi false. */
  gaya: [
    { id: "kertas-sobek", nama: "Kertas Sobek", gambar: "", contoh: true,
      deskripsi: "Lembaran kertas bertekstur dengan tepi sobek dan warna hangat. Elemen bergerak seperti potongan kertas yang ditempel.",
      prompt: "Gaya visual: potongan kertas bertekstur dengan tepi sobek, bayangan tipis di bawah tiap lembar.\nWarna: krem, terakota, kuning, hijau tua.\nHuruf: tebal dan membulat untuk judul.\nGerakan: elemen masuk seperti ditempel, sedikit miring lalu lurus, dengan overshoot kecil." },
    { id: "sketsa-tinta", nama: "Sketsa Tinta", gambar: "", contoh: true,
      deskripsi: "Garis tinta tebal yang sedikit bergoyang dan warna datar, kesannya digambar tangan.",
      prompt: "Gaya visual: gambar garis tinta tebal yang sedikit bergoyang, isi warna datar tanpa gradasi.\nWarna: latar krem, garis hitam arang, aksen kuning dan merah muda.\nHuruf: tulisan tangan untuk keterangan kecil.\nGerakan: garis tergambar pelan dari awal sampai akhir, lalu warna mengisi." },
    { id: "peta-jalur", nama: "Peta dan Jalur", gambar: "", contoh: true,
      deskripsi: "Peta sederhana dengan garis jalur yang tergambar pelan. Cocok untuk perjalanan, sejarah, dan pengiriman barang.",
      prompt: "Gaya visual: peta datar sederhana dengan daratan berwarna lembut dan garis jalur putus-putus.\nWarna: biru laut pucat, hijau daratan, jalur merah.\nGerakan: kamera bergeser pelan mengikuti jalur yang tergambar, penanda lokasi muncul dengan pantulan kecil." },
    { id: "neon-malam", nama: "Neon Malam", gambar: "", contoh: true,
      deskripsi: "Latar gelap dengan garis yang bercahaya. Cocok untuk topik teknologi dan suasana malam.",
      prompt: "Gaya visual: latar hampir hitam, garis tipis yang bercahaya seperti lampu neon.\nWarna: biru kehijauan, merah muda, kuning.\nGerakan: garis menyala dari ujung ke ujung, sedikit berkedip saat muncul, transisi fade ke gelap." },
    { id: "isometrik", nama: "Isometrik", gambar: "", contoh: true,
      deskripsi: "Bangunan dan benda dilihat dari sudut miring tiga dimensi yang sederhana. Cocok untuk menjelaskan cara kerja sesuatu.",
      prompt: "Gaya visual: ilustrasi isometrik sederhana, sudut pandang miring dari atas, sisi benda diberi tiga tingkat terang.\nWarna: pastel dengan satu warna aksen.\nGerakan: bagian-bagian benda naik dari bawah satu per satu dengan stagger, lalu kamera berputar pelan." }
  ],

  /* ---------------- GUDANG PROMPT ----------------
     kelompok : nama kelompok (dipakai untuk tombol saring)
     GANTI: prompt di bawah masih draf. Uji di Claude Code dulu, lalu ganti contoh jadi false. */
  prompt: [
    { id: "kenalan-folder", kelompok: "Mulai proyek", judul: "Kenalan dengan folder proyek", contoh: true,
      isi: "Jelaskan isi folder ini dengan bahasa sederhana. Lalu buat folder `video` untuk menyimpan semua hasil video." },
    { id: "video-dari-naskah", kelompok: "Mulai proyek", judul: "Video pertama dari naskah", contoh: true,
      isi: "Buat video explainer 16:9 sekitar 60 detik dari naskah di bawah ini. Pakai skill motionbareng. Sebelum mulai, tunjukkan dulu rencana adegannya dan tunggu persetujuanku.\n\nNaskah:\n[tempel naskah di sini]" },
    { id: "rapikan-naskah", kelompok: "Naskah", judul: "Rapikan naskah", contoh: true,
      isi: "Rapikan naskah di bawah supaya enak dibacakan: kalimat pendek, bahasa sehari-hari, paling banyak 150 kata. Jangan ubah faktanya.\n\n[tempel naskah di sini]" },
    { id: "kait-pembuka", kelompok: "Naskah", judul: "Cari kalimat pembuka", contoh: true,
      isi: "Beri 5 pilihan kalimat pembuka untuk video tentang [topik]. Tiap kalimat paling banyak 12 kata dan bikin penasaran." },
    { id: "ubah-adegan", kelompok: "Revisi", judul: "Ubah satu adegan saja", contoh: true,
      isi: "Di adegan [nomor] (detik [awal] sampai [akhir]), ubah [apa yang mau diubah]. Jangan ubah adegan lain." },
    { id: "perlambat", kelompok: "Revisi", judul: "Perlambat gerakan", contoh: true,
      isi: "Gerakan di video ini terlalu cepat. Perlambat semua animasi masuk sekitar 30% dan pakai ease-out." },
    { id: "tambah-suara", kelompok: "Suara dan subtitle", judul: "Tambah suara", contoh: true,
      isi: "Buat suara untuk naskah ini dengan ElevenLabs. Suara [pria/wanita], nada santai, kecepatan sedang. Lalu samakan waktu animasi dengan suaranya." },
    { id: "subtitle-per-kata", kelompok: "Suara dan subtitle", judul: "Subtitle per kata", contoh: true,
      isi: "Tambahkan subtitle yang muncul per kata, di bawah tengah dan di dalam safe area. Kata yang sedang dibacakan diberi sorotan kuning." },
    { id: "render-mp4", kelompok: "Render", judul: "Render jadi MP4", contoh: true,
      isi: "Render video ini jadi MP4 1080p. Simpan di folder `video` dengan nama [nama-file].mp4." }
  ],

  /* ---------------- DOWNLOAD ----------------
     url : link file (Google Drive, dll.) atau nama file di folder aset/. Kosong "" = tampil "Segera hadir".
     GANTI: link file skill motionbareng belum ada. */
  unduhan: [
    { nama: "Skill motionbareng", ukuran: "", url: "",
      deskripsi: "File skill yang dipasang ke Claude Code di pelajaran 2-1. Simpan di laptop yang kamu pakai untuk bikin video." }
  ],

  /* ---------------- BANTUAN: PERTANYAAN UMUM ----------------
     Samakan dengan FAQ di halaman jualan (website/kelas.html) kalau ada yang berubah. */
  faq: [
    { tanya: "Berapa lama aksesnya?",
      jawab: "Selamanya. Sekali bayar, kamu bisa kembali kapan saja. Simpan alamat halaman ini dan email dari Scalev supaya gampang dicari lagi." },
    { tanya: "Harus menonton berurutan?",
      jawab: "Sebaiknya iya. Tiap pelajaran memakai hasil pelajaran sebelumnya, jadi mulai dari modul 0 lalu lanjut satu per satu." },
    { tanya: "Kenapa progres belajarku hilang?",
      jawab: "Progres disimpan di browser yang kamu pakai, bukan di server. Kalau ganti HP atau laptop, pakai browser lain, atau menghapus data browser, progres mulai dari awal. Pakai fitur \"Pindahkan progres\" di halaman ini supaya progresmu ikut pindah." },
    { tanya: "Aku lupa kata sandinya.",
      jawab: "Kata sandi ada di email dari Scalev yang kamu terima setelah membayar. Cari dengan kata \"motionbareng\" atau \"Scalev\", termasuk di folder Spam dan Promosi." },
    { tanya: "Biaya Claude dan ElevenLabs sudah termasuk?",
      jawab: "Belum. Langganan Claude dan ElevenLabs terpisah, dibayar langsung ke masing-masing layanan. ElevenLabs punya paket gratis dengan batas pemakaian." },
    { tanya: "Videonya tidak bisa diputar.",
      jawab: "Pelajaran berlabel \"Segera hadir\" memang belum ada videonya. Kalau labelnya tidak ada tapi video tetap tidak jalan, cek koneksi internet lalu coba browser lain. Kalau masih gagal, hubungi kami." }
  ],

  /* ---------------- KABAR BARU ----------------
     tanggal : format "TAHUN-BULAN-TANGGAL", misalnya "2026-11-20"
     contoh  : true = muncul label CONTOH. Hapus entri contoh begitu ada kabar sungguhan.
     Kabar terbaru boleh ditulis di mana saja, urutannya diatur otomatis (terbaru di atas). */
  kabar: [
    { tanggal: "2026-11-14", judul: "Area kelas dibuka", contoh: true,
      isi: "Ini contoh catatan kabar, bukan pengumuman sungguhan. Ganti atau hapus sebelum area kelas dibagikan." }
  ]
};
