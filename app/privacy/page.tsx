import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/seo';
import styles from './privacy.module.css';

export const metadata: Metadata = {
  title: 'Политика обработки персональных данных',
  description:
    'Информация о порядке сбора, хранения и обработки персональных данных пользователей на сайте TEEON.',
  robots: { index: true, follow: true },
  alternates: { canonical: `${siteConfig.url}/privacy/` },
};

export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      <div className="container">
        <nav className={styles.breadcrumb} aria-label="Хлебные крошки">
          <Link href="/" className={styles.breadLink}>Главная</Link>
          <span className={styles.breadSep} aria-hidden="true">›</span>
          <span aria-current="page">Политика обработки персональных данных</span>
        </nav>

        <div className={styles.warning}>
          <span className={styles.warningIcon} aria-hidden="true">⚠️</span>
          <p>
            <strong>Внимание:</strong> данный текст является шаблоном и требует юридической проверки и
            адаптации перед публикацией. Не является официальным юридическим документом в текущем виде.
          </p>
        </div>

        <h1 className={styles.title}>Политика обработки персональных данных</h1>

        <div className={styles.body}>
          <section className={styles.section}>
            <h2 className={styles.h2}>1. Общие положения</h2>
            <p>
              Настоящая Политика обработки персональных данных (далее — Политика) определяет порядок обработки
              и защиты персональных данных пользователей сайта TEEON (далее — Сайт).
            </p>
            <p>
              Используя Сайт и оставляя заявку, пользователь соглашается с условиями настоящей Политики.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>2. Какие данные собираются</h2>
            <p>
              При заполнении форм на Сайте могут быть собраны следующие данные: имя и фамилия, номер телефона,
              адрес электронной почты, название компании, дополнительные сведения, указанные в комментарии к заявке.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>3. Цели обработки данных</h2>
            <p>
              Данные используются исключительно для: связи с пользователем по вопросам заявки, подготовки
              коммерческого предложения, обработки запроса на расчёт.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>4. Передача данных третьим лицам</h2>
            <p>
              Персональные данные не передаются третьим лицам без согласия пользователя, за исключением
              случаев, предусмотренных законодательством Российской Федерации.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>5. Хранение и защита данных</h2>
            <p>
              Мы принимаем меры для защиты персональных данных от несанкционированного доступа, изменения,
              раскрытия или уничтожения.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>6. Права пользователя</h2>
            <p>
              Пользователь вправе запросить информацию о своих данных, потребовать их исправления или удаления,
              направив соответствующий запрос на email компании.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>7. Обратная связь</h2>
            <p>
              По вопросам обработки персональных данных обращайтесь по email:{' '}
              <a href="mailto:teeon@upgifts.ru" className={styles.link}>teeon@upgifts.ru</a>
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2} id="consent">Согласие на обработку персональных данных</h2>
            <p>
              Оставляя заявку на сайте, пользователь подтверждает своё согласие на обработку персональных данных
              в целях, указанных в настоящей Политике.
            </p>
            <p>
              <em>
                Данный раздел является шаблоном. Рекомендуется заменить на юридически проверенный текст
                до публикации.
              </em>
            </p>
          </section>
        </div>

        <div className={styles.footer}>
          <Link href="/" className={styles.backLink}>← На главную</Link>
          <Link href="/contacts/" className={styles.backLink}>Контакты</Link>
        </div>
      </div>
    </main>
  );
}
