const { parentPort } = require('worker_threads')

parentPort.on('message', msg => {
  // do something
  console.log(msg)
})
