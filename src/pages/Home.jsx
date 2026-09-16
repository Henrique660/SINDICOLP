import SectionHead from '../components/SectionHead'
import AdCarousel from '../components/AdCarousel'
import ServicesMarketplace from '../components/ServicesMarketplace'
import { IconBuilding, IconLayers, IconMail, IconPin, IconWhatsApp } from '../components/Icons'
import { SITE_NAME, SITE_TAGLINE, SITE_EMAIL, SITE_PHONE, PHONE_URL, WA_CHAT } from '../config/site'

/*
  Home.jsx — página inicial da BLOOKKO.

  MANUTENÇÃO:
  - Ordem dos blocos (de cima para baixo):
      1. Anunciantes            (AdCarousel hero — banners do CMS, AdminAnunciantes)
      2. Vitrine de serviços    (5 colunas + scroll infinito em ServicesMarketplace,
                                 com 2 banners verticais laterais reutilizando o
                                 AdCarousel via variant="rail" em .mp__rail)
      3. Informações da empresa  (bloco institucional + rodapé)
  - Cursos e eventos NÃO ficam na Home: a agenda e o catálogo vivem apenas em
    /cursos-eventos (CursosEventos.jsx).
  - Espaços publicitários: 1 banner em cada lateral (esquerda/direita) ao redor
    da vitrine. Somem/empilham no mobile via media queries em styles.css.
  - Textos institucionais do bloco final: editados abaixo em `company`.
*/

const company = {
  mission: 'Informação de qualidade, capacitação profissional e indicações de confiança reunidas em uma única plataforma para a comunidade condominial.',
  criteria: 'A rede de parceiros que apoia a gestão é construída em parceria com órgãos de classe, como o Conasi-PA e o CRA-PA, garantindo critério nas indicações.'
}

export default function Home() {
  return (
    <>
      <AdCarousel />

      <section className="section section--surface section--marketplace" data-od-id="nos-indicamos">
        <div className="container">
          <SectionHead eyebrow="Nós indicamos" title="Marketplace de serviços para a gestão condominial" />
        </div>

        <div className="container container--wide">
          <div className="mp__layout">
            <aside className="mp__rail mp__rail--left" aria-label="Publicidade">
              <AdCarousel variant="rail" />
            </aside>

            <ServicesMarketplace />

            <aside className="mp__rail mp__rail--right" aria-label="Publicidade">
              <AdCarousel variant="rail" />
            </aside>
          </div>
        </div>
      </section>

      <section className="section section--surface" data-od-id="sobre">
        <div className="container about">
          <SectionHead eyebrow="Informações da empresa" title={`Conheça a ${SITE_NAME}`}>
            {SITE_NAME} — {SITE_TAGLINE}. Transformamos a gestão condominial no Brasil com informação, capacitação e inovação para síndicos, administradoras e gestores de condomínios.
          </SectionHead>

          <div className="about-grid">
            <div className="about-card" data-reveal>
              <span className="about-card__icon"><IconLayers size={20} /></span>
              <h3>Nossa missão</h3>
              <p>{company.mission}</p>
            </div>
            <div className="about-card" data-reveal>
              <span className="about-card__icon"><IconBuilding size={20} /></span>
              <h3>Curadoria de parceiros</h3>
              <p>{company.criteria}</p>
            </div>
            <div className="about-card" data-reveal>
              <span className="about-card__icon"><IconPin size={20} /></span>
              <h3>Onde estamos</h3>
              <p>São Paulo · SP — Brasil. Atendimento próximo por WhatsApp e e-mail.</p>
              <div className="about-card__contact">
                <a href={PHONE_URL} target="_blank" rel="noopener">
                  <IconWhatsApp size={14} />
                  {SITE_PHONE}
                </a>
                <a href={`mailto:${SITE_EMAIL}`}>
                  <IconMail size={14} />
                  {SITE_EMAIL}
                </a>
              </div>
            </div>
          </div>

          <div className="about__cta" data-reveal>
            <a className="btn btn--primary" href={WA_CHAT} target="_blank" rel="noopener">
              <IconWhatsApp size={15} />
              Falar com a equipe
            </a>
          </div>
        </div>
      </section>
    </>
  )
}