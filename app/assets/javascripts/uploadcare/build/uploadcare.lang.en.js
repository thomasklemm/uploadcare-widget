
import uploadcare from '../namespace'
import exports from './_widget'

uploadcare.expose('locales', Object.keys(uploadcare.locale.translation))

export default exports
