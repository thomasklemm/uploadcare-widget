import uploadcare from './namespace.js'

var tpl = uploadcare.templates.tpl

uploadcare.settings.waitForSettings.add(function (settings) {
  // todo: don't use settings in styles
  var css = tpl('styles', {
    settings: settings
  })

  var head = document.querySelector('head')
  var style = document.createElement('style')
  style.setAttribute('type', 'text/css')

  if (style.styleSheet != null) {
    style.styleSheet.cssText = css
  } else {
    style.appendChild(document.createTextNode(css))
  }

  return head.insertBefore(style, head.firstChild)
})
