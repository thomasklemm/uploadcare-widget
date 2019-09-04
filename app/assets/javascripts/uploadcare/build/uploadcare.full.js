import uploadcare from '../namespace'
import exports from './_widget'

import '../locale/ar.js'
import '../locale/az.js'
import '../locale/ca.js'
import '../locale/cs.js'
import '../locale/da.js'
import '../locale/de.js'
import '../locale/el.js'
import '../locale/es.js'
import '../locale/et.js'
import '../locale/fr.js'
import '../locale/he.js'
import '../locale/it.js'
import '../locale/ja.js'
import '../locale/ko.js'
import '../locale/lv.js'
import '../locale/nb.js'
import '../locale/nl.js'
import '../locale/pl.js'
import '../locale/pt.js'
import '../locale/ro.js'
import '../locale/ru.js'
import '../locale/sk.js'
import '../locale/sr.js'
import '../locale/sv.js'
import '../locale/tr.js'
import '../locale/uk.js'
import '../locale/vi.js'
import '../locale/zh-TW.js'
import '../locale/zh.js'

uploadcare.jQuery.noConflict(true)

uploadcare.expose('locales', Object.keys(uploadcare.locale.translations))

export default exports
