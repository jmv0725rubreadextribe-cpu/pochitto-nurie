/* ぽちっとぬりえ ― 塗り絵イラストデータ
   すべてオリジナルのイラストです。
   viewBox は共通で "0 0 400 300"。
   fill="#xxxxxx" の部分を白に置き換えると自動的に「白黒の線画」になります。
   （stroke は黒のまま残るので、線だけが残ります）                       */

const VIEWBOX = '0 0 400 300';

/* ------------------------------------------------------------------
   よく使う部品
   ------------------------------------------------------------------ */
const LN  = 'stroke="#000" stroke-width="6" stroke-linejoin="round"';
const LN5 = 'stroke="#000" stroke-width="5" stroke-linejoin="round"';
const LN4 = 'stroke="#000" stroke-width="4" stroke-linecap="round"';

/* タイヤ */
function tire(cx, cy, r){
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#8A8A8A" ${LN}/>` +
         `<circle cx="${cx}" cy="${cy}" r="${Math.round(r * 0.42)}" fill="#E4E4E4" ${LN5}/>`;
}

/* まる目 */
function eye(cx, cy, r){
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#333333" ${LN4}/>`;
}

/* にっこり口 */
function smile(cx, cy, w){
  return `<path d="M${cx} ${cy} Q${cx - w} ${cy + 16} ${cx - w - 4} ${cy + 2}" fill="none" ${LN4}/>` +
         `<path d="M${cx} ${cy} Q${cx + w} ${cy + 16} ${cx + w + 4} ${cy + 2}" fill="none" ${LN4}/>`;
}

/* 花びらを ぐるっと ならべる */
function petals(n, rx, ry, dist, color, opt){
  const o = opt || {};
  const cx = o.cx == null ? 200 : o.cx;
  const cy = o.cy == null ? 118 : o.cy;
  const sw = o.sw == null ? 5 : o.sw;
  const off = o.off || 0;
  let out = '';
  for (let i = 0; i < n; i++){
    const a = off + i * 360 / n;
    out += `<ellipse cx="${cx}" cy="${cy - dist}" rx="${rx}" ry="${ry}" fill="${color}"` +
           ` stroke="#000" stroke-width="${sw}" transform="rotate(${a} ${cx} ${cy})"/>`;
  }
  return out;
}

/* 先が割れた花びら（さくら・うめ用） */
function notchPetals(n, dist, color, opt){
  const o = opt || {};
  const cx = o.cx == null ? 200 : o.cx;
  const cy = o.cy == null ? 118 : o.cy;
  const w  = o.w  == null ? 34 : o.w;
  let out = '';
  for (let i = 0; i < n; i++){
    const a = i * 360 / n;
    const t = cy - dist;
    out += `<path d="M${cx} ${cy} C ${cx - w} ${cy - 24} ${cx - w + 2} ${t - 26} ${cx - 11} ${t - 34}` +
           ` L${cx} ${t - 16} L${cx + 11} ${t - 34}` +
           ` C ${cx + w - 2} ${t - 26} ${cx + w} ${cy - 24} ${cx} ${cy} Z"` +
           ` fill="${color}" stroke="#000" stroke-width="5" stroke-linejoin="round"` +
           ` transform="rotate(${a} ${cx} ${cy})"/>`;
  }
  return out;
}

/* 茎 */
function stem(color){
  return `<path d="M192 150 L192 286 L208 286 L208 150 Z" fill="${color || '#3EBB5A'}" ${LN}/>`;
}

/* 葉っぱ（side: -1=ひだり 1=みぎ） */
function leaf(side, color){
  const c = color || '#3EBB5A';
  const d = side > 0
    ? 'M206 230 Q266 192 292 236 Q254 274 206 244 Z'
    : 'M194 230 Q134 192 108 236 Q146 274 194 244 Z';
  return `<path d="${d}" fill="${c}" ${LN}/>`;
}

/* ぎざぎざの葉っぱ（たんぽぽ用） */
function jaggedLeaf(side, color){
  const c = color || '#3EBB5A';
  const d = side > 0
    ? 'M206 232 L232 214 L236 236 L262 222 L264 246 L292 240 Q268 280 206 250 Z'
    : 'M194 232 L168 214 L164 236 L138 222 L136 246 L108 240 Q132 280 194 250 Z';
  return `<path d="${d}" fill="${c}" ${LN}/>`;
}

/* 花のまんなか */
function core(r, color, opt){
  const o = opt || {};
  const cx = o.cx == null ? 200 : o.cx;
  const cy = o.cy == null ? 118 : o.cy;
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" ${LN5}/>`;
}

/* ==================================================================
   のりもの  12まい
   ================================================================== */
const NORIMONO = [
  { id:'kuruma', name:'くるま', svg: `
    <path d="M36 202 L36 168 Q36 152 56 149 L124 141 L163 104 Q172 94 188 94 L272 94 Q288 94 296 106 L318 142 L352 150 Q368 154 368 172 L368 202 Q368 212 356 212 L48 212 Q36 212 36 202 Z" fill="#EF4136" ${LN}/>
    <path d="M178 138 L206 108 L232 108 L232 138 Z" fill="#9BDCF5" ${LN5}/>
    <path d="M248 108 L276 108 L296 138 L248 138 Z" fill="#9BDCF5" ${LN5}/>
    <circle cx="352" cy="176" r="13" fill="#FFE14D" ${LN5}/>
    ${tire(120, 212, 40)}${tire(296, 212, 40)}` },

  { id:'densha', name:'でんしゃ', svg: `
    <rect x="46" y="60" width="308" height="32" rx="15" fill="#F7C948" ${LN}/>
    <rect x="62" y="86" width="276" height="126" rx="22" fill="#3D8BEA" ${LN}/>
    <rect x="88" y="106" width="64" height="56" rx="10" fill="#9BDCF5" ${LN5}/>
    <rect x="168" y="106" width="64" height="56" rx="10" fill="#9BDCF5" ${LN5}/>
    <rect x="248" y="106" width="64" height="56" rx="10" fill="#9BDCF5" ${LN5}/>
    <circle cx="306" cy="186" r="13" fill="#FFE14D" ${LN5}/>
    ${tire(110, 216, 28)}${tire(200, 216, 28)}${tire(290, 216, 28)}` },

  { id:'hikouki', name:'ひこうき', svg: `
    <path d="M62 162 L62 88 L128 152 Z" fill="#EF4136" ${LN}/>
    <ellipse cx="200" cy="166" rx="158" ry="42" fill="#ECECEC" ${LN}/>
    <path d="M172 182 L120 250 L204 250 L238 184 Z" fill="#3D8BEA" ${LN}/>
    <circle cx="150" cy="160" r="14" fill="#9BDCF5" ${LN5}/>
    <circle cx="200" cy="160" r="14" fill="#9BDCF5" ${LN5}/>
    <circle cx="250" cy="160" r="14" fill="#9BDCF5" ${LN5}/>
    <path d="M296 142 Q328 146 344 164 L296 168 Z" fill="#9BDCF5" ${LN5}/>` },

  { id:'basu', name:'ばす', svg: `
    <rect x="46" y="68" width="308" height="152" rx="26" fill="#F7C948" ${LN}/>
    <rect x="70" y="92" width="70" height="58" rx="10" fill="#9BDCF5" ${LN5}/>
    <rect x="152" y="92" width="70" height="58" rx="10" fill="#9BDCF5" ${LN5}/>
    <rect x="234" y="92" width="70" height="58" rx="10" fill="#9BDCF5" ${LN5}/>
    <rect x="170" y="158" width="60" height="62" rx="8" fill="#B8E3F5" ${LN5}/>
    <circle cx="330" cy="188" r="14" fill="#FFE14D" ${LN5}/>
    ${tire(105, 222, 36)}${tire(300, 222, 36)}` },

  { id:'shouboushya', name:'しょうぼうしゃ', svg: `
    <rect x="60" y="86" width="172" height="28" rx="8" fill="#F7C948" ${LN5}/>
    <line x1="96" y1="88" x2="96" y2="112" ${LN4}/>
    <line x1="132" y1="88" x2="132" y2="112" ${LN4}/>
    <line x1="168" y1="88" x2="168" y2="112" ${LN4}/>
    <line x1="204" y1="88" x2="204" y2="112" ${LN4}/>
    <rect x="40" y="124" width="200" height="96" rx="12" fill="#EF4136" ${LN}/>
    <path d="M244 94 L330 94 Q352 94 356 116 L364 162 L364 214 Q364 220 356 220 L244 220 Z" fill="#EF4136" ${LN}/>
    <rect x="264" y="110" width="72" height="46" rx="8" fill="#9BDCF5" ${LN5}/>
    <rect x="272" y="70" width="48" height="24" rx="11" fill="#3D8BEA" ${LN5}/>
    <rect x="70" y="150" width="140" height="46" rx="8" fill="#F2E2CE" ${LN5}/>
    ${tire(106, 222, 34)}${tire(300, 222, 34)}` },

  { id:'kyuukyuusha', name:'きゅうきゅうしゃ', svg: `
    <rect x="266" y="58" width="52" height="26" rx="12" fill="#EF4136" ${LN5}/>
    <path d="M46 108 L232 108 L232 222 L46 222 Q38 222 38 212 L38 118 Q38 108 46 108 Z" fill="#F7F7F7" ${LN}/>
    <path d="M232 108 L318 108 Q338 108 344 128 L360 168 L360 214 Q360 222 350 222 L232 222 Z" fill="#F7F7F7" ${LN}/>
    <rect x="252" y="124" width="76" height="48" rx="8" fill="#9BDCF5" ${LN5}/>
    <rect x="38" y="180" width="322" height="18" fill="#EF4136" stroke="none"/>
    <line x1="38" y1="180" x2="360" y2="180" ${LN4}/>
    <line x1="38" y1="198" x2="360" y2="198" ${LN4}/>
    <rect x="96" y="122" width="60" height="20" rx="4" fill="#EF4136" ${LN5}/>
    <rect x="116" y="102" width="20" height="60" rx="4" fill="#EF4136" ${LN5}/>
    ${tire(104, 222, 34)}${tire(300, 222, 34)}` },

  { id:'patoka', name:'ぱとかー', svg: `
    <path d="M36 202 L36 168 Q36 152 56 149 L124 141 L163 104 Q172 94 188 94 L272 94 Q288 94 296 106 L318 142 L352 150 Q368 154 368 172 L368 202 Q368 212 356 212 L48 212 Q36 212 36 202 Z" fill="#F2F2F2" ${LN}/>
    <path d="M36 168 Q36 152 56 149 L124 141 L124 190 L36 190 Z" fill="#22357A" ${LN5}/>
    <path d="M178 138 L206 108 L232 108 L232 138 Z" fill="#9BDCF5" ${LN5}/>
    <path d="M248 108 L276 108 L296 138 L248 138 Z" fill="#9BDCF5" ${LN5}/>
    <rect x="196" y="74" width="76" height="24" rx="11" fill="#EF4136" ${LN5}/>
    <circle cx="352" cy="176" r="13" fill="#FFE14D" ${LN5}/>
    ${tire(120, 212, 40)}${tire(296, 212, 40)}` },

  { id:'torakku', name:'とらっく', svg: `
    <rect x="34" y="86" width="196" height="130" rx="10" fill="#F7C948" ${LN}/>
    <line x1="34" y1="150" x2="230" y2="150" ${LN4}/>
    <path d="M242 118 L318 118 Q338 118 344 138 L362 176 L362 208 Q362 216 352 216 L242 216 Z" fill="#3D8BEA" ${LN}/>
    <rect x="258" y="132" width="72" height="44" rx="8" fill="#9BDCF5" ${LN5}/>
    <circle cx="352" cy="192" r="12" fill="#FFE14D" ${LN5}/>
    ${tire(96, 216, 34)}${tire(186, 216, 34)}${tire(310, 216, 34)}` },

  { id:'jitensha', name:'じてんしゃ', svg: `
    <circle cx="108" cy="196" r="64" fill="#EAF4FB" ${LN}/>
    <circle cx="292" cy="196" r="64" fill="#EAF4FB" ${LN}/>
    <circle cx="108" cy="196" r="14" fill="#8A8A8A" ${LN5}/>
    <circle cx="292" cy="196" r="14" fill="#8A8A8A" ${LN5}/>
    <path d="M108 196 L176 196 L214 118 L246 196 L292 196" fill="none" stroke="#000" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M176 196 L214 118" fill="none" stroke="#000" stroke-width="9" stroke-linecap="round"/>
    <path d="M214 118 L292 196" fill="none" stroke="#000" stroke-width="9" stroke-linecap="round"/>
    <path d="M160 108 L200 108" fill="none" stroke="#000" stroke-width="9" stroke-linecap="round"/>
    <path d="M180 108 L176 196" fill="none" stroke="#000" stroke-width="9" stroke-linecap="round"/>
    <path d="M236 106 L272 106 L268 122 L232 122 Z" fill="#EF4136" ${LN5}/>
    <path d="M246 122 L246 196" fill="none" stroke="#000" stroke-width="9" stroke-linecap="round"/>` },

  { id:'fune', name:'ふね', svg: `
    <rect x="150" y="60" width="24" height="86" fill="#EF4136" ${LN5}/>
    <rect x="186" y="86" width="92" height="60" rx="8" fill="#F7F7F7" ${LN5}/>
    <rect x="204" y="100" width="26" height="26" rx="5" fill="#9BDCF5" ${LN4}/>
    <rect x="242" y="100" width="26" height="26" rx="5" fill="#9BDCF5" ${LN4}/>
    <path d="M60 150 L344 150 L306 224 Q302 232 290 232 L114 232 Q102 232 98 224 Z" fill="#3D8BEA" ${LN}/>
    <circle cx="150" cy="190" r="16" fill="#FFE14D" ${LN5}/>
    <circle cx="204" cy="190" r="16" fill="#FFE14D" ${LN5}/>
    <circle cx="258" cy="190" r="16" fill="#FFE14D" ${LN5}/>
    <path d="M20 258 Q56 236 92 258 Q128 280 164 258 Q200 236 236 258 Q272 280 308 258 Q344 236 380 258" fill="none" stroke="#000" stroke-width="7" stroke-linecap="round"/>` },

  { id:'roketto', name:'ろけっと', svg: `
    <path d="M200 26 Q246 82 246 150 L246 214 L154 214 L154 150 Q154 82 200 26 Z" fill="#F2F2F2" ${LN}/>
    <path d="M154 158 Q106 182 100 244 L154 220 Z" fill="#EF4136" ${LN}/>
    <path d="M246 158 Q294 182 300 244 L246 220 Z" fill="#EF4136" ${LN}/>
    <path d="M200 26 Q228 60 238 100 L162 100 Q172 60 200 26 Z" fill="#EF4136" ${LN}/>
    <circle cx="200" cy="140" r="30" fill="#9BDCF5" ${LN}/>
    <rect x="154" y="214" width="92" height="22" rx="6" fill="#8A8A8A" ${LN5}/>
    <path d="M172 236 Q182 286 200 296 Q218 286 228 236 Z" fill="#FFB020" ${LN}/>
    <path d="M188 240 Q194 274 200 282 Q206 274 212 240 Z" fill="#FFE14D" ${LN5}/>` },

  { id:'herikoputa', name:'へりこぷたー', svg: `
    <rect x="188" y="46" width="24" height="34" rx="6" fill="#8A8A8A" ${LN5}/>
    <rect x="52" y="34" width="296" height="18" rx="9" fill="#E4E4E4" ${LN5}/>
    <ellipse cx="164" cy="164" rx="112" ry="76" fill="#3D8BEA" ${LN}/>
    <path d="M264 140 L360 156 L360 184 L268 192 Z" fill="#3D8BEA" ${LN}/>
    <path d="M348 128 L378 128 L378 200 L348 200 Z" fill="#EF4136" ${LN}/>
    <circle cx="126" cy="150" r="42" fill="#9BDCF5" ${LN}/>
    <path d="M92 244 L236 244" fill="none" stroke="#000" stroke-width="10" stroke-linecap="round"/>
    <path d="M116 238 L108 262" fill="none" stroke="#000" stroke-width="9" stroke-linecap="round"/>
    <path d="M212 238 L220 262" fill="none" stroke="#000" stroke-width="9" stroke-linecap="round"/>` }
];

/* ==================================================================
   どうぶつ  12ひき
   ================================================================== */
const DOUBUTSU = [
  { id:'neko', name:'ねこ', svg: `
    <path d="M274 250 Q344 256 334 198 Q330 180 348 180 Q362 180 362 198 Q372 274 280 280 Z" fill="#F7C948" ${LN}/>
    <path d="M126 108 L114 44 L172 78 Z" fill="#F7C948" ${LN}/>
    <path d="M274 108 L286 44 L228 78 Z" fill="#F7C948" ${LN}/>
    <ellipse cx="200" cy="228" rx="86" ry="62" fill="#F7C948" ${LN}/>
    <circle cx="200" cy="124" r="78" fill="#F7C948" ${LN}/>
    ${eye(172, 114, 12)}${eye(228, 114, 12)}
    <path d="M188 144 L212 144 L200 158 Z" fill="#FF8FA3" ${LN4}/>
    ${smile(200, 158, 16)}
    <line x1="146" y1="140" x2="104" y2="132" ${LN4}/>
    <line x1="146" y1="152" x2="104" y2="158" ${LN4}/>
    <line x1="254" y1="140" x2="296" y2="132" ${LN4}/>
    <line x1="254" y1="152" x2="296" y2="158" ${LN4}/>` },

  { id:'inu', name:'いぬ', svg: `
    <ellipse cx="124" cy="142" rx="27" ry="54" fill="#C08552" ${LN}/>
    <ellipse cx="276" cy="142" rx="27" ry="54" fill="#C08552" ${LN}/>
    <ellipse cx="200" cy="236" rx="88" ry="56" fill="#D9A066" ${LN}/>
    <circle cx="200" cy="126" r="76" fill="#D9A066" ${LN}/>
    <ellipse cx="200" cy="158" rx="46" ry="34" fill="#F2E2CE" ${LN5}/>
    ${eye(170, 104, 11)}${eye(230, 104, 11)}
    <ellipse cx="200" cy="142" rx="16" ry="12" fill="#333333" ${LN4}/>
    <line x1="200" y1="154" x2="200" y2="168" ${LN4}/>
    ${smile(200, 168, 14)}` },

  { id:'zou', name:'ぞう', svg: `
    <rect x="188" y="212" width="46" height="76" rx="14" fill="#B7C4CF" ${LN}/>
    <rect x="256" y="212" width="46" height="76" rx="14" fill="#B7C4CF" ${LN}/>
    <ellipse cx="250" cy="178" rx="104" ry="78" fill="#C9D6DF" ${LN}/>
    <circle cx="130" cy="162" r="74" fill="#C9D6DF" ${LN}/>
    <ellipse cx="160" cy="146" rx="42" ry="50" fill="#B7C4CF" ${LN}/>
    <path d="M78 190 Q32 232 58 284 L90 290 Q56 236 108 202 Z" fill="#C9D6DF" ${LN}/>
    ${eye(104, 146, 11)}` },

  { id:'usagi', name:'うさぎ', svg: `
    <ellipse cx="166" cy="72" rx="25" ry="60" fill="#FFF3F0" ${LN}/>
    <ellipse cx="234" cy="72" rx="25" ry="60" fill="#FFF3F0" ${LN}/>
    <ellipse cx="166" cy="76" rx="11" ry="40" fill="#FFB3C6" ${LN4}/>
    <ellipse cx="234" cy="76" rx="11" ry="40" fill="#FFB3C6" ${LN4}/>
    <ellipse cx="200" cy="238" rx="78" ry="52" fill="#FFF3F0" ${LN}/>
    <circle cx="200" cy="164" r="70" fill="#FFF3F0" ${LN}/>
    ${eye(174, 154, 11)}${eye(226, 154, 11)}
    <path d="M190 178 L210 178 L200 190 Z" fill="#FFB3C6" ${LN4}/>
    ${smile(200, 190, 12)}
    <rect x="192" y="196" width="16" height="20" rx="4" fill="#FFFFFF" ${LN4}/>
    <line x1="146" y1="176" x2="112" y2="170" ${LN4}/>
    <line x1="254" y1="176" x2="288" y2="170" ${LN4}/>` },

  { id:'kuma', name:'くま', svg: `
    <circle cx="136" cy="70" r="36" fill="#B5764A" ${LN}/>
    <circle cx="264" cy="70" r="36" fill="#B5764A" ${LN}/>
    <circle cx="136" cy="66" r="17" fill="#E8C39E" ${LN4}/>
    <circle cx="264" cy="66" r="17" fill="#E8C39E" ${LN4}/>
    <ellipse cx="200" cy="240" rx="90" ry="54" fill="#B5764A" ${LN}/>
    <ellipse cx="200" cy="248" rx="52" ry="38" fill="#E8C39E" ${LN5}/>
    <circle cx="200" cy="140" r="82" fill="#B5764A" ${LN}/>
    <ellipse cx="200" cy="172" rx="46" ry="34" fill="#E8C39E" ${LN5}/>
    ${eye(170, 120, 11)}${eye(230, 120, 11)}
    <ellipse cx="200" cy="158" rx="16" ry="12" fill="#333333" ${LN4}/>
    <line x1="200" y1="170" x2="200" y2="182" ${LN4}/>
    ${smile(200, 182, 14)}` },

  { id:'buta', name:'ぶた', svg: `
    <path d="M138 84 L120 34 L176 60 Z" fill="#FFB3C6" ${LN}/>
    <path d="M262 84 L280 34 L224 60 Z" fill="#FFB3C6" ${LN}/>
    <path d="M282 236 Q330 236 326 206" fill="none" stroke="#000" stroke-width="9" stroke-linecap="round"/>
    <ellipse cx="200" cy="234" rx="88" ry="58" fill="#FFC2D1" ${LN}/>
    <circle cx="200" cy="128" r="80" fill="#FFC2D1" ${LN}/>
    ${eye(168, 112, 12)}${eye(232, 112, 12)}
    <ellipse cx="200" cy="164" rx="42" ry="30" fill="#FF8FA3" ${LN}/>
    <ellipse cx="186" cy="164" rx="8" ry="12" fill="#333333" ${LN4}/>
    <ellipse cx="214" cy="164" rx="8" ry="12" fill="#333333" ${LN4}/>` },

  { id:'panda', name:'ぱんだ', svg: `
    <circle cx="132" cy="66" r="34" fill="#3A3A3A" ${LN}/>
    <circle cx="268" cy="66" r="34" fill="#3A3A3A" ${LN}/>
    <ellipse cx="200" cy="238" rx="86" ry="54" fill="#F7F7F7" ${LN}/>
    <ellipse cx="124" cy="240" rx="30" ry="42" fill="#3A3A3A" ${LN}/>
    <ellipse cx="276" cy="240" rx="30" ry="42" fill="#3A3A3A" ${LN}/>
    <circle cx="200" cy="136" r="82" fill="#F7F7F7" ${LN}/>
    <ellipse cx="166" cy="122" rx="26" ry="32" fill="#3A3A3A" ${LN5}/>
    <ellipse cx="234" cy="122" rx="26" ry="32" fill="#3A3A3A" ${LN5}/>
    <circle cx="166" cy="122" r="10" fill="#FFFFFF" ${LN4}/>
    <circle cx="234" cy="122" r="10" fill="#FFFFFF" ${LN4}/>
    <ellipse cx="200" cy="166" rx="17" ry="13" fill="#3A3A3A" ${LN4}/>
    <line x1="200" y1="179" x2="200" y2="190" ${LN4}/>
    ${smile(200, 190, 14)}` },

  { id:'kirin', name:'きりん', svg: `
    <rect x="176" y="216" width="34" height="72" rx="10" fill="#F7C948" ${LN}/>
    <rect x="252" y="216" width="34" height="72" rx="10" fill="#F7C948" ${LN}/>
    <ellipse cx="238" cy="200" rx="88" ry="60" fill="#FFD97D" ${LN}/>
    <path d="M118 96 L166 96 L184 190 L136 194 Z" fill="#FFD97D" ${LN}/>
    <ellipse cx="128" cy="76" rx="56" ry="42" fill="#FFD97D" ${LN}/>
    <line x1="104" y1="42" x2="98" y2="20" ${LN4}/>
    <line x1="146" y1="40" x2="152" y2="18" ${LN4}/>
    <circle cx="98" cy="16" r="10" fill="#A0653A" ${LN4}/>
    <circle cx="152" cy="14" r="10" fill="#A0653A" ${LN4}/>
    ${eye(112, 66, 10)}
    <ellipse cx="80" cy="88" rx="14" ry="10" fill="#A0653A" ${LN4}/>
    <circle cx="232" cy="176" r="20" fill="#C08552" ${LN5}/>
    <circle cx="286" cy="204" r="17" fill="#C08552" ${LN5}/>
    <circle cx="222" cy="226" r="16" fill="#C08552" ${LN5}/>
    <circle cx="150" cy="140" r="13" fill="#C08552" ${LN4}/>` },

  { id:'raion', name:'らいおん', svg: `
    <ellipse cx="200" cy="244" rx="72" ry="48" fill="#E8A33D" ${LN}/>
    ${petals(14, 24, 32, 98, '#B06A22', { cy:132 })}
    <circle cx="200" cy="132" r="102" fill="#C97B2E" ${LN}/>
    <circle cx="200" cy="132" r="72" fill="#F2C078" ${LN}/>
    ${eye(174, 118, 11)}${eye(226, 118, 11)}
    <ellipse cx="200" cy="152" rx="17" ry="13" fill="#333333" ${LN4}/>
    <line x1="200" y1="165" x2="200" y2="176" ${LN4}/>
    ${smile(200, 176, 15)}
    <line x1="152" y1="150" x2="116" y2="144" ${LN4}/>
    <line x1="152" y1="162" x2="116" y2="170" ${LN4}/>
    <line x1="248" y1="150" x2="284" y2="144" ${LN4}/>
    <line x1="248" y1="162" x2="284" y2="170" ${LN4}/>` },

  { id:'sakana', name:'さかな', svg: `
    <path d="M290 150 L364 96 L364 204 Z" fill="#FF8A4C" ${LN}/>
    <ellipse cx="180" cy="150" rx="122" ry="80" fill="#FFA857" ${LN}/>
    <path d="M170 74 L216 40 L226 82 Z" fill="#FF8A4C" ${LN}/>
    <path d="M170 226 L216 260 L226 218 Z" fill="#FF8A4C" ${LN}/>
    <circle cx="106" cy="128" r="18" fill="#FFFFFF" ${LN5}/>
    <circle cx="102" cy="128" r="9" fill="#333333" ${LN4}/>
    <path d="M62 158 Q78 176 100 178" fill="none" ${LN4}/>
    <path d="M200 88 Q220 150 200 212" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round"/>
    <circle cx="322" cy="62" r="14" fill="#9BDCF5" ${LN4}/>
    <circle cx="352" cy="34" r="9" fill="#9BDCF5" ${LN4}/>` },

  { id:'tori', name:'とり', svg: `
    <path d="M262 168 L346 130 L340 214 Z" fill="#6FC6F5" ${LN}/>
    <ellipse cx="182" cy="164" rx="98" ry="84" fill="#7FD8F7" ${LN}/>
    <ellipse cx="196" cy="176" rx="52" ry="44" fill="#EAF7FD" ${LN5}/>
    <circle cx="152" cy="98" r="52" fill="#7FD8F7" ${LN}/>
    ${eye(140, 90, 11)}
    <path d="M100 104 L60 116 L100 130 Z" fill="#FFB020" ${LN5}/>
    <path d="M162 244 L162 274" fill="none" stroke="#000" stroke-width="8" stroke-linecap="round"/>
    <path d="M162 274 L136 288" fill="none" stroke="#000" stroke-width="8" stroke-linecap="round"/>
    <path d="M162 274 L188 288" fill="none" stroke="#000" stroke-width="8" stroke-linecap="round"/>
    <path d="M212 240 L212 270" fill="none" stroke="#000" stroke-width="8" stroke-linecap="round"/>
    <path d="M212 270 L186 284" fill="none" stroke="#000" stroke-width="8" stroke-linecap="round"/>
    <path d="M212 270 L238 284" fill="none" stroke="#000" stroke-width="8" stroke-linecap="round"/>` },

  { id:'kame', name:'かめ', svg: `
    <ellipse cx="112" cy="180" rx="44" ry="34" fill="#8DD48A" ${LN}/>
    ${eye(96, 172, 10)}
    <ellipse cx="176" cy="238" rx="34" ry="24" fill="#8DD48A" ${LN}/>
    <ellipse cx="288" cy="238" rx="34" ry="24" fill="#8DD48A" ${LN}/>
    <path d="M330 194 Q374 190 372 216" fill="none" stroke="#000" stroke-width="9" stroke-linecap="round"/>
    <path d="M148 208 Q152 106 236 104 Q322 102 328 208 Z" fill="#5FA83F" ${LN}/>
    <path d="M238 104 L238 208" fill="none" stroke="#000" stroke-width="5"/>
    <path d="M170 160 Q238 148 310 160" fill="none" stroke="#000" stroke-width="5"/>
    <path d="M156 190 Q238 178 320 190" fill="none" stroke="#000" stroke-width="5"/>
    <path d="M192 120 L192 154" fill="none" stroke="#000" stroke-width="5"/>
    <path d="M286 120 L286 154" fill="none" stroke="#000" stroke-width="5"/>
    <path d="M176 166 L172 184" fill="none" stroke="#000" stroke-width="5"/>
    <path d="M302 166 L306 184" fill="none" stroke="#000" stroke-width="5"/>` }
];

/* ==================================================================
   おはな  12りん
   ================================================================== */
const OHANA = [
  { id:'tulip', name:'ちゅーりっぷ', svg: `
    ${stem()}${leaf(-1)}${leaf(1)}
    <path d="M136 92 Q136 68 156 68 Q170 68 174 88 Q182 62 200 62 Q218 62 226 88 Q230 68 244 68 Q264 68 264 92 L264 148 Q264 200 200 200 Q136 200 136 148 Z" fill="#EF4136" ${LN}/>
    <path d="M174 88 Q186 130 186 198" fill="none" stroke="#000" stroke-width="5"/>
    <path d="M226 88 Q214 130 214 198" fill="none" stroke="#000" stroke-width="5"/>` },

  { id:'himawari', name:'ひまわり', svg: `
    ${stem()}${leaf(-1)}${leaf(1)}
    ${petals(16, 17, 40, 56, '#FFD617')}
    ${core(44, '#A0653A')}
    <circle cx="200" cy="118" r="26" fill="#7A4A26" ${LN5}/>` },

  { id:'sakura', name:'さくら', svg: `
    <path d="M40 268 Q120 236 200 214 Q280 192 372 186 L374 208 Q284 214 208 236 Q132 258 48 288 Z" fill="#A0653A" ${LN}/>
    ${notchPetals(5, 46, '#FFC2D1')}
    ${core(20, '#FFD617')}
    <circle cx="96" cy="222" r="16" fill="#FFC2D1" ${LN5}/>
    <circle cx="316" cy="176" r="16" fill="#FFC2D1" ${LN5}/>` },

  { id:'bara', name:'ばら', svg: `
    ${stem()}${leaf(-1)}${leaf(1)}
    ${petals(7, 36, 42, 46, '#D62246')}
    ${petals(5, 28, 30, 26, '#EF4A63', { off:26 })}
    ${core(22, '#F2798F')}
    <path d="M188 112 Q212 106 214 124 Q216 142 196 138" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round"/>` },

  { id:'tanpopo', name:'たんぽぽ', svg: `
    ${stem()}${jaggedLeaf(-1)}${jaggedLeaf(1)}
    ${petals(20, 10, 44, 46, '#FFD617')}
    ${petals(12, 9, 28, 26, '#FFB300', { off:14 })}
    ${core(16, '#FF9A1E')}` },

  { id:'asagao', name:'あさがお', svg: `
    <path d="M200 156 L200 250 Q200 288 152 288" fill="none" stroke="#000" stroke-width="9" stroke-linecap="round"/>
    ${leaf(1, '#3EBB5A')}
    <circle cx="200" cy="118" r="88" fill="#7C5FE8" ${LN}/>
    <circle cx="200" cy="118" r="44" fill="#F7F2FF" ${LN5}/>
    <circle cx="200" cy="118" r="17" fill="#FFD617" ${LN5}/>
    <line x1="200" y1="30" x2="200" y2="76" stroke="#000" stroke-width="5"/>
    <line x1="262" y1="56" x2="230" y2="88" stroke="#000" stroke-width="5"/>
    <line x1="288" y1="118" x2="244" y2="118" stroke="#000" stroke-width="5"/>
    <line x1="262" y1="180" x2="230" y2="148" stroke="#000" stroke-width="5"/>
    <line x1="138" y1="56" x2="170" y2="88" stroke="#000" stroke-width="5"/>
    <line x1="112" y1="118" x2="156" y2="118" stroke="#000" stroke-width="5"/>` },

  { id:'kosumosu', name:'こすもす', svg: `
    ${stem()}${leaf(-1)}${leaf(1)}
    ${petals(8, 28, 38, 48, '#FF7EB6')}
    ${core(24, '#FFD617')}` },

  { id:'ume', name:'うめ', svg: `
    <path d="M28 286 Q92 220 168 186 Q252 148 372 140 L374 164 Q262 172 184 208 Q112 242 50 300 Z" fill="#7A4A26" ${LN}/>
    ${petals(5, 32, 32, 40, '#FF9EB5')}
    ${core(18, '#FFD617')}
    <circle cx="92" cy="240" r="20" fill="#FF9EB5" ${LN5}/>
    <circle cx="324" cy="182" r="20" fill="#FF9EB5" ${LN5}/>` },

  { id:'suzuran', name:'すずらん', svg: `
    ${leaf(-1)}${leaf(1)}
    <path d="M200 286 Q196 180 246 96" fill="none" stroke="#000" stroke-width="9" stroke-linecap="round"/>
    <path d="M212 200 L188 214" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round"/>
    <path d="M206 158 L246 166" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round"/>
    <path d="M218 116 L182 122" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round"/>
    <path d="M242 96 L272 108" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round"/>
    <path d="M188 214 q-26 6 -26 34 q0 24 26 24 q26 0 26 -24 q0 -28 -26 -34 Z" fill="#FFFFFF" ${LN5}/>
    <path d="M246 166 q-26 6 -26 34 q0 24 26 24 q26 0 26 -24 q0 -28 -26 -34 Z" fill="#FFFFFF" ${LN5}/>
    <path d="M182 122 q-24 6 -24 32 q0 22 24 22 q24 0 24 -22 q0 -26 -24 -32 Z" fill="#FFFFFF" ${LN5}/>
    <path d="M272 108 q-22 6 -22 30 q0 20 22 20 q22 0 22 -20 q0 -24 -22 -30 Z" fill="#FFFFFF" ${LN5}/>` },

  { id:'kaneshon', name:'かーねーしょん', svg: `
    ${stem()}${leaf(-1)}${leaf(1)}
    ${petals(12, 26, 30, 44, '#FF5C8A')}
    ${petals(10, 22, 24, 28, '#FF7EB6', { off:18 })}
    ${petals(7, 17, 18, 13, '#FF9EB5', { off:26 })}` },

  { id:'hanataba', name:'はなたば', svg: `
    <path d="M150 186 L250 186 L226 288 L174 288 Z" fill="#F7C948" ${LN}/>
    <path d="M150 186 L250 186 L244 212 L156 212 Z" fill="#FFE14D" ${LN5}/>
    <path d="M164 190 Q140 148 118 138" fill="none" stroke="#000" stroke-width="6" stroke-linecap="round"/>
    <path d="M236 190 Q260 148 282 138" fill="none" stroke="#000" stroke-width="6" stroke-linecap="round"/>
    <path d="M200 190 L200 130" fill="none" stroke="#000" stroke-width="6" stroke-linecap="round"/>
    ${petals(6, 18, 22, 24, '#FF7EB6', { cx:112, cy:124, sw:4 })}
    ${core(11, '#FFD617', { cx:112, cy:124 })}
    ${petals(6, 18, 22, 24, '#7C5FE8', { cx:288, cy:124, sw:4 })}
    ${core(11, '#FFD617', { cx:288, cy:124 })}
    ${petals(6, 20, 26, 28, '#EF4136', { cx:200, cy:104, sw:4 })}
    ${core(13, '#FFD617', { cx:200, cy:104 })}` },

  { id:'yotsuba', name:'よつば', svg: `
    <path d="M200 200 L200 288" fill="none" stroke="#000" stroke-width="9" stroke-linecap="round"/>
    <path d="M200 288 Q152 280 142 244" fill="none" stroke="#000" stroke-width="7" stroke-linecap="round"/>
    <path d="M200 158 C 150 100 96 128 108 172 C 118 208 176 206 200 190 Z" fill="#4FB861" ${LN}/>
    <path d="M200 158 C 250 100 304 128 292 172 C 282 208 224 206 200 190 Z" fill="#4FB861" ${LN}/>
    <path d="M200 178 C 146 190 132 244 172 262 C 206 276 214 218 200 196 Z" fill="#4FB861" ${LN}/>
    <path d="M200 178 C 254 190 268 244 228 262 C 194 276 186 218 200 196 Z" fill="#4FB861" ${LN}/>
    <circle cx="200" cy="182" r="14" fill="#8DD48A" ${LN5}/>` }
];

/* ==================================================================
   ページ（さいしょは まんなかの「のりもの」）
     ← ひだり = どうぶつ   みぎ → = おはな
   ================================================================== */
const PAGES = [
  { id:'doubutsu', name:'どうぶつ', icon:'🐰', art: DOUBUTSU },
  { id:'norimono', name:'のりもの', icon:'🚗', art: NORIMONO },
  { id:'ohana',    name:'おはな',   icon:'🌷', art: OHANA }
];
const START_PAGE = 1;

/* ==================================================================
   20しょくの パレット（ひらがな）
   ================================================================== */
const PALETTE = [
  { name:'あか',     color:'#EF3E36' },
  { name:'ももいろ',  color:'#FF9EB5' },
  { name:'ぴんく',   color:'#FF66A8' },
  { name:'おれんじ',  color:'#FF8A1E' },
  { name:'やまぶき',  color:'#FFB300' },
  { name:'きいろ',   color:'#FFD617' },
  { name:'くりーむ',  color:'#FFE9A8' },
  { name:'きみどり',  color:'#A8D63A' },
  { name:'みどり',   color:'#3EBB5A' },
  { name:'ふかみどり', color:'#17803C' },
  { name:'みずいろ',  color:'#7FD8F7' },
  { name:'そらいろ',  color:'#35A8E0' },
  { name:'あお',     color:'#2A6FDB' },
  { name:'こんいろ',  color:'#22357A' },
  { name:'むらさき',  color:'#9B5DE5' },
  { name:'ふじいろ',  color:'#C3A7E8' },
  { name:'ちゃいろ',  color:'#A0653A' },
  { name:'こげちゃ',  color:'#5A3720' },
  { name:'はいいろ',  color:'#9E9E9E' },
  { name:'くろ',     color:'#3A3A3A' }
];

/* カラー版のSVGを組み立てる */
function colorSvg(inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEWBOX}">${inner}</svg>`;
}

/* 塗り絵用の線画（白ぬき）SVGを組み立てる */
function lineSvg(inner) {
  const white = inner.replace(/fill="#[0-9a-fA-F]{3,8}"/g, 'fill="#FFFFFF"');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEWBOX}">${white}</svg>`;
}
