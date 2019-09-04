import uploadcare from '../namespace'

var $ = uploadcare.jQuery
var progress = uploadcare.ui.progress
var t = uploadcare.locale.t
var tpl = uploadcare.templates.tpl

uploadcare.namespace('widget', function (ns) {
  class Template {
    constructor (settings, element) {
      this.settings = settings
      this.element = element
      this.content = $(tpl('widget'))
      this.element.after(this.content)
      this.circle = new progress.Circle(this.content.find('.uploadcare--widget__progress').removeClass('uploadcare--widget__progress'))
      this.content.find('.uploadcare--progress').addClass('uploadcare--widget__progress')
      this.statusText = this.content.find('.uploadcare--widget__text')
      this.content.toggleClass('uploadcare--widget_option_clearable', this.settings.clearable)
    }

    addButton (name, caption) {
      if (caption == null) {
        caption = ''
      }
      return $(tpl('widget-button', {
        name: name,
        caption: caption
      })).appendTo(this.content)
    }

    setStatus (status) {
      var prefix
      prefix = 'uploadcare--widget_status_'
      this.content.removeClass(prefix + this.content.attr('data-status'))
      this.content.attr('data-status', status)
      this.content.addClass(prefix + status)
      return this.element.trigger(status + '.uploadcare')
    }

    reset () {
      this.circle.reset()
      this.setStatus('ready')
      this.__file = null

      return this.__file
    }

    loaded () {
      this.setStatus('loaded')

      return this.circle.reset(true)
    }

    listen (file) {
      this.__file = file
      this.circle.listen(file, 'uploadProgress')
      this.setStatus('started')

      return file.progress((function (_this) {
        return function (info) {
          if (file === _this.__file) {
            switch (info.state) {
              case 'uploading':
                return _this.statusText.text(t('uploading'))
              case 'uploaded':
                return _this.statusText.text(t('loadingInfo'))
            }
          }
        }
      })(this))
    }

    error (type) {
      this.statusText.text(t('errors.' + (type || 'default')))
      return this.setStatus('error')
    }

    setFileInfo (info) {
      return this.statusText.html(tpl('widget-file-name', info)).find('.uploadcare--widget__file-name').toggleClass('needsclick', this.settings.systemDialog)
    }
  }

  ns.Template = Template
})
