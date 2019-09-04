import uploadcare from '../namespace'

uploadcare.namespace 'utils.abilities', (ns) ->

  ns.fileAPI = !!(window.File and window.FileList and window.FileReader)

  ns.sendFileAPI = !!(window.FormData and ns.fileAPI)

  # https://github.com/Modernizr/Modernizr/blob/master/feature-detects/draganddrop.js
  ns.dragAndDrop = do ->
    el = document.createElement("div")
    ("draggable" of el) or ("ondragstart" of el and "ondrop" of el)

  # https://github.com/Modernizr/Modernizr/blob/master/feature-detects/canvas.js
  ns.canvas = do ->
    el = document.createElement("canvas")
    !!(el.getContext && el.getContext('2d'))

  ns.fileDragAndDrop = ns.fileAPI and ns.dragAndDrop

  ns.iOSVersion = null
  if ios = /^[^(]+\(iP(?:hone|od|ad);\s*(.+?)\)/.exec(navigator.userAgent)
    if ver = /OS (\d)_(\d)/.exec(ios[1])
      ns.iOSVersion = + ver[1] + ver[2] / 10

  ns.Blob = false
  try
    if new window.Blob
      ns.Blob = window.Blob

  url = window.URL or window.webkitURL or false
  ns.URL = url && url.createObjectURL && url

  ns.FileReader = window.FileReader?.prototype.readAsArrayBuffer && window.FileReader
