/*
 * Copyright (c) 2016, Matteo Collina <hello@matteocollina.com>
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR
 * IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/

'use strict'

var mqemitter = require('mqemitter')
var cs = require('mqemitter-cs')
var fs = require('fs')
var net = require('net')
var path = require('path')
var main = null
var sockPath = path.resolve(process.cwd(), 'shared-mqemitter')

if (process.platform === 'win32') {
  sockPath = '\\\\' + sockPath
}

function start (cb) {
  cb = cb || throwIfErr

  if (main) {
    return cb(new Error('already started'))
  }

  fs.unlink(sockPath, function (err) {
    if (err && err.code !== 'ENOENT') {
      return cb(err)
    }

    var instance = mqemitter()
    var server = net.createServer(cs.server(instance))

    main = {
      instance: instance,
      server: server
    }

    server.listen(sockPath, cb)
  })
}

function stop (cb) {
  if (!main) {
    return cb(new Error('not started'))
  }

  main.instance.close(cb)
  main.server.close()
}

function unref () {
  if (!main) {
    throw new Error('not started')
  }

  main.server.unref()
}

function throwIfErr (err) {
  if (err) {
    throw err
  }
}

function child (opts) {
  var stream = net.connect(sockPath)
  return cs.client(stream, opts)
}

module.exports.start = start
module.exports.stop = stop
module.exports.unref = unref
module.exports.child = child
