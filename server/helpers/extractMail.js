'use strict'

function extractMail (mail) {
  let name = mail.match(/^([^@]*)@/)[1];
  return name
}


module.exports = extractMail