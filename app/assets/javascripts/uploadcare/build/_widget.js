import '../boot'

import '../vendor/jquery-xdr'
import '../utils/abilities.coffee'
import '../utils/collection.coffee'
import '../utils/image-loader.coffee'
import '../utils/warnings.coffee'
import '../utils/messages.coffee'
import '../utils.coffee'

import '../settings.coffee'
import '../locale/en'
import '../locale'
import '../templates'
import '../stylesheets'
import '../vendor/jquery-jcrop'
import '../ui/crop-widget.coffee'
import '../files/base.coffee'
import '../utils/image-processor.coffee'
import '../files/object.coffee'
import '../files/input.coffee'
import '../vendor/pusher'
import '../utils/pusher.coffee'
import '../files/url.coffee'
import '../files/uploaded.coffee'
import '../files/group.coffee'
import '../files'

import '../widget/dragdrop.coffee'
import '../ui/progress.coffee'
import '../widget/template'
import '../widget/tabs/file-tab.coffee'
import '../widget/tabs/url-tab.coffee'
import '../widget/tabs/camera-tab.coffee'
import '../widget/tabs/remote-tab.coffee'
import '../widget/tabs/base-preview-tab.coffee'
import '../widget/tabs/preview-tab.coffee'
import '../vendor/jquery-ordering'
import '../widget/tabs/preview-tab-multiple.coffee'
import '../widget/dialog.coffee'
import '../widget/base-widget.coffee'
import '../widget/widget'
import '../widget/multiple-widget.coffee'
import '../widget/live'
import '../widget/submit-guard'
import '../widget/accessibility.coffee'

import uploadcare from '../namespace'

var expose = uploadcare.expose

expose('globals', uploadcare.settings.common)
expose('start')
expose('initialize')
expose('fileFrom')
expose('filesFrom')
expose('FileGroup')
expose('loadFileGroup')
expose('openDialog')
expose('closeDialog')
expose('openPanel')
expose('registerTab')
expose('Circle', uploadcare.ui.progress.Circle)
expose('SingleWidget')
expose('MultipleWidget')
expose('Widget')
expose('tabsCss')
expose('dragdrop.support')
expose('dragdrop.receiveDrop')
expose('dragdrop.uploadDrop')

export default uploadcare.__exports
