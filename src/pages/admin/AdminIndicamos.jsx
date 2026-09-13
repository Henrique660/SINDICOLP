import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { INDICACAO_CATEGORIAS, INDICACAO_ICONS } from '../../config/admin'
import { Badge, EmptyState, Field, Input, Modal, PageHead, Select, StatusDot, Toggle } from './ui'
import { truncate } from './format'

/*
  AdminIndicamos.jsx — CRUD de Nós Indicamos (fornecedores/recomendações).

  MANUTENÇÃO:
  - Campos: nome, logo (URL + preview), categoria, descrição, itens (1 por linha),
    ícone, link externo e destaque.
  - Categorias e ícones disponíveis em src/config/admin.js e src/config/iconMap.js.
  - `normalizeItens` converte o textarea (linhas) no array persistido.
*/

const blank = () => ({
  id: '',
  nome: '',
  logo: '',
  categoria: INDICACAO_CATEGORIAS[0],
  descricao: '',
  itens: '',
  icon: 'building',
  linkExterno: '',
  destaque: false
})

function normalizeItens(raw) {
  return String(raw || '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
}

export default function AdminIndicamos() {
  const { indicacoes, upsert, remove, uid } = useData()
  const [editing, setEditing] = useState(null)
  const [errors, setErrors] = useState({})

  const openNew = () => {
    setErrors({})
    setEditing({ ...blank() })
  }
  const openEdit = (item) => {
    setErrors({})
    setEditing({ ...blank(), ...item, itens: (item.itens || []).join('\n') })
  }
  const close = () => setEditing(null)
  const set = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setEditing((prev) => ({ ...prev, [field]: value }))
  }

  function validate() {
    const errs = {}
    if (!editing.nome.trim()) errs.nome = 'Informe o nome do fornecedor/serviço.'
    if (!editing.descricao.trim()) errs.descricao = 'Informe a descrição rápida.'
    if (!editing.linkExterno.trim()) {
      errs.linkExterno = 'Informe o link externo.'
    } else if (!/^#|^https?:\/\//.test(editing.linkExterno)) {
      errs.linkExterno = 'Use uma URL válida (http/https) ou #.'
    }
    if (editing.logo && !/^https?:\/\//.test(editing.logo)) {
      errs.logo = 'A logo deve ser uma URL de imagem (http/https).'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function save(e) {
    e.preventDefault()
    if (!validate()) return
    const payload = {
      ...editing,
      itens: normalizeItens(editing.itens),
      id: editing.id || uid()
    }
    upsert('indicacoes', payload)
    close()
  }

  function del(item) {
    if (window.confirm(`Excluir "${item.nome}"?`)) {
      remove('indicacoes', item.id)
    }
  }

  return (
    <>
      <PageHead
        title="Nós Indicamos"
        subtitle="Fornecedores, serviços e recomendações da rede de parceiros."
        actions={
          <button className="af-btn af-btn--primary" type="button" onClick={openNew}>
            + Novo parceiro
          </button>
        }
      />

      {indicacoes.length === 0 ? (
        <EmptyState text="Nenhuma indicação cadastrada. Clique em “+ Novo parceiro”." />
      ) : (
        <div className="af-table-wrap">
          <table className="af-table">
            <thead>
              <tr>
                <th>Logo</th>
                <th>Fornecedor / Serviço</th>
                <th>Categoria</th>
                <th>Descrição</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {indicacoes.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.logo ? (
                      <img className="af-logo" src={item.logo} alt="" />
                    ) : (
                      <span className="af-logo af-logo--placeholder">{(item.nome || '·').slice(0, 1)}</span>
                    )}
                  </td>
                  <td className="af-table__title">{item.nome}</td>
                  <td>
                    <Badge tone="indigo">{item.categoria}</Badge>
                  </td>
                  <td className="af-table__text">{truncate(item.descricao, 70)}</td>
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
        <Modal title={editing.id ? 'Editar indicação' : 'Nova indicação'} onClose={close}>
          <form className="af-form" onSubmit={save}>
            <Field label="Nome do fornecedor / serviço" required>
              <Input value={editing.nome} onChange={set('nome')} placeholder="Ex.: Contabilidade Silva & Cia" />
              {errors.nome && <small className="af-error">{errors.nome}</small>}
            </Field>

            <div className="af-grid af-grid--2">
              <Field label="Categoria" required>
                <Select value={editing.categoria} onChange={set('categoria')}>
                  {INDICACAO_CATEGORIAS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Ícone do card">
                <Select value={editing.icon} onChange={set('icon')}>
                  {INDICACAO_ICONS.map((i) => (
                    <option key={i.value} value={i.value}>
                      {i.label}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>

            <Field label="Logotipo/Imagem (URL)" hint="Cole a URL da imagem — aparece um preview quando válida">
              <Input type="url" value={editing.logo} onChange={set('logo')} placeholder="https://.../logo.png" />
              {editing.logo && /^https?:\/\//.test(editing.logo) && (
                <img className="af-logo-preview" src={editing.logo} alt="Pré-visualização da logo" />
              )}
              {errors.logo && <small className="af-error">{errors.logo}</small>}
            </Field>

            <Field label="Descrição rápida" required>
              <Input value={editing.descricao} onChange={set('descricao')} placeholder="O que esse parceiro oferece" />
              {errors.descricao && <small className="af-error">{errors.descricao}</small>}
            </Field>

            <Field label="Itens em destaque (um por linha)" hint="Listagem exibida dentro do card">
              <Input value={editing.itens} onChange={set('itens')} placeholder={'Escrituração condominial\nRelatórios e balancetes'} />
            </Field>

            <Field label="Link externo (afiliado/site do parceiro)" required>
              <Input type="url" value={editing.linkExterno} onChange={set('linkExterno')} placeholder="https://... ou #" />
              {errors.linkExterno && <small className="af-error">{errors.linkExterno}</small>}
            </Field>

            <div className="af-toggles">
              <Toggle checked={editing.destaque} onChange={set('destaque')} label="Destacar na página" />
            </div>

            <div className="af-form__actions">
              <button type="button" className="af-btn af-btn--ghost" onClick={close}>
                Cancelar
              </button>
              <button type="submit" className="af-btn af-btn--primary">
                {editing.id ? 'Salvar alterações' : 'Adicionar indicação'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  )
}