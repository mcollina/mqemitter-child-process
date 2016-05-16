# mqemitter-child-process

Share the same mqemitter between a hierarchy of child processes

## Install

```js
npm install mqemitter-child-process --save
```

## Example

This example spins up 2 processes, and run the mqemitter in the
master.

```js
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
```

## API

  * <a href="#start"><code>mqemitterChildProcess.<b>start()</b></code></a>
  * <a href="#stop"><code>mqemitterChildProcess.<b>stop()</b></code></a>
  * <a href="#unref"><code>mqemitterChildProcess.<b>unref()</b></code></a>
  * <a href="#child"><code>mqemitterChildProcess.<b>child()</b></code></a>

-------------------------------------------------------
<a name="start"></a>
### mqemitterChildProcess.start()

Starts the master mqemitter for this process.

-------------------------------------------------------
<a name="stop"></a>
### mqemitterChildProcess.stop()

Stops the master mqemitter for this process.

-------------------------------------------------------
<a name="unref"></a>
### mqemitterChildProcess.unref()

Calls `unref()` on the main server

-------------------------------------------------------
<a name="child"></a>
### mqemitterChildProcess.chil()

Creates a [MQEmitter](https://github.com/mcollina/mqemitter) child that connects to the master.

## License

MIT
