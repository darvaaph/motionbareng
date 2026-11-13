/* Kode bersama untuk index.html (link bio) dan kelas.html (halaman jualan) */
(() => {
  const P = window.PENGATURAN || {};
  const rp = n => 'Rp' + Number(n).toLocaleString('id-ID');
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  /* angka acak yang selalu sama (supaya posisi kunang-kunang & sobekan tidak berubah tiap dibuka) */
  const acak = seed => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };

  /* ---------- maskot kucing ---------- */
  const WARNA = {
    krem:  { bulu:'#FBF3E0', dalam:'#F5C4B3' },
    oren:  { bulu:'#E8894F', dalam:'#F5C4B3' },
    kuning:{ bulu:'#F6C350', dalam:'#F5C4B3' },
    teal:  { bulu:'#1D9E75', dalam:'#9ED9C3' }
  };
  const D_EKOR = 'M64,190 C24,196 14,160 30,142 C38,132 32,120 22,124';
  const mataBiasa = `<g class="mata"><ellipse cx="82" cy="86" rx="5.5" ry="8"/><ellipse cx="118" cy="86" rx="5.5" ry="8"/></g>`;
  const mulutBiasa = `<path class="mulut" d="M92,105 Q96,110 100,105 Q104,110 108,105"/>`;
  const kepala = (c, wajah = mataBiasa + mulutBiasa) => `
    <g class="kepala">
      <g class="telinga-kiri"><path fill="${c.bulu}" d="M54,74 L60,24 L94,52 Z"/><path fill="${c.dalam}" stroke="none" d="M63,62 L66,38 L84,53 Z"/></g>
      <g class="telinga-kanan"><path fill="${c.bulu}" d="M106,52 L134,30 L146,74 Z"/><path fill="${c.dalam}" d="M134,30 L152,40 L140,50 Z"/></g>
      <ellipse class="muka" fill="${c.bulu}" cx="100" cy="88" rx="54" ry="44"/>
      <ellipse class="pipi" cx="66" cy="103" rx="9" ry="5"/><ellipse class="pipi" cx="134" cy="103" rx="9" ry="5"/>
      <path class="hidung" d="M96,97 H104 L100,101.5 Z"/>
      <path class="kumis" d="M58,94 L34,89 M58,101 L33,104 M142,94 L166,89 M142,101 L167,104"/>
      ${wajah}
    </g>`;
  const kucing = (w = 'krem', kelas = '', k = '0s') => { const c = WARNA[w]; return `
    <g class="kucing ${kelas}" style="--k:${k}">
      <g class="ekor"><path class="ekor-garis" d="${D_EKOR}"/><path class="ekor-isi" stroke="${c.bulu}" d="${D_EKOR}"/></g>
      <g class="tubuh">
        <path class="badan" fill="${c.bulu}" d="M62,204 C50,204 46,184 52,154 C58,124 72,112 100,112 C128,112 142,124 148,154 C154,184 150,204 138,204 Z"/>
        ${kepala(c)}
      </g>
      <circle class="tapak tapak-kiri" fill="${c.bulu}" cx="82" cy="202" r="11"/>
      <circle class="tapak tapak-kanan" fill="${c.bulu}" cx="118" cy="202" r="11"/>
    </g>`; };
  const svg = (vb, isi, label) =>
    `<svg viewBox="${vb}" ${label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"'}><g class="tinta">${isi}</g></svg>`;

  /* ekspresi untuk kucing yang ngintip di atas bar harga */
  const EKSPRESI = `
    <g class="eks eks-biasa">${mataBiasa}${mulutBiasa}</g>
    <g class="eks eks-senang"><path class="garis-tipis" d="M75,88 Q82,79 89,88 M111,88 Q118,79 125,88"/><path class="mulut" fill="#F0997B" d="M91,104 Q100,116 109,104 Z"/></g>
    <g class="eks eks-kagum"><path class="mata-isi" d="M82,76 l3,7 7,1 -5,5 1.5,7 -6.5,-3.5 -6.5,3.5 1.5,-7 -5,-5 7,-1z M118,76 l3,7 7,1 -5,5 1.5,7 -6.5,-3.5 -6.5,3.5 1.5,-7 -5,-5 7,-1z" fill="#2C2C2A"/>${mulutBiasa}</g>
    <g class="eks eks-fokus"><ellipse class="mata-isi" cx="83" cy="82" rx="5.5" ry="7"/><ellipse class="mata-isi" cx="119" cy="82" rx="5.5" ry="7"/><path class="garis-tipis" d="M94,106 H106"/></g>
    <g class="eks eks-kaget"><circle cx="82" cy="85" r="9" fill="#fff" stroke-width="3"/><circle cx="118" cy="85" r="9" fill="#fff" stroke-width="3"/><circle class="mata-isi" cx="82" cy="85" r="4.5"/><circle class="mata-isi" cx="118" cy="85" r="4.5"/><ellipse cx="100" cy="108" rx="5" ry="6" fill="#2C2C2A" stroke="none"/></g>
    <g class="eks eks-mikir"><ellipse class="mata-isi" cx="88" cy="84" rx="5.5" ry="8"/><ellipse class="mata-isi" cx="124" cy="84" rx="5.5" ry="8"/><path class="garis-tipis" d="M93,107 Q100,103 108,106"/></g>`;

  /* ilustrasi utama hero: kucing di balik papan storyboard */
  const HERO = `
    <svg viewBox="8 142 404 240" role="img" aria-label="Papan storyboard: naskah, sketsa, lalu video jadi">
      <g class="tinta">
        <rect x="16" y="150" width="388" height="224" rx="16" fill="#FBF3E0" stroke-width="4.5"/>
        <path d="M16,184 H404" stroke-width="3"/>
        <circle cx="38" cy="167" r="5.5" fill="#D85A30" stroke="none"/><circle cx="55" cy="167" r="5.5" fill="#F6C350" stroke="none"/><circle cx="72" cy="167" r="5.5" fill="#1D9E75" stroke="none"/>
        <text class="papan-judul" x="90" y="172">video-pertamamu.mp4</text>
        <rect x="32" y="198" width="112" height="104" rx="8" fill="#FFFBF2" stroke-width="3"/>
        <rect x="154" y="198" width="112" height="104" rx="8" fill="#FFFBF2" stroke-width="3"/>
        <rect x="276" y="198" width="112" height="104" rx="8" fill="#FFFBF2" stroke-width="3"/>
        ${[88, 70, 82, 58, 76].map((w, i) => `<rect class="baris" style="--i:${i}" x="44" y="${212 + i * 16}" width="${w}" height="8" rx="4"/>`).join('')}
        <circle class="sketsa" pathLength="1" cx="238" cy="224" r="12"/>
        <path class="sketsa" pathLength="1" d="M162,292 L194,240 L218,274 L236,254 L260,292"/>
        <path class="sketsa" pathLength="1" d="M168,224 q10,-8 20,0 q10,-8 20,0"/>
        <g class="jadi">
          <rect x="281" y="203" width="102" height="94" rx="5" fill="#1D9E75" stroke="none"/>
          <circle class="matahari" cx="358" cy="228" r="11" fill="#F6C350" stroke-width="2.5"/>
          <path d="M281,297 L312,248 L336,278 L356,258 L383,297 Z" fill="#0E6B4F" stroke-width="2.5"/>
          <circle cx="324" cy="250" r="14" fill="#FFFBF2" stroke-width="2.5"/>
          <path d="M320,243 L331,250 L320,257 Z" fill="#2C2C2A" stroke="none"/>
        </g>
        <text class="papan-label" style="--a:0s" x="88" y="326">1 · naskah</text>
        <text class="papan-label" style="--a:2s" x="210" y="326">2 · sketsa</text>
        <text class="papan-label" style="--a:4s" x="332" y="326">3 · jadi!</text>
        <rect x="32" y="342" width="356" height="12" rx="6" fill="#E9DDC1" stroke-width="2.5"/>
        <rect class="progres" x="32" y="342" width="356" height="12" rx="6" fill="#D85A30" stroke-width="2.5"/>
      </g>
    </svg>`;

  const TEMPAT = {
    kepala:  () => svg('26 16 148 122', `<g class="kucing">${kepala(WARNA.krem)}</g>`),
    papan:   () => HERO,
    besar:   () => `<svg viewBox="-34 0 268 216" role="img" aria-label="Maskot kucing motionbareng melambai"><g class="tinta">${kucing('krem', 'melambai')}</g>${
      [[-12, 70, 9, '0s'], [214, 46, 11, '-.8s'], [196, 10, 6, '-1.6s'], [6, 18, 6, '-1.2s']].map(([x, y, s, w]) =>
        `<g transform="translate(${x} ${y})"><path class="kilau" style="--w:${w}" d="M0,${-s} Q${s * .2},${-s * .2} ${s},0 Q${s * .2},${s * .2} 0,${s} Q${-s * .2},${s * .2} ${-s},0 Q${-s * .2},${-s * .2} 0,${-s}Z"/></g>`).join('')}</svg>`,
    harga:   () => svg('4 10 186 206', kucing('krem', 'melambai', '-1.5s'), 'Kucing motionbareng melambai'),
    penutup: () => svg('4 10 186 206', kucing('krem', 'melambai', '-.8s'), 'Kucing motionbareng melambai'),
    tab:     () => svg('4 10 186 206', kucing('oren', '', '-2s')),
    sesi:    () => '<span class="live">LIVE</span>' + ['krem', 'oren', 'kuning'].map(w =>
               `<span class="wajah-kecil">${svg('26 16 148 122', `<g class="kucing">${kepala(WARNA[w])}</g>`)}</span>`).join(''),
    bareng:  () => `<svg viewBox="0 0 560 236" role="img" aria-label="Tiga kucing melompat bergantian">${
      [['krem', 10, '0s'], ['oren', 180, '-1s'], ['kuning', 350, '-.5s']].map(([w, x, d]) => `
        <g transform="translate(${x},4)" style="--d:${d}">
          <ellipse class="bayang" cx="100" cy="214" rx="46" ry="6"/>
          <g class="tinta"><g class="lompat">${kucing(w, '', d)}</g></g>
        </g>`).join('')}</svg>`
  };
  $$('[data-kucing]').forEach(el => { el.innerHTML = TEMPAT[el.dataset.kucing](); });
  if ($('#kucing-bar')) $('#kucing-bar').innerHTML = svg('26 16 148 122', `<g class="kucing">${kepala(WARNA.krem, EKSPRESI)}</g>`);

  /* tapak yang nongol dari pinggir */
  const TAPAK = `<svg viewBox="0 0 170 84"><g class="tinta"><g class="tapak-ujung">
      <path fill="#FBF3E0" stroke-width="5" d="M-30,20 H116 C146,20 160,34 160,46 C160,62 144,74 116,74 H-30 Z"/>
      <ellipse cx="126" cy="48" rx="11" ry="9" fill="#F0997B" stroke="none"/>
      <circle cx="145" cy="34" r="4.5" fill="#F0997B" stroke="none"/><circle cx="151" cy="47" r="4.5" fill="#F0997B" stroke="none"/><circle cx="145" cy="60" r="4.5" fill="#F0997B" stroke="none"/>
      <path d="M96,26 q6,8 0,16" fill="none" stroke-width="3"/></g></g></svg>`;
  $$('.intip').forEach(el => { el.innerHTML = TAPAK; });

  /* ---------- latar: tepi kertas sobek & kunang-kunang ---------- */
  $$('[data-sobek]').forEach((sec, s) => {
    const r = acak(31 + s * 7);
    let d = 'M0,22 L0,' + (8 + r() * 8).toFixed(1);
    for (let x = 0; x <= 1200; x += 14 + r() * 22) d += ` L${x.toFixed(0)},${(3 + r() * 13).toFixed(1)}`;
    d += ' L1200,' + (6 + r() * 8).toFixed(1) + ' L1200,22 Z';
    sec.insertAdjacentHTML('afterbegin', `<svg class="sobek" viewBox="0 0 1200 22" preserveAspectRatio="none" aria-hidden="true"><path d="${d}"/></svg>`);
  });
  $$('.kunang').forEach((box, s) => {
    const r = acak(101 + s * 13), n = +box.dataset.n || 14;
    for (let i = 0; i < n; i++) {
      const el = document.createElement('i');
      el.style.cssText = `left:${r() * 100}%;top:${r() * 100}%;--s:${(3 + r() * 3).toFixed(1)}px;--dx:${(r() * 70 - 35).toFixed(0)}px;--dy:${(-10 - r() * 50).toFixed(0)}px;` +
        `--t1:${(6 + r() * 6).toFixed(1)}s;--t2:${(2 + r() * 2.5).toFixed(1)}s;--d1:${(-r() * 8).toFixed(1)}s;--d2:${(-r() * 3).toFixed(1)}s`;
      box.appendChild(el);
    }
  });

  /* ---------- harga & checkout ---------- */
  const normal = P.hargaNormal ?? 249000, promo = P.hargaPromo ?? 149000;
  const isi = { promo: rp(promo), normal: rp(normal), hemat: 'Hemat ' + rp(normal - promo) };
  $$('[data-harga]').forEach(el => { el.textContent = isi[el.dataset.harga]; });
  if (P.labelPromo) $$('[data-isi="labelPromo"]').forEach(el => { el.textContent = P.labelPromo; });
  const link = (P.linkCheckout || '').trim();
  const keHarga = $('#harga') ? '#harga' : 'kelas.html#harga';
  $$('[data-checkout]').forEach(a => {
    if (link) { a.href = link; a.target = '_blank'; a.rel = 'noopener'; } else a.href = keHarga;
  });
  if (!link) {
    const w = document.createElement('div');
    w.className = 'peringatan'; w.setAttribute('role', 'status');
    w.textContent = '⚠ Link checkout belum diisi. Buka file pengaturan.js lalu isi linkCheckout sebelum website di-upload.';
    document.body.appendChild(w);
  }

  /* ---------- karya ---------- */
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
  const rel = $('#rel-karya');
  if (rel) (P.karya || []).forEach((k, i) => {
    const jenis = k.jenis === 'shorts' ? 'shorts' : 'explainer';
    const kata = String(k.judul || '').split(' ').slice(-1)[0];
    const dalam = k.gambar ? `<img src="${esc(k.gambar)}" alt="" loading="lazy">` :
      `<div class="pola pola-${i % 3}"><i></i><i></i><i></i><i></i></div>
       <span class="judul-thumb">${esc(k.judul)}</span>
       ${jenis === 'shorts' ? `<span class="subtitle-thumb">${esc(kata)}</span>` : ''}`;
    const el = document.createElement(k.link ? 'a' : 'div');
    el.className = 'karya ' + jenis; el.dataset.jenis = jenis;
    if (k.link) { el.href = k.link; el.target = '_blank'; el.rel = 'noopener'; }
    el.innerHTML = `
      <div class="thumb w-${esc(k.warna || 'teal')}">
        ${dalam}
        ${k.contoh ? '<span class="chip-contoh">CONTOH</span>' : ''}
        ${k.durasi ? `<span class="durasi">${esc(k.durasi)}</span>` : ''}
        ${k.link ? '<span class="main" aria-hidden="true"></span>' : ''}
        <span class="bar-video" aria-hidden="true"></span>
      </div>
      <h4>${esc(k.judul)}</h4><p>${esc(k.oleh)}${k.durasi ? ' · ' + esc(k.durasi) : ''}</p>`;
    /* halaman bio punya baris terpisah untuk shorts supaya tinggi kartu tidak campur */
    (jenis === 'shorts' && $('#rel-shorts') ? $('#rel-shorts') : rel).appendChild(el);
  });
  /* filter: menyembunyikan baris explainer / shorts */
  $$('[data-saring]').forEach(b => b.addEventListener('click', () => {
    const pilih = b.dataset.saring;
    $$('[data-saring]').forEach(x => x.setAttribute('aria-pressed', x === b));
    $$('[data-baris]').forEach(baris => { baris.hidden = pilih !== 'semua' && baris.dataset.baris !== pilih; });
  }));
  /* panah: menggeser deretan di barisnya sendiri */
  $$('[data-geser]').forEach(b => b.addEventListener('click', () => {
    const deret = b.closest('.baris-karya')?.querySelector('.rel') || rel;
    deret.scrollBy({ left: b.dataset.geser * deret.clientWidth * .8, behavior: 'smooth' });
  }));

  /* ---------- penanda alat (Claude Code, ElevenLabs) ----------
     Pakai logo resmi kalau path-nya sudah diisi di pengaturan.js (logoAlat), kalau belum pakai ikon netral. */
  const IKON_ALAT = {
    claude: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="2.5" width="13" height="11" rx="2.5"/><path d="M4.5 6.5l2 1.5-2 1.5M8.5 10h3"/></svg>',
    elevenlabs: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 6v4M6 4v8M9 5.5v5M12 7v2"/></svg>'
  };
  const LOGO = P.logoAlat || {};
  $$('.alat').forEach(el => {
    const n = el.dataset.alat, logo = String(LOGO[n] || '').trim();
    el.insertAdjacentHTML('afterbegin', logo
      ? `<img src="${esc(logo)}" alt="" width="16" height="16">`
      : `<span class="alat-ikon" aria-hidden="true">${IKON_ALAT[n] || ''}</span>`);
  });

  /* ---------- demo cara kerja (ganti otomatis, berhenti kalau diklik) ---------- */
  if ($('#cara')) {
  $('#gelombang').innerHTML = Array.from({ length: 22 }, (_, i) => `<i style="--i:${i}"></i>`).join('');
  const tombolLangkah = $$('[data-langkah]'), demo = $$('[data-demo]');
  let langkah = 0, otomatis = true;
  const pilihLangkah = n => {
    langkah = n;
    tombolLangkah.forEach((b, i) => b.setAttribute('aria-selected', i === n));
    demo.forEach((d, i) => {
      d.classList.toggle('aktif', i === n);
      if (i === n) d.querySelectorAll('*').forEach(x => x.getAnimations().forEach(a => { a.cancel(); a.play(); }));
    });
  };
  tombolLangkah.forEach((b, i) => b.addEventListener('click', () => { otomatis = false; pilihLangkah(i); }));
  let cara = false;
  new IntersectionObserver(([e]) => { cara = e.isIntersecting; }).observe($('#cara'));
  setInterval(() => { if (otomatis && cara) pilihLangkah((langkah + 1) % demo.length); }, 4200);
  }

  /* ---------- tab buat siapa ---------- */
  const tabs = $$('.tab-daftar [role="tab"]');
  tabs.forEach((t, i) => t.addEventListener('click', () => {
    tabs.forEach((x, j) => { x.setAttribute('aria-selected', i === j); $('#tab-' + j).hidden = i !== j; });
    $('#tab-' + i).classList.add('terlihat');
  }));

  /* ---------- media sosial & kontak ---------- */
  const IKON = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.5 3 2.5 4.5 5 4.8"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M4 20l1.3-4A8 8 0 1 1 8 18.8z"/><path d="M9 9c0 3 3 6 6 6l1-1.5-2-1-1 1c-1-.5-2-1.5-2.5-2.5l1-1-1-2z" fill="currentColor" stroke="none"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 7l8 6 8-6"/></svg>'
  };
  const urlKontak = {
    instagram: P.instagram, tiktok: P.tiktok, youtube: P.youtube,
    whatsapp: P.whatsapp ? 'https://wa.me/' + String(P.whatsapp).replace(/\D/g, '') : '',
    email: P.email ? 'mailto:' + P.email : ''
  };
  Object.entries(urlKontak).forEach(([n, u]) => {
    if (!u) return;
    const a = document.createElement('a');
    a.href = u; a.innerHTML = IKON[n]; a.setAttribute('aria-label', n);
    if (!u.startsWith('mailto:')) { a.target = '_blank'; a.rel = 'noopener'; }
    $('#sosmed').appendChild(a);
  });
  $$('[data-kontak]').forEach(kontak => {
    if (urlKontak.whatsapp) kontak.innerHTML = `<a class="link-polos" href="${urlKontak.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>`;
    else if (urlKontak.email) kontak.innerHTML = `<a class="link-polos" href="${urlKontak.email}">email</a>`;
  });
  if ($('#tahun')) $('#tahun').textContent = new Date().getFullYear();

  /* ---------- tautan di halaman link bio (yang belum diisi otomatis disembunyikan) ---------- */
  const tautan = {
    masuk: (P.linkMasukKelas || '').trim(),
    tanya: urlKontak.whatsapp || (P.instagram ? P.instagram : ''),
    tips: (P.linkTipsGratis || P.instagram || '').trim()
  };
  $$('[data-tautan]').forEach(a => {
    const u = tautan[a.dataset.tautan];
    if (!u) { a.closest('li').hidden = true; return; }
    a.href = u; a.target = '_blank'; a.rel = 'noopener';
  });

  /* ---------- gerak saat scroll ---------- */
  const bar = $('#bar-beli'), kb = $('#kucing-bar');
  if (bar && $('#atas')) new IntersectionObserver(([e]) => {
    bar.classList.toggle('tampil', !e.isIntersecting && e.boundingClientRect.top < 0);
  }).observe($('#atas'));

  /* ekspresi kucing di bar mengikuti section yang sedang dilihat */
  if (kb) {
    const pengamatEks = new IntersectionObserver(entri => entri.forEach(e => {
      if (!e.isIntersecting || kb.dataset.eks === e.target.dataset.eks) return;
      kb.dataset.eks = e.target.dataset.eks;
      kb.classList.remove('loncat'); void kb.offsetWidth; kb.classList.add('loncat');
    }), { rootMargin: '-45% 0px -45% 0px' });
    $$('section[data-eks]').forEach(s => pengamatEks.observe(s));
  }

  /* tapak menyapa sekali per section */
  const pengamat = new IntersectionObserver(entri => entri.forEach(e => {
    if (!e.isIntersecting) return;
    const t = e.target.querySelector('.intip'); if (t) t.classList.add('sapa');
    pengamat.unobserve(e.target);
  }), { threshold: .35 });
  $$('.intip').forEach(t => pengamat.observe(t.parentElement));

  /* elemen naik pelan saat masuk layar */
  const naik = new IntersectionObserver(entri => entri.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('terlihat'); naik.unobserve(e.target); }
  }), { threshold: .15 });
  $$('.naik').forEach((el, i) => { el.style.transitionDelay = (i % 3) * 80 + 'ms'; naik.observe(el); });
})();
