const { cpus } = require('os')
const { EventEmitter } = require('events')
const { Worker } = require('worker_threads')
const debug = require('debug')('node-worker')
const { checkNodeVersion } = require('./utils')

if (!checkNodeVersion()) {
  console.log('Node version should >= 10.5.0')
  process.exit(-1)
}

class WorkerManager extends EventEmitter {
  constructor({
    workerPath,
    nums = 1,
    recreate = false,
    handler = console.log,
    workerOpts = {}
  } = {}) {
    super()

    this._workerPath = workerPath
    this._handler = handler
    this._recreate = recreate
    this._workerOpts = workerOpts

    this._id = 1
    this._workers = new Map()

    if (nums > cpus()) {
      console.warn(`worker nums: ${nums} > cpu numbers: ${cpus()}`)
    }

    Array(nums)
      .fill(null)
      .forEach(() => this._createWorker())
  }

  _createWorker() {
    const worker = new Worker(this._workerPath, this._workerOpts)
    this._workers.set(worker, this._id++)

    worker.on('error', err =>
      this.emit('error', err, this._workers.get(worker))
    )

    worker.on('message', msg => {
      debug(`worker ${this._workers.get(worker)} recieve msg: ${msg}`)
      this._handler(msg)
    })

    worker.on('online', () => {
      this.emit('online', this._workers.get(worker))
      debug(`worker ${this._workers.get(worker)} online`)
    })

    worker.on('exit', code => {
      this.emit('exit', code, this._workers.get(worker))
      debug(`worker ${this._workers.get(worker)} exit with code ${code}`)
      this._workers.delete(worker)
      if (this._recreate) {
        this._createWorker()
        debug('recreate worker')
      }
    })
  }

  dispatch(msg) {
    if (this._workers.size === 0) {
      throw new Error('all worker dead')
    }
    const _worker = [...this._workers.keys()][
      Math.floor(Math.random() * this._workers.size)
    ]
    _worker.postMessage(msg)
    debug(`dispatch msg ${msg} to worker ${this._workers.get(_worker)}`)
  }

  get workerNums() {
    return this._workers.size
  }
}

module.exports = WorkerManager
