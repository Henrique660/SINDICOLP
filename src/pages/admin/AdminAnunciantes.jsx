import { useRef, useState } from 'react'
import { useData } from '../../context/DataContext'
import { fileToDataUrl } from '../../services/uploadImage'
import { EmptyState, Field, Input, Modal, PageHead, StatusDot, Toggle } from './ui'

/*
  AdminAnunciantes.jsx — CRUD de Anunciantes (carrossel da página inicial).

  MANUTENÇÃO:
  - Campos: nome, imagem (URL OU upload do dispositivo), link externo
    (afiliado/site do anunciante, ancorado no clique do banner) e status ativo.
  - Upload: converte o arquivo para data URL (redimensionado/comprimido) e
    persiste no localStorage — ver src/services/uploadImage.js.
  - Anunciantes com `ativo` desligado ficam fora do carrossel da Home.
*/
const blank = () => ({
  id: '',
  nome: '',
  imagem: '',
  linkExterno: '',
  ativo: true
})

export default function AdminAnunciantes() {
  const { anunciantes, upsert, remove, uid } = useData()
  const [editing, setEditing] = useState(null)
  const [errors, setErrors] = useState({})
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef(null)

  const openNew = () => {
    setErrors({})
    setUploading(false)
    setEditing({ ...blank() })
  }
  const openEdit = (item) => {
    setErrors({})
    setUploading(false)
    setEditing({ ...blank(), ...item })
  }
  const close = () => {
    setEditing(null)
    setUploading(false)
  }
  const set = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setEditing((prev) => ({ ...prev, [field]: value }))
  }

  async function onFile(e) {
    const file = e.target.files && e.target.files[0]
    e.target.value = ''
    if (!file) return
    setUploading(true)
    try {
      const dataUrl = await fileToDataUrl(file)
      setEditing((prev) => ({ ...prev, imagem: dataUrl }))
      setErrors((prev) => ({ ...prev, imagem: '' }))
    } catch (err) {
      setErrors((prev) => ({ ...prev, imagem: err.message }))
    } finally {
      setUploading(false)
    }
  }

  function validate() {
    const errs = {}
    if (!editing.nome.trim()) errs.nome = 'Informe o nome do anunciante.'
    if (!editing.imagem.trim()) {
      errs.imagem = 'Informe a URL da imagem ou faça upload do banner.'
    } else if (!/^(https?:\/\/|data:image\/)/.test(editing.imagem)) {
      errs.imagem = 'Use uma URL válida (http/https) ou faça upload da imagem.'
    }
    if (!editing.linkExterno.trim()) {
      errs.linkExterno = 'Informe o link externo.'
    } else if (!/^#|^https?:\/\//.test(editing.linkExterno)) {
      errs.linkExterno = 'Use uma URL válida (http/https) ou #.'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function save(e) {
    e.preventDefault()
    if (!validate()) return
    upsert('anunciantes', {
      ...editing,
      id: editing.id || uid()
    })
    close()
  }

  function del(item) {
    if (window.confirm(`Excluir o anunciante "${item.nome}"?`)) {
      remove('anunciantes', item.id)
    }
  }

  return (
    <>
      <PageHead
        title="Anunciantes"
        subtitle="Banners exibidos no carrossel da página inicial."
        actions={
          <button className="af-btn af-btn--primary" type="button" onClick={openNew}>
            + Novo anunciante
          </button>
        }
      />

      {anunciantes.length === 0 ? (
        <EmptyState text="Nenhum anunciante cadastrado. Clique em “+ Novo anunciante”." />
      ) : (
        <div className="af-table-wrap">
          <table className="af-table">
            <thead>
              <tr>
                <th>Banner</th>
                <th>Anunciante</th>
                <th>Link externo</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {anunciantes.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.imagem ? (
                      <img className="af-logo" src={item.imagem} alt="" />
                    ) : (
                      <span className="af-logo af-logo--placeholder">{(item.nome || '·').slice(0, 1)}</span>
                    )}
                  </td>
                  <td className="af-table__title">{item.nome}</td>
                  <td className="af-table__text">
                    <a href={item.linkExterno} target="_blank" rel="noopener noreferrer">
                      {item.linkExterno}
                    </a>
                  </td>
                  <td>
                    <StatusDot active={item.ativo} />
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
        <Modal title={editing.id ? 'Editar anunciante' : 'Novo anunciante'} onClose={close}>
          <form className="af-form" onSubmit={save}>
            <Field label="Nome do anunciante" required>
              <Input value={editing.nome} onChange={set('nome')} placeholder="Ex.: Admin Conecta" />
              {errors.nome && <small className="af-error">{errors.nome}</small>}
            </Field>

            <Field label="Imagem do banner" hint="Informe uma URL ou faça upload de uma imagem do dispositivo">
              <Input type="url" value={editing.imagem} onChange={set('imagem')} placeholder="https://.../banner.png" />
              {editing.imagem && /^(https?:\/\/|data:image\/)/.test(editing.imagem) && (
                <img className="af-logo-preview af-logo-preview--banner" src={editing.imagem} alt="Pré-visualização do banner" />
              )}
              <div className="af-upload">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="af-upload__input"
                  onChange={onFile}
                  hidden
                />
                <button
                  type="button"
                  className="af-btn af-btn--primary"
                  onClick={() => fileRef.current && fileRef.current.click()}
                  disabled={uploading}
                >
                  {uploading ? 'Enviando…' : 'Upload do dispositivo'}
                </button>
                {editing.imagem && (
                  <button
                    type="button"
                    className="af-btn af-btn--ghost"
                    onClick={() => setEditing((prev) => ({ ...prev, imagem: '' }))}
                  >
                    Remover imagem
                  </button>
                )}
              </div>
              {errors.imagem && <small className="af-error">{errors.imagem}</small>}
            </Field>

            <Field label="Link externo (afiliado/site do anunciante)" hint="Ao clicar no banner, o usuário é levado a este link" required>
              <Input type="url" value={editing.linkExterno} onChange={set('linkExterno')} placeholder="https://... ou #" />
              {errors.linkExterno && <small className="af-error">{errors.linkExterno}</small>}
            </Field>

            <div className="af-toggles">
              <Toggle checked={editing.ativo} onChange={set('ativo')} label="Exibir no carrossel da página inicial" />
            </div>

            <div className="af-form__actions">
              <button type="button" className="af-btn af-btn--ghost" onClick={close}>
                Cancelar
              </button>
              <button type="submit" className="af-btn af-btn--primary">
                {editing.id ? 'Salvar alterações' : 'Adicionar anunciante'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  )
}