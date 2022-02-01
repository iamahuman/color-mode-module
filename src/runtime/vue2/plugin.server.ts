import { hid, preference, script as innerHTML } from '#color-mode-options'

const script = {
  hid: hid,
  innerHTML,
  pbody: true
}

const addScript = (head) => {
  head.script = head.script || []
  head.script.push(script)
  const serializeProp = '__dangerouslyDisableSanitizersByTagID'
  head[serializeProp] = head[serializeProp] || {}
  head[serializeProp][hid] = ['innerHTML']
}

export default function (ctx, inject) {
  if (typeof ctx.app.head === 'function') {
    const originalHead = ctx.app.head
    ctx.app.head = function () {
      const head = originalHead.call(this) || {}
      addScript(head)
      return head
    }
  } else {
    addScript(ctx.app.head)
  }

  const colorMode = {
    preference,
    value: preference,
    unknown: true,
    forced: false
  }

  if (ctx.route.matched[0]) {
    const pageColorMode = ctx.route.matched[0].components.default.options.colorMode
    if (pageColorMode && pageColorMode !== 'system') {
      colorMode.value = pageColorMode
      colorMode.forced = true

      ctx.app.head.bodyAttrs = ctx.app.head.bodyAttrs || {}
      ctx.app.head.bodyAttrs['data-color-mode-forced'] = pageColorMode
    } else if (pageColorMode === 'system') {
      console.warn('You cannot force the colorMode to system at the page level.')
    }
  }

  ctx.beforeNuxtRender(({ nuxtState }) => {
    nuxtState.colorMode = colorMode
  })

  inject('colorMode', colorMode)
}
