import type { Metadata } from 'next';
import Hero from '@/components/Hero/Hero';
import Advantages from '@/components/Advantages/Advantages';
import About from '@/components/About/About';
import CatalogSection from '@/components/CatalogSection/CatalogSection';
import BrandingSection from '@/components/BrandingSection/BrandingSection';
import WorkSteps from '@/components/WorkSteps/WorkSteps';
import Portfolio from '@/components/Portfolio/Portfolio';
import Clients from '@/components/Clients/Clients';
import FAQ from '@/components/FAQ/FAQ';
import SeoText from '@/components/SeoText/SeoText';
import RequestForm from '@/components/RequestForm/RequestForm';
import JsonLd from '@/components/JsonLd/JsonLd';
import { siteConfig } from '@/lib/seo';
import { getFAQSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: siteConfig.defaultTitle,
  description: siteConfig.defaultDescription,
  alternates: { canonical: `${siteConfig.url}/` },
  openGraph: {
    url: `${siteConfig.url}/`,
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
  },
};

const homeFaq = [
  {
    q: 'Какой минимальный тираж?',
    a: 'Минимальный тираж зависит от изделия и способа нанесения. Для большинства позиций мы работаем от небольших партий. Уточните детали в заявке — подберём оптимальное решение под ваш тираж.',
  },
  {
    q: 'Можно ли заказать образец?',
    a: 'Да, перед запуском серийной партии мы согласовываем образец. Это позволяет убедиться в соответствии изделия и нанесения вашим ожиданиям до начала тиражного производства.',
  },
  {
    q: 'Какие сроки производства?',
    a: 'Сроки зависят от изделия, тиража, сложности нанесения и текущей загрузки производства. В среднем от 10 до 25 рабочих дней. Точные сроки указываем после согласования заказа.',
  },
  {
    q: 'Какие способы брендирования доступны?',
    a: 'Мы предлагаем: вышивку, шевроны, шелкографию, DTF-печать, DTG-печать, сублимацию, тиснение, гравировку и брендированные бирки. Подберём оптимальный способ под вашу задачу и ткань.',
  },
  {
    q: 'Работаете ли с юридическими лицами?',
    a: 'Да, работаем с юридическими лицами и ИП по договору. Предоставляем полный комплект закрывающих документов: договор, счёт, товарная накладная или УПД.',
  },
  {
    q: 'Можно ли доставить заказ в другой город?',
    a: 'Да, мы отправляем заказы транспортными компаниями в любой регион России. Стоимость и сроки доставки рассчитываются при оформлении заказа.',
  },
];

export default function HomePage() {
  return (
    <main className="v6-page">
      <JsonLd data={getFAQSchema(homeFaq)} />
      <Hero />
      <Advantages />
      <About />
      <CatalogSection />
      <BrandingSection />
      <WorkSteps />
      <Portfolio />
      <Clients />
      <FAQ />
      <SeoText />
      <RequestForm />
    </main>
  );
}
