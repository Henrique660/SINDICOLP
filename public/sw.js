/*
  sw.js — service worker do BLOKKO.

  MANUTENÇÃO:
  - Registrado apenas em produção (src/main.jsx, guard import.meta.env.PROD).
  - Estratégia: navegação sempre em network-first com fallback ao cache
    (offline); demais GET (assets com hash, imagens) em cache-first com
    atualização em segundo plano.
  - Todo o cache é apagado no activate: assim, ao publicar um novo build, os
    assets com hash antigo são descartados automaticamente.
  - O manifest, ícones e o próprio index.html entram no pré-cache do install.
*/

const CACHE = 'blokko-v' + Date.now()
const CORE = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/pwa-192.png',
  '/pwa-512.png',
  '/pwa-maskable-512.png'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) =>
        Promise.all(
          CORE.map((url) =>
            fetch(url)
              .then((res) => {
                if (res.ok) cache.put(url, res)
              })
              .catch(() => {})
          )
        )
      )
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone()
          caches.open(CACHE).then((cache) => cache.put('/index.html', copy))
          return res
        })
        .catch(() => caches.match('/index.html'))
    )
    return
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone()
            caches.open(CACHE).then((cache) => cache.put(request, copy))
          }
          return res
        })
        .catch(() => cached)
      return cached || network
    })
  )
})