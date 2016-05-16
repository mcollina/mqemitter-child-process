'use strict'

var childProcess = require('child_process')
var cp = require('./')

if (process.connected) {
  client()
} else {
  cp.start(function (err) {
    if (err) { throw err }

    for (var i = 0; i < 2; i++) {
      childProcess.fork(__filename)
    }
  })
}

function client () {
  var client = cp.child()
  if (process.pid % 2 === 0) {
    client.on('hello', function (msg, cb) {
      console.log(msg)
      cb()
    })
  } else {
    setInterval(function () {
      client.emit({ topic: 'hello', payload: 'world' })
    }, 1000)
  }
}
