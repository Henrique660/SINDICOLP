/*
  uploadImage.js — processa imagens enviadas do dispositivo (upload local).

  MANUTENÇÃO:
  - Fase atual (frontend-only, localStorage): converte o arquivo em data URL
    redimensionado/comprimido via canvas, permitindo persistir sem backend.
  - Fase backend: troque por upload multipart para o servidor e use a URL
    retornada (o restante da tela não muda, pois continua recebendo a imagem).
*/

const MAX_WIDTH = 960
const QUALITY = 0.82

function loadAsImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = () => reject(new Error('Não foi possível abrir a imagem.'))
      img.src = reader.result
    }
    reader.onerror = () => reject(new Error('Não foi possível ler o arquivo.'))
    reader.readAsDataURL(file)
  })
}

function drawResized(img, maxWidth) {
  const scale = Math.min(1, maxWidth / Math.max(img.width, img.height))
  const width = Math.max(1, Math.round(img.width * scale))
  const height = Math.max(1, Math.round(img.height * scale))
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, width, height)
  ctx.drawImage(img, 0, 0, width, height)
  return canvas
}

export async function fileToDataUrl(file, { maxWidth = MAX_WIDTH, quality = QUALITY } = {}) {
  const img = await loadAsImage(file)
  const canvas = drawResized(img, maxWidth)
  for (const mime of ['image/webp', 'image/jpeg']) {
    try {
      const dataUrl = canvas.toDataURL(mime, quality)
      if (dataUrl.indexOf(`data:${mime}`) === 0) return dataUrl
    } catch (e) {
      /* tenta o próximo formato */
    }
  }
  return canvas.toDataURL('image/png')
}