/* V6 app — light bento with full TEEON spec */

const {
  HeaderV6, HeroV6, AdvantagesV6, AboutV6, CatalogV6, BrandingV6,
  WorkV6, PortfolioV6, ClientsV6, FAQV6, SeoV6, RequestV6, FooterV6,
} = window;
const { TweaksPanel, useTweaks, TweakSection, TweakColor, TweakSlider } = window;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "yellow": "#FFD60A",
  "blue":   "#1B3FCA",
  "coral":  "#FF6A4D",
  "mint":   "#6FE4C2",
  "ink":    "#0A0E1A",
  "radius": 28
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty('--yellow', t.yellow);
    r.setProperty('--blue', t.blue);
    r.setProperty('--coral', t.coral);
    r.setProperty('--mint', t.mint);
    r.setProperty('--ink', t.ink);
    r.setProperty('--rad', t.radius + 'px');
  }, [t]);

  return (
    <div className="page">
      <HeaderV6 />
      <HeroV6 />
      <AdvantagesV6 />
      <AboutV6 />
      <CatalogV6 />
      <BrandingV6 />
      <WorkV6 />
      <PortfolioV6 />
      <ClientsV6 />
      <FAQV6 />
      <SeoV6 />
      <RequestV6 />
      <FooterV6 />

      <TweaksPanel title="Tweaks v6">
        <TweakSection label="Палитра">
          <TweakColor label="Жёлтый (основной)" value={t.yellow} onChange={v => setTweak('yellow', v)}
            options={['#FFD60A', '#FFC907', '#FFE34F', '#F9C800', '#FFEB3B']} />
          <TweakColor label="Синий (второй)" value={t.blue} onChange={v => setTweak('blue', v)}
            options={['#1B3FCA', '#2240FF', '#0033CC', '#162D6B', '#3D5AFE']} />
          <TweakColor label="Коралловый (акцент)" value={t.coral} onChange={v => setTweak('coral', v)}
            options={['#FF6A4D', '#FF5A36', '#FF8B70', '#E84A2D', '#FF9580']} />
          <TweakColor label="Мятный (акцент)" value={t.mint} onChange={v => setTweak('mint', v)}
            options={['#6FE4C2', '#85E0C8', '#5AD0AA', '#4AC796', '#A2EFD6']} />
          <TweakColor label="Чёрный (ink)" value={t.ink} onChange={v => setTweak('ink', v)}
            options={['#0A0E1A', '#000000', '#14182A', '#06080F']} />
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
