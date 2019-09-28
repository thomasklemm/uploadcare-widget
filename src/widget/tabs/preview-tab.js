import uploadcare from '../../namespace'
import { t } from '../../locale'
import { boundMethodCheck } from '../../utils/bound-method-check'

const {
  utils,
  utils: {
    abilities: { URL }
  },
  templates: { tpl },
  jQuery: $,
  crop: { CropWidget }
} = uploadcare

uploadcare.namespace('widget.tabs', function (ns) {
  var ref = ns.PreviewTab = class PreviewTab extends ns.BasePreviewTab {
    constructor (container, tabButton, dialogApi, settings, name) {
      super(...arguments)
      this.__setFile = this.__setFile.bind(this)
      this.__tryToLoadImagePreview = this.__tryToLoadImagePreview.bind(this)
      this.__tryToLoadVideoPreview = this.__tryToLoadVideoPreview.bind(this)
      // error
      // unknown
      // image
      // video
      // regular
      this.__setState = this.__setState.bind(this)
      this.initImage = this.initImage.bind(this)
      this.populateCropSizes = this.populateCropSizes.bind(this)
      this.container = container
      this.tabButton = tabButton
      this.dialogApi = dialogApi
      this.settings = settings
      this.name = name
      $.each(this.dialogApi.fileColl.get(), (i, file) => {
        return this.__setFile(file)
      })
      this.dialogApi.fileColl.onAdd.add(this.__setFile)
      this.widget = null
      this.__state = null
    }

    __setFile (file) {
      var ifCur, tryToLoadImagePreview, tryToLoadVideoPreview
      boundMethodCheck(this, ref)
      this.file = file
      ifCur = (fn) => {
        return (...args) => {
          if (file === this.file) {
            return fn.apply(null, args)
          }
        }
      }
      tryToLoadImagePreview = utils.once(this.__tryToLoadImagePreview)
      tryToLoadVideoPreview = utils.once(this.__tryToLoadVideoPreview)
      this.__setState('unknown', {})
      this.file.progress(ifCur((info) => {
        var blob, label, source
        info = info.incompleteFileInfo
        label = (info.name || '') + utils.readableFileSize(info.size, '', ', ')
        this.container.find('.uploadcare--preview__file-name').text(label)
        source = info.sourceInfo
        blob = utils.abilities.Blob
        if (source.file && blob && source.file instanceof blob) {
          return tryToLoadImagePreview(file, source.file).fail(() => {
            return tryToLoadVideoPreview(file, source.file)
          })
        }
      }))
      this.file.done(ifCur((info) => {
        var imgInfo, src
        if (this.__state === 'video') {
          return
        }
        if (info.isImage) {
          // avoid subsequent image states
          if (this.__state !== 'image') {
            src = info.originalUrl
            // 1162x684 is 1.5 size of conteiner
            src += '-/preview/1162x693/-/setfill/ffffff/-/format/jpeg/-/progressive/yes/'
            if (this.settings.previewUrlCallback) {
              src = this.settings.previewUrlCallback(src, info)
            }
            imgInfo = info.originalImageInfo
            this.__setState('image', {
              src,
              name: info.name,
              info
            })
            return this.initImage([imgInfo.width, imgInfo.height], info.cdnUrlModifiers)
          }
        } else {
          // , but update if other
          return this.__setState('regular', {
            file: info
          })
        }
      }))
      return this.file.fail(ifCur((error, info) => {
        return this.__setState('error', {
          error,
          file: info
        })
      }))
    }

    __tryToLoadImagePreview (file, blob) {
      var df
      boundMethodCheck(this, ref)
      df = $.Deferred()
      if (file.state() !== 'pending' || !blob.size || blob.size >= this.settings.multipartMinSize) {
        return df.reject().promise()
      }
      utils.image.drawFileToCanvas(blob, 1550, 924, '#ffffff', this.settings.imagePreviewMaxSize).done((canvas, size) => {
        return utils.canvasToBlob(canvas, 'image/jpeg', 0.95, (blob) => {
          var src
          df.resolve()
          canvas.width = canvas.height = 1
          if (file.state() !== 'pending' || this.dialogApi.state() !== 'pending' || this.file !== file) {
            return
          }
          src = URL.createObjectURL(blob)
          this.dialogApi.always(function () {
            return URL.revokeObjectURL(src)
          })
          if (this.__state !== 'image') {
            this.__setState('image', {
              src,
              name: ''
            })
            return this.initImage(size)
          }
        })
      }).fail(df.reject)
      return df.promise()
    }

    __tryToLoadVideoPreview (file, blob) {
      var df, op, src
      boundMethodCheck(this, ref)
      df = $.Deferred()
      if (!URL || !blob.size) {
        return df.reject().promise()
      }
      src = URL.createObjectURL(blob)
      op = utils.videoLoader(src)
      op.fail(() => {
        URL.revokeObjectURL(src)
        return df.reject()
      }).done(() => {
        var videoTag
        df.resolve()
        this.dialogApi.always(function () {
          return URL.revokeObjectURL(src)
        })
        this.__setState('video')
        videoTag = this.container.find('.uploadcare--preview__video')
        // hack to enable seeking due to bug in MediaRecorder API
        // https://bugs.chromium.org/p/chromium/issues/detail?id=569840
        videoTag.on('loadeddata', function () {
          var el
          el = videoTag.get(0)
          el.currentTime = 360000 // 100 hours
          return videoTag.off('loadeddata')
        })
        videoTag.on('ended', function () {
          var el
          el = videoTag.get(0)
          el.currentTime = 0
          return videoTag.off('ended')
        })
        // end of hack
        videoTag.attr('src', src)
        // hack to load first-frame poster on ios safari
        return videoTag.get(0).load()
      })
      return df.promise()
    }

    __setState (state, data) {
      boundMethodCheck(this, ref)
      this.__state = state
      data = data || {}
      data.crop = this.settings.crop
      this.container.empty().append(tpl(`tab-preview-${state}`, data))
      this.container.removeClass(function (index, classes) {
        return classes.split(' ').filter(function (c) {
          return !!~c.indexOf('uploadcare--preview_status_')
        }).join(' ')
      })

      if (state === 'unknown' && this.settings.crop) {
        this.container.find('.uploadcare--preview__done').hide()
      }

      if (state === 'error') {
        this.container.addClass('uploadcare--preview_status_error-' + data.error)
      }

      this.container.find('.uploadcare--preview__done').focus()
    }

    initImage (imgSize, cdnModifiers) {
      var done, img, imgLoader, startCrop
      boundMethodCheck(this, ref)
      img = this.container.find('.uploadcare--preview__image')
      done = this.container.find('.uploadcare--preview__done')
      imgLoader = utils.imageLoader(img[0]).done(() => {
        return this.container.addClass('uploadcare--preview_status_loaded')
      }).fail(() => {
        this.file = null
        return this.__setState('error', {
          error: 'loadImage'
        })
      })

      startCrop = () => {
        this.container.find('.uploadcare--crop-sizes__item').attr('aria-disabled', false).attr('tabindex', 0)
        done.attr('disabled', false)
        this.widget = new CropWidget(img, imgSize, this.settings.crop[0])
        if (cdnModifiers) {
          this.widget.setSelectionFromModifiers(cdnModifiers)
        }
        return done.on('click', () => {
          var newFile
          newFile = this.widget.applySelectionToFile(this.file)
          this.dialogApi.fileColl.replace(this.file, newFile)
          return true
        })
      }
      if (this.settings.crop) {
        this.container.find('.uploadcare--preview__title').text(t('dialog.tabs.preview.crop.title'))
        this.container.find('.uploadcare--preview__content').addClass('uploadcare--preview__content_crop')
        done.attr('disabled', true)
        done.text(t('dialog.tabs.preview.crop.done'))
        this.populateCropSizes()
        this.container.find('.uploadcare--crop-sizes__item').attr('aria-disabled', true).attr('tabindex', -1)
        return imgLoader.done(function () {
          // Often IE 11 doesn't do reflow after image.onLoad
          // and actual image remains 28x30 (broken image placeholder).
          // Looks like defer always fixes it.
          return utils.defer(startCrop)
        })
      }
    }

    populateCropSizes () {
      var control, currentClass, template
      boundMethodCheck(this, ref)
      control = this.container.find('.uploadcare--crop-sizes')
      template = control.children()
      currentClass = 'uploadcare--crop-sizes__item_current'
      $.each(this.settings.crop, (i, crop) => {
        var caption, gcd, icon, item, prefered, size
        prefered = crop.preferedSize
        if (prefered) {
          gcd = utils.gcd(prefered[0], prefered[1])
          caption = `${prefered[0] / gcd}:${prefered[1] / gcd}`
        } else {
          caption = t('dialog.tabs.preview.crop.free')
        }
        item = template.clone().appendTo(control).attr('data-caption', caption).on('click', (e) => {
          if ($(e.currentTarget).attr('aria-disabled') === 'true') {
            return
          }
          if (!$(e.currentTarget).hasClass(currentClass) && this.settings.crop.length > 1 && this.widget) {
            this.widget.setCrop(crop)
            control.find('>*').removeClass(currentClass)
            item.addClass(currentClass)
          }
        })
        if (prefered) {
          size = utils.fitSize(prefered, [30, 30], true)
          return item.children().css({
            width: Math.max(20, size[0]),
            height: Math.max(12, size[1])
          })
        } else {
          icon = $("<svg width='32' height='32'><use xlink:href='#uploadcare--icon-crop-free'/></svg>").attr('role', 'presentation').attr('class', 'uploadcare--icon')
          return item.children().append(icon).addClass('uploadcare--crop-sizes__icon_free')
        }
      })
      template.remove()

      return control.find('>*').eq(0).addClass(currentClass)
    }

    displayed () {
      this.container.find('.uploadcare--preview__done').focus()
    }
  }
})
