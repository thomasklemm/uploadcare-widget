import uploadcare from '../namespace'

var utils = uploadcare.utils
var settings = uploadcare.settings
var $ = uploadcare.jQuery

uploadcare.namespace('', function (ns) {
  var dataAttr = 'uploadcareWidget'
  var selector = '[role~="uploadcare-uploader"]'

  ns.initialize = function (container) {
    if (container == null) {
      container = ':root'
    }

    var res = []
    var ref = $(container)

    for (var i = 0, len = ref.length; i < len; i++) {
      var el = ref[i]
      var widgets = initialize(el.querySelectorAll(selector))

      res = res.concat(widgets)
    }

    return res
  }

  var initialize = function (targets) {
    var target, widget
    var results = []
    for (var i = 0, len = targets.length; i < len; i++) {
      target = targets[i]
      widget = $(target).data(dataAttr)
      if (widget && widget.inputElement === target) {
        continue
      }
      results.push(initializeWidget(target))
    }
    return results
  }

  ns.SingleWidget = function (el) {
    return initializeWidget(el, ns.widget.Widget)
  }

  ns.MultipleWidget = function (el) {
    return initializeWidget(el, ns.widget.MultipleWidget)
  }

  ns.Widget = function (el) {
    return initializeWidget(el)
  }

  var initializeWidget = function (input, targetClass) {
    var Widget, api, inputArr, s, widget
    inputArr = $(input)
    if (inputArr.length === 0) {
      throw new Error('No DOM elements found matching selector')
    } else if (inputArr.length > 1) {
      utils.warn('There are multiple DOM elements matching selector')
    }
    input = inputArr.eq(0)
    s = settings.build(input.data())
    Widget = s.multiple ? ns.widget.MultipleWidget : ns.widget.Widget
    if (targetClass && Widget !== targetClass) {
      throw new Error('This element should be processed using ' + Widget._name)
    }
    api = input.data(dataAttr)
    if (!api || api.inputElement !== input[0]) {
      cleanup(input)
      widget = new Widget(input, s)
      api = widget.api()
      input.data(dataAttr, api)
      widget.template.content.data(dataAttr, api)
    }
    return api
  }

  var cleanup = function (input) {
    return input.off('.uploadcare').each(function () {
      var widget, widgetElement
      widgetElement = $(this).next('.uploadcare--widget')
      widget = widgetElement.data(dataAttr)
      if (widget && widget.inputElement === this) {
        return widgetElement.remove()
      }
    })
  }

  ns.start = utils.once(function (s, isolated) {
    s = settings.common(s, isolated)
    if (isolated) {
      return
    }

    if (s.live) {
      setInterval(ns.initialize, 100)
    }

    return ns.initialize()
  })

  return $(function () {
    if (!window.UPLOADCARE_MANUAL_START) {
      return ns.start()
    }
  })
})
