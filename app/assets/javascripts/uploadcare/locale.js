import uploadcare from './namespace'

var utils = uploadcare.utils
var s = uploadcare.settings
var $ = uploadcare.jQuery

uploadcare.namespace('locale', function (ns) {
  var defaultLang = 'en'
  var defaults = {
    lang: defaultLang,
    translations: ns.translations[defaultLang],
    pluralize: ns.pluralize[defaultLang]
  }

  var _build = function (settings) {
    var lang, pluralize, translations
    lang = settings.locale || defaults.lang
    translations = $.extend(true, {}, ns.translations[lang], settings.localeTranslations)
    pluralize = $.isFunction(settings.localePluralize) ? settings.localePluralize : ns.pluralize[lang]

    return {
      lang: lang,
      translations: translations,
      pluralize: pluralize
    }
  }

  var build = utils.once(function () {
    return _build(s.build())
  })

  // Backdoor for widget constructor
  ns.rebuild = function (settings) {
    var result = _build(s.build(settings))

    build = function () {
      return result
    }

    return build
  }

  var translate = function (key, node) {
    var i, len, path, subkey
    path = key.split('.')
    for (i = 0, len = path.length; i < len; i++) {
      subkey = path[i]
      if (node == null) {
        return null
      }
      node = node[subkey]
    }
    return node
  }

  ns.t = function (key, n) {
    var locale, ref, value
    locale = build()
    value = translate(key, locale.translations)
    if ((value == null) && locale.lang !== defaults.lang) {
      locale = defaults
      value = translate(key, locale.translations)
    }
    if (n != null) {
      if (locale.pluralize != null) {
        value = ((ref = value[locale.pluralize(n)]) != null ? ref.replace('%1', n) : undefined) || n
      } else {
        value = ''
      }
    }
    return value || ''
  }

  return ns.t
})
