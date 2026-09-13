import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { CURSO_ICONS } from '../../config/admin'
import { Badge, EmptyState, Field, Input, Modal, PageHead, Select, StatusDot, Toggle } from './ui'
import { fmtDataHora, isPast, truncate } from './format'

/*
  AdminCursosEventos.jsx — CRUD de Cursos e Eventos.

  MANUTENÇÃO:
  - Campos do formulário: título, descrição, carga horária, local/link online,
    link de inscrição, data (próxima execução), ícone, etiqueta, recorrente, destaque.
  - Regra de negócio: eventos `recorrente` continuam exibidos na landing após a
    data passada (ver src/pages/CursosEventos.jsx).
  - Persistência: DataContext.upsert/remove -> localStorage (fase atual).
  - Validação em `validate()`; novo registro cria id via `uid()` do store.
*/

const blank = () => ({
  id: '',
  tipo: 'curso',
  titulo: '',
  descricao: '',
  icon: 'graduation',
  badge: '',
  cargaHoraria: '',
  local: '',
  linkInscricao: '',
  data: '',
  recorrente: false,
  destaque: false
})

export default function AdminCursosEventos() {
  const { cursosEventos, upsert, remove, uid } = useData()
  const [editing, setEditing] = useState(null)
  const [errors, setErrors] = useState({})

  const openNew = () => {
    setErrors({})
    setEditing({ ...blank() })
  }
  const openEdit = (item) => {
    setErrors({})
    setEditing({
      ...blank(),
      ...item,
      data: item.data ? item.data.slice(0, 16) : ''
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
    if (!editing.descricao.trim()) errs.descricao = 'Informe a descrição.'
    if (!editing.linkInscricao.trim()) {
      errs.linkInscricao = 'Informe o link de inscrição.'
    } else if (!/^https?:\/\//.test(editing.linkInscricao)) {
      errs.linkInscricao = 'Use uma URL válida (iniciando com http:// ou https://).'
    }
    if (editing.tipo === 'evento' && !editing.local.trim() && !editing.data) {
      errs.local = 'Informe o local ou um link para o evento online.'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function save(e) {
    e.preventDefault()
    if (!validate()) return
    const payload = {
      ...editing,
      data: editing.data ? new Date(editing.data).toISOString() : '',
      id: editing.id || uid()
    }
    upsert('cursosEventos', payload)
    close()
  }

  function del(item) {
    if (window.confirm(`Excluir "${item.titulo}"?`)) {
      remove('cursosEventos', item.id)
    }
  }

  return (
    <>
      <PageHead
        title="Cursos e Eventos"
        subtitle="Gerencie cursos, eventos e seus links de inscrição."
        actions={
          <button className="af-btn af-btn--primary" type="button" onClick={openNew}>
            + Novo item
          </button>
        }
      />

      {cursosEventos.length === 0 ? (
        <EmptyState text="Nenhum curso ou evento cadastrado. Clique em “+ Novo item”." />
      ) : (
        <div className="af-table-wrap">
          <table className="af-table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Título</th>
                <th>Data</th>
                <th>Local / Carga</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {cursosEventos.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Badge tone={item.tipo === 'evento' ? 'sky' : 'indigo'}>{item.tipo}</Badge>
                  </td>
                  <td className="af-table__title">{item.titulo}</td>
                  <td>{item.tipo === 'evento' ? fmtDataHora(item.data) : 'Contínuo'}</td>
                  <td>{truncate(item.local || item.cargaHoraria, 36)}</td>
                  <td>
                    <StatusDot active={item.destaque} />
                    {item.tipo === 'evento' && item.recorrente && (
                      <span className="af-sub">recorrente · {isPast(item.data) ? 'próx. execução' : 'agendado'}</span>
                    )}
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
        <Modal title={editing.id ? 'Editar item' : 'Novo curso/evento'} onClose={close}>
          <form className="af-form" onSubmit={save}>
            <Field label="Tipo" required>
              <Select value={editing.tipo} onChange={set('tipo')}>
                <option value="curso">Curso</option>
                <option value="evento">Evento</option>
              </Select>
            </Field>

            <Field label="Título" required>
              <Input value={editing.titulo} onChange={set('titulo')} placeholder="Ex.: Formação de Síndicos Profissionais" />
              {errors.titulo && <small className="af-error">{errors.titulo}</small>}
            </Field>

            <Field label="Descrição" required>
              <Input value={editing.descricao} onChange={set('descricao')} placeholder="Resumo exibido no card" />
              {errors.descricao && <small className="af-error">{errors.descricao}</small>}
            </Field>

            <div className="af-grid af-grid--2">
              <Field label="Carga horária" hint="Ex.: 20h — vazio para eventos">
                <Input value={editing.cargaHoraria} onChange={set('cargaHoraria')} placeholder="20h" />
              </Field>
              <Field label="Local / Link do evento online">
                <Input value={editing.local} onChange={set('local')} placeholder="Online ao vivo ou endereço" />
                {errors.local && <small className="af-error">{errors.local}</small>}
              </Field>
            </div>

            <Field label="Link de inscrição (botão “Quero me inscrever”)" required>
              <Input
                type="url"
                value={editing.linkInscricao}
                onChange={set('linkInscricao')}
                placeholder="https://... (formulário ou Sympla)"
              />
              {errors.linkInscricao && <small className="af-error">{errors.linkInscricao}</small>}
            </Field>

            <div className="af-grid af-grid--2">
              <Field label="Próxima execução / data" hint="Eventos recorrentes permanecem exibidos">
                <Input type="datetime-local" value={editing.data} onChange={set('data')} />
              </Field>
              <Field label="Ícone do card">
                <Select value={editing.icon} onChange={set('icon')}>
                  {CURSO_ICONS.map((i) => (
                    <option key={i.value} value={i.value}>
                      {i.label}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>

            <div className="af-grid af-grid--2">
              <Field label="Etiqueta" hint="Ex.: “Inscrições abertas”, “Novo”">
                <Input value={editing.badge} onChange={set('badge')} placeholder="Vagas limitadas" />
              </Field>
            </div>

            <div className="af-toggles">
              {editing.tipo === 'evento' && (
                <Toggle
                  checked={editing.recorrente}
                  onChange={set('recorrente')}
                  label="Evento recorrente — continua exibido após a data (próxima execução)"
                />
              )}
              <Toggle checked={editing.destaque} onChange={set('destaque')} label="Destacar na página" />
            </div>

            <div className="af-form__actions">
              <button type="button" className="af-btn af-btn--ghost" onClick={close}>
                Cancelar
              </button>
              <button type="submit" className="af-btn af-btn--primary">
                {editing.id ? 'Salvar alterações' : 'Criar item'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  )
}