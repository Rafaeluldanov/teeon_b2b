/* V3 app — brand-identity bento (yellow + blue + white + ink) */

const {
  NavV3, HeroV3, AdvantagesV3, AboutV3, CatalogV3, BrandingV3,
  WorkV3, PortfolioV3, ClientsV3, FAQV3, SeoV3, RequestV3, StripV3, FooterV3,
} = window;
const { TweaksPanel, useTweaks, TweakSection, TweakColor, TweakSlider } = window;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "yellow": "#FFD60A",
  "blue":   "#2240FF",
  "paper":  "#FBFAF5",
  "ink":    "#0A0E1A",
  "radius": 40
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty('--yellow', t.yellow);
    r.setProperty('--blue', t.blue);
    r.setProperty('--paper', t.paper);
    r.setProperty('--ink', t.ink);
    r.setProperty('--rad', t.radius + 'px');
  }, [t]);

  return (
    <div className="page">
      <NavV3 />
      <HeroV3 />
      <AdvantagesV3 />
      <AboutV3 />
      <CatalogV3 />
      <StripV3 />
      <BrandingV3 />
      <WorkV3 />
      <PortfolioV3 />
      <ClientsV3 />
      <FAQV3 />
      <SeoV3 />
      <RequestV3 />
      <FooterV3 />

      <TweaksPanel title="Tweaks v3">
        <TweakSection label="Палитра">
          <TweakColor label="Жёлтый (акцент)" value={t.yellow} onChange={v => setTweak('yellow', v)}
            options={['#FFD60A', '#FFCC00', '#FFE34F', '#F9C800', '#FFE600']} />
          <TweakColor label="Синий (CTA)" value={t.blue} onChange={v => setTweak('blue', v)}
            options={['#2240FF', '#1F3FE0', '#0033CC', '#3D5AFE', '#1E40AF', '#0B5FFF']} />
          <TweakColor label="Чёрный / тёмный" value={t.ink} onChange={v => setTweak('ink', v)}
            options={['#0A0E1A', '#0a0a0a', '#101426', '#1a1d2e', '#06080F']} />
          <TweakColor label="Бумага / фон" value={t.paper} onChange={v => setTweak('paper', v)}
            options={['#FBFAF5', '#FFFFFF', '#F4F1E8', '#FAF6E8', '#F8F5EC']} />
        </TweakSection>
        <TweakSection label="Форма">
          <TweakSlider label="Скругление, px" value={t.radius} min={16} max={64} step={2}
            onChange={v => setTweak('radius', v)} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
