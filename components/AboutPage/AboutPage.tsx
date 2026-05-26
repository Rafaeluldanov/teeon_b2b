import Link from 'next/link';
import { company } from '@/lib/company';
import styles from './AboutPage.module.css';
import AboutPortfolioPreview from './AboutPortfolioPreview';

const ArrowIc = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/>
  </svg>
);

const capBgs = ['', 'capYellow', '', 'capBlue', '', 'capInk'] as const;

export default function AboutPage() {
  return (
    <main className="v6-page">
      {/* ── Hero ── */}
      <section className={styles.hero} aria-label="О компании TEEON">
        <div className={styles.heroContent}>
          <nav className={styles.breadcrumb} aria-label="Хлебные крошки">
            <Link href="/" className={styles.breadLink}>Главная</Link>
            <span className={styles.breadSep} aria-hidden="true">›</span>
            <span aria-current="page">О компании</span>
          </nav>

          <div className={styles.heroFacts}>
            {company.productionFacts.map((f) => (
              <span key={f.value} className={styles.heroFact}>
                <span aria-hidden="true">{f.icon}</span>
                {f.value}
              </span>
            ))}
          </div>

          <h1 className={styles.heroTitle}>О&nbsp;компании <em>TEEON</em></h1>

          <div className={styles.heroDesc}>
            <p>{company.shortDescription}</p>
            <p>{company.fullDescription}</p>
          </div>

          <div className={styles.heroActions}>
            <a href="/#request" className="v6-btn v6-btn--yellow">
              Рассчитать заказ
              <span className="v6-ic" aria-hidden="true"><ArrowIc /></span>
            </a>
            <Link href="/portfolio/" className="v6-btn v6-btn--ghost">
              Смотреть портфолио
            </Link>
          </div>
        </div>

        <div className={styles.heroVideo} role="img" aria-label="Фото или видео производства TEEON">
          <div className={styles.videoPlay} aria-hidden="true">▶</div>
          <div className={styles.videoTitle}>Фото или видео производства</div>
          <p className={styles.videoDesc}>Швейный цех, оборудование для брендирования, нанесение логотипов, упаковка заказов</p>
        </div>
      </section>

      {/* ── Мы производим, а не перепродаём ── */}
      <section aria-labelledby="produce-title">
        <div className={styles.textAdv}>
          <div className={styles.textBlock}>
            <div className={styles.kicker}>Производство</div>
            <h2 className={styles.textTitle} id="produce-title">
              Мы производим, <em>а&nbsp;не&nbsp;перепродаём</em>
            </h2>
            <p className={styles.textPara}>
              У нас собственный швейный цех и оборудование для нанесения логотипов. Это позволяет вести весь проект внутри одной производственной цепочки: от подбора ткани и пошива до брендирования и упаковки. Без посредников между этапами.
            </p>
            <p className={styles.textPara}>
              Работаем только с юридическими лицами и ИП. Договор, счёт, закрывающие документы — весь стандартный B2B-комплект. Один менеджер ведёт проект от брифа до отгрузки.
            </p>
          </div>

          <div className={styles.advGrid}>
            {company.advantages.map((a) => {
              const bgMap: Record<string, string> = { yellow: 'advYellow', blue: 'advBlue', ink: 'advInk' };
              const bgClass = a.bg ? styles[bgMap[a.bg] as keyof typeof styles] : '';
              return (
                <div key={a.title} className={`${styles.advCard} ${bgClass}`}>
                  <span className={styles.advIcon} aria-hidden="true">{a.icon}</span>
                  <div className={styles.advTitle}>{a.title}</div>
                  <p className={styles.advDesc}>{a.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Производственные возможности ── */}
      <section aria-labelledby="capabilities-title">
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>Возможности</div>
            <h2 id="capabilities-title">Производственные <em>возможности</em></h2>
          </div>
          <p>Шесть основных направлений работы — от пошива и нанесения до welcome-наборов и проектов под мероприятия.</p>
        </div>
        <div className={styles.capGrid}>
          {company.capabilities.map((c, i) => {
            const bgKey = capBgs[i] as string;
            const bgClass = bgKey ? styles[bgKey as keyof typeof styles] : '';
            return (
              <Link key={c.title} href={c.href} className={`${styles.capCard} ${bgClass}`}>
                <span className={styles.capIcon} aria-hidden="true">{c.icon}</span>
                <div className={styles.capTitle}>{c.title}</div>
                <p className={styles.capDesc}>{c.desc}</p>
                <span className={styles.capLink}>
                  Подробнее
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                    <path d="M3 8 L8 3 M4 3 L8 3 L8 7" stroke="currentColor" strokeWidth="1.7"/>
                  </svg>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Оборудование ── */}
      <section aria-labelledby="equipment-title">
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>Оборудование</div>
            <h2 id="equipment-title">Оборудование <em>и&nbsp;процессы</em></h2>
          </div>
          <p>Шесть категорий оборудования собственного цеха — пошив, раскрой, вышивка, печать, тиснение, упаковка.</p>
        </div>
        <div className={styles.equipGrid}>
          {company.equipment.map((e) => (
            <div key={e.name} className={styles.equipCard}>
              <span className={styles.equipIcon} aria-hidden="true">{e.icon}</span>
              <div className={styles.equipTitle}>{e.name}</div>
              <p className={styles.equipDesc}>{e.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Контроль качества ── */}
      <section aria-labelledby="quality-title">
        <div className={styles.qualityBlock}>
          <div className={styles.qualityHead}>
            <div>
              <div className={styles.kicker} style={{ color: 'rgba(255,255,255,.5)', marginBottom: 14 }}>Качество</div>
              <h2 id="quality-title">Контроль <em>качества</em></h2>
            </div>
            <p>Семь этапов проверки от согласования макета до финальной упаковки. Брак — ноль.</p>
          </div>
          <ol className={styles.qualityList}>
            {company.qualityControl.map((q) => (
              <li key={q.num} className={styles.qualityStep}>
                <span className={styles.qualityNum} aria-hidden="true">{q.num}</span>
                <div className={styles.qualityStepTitle}>{q.step}</div>
                <p className={styles.qualityDesc}>{q.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Как проходит работа ── */}
      <section aria-labelledby="workflow-title">
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>Процесс</div>
            <h2 id="workflow-title">Как проходит работа<br />с&nbsp;<em>B2B-заказом</em></h2>
          </div>
          <p>Семь шагов от брифа до отгрузки. На каждом — фиксация результата и согласование с клиентом.</p>
        </div>
        <div className={styles.workflowBlock}>
          {company.workflow.map((w) => (
            <div key={w.num} className={styles.workflowRow}>
              <div className={styles.workflowNum} aria-hidden="true">{w.num}</div>
              <div className={styles.workflowMain}>
                <div className={styles.workflowTitle}>{w.title}</div>
                <p className={styles.workflowDesc}>{w.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Задачи ── */}
      <section aria-labelledby="scenarios-title">
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>Задачи</div>
            <h2 id="scenarios-title">С&nbsp;какими <em>задачами</em> работаем</h2>
          </div>
          <p>Шесть типов B2B-проектов, которые регулярно проходят через производство TEEON.</p>
        </div>
        <div className={styles.scenariosGrid}>
          {company.scenarios.map((s, i) => {
            const bgMap: Record<string, string> = { yellow: 'scYellow', blue: 'scBlue', ink: 'scInk' };
            const bgClass = s.bg ? styles[bgMap[s.bg] as keyof typeof styles] : '';
            return (
              <div key={s.title} className={`${styles.scenarioCard} ${bgClass}`}>
                <div className={styles.scenarioNum} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')} /
                </div>
                <div className={styles.scenarioTitle}>{s.title}</div>
                <p className={styles.scenarioDesc}>{s.desc}</p>
                <div className={styles.scenarioLinks}>
                  {s.links.map((l) => (
                    <Link key={l.href} href={l.href} className={styles.scenarioLink}>{l.label}</Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Документы ── */}
      <section aria-labelledby="docs-title">
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>Документы</div>
            <h2 id="docs-title">Документы и&nbsp;<em>работа с&nbsp;юрлицами</em></h2>
          </div>
          <p>Полный B2B-пакет для бухгалтерии и юр-отдела. Работаем с ООО и ИП по договору.</p>
        </div>
        <div className={styles.docsGrid}>
          <div className={styles.docsCol}>
            <div className={styles.docsColTitle}>
              Что включает&nbsp;<span style={{ color: 'var(--blue)' }}>стандартный пакет</span>
            </div>
            <p className={styles.docsColDesc}>
              Полный набор закрывающих документов и бухгалтерское сопровождение проекта.
              Маркировка партий для маркетплейсов — по запросу.
            </p>
            <ul className={styles.docsList}>
              {company.documents.map((d) => (
                <li key={d} className={styles.docsItem}>{d}</li>
              ))}
            </ul>
            <a href="/#request" className="v6-btn v6-btn--ink" style={{ alignSelf: 'flex-start', marginTop: 'auto' }}>
              Запросить расчёт
              <span className="v6-ic" aria-hidden="true"><ArrowIc /></span>
            </a>
          </div>
          <div className={styles.docsCol}>
            <div className={styles.docsColTitle}>
              Производственные&nbsp;<span style={{ color: 'var(--blue)' }}>параметры</span>
            </div>
            <p className={styles.docsColDesc}>
              Ключевые B2B-характеристики: формат, тип, контроль и география.
              Подходим для большинства корпоративных задач.
            </p>
            <div className={styles.statsGrid}>
              {company.productionStats.map((s) => {
                const bgMap: Record<string, string> = { yellow: 'statYellow', blue: 'statBlue' };
                const bgClass = s.bg ? styles[bgMap[s.bg] as keyof typeof styles] : '';
                return (
                  <div key={s.label} className={`${styles.statCard} ${bgClass}`}>
                    <span className={styles.statLabel}>{s.label}</span>
                    <span className={styles.statValue}>{s.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Ценности ── */}
      <section aria-labelledby="values-title">
        <div className={styles.valuesBlock}>
          <div className={styles.valuesHead}>
            <div>
              <div className={styles.kicker} style={{ color: 'rgba(255,255,255,.5)', marginBottom: 14 }}>Ценности</div>
              <h2 id="values-title">Что важно <em>для нас</em><br />в&nbsp;производстве</h2>
            </div>
            <p>Шесть базовых принципов, на которых строится каждый проект — от брифа до отгрузки готовой партии.</p>
          </div>
          <div className={styles.valuesGrid}>
            {company.values.map((v) => (
              <div key={v.title} className={styles.valueCard}>
                <span className={styles.valueIcon} aria-hidden="true">{v.icon}</span>
                <div className={styles.valueTitle}>{v.title}</div>
                <p className={styles.valueDesc}>{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Свежие проекты ── */}
      <section aria-labelledby="portfolio-preview-title">
        <div className={styles.pfHead}>
          <div>
            <div className={styles.kicker}>Кейсы</div>
            <h2 id="portfolio-preview-title" className={styles.pfTitle}>
              Свежие <em>проекты</em>
            </h2>
          </div>
          <Link href="/portfolio/" className="v6-btn v6-btn--ghost-d">
            Все кейсы
            <span className="v6-ic" aria-hidden="true"><ArrowIc /></span>
          </Link>
        </div>
        <AboutPortfolioPreview />
      </section>

      {/* ── SEO ── */}
      <div className={styles.seoSection} aria-label="О производстве">
        <div className={styles.seoHead}>
          <div className={styles.kicker}>Подробнее</div>
          <h3>Производство промо-одежды и корпоративного мерча</h3>
        </div>
        <div className={styles.seoBody}>
          <p>
            TEEON — производственная компания полного цикла. Шьём промо-одежду и корпоративный мерч в собственном швейном цехе, наносим логотипы на собственном оборудовании, упаковываем и отгружаем партии под B2B-задачи. Работаем с юридическими лицами и ИП — договор, счёт, закрывающие документы.
          </p>
          <p>
            Производство одной цепочкой даёт нам контроль над сроками, качеством и стабильностью партии. Каждый тираж проходит ОТК на семи этапах — от входного контроля ткани до финальной проверки упаковки. До запуска тиража согласуем pre-production sample — образец, который точно соответствует тому, что вы получите в партии.
          </p>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className={styles.ctaSection}>
        <div>
          <div className={styles.ctaTitle}>Обсудим <em>ваш проект</em>?</div>
          <p className={styles.ctaDesc}>
            Опишите задачу — рассчитаем 2–3 варианта по бюджету, согласуем образец до тиража, отгрузим в срок.
          </p>
        </div>
        <div className={styles.ctaActions}>
          <a href="/#request" className="v6-btn v6-btn--yellow">
            Оставить заявку
            <span className="v6-ic" aria-hidden="true"><ArrowIc /></span>
          </a>
          <Link href="/catalog/" className="v6-btn v6-btn--ghost">
            Смотреть каталог
          </Link>
        </div>
      </div>
    </main>
  );
}
