/* ぽちっとぬりえ ― 画面の動き */
(function(){
  'use strict';

  /* ---------- タイトルを1文字ずつ（ふわふわ用） ---------- */
  document.getElementById('appTitle').innerHTML =
    [...'ぽちっとぬりえ'].map(c => `<span class="c">${c}</span>`).join('');

  /* =========================================================
     タップの受け取り方

     iOS は touchmove を preventDefault() すると click を合成しない。
     Apple Pencil は先が細く、タップしただけでも微小な移動を報告するので
     毎回 touchmove が出て click が消えてしまう（指は出ないことが多い）。
     そのため click に頼らず、pointerdown → pointerup で拾う。
     指・Apple Pencil・マウスのどれでも同じように動く。
     ========================================================= */
  function diagTap(){ if (window.__diag) window.__diag.tap++; }
  function onTap(el, fn){
    if (!window.PointerEvent){ el.addEventListener('click', fn); return; }
    let id = null, sx = 0, sy = 0, moved = false;
    el.addEventListener('pointerdown', e => {
      id = e.pointerId; sx = e.clientX; sy = e.clientY; moved = false;
      try { el.setPointerCapture(e.pointerId); } catch (_) {}
    });
    el.addEventListener('pointermove', e => {
      if (e.pointerId !== id) return;
      if (Math.hypot(e.clientX - sx, e.clientY - sy) > 30) moved = true;  // 大きくずらしたら取り消し（小さい子の手ブレは許す）
    });
    el.addEventListener('pointerup', e => {
      if (e.pointerId !== id) return;
      id = null;
      if (!moved){ diagTap(); fn(e); }
    });
    el.addEventListener('pointercancel', () => { id = null; });
  }

  /* ---------- 画面切り替え ---------- */
  const screens = {
    title:  document.getElementById('titleScreen'),
    select: document.getElementById('selectScreen'),
    paint:  document.getElementById('paintScreen')
  };
  function show(name){
    for (const k in screens) screens[k].classList.toggle('on', k === name);
  }

  /* =========================================================
     BGM（ループ）
       iPad は「画面を触る前」には音を出せない決まりなので、
       最初の「タッチ」で鳴らしはじめる。
     ========================================================= */
  const SND_KEY = 'pochi.sound';
  const bgm = document.getElementById('bgm');
  const sndBtn = document.getElementById('sndBtn');
  let soundOn = localStorage.getItem(SND_KEY) !== 'off';
  bgm.volume = 0.35;

  function paintSndBtn(){ sndBtn.textContent = soundOn ? '🔊' : '🔇'; }
  function playBgm(){
    if (!soundOn) return;
    const p = bgm.play();
    if (p && p.catch) p.catch(() => {});   // まだ触られていない等は黙って無視
  }
  paintSndBtn();

  onTap(sndBtn, e => {
    e.stopPropagation();
    soundOn = !soundOn;
    localStorage.setItem(SND_KEY, soundOn ? 'on' : 'off');
    paintSndBtn();
    if (soundOn) playBgm(); else bgm.pause();
  });

  /* =========================================================
     タイトル画面の背景
       1. この端末に保存した画像  2. machiuke.jpg  3. haikei.svg
     ========================================================= */
  const BG_KEY = 'pochi.bg';
  const titleScreen = document.getElementById('titleScreen');
  function applyBg(url){ titleScreen.style.backgroundImage = 'url("' + url + '")'; }

  (function initBg(){
    const saved = localStorage.getItem(BG_KEY);
    if (saved){ applyBg(saved); return; }
    const probe = new Image();
    probe.onload = () => applyBg('machiuke.jpg');
    probe.src = 'machiuke.jpg';
  })();

  const bgBtn   = document.getElementById('bgBtn');
  const bgPanel = document.getElementById('bgPanel');
  const bgFile  = document.getElementById('bgFile');
  /* 長おしで開く（小さい子が誤って触らないように）。
     指が少しずれても切れないよう、押している間ポインタを掴んでおく。
     pointerleave では取り消さない ― Apple Pencil はホバーで
     leave が飛ぶことがあり、それで毎回キャンセルされてしまう。      */
  let bgTimer = null;
  function endHold(){
    clearTimeout(bgTimer);
    bgBtn.classList.remove('holding');
  }
  bgBtn.addEventListener('pointerdown', e => {
    e.preventDefault();
    try { bgBtn.setPointerCapture(e.pointerId); } catch (_) {}
    bgBtn.classList.add('holding');
    bgTimer = setTimeout(() => {
      bgBtn.classList.remove('holding');
      bgPanel.classList.add('on');
    }, 600);
  });
  ['pointerup','pointercancel'].forEach(t => bgBtn.addEventListener(t, endHold));

  onTap(document.getElementById('bgClose'), () => bgPanel.classList.remove('on'));
  onTap(document.getElementById('bgPick'), () => bgFile.click());
  onTap(document.getElementById('bgReset'), () => {
    localStorage.removeItem(BG_KEY);
    titleScreen.style.backgroundImage = '';
    bgPanel.classList.remove('on');
  });

  bgFile.addEventListener('change', () => {
    const file = bgFile.files && bgFile.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const im = new Image();
      im.onload = () => {
        const scale = Math.min(1, 1600 / im.width);
        const c = document.createElement('canvas');
        c.width  = Math.round(im.width  * scale);
        c.height = Math.round(im.height * scale);
        c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
        let url;
        try {
          url = c.toDataURL('image/jpeg', 0.82);
          localStorage.setItem(BG_KEY, url);
        } catch (_) {
          alert('がぞうが おおきすぎて ほぞんできませんでした');
          return;
        }
        applyBg(url);
        bgPanel.classList.remove('on');
      };
      im.src = reader.result;
    };
    reader.readAsDataURL(file);
    bgFile.value = '';
  });

  /* =========================================================
     えらぶ画面（3ページ）
     ========================================================= */
  const grid      = document.getElementById('grid');
  const pageTitle = document.getElementById('pageTitle');
  const prevBtn   = document.getElementById('prevBtn');
  const nextBtn   = document.getElementById('nextBtn');
  let page = START_PAGE;

  function drawPage(){
    const p = PAGES[page];
    pageTitle.textContent = p.name;
    grid.innerHTML = '';
    p.art.forEach(art => {
      const card = document.createElement('button');
      card.className = 'card';
      card.innerHTML = colorSvg(art.svg) + `<div class="label">${art.name}</div>`;
      onTap(card, () => openPaint(art));
      grid.appendChild(card);
    });
  }
  onTap(prevBtn, () => { page = (page - 1 + PAGES.length) % PAGES.length; drawPage(); });
  onTap(nextBtn, () => { page = (page + 1) % PAGES.length; drawPage(); });
  drawPage();

  onTap(document.getElementById('touchBtn'), () => { playBgm(); show('select'); });

  /* =========================================================
     ぬりえ画面
     ========================================================= */
  const canvas    = document.getElementById('paintCanvas');
  const ctx       = canvas.getContext('2d');
  const lineLayer = document.getElementById('lineLayer');
  const refImg    = document.getElementById('refImg');
  const paper     = document.getElementById('paper');
  const paperArea = paper.parentElement;

  const W = canvas.width, H = canvas.height;

  /* クレヨンのふとさ 3だん（まん中が これまでの太さ） */
  const SIZES = [
    { name:'ほそい', r:  8, dot:  8 },
    { name:'ふつう', r: 12, dot: 13 },
    { name:'ふとい', r: 20, dot: 21 }
  ];
  let sizeIndex = 1;
  let R = SIZES[sizeIndex].r;
  let ERASER_R = R * 3;

  let currentColor = PALETTE[0].color;
  let tool = 'crayon';

  /* --- パレット（20色・2だん） --- */
  const paletteEl = document.getElementById('palette');
  const swatches = [];
  PALETTE.forEach((p, i) => {
    const b = document.createElement('button');
    b.className = 'swatch' + (i === 0 ? ' sel' : '');
    b.innerHTML = `<span class="dot" style="background:${p.color}"></span><span class="nm">${p.name}</span>`;
    onTap(b, () => selectColor(i));
    paletteEl.appendChild(b);
    swatches.push(b);
  });

  /* --- クレヨンのふとさ 3だん --- */
  const sizesEl = document.getElementById('sizes');
  const sizeBtns = [];
  SIZES.forEach((sz, i) => {
    const b = document.createElement('button');
    b.className = 'size' + (i === sizeIndex ? ' sel' : '');
    b.innerHTML = `<span class="d" style="width:${sz.dot}px;height:${sz.dot}px"></span>` +
                  `<span class="t">${sz.name}</span>`;
    onTap(b, () => selectSize(i));
    sizesEl.appendChild(b);
    sizeBtns.push(b);
  });
  function selectSize(i){
    sizeIndex = i;
    R = SIZES[i].r;
    ERASER_R = R * 3;
    tipMasks = [];        // ふとさが変わったので 先の画像を作り直す
    buildTips();
    sizeBtns.forEach((b, j) => b.classList.toggle('sel', j === i));
  }

  const eraserBtn = document.getElementById('eraserBtn');
  function selectColor(i){
    currentColor = PALETTE[i].color;
    tool = 'crayon';
    buildTips();
    swatches.forEach((s, j) => s.classList.toggle('sel', j === i));
    eraserBtn.classList.remove('sel');
  }
  onTap(eraserBtn, () => {
    tool = 'eraser';
    swatches.forEach(s => s.classList.remove('sel'));
    eraserBtn.classList.add('sel');
  });

  onTap(document.getElementById('backBtn'), () => show('select'));

  /* --- 用紙を いつも 4:3 で いちばん大きく --- */
  function fitPaper(){
    if (!screens.paint.classList.contains('on')) return;
    const s = Math.min(paperArea.clientWidth / 4, paperArea.clientHeight / 3);
    paper.style.width  = Math.floor(s * 4) + 'px';
    paper.style.height = Math.floor(s * 3) + 'px';
  }
  window.addEventListener('resize', fitPaper);
  window.addEventListener('orientationchange', () => setTimeout(fitPaper, 250));

  let currentArt = null;
  function openPaint(art){
    currentArt = art;
    ctx.clearRect(0, 0, W, H);
    lineLayer.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(lineSvg(art.svg));
    refImg.innerHTML = colorSvg(art.svg);
    selectColor(0);
    show('paint');
    fitPaper();
  }

  /* --- クレヨン --- */
  function toCanvasXY(cx, cy){
    const r = canvas.getBoundingClientRect();
    return { x:(cx - r.left) * (W / r.width), y:(cy - r.top) * (H / r.height) };
  }

  /* -------------------------------------------------------------
     クレヨンの質感

     まる を描くのではなく、あらかじめ「クレヨンの先」の画像を
     8種類つくっておき、それをランダムに選んで押していく。
     先の画像は、中心が濃くふちがかすれた円から、こまかい穴を
     たくさんあけたもの。紙の目にワックスが乗りきらない感じが出る。
     一度なぞると かすれ、何度も重ねると だんだん濃くなる。
     ------------------------------------------------------------- */
  const TIP_VARIANTS = 8;
  let tipMasks = [];   // 白黒のかたち（ふとさが変わったら作り直す）
  let tips = [];       // 色をつけたもの（色が変わったら作り直す）

  function buildTipMasks(){
    tipMasks = [];
    const size = R * 2 + 6;
    for (let v = 0; v < TIP_VARIANTS; v++){
      const c = document.createElement('canvas');
      c.width = c.height = size;
      const g = c.getContext('2d');
      const m = size / 2;

      // 芯のかたち（まん中が濃く、ふちに向かってかすれる）
      const grad = g.createRadialGradient(m, m, R * 0.1, m, m, R);
      grad.addColorStop(0,    'rgba(0,0,0,1)');
      grad.addColorStop(0.70, 'rgba(0,0,0,0.97)');
      grad.addColorStop(0.92, 'rgba(0,0,0,0.72)');
      grad.addColorStop(1,    'rgba(0,0,0,0)');
      g.fillStyle = grad;
      g.beginPath(); g.arc(m, m, R, 0, 6.2832); g.fill();

      // ふちを でこぼこにする
      g.globalCompositeOperation = 'destination-out';
      for (let i = 0; i < 10; i++){
        const a = Math.random() * 6.2832;
        const d = R * (0.75 + Math.random() * 0.45);
        g.globalAlpha = 0.35 + Math.random() * 0.5;
        g.beginPath();
        g.arc(m + Math.cos(a) * d, m + Math.sin(a) * d, R * (0.16 + Math.random() * 0.22), 0, 6.2832);
        g.fill();
      }
      // 紙の目（こまかい穴）
      // 目の大きさは紙のものなので、クレヨンが太くなっても変えない。
      // 数だけ面積に合わせて増やす（そうしないと太い方だけ薄くなる）。
      const holes = Math.round(Math.PI * R * R * 0.34);
      for (let i = 0; i < holes; i++){
        const a = Math.random() * 6.2832;
        const d = Math.sqrt(Math.random()) * R;
        g.globalAlpha = 0.25 + Math.random() * 0.65;
        g.beginPath();
        g.arc(m + Math.cos(a) * d, m + Math.sin(a) * d, 0.45 + Math.random() * 1.25, 0, 6.2832);
        g.fill();
      }
      g.globalAlpha = 1;
      g.globalCompositeOperation = 'source-over';
      tipMasks.push(c);
    }
  }

  function shade(hex, amt){
    const n = parseInt(hex.slice(1), 16);
    const cl = v => Math.max(0, Math.min(255, v));
    return 'rgb(' + cl(((n >> 16) & 255) + amt) + ',' +
                    cl(((n >> 8) & 255) + amt) + ',' +
                    cl((n & 255) + amt) + ')';
  }

  function buildTips(){
    if (!tipMasks.length) buildTipMasks();
    tips = tipMasks.map((mask, i) => {
      const c = document.createElement('canvas');
      c.width = mask.width; c.height = mask.height;
      const g = c.getContext('2d');
      g.drawImage(mask, 0, 0);
      g.globalCompositeOperation = 'source-in';
      g.fillStyle = shade(currentColor, -9 + i * 3);   // 少しずつ濃さを変える
      g.fillRect(0, 0, c.width, c.height);
      return c;
    });
  }

  let penPressure = 0;                                  // Apple Pencil のときだけ入る
  function strokeAlpha(){
    return penPressure > 0 ? 0.24 + penPressure * 0.46 : 0.48;
  }

  function stamp(x, y){
    const t = tips[(Math.random() * tips.length) | 0];
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = strokeAlpha();
    ctx.drawImage(t, x - t.width / 2, y - t.height / 2);
    ctx.globalAlpha = 1;
  }

  function erase(x0, y0, x1, y1){
    ctx.globalCompositeOperation = 'destination-out';
    ctx.globalAlpha = 1;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.lineWidth = ERASER_R * 2;
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
    ctx.globalCompositeOperation = 'source-over';
  }

  function drawLine(x0, y0, x1, y1){
    if (tool === 'eraser'){ erase(x0, y0, x1, y1); return; }
    const dist = Math.hypot(x1 - x0, y1 - y0);
    const n = Math.max(1, Math.ceil(dist / (R * 0.28)));
    for (let i = 1; i <= n; i++){
      const t = i / n;
      stamp(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t);
    }
  }

  /* =========================================================
     入力 ― ゆびでも Apple Pencil でも描けるようにする

     ふつうは Pointer Events だけで足りるが、iPad の設定や
     iPadOS の版によっては Apple Pencil の Pointer Events が
     届かないことがある。そのため Touch Events でも同じ処理を
     呼べるようにしてある（Apple Pencil は touchType が
     "stylus" の Touch Event を必ず出す）。
     二重に描かないよう、直前に Pointer が来ていたら Touch は無視する。
     ========================================================= */
  const active = new Map();
  let lastPointerAt = 0;

  const diag = { pointer:{}, touch:{}, tap:0 };
  window.__diag = diag;
  function note(box, key){
    diag[box][key || '?'] = (diag[box][key || '?'] || 0) + 1;
  }

  function begin(id, cx, cy){
    const p = toCanvasXY(cx, cy);
    active.set(id, p);
    if (tool === 'eraser') erase(p.x, p.y, p.x, p.y); else stamp(p.x, p.y);
  }
  function move(id, pts){
    const prev = active.get(id);
    if (!prev) return;
    let last = prev;
    for (const pt of pts){
      const p = toCanvasXY(pt.x, pt.y);
      drawLine(last.x, last.y, p.x, p.y);
      last = p;
    }
    active.set(id, last);
  }
  function end(id){ active.delete(id); }

  /* --- Pointer Events（本線） --- */
  function readPressure(e){
    penPressure = (e.pointerType === 'pen' && e.pressure > 0) ? e.pressure : 0;
  }

  paper.addEventListener('pointerdown', e => {
    lastPointerAt = performance.now();
    note('pointer', e.pointerType);
    readPressure(e);
    e.preventDefault();
    try { paper.setPointerCapture(e.pointerId); } catch (_) {}
    begin(e.pointerId, e.clientX, e.clientY);
  });
  paper.addEventListener('pointermove', e => {
    lastPointerAt = performance.now();
    if (!active.has(e.pointerId)) return;
    readPressure(e);
    e.preventDefault();
    const evts = (e.getCoalescedEvents && e.getCoalescedEvents().length) ? e.getCoalescedEvents() : [e];
    move(e.pointerId, evts.map(v => ({ x:v.clientX, y:v.clientY })));
  });
  ['pointerup','pointercancel'].forEach(t => paper.addEventListener(t, e => {
    lastPointerAt = performance.now();
    end(e.pointerId);
  }));

  /* --- Touch Events（Pointer が届かない端末むけの予備） --- */
  function pointerAlive(){ return performance.now() - lastPointerAt < 500; }

  paper.addEventListener('touchstart', e => {
    note('touch', (e.changedTouches[0] || {}).touchType);
    if (pointerAlive()) return;
    e.preventDefault();
    for (const t of e.changedTouches) begin('t' + t.identifier, t.clientX, t.clientY);
  }, { passive:false });

  paper.addEventListener('touchmove', e => {
    if (pointerAlive()) return;
    e.preventDefault();
    for (const t of e.changedTouches) move('t' + t.identifier, [{ x:t.clientX, y:t.clientY }]);
  }, { passive:false });

  ['touchend','touchcancel'].forEach(n => paper.addEventListener(n, e => {
    for (const t of e.changedTouches) end('t' + t.identifier);
  }, { passive:false }));

  /* --- しらべる画面（みほんを1秒 長おし） --- */
  const diagModal = document.getElementById('diagModal');
  const diagText  = document.getElementById('diagText');
  const refBox    = document.querySelector('.ref');
  let diagTimer = null;
  refBox.addEventListener('pointerdown', () => {
    diagTimer = setTimeout(() => {
      const fmt = o => Object.keys(o).length ? Object.keys(o).map(k => k + ' × ' + o[k]).join('  /  ') : 'まだ来ていません';
      diagText.innerHTML =
        'Pointer Events<br>' + fmt(diag.pointer) +
        '<br><br>Touch Events<br>' + fmt(diag.touch) +
        '<br><br>ボタンが反応した回数: ' + diag.tap +
        '<br>maxTouchPoints: ' + navigator.maxTouchPoints;
      diagModal.classList.add('on');
    }, 1000);
  });
  ['pointerup','pointerleave','pointercancel'].forEach(t =>
    refBox.addEventListener(t, () => clearTimeout(diagTimer)));
  onTap(document.getElementById('diagClose'), () => diagModal.classList.remove('on'));

  /* =========================================================
     ぜんぶけす
     ========================================================= */
  const clearModal = document.getElementById('clearModal');
  onTap(document.getElementById('clearBtn'), () => clearModal.classList.add('on'));
  onTap(document.getElementById('clearNo'), () => clearModal.classList.remove('on'));
  onTap(document.getElementById('clearYes'), () => {
    ctx.clearRect(0, 0, W, H);
    clearModal.classList.remove('on');
  });

  /* =========================================================
     ほぞん（塗った絵を1枚の画像にする）
     ========================================================= */
  const saveModal = document.getElementById('saveModal');
  const saveImg   = document.getElementById('saveImg');
  const saveMsg   = document.getElementById('saveMsg');

  onTap(document.getElementById('saveBtn'), () => {
    const ex = document.createElement('canvas');
    ex.width = W; ex.height = H;
    const g = ex.getContext('2d');
    g.fillStyle = '#FFFFFF';
    g.fillRect(0, 0, W, H);
    g.drawImage(canvas, 0, 0);
    g.globalCompositeOperation = 'multiply';
    g.drawImage(lineLayer, 0, 0, W, H);
    let url = '';
    try {
      url = ex.toDataURL('image/png');
    } catch (_) {
      saveImg.removeAttribute('src');
      saveMsg.innerHTML = 'ごめんね、ほぞんできなかったよ。<br>ホームボタンと でんげんボタンを<br>いっしょに おして スクリーンショットしてね';
      saveModal.classList.add('on');
      return;
    }
    saveImg.src = url;
    saveMsg.innerHTML = 'えを ながおしして<br>「"写真"に追加」を えらんでね';
    saveModal.classList.add('on');
  });
  onTap(document.getElementById('saveClose'), () => {
    saveModal.classList.remove('on');
    saveImg.removeAttribute('src');
  });

  /* ---------- 画面のズーム・スクロールを止める ---------- */
  document.addEventListener('gesturestart', e => e.preventDefault());
  // ぬりえの紙の上だけスクロールを止める。
  // ページ全体で止めると iOS が click を合成しなくなり、
  // Apple Pencil でボタンが押せなくなる。
  document.addEventListener('touchmove', e => {
    if (e.target && e.target.closest && e.target.closest('.paper')) e.preventDefault();
  }, { passive:false });
  document.addEventListener('dblclick', e => e.preventDefault());

  /* ---------- オフライン ---------- */
  if ('serviceWorker' in navigator &&
      (location.protocol === 'https:' || location.hostname === 'localhost')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js'));
  }
})();
