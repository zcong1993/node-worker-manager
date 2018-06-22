const path = require('path')
const WorkerManager = require('../')

const wm = new WorkerManager({
  workerPath: path.resolve(__dirname, './worker.js'),
  recreate: true,
  nums: 2
})

setInterval(() => {
  wm.dispatch('test worker')
}, 1000)
