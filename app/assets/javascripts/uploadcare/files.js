import uploadcare from './namespace.js'

var $ = uploadcare.jQuery
var f = uploadcare.files
var settings = uploadcare.settings

uploadcare.namespace('', function (ns) {
  ns.fileFrom = function (type, data, s) {
    return ns.filesFrom(type, [data], s)[0]
  }

  ns.filesFrom = function (type, data, s) {
    var i, info, len, param, results
    s = settings.build(s || {})
    results = []

    for (i = 0, len = data.length; i < len; i++) {
      param = data[i]
      info = null
      if ($.isArray(param)) {
        info = param[1]
        param = param[0]
      }
      results.push(new converters[type](param, s, info).promise())
    }

    return results
  }

  var converters = {
    object: f.ObjectFile,
    input: f.InputFile,
    url: f.UrlFile,
    uploaded: f.UploadedFile,
    ready: f.ReadyFile
  }

  return converters
})
