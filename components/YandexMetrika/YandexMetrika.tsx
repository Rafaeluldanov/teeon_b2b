import Script from 'next/script';

// Fill NEXT_PUBLIC_YANDEX_METRIKA_ID in .env.local after creating counter at metrika.yandex.ru
const metrikaId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;

export default function YandexMetrika() {
  if (!metrikaId) return null;

  return (
    <>
      <Script
        id="yandex-metrika-init"
        strategy="afterInteractive"
      >{`
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
        ym(${metrikaId},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:false});
      `}</Script>
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://mc.yandex.ru/watch/${metrikaId}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
            width="1"
            height="1"
          />
        </div>
      </noscript>
    </>
  );
}
