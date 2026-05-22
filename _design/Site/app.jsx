/* App — composes the homepage with Tweaks support */

const { Hero, Marquee, Advantages, About, CatalogSection, Branding, WorkSteps,
        Portfolio, Clients, FAQ, SeoText, RequestForm, Footer } = window;
const { TweaksPanel, useTweaks, TweakSection, TweakColor, TweakRadio, TweakSelect, TweakToggle } = window;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#E8571A",
  "secondary": "#FFD400",
  "displayFont": "Onest",
  "paper": "#f6f4ef",
  "showMarquee": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty('--accent', t.accent);
    r.setProperty('--yellow', t.secondary);
    r.setProperty('--paper', t.paper);
    r.setProperty('--display', `'${t.displayFont}', system-ui, sans-serif`);
  }, [t]);

  return (
    <>
      <Hero />
      {t.showMarquee && (
        <Marquee
          variant="orange"
          items={['Свой цех', 'Образец до тиража', '9 методов нанесения', 'Тираж от 30 шт', 'Работа с юрлицами', 'Доставка по РФ']}
        />
      )}
      <Advantages />
      <About />
      <CatalogSection />
      <Branding />
      <WorkSteps />
      <Portfolio />
      <Clients />
      <FAQ />
      <SeoText />
      <RequestForm />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Цвета">
          <TweakColor
            label="Акцент"
            value={t.accent}
            onChange={v => setTweak('accent', v)}
            options={['#E8571A', '#FF3D00', '#1F8A5B', '#2A6FDB', '#6E59E6', '#0b0b0b']}
          />
          <TweakColor
            label="Вторичный (плашки)"
            value={t.secondary}
            onChange={v => setTweak('secondary', v)}
            options={['#FFD400', '#F4F1A9', '#E8DDFF', '#FFE0CC', '#CDEFD4']}
          />
          <TweakColor
            label="Фон / бумага"
            value={t.paper}
            onChange={v => setTweak('paper', v)}
            options={['#f6f4ef', '#ffffff', '#f1ede4', '#efe9da', '#e9e4d6']}
          />
        </TweakSection>
        <TweakSection label="Типографика">
          <TweakSelect
            label="Дисплейный шрифт"
            value={t.displayFont}
            onChange={v => setTweak('displayFont', v)}
            options={[
              { value: 'Onest',       label: 'Onest 800 (sans)' },
              { value: 'Unbounded',   label: 'Unbounded (geo)' },
              { value: 'Russo One',   label: 'Russo One (display)' },
              { value: 'Manrope',     label: 'Manrope (modern)' },
            ]}
          />
        </TweakSection>
        <TweakSection label="Декор">
          <TweakToggle
            label="Бегущая строка под Hero"
            value={t.showMarquee}
            onChange={v => setTweak('showMarquee', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
