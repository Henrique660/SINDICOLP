import { Link } from 'react-router-dom'
import { IconWhatsApp, IconMail, IconTelegram, IconYouTube, IconInstagram, IconPin } from './Icons'
import { SITE_NAME, SITE_TAGLINE, SITE_EMAIL, SITE_PHONE, PHONE_URL, SOCIAL, COPYRIGHT } from '../config/site'

/*
  Footer.jsx — rodapé global com navegação, parcerias e contato.

  MANUTENÇÃO:
  - Colunas de links: editadas diretamente aqui (Navegação / Parcerias e conteúdo).
  - "Entrar" aponta para o painel administrativo (/admin).
  - Contatos e redes vêm de src/config/site.js; crédito do rodapé no footer-bottom.
  - Aviso: sempre usar <Link> (react-router) para rotas internas, nunca <link>.
*/

export default function Footer() {
  return (
    <footer className="site-footer" data-od-id="site-footer">
      <div className="container footer-main">
        <div>
          <Link className="brand" to="/" aria-label={`${SITE_NAME} — Início`}>
            <span className="brand__mark" aria-hidden="true"><span>B</span></span>
            <span className="brand__name">{SITE_NAME}<small>{SITE_TAGLINE}</small></span>
          </Link>
          <p className="footer-desc">{SITE_NAME}: transformando a gestão condominial no Brasil com informação, capacitação e inovação para síndicos e gestores.</p>
        </div>
        <div>
          <h3>Navegação</h3>
          <div className="footer-links">
            <Link to="/">Início</Link>
            <Link to="/cursos-eventos">Cursos e eventos</Link>
            <Link to="/colunistas">Colunistas</Link>
            <Link to="/nos-indicamos">Nós indicamos</Link>
            <a href={SOCIAL.youtube} target="_blank" rel="noopener">Podcast</a>
            <Link to="/admin">Entrar</Link>
          </div>
        </div>
        <div>
          <h3>Parcerias e conteúdo</h3>
          <div className="footer-links">
            <Link to="/colunistas">Seja um colunista</Link>
            <Link to="/nos-indicamos">Indique um parceiro</Link>
            <Link to="/cursos-eventos">Banco de talentos</Link>
            <Link to="/cursos-eventos">Inscrição em cursos</Link>
            <Link to="/cursos-eventos">Agenda de eventos</Link>
          </div>
        </div>
        <div>
          <h3>Contato</h3>
          <div className="footer-contact">
            <a href={PHONE_URL} target="_blank" rel="noopener">
              <IconWhatsApp size={16} />
              {SITE_PHONE}
            </a>
            <a href={`mailto:${SITE_EMAIL}`}>
              <IconMail size={16} />
              {SITE_EMAIL}
            </a>
            <div className="footer-social">
              <a href={SOCIAL.telegram} target="_blank" rel="noopener" aria-label="Telegram"><IconTelegram size={17} /></a>
              <a href={SOCIAL.youtube} target="_blank" rel="noopener" aria-label="YouTube"><IconYouTube size={17} /></a>
              <a href={SOCIAL.instagram} target="_blank" rel="noopener" aria-label="Instagram"><IconInstagram size={17} /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© <span data-year>2026</span> {COPYRIGHT}</span>
        <span>São Paulo <IconPin size={12} /> SP · Brasil</span>
        <span className="footer-credit">Desenvolvido por <a href="https://www.sysvault.com.br/" target="_blank" rel="noopener">SysVault SW</a></span>
      </div>
    </footer>
  )
}