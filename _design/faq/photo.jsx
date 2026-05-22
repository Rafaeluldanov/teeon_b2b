// Photo placeholder components — colored blocks with mannequin/garment SVG silhouettes
// User can drop in real photos later

const PhotoFig = ({ kind, color, label, num, style, className = "", children }) => {
  return (
    <div className={`photo photo--${color || 'yellow'} ${className}`} style={style}>
      {num && <div className="photo__num">{num}</div>}
      <svg className="fig" viewBox="0 0 200 240" preserveAspectRatio="xMidYMid slice" aria-hidden>
        {kind === "tee" && <Tee />}
        {kind === "hoodie" && <Hoodie />}
        {kind === "sweat" && <Sweat />}
        {kind === "longsleeve" && <LongSleeve />}
        {kind === "bag" && <Bag />}
        {kind === "vest" && <Vest />}
        {kind === "jacket" && <Jacket />}
        {kind === "raincoat" && <Raincoat />}
        {kind === "person" && <Person />}
        {kind === "person2" && <Person2 />}
        {kind === "factory" && <Factory />}
        {kind === "machine" && <Machine />}
        {kind === "stack" && <Stack />}
        {kind === "logo" && <LogoMark />}
        {kind === "cap" && <Cap />}
        {kind === "embroidery" && <EmbroideryMark />}
      </svg>
      {children}
      {label && <div className="photo__label">{label}</div>}
    </div>
  );
};

const Tee = () => (
  <g fill="rgba(0,0,0,.16)">
    <path d="M52 78 L74 56 L86 64 Q100 76 114 64 L126 56 L148 78 L138 96 L122 88 L122 188 L78 188 L78 88 L62 96 Z"/>
  </g>
);
const Hoodie = () => (
  <g fill="rgba(0,0,0,.16)">
    <path d="M70 70 Q70 50 100 50 Q130 50 130 70 L150 78 L142 100 L130 94 L130 188 L70 188 L70 94 L58 100 L50 78 Z"/>
    <path d="M85 70 Q100 60 115 70 L115 84 L85 84 Z" fill="rgba(0,0,0,.12)"/>
  </g>
);
const Sweat = () => (
  <g fill="rgba(0,0,0,.16)">
    <path d="M52 78 L78 58 Q100 68 122 58 L148 78 L140 100 L128 94 L128 188 L72 188 L72 94 L60 100 Z"/>
  </g>
);
const LongSleeve = () => (
  <g fill="rgba(0,0,0,.16)">
    <path d="M40 70 L78 58 Q100 68 122 58 L160 70 L158 130 L140 124 L140 188 L60 188 L60 124 L42 130 Z"/>
  </g>
);
const Bag = () => (
  <g fill="rgba(0,0,0,.16)">
    <path d="M70 92 L130 92 L138 192 L62 192 Z"/>
    <path d="M84 92 Q84 60 100 60 Q116 60 116 92" fill="none" stroke="rgba(0,0,0,.16)" strokeWidth="6"/>
  </g>
);
const Vest = () => (
  <g fill="rgba(0,0,0,.16)">
    <path d="M58 78 L86 60 L100 70 L114 60 L142 78 L142 188 L114 188 L114 96 L86 96 L86 188 L58 188 Z"/>
  </g>
);
const Jacket = () => (
  <g fill="rgba(0,0,0,.16)">
    <path d="M50 78 L78 56 L98 60 L98 188 L60 188 Z"/>
    <path d="M150 78 L122 56 L102 60 L102 188 L140 188 Z"/>
  </g>
);
const Raincoat = () => (
  <g fill="rgba(0,0,0,.16)">
    <path d="M64 80 Q64 56 100 56 Q136 56 136 80 L154 88 L144 110 L132 104 L132 196 L68 196 L68 104 L56 110 L46 88 Z"/>
    <path d="M84 80 Q100 70 116 80 L116 96 L84 96 Z" fill="rgba(0,0,0,.10)"/>
  </g>
);
const Person = () => (
  <g fill="rgba(0,0,0,.18)">
    <circle cx="100" cy="80" r="26"/>
    <path d="M60 200 Q60 130 100 130 Q140 130 140 200 Z"/>
  </g>
);
const Person2 = () => (
  <g fill="rgba(0,0,0,.18)">
    <circle cx="100" cy="72" r="22"/>
    <path d="M70 200 L70 110 Q85 100 100 100 Q115 100 130 110 L130 200 Z"/>
  </g>
);
const Factory = () => (
  <g fill="rgba(0,0,0,.18)">
    <rect x="40" y="120" width="120" height="80"/>
    <path d="M40 120 L70 90 L70 120 Z"/>
    <path d="M70 120 L100 90 L100 120 Z"/>
    <path d="M100 120 L130 90 L130 120 Z"/>
    <rect x="60" y="160" width="14" height="20" fill="rgba(255,255,255,.4)"/>
    <rect x="90" y="160" width="14" height="20" fill="rgba(255,255,255,.4)"/>
    <rect x="120" y="160" width="14" height="20" fill="rgba(255,255,255,.4)"/>
  </g>
);
const Machine = () => (
  <g fill="rgba(0,0,0,.18)">
    <rect x="50" y="90" width="100" height="60" rx="6"/>
    <circle cx="74" cy="120" r="10" fill="rgba(255,255,255,.4)"/>
    <circle cx="126" cy="120" r="10" fill="rgba(255,255,255,.4)"/>
    <rect x="78" y="150" width="44" height="50"/>
  </g>
);
const Stack = () => (
  <g fill="rgba(0,0,0,.18)">
    <rect x="40" y="160" width="120" height="14"/>
    <rect x="44" y="140" width="112" height="14"/>
    <rect x="48" y="120" width="104" height="14"/>
    <rect x="52" y="100" width="96" height="14"/>
    <rect x="56" y="80" width="88" height="14"/>
  </g>
);
const LogoMark = () => (
  <g fill="rgba(0,0,0,.2)">
    <path d="M70 70 L100 130 L130 70 L130 170 L70 170 Z"/>
  </g>
);
const Cap = () => (
  <g fill="rgba(0,0,0,.18)">
    <path d="M60 130 Q60 80 100 80 Q140 80 140 130 L155 138 L155 150 L45 150 L45 138 Z"/>
  </g>
);
const EmbroideryMark = () => (
  <g fill="none" stroke="rgba(0,0,0,.25)" strokeWidth="3">
    <circle cx="100" cy="120" r="40"/>
    <circle cx="100" cy="120" r="24"/>
    <path d="M100 80 L100 160 M60 120 L140 120"/>
  </g>
);

window.PhotoFig = PhotoFig;
