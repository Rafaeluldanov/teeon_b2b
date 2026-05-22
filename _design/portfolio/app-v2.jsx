/* V2 app — dark bento composition */

const {
  NavV2, HeroV2, HeroExtras, AdvantagesV2, AboutV2,
  CatalogV2, BrandingV2, WorkV2, PortfolioV2, ClientsV2,
  FAQV2, SeoV2, RequestV2, ScrollText, FooterV2,
} = window;
const { TweaksPanel, useTweaks, TweakSection, TweakColor, TweakSelect, TweakSlider } = window;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#dcff50",
  "cta":    "#ff4d1a",
  "bg":     "#0d0e0c",
  "paper":  "#f3f0e6",
  "radius": 28,
  "font":   "Unbounded"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty('--lime', t.accent);
    r.setProperty('--orange', t.cta);
    r.setProperty('--bg', t.bg);
    r.setProperty('--paper', t.paper);
    r.setProperty('--rad', t.radius + 'px');
    r.setProperty('--display', `'${t.font}', 'Onest', system-ui, sans-serif`);
  }, [t]);

  return (
    <div className="page">
      <div className="shell">
        <NavV2 />
      </div>

      <HeroV2 />
      <HeroExtras />

      <AdvantagesV2 />
      <AboutV2 />
      <CatalogV2 />
      <BrandingV2 />
      <WorkV2 />
      <PortfolioV2 />
      <ClientsV2 />
      <FAQV2 />
      <SeoV2 />
      <RequestV2 />
      <ScrollText />
      <FooterV2 />

      <TweaksPanel title="Tweaks v2">
        <TweakSection label="Цвета">
          <TweakColor label="Акцент (lime)" value={t.accent} onChange={v => setTweak('accent', v)}
            options={['#dcff50', '#c8ff2a', '#a4e635', '#7df9c0', '#ffd400', '#ff9580']} />
          <TweakColor label="CTA (orange)" value={t.cta} onChange={v => setTweak('cta', v)}
            options={['#ff4d1a', '#e8571a', '#ff3d00', '#6e59e6', '#0d0e0c']} />
          <TweakColor label="Фон" value={t.bg} onChange={v => setTweak('bg', v)}
            options={['#0d0e0c', '#15170f', '#1a1a1a', '#0a1414', '#1c1a26', '#f3f0e6']} />
          <TweakColor label="Бумага (карточки)" value={t.paper} onChange={v => setTweak('paper', v)}
            options={['#f3f0e6', '#ffffff', '#ede8d8', '#e8e4d6', '#f7f4ec']} />
        </TweakSection>
        <TweakSection label="Форма">
          <TweakSlider label="Скругление, px" value={t.radius} min={8} max={48} step={2}
            onChange={v => setTweak('radius', v)} />
        </TweakSection>
        <TweakSection label="Типографика">
          <TweakSelect label="Дисплейный шрифт" value={t.font} onChange={v => setTweak('font', v)}
            options={[
              { value: 'Unbounded', label: 'Unbounded (geo)' },
              { value: 'Onest',     label: 'Onest (sans)' },
              { value: 'Russo One', label: 'Russo One (display)' },
            ]} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
