/* =====================================================================
   MASKOT KUCING motionbareng (untuk area member)
   Bentuk kucing, ekspresi, tapak, tepi sobek, dan kunang-kunang DISALIN dari
   website/aset/js/umum.js supaya sama persis. Jangan menggambar ulang di sini:
   kalau bentuk kucing di website berubah, salin ulang bagian yang sama.

   Pakai di HTML:
     <span data-kucing="kepala"></span>                     kepala saja (logo)
     <div data-kucing="duduk" data-eks="senang"></div>      kucing duduk
     <div data-kucing="duduk" data-warna="oren" data-gaya="melambai"></div>
     <div data-kucing="besar"></div>                        kucing melambai + kilau
     <div class="intip kiri"></div>                         tapak nongol dari pinggir
     <section data-sobek>                                   tepi kertas sobek di atas
     <div class="kunang" data-n="12"></div>                 kunang-kunang
   warna: krem (utama), oren, kuning, teal
   ekspresi: biasa, senang, kagum, fokus, kaget, mikir
   Lalu panggil Maskot.hias(elemen).
   ===================================================================== */
(() => {
  /* angka acak yang selalu sama (posisi kunang-kunang & sobekan tidak berubah tiap dibuka) */
  const acak = seed => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));

  /* ---------- bentuk kucing (dari umum.js) ---------- */
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

  /* ekspresi (dari EKSPRESI di umum.js, dipisah per wajah) */
  const WAJAH = {
    biasa: mataBiasa + mulutBiasa,
    senang: `<path class="garis-tipis" d="M75,88 Q82,79 89,88 M111,88 Q118,79 125,88"/><path class="mulut" fill="#F0997B" d="M91,104 Q100,116 109,104 Z"/>`,
    kagum: `<path class="mata-isi" d="M82,76 l3,7 7,1 -5,5 1.5,7 -6.5,-3.5 -6.5,3.5 1.5,-7 -5,-5 7,-1z M118,76 l3,7 7,1 -5,5 1.5,7 -6.5,-3.5 -6.5,3.5 1.5,-7 -5,-5 7,-1z" fill="#2C2C2A"/>${mulutBiasa}`,
    fokus: `<ellipse class="mata-isi" cx="83" cy="82" rx="5.5" ry="7"/><ellipse class="mata-isi" cx="119" cy="82" rx="5.5" ry="7"/><path class="garis-tipis" d="M94,106 H106"/>`,
    kaget: `<circle cx="82" cy="85" r="9" fill="#fff" stroke-width="3"/><circle cx="118" cy="85" r="9" fill="#fff" stroke-width="3"/><circle class="mata-isi" cx="82" cy="85" r="4.5"/><circle class="mata-isi" cx="118" cy="85" r="4.5"/><ellipse cx="100" cy="108" rx="5" ry="6" fill="#2C2C2A" stroke="none"/>`,
    mikir: `<ellipse class="mata-isi" cx="88" cy="84" rx="5.5" ry="8"/><ellipse class="mata-isi" cx="124" cy="84" rx="5.5" ry="8"/><path class="garis-tipis" d="M93,107 Q100,103 108,106"/>`
  };

  const kucing = (w = 'krem', kelas = '', k = '0s', eks = 'biasa') => { const c = WARNA[w] || WARNA.krem; return `
    <g class="kucing ${kelas}" style="--k:${k}">
      <g class="ekor"><path class="ekor-garis" d="${D_EKOR}"/><path class="ekor-isi" stroke="${c.bulu}" d="${D_EKOR}"/></g>
      <g class="tubuh">
        <path class="badan" fill="${c.bulu}" d="M62,204 C50,204 46,184 52,154 C58,124 72,112 100,112 C128,112 142,124 148,154 C154,184 150,204 138,204 Z"/>
        ${kepala(c, WAJAH[eks] || WAJAH.biasa)}
      </g>
      <circle class="tapak tapak-kiri" fill="${c.bulu}" cx="82" cy="202" r="11"/>
      <circle class="tapak tapak-kanan" fill="${c.bulu}" cx="118" cy="202" r="11"/>
    </g>`; };
  const svg = (vb, isi, label) =>
    `<svg viewBox="${vb}" ${label ? `role="img" aria-label="${esc(label)}"` : 'aria-hidden="true" focusable="false"'}><g class="tinta">${isi}</g></svg>`;

  const kilau = () => [[-12, 70, 9, '0s'], [214, 46, 11, '-.8s'], [196, 10, 6, '-1.6s'], [6, 18, 6, '-1.2s']].map(([x, y, s, w]) =>
    `<g transform="translate(${x} ${y})"><path class="kilau" style="--w:${w}" d="M0,${-s} Q${s * .2},${-s * .2} ${s},0 Q${s * .2},${s * .2} 0,${s} Q${-s * .2},${s * .2} ${-s},0 Q${-s * .2},${-s * .2} 0,${-s}Z"/></g>`).join('');

  const TEMPAT = {
    kepala: o => svg('26 16 148 122', `<g class="kucing">${kepala(WARNA[o.warna] || WARNA.krem, WAJAH[o.eks] || WAJAH.biasa)}</g>`, o.label),
    duduk:  o => svg('4 10 186 206', kucing(o.warna, o.gaya, o.k, o.eks), o.label),
    besar:  o => `<svg viewBox="-34 0 268 216" ${o.label ? `role="img" aria-label="${esc(o.label)}"` : 'aria-hidden="true" focusable="false"'}><g class="tinta">${kucing(o.warna, 'melambai', o.k, o.eks)}</g>${kilau()}</svg>`
  };

  /* tapak yang nongol dari pinggir (dari umum.js) */
  const TAPAK = `<svg viewBox="0 0 170 84" aria-hidden="true" focusable="false"><g class="tinta"><g class="tapak-ujung">
      <path fill="#FBF3E0" stroke-width="5" d="M-30,20 H116 C146,20 160,34 160,46 C160,62 144,74 116,74 H-30 Z"/>
      <ellipse cx="126" cy="48" rx="11" ry="9" fill="#F0997B" stroke="none"/>
      <circle cx="145" cy="34" r="4.5" fill="#F0997B" stroke="none"/><circle cx="151" cy="47" r="4.5" fill="#F0997B" stroke="none"/><circle cx="145" cy="60" r="4.5" fill="#F0997B" stroke="none"/>
      <path d="M96,26 q6,8 0,16" fill="none" stroke-width="3"/></g></g></svg>`;

  /* filter garis "goyang" yang dipakai semua gambar tinta */
  const pasangFilter = () => {
    if (document.getElementById('goyang')) return;
    document.body.insertAdjacentHTML('afterbegin', `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
      <filter id="goyang" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="1" seed="3"/>
        <feDisplacementMap in="SourceGraphic" scale="2.2"/>
      </filter></svg>`);
  };

  /* tapak menyapa sekali saat terlihat */
  const pengamatTapak = 'IntersectionObserver' in window ? new IntersectionObserver(entri => entri.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('sapa');
    pengamatTapak.unobserve(e.target);
  }), { threshold: .35 }) : null;

  let nomorSobek = 0, nomorKunang = 0;
  const hias = (akar = document) => {
    pasangFilter();
    akar.querySelectorAll('[data-kucing]:not([data-siap])').forEach(el => {
      const d = el.dataset, buat = TEMPAT[d.kucing] || TEMPAT.duduk;
      el.innerHTML = buat({ warna: d.warna || 'krem', eks: d.eks || 'biasa', gaya: d.gaya || '', k: d.k || '0s', label: d.label || '' });
      el.dataset.siap = '1';
    });
    akar.querySelectorAll('.intip:not([data-siap])').forEach(el => {
      el.innerHTML = TAPAK; el.dataset.siap = '1'; el.setAttribute('aria-hidden', 'true');
      if (pengamatTapak) pengamatTapak.observe(el); else el.classList.add('sapa');
    });
    akar.querySelectorAll('[data-sobek]:not([data-siap])').forEach(sec => {
      const r = acak(31 + (nomorSobek++ % 9) * 7);
      let d = 'M0,22 L0,' + (8 + r() * 8).toFixed(1);
      for (let x = 0; x <= 1200; x += 14 + r() * 22) d += ` L${x.toFixed(0)},${(3 + r() * 13).toFixed(1)}`;
      d += ' L1200,' + (6 + r() * 8).toFixed(1) + ' L1200,22 Z';
      sec.insertAdjacentHTML('afterbegin', `<svg class="sobek" viewBox="0 0 1200 22" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="${d}"/></svg>`);
      sec.dataset.siap = '1';
    });
    akar.querySelectorAll('.kunang:not([data-siap])').forEach(box => {
      const r = acak(101 + (nomorKunang++ % 9) * 13), n = +box.dataset.n || 14;
      for (let i = 0; i < n; i++) {
        const el = document.createElement('i');
        el.style.cssText = `left:${r() * 100}%;top:${r() * 100}%;--s:${(3 + r() * 3).toFixed(1)}px;--dx:${(r() * 70 - 35).toFixed(0)}px;--dy:${(-10 - r() * 50).toFixed(0)}px;` +
          `--t1:${(6 + r() * 6).toFixed(1)}s;--t2:${(2 + r() * 2.5).toFixed(1)}s;--d1:${(-r() * 8).toFixed(1)}s;--d2:${(-r() * 3).toFixed(1)}s`;
        box.appendChild(el);
      }
      box.dataset.siap = '1'; box.setAttribute('aria-hidden', 'true');
    });
  };

  window.Maskot = { WARNA, EKSPRESI: Object.keys(WAJAH), kucing, kepala: (w = 'krem', eks = 'biasa', label = '') => TEMPAT.kepala({ warna: w, eks, label }), hias };
})();
