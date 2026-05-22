/* V4 app — brand-book moodboard */

const {
  NavV4, HeroV4, AdvantagesV4, AboutV4, CatalogV4, BrandingV4,
  WorkV4, PortfolioV4, ClientsV4, FAQV4, SeoV4, RequestV4, StripV4, FooterV4,
} = window;
const { TweaksPanel, useTweaks, TweakSection, TweakColor, TweakSlider } = window;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "yellow": "#FFD100",
  "blue":   "#1B3FCA",
  "bg":     "#F5EFD8",
  "ink":    "#0A0E1A",
  "radius": 28
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty('--yellow', t.yellow);
    r.setProperty('--blue', t.blue);
    r.setProperty('--bg', t.bg);
    r.setProperty('--ink', t.ink);
    r.setProperty('--rad', t.radius + 'px');
  }, [t]);

  return (
    <div className="page">
      <NavV4 />
      <HeroV4 />
      <AdvantagesV4 />
      <AboutV4 />
      <CatalogV4 />
      <StripV4 />
      <BrandingV4 />
      <WorkV4 />
      <PortfolioV4 />
      <ClientsV4 />
      <FAQV4 />
      <SeoV4 />
      <RequestV4 />
      <FooterV4 />

      <TweaksPanel title="Tweaks v4">
        <TweakSection label="Палитра">
          <TweakColor label="Жёлтый" value={t.yellow} onChange={v => setTweak('yellow', v)}
            options={['#FFD100', '#FFC907', '#FFE34F', '#F9C800', '#FFEB3B']} />
          <TweakColor label="Синий" value={t.blue} onChange={v => setTweak('blue', v)}
            options={['#1B3FCA', '#1F3FFF', '#0033CC', '#162D6B', '#2B47C7']} />
          <TweakColor label="Чёрный" value={t.ink} onChange={v => setTweak('ink', v)}
            options={['#0A0E1A', '#000000', '#101426', '#14182A', '#08090F']} />
          <TweakColor label="Фон (мудборд)" value={t.bg} onChange={v => setTweak('bg', v)}
            options={['#F5EFD8', '#EFE9C9', '#E8DAA0', '#DDE5EB', '#F1EDE6', '#FFFFFF']} />
        </TweakSection>
        <TweakSection label="Форма">
          <TweakSlider label="Скругление, px" value={t.radius} min={12} max={48} step={2}
            onChange={v => setTweak('radius', v)} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
