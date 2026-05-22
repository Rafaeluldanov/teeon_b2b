/* V4 brand — Morrow-style custom М mark + wordmark + photo placeholders */

// Custom "M" mark — two rounded peaks with notch (Morrow-inspired but our own)
const MarkV4 = ({ size = 80, color = 'currentColor', style }) => (
  <svg width={size} height={size * 0.92} viewBox="0 0 110 100" fill="none" style={{ display: 'block', ...style }}>
    {/* Bold M silhouette built from rounded curves */}
    <path
      d="M 6 96
         L 6 30
         Q 6 8 28 8
         Q 42 8 50 26
         L 55 38
         L 60 26
         Q 68 8 82 8
         Q 104 8 104 30
         L 104 96
         L 80 96
         L 80 42
         Q 80 36 74 36
         Q 68 36 64 46
         L 55 66
         L 46 46
         Q 42 36 36 36
         Q 30 36 30 42
         L 30 96
         Z"
      fill={color}
    />
    {/* small circular notch inside left peak */}
    <circle cx="42" cy="50" r="5" fill="var(--bg, #F5EFD8)" />
  </svg>
);

const Logotype = ({ size = 36, color = 'var(--ink)', mark = 'var(--ink)' }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.32 }}>
    <MarkV4 size={size} color={mark} />
    <span style={{
      fontFamily: 'var(--display)',
      fontWeight: 800,
      fontSize: size * 0.7,
      letterSpacing: '-0.025em',
      color,
    }}>
      мерч<span style={{ color: 'var(--yellow)' }}>.</span>цех
    </span>
  </span>
);

// Photo block placeholder
const Photo = ({ tint = 'moody', label, chip, num, kind, style, children }) => {
  const grads = {
    moody:  'linear-gradient(160deg, #59635a 0%, #1a1d18 100%)',
    steel:  'linear-gradient(160deg, #5a6878 0%, #1a1f28 100%)',
    sand:   'linear-gradient(160deg, #c2a76e 0%, #4a3812 100%)',
    smoke:  'linear-gradient(160deg, #3a3d44 0%, #0b0d12 100%)',
    olive:  'linear-gradient(160deg, #6e6a3a 0%, #20210a 100%)',
    cream:  'linear-gradient(160deg, #ECE3BE 0%, #b8a880 100%)',
    sea:    'linear-gradient(160deg, #5b8b9e 0%, #0e2630 100%)',
  };
  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%',
      background: grads[tint] || grads.moody,
      borderRadius: 'inherit',
      overflow: 'hidden',
      ...style,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,.55) 100%)',
      }} />
      {chip && (
        <span style={{
          position: 'absolute', top: 22, left: 24,
          padding: '7px 12px',
          background: 'rgba(255,255,255,.85)',
          color: 'var(--ink)',
          borderRadius: 999,
          fontFamily: 'var(--body)', fontWeight: 600, fontSize: 11,
          letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>{chip}</span>
      )}
      {num && (
        <span style={{
          position: 'absolute', top: 22, right: 24,
          fontFamily: 'var(--display)', fontWeight: 700, fontSize: 12,
          letterSpacing: '0.06em', color: 'rgba(255,255,255,.85)',
        }}>{num}</span>
      )}
      <svg viewBox="0 0 200 240" preserveAspectRatio="xMidYMid slice"
           style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18 }}>
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
          position: 'absolute', left: 24, bottom: 22,
          fontFamily: 'var(--body)', fontWeight: 600, fontSize: 11,
          color: 'var(--paper)',
          letterSpacing: '0.12em', textTransform: 'uppercase',
        }}>{label}</div>
      )}
    </div>
  );
};

const _f = 'currentColor';
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

Object.assign(window, { MarkV4, Logotype, Photo });
