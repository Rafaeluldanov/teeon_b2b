// V2 photo placeholders — gradient blobs / silhouettes for bento cards

const PhotoV2 = ({ kind = 'tee', tint = 'sand', shape = 'rect', label, style, num, children }) => {
  const grad = {
    sand:    'linear-gradient(160deg, #f2c46c 0%, #8a5a1a 100%)',
    lime:    'linear-gradient(160deg, #ddff5c 0%, #6c8a18 100%)',
    orange:  'linear-gradient(160deg, #ff8e63 0%, #c2370f 100%)',
    cool:    'linear-gradient(160deg, #cfd9e6 0%, #6e8aa6 100%)',
    plum:    'linear-gradient(160deg, #c8aede 0%, #5a3681 100%)',
    sea:     'linear-gradient(160deg, #b8e0d2 0%, #2f6e57 100%)',
    coal:    'linear-gradient(160deg, #4a4a44 0%, #0f110b 100%)',
    cream:   'linear-gradient(160deg, #f0ead8 0%, #c2b89a 100%)',
  };
  const radius = shape === 'blob'
    ? '48% 52% 60% 40% / 60% 50% 50% 40%'
    : shape === 'circle'
    ? '50%'
    : '24px';
  return (
    <div style={{
      position: 'relative',
      width: '100%', height: '100%',
      background: grad[tint] || grad.sand,
      borderRadius: radius,
      overflow: 'hidden',
      ...style,
    }}>
      {/* CRT-stripe overlay like the reference */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'repeating-linear-gradient(90deg, transparent 0 5px, rgba(255,255,255,.14) 5px 6px)',
        mixBlendMode: 'overlay',
        pointerEvents: 'none',
      }} />
      {num && (
        <div style={{
          position: 'absolute', top: 12, left: 14,
          fontFamily: 'var(--display)', fontSize: 12, fontWeight: 600,
          letterSpacing: '0.08em', color: 'rgba(255,255,255,.85)',
        }}>{num}</div>
      )}
      <svg viewBox="0 0 200 240" preserveAspectRatio="xMidYMid slice"
           style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {kind === 'tee'        && <Tee />}
        {kind === 'hoodie'     && <Hoodie />}
        {kind === 'sweat'      && <Sweat />}
        {kind === 'longsleeve' && <LongSleeve />}
        {kind === 'bag'        && <Bag />}
        {kind === 'vest'       && <Vest />}
        {kind === 'jacket'     && <Jacket />}
        {kind === 'raincoat'   && <Raincoat />}
        {kind === 'person'     && <Person />}
        {kind === 'cap'        && <Cap />}
        {kind === 'factory'    && <Factory />}
        {kind === 'machine'    && <Machine />}
        {kind === 'stack'      && <Stack />}
      </svg>
      {children}
      {label && (
        <div style={{
          position: 'absolute', left: 16, bottom: 14,
          fontFamily: 'var(--body)', fontWeight: 600, fontSize: 11,
          color: 'rgba(255,255,255,.92)',
          letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>{label}</div>
      )}
    </div>
  );
};

const _fill = 'rgba(0,0,0,.22)';
const Tee = () => <g fill={_fill}><path d="M52 78 L74 56 L86 64 Q100 76 114 64 L126 56 L148 78 L138 96 L122 88 L122 188 L78 188 L78 88 L62 96 Z"/></g>;
const Hoodie = () => <g fill={_fill}><path d="M70 70 Q70 50 100 50 Q130 50 130 70 L150 78 L142 100 L130 94 L130 188 L70 188 L70 94 L58 100 L50 78 Z"/></g>;
const Sweat = () => <g fill={_fill}><path d="M52 78 L78 58 Q100 68 122 58 L148 78 L140 100 L128 94 L128 188 L72 188 L72 94 L60 100 Z"/></g>;
const LongSleeve = () => <g fill={_fill}><path d="M40 70 L78 58 Q100 68 122 58 L160 70 L158 130 L140 124 L140 188 L60 188 L60 124 L42 130 Z"/></g>;
const Bag = () => <g fill={_fill}><path d="M70 92 L130 92 L138 192 L62 192 Z"/><path d="M84 92 Q84 60 100 60 Q116 60 116 92" fill="none" stroke={_fill} strokeWidth="6"/></g>;
const Vest = () => <g fill={_fill}><path d="M58 78 L86 60 L100 70 L114 60 L142 78 L142 188 L114 188 L114 96 L86 96 L86 188 L58 188 Z"/></g>;
const Jacket = () => <g fill={_fill}><path d="M50 78 L78 56 L98 60 L98 188 L60 188 Z"/><path d="M150 78 L122 56 L102 60 L102 188 L140 188 Z"/></g>;
const Raincoat = () => <g fill={_fill}><path d="M64 80 Q64 56 100 56 Q136 56 136 80 L154 88 L144 110 L132 104 L132 196 L68 196 L68 104 L56 110 L46 88 Z"/></g>;
const Person = () => <g fill={_fill}><circle cx="100" cy="80" r="26"/><path d="M60 230 Q60 130 100 130 Q140 130 140 230 Z"/></g>;
const Cap = () => <g fill={_fill}><path d="M60 130 Q60 80 100 80 Q140 80 140 130 L155 138 L155 150 L45 150 L45 138 Z"/></g>;
const Factory = () => <g fill={_fill}><rect x="40" y="120" width="120" height="80"/><path d="M40 120 L70 90 L70 120 Z"/><path d="M70 120 L100 90 L100 120 Z"/><path d="M100 120 L130 90 L130 120 Z"/></g>;
const Machine = () => <g fill={_fill}><rect x="50" y="90" width="100" height="60" rx="6"/><circle cx="74" cy="120" r="10" fill="rgba(255,255,255,.4)"/><circle cx="126" cy="120" r="10" fill="rgba(255,255,255,.4)"/><rect x="78" y="150" width="44" height="50"/></g>;
const Stack = () => <g fill={_fill}><rect x="40" y="160" width="120" height="14"/><rect x="44" y="140" width="112" height="14"/><rect x="48" y="120" width="104" height="14"/><rect x="52" y="100" width="96" height="14"/></g>;

window.PhotoV2 = PhotoV2;
