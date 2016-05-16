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

var test = require('tape').test
var abstractTest = require('mqemitter/abstractTest')
var cp = require('../')

abstractTest({
  builder: function (opts) {
    opts = opts || {}

    if (opts.wildcardOne) {
      opts.wildcardOne = {
        here: opts.wildcardOne,
        there: '+'
      }
    }

    if (opts.wildcardSome) {
      opts.wildcardSome = {
        here: opts.wildcardSome,
        there: '#'
      }
    }

    if (opts.separator) {
      opts.separator = {
        here: opts.separator,
        there: '/'
      }
    }

    return cp.child(opts)
  },
  test: test
})
