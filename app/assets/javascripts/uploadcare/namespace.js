
var uploadcare = {
  __exports: {}
}

uploadcare.namespace = function (path, fn) {
  var target = uploadcare

  if (path) {
    var ref = path.split('.')
    for (var i = 0, len = ref.length; i < len; i++) {
      var part = ref[i]

      target[part] || (target[part] = {})
      target = target[part]
    }
  }

  return fn(target)
}

uploadcare.expose = function (key, value) {
  var parts = key.split('.')
  var last = parts.pop()
  var target = uploadcare.__exports
  var source = uploadcare

  for (var i = 0, len = parts.length; i < len; i++) {
    var part = parts[i]

    target[part] || (target[part] = {})
    target = target[part]

    source = source != null ? source[part] : undefined
  }

  target[last] = value || source[last]

  return target[last]
}

export default uploadcare
