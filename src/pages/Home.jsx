import { Link } from 'react-router-dom'
import SectionHead from '../components/SectionHead'
import EventCard from '../components/EventCard'
import AdCarousel from '../components/AdCarousel'
import ServicesMarketplace from '../components/ServicesMarketplace'
import { IconArrowRight, IconBuilding, IconLayers, IconMail, IconPin, IconWhatsApp } from '../components/Icons'
import { SITE_NAME, SITE_TAGLINE, SITE_EMAIL, SITE_PHONE, PHONE_URL, WA_CHAT } from '../config/site'

/*
  Home.jsx — página inicial da BLOOKKO.

  MANUTENÇÃO:
  - Ordem dos blocos (de cima para baixo):
      1. Anunciantes            (AdCarousel — banners do CMS, AdminAnunciantes)
      2. Marketplace de serviços (indicacoes do CMS, AdminIndicamos)
      3. Cursos e eventos        (EventCard em destaque + link p/ /cursos-eventos)
      4. Informações da empresa  (bloco institucional + rodapé)
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

      <section className="section section--surface" data-od-id="nos-indicamos">
        <div className="container">
          <SectionHead eyebrow="Nós indicamos" title="Marketplace de serviços para a gestão condominial">
            Profissionais e empresas selecionadas pela equipe do {SITE_NAME} para apoiar síndicos e administradoras no dia a dia — com critério, atualização e experiência no mercado brasileiro.
          </SectionHead>

          <ServicesMarketplace />
        </div>
      </section>

      <section className="section" data-od-id="cursos-eventos">
        <div className="container">
          <SectionHead eyebrow="Cursos e eventos" title="Próximo congresso da agenda">
            Formação contínua e encontros que conectam síndicos, administradoras e especialistas do mercado condominial no Brasil — confira o evento em destaque e explore a agenda completa.
          </SectionHead>

          <EventCard
            meta={['Congresso Nacional', 'Organização parceira']}
            title="CONASI CONFIANÇA — Congresso Nacional de Administradoras e Síndicos"
            description="No dia 28 de março de 2026, São Paulo recebe o evento que reúne especialistas, palestras estratégicas e networking para administradores, síndicos e profissionais do setor que buscam atualização, inovação e crescimento profissional."
            details={[
              { icon: 'date', label: 'Data', value: '28 de março de 2026' },
              { icon: 'time', label: 'Horário', value: 'das 9h às 18h' },
              { icon: 'local', label: 'Local', value: 'Hotel Central Plaza — São Paulo/SP' }
            ]}
            chip={{ day: '28', month: 'Mar · 2026' }}
            chipExtra="9h às 18h"
            ctaLabel="Inscrições abertas"
            ctaHref="#"
            ctaNote="Via Blookko · Vagas limitadas"
          />

          <div style={{ marginTop: 'clamp(28px,4vw,40px)' }} data-reveal>
            <Link className="btn btn--primary" to="/cursos-eventos">
              Ver todos os cursos e eventos <IconArrowRight size={15} />
            </Link>
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