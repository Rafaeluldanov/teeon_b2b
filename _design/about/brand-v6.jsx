/* V6 — Brand mark + logotype + photo placeholder */

// Custom "T"-like mark for МЕРЧ.ЦЕХ — block with yellow dot bowl
const MarkV6 = ({ size = 36, color = 'var(--ink)', accent = 'var(--yellow)', style }) => (
  <svg width={size} height={size * 0.92} viewBox="0 0 100 92" fill="none" style={{ display: 'block', ...style }}>
    {/* Bold T-shape stem */}
    <rect x="38" y="8" width="22" height="76" rx="5" fill={color} />
    {/* Top crossbar */}
    <rect x="14" y="8" width="72" height="22" rx="5" fill={color} />
    {/* Yellow circle accent (bowl) */}
    <circle cx="78" cy="64" r="14" fill={accent} />
  </svg>
);

const Logotype = ({ size = 28, color = 'var(--ink)', mark = 'var(--ink)', accent = 'var(--yellow)' }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.32 }}>
    <MarkV6 size={size} color={mark} accent={accent} />
    <span style={{
      fontFamily: 'var(--display)',
      fontWeight: 800,
      fontSize: size * 0.92,
      letterSpacing: '-0.035em',
      color,
      lineHeight: 1,
    }}>
      tee<span style={{ color: 'var(--yellow)' }}>on</span>
    </span>
  </span>
);

// Photo placeholder — gradient with optional silhouette overlay
const Photo = ({ tint = 'sand', label, chip, num, kind, style, children }) => {
  const grads = {
    sand:   'linear-gradient(160deg, #e0c898 0%, #6e4f1c 100%)',
    steel:  'linear-gradient(160deg, #6a7888 0%, #1a2030 100%)',
    blue:   'linear-gradient(160deg, #2a3a8e 0%, #0a1240 100%)',
    moss:   'linear-gradient(160deg, #b3cf9a 0%, #3c5e25 100%)',
    coral:  'linear-gradient(160deg, #ff9b85 0%, #b8331c 100%)',
    mint:   'linear-gradient(160deg, #9fefd5 0%, #1e7458 100%)',
    cream:  'linear-gradient(160deg, #f6f0d8 0%, #c2b58a 100%)',
    night:  'linear-gradient(160deg, #2a2f48 0%, #06080f 100%)',
  };
  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%',
      background: grads[tint] || grads.sand,
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
          background: 'rgba(255,255,255,.92)',
          color: 'var(--ink)',
          borderRadius: 999,
          fontFamily: 'var(--body)', fontWeight: 600, fontSize: 11,
          letterSpacing: '0.06em', textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}>{chip}</span>
      )}
      {num && (
        <span style={{
          position: 'absolute', top: 22, right: 24,
          fontFamily: 'var(--display)', fontWeight: 700, fontSize: 12,
          letterSpacing: '0.06em', color: 'rgba(255,255,255,.85)',
          whiteSpace: 'nowrap',
        }}>{num}</span>
      )}
      <svg viewBox="0 0 200 240" preserveAspectRatio="xMidYMid slice"
           style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.22 }}>
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
          whiteSpace: 'nowrap',
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

Object.assign(window, { MarkV6, Logotype, Photo });
