import uploadcare from './namespace.js'

import dialog from './templates/dialog.jst.ejs'
import dialogPanel from './templates/dialog__panel.jst.ejs'
import icons from './templates/icons.jst.ejs'
import progressText from './templates/progress__text.jst.ejs'
import styles from './templates/styles.jst.ejs'
import tabCameraCapture from './templates/tab-camera-capture.jst.ejs'
import tabCamera from './templates/tab-camera.jst.ejs'
import tabFle from './templates/tab-file.jst.ejs'
import tabPreviewError from './templates/tab-preview-error.jst.ejs'
import tabPreviewImage from './templates/tab-preview-image.jst.ejs'
import tabPreviewMultipleFile from './templates/tab-preview-multiple-file.jst.ejs'
import tabPreviewMultiple from './templates/tab-preview-multiple.jst.ejs'
import tabPreviewRegular from './templates/tab-preview-regular.jst.ejs'
import tabPreviewUnknown from './templates/tab-preview-unknown.jst.ejs'
import tabPreviewVideo from './templates/tab-preview-video.jst.ejs'
import tabUrl from './templates/tab-url.jst.ejs'
import widgetButton from './templates/widget-button.jst.ejs'
import widgetFileName from './templates/widget-file-name.jst.ejs'
import widget from './templates/widget.jst.ejs'

var locale = uploadcare.locale
var utils = uploadcare.utils
var $ = uploadcare.jQuery

uploadcare.namespace('templates', function (ns) {
  ns.JST = {
    dialog: dialog,
    dialog__panel: dialogPanel,
    icons: icons,
    progress__text: progressText,
    styles: styles,
    'tab-camera-capture': tabCameraCapture,
    'tab-camera': tabCamera,
    'tab-file': tabFle,
    'tab-preview-error': tabPreviewError,
    'tab-preview-image': tabPreviewImage,
    'tab-preview-multiple-file': tabPreviewMultipleFile,
    'tab-preview-multiple': tabPreviewMultiple,
    'tab-preview-regular': tabPreviewRegular,
    'tab-preview-unknown': tabPreviewUnknown,
    'tab-preview-video': tabPreviewVideo,
    'tab-url': tabUrl,
    'widget-button': widgetButton,
    'widget-file-name': widgetFileName,
    widget: widget
  }

  ns.tpl = function (key, ctx) {
    if (ctx == null) {
      ctx = {}
    }

    var fn = ns.JST[key]

    if (fn != null) {
      return fn($.extend({
        t: locale.t,
        utils: utils,
        uploadcare: uploadcare
      }, ctx))
    } else {
      return ''
    }
  }
})
