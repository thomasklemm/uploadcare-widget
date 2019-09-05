import uploadcare from '../namespace'

{
  jQuery: $,
  utils,
  ui: {progress},
  locale: {t},
  templates: {tpl}
} = uploadcare

uploadcare.namespace 'widget', (ns) ->
  class ns.Template
    constructor: (@settings, @element)->
      @content = $(tpl('widget'))
      @element.after(@content)
      @circle = new progress.Circle(
        @content
          .find('.uploadcare--widget__progress')
          .removeClass('uploadcare--widget__progress')
      )
      @content
        .find('.uploadcare--progress')
        .addClass('uploadcare--widget__progress')
      @statusText = @content.find('.uploadcare--widget__text')
      @content.toggleClass('uploadcare--widget_option_clearable',
                           @settings.clearable)

    addButton: (name, caption='') ->
      $(tpl('widget-button', {name, caption})).appendTo(@content)

    setStatus: (status) ->
      prefix = 'uploadcare--widget_status_'
      @content.removeClass(prefix + @content.attr('data-status'))
      @content.attr('data-status', status)
      @content.addClass(prefix + status)

      @element.trigger("#{status}.uploadcare")

    reset: ->
      @circle.reset()
      @setStatus('ready')
      @__file = null

    loaded: ->
      @setStatus('loaded')
      @circle.reset(true)

    listen: (file) ->
      @__file = file
      @circle.listen(file, 'uploadProgress')
      @setStatus('started')
      file.progress (info) =>
        if file == @__file
          switch info.state
            when 'uploading' then @statusText.text(t('uploading'))
            when 'uploaded' then @statusText.text(t('loadingInfo'))

    error: (type) ->
      @statusText.text(t("errors.#{type || 'default'}"))
      @setStatus('error')

    setFileInfo: (info) ->
      @statusText.html(tpl('widget-file-name', info))
        .find('.uploadcare--widget__file-name')
        .toggleClass('needsclick', @settings.systemDialog)
