/* V5 app — premium SaaS moodboard (navy + yellow) */

const {
  NavV5, HeroV5, AdvantagesV5, AboutV5, CatalogV5, BrandingV5,
  WorkV5, PortfolioV5, ClientsV5, FAQV5, SeoV5, RequestV5, StripV5, FooterV5,
} = window;
const { TweaksPanel, useTweaks, TweakSection, TweakColor, TweakSlider } = window;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "yellow": "#FFD60A",
  "bg":     "#0E1A4F",
  "bg2":    "#14225A",
  "ink":    "#08102E",
  "radius": 28
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty('--yellow', t.yellow);
    r.setProperty('--bg', t.bg);
    r.setProperty('--bg-2', t.bg2);
    r.setProperty('--ink', t.ink);
    r.setProperty('--rad', t.radius + 'px');
  }, [t]);

  return (
    <div className="page">
      <NavV5 />
      <HeroV5 />
      <AdvantagesV5 />
      <AboutV5 />
      <CatalogV5 />
      <StripV5 />
      <BrandingV5 />
      <WorkV5 />
      <PortfolioV5 />
      <ClientsV5 />
      <FAQV5 />
      <SeoV5 />
      <RequestV5 />
      <FooterV5 />

      <TweaksPanel title="Tweaks v5">
        <TweakSection label="Палитра">
          <TweakColor label="Жёлтый (акцент)" value={t.yellow} onChange={v => setTweak('yellow', v)}
            options={['#FFD60A', '#FFC907', '#FFE34F', '#FFEB3B', '#F2B907']} />
          <TweakColor label="Фон (navy)" value={t.bg} onChange={v => setTweak('bg', v)}
            options={['#0E1A4F', '#0a1240', '#101a3d', '#0d1e6a', '#1a2570', '#000000']} />
          <TweakColor label="Карточки (навигация)" value={t.bg2} onChange={v => setTweak('bg2', v)}
            options={['#14225A', '#1A2A6C', '#101730', '#1d2a72', '#0c1646']} />
          <TweakColor label="Чёрный (ink)" value={t.ink} onChange={v => setTweak('ink', v)}
            options={['#08102E', '#000000', '#0a0e1a', '#06080F']} />
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
