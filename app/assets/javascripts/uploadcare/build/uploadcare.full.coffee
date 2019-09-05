import uploadcare from '../namespace'
import exports from './_widget'

import '../locale/ar'
import '../locale/az'
import '../locale/ca'
import '../locale/cs'
import '../locale/da'
import '../locale/de'
import '../locale/el'
import '../locale/es'
import '../locale/et'
import '../locale/fr'
import '../locale/he'
import '../locale/it'
import '../locale/ja'
import '../locale/ko'
import '../locale/lv'
import '../locale/nb'
import '../locale/nl'
import '../locale/pl'
import '../locale/pt'
import '../locale/ro'
import '../locale/ru'
import '../locale/sk'
import '../locale/sr'
import '../locale/sv'
import '../locale/tr'
import '../locale/uk'
import '../locale/vi'
import '../locale/zh-TW'
import '../locale/zh'

uploadcare.jQuery.noConflict(true)

uploadcare.expose('locales', (key for key of uploadcare.locale.translations))

export default exports
