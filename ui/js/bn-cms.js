/**
 * Blacnova CMS bridge - maintenance, published content, media, pageview analytics.
 */
;(function () {
  const API = 'https://blacnova-api.nic-58f.workers.dev'
  const DOMAIN = 'www.blacnova.net'

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  }

  function applyContent(blocks) {
    if (!Array.isArray(blocks)) return
    blocks.forEach(function (block) {
      document.querySelectorAll('[data-bn-content="' + block.id + '"]').forEach(function (el) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.value = block.value
        else if (el.tagName === 'IMG') el.setAttribute('alt', block.value)
        else el.textContent = block.value
      })
    })
  }

  function applyMedia(media) {
    if (!Array.isArray(media)) return
    var byName = {}
    media.forEach(function (item) {
      if (item && item.name && item.url) byName[item.name] = item.url
    })
    document.querySelectorAll('[data-bn-media]').forEach(function (el) {
      var key = el.getAttribute('data-bn-media')
      if (!key || !byName[key]) return
      if (el.tagName === 'IMG') el.setAttribute('src', byName[key])
      else el.style.backgroundImage = 'url("' + byName[key] + '")'
    })
    // Patch Alpine carousel slides that reference ui/img filenames
    if (typeof Alpine !== 'undefined' && typeof Alpine.$data === 'function') {
      document.querySelectorAll('[x-data]').forEach(function (el) {
        try {
          var data = Alpine.$data(el)
          if (!data || !Array.isArray(data.slides)) return
          data.slides.forEach(function (slide) {
            if (!slide || !slide.src) return
            var name = String(slide.src).split('/').pop().split('?')[0]
            if (byName[name]) slide.src = byName[name]
          })
        } catch (e) {}
      })
    }
  }

  function showMaintenance(maintenance) {
    if (!maintenance || !maintenance.enabled) return
    if (document.getElementById('bn-maintenance-overlay')) return

    var overlay = document.createElement('div')
    overlay.id = 'bn-maintenance-overlay'
    overlay.setAttribute(
      'style',
      'position:fixed;inset:0;z-index:2147483646;background:#0a0a0a;color:#fff;display:flex;align-items:center;justify-content:center;padding:24px;font-family:Poppins,sans-serif;text-align:center;',
    )
    overlay.innerHTML =
      '<div style="max-width:480px">' +
      '<h1 style="font-size:28px;font-weight:500;margin:0 0 12px">' +
      escapeHtml(maintenance.title || "We'll be right back") +
      '</h1>' +
      '<p style="color:#9ca3af;line-height:1.6;margin:0 0 16px">' +
      escapeHtml(maintenance.message || '') +
      '</p>' +
      (maintenance.expectedReturn
        ? '<p style="color:#d4611c;font-size:14px;margin:0">Expected return: ' +
          escapeHtml(maintenance.expectedReturn) +
          '</p>'
        : '') +
      '</div>'
    document.documentElement.appendChild(overlay)
    try {
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
    } catch (e) {}
  }

  function trackPageview() {
    try {
      var payload = JSON.stringify({
        domain: DOMAIN,
        path: location.pathname + location.search,
        referrer: document.referrer || '',
      })
      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          API + '/v1/public/analytics/collect',
          new Blob([payload], { type: 'application/json' }),
        )
      } else {
        fetch(API + '/v1/public/analytics/collect', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
        }).catch(function () {})
      }
    } catch (e) {}
  }

  async function load() {
    try {
      var res = await fetch(API + '/v1/public/' + encodeURIComponent(DOMAIN) + '/site', {
        cache: 'no-store',
      })
      if (res.ok) {
        var data = await res.json()
        showMaintenance(data.maintenance)
        if (!(data.maintenance && data.maintenance.enabled)) {
          applyContent(data.content)
          applyMedia(data.media)
        }
      } else {
        var fallback = await fetch('/maintenance.json', { cache: 'no-store' }).catch(function () {
          return null
        })
        if (fallback && fallback.ok) showMaintenance(await fallback.json())
      }
    } catch (err) {
      console.warn('[bn-cms] failed to load content', err)
    }
    trackPageview()
  }

  window.BlacnovaCMS = {
    api: API,
    domain: DOMAIN,
    formStartedAt: Date.now(),
    submit: async function (payload) {
      var started =
        payload && (payload.formStarted || payload._t)
          ? payload.formStarted || payload._t
          : window.BlacnovaCMS.formStartedAt || Date.now()
      var body = Object.assign(
        {
          domain: DOMAIN,
          formStarted: started,
          website: '',
          _gotcha: '',
        },
        payload,
      )
      if (body.formStarted == null && body._t != null) body.formStarted = body._t
      var res = await fetch(API + '/v1/public/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        var err = await res.json().catch(function () {
          return { error: 'Submission failed' }
        })
        throw new Error(err.error || 'Submission failed')
      }
      window.BlacnovaCMS.formStartedAt = Date.now()
      return res.json()
    },
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load)
  } else {
    load()
  }
})()
