import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useData } from '../../context/DataContext'
import { COLUNISTA_TAGS } from '../../config/admin'
import { Badge, EmptyState, Field, Input, Modal, PageHead, StatusDot, Toggle } from './ui'
import { fmtData } from './format'

/*
  AdminColunistas.jsx — CRUD de Colunistas (artigos/notícias).

  MANUTENÇÃO:
  - Conteúdo usa Markdown: textarea na aba "Escrever" e preview via
    react-markdown na aba "Pré-visualizar".
  - Tags: sugeridas em src/config/admin.js (COLUNISTA_TAGS); o campo aceita
    qualquer texto (input + datalist).
  - A landing renderiza o texto resumido (stripMd/truncate) em Colunistas.jsx.
*/

const blank = () => ({
  id: '',
  tag: 'Gestão',
  titulo: '',
  conteudo: '',
  dataPublicacao: '',
  linkMateria: '',
  destaque: false
})

export default function AdminColunistas() {
  const { colunistas, upsert, remove, uid } = useData()
  const [editing, setEditing] = useState(null)
  const [errors, setErrors] = useState({})
  const [view, setView] = useState('editar')

  const openNew = () => {
    setErrors({})
    setView('editar')
    setEditing({ ...blank() })
  }
  const openEdit = (item) => {
    setErrors({})
    setView('editar')
    setEditing({
      ...blank(),
      ...item,
      dataPublicacao: item.dataPublicacao ? item.dataPublicacao.slice(0, 10) : ''
    })
  }
  const close = () => setEditing(null)
  const set = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setEditing((prev) => ({ ...prev, [field]: value }))
  }

  function validate() {
    const errs = {}
    if (!editing.titulo.trim()) errs.titulo = 'Informe o título.'
    if (!editing.conteudo.trim()) errs.conteudo = 'Informe o conteúdo.'
    if (!editing.dataPublicacao) errs.dataPublicacao = 'Informe a data de publicação.'
    if (!editing.linkMateria.trim()) {
      errs.linkMateria = 'Informe o link da matéria completa.'
    } else if (!/^#|^https?:\/\//.test(editing.linkMateria)) {
      errs.linkMateria = 'Use uma URL válida (http/https) ou #.'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function save(e) {
    e.preventDefault()
    if (!validate()) return
    const payload = { ...editing, id: editing.id || uid() }
    upsert('colunistas', payload)
    close()
  }

  function del(item) {
    if (window.confirm(`Excluir "${item.titulo}"?`)) {
      remove('colunistas', item.id)
    }
  }

  return (
    <>
      <PageHead
        title="Colunistas"
        subtitle="Artigos e notícias publicados no portal — conteúdo em Markdown."
        actions={
          <button className="af-btn af-btn--primary" type="button" onClick={openNew}>
            + Novo artigo
          </button>
        }
      />

      {colunistas.length === 0 ? (
        <EmptyState text="Nenhum artigo cadastrado. Clique em “+ Novo artigo”." />
      ) : (
        <div className="af-table-wrap">
          <table className="af-table">
            <thead>
              <tr>
                <th>Tag</th>
                <th>Título</th>
                <th>Publicado em</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {colunistas.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Badge tone="sky">{item.tag || '—'}</Badge>
                  </td>
                  <td className="af-table__title">{item.titulo}</td>
                  <td>{fmtData(item.dataPublicacao)}</td>
                  <td>
                    <StatusDot active={item.destaque} />
                  </td>
                  <td className="af-actions">
                    <button type="button" className="af-link" onClick={() => openEdit(item)}>
                      Editar
                    </button>
                    <button type="button" className="af-link af-link--danger" onClick={() => del(item)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <Modal title={editing.id ? 'Editar artigo' : 'Novo artigo'} onClose={close}>
          <form className="af-form" onSubmit={save}>
            <div className="af-grid af-grid--3">
              <Field label="Tag" required>
                <Input list="colunistas-tags" value={editing.tag} onChange={set('tag')} placeholder="Gestão" />
                <datalist id="colunistas-tags">
                  {COLUNISTA_TAGS.map((t) => (
                    <option key={t} value={t} />
                  ))}
                </datalist>
              </Field>
              <Field label="Data de publicação" required>
                <Input type="date" value={editing.dataPublicacao} onChange={set('dataPublicacao')} />
                {errors.dataPublicacao && <small className="af-error">{errors.dataPublicacao}</small>}
              </Field>
              <Field label="Status" required>
                <Toggle checked={editing.destaque} onChange={set('destaque')} label="Destacar" />
              </Field>
            </div>

            <Field label="Título do artigo / notícia" required>
              <Input value={editing.titulo} onChange={set('titulo')} placeholder="Título da matéria" />
              {errors.titulo && <small className="af-error">{errors.titulo}</small>}
            </Field>

            <Field label="Conteúdo (Markdown)" required>
              <div className="af-tabs">
                <button
                  type="button"
                  className={view === 'editar' ? 'is-active' : ''}
                  onClick={() => setView('editar')}
                >
                  Escrever
                </button>
                <button
                  type="button"
                  className={view === 'preview' ? 'is-active' : ''}
                  onClick={() => setView('preview')}
                >
                  Pré-visualizar
                </button>
              </div>
              {view === 'editar' ? (
                <textarea
                  className="af-input af-editor"
                  rows={10}
                  value={editing.conteudo}
                  onChange={set('conteudo')}
                  placeholder={'# Subtítulo\n\nEscreva o conteúdo aqui com **formatação** Markdown…'}
                />
              ) : (
                <div className="md-preview">
                  <ReactMarkdown>{editing.conteudo}</ReactMarkdown>
                </div>
              )}
              {errors.conteudo && <small className="af-error">{errors.conteudo}</small>}
            </Field>

            <Field label="Link da matéria completa" required hint="Ancoragem do botão “Ler mais”">
              <Input
                type="url"
                value={editing.linkMateria}
                onChange={set('linkMateria')}
                placeholder="https://... ou #"
              />
              {errors.linkMateria && <small className="af-error">{errors.linkMateria}</small>}
            </Field>

            <div className="af-form__actions">
              <button type="button" className="af-btn af-btn--ghost" onClick={close}>
                Cancelar
              </button>
              <button type="submit" className="af-btn af-btn--primary">
                {editing.id ? 'Salvar alterações' : 'Publicar artigo'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  )
}