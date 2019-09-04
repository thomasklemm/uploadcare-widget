import uploadcare from '../namespace'

var $ = uploadcare.jQuery

var canSubmit = function (form) {
  var notSubmittable = '[data-status=started], [data-status=error]'
  return !form.find('.uploadcare--widget').is(notSubmittable)
}

var submitPreventionState = function (form, prevent) {
  form.attr('data-uploadcare-submitted', prevent)

  return form.find(':submit').attr('disabled', prevent)
}

var uploadForm = '[role~="uploadcare-upload-form"]'
var submittedForm = uploadForm + '[data-uploadcare-submitted]'

$(document).on('submit', uploadForm, function () {
  var form
  form = $(this)
  if (canSubmit(form)) {
    return true
  } else {
    submitPreventionState(form, true)
    return false
  }
})

$(document).on('loaded.uploadcare', submittedForm, function () {
  return $(this).submit()
})

var cancelEvents = 'ready.uploadcare error.uploadcare'

$(document).on(cancelEvents, submittedForm, function () {
  var form
  form = $(this)
  if (canSubmit(form)) {
    return submitPreventionState(form, false)
  }
})
