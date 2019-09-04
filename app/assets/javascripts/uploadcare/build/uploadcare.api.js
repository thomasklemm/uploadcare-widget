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
import '../files/base.coffee'
import '../files/object.coffee'
import '../files/input.coffee'
import '../vendor/pusher'
import '../utils/pusher.coffee'
import '../files/url.coffee'
import '../files/uploaded.coffee'
import '../files/group.coffee'
import '../files'

import uploadcare from '../namespace'

var expose = uploadcare.expose

expose('globals', uploadcare.settings.common)
expose('start', uploadcare.settings.common)
expose('fileFrom')
expose('filesFrom')
expose('FileGroup')
expose('loadFileGroup')
expose('locales', Object.keys(uploadcare.locale.translations))

export default uploadcare.__exports
