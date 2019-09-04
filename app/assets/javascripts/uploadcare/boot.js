import $ from 'jquery'
import uploadcare from './namespace.js'
import { version } from '../../../../package.json'

var expose = uploadcare.expose

uploadcare.version = version
uploadcare.jQuery = $

expose('version')
expose('jQuery')
expose('plugin', function (fn) {
  return fn(uploadcare)
})
