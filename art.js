/* ぽちっとぬりえ ― 塗り絵イラストデータ
   すべてオリジナルのイラストです。
   viewBox は共通で "0 0 400 300"。
   fill="#xxxxxx" の部分を白に置き換えると自動的に「白黒の線画」になります。
   （stroke は黒のまま残るので、線だけが残ります）                       */

const VIEWBOX = '0 0 400 300';

const ART = [
  /* ============================ のりもの ============================ */
  {
    id: 'kuruma',
    name: 'くるま',
    svg: `
      <path d="M36 202 L36 168 Q36 152 56 149 L124 141 L163 104 Q172 94 188 94 L272 94 Q288 94 296 106 L318 142 L352 150 Q368 154 368 172 L368 202 Q368 212 356 212 L48 212 Q36 212 36 202 Z" fill="#EF4136" stroke="#000" stroke-width="6" stroke-linejoin="round"/>
      <path d="M178 138 L206 108 L232 108 L232 138 Z" fill="#9BDCF5" stroke="#000" stroke-width="5" stroke-linejoin="round"/>
      <path d="M248 108 L276 108 L296 138 L248 138 Z" fill="#9BDCF5" stroke="#000" stroke-width="5" stroke-linejoin="round"/>
      <circle cx="352" cy="176" r="13" fill="#FFE14D" stroke="#000" stroke-width="5"/>
      <circle cx="120" cy="212" r="40" fill="#8A8A8A" stroke="#000" stroke-width="6"/>
      <circle cx="120" cy="212" r="17" fill="#E4E4E4" stroke="#000" stroke-width="5"/>
      <circle cx="296" cy="212" r="40" fill="#8A8A8A" stroke="#000" stroke-width="6"/>
      <circle cx="296" cy="212" r="17" fill="#E4E4E4" stroke="#000" stroke-width="5"/>
    `
  },
  {
    id: 'densha',
    name: 'でんしゃ',
    svg: `
      <rect x="46" y="60" width="308" height="32" rx="15" fill="#F7C948" stroke="#000" stroke-width="6"/>
      <rect x="62" y="86" width="276" height="126" rx="22" fill="#3D8BEA" stroke="#000" stroke-width="6"/>
      <rect x="88" y="106" width="64" height="56" rx="10" fill="#9BDCF5" stroke="#000" stroke-width="5"/>
      <rect x="168" y="106" width="64" height="56" rx="10" fill="#9BDCF5" stroke="#000" stroke-width="5"/>
      <rect x="248" y="106" width="64" height="56" rx="10" fill="#9BDCF5" stroke="#000" stroke-width="5"/>
      <circle cx="306" cy="186" r="13" fill="#FFE14D" stroke="#000" stroke-width="5"/>
      <circle cx="110" cy="216" r="28" fill="#8A8A8A" stroke="#000" stroke-width="6"/>
      <circle cx="110" cy="216" r="11" fill="#E4E4E4" stroke="#000" stroke-width="4"/>
      <circle cx="200" cy="216" r="28" fill="#8A8A8A" stroke="#000" stroke-width="6"/>
      <circle cx="200" cy="216" r="11" fill="#E4E4E4" stroke="#000" stroke-width="4"/>
      <circle cx="290" cy="216" r="28" fill="#8A8A8A" stroke="#000" stroke-width="6"/>
      <circle cx="290" cy="216" r="11" fill="#E4E4E4" stroke="#000" stroke-width="4"/>
    `
  },
  {
    id: 'hikouki',
    name: 'ひこうき',
    svg: `
      <path d="M62 162 L62 88 L128 152 Z" fill="#EF4136" stroke="#000" stroke-width="6" stroke-linejoin="round"/>
      <ellipse cx="200" cy="166" rx="158" ry="42" fill="#ECECEC" stroke="#000" stroke-width="6"/>
      <path d="M172 182 L120 250 L204 250 L238 184 Z" fill="#3D8BEA" stroke="#000" stroke-width="6" stroke-linejoin="round"/>
      <circle cx="150" cy="160" r="14" fill="#9BDCF5" stroke="#000" stroke-width="5"/>
      <circle cx="200" cy="160" r="14" fill="#9BDCF5" stroke="#000" stroke-width="5"/>
      <circle cx="250" cy="160" r="14" fill="#9BDCF5" stroke="#000" stroke-width="5"/>
      <path d="M296 142 Q328 146 344 164 L296 168 Z" fill="#9BDCF5" stroke="#000" stroke-width="5" stroke-linejoin="round"/>
    `
  },
  {
    id: 'basu',
    name: 'ばす',
    svg: `
      <rect x="46" y="68" width="308" height="152" rx="26" fill="#F7C948" stroke="#000" stroke-width="6"/>
      <rect x="70" y="92" width="70" height="58" rx="10" fill="#9BDCF5" stroke="#000" stroke-width="5"/>
      <rect x="152" y="92" width="70" height="58" rx="10" fill="#9BDCF5" stroke="#000" stroke-width="5"/>
      <rect x="234" y="92" width="70" height="58" rx="10" fill="#9BDCF5" stroke="#000" stroke-width="5"/>
      <rect x="170" y="158" width="60" height="62" rx="8" fill="#B8E3F5" stroke="#000" stroke-width="5"/>
      <circle cx="330" cy="188" r="14" fill="#FFE14D" stroke="#000" stroke-width="5"/>
      <circle cx="105" cy="222" r="36" fill="#8A8A8A" stroke="#000" stroke-width="6"/>
      <circle cx="105" cy="222" r="15" fill="#E4E4E4" stroke="#000" stroke-width="5"/>
      <circle cx="300" cy="222" r="36" fill="#8A8A8A" stroke="#000" stroke-width="6"/>
      <circle cx="300" cy="222" r="15" fill="#E4E4E4" stroke="#000" stroke-width="5"/>
    `
  },
  {
    id: 'shouboushya',
    name: 'しょうぼうしゃ',
    svg: `
      <rect x="60" y="86" width="172" height="28" rx="8" fill="#F7C948" stroke="#000" stroke-width="5"/>
      <line x1="96" y1="88" x2="96" y2="112" stroke="#000" stroke-width="4"/>
      <line x1="132" y1="88" x2="132" y2="112" stroke="#000" stroke-width="4"/>
      <line x1="168" y1="88" x2="168" y2="112" stroke="#000" stroke-width="4"/>
      <line x1="204" y1="88" x2="204" y2="112" stroke="#000" stroke-width="4"/>
      <rect x="40" y="124" width="200" height="96" rx="12" fill="#EF4136" stroke="#000" stroke-width="6"/>
      <path d="M244 94 L330 94 Q352 94 356 116 L364 162 L364 214 Q364 220 356 220 L244 220 Z" fill="#EF4136" stroke="#000" stroke-width="6" stroke-linejoin="round"/>
      <rect x="264" y="110" width="72" height="46" rx="8" fill="#9BDCF5" stroke="#000" stroke-width="5"/>
      <rect x="272" y="70" width="48" height="24" rx="11" fill="#3D8BEA" stroke="#000" stroke-width="5"/>
      <rect x="70" y="150" width="140" height="46" rx="8" fill="#F2E2CE" stroke="#000" stroke-width="5"/>
      <circle cx="106" cy="222" r="34" fill="#8A8A8A" stroke="#000" stroke-width="6"/>
      <circle cx="106" cy="222" r="14" fill="#E4E4E4" stroke="#000" stroke-width="5"/>
      <circle cx="300" cy="222" r="34" fill="#8A8A8A" stroke="#000" stroke-width="6"/>
      <circle cx="300" cy="222" r="14" fill="#E4E4E4" stroke="#000" stroke-width="5"/>
    `
  },

  /* ============================ どうぶつ ============================ */
  {
    id: 'neko',
    name: 'ねこ',
    svg: `
      <path d="M274 250 Q344 256 334 198 Q330 180 348 180 Q362 180 362 198 Q372 274 280 280 Z" fill="#F7C948" stroke="#000" stroke-width="6" stroke-linejoin="round"/>
      <path d="M126 108 L114 44 L172 78 Z" fill="#F7C948" stroke="#000" stroke-width="6" stroke-linejoin="round"/>
      <path d="M274 108 L286 44 L228 78 Z" fill="#F7C948" stroke="#000" stroke-width="6" stroke-linejoin="round"/>
      <ellipse cx="200" cy="228" rx="86" ry="62" fill="#F7C948" stroke="#000" stroke-width="6"/>
      <circle cx="200" cy="124" r="78" fill="#F7C948" stroke="#000" stroke-width="6"/>
      <circle cx="172" cy="114" r="12" fill="#333333" stroke="#000" stroke-width="4"/>
      <circle cx="228" cy="114" r="12" fill="#333333" stroke="#000" stroke-width="4"/>
      <path d="M188 144 L212 144 L200 158 Z" fill="#FF8FA3" stroke="#000" stroke-width="4" stroke-linejoin="round"/>
      <path d="M200 158 Q184 176 170 162" fill="none" stroke="#000" stroke-width="4" stroke-linecap="round"/>
      <path d="M200 158 Q216 176 230 162" fill="none" stroke="#000" stroke-width="4" stroke-linecap="round"/>
      <line x1="146" y1="140" x2="104" y2="132" stroke="#000" stroke-width="4" stroke-linecap="round"/>
      <line x1="146" y1="152" x2="104" y2="158" stroke="#000" stroke-width="4" stroke-linecap="round"/>
      <line x1="254" y1="140" x2="296" y2="132" stroke="#000" stroke-width="4" stroke-linecap="round"/>
      <line x1="254" y1="152" x2="296" y2="158" stroke="#000" stroke-width="4" stroke-linecap="round"/>
    `
  },
  {
    id: 'inu',
    name: 'いぬ',
    svg: `
      <ellipse cx="124" cy="142" rx="27" ry="54" fill="#C08552" stroke="#000" stroke-width="6"/>
      <ellipse cx="276" cy="142" rx="27" ry="54" fill="#C08552" stroke="#000" stroke-width="6"/>
      <ellipse cx="200" cy="236" rx="88" ry="56" fill="#D9A066" stroke="#000" stroke-width="6"/>
      <circle cx="200" cy="126" r="76" fill="#D9A066" stroke="#000" stroke-width="6"/>
      <ellipse cx="200" cy="158" rx="46" ry="34" fill="#F2E2CE" stroke="#000" stroke-width="5"/>
      <circle cx="170" cy="104" r="11" fill="#333333" stroke="#000" stroke-width="4"/>
      <circle cx="230" cy="104" r="11" fill="#333333" stroke="#000" stroke-width="4"/>
      <ellipse cx="200" cy="142" rx="16" ry="12" fill="#333333" stroke="#000" stroke-width="4"/>
      <line x1="200" y1="154" x2="200" y2="168" stroke="#000" stroke-width="4" stroke-linecap="round"/>
      <path d="M200 168 Q186 182 174 170" fill="none" stroke="#000" stroke-width="4" stroke-linecap="round"/>
      <path d="M200 168 Q214 182 226 170" fill="none" stroke="#000" stroke-width="4" stroke-linecap="round"/>
    `
  },
  {
    id: 'zou',
    name: 'ぞう',
    svg: `
      <rect x="188" y="212" width="46" height="76" rx="14" fill="#B7C4CF" stroke="#000" stroke-width="6"/>
      <rect x="256" y="212" width="46" height="76" rx="14" fill="#B7C4CF" stroke="#000" stroke-width="6"/>
      <ellipse cx="250" cy="178" rx="104" ry="78" fill="#C9D6DF" stroke="#000" stroke-width="6"/>
      <circle cx="130" cy="162" r="74" fill="#C9D6DF" stroke="#000" stroke-width="6"/>
      <ellipse cx="160" cy="146" rx="42" ry="50" fill="#B7C4CF" stroke="#000" stroke-width="6"/>
      <path d="M78 190 Q32 232 58 284 L90 290 Q56 236 108 202 Z" fill="#C9D6DF" stroke="#000" stroke-width="6" stroke-linejoin="round"/>
      <circle cx="104" cy="146" r="11" fill="#333333" stroke="#000" stroke-width="4"/>
    `
  },
  {
    id: 'usagi',
    name: 'うさぎ',
    svg: `
      <ellipse cx="166" cy="72" rx="25" ry="60" fill="#FFF3F0" stroke="#000" stroke-width="6"/>
      <ellipse cx="234" cy="72" rx="25" ry="60" fill="#FFF3F0" stroke="#000" stroke-width="6"/>
      <ellipse cx="166" cy="76" rx="11" ry="40" fill="#FFB3C6" stroke="#000" stroke-width="4"/>
      <ellipse cx="234" cy="76" rx="11" ry="40" fill="#FFB3C6" stroke="#000" stroke-width="4"/>
      <ellipse cx="200" cy="238" rx="78" ry="52" fill="#FFF3F0" stroke="#000" stroke-width="6"/>
      <circle cx="200" cy="164" r="70" fill="#FFF3F0" stroke="#000" stroke-width="6"/>
      <circle cx="174" cy="154" r="11" fill="#333333" stroke="#000" stroke-width="4"/>
      <circle cx="226" cy="154" r="11" fill="#333333" stroke="#000" stroke-width="4"/>
      <path d="M190 178 L210 178 L200 190 Z" fill="#FFB3C6" stroke="#000" stroke-width="4" stroke-linejoin="round"/>
      <path d="M200 190 Q188 202 178 194" fill="none" stroke="#000" stroke-width="4" stroke-linecap="round"/>
      <path d="M200 190 Q212 202 222 194" fill="none" stroke="#000" stroke-width="4" stroke-linecap="round"/>
      <rect x="192" y="196" width="16" height="20" rx="4" fill="#FFFFFF" stroke="#000" stroke-width="4"/>
      <line x1="146" y1="176" x2="112" y2="170" stroke="#000" stroke-width="4" stroke-linecap="round"/>
      <line x1="254" y1="176" x2="288" y2="170" stroke="#000" stroke-width="4" stroke-linecap="round"/>
    `
  },
  {
    id: 'kuma',
    name: 'くま',
    svg: `
      <circle cx="136" cy="70" r="36" fill="#B5764A" stroke="#000" stroke-width="6"/>
      <circle cx="264" cy="70" r="36" fill="#B5764A" stroke="#000" stroke-width="6"/>
      <circle cx="136" cy="66" r="17" fill="#E8C39E" stroke="#000" stroke-width="4"/>
      <circle cx="264" cy="66" r="17" fill="#E8C39E" stroke="#000" stroke-width="4"/>
      <ellipse cx="200" cy="240" rx="90" ry="54" fill="#B5764A" stroke="#000" stroke-width="6"/>
      <ellipse cx="200" cy="248" rx="52" ry="38" fill="#E8C39E" stroke="#000" stroke-width="5"/>
      <circle cx="200" cy="140" r="82" fill="#B5764A" stroke="#000" stroke-width="6"/>
      <ellipse cx="200" cy="172" rx="46" ry="34" fill="#E8C39E" stroke="#000" stroke-width="5"/>
      <circle cx="170" cy="120" r="11" fill="#333333" stroke="#000" stroke-width="4"/>
      <circle cx="230" cy="120" r="11" fill="#333333" stroke="#000" stroke-width="4"/>
      <ellipse cx="200" cy="158" rx="16" ry="12" fill="#333333" stroke="#000" stroke-width="4"/>
      <line x1="200" y1="170" x2="200" y2="182" stroke="#000" stroke-width="4" stroke-linecap="round"/>
      <path d="M200 182 Q186 196 176 184" fill="none" stroke="#000" stroke-width="4" stroke-linecap="round"/>
      <path d="M200 182 Q214 196 224 184" fill="none" stroke="#000" stroke-width="4" stroke-linecap="round"/>
    `
  }
];

/* 10色のパレット（ひらがな） */
const PALETTE = [
  { name: 'あか',    color: '#EF3E36' },
  { name: 'おれんじ', color: '#FF8A1E' },
  { name: 'きいろ',  color: '#FFD617' },
  { name: 'みどり',  color: '#3EBB5A' },
  { name: 'みずいろ', color: '#4FC3F7' },
  { name: 'あお',    color: '#2A6FDB' },
  { name: 'むらさき', color: '#9B5DE5' },
  { name: 'ぴんく',  color: '#FF7EB6' },
  { name: 'ちゃいろ', color: '#A0653A' },
  { name: 'くろ',    color: '#3A3A3A' }
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
