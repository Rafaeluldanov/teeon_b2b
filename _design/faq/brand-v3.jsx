/* V3 — Brand mark + logotype component (talk.to-style geometric mark) */

// Custom mark for МЕРЧ.ЦЕХ — stylized "T" with curved bowl (like a clothing tag)
const Mark = ({ size = 40, color = 'currentColor', bowl = 'currentColor' }) => (
  <svg width={size} height={size * 1.15} viewBox="0 0 100 116" fill="none" style={{ display: 'block' }}>
    {/* Vertical stem */}
    <rect x="40" y="14" width="20" height="86" rx="6" fill={color} />
    {/* Top crossbar */}
    <rect x="14" y="14" width="72" height="20" rx="6" fill={color} />
    {/* Curved bowl on the right of the stem (signature shape) */}
    <path d="M 60 50 Q 92 50 92 78 Q 92 100 60 100 Z" fill={bowl} />
    {/* Inner notch on the bowl for the brand "leaf" feel */}
    <circle cx="74" cy="78" r="9" fill={color} />
  </svg>
);

// Logotype (mark + wordmark)
const Logotype = ({ small = false, color = 'currentColor', mark = 'var(--blue)', bowl = 'var(--yellow)' }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: small ? 8 : 12 }}>
    <Mark size={small ? 22 : 36} color={mark} bowl={bowl} />
    <span style={{
      fontFamily: 'var(--display)',
      fontWeight: 800,
      fontSize: small ? 18 : 28,
      letterSpacing: '-0.025em',
      color,
    }}>
      мерч<span style={{ color: 'var(--yellow)' }}>.</span>цех
    </span>
  </span>
);

// Big star/burst icon used in strip and decorative spots
const Star = ({ size = 36, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <path d="M18 2 L21 14 L33 14 L23 22 L27 34 L18 26 L9 34 L13 22 L3 14 L15 14 Z" fill={color} />
  </svg>
);

// Photo placeholder — gradient with optional silhouette
const Photo = ({ tint = 'sand', kind, label, num, style, children }) => {
  const grads = {
    sand:   'linear-gradient(160deg, #e8d2a8 0%, #8c6b3a 100%)',
    sky:    'linear-gradient(160deg, #b6c8e6 0%, #324d8a 100%)',
    rose:   'linear-gradient(160deg, #f0c7c0 0%, #8a5a52 100%)',
    moss:   'linear-gradient(160deg, #c2cf9a 0%, #506b30 100%)',
    night:  'linear-gradient(160deg, #2a2f48 0%, #06080f 100%)',
    coal:   'linear-gradient(160deg, #3a3a44 0%, #0a0a10 100%)',
    cream:  'linear-gradient(160deg, #f0e8d4 0%, #b8a880 100%)',
  };
  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%',
      background: grads[tint] || grads.sand,
      borderRadius: 'inherit',
      overflow: 'hidden',
      ...style,
    }}>
      {/* subtle scan-overlay for texture */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(255,255,255,.08) 0%, rgba(0,0,0,.18) 70%, rgba(0,0,0,.45) 100%)',
        pointerEvents: 'none',
      }} />
      {num && (
        <div style={{
          position: 'absolute', top: 18, left: 22,
          fontFamily: 'var(--display)', fontSize: 12, fontWeight: 700,
          letterSpacing: '0.06em', color: 'rgba(255,255,255,.9)',
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
      </svg>
      {children}
      {label && (
        <div style={{
          position: 'absolute', left: 22, bottom: 18,
          fontFamily: 'var(--body)', fontWeight: 700, fontSize: 11,
          color: 'rgba(255,255,255,.95)',
          letterSpacing: '0.12em', textTransform: 'uppercase',
        }}>{label}</div>
      )}
    </div>
  );
};

const _f = 'rgba(0,0,0,.22)';
const Tee = () => <g fill={_f}><path d="M52 78 L74 56 L86 64 Q100 76 114 64 L126 56 L148 78 L138 96 L122 88 L122 188 L78 188 L78 88 L62 96 Z"/></g>;
const Hoodie = () => <g fill={_f}><path d="M70 70 Q70 50 100 50 Q130 50 130 70 L150 78 L142 100 L130 94 L130 188 L70 188 L70 94 L58 100 L50 78 Z"/></g>;
const Sweat = () => <g fill={_f}><path d="M52 78 L78 58 Q100 68 122 58 L148 78 L140 100 L128 94 L128 188 L72 188 L72 94 L60 100 Z"/></g>;
const LongSleeve = () => <g fill={_f}><path d="M40 70 L78 58 Q100 68 122 58 L160 70 L158 130 L140 124 L140 188 L60 188 L60 124 L42 130 Z"/></g>;
const Bag = () => <g fill={_f}><path d="M70 92 L130 92 L138 192 L62 192 Z"/><path d="M84 92 Q84 60 100 60 Q116 60 116 92" fill="none" stroke={_f} strokeWidth="6"/></g>;
const Vest = () => <g fill={_f}><path d="M58 78 L86 60 L100 70 L114 60 L142 78 L142 188 L114 188 L114 96 L86 96 L86 188 L58 188 Z"/></g>;
const Jacket = () => <g fill={_f}><path d="M50 78 L78 56 L98 60 L98 188 L60 188 Z"/><path d="M150 78 L122 56 L102 60 L102 188 L140 188 Z"/></g>;
const Raincoat = () => <g fill={_f}><path d="M64 80 Q64 56 100 56 Q136 56 136 80 L154 88 L144 110 L132 104 L132 196 L68 196 L68 104 L56 110 L46 88 Z"/></g>;
const Person = () => <g fill={_f}><circle cx="100" cy="80" r="26"/><path d="M60 230 Q60 130 100 130 Q140 130 140 230 Z"/></g>;
const Cap = () => <g fill={_f}><path d="M60 130 Q60 80 100 80 Q140 80 140 130 L155 138 L155 150 L45 150 L45 138 Z"/></g>;

window.Mark = Mark;
window.Logotype = Logotype;
window.Star = Star;
window.Photo = Photo;
