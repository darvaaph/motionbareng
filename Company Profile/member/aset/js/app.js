/* =====================================================================
   AREA MEMBER motionbareng: gerbang masuk, menu, routing, tampilan halaman.
   Konten TIDAK ditulis di sini, tapi di data/kelas-data.js.
   Pengaturan (kata sandi, kontak, alamat) ada di pengaturan.js.
   ===================================================================== */
(() => {
  const P = window.PENGATURAN || {};
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
  const akar = $('#aplikasi');

  /* ---------- penyimpanan: localStorage kalau bisa, kalau tidak cukup di memori ---------- */
  const memori = {};
  const simpan = {
    baca(k) {
      if (k in memori) return memori[k];
      try { const v = localStorage.getItem(k); return v == null ? null : JSON.parse(v); } catch (e) { return null; }
    },
    tulis(k, v) { memori[k] = v; try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } },
    hapus(k) { delete memori[k]; try { localStorage.removeItem(k); } catch (e) { /* tidak apa-apa */ } }
  };

  /* ---------- SHA-256: crypto.subtle kalau ada, kalau tidak (mis. dibuka lewat http di jaringan lokal) pakai cadangan ---------- */
  const sha256Cadangan = teks => {
    const prima = [], K = [], H = [];
    for (let n = 2; prima.length < 64; n++) if (prima.every(q => n % q)) prima.push(n);
    const pecahan = x => (x - Math.floor(x)) * 4294967296 | 0;
    prima.forEach((q, i) => { K[i] = pecahan(Math.cbrt(q)); if (i < 8) H[i] = pecahan(Math.sqrt(q)); });
    const b = [...new TextEncoder().encode(teks)], panjang = b.length * 8;
    b.push(0x80); while (b.length % 64 !== 56) b.push(0);
    for (let i = 7; i >= 0; i--) b.push(i >= 4 ? 0 : (panjang >>> (i * 8)) & 255);
    const putar = (x, n) => (x >>> n) | (x << (32 - n));
    for (let j = 0; j < b.length; j += 64) {
      const w = [];
      for (let i = 0; i < 64; i++) {
        if (i < 16) w[i] = (b[j + i * 4] << 24) | (b[j + i * 4 + 1] << 16) | (b[j + i * 4 + 2] << 8) | b[j + i * 4 + 3];
        else {
          const s0 = putar(w[i - 15], 7) ^ putar(w[i - 15], 18) ^ (w[i - 15] >>> 3);
          const s1 = putar(w[i - 2], 17) ^ putar(w[i - 2], 19) ^ (w[i - 2] >>> 10);
          w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
        }
      }
      let [a, bb, c, d, e, f, g, h] = H;
      for (let i = 0; i < 64; i++) {
        const t1 = (h + (putar(e, 6) ^ putar(e, 11) ^ putar(e, 25)) + ((e & f) ^ (~e & g)) + K[i] + w[i]) | 0;
        const t2 = ((putar(a, 2) ^ putar(a, 13) ^ putar(a, 22)) + ((a & bb) ^ (a & c) ^ (bb & c))) | 0;
        h = g; g = f; f = e; e = (d + t1) | 0; d = c; c = bb; bb = a; a = (t1 + t2) | 0;
      }
      [a, bb, c, d, e, f, g, h].forEach((x, i) => { H[i] = (H[i] + x) | 0; });
    }
    return H.map(x => (x >>> 0).toString(16).padStart(8, '0')).join('');
  };
  const sha256 = async teks => {
    try {
      if (window.crypto?.subtle && window.isSecureContext) {
        const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(teks));
        return [...new Uint8Array(buf)].map(x => x.toString(16).padStart(2, '0')).join('');
      }
    } catch (e) { /* pakai cadangan */ }
    return sha256Cadangan(teks);
  };

  /* ---------- sesi ----------
     Batas jujur: ini gerbang sederhana, bukan keamanan sungguhan.
     Siapa pun yang punya link + kata sandi bisa masuk. */
  const KUNCI_SESI = 'mb-sesi';
  const hashSandi = String(P.hashKataSandi || '').trim().toLowerCase();
  const sidikSandi = hashSandi.slice(0, 16);
  const sesi = () => {
    const s = simpan.baca(KUNCI_SESI);
    return s && s.email && s.kunci === sidikSandi && sidikSandi ? s : null;
  };
  const emailBenar = e => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);

  /* ---------- pengumuman untuk pembaca layar ---------- */
  const umumkan = teks => { const el = $('#pengumuman'); if (!el) return; el.textContent = ''; setTimeout(() => { el.textContent = teks; }, 30); };

  /* ---------- ikon menu (garis sederhana, buatan sendiri) ---------- */
  const g = isi => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${isi}</svg>`;
  const IKON = {
    rumah: g('<path d="M3.5 11 12 4l8.5 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5h4v5"/>'),
    main: g('<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor"/>'),
    buku: g('<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/><path d="M8.5 8h7"/>'),
    bingkai: g('<rect x="3" y="4" width="11" height="16" rx="2"/><rect x="16" y="8" width="5" height="9" rx="1.5"/><path d="M7 9.5l3 2.5-3 2.5z" fill="currentColor"/>'),
    kuas: g('<path d="M14.5 4.5l5 5-8 8H6.5v-5z"/><path d="M12 7l5 5"/><path d="M6.5 17.5 4 20"/>'),
    kotak: g('<path d="M3.5 8 12 3.5 20.5 8v8L12 20.5 3.5 16z"/><path d="M3.5 8 12 12.5 20.5 8M12 12.5v8"/>'),
    tongkat: g('<path d="M4 20 15 9"/><path d="M15 4v3M15 11v3M11 7.5h3M16 7.5h3"/><path d="M19.5 15.5v2M18.5 16.5h2"/>'),
    lonceng: g('<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>'),
    unduh: g('<path d="M12 4v11"/><path d="M7.5 10.5 12 15l4.5-4.5"/><path d="M4.5 19.5h15"/>'),
    tanya: g('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7"/><circle cx="12" cy="17" r=".6" fill="currentColor"/>'),
    garis3: g('<path d="M4 7h16M4 12h16M4 17h16"/>'),
    salin: g('<rect x="8.5" y="8.5" width="11.5" height="11.5" rx="2.5"/><path d="M15.5 8.5V6A2 2 0 0 0 13.5 4H6a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2h2.5"/>'),
    cari: g('<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/>'),
    silang: g('<path d="M6 6l12 12M18 6 6 18"/>')
  };

  /* ---------- menu (urutan & nama menu) ---------- */
  const MENU = [
    { id: 'beranda', label: 'Beranda', ikon: 'rumah' },
    { id: 'kelas', label: 'Kelas', ikon: 'main' },
    { pisah: true },
    { id: 'kamus', label: 'Kamus Gerak', ikon: 'buku' },
    { id: 'jenis-video', label: 'Jenis Video', ikon: 'bingkai' },
    { id: 'rak-gaya', label: 'Rak Gaya', ikon: 'kuas' },
    { id: 'gudang-prompt', label: 'Gudang Prompt', ikon: 'kotak' },
    { id: 'bikin-prompt', label: 'Bikin Prompt', ikon: 'tongkat', chip: 'segera' },
    { pisah: true },
    { id: 'kabar', label: 'Kabar Baru', ikon: 'lonceng' },
    { id: 'download', label: 'Download', ikon: 'unduh' },
    { id: 'bantuan', label: 'Bantuan', ikon: 'tanya' }
  ];

  /* ---------- potongan tampilan yang dipakai berulang ---------- */
  const logo = (href = '#/beranda') => `<a class="logo" href="${href}" aria-label="motionbareng, ke beranda"><span data-kucing="kepala"></span><span>motion<span class="b">bareng</span></span></a>`;
  const kepalaHal = ({ coretan = '', atas = '', judul, sub = '' }) => `
    <section class="kepala-hal malam">
      <div class="kunang" data-n="12"></div>
      <div class="wadah-isi">
        ${atas}
        ${coretan ? `<span class="coretan" aria-hidden="true">${esc(coretan)}</span>` : ''}
        <h1 tabindex="-1">${judul}</h1>
        ${sub ? `<p>${sub}</p>` : ''}
      </div>
    </section>`;
  const badanHal = isi => `<section class="badan-hal krem" data-sobek><div class="wadah-isi">${isi}</div></section>`;
  const segeraHadir = ({ judul = 'Isinya sedang disiapkan', teks = 'Halaman ini akan terisi begitu materinya siap. Cek Kabar Baru untuk tahu kapan ada tambahan.', eks = 'mikir', warna = 'krem' } = {}) => `
    <div class="segera">
      <div class="segera-kucing" data-kucing="duduk" data-eks="${eks}" data-warna="${warna}"></div>
      <div><span class="chip-segera">Segera hadir</span><h2>${esc(judul)}</h2><p>${teks}</p></div>
    </div>`;

  /* ---------- data kelas (dari data/kelas-data.js) ---------- */
  const D = window.KELAS_DATA || {};
  const MODUL = Array.isArray(D.modul) ? D.modul : [];
  const PELAJARAN = [];
  MODUL.forEach((m, mi) => (Array.isArray(m.pelajaran) ? m.pelajaran : []).forEach((p, pi) =>
    PELAJARAN.push({ ...p, id: String(p.id), langkah: Array.isArray(p.langkah) ? p.langkah : [], modul: m, mi, pi })));
  { const ada = new Set(); PELAJARAN.forEach(p => { if (ada.has(p.id)) console.warn(`motionbareng: id pelajaran "${p.id}" dipakai dua kali di kelas-data.js. Ganti salah satunya.`); ada.add(p.id); }); }
  const cariPelajaran = id => PELAJARAN.find(p => p.id === id);
  const diModul = m => PELAJARAN.filter(p => p.modul === m);
  /* teks dari data: aman (di-escape), `kode` jadi <code> */
  const fmt = s => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>');
  const idVideo = p => { const v = String(p.youtubeId || '').trim(); return /^[\w-]{6,20}$/.test(v) ? v : ''; };
  const BULAN = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  const tanggalIndo = t => { const [y, m, d] = String(t || '').split('-').map(Number); return y && m && d ? `${d} ${BULAN[m - 1] || ''} ${y}` : esc(t); };
  const urutKabar = () => (Array.isArray(D.kabar) ? D.kabar : []).slice().sort((a, b) => String(b.tanggal).localeCompare(String(a.tanggal)));

  /* ---------- progres belajar: disimpan di browser ini, per email ---------- */
  const kunciProgres = () => 'mb-progres:' + ((sesi() || {}).email || '');
  const bacaProgres = () => {
    const p = simpan.baca(kunciProgres()) || {}, obj = v => (v && typeof v === 'object' && !Array.isArray(v)) ? v : {};
    return { selesai: obj(p.selesai), langkah: obj(p.langkah), terakhir: typeof p.terakhir === 'string' ? p.terakhir : '' };
  };
  const ubahProgres = ubah => { const p = bacaProgres(); ubah(p); simpan.tulis(kunciProgres(), p); return p; };
  const hitung = (p, daftar = PELAJARAN) => {
    const n = daftar.filter(x => p.selesai[x.id]).length;
    return { n, total: daftar.length, persen: daftar.length ? Math.round(n / daftar.length * 100) : 0 };
  };
  /* "Lanjutkan belajar": pelajaran terakhir dibuka kalau belum selesai, kalau sudah: pelajaran belum selesai berikutnya */
  const tujuanLanjut = p => {
    const i = PELAJARAN.findIndex(x => x.id === p.terakhir);
    if (i >= 0 && !p.selesai[p.terakhir]) return PELAJARAN[i];
    return PELAJARAN.slice(Math.max(i, 0)).find(x => !p.selesai[x.id]) || PELAJARAN.find(x => !p.selesai[x.id]) || null;
  };
  const bar = (persen, label) => `<div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${persen}" aria-label="${esc(label)}"><i class="${persen ? '' : 'nol'}" style="width:${persen}%"></i></div>`;
  const salamWaktu = () => { const j = new Date().getHours(); return j < 4 ? 'Selamat malam' : j < 11 ? 'Selamat pagi' : j < 15 ? 'Selamat siang' : j < 18 ? 'Selamat sore' : 'Selamat malam'; };

  /* penanda alat: logo resmi kalau diisi di pengaturan.js, kalau tidak ikon netral (sama dengan website) */
  const IKON_ALAT = {
    claude: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="2.5" width="13" height="11" rx="2.5"/><path d="M4.5 6.5l2 1.5-2 1.5M8.5 10h3"/></svg>',
    elevenlabs: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 6v4M6 4v8M9 5.5v5M12 7v2"/></svg>'
  };
  const alat = (n, label) => { const logo = String((P.logoAlat || {})[n] || '').trim(); return `<span class="alat">${logo
    ? `<img src="${esc(logo)}" alt="" width="16" height="16">` : `<span class="alat-ikon" aria-hidden="true">${IKON_ALAT[n] || ''}</span>`}${esc(label)}</span>`; };

  const kartuKabar = k => `
    <article class="kartu kabar-item">
      <p class="kabar-tanggal"><time datetime="${esc(k.tanggal)}">${tanggalIndo(k.tanggal)}</time>${k.contoh ? '<span class="chip-contoh">CONTOH</span>' : ''}</p>
      <h3>${esc(k.judul)}</h3>
      <p>${fmt(k.isi)}</p>
    </article>`;

  const PINTASAN = [
    ['kamus', 'buku', 'Kamus Gerak', 'Arti istilah gerak, plus contoh prompt'],
    ['jenis-video', 'bingkai', 'Jenis Video', 'Explainer, shorts, promo, intro, dan lainnya'],
    ['rak-gaya', 'kuas', 'Rak Gaya', 'Gaya visual yang promptnya tinggal disalin'],
    ['gudang-prompt', 'kotak', 'Gudang Prompt', 'Kumpulan prompt siap pakai'],
    ['download', 'unduh', 'Download', 'Skill motionbareng dan file pendukung'],
    ['bantuan', 'tanya', 'Bantuan', 'Kontak dan pertanyaan yang sering muncul']
  ];

  /* ---------- BERANDA ---------- */
  function halamanBeranda() {
    const p = bacaProgres(), t = hitung(p), lanjut = tujuanLanjut(p), mulai = t.n > 0 || !!p.terakhir;
    let kartuLanjut;
    if (!PELAJARAN.length) kartuLanjut = segeraHadir({ judul: 'Pelajaran sedang disiapkan', eks: 'fokus' });
    else if (!lanjut) kartuLanjut = `
      <div class="kartu lanjut">
        <div class="lanjut-kucing" data-kucing="duduk" data-eks="kagum" data-warna="kuning"></div>
        <div><span class="kicker">Semua selesai</span><h2>Kamu sudah menamatkan kelasnya!</h2>
          <p class="lanjut-meta">${t.total} dari ${t.total} pelajaran selesai. Cari gaya baru untuk video berikutnya di Rak Gaya.</p>
          ${bar(100, 'Progres seluruh kelas')}
          <a class="tombol kuning" href="#/rak-gaya">Buka Rak Gaya</a></div>
      </div>`;
    else kartuLanjut = `
      <div class="kartu lanjut">
        <div class="lanjut-kucing" data-kucing="duduk" data-eks="${mulai ? 'fokus' : 'senang'}"></div>
        <div>
          <span class="kicker">${mulai ? 'Lanjut dari sini' : 'Mulai dari sini'}</span>
          <h2>${esc(lanjut.judul)}</h2>
          <p class="lanjut-meta">Modul ${esc(lanjut.modul.id)} · ${esc(lanjut.modul.judul)}${lanjut.menit ? ` · ±${esc(lanjut.menit)} menit` : ''}</p>
          <div class="progres-baris"><span class="angka-progres">${t.persen}%</span><span>${t.n} dari ${t.total} pelajaran selesai</span></div>
          ${bar(t.persen, 'Progres seluruh kelas')}
          <a class="tombol" href="#/kelas/${encodeURIComponent(lanjut.id)}">${mulai ? 'Lanjutkan belajar' : 'Mulai belajar'} <span aria-hidden="true">→</span></a>
        </div>
      </div>`;
    const perModul = MODUL.length ? `
      <div class="kartu">
        <div class="judul-kartu"><h2>Progres per modul</h2><a class="link-polos" href="#/kelas">Lihat semua pelajaran</a></div>
        <ul class="progres-modul">${MODUL.map(m => { const h = hitung(p, diModul(m)); return `
          <li><span class="pm-judul"><b>${esc(m.id)}</b>${esc(m.judul)}</span><span class="pm-angka">${h.total && h.n === h.total ? '✓ ' : ''}${h.n}/${h.total}</span>${bar(h.persen, `Progres modul ${m.id}`)}</li>`; }).join('')}
        </ul>
      </div>` : '';
    const kabar = urutKabar()[0];
    return {
      judul: 'Beranda',
      html: kepalaHal({ coretan: 'hai, senang kamu di sini!', judul: `${salamWaktu()}, <span class="stabilo">${esc(namaPanggilan())}</span>`,
          sub: `Tulis idenya, ${alat('claude', 'Claude Code')} yang bikin animasinya, ${alat('elevenlabs', 'ElevenLabs')} yang isi suaranya. Kita mulai pelan-pelan, satu video pendek dulu.` }) +
        badanHal(kartuLanjut + perModul) + `
        <section class="bagian malam" data-sobek>
          <div class="kunang" data-n="14"></div>
          <div class="intip kanan" style="--atas:20px"></div>
          <div class="wadah-isi">
            <div class="judul-bagian"><h2>Alat <span class="stabilo">bantu</span></h2><span class="coretan" aria-hidden="true">buka kapan saja</span></div>
            <ul class="pintasan">${PINTASAN.map(([id, ikon, judul, ket]) => `
              <li><a href="#/${id}"><span class="ikon-p">${IKON[ikon]}</span><strong>${esc(judul)}</strong><small>${esc(ket)}</small></a></li>`).join('')}
            </ul>
          </div>
        </section>
        <section class="bagian krem" data-sobek>
          <div class="wadah-isi">
            <div class="judul-bagian"><h2>Kabar <span class="stabilo">terbaru</span></h2><a class="link-polos" href="#/kabar">Semua kabar</a></div>
            ${kabar ? kartuKabar(kabar) : '<p>Belum ada kabar.</p>'}
          </div>
        </section>`
    };
  }

  /* ---------- KELAS: daftar modul & pelajaran ---------- */
  const barisPelajaran = (x, p) => {
    const sudah = !!p.selesai[x.id];
    return `<li><a href="#/kelas/${encodeURIComponent(x.id)}" class="${sudah ? 'sudah' : ''}">
      <span class="no-pel" aria-hidden="true">${sudah ? '✓' : x.pi + 1}</span>
      <span><span class="judul-pel">${esc(x.judul)}</span>
        <span class="meta-pel">${x.menit ? `<span class="menit">±${esc(x.menit)} menit</span>` : ''}${sudah ? '<span class="chip selesai">Selesai</span>' : x.segeraHadir ? '<span class="chip segera">Segera hadir</span>' : ''}${p.terakhir === x.id ? '<span class="chip terakhir">Terakhir dibuka</span>' : ''}</span>
      </span></a></li>`;
  };
  function halamanKelas() {
    const p = bacaProgres(), t = hitung(p);
    const kepala = kepalaHal({ coretan: 'tonton runut ya', judul: 'Semua <span class="stabilo">pelajaran</span>',
      sub: `${MODUL.length} modul, ${t.total} video pendek (1 sampai 3 menit). Mulai dari modul 0, satu per satu.` });
    if (!MODUL.length) return { judul: 'Kelas', html: kepala + badanHal(segeraHadir({ judul: 'Daftar pelajaran sedang disiapkan', eks: 'fokus' })) };
    const ringkas = `
      <div class="kartu ringkas-kelas">
        <div class="progres-baris"><span class="angka-progres">${t.persen}%</span><span>${t.n} dari ${t.total} pelajaran selesai</span></div>
        ${bar(t.persen, 'Progres seluruh kelas')}
      </div>`;
    const daftar = MODUL.map((m, mi) => {
      const pel = diModul(m), h = hitung(p, pel);
      return `
      <article class="kartu modul" aria-labelledby="modul-${mi}">
        <div class="modul-kepala">
          <div><span class="kicker">Modul ${esc(m.id)}</span><h2 id="modul-${mi}">${esc(m.judul)}</h2>${m.ringkas ? `<p>${fmt(m.ringkas)}</p>` : ''}</div>
          <span class="modul-angka${h.total && h.n === h.total ? ' tuntas' : ''}" aria-label="${h.n} dari ${h.total} selesai">${h.n}/${h.total}</span>
        </div>
        ${mi === 0 ? '<p class="catatan-runut"><span class="coretan" aria-hidden="true">mulai di sini!</span> Tonton berurutan dari atas, ya. Tiap pelajaran memakai hasil pelajaran sebelumnya.</p>' : ''}
        ${pel.length ? `<ol class="daftar-pelajaran">${pel.map(x => barisPelajaran(x, p)).join('')}</ol>` : '<p class="ket-kecil">Pelajaran modul ini segera hadir.</p>'}
      </article>`;
    }).join('');
    return { judul: 'Kelas', html: kepala + badanHal(ringkas + daftar) };
  }

  /* ---------- HALAMAN PELAJARAN ---------- */
  const kotakSelesai = (x, sudah) => {
    const i = PELAJARAN.indexOf(x), ber = PELAJARAN[i + 1];
    return sudah ? `
      <div class="selesai-isi">
        <div class="selesai-kucing" data-kucing="duduk" data-eks="senang" data-gaya="melambai"></div>
        <div><h2>Selesai! Mantap.</h2><p>Pelajaran ini sudah tercatat selesai di browser ini.</p>
          <div class="aksi">
            ${ber ? `<a class="tombol kuning" href="#/kelas/${encodeURIComponent(ber.id)}">Pelajaran berikutnya <span aria-hidden="true">→</span></a>` : '<a class="tombol kuning" href="#/beranda">Kembali ke beranda</a>'}
            <button class="tombol garis kecil" type="button" data-tandai>Batalkan tanda selesai</button>
          </div></div>
      </div>` : `
      <div class="selesai-isi">
        <div class="selesai-kucing" data-kucing="duduk" data-eks="fokus"></div>
        <div><h2>Sudah beres?</h2><p>Tandai selesai supaya progresmu tercatat dan tombol "Lanjutkan belajar" tahu harus ke mana.</p>
          <div class="aksi"><button class="tombol" type="button" data-tandai>Tandai selesai</button></div></div>
      </div>`;
  };
  function halamanPelajaran(id) {
    const x = cariPelajaran(id);
    if (!x) return null;
    const p = ubahProgres(q => { q.terakhir = x.id; });
    const i = PELAJARAN.indexOf(x), seb = PELAJARAN[i - 1], ber = PELAJARAN[i + 1];
    const sudah = !!p.selesai[x.id], dicentang = new Set(p.langkah[x.id] || []), vid = idVideo(x);
    const video = vid ? `
      <div class="video">
        <button class="video-fasad" type="button" data-video="${esc(vid)}" aria-label="Putar video: ${esc(x.judul)}">
          <span class="tombol-putar" aria-hidden="true"></span>
          <span class="video-judul" aria-hidden="true">${esc(x.judul)}</span>
          <span class="video-ket" aria-hidden="true">Ketuk untuk memutar</span>
        </button>
      </div>` : `
      <div class="video kosong malam">
        <div class="kunang" data-n="10"></div>
        <div class="video-segera">
          <div data-kucing="duduk" data-eks="mikir"></div>
          <div><span class="chip segera">Segera hadir</span><h2>Videonya sedang disiapkan</h2>
            <p>Sementara itu, baca ringkasan dan langkahnya di bawah. Kalau videonya sudah tayang, kabarnya muncul di Kabar Baru.</p></div>
        </div>
      </div>`;
    const html = kepalaHal({
        atas: `<p class="remah"><a href="#/kelas">Kelas</a><span aria-hidden="true">/</span><span>Modul ${esc(x.modul.id)}: ${esc(x.modul.judul)}</span></p>`,
        judul: esc(x.judul),
        sub: `Pelajaran ${x.pi + 1} dari ${diModul(x.modul).length}${x.menit ? ` · ±${esc(x.menit)} menit` : ''}`
      }) + badanHal(`
        ${video}
        ${x.ringkas ? `<p class="ringkas-pel">${fmt(x.ringkas)}</p>` : ''}
        ${x.langkah.length ? `
        <section class="kartu" aria-labelledby="judul-langkah">
          <h2 id="judul-langkah">Langkah</h2>
          <p class="ket-kecil">Centang yang sudah kamu kerjakan.</p>
          <ul class="ceklis">${x.langkah.map((l, k) => `
            <li><label><input type="checkbox" data-langkah="${k}"${dicentang.has(k) ? ' checked' : ''}><span>${fmt(l)}</span></label></li>`).join('')}
          </ul>
        </section>` : ''}
        <div class="kartu selesai-kartu${sudah ? ' tuntas' : ''}" data-kotak-selesai>${kotakSelesai(x, sudah)}</div>
        <nav class="nav-pel" aria-label="Pelajaran sebelum dan sesudahnya">
          ${seb ? `<a class="kartu-nav" href="#/kelas/${encodeURIComponent(seb.id)}"><small><span aria-hidden="true">←</span> Sebelumnya</small><b>${esc(seb.judul)}</b></a>` : ''}
          ${ber ? `<a class="kartu-nav berikut" href="#/kelas/${encodeURIComponent(ber.id)}"><small>Berikutnya <span aria-hidden="true">→</span></small><b>${esc(ber.judul)}</b></a>`
                : '<a class="kartu-nav berikut" href="#/kelas"><small>Ini pelajaran terakhir</small><b>Kembali ke daftar kelas</b></a>'}
        </nav>`);

    const siap = isi => {
      /* video dimuat saat diketuk (lebih ringan, tidak ada permintaan ke YouTube sebelum diputar) */
      const fasad = $('[data-video]', isi);
      if (fasad) fasad.addEventListener('click', () => {
        const f = document.createElement('iframe');
        f.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(fasad.dataset.video)}?autoplay=1&rel=0&playsinline=1`;
        f.title = 'Video pelajaran: ' + x.judul;
        f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        f.allowFullscreen = true;
        f.referrerPolicy = 'strict-origin-when-cross-origin';
        fasad.replaceWith(f);
        f.focus();
      });
      $$('[data-langkah]', isi).forEach(c => c.addEventListener('change', () => {
        ubahProgres(q => {
          const s = new Set(q.langkah[x.id] || []), k = +c.dataset.langkah;
          if (c.checked) s.add(k); else s.delete(k);
          q.langkah[x.id] = [...s].sort((a, b) => a - b);
        });
      }));
      const kotak = $('[data-kotak-selesai]', isi);
      kotak.addEventListener('click', e => {
        if (!e.target.closest('[data-tandai]')) return;
        const q = ubahProgres(r => { if (r.selesai[x.id]) delete r.selesai[x.id]; else r.selesai[x.id] = Date.now(); });
        const kini = !!q.selesai[x.id];
        kotak.classList.toggle('tuntas', kini);
        kotak.innerHTML = kotakSelesai(x, kini);
        Maskot.hias(kotak);
        $('[data-tandai]', kotak).focus();
        umumkan(kini ? 'Pelajaran ditandai selesai.' : 'Tanda selesai dibatalkan.');
      });
    };
    return { judul: x.judul, html, siap };
  }

  /* =====================================================================
     MENU TAMBAHAN: Kamus Gerak, Jenis Video, Rak Gaya, Gudang Prompt, Kabar, Download, Bantuan
     ===================================================================== */
  const daftar = k => (Array.isArray(D[k]) ? D[k] : []).filter(x => x && typeof x === 'object');
  const chipContoh = x => x.contoh ? ' <span class="chip-contoh">CONTOH</span>' : '';
  /* tautan dari data: hanya http(s) atau file di folder ini (bukan javascript: dll.) */
  const urlAman = u => { u = String(u || '').trim(); return /^https?:\/\//i.test(u) || /^[\w][\w.\-\/ %]*$/.test(u) ? u : ''; };

  /* ---------- tombol Salin (Clipboard API, cadangan execCommand) ---------- */
  let nomorSalin = 0;
  const kotakPrompt = (teks, label) => { const id = 'salin-' + (++nomorSalin); return `
    <div class="kotak-prompt">
      <pre id="${id}" data-label="${esc(label)}">${esc(teks)}</pre>
      <button class="tombol-salin" type="button" data-salin="${id}" aria-label="Salin ${esc(label)}">${IKON.salin}<span>Salin</span></button>
    </div>`; };
  const salinTeks = async teks => {
    try { if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(teks); return true; } } catch (e) { /* coba cara lama */ }
    const ta = document.createElement('textarea');
    ta.value = teks; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
    document.body.appendChild(ta); ta.select(); ta.setSelectionRange(0, teks.length);
    let ok = false; try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    ta.remove(); return ok;
  };
  document.addEventListener('click', async e => {
    const b = e.target.closest('[data-salin]'); if (!b) return;
    const sumber = document.getElementById(b.dataset.salin); if (!sumber) return;
    const ok = await salinTeks(sumber.textContent), label = $('span', b);
    clearTimeout(b._jeda);
    if (b._asli == null) b._asli = label.textContent;
    b.classList.toggle('tersalin', ok);
    label.textContent = ok ? 'Tersalin!' : 'Salin manual';
    umumkan(ok ? 'Tersalin!' : 'Gagal menyalin otomatis. Teksnya sudah dipilih, salin manual, ya.');
    if (!ok && sumber.tagName !== 'TEXTAREA') { const r = document.createRange(); r.selectNodeContents(sumber); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }
    b._jeda = setTimeout(() => { b.classList.remove('tersalin'); label.textContent = b._asli; }, 2200);
  });

  /* ---------- KAMUS GERAK (+ pencarian) ---------- */
  function halamanKamus() {
    const k = daftar('kamus');
    const kepala = kepalaHal({ coretan: 'istilah animasi', judul: 'Kamus <span class="stabilo">Gerak</span>',
      sub: `${k.length ? k.length + ' istilah' : 'Istilah'} gerak yang sering muncul, dijelaskan singkat, lengkap dengan contoh prompt.` });
    if (!k.length) return { judul: 'Kamus Gerak', html: kepala + badanHal(segeraHadir()) };
    const html = kepala + badanHal(`
      <div class="cari">
        <label class="sr" for="cari-kamus">Cari istilah gerak</label>
        <span class="cari-ikon" aria-hidden="true">${IKON.cari}</span>
        <input id="cari-kamus" type="search" placeholder="Cari istilah, misalnya easing" autocomplete="off" spellcheck="false" aria-describedby="hasil-kamus">
      </div>
      <p class="ket-kecil" id="hasil-kamus" role="status">${k.length} istilah</p>
      <div class="grid-kartu dua">${k.map(x => `
        <article class="kartu kamus-item" data-cari="${esc([x.istilah, x.arti, x.kapan, x.contohPrompt].join(' ').toLowerCase())}">
          <h2>${esc(x.istilah)}</h2>
          <p>${fmt(x.arti)}</p>
          ${x.kapan ? `<p class="kapan"><b>Kapan dipakai:</b> ${fmt(x.kapan)}</p>` : ''}
          ${x.contohPrompt ? `<p class="label-prompt">Contoh prompt</p>${kotakPrompt(x.contohPrompt, 'contoh prompt ' + x.istilah)}` : ''}
        </article>`).join('')}
      </div>
      <div class="kosong-cari" hidden>
        <div class="segera"><div class="segera-kucing" data-kucing="duduk" data-eks="mikir"></div>
          <div><h2>Istilahnya belum ada di kamus</h2><p>Coba kata lain. Kalau menurutmu istilah itu perlu ditambah, kabari kami lewat <a class="link-polos" href="#/bantuan">Bantuan</a>.</p></div></div>
      </div>`);
    const siap = isi => {
      const input = $('#cari-kamus', isi), kartu = $$('.kamus-item', isi), info = $('#hasil-kamus', isi), kosong = $('.kosong-cari', isi);
      input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        let n = 0;
        kartu.forEach(c => { const cocok = !q || c.dataset.cari.includes(q); c.hidden = !cocok; if (cocok) n++; });
        info.textContent = q ? `${n} istilah cocok dengan "${input.value.trim()}"` : `${kartu.length} istilah`;
        kosong.hidden = n > 0;
      });
    };
    return { judul: 'Kamus Gerak', html, siap };
  }

  /* ---------- JENIS VIDEO (daftar + satu halaman per jenis) ---------- */
  const kotakRasio = r => { const m = String(r || '').match(/(\d+)\s*:\s*(\d+)/); return m ? `<span class="rasio" style="aspect-ratio:${m[1]}/${m[2]}" aria-hidden="true"></span>` : ''; };
  function halamanJenisVideo(id) {
    const j = daftar('jenisVideo');
    if (id) {
      const x = j.find(v => String(v.id) === id);
      if (!x) return null;
      const pel = x.pelajaran ? cariPelajaran(String(x.pelajaran)) : null, struktur = Array.isArray(x.struktur) ? x.struktur : [];
      return {
        judul: x.nama,
        html: kepalaHal({ atas: '<p class="remah"><a href="#/jenis-video">Jenis Video</a></p>', judul: esc(x.nama),
            sub: [x.rasio && `Rasio ${esc(x.rasio)}`, x.durasi && esc(x.durasi)].filter(Boolean).join(' · ') }) +
          badanHal(`
            <section class="kartu"><h2>Kapan dipakai</h2><p>${fmt(x.kapan)}</p></section>
            ${struktur.length ? `<section class="kartu"><h2>Susunan adegan</h2><ol class="struktur">${struktur.map(s => `<li>${fmt(s)}</li>`).join('')}</ol></section>` : ''}
            ${x.contoh ? `<section class="kartu"><h2>Contoh prompt</h2><p class="ket-kecil">Ganti bagian dalam [kurung siku] dengan punyamu.</p>${kotakPrompt(x.contoh, 'contoh prompt ' + x.nama)}</section>` : ''}
            ${pel ? `<a class="kartu-nav" href="#/kelas/${encodeURIComponent(pel.id)}"><small>Pelajarannya di kelas · Modul ${esc(pel.modul.id)}</small><b>${esc(pel.judul)}</b></a>` : ''}
            <p><a class="link-polos" href="#/jenis-video"><span aria-hidden="true">←</span> Semua jenis video</a></p>`)
      };
    }
    const kepala = kepalaHal({ coretan: 'pilih bentuknya', judul: 'Jenis <span class="stabilo">Video</span>', sub: 'Kapan dipakai, susunan adegannya, dan contoh promptnya.' });
    if (!j.length) return { judul: 'Jenis Video', html: kepala + badanHal(segeraHadir()) };
    return {
      judul: 'Jenis Video',
      html: kepala + badanHal(`<ul class="grid-kartu tiga daftar-jenis">${j.map(x => `
        <li><a class="kartu jenis-item" href="#/jenis-video/${encodeURIComponent(x.id)}">
          <span class="rasio-wadah">${kotakRasio(x.rasio)}</span>
          <span class="jenis-teks"><b>${esc(x.nama)}</b><small>${[x.rasio, x.durasi].filter(Boolean).map(esc).join(' · ')}</small><span>${fmt(x.kapan)}</span></span>
        </a></li>`).join('')}</ul>`)
    };
  }

  /* ---------- RAK GAYA ---------- */
  const WARNA_KUCING_GAYA = ['krem', 'krem', 'kuning', 'oren', 'teal'];
  function halamanRakGaya() {
    const g = daftar('gaya');
    const kepala = kepalaHal({ coretan: 'ambil satu', judul: 'Rak <span class="stabilo">Gaya</span>', sub: 'Gaya visual siap pakai. Salin promptnya, tempel ke Claude Code bersama naskahmu.' });
    if (!g.length) return { judul: 'Rak Gaya', html: kepala + badanHal(segeraHadir({ eks: 'kagum', warna: 'kuning' })) };
    return {
      judul: 'Rak Gaya',
      html: kepala + badanHal(`<div class="grid-kartu dua">${g.map((x, i) => { const gambar = urlAman(x.gambar); return `
        <article class="kartu gaya-item">
          <div class="gaya-gambar g-${i % 5}">${gambar
            ? `<img src="${esc(gambar)}" alt="Contoh gaya ${esc(x.nama)}" loading="lazy">`
            : `<div class="gaya-kucing" data-kucing="duduk" data-eks="kagum" data-warna="${WARNA_KUCING_GAYA[i % 5]}"></div><span class="ket-gambar">gambar contoh menyusul</span>`}</div>
          <h2>${esc(x.nama)}${chipContoh(x)}</h2>
          <p>${fmt(x.deskripsi)}</p>
          ${x.prompt ? kotakPrompt(x.prompt, 'prompt gaya ' + x.nama) : ''}
        </article>`; }).join('')}</div>`)
    };
  }

  /* ---------- GUDANG PROMPT (dikelompokkan + saring) ---------- */
  function halamanGudangPrompt() {
    const p = daftar('prompt');
    const kepala = kepalaHal({ coretan: 'tinggal salin', judul: 'Gudang <span class="stabilo">Prompt</span>', sub: 'Prompt siap salin, dikelompokkan biar gampang dicari. Ganti bagian dalam [kurung siku] dengan punyamu.' });
    if (!p.length) return { judul: 'Gudang Prompt', html: kepala + badanHal(segeraHadir({ warna: 'oren' })) };
    const kelompok = [...new Set(p.map(x => x.kelompok || 'Lainnya'))];
    const html = kepala + badanHal(`
      <div class="saring" role="group" aria-label="Saring kelompok prompt">
        <button type="button" data-kelompok="" aria-pressed="true">Semua</button>
        ${kelompok.map((k, i) => `<button type="button" data-kelompok="${i}" aria-pressed="false">${esc(k)}</button>`).join('')}
      </div>
      ${kelompok.map((k, i) => `
      <section class="kelompok-prompt" data-grup="${i}" aria-labelledby="grup-${i}">
        <h2 class="judul-grup" id="grup-${i}">${esc(k)}</h2>
        <div class="grid-kartu dua">${p.filter(x => (x.kelompok || 'Lainnya') === k).map(x => `
          <article class="kartu prompt-item"><h3>${esc(x.judul)}${chipContoh(x)}</h3>${kotakPrompt(x.isi, 'prompt ' + x.judul)}</article>`).join('')}
        </div>
      </section>`).join('')}`);
    const siap = isi => {
      const tombol = $$('[data-kelompok]', isi), grup = $$('[data-grup]', isi);
      tombol.forEach(b => b.addEventListener('click', () => {
        tombol.forEach(t => t.setAttribute('aria-pressed', String(t === b)));
        grup.forEach(s => { s.hidden = b.dataset.kelompok !== '' && s.dataset.grup !== b.dataset.kelompok; });
        umumkan(b.dataset.kelompok === '' ? 'Menampilkan semua prompt' : `Menampilkan kelompok ${b.textContent}`);
      }));
    };
    return { judul: 'Gudang Prompt', html, siap };
  }

  /* ---------- KABAR BARU ---------- */
  function halamanKabar() {
    const k = urutKabar();
    return {
      judul: 'Kabar Baru',
      html: kepalaHal({ coretan: 'catatan update', judul: 'Kabar <span class="stabilo">Baru</span>', sub: 'Catatan pembaruan kelas: pelajaran baru, perbaikan, dan tambahan. Yang terbaru di paling atas.' }) +
        badanHal(k.length ? `<div class="daftar-kabar">${k.map(kartuKabar).join('')}</div>` : segeraHadir({ judul: 'Belum ada kabar', teks: 'Kalau ada pelajaran baru atau perbaikan, catatannya muncul di sini.' }))
    };
  }

  /* ---------- DOWNLOAD ---------- */
  function halamanDownload() {
    const u = daftar('unduhan');
    const kepala = kepalaHal({ coretan: 'simpan di laptop', judul: 'File <span class="stabilo">pendukung</span>', sub: 'Skill motionbareng dan file lain yang dipakai di kelas. Unduh di laptop yang kamu pakai untuk bikin video.' });
    if (!u.length) return { judul: 'Download', html: kepala + badanHal(segeraHadir()) };
    return {
      judul: 'Download',
      html: kepala + badanHal(u.map(x => { const url = urlAman(x.url), luar = /^https?:/i.test(url); return `
        <article class="kartu unduh-item">
          <span class="ikon-p">${IKON.unduh}</span>
          <div class="unduh-teks"><h2>${esc(x.nama)}</h2><p>${fmt(x.deskripsi)}</p>${x.ukuran ? `<p class="ket-kecil">Ukuran: ${esc(x.ukuran)}</p>` : ''}</div>
          ${url ? `<a class="tombol" href="${esc(url)}"${luar ? ' target="_blank" rel="noopener"' : ' download'}>Download<span class="sr"> ${esc(x.nama)}</span></a>`
                : '<span class="chip segera">Segera hadir</span>'}
        </article>`; }).join(''))
    };
  }

  /* ---------- BANTUAN (kontak, FAQ, pindahkan progres) ---------- */
  const kodeProgres = () => 'MB1:' + btoa(unescape(encodeURIComponent(JSON.stringify(bacaProgres()))));
  const bacaKode = kode => {
    const m = String(kode || '').replace(/\s+/g, '').match(/^MB1:([A-Za-z0-9+/=]+)$/);
    if (!m) return null;
    try {
      const o = JSON.parse(decodeURIComponent(escape(atob(m[1]))));
      if (!o || typeof o !== 'object' || !o.selesai || typeof o.selesai !== 'object') return null;
      const selesai = {}, langkah = {};
      Object.entries(o.selesai).forEach(([id, t]) => { if (cariPelajaran(id)) selesai[id] = Number(t) || Date.now(); });
      Object.entries(o.langkah || {}).forEach(([id, a]) => { if (cariPelajaran(id) && Array.isArray(a)) langkah[id] = a.filter(Number.isInteger); });
      return { selesai, langkah, terakhir: cariPelajaran(String(o.terakhir || '')) ? String(o.terakhir) : '' };
    } catch (e) { return null; }
  };
  function halamanBantuan() {
    const wa = String(P.whatsapp || '').replace(/\D/g, ''), email = String(P.email || '').trim(), faq = daftar('faq');
    const kontak = (wa || email) ? `
      <div class="kartu">
        <h2>Hubungi kami</h2>
        <p>Tulis nama, email yang dipakai saat beli, dan pelajaran yang bikin bingung. Kirim tangkapan layar kalau ada error.</p>
        <div class="aksi">
          ${wa ? `<a class="tombol" href="https://wa.me/${wa}" target="_blank" rel="noopener">Chat WhatsApp</a>` : ''}
          ${email ? `<a class="tombol ${wa ? 'putih' : ''}" href="mailto:${esc(email)}">Kirim email</a>` : ''}
        </div>
      </div>` : `
      <div class="kartu">
        <h2>Hubungi kami</h2>
        <p>Kontak bantuan sedang disiapkan dan akan muncul di sini. Sementara itu, cek pertanyaan umum di bawah.</p>
      </div>`;
    const html = kepalaHal({ coretan: 'tanya aja', judul: 'Ada yang <span class="stabilo">bingung?</span>', sub: 'Jawaban singkat untuk hal yang sering ditanyakan, cara menghubungi kami, dan cara memindahkan progres.' }) +
      badanHal(`
        <div class="grid-kartu dua">
          ${kontak}
          <div class="kartu akses-kartu">
            <div class="akses-kucing" data-kucing="duduk" data-eks="senang" data-warna="oren"></div>
            <div><h2>Akses selamanya</h2><p>Sekali bayar, kelas ini bisa kamu buka kapan saja. Simpan alamat halaman ini dan email dari Scalev supaya gampang kembali.</p></div>
          </div>
        </div>
        ${faq.length ? `
        <section aria-labelledby="judul-faq">
          <h2 class="judul-grup" id="judul-faq">Pertanyaan umum</h2>
          <div class="faq">${faq.map(f => `<details><summary>${esc(f.tanya)}</summary><p>${fmt(f.jawab)}</p></details>`).join('')}</div>
        </section>` : ''}`) + `
      <section class="bagian malam" data-sobek aria-labelledby="judul-pindah">
        <div class="kunang" data-n="12"></div>
        <div class="wadah-isi">
          <div class="judul-bagian"><h2 id="judul-pindah">Pindahkan <span class="stabilo">progres</span></h2><span class="coretan" aria-hidden="true">ganti HP? bisa</span></div>
          <p class="ket-bagian">Progres belajar disimpan di browser ini saja. Mau pindah ke HP atau laptop lain? Salin kode di perangkat lama, lalu tempel di perangkat baru.</p>
          <div class="grid-kartu dua">
            <div class="kartu">
              <h3>1. Di perangkat lama</h3>
              <p>Salin kode progresmu, lalu kirim ke dirimu sendiri (misalnya lewat chat atau email).</p>
              <pre id="kode-progres" class="sr">${esc(kodeProgres())}</pre>
              <div class="aksi"><button class="tombol" type="button" data-salin="kode-progres"><span>Salin kode progres</span></button></div>
            </div>
            <form class="kartu form-impor" novalidate>
              <h3>2. Di perangkat baru</h3>
              <div class="isian"><label for="kode-impor">Tempel kode progres</label>
                <textarea id="kode-impor" rows="3" spellcheck="false" autocomplete="off" placeholder="MB1:..."></textarea></div>
              <p class="pesan" id="pesan-impor" role="status" hidden></p>
              <div class="aksi"><button class="tombol kuning" type="submit">Pakai kode ini</button></div>
            </form>
          </div>
        </div>
      </section>`;
    const siap = isi => {
      const f = $('.form-impor', isi), pesan = $('#pesan-impor', isi);
      const tampilPesan = (teks, jenis) => { pesan.textContent = teks; pesan.dataset.jenis = jenis; pesan.hidden = !teks; };
      f.addEventListener('submit', e => {
        e.preventDefault();
        const o = bacaKode(f.elements[0].value);
        if (!o) return tampilPesan('Kodenya belum terbaca. Pastikan disalin lengkap, mulai dari "MB1:".', 'salah');
        const n = Object.keys(o.selesai).length;
        if (!confirm(`Progres di browser ini akan diganti dengan progres dari kode (${n} pelajaran selesai). Lanjutkan?`)) return;
        ubahProgres(p => { p.selesai = o.selesai; p.langkah = o.langkah; p.terakhir = o.terakhir; });
        f.elements[0].value = '';
        $('#kode-progres', isi).textContent = kodeProgres();
        tampilPesan(`Berhasil! Progres dipindahkan: ${n} pelajaran selesai.`, 'info');
      });
    };
    return { judul: 'Bantuan', html, siap };
  }

  /* ---------- halaman ----------
     Setiap halaman mengembalikan { judul, html, siap? }. siap(isi) dipanggil setelah halaman tampil. */
  const HALAMAN = {
    beranda: () => halamanBeranda(),
    kelas: param => param ? halamanPelajaran(decodeURIComponent(param)) : halamanKelas(),
    kamus: () => halamanKamus(),
    'jenis-video': param => halamanJenisVideo(param ? decodeURIComponent(param) : ''),
    'rak-gaya': () => halamanRakGaya(),
    'gudang-prompt': () => halamanGudangPrompt(),
    'bikin-prompt': () => ({
      judul: 'Bikin Prompt',
      html: kepalaHal({ coretan: 'lagi dirakit', judul: 'Bikin <span class="stabilo">Prompt</span>', sub: 'Alat isi-isian yang menyusun prompt untukmu: pilih jenis video, tulis topiknya, pilih gaya, lalu promptnya tersusun sendiri.' }) +
        badanHal(segeraHadir({ judul: 'Alat ini sedang dirakit', teks: 'Sementara itu, pakai prompt siap salin di <a class="link-polos" href="#/gudang-prompt">Gudang Prompt</a> atau contoh prompt di <a class="link-polos" href="#/jenis-video">Jenis Video</a>.', eks: 'fokus', warna: 'teal' }))
    }),
    kabar: () => halamanKabar(),
    download: () => halamanDownload(),
    bantuan: () => halamanBantuan(),
    hilang: () => ({
      judul: 'Halaman tidak ditemukan',
      html: kepalaHal({ coretan: 'eh?', judul: 'Halamannya <span class="stabilo">nggak ada</span>', sub: 'Mungkin tautannya salah ketik.' }) +
        badanHal(`<div class="segera"><div class="segera-kucing" data-kucing="duduk" data-eks="kaget"></div><div><h2>Kita balik ke beranda, yuk</h2><p><a class="tombol kecil" href="#/beranda">Ke beranda</a></p></div></div>`)
    })
  };

  const namaPanggilan = () => {
    const s = sesi(); if (!s) return 'teman';
    const depan = s.email.split('@')[0].split(/[._\-+0-9]/).filter(Boolean)[0] || 'teman';
    return depan.charAt(0).toUpperCase() + depan.slice(1);
  };

  /* ---------- routing: #/halaman/param ---------- */
  const rute = () => {
    const h = location.hash.replace(/^#\/?/, '');
    const [id, ...sisa] = h.split('/');
    return { id: id || 'beranda', param: sisa.join('/') };
  };

  /* ---------- gerbang masuk ---------- */
  function tampilGerbang(pesanAwal) {
    document.title = 'Masuk · motionbareng';
    document.documentElement.classList.remove('menu-terbuka');
    const kontak = P.whatsapp ? `https://wa.me/${String(P.whatsapp).replace(/\D/g, '')}` : (P.email ? `mailto:${P.email}` : '');
    akar.innerHTML = `
      <main class="gerbang malam" id="isi">
        <div class="kunang" data-n="22"></div>
        <div class="gerbang-maskot masuk" style="--u:0" data-kucing="besar" data-label="Kucing motionbareng melambai"></div>
        <p class="merek masuk" style="--u:1" aria-hidden="true">motion<span>bareng</span></p>
        <p class="slogan masuk" style="--u:2" aria-hidden="true">yuk, lanjut belajar.</p>
        <div class="kartu-masuk terang masuk" style="--u:3">
          <span class="coretan" aria-hidden="true">area kelas</span>
          <h1>Masuk ke <span class="stabilo">kelas</span></h1>
          <p>Pakai email yang kamu isi waktu beli, dan kata sandi dari email Scalev.</p>
          <form class="form-masuk" novalidate>
            <div class="isian"><label for="email">Email</label>
              <input id="email" type="email" name="email" autocomplete="email" inputmode="email" autocapitalize="off" spellcheck="false" required placeholder="nama@gmail.com">
            </div>
            <div class="isian"><label for="sandi">Kata sandi</label>
              <span class="sandi-baris">
                <input id="sandi" type="password" name="sandi" autocomplete="current-password" required>
                <button type="button" class="lihat-sandi" aria-pressed="false" aria-controls="sandi">Lihat</button>
              </span>
            </div>
            <p class="pesan" id="pesan-masuk" role="alert" hidden></p>
            <button class="tombol" type="submit">Masuk</button>
          </form>
          <div class="kaki-masuk">
            ${P.alamatJualan ? `<span>Belum punya akses? <a class="link-polos" href="${esc(P.alamatJualan)}">Lihat kelasnya</a></span>` : ''}
            <span>Lupa kata sandi? Cari email dari Scalev${kontak ? `, atau <a class="link-polos" href="${esc(kontak)}"${kontak.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>hubungi kami</a>` : ''}.</span>
          </div>
        </div>
        <p class="catatan-gerbang">Email cuma disimpan di browser ini untuk menyapamu dan mencatat progres belajar.</p>
      </main>`;
    Maskot.hias(akar);

    const f = $('.form-masuk', akar), pesan = $('#pesan-masuk', akar), tombol = $('button[type="submit"]', f);
    const tampilPesan = (teks, jenis = 'salah') => { pesan.textContent = teks || ''; pesan.dataset.jenis = jenis; pesan.hidden = !teks; };
    if (pesanAwal) tampilPesan(pesanAwal, 'info');
    const terakhir = simpan.baca('mb-email-terakhir');
    if (terakhir) f.elements.email.value = terakhir;

    const lihat = $('.lihat-sandi', f);
    lihat.addEventListener('click', () => {
      const tampil = f.elements.sandi.type === 'password';
      f.elements.sandi.type = tampil ? 'text' : 'password';
      lihat.textContent = tampil ? 'Tutup' : 'Lihat';
      lihat.setAttribute('aria-pressed', String(tampil));
      lihat.setAttribute('aria-label', tampil ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi');
    });
    lihat.setAttribute('aria-label', 'Tampilkan kata sandi');
    $$('input', f).forEach(el => el.addEventListener('input', () => el.removeAttribute('aria-invalid')));

    f.addEventListener('submit', async e => {
      e.preventDefault();
      const email = f.elements.email.value.trim().toLowerCase();
      const sandi = f.elements.sandi.value.trim();
      if (!emailBenar(email)) { f.elements.email.setAttribute('aria-invalid', 'true'); f.elements.email.focus(); return tampilPesan('Alamat emailnya belum benar. Contoh: nama@gmail.com'); }
      if (!sandi) { f.elements.sandi.setAttribute('aria-invalid', 'true'); f.elements.sandi.focus(); return tampilPesan('Kata sandinya belum diisi.'); }
      if (!hashSandi) { console.warn('motionbareng: hashKataSandi di pengaturan.js masih kosong.'); return tampilPesan('Area kelas belum siap dibuka. Hubungi kami, ya.'); }
      tombol.disabled = true; tombol.textContent = 'Mengecek…'; tampilPesan('');
      const cocok = (await sha256(sandi)) === hashSandi;
      tombol.disabled = false; tombol.textContent = 'Masuk';
      if (!cocok) {
        f.elements.sandi.setAttribute('aria-invalid', 'true'); f.elements.sandi.select();
        return tampilPesan('Kata sandinya belum cocok. Cek lagi di email dari Scalev.');
      }
      simpan.tulis(KUNCI_SESI, { email, kunci: sidikSandi, sejak: Date.now() });
      simpan.tulis('mb-email-terakhir', email);
      kerangkaSiap = false;
      tampil();
      umumkan('Berhasil masuk. Selamat belajar!');
    });
  }

  function keluar() {
    simpan.hapus(KUNCI_SESI);
    kerangkaSiap = false;
    try { history.replaceState(null, '', location.href.split('#')[0] + '#/beranda'); } catch (e) { /* tidak apa-apa */ }
    tampilGerbang('Kamu sudah keluar. Sampai nanti!');
  }

  /* ---------- kerangka: menu samping (desktop) / menu lipat (HP) ---------- */
  let kerangkaSiap = false, tutupMenu = () => {};
  document.addEventListener('keydown', e => { if (e.key === 'Escape') tutupMenu(true); });
  /* layar dilebarkan ke desktop: pastikan kunci gulir dilepas */
  matchMedia('(min-width:960px)').addEventListener?.('change', e => { if (e.matches) tutupMenu(false); });
  function pasangKerangka() {
    const s = sesi();
    akar.innerHTML = `
      <a class="lewati" href="#isi" data-lewati>Langsung ke isi</a>
      <div class="kerangka">
        <header class="atas-hp">
          ${logo()}
          <button class="buka-menu" type="button" aria-expanded="false" aria-controls="menu-samping">${IKON.garis3}<span>Menu</span></button>
        </header>
        <aside class="samping malam" id="menu-samping" aria-label="Menu area kelas">
          <div class="kunang" data-n="14"></div>
          ${logo()}
          <p class="samping-ket" aria-hidden="true">area kelas</p>
          <nav aria-label="Menu utama">
            <ul class="menu-utama">
              ${MENU.map(m => m.pisah ? '<li class="menu-pisah" role="presentation"></li>' :
                `<li><a href="#/${m.id}" data-menu="${m.id}">${IKON[m.ikon]}<span>${esc(m.label)}</span>${m.chip ? `<span class="chip-menu">${esc(m.chip)}</span>` : ''}</a></li>`).join('')}
            </ul>
          </nav>
          <div class="akun">
            <div class="akun-kartu">
              <div><small>Masuk sebagai</small><b>${esc(s ? s.email : '')}</b></div>
              <button class="tombol garis kecil" type="button" data-keluar>Keluar</button>
            </div>
          </div>
        </aside>
        <main class="isi" id="isi" tabindex="-1"></main>
      </div>`;
    Maskot.hias(akar);

    const tombolMenu = $('.buka-menu', akar), samping = $('#menu-samping', akar);
    const aturMenu = buka => {
      samping.classList.toggle('terbuka', buka);
      tombolMenu.setAttribute('aria-expanded', String(buka));
      tombolMenu.innerHTML = (buka ? IKON.silang : IKON.garis3) + `<span>${buka ? 'Tutup' : 'Menu'}</span>`;
      document.documentElement.classList.toggle('menu-terbuka', buka);
      /* selama menu HP terbuka, isi halaman di belakangnya tidak bisa difokus (keyboard & pembaca layar) */
      const isiHal = $('#isi', akar); if (isiHal) isiHal.inert = buka;
      if (buka) { const aktif = $('[aria-current="page"]', samping) || $('a', samping); aktif && aktif.focus(); }
    };
    tombolMenu.addEventListener('click', () => aturMenu(!samping.classList.contains('terbuka')));
    tutupMenu = (kembalikanFokus) => {
      if (!samping.isConnected || !samping.classList.contains('terbuka')) return;
      aturMenu(false); if (kembalikanFokus) tombolMenu.focus();
    };
    /* klik menu halaman yang sedang dibuka tidak memicu hashchange: tutup menunya di sini */
    $$('[data-menu]', samping).forEach(a => a.addEventListener('click', () => tutupMenu(false)));
    $('[data-keluar]', akar).addEventListener('click', keluar);
    $('[data-lewati]', akar).addEventListener('click', e => { e.preventDefault(); const h = $('#isi h1') || $('#isi'); h.focus(); });
    kerangkaSiap = true;
  }

  /* ---------- tampilkan halaman sesuai alamat ---------- */
  let pertama = true;
  function tampil() {
    if (!sesi()) { tampilGerbang(); return; }
    if (!kerangkaSiap) pasangKerangka();
    const { id, param } = rute();
    const buat = HALAMAN[id] || HALAMAN.hilang;
    let hasil;
    try { hasil = buat(param); } catch (e) { console.error(e); hasil = HALAMAN.hilang(); }
    if (!hasil) hasil = HALAMAN.hilang();
    const isi = $('#isi');
    isi.innerHTML = hasil.html;
    Maskot.hias(isi);
    if (hasil.siap) hasil.siap(isi);
    /* kotak prompt yang isinya perlu digulir dibuat bisa difokus, supaya bisa digulir pakai keyboard */
    $$('pre[data-label]', isi).forEach(pre => {
      if (pre.scrollHeight > pre.clientHeight + 2) { pre.tabIndex = 0; pre.setAttribute('role', 'region'); pre.setAttribute('aria-label', pre.dataset.label); }
    });
    document.title = `${hasil.judul} · motionbareng`;
    const menuAktif = (MENU.find(m => m.id === id) || {}).id;
    $$('[data-menu]').forEach(a => { if (a.dataset.menu === menuAktif) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    tutupMenu(false);
    if (!pertama) {
      window.scrollTo(0, 0);
      const h1 = $('h1', isi); if (h1) h1.focus({ preventScroll: true });
      umumkan(`Halaman ${hasil.judul}`);
    }
    pertama = false;
  }

  window.addEventListener('hashchange', tampil);
  /* login di tab lain / keluar di tab lain */
  window.addEventListener('storage', e => { if (e.key === KUNCI_SESI) { kerangkaSiap = false; tampil(); } });
  tampil();
})();
