# node-worker-manager

[![NPM version](https://img.shields.io/npm/v/@zcong/node-worker-manager.svg?style=flat)](https://npmjs.com/package/@zcong/node-worker-manager) [![NPM downloads](https://img.shields.io/npm/dm/@zcong/node-worker-manager.svg?style=flat)](https://npmjs.com/package/@zcong/node-worker-manager) [![CircleCI](https://circleci.com/gh/zcong1993/node-worker-manager/tree/master.svg?style=shield)](https://circleci.com/gh/zcong1993/node-worker-manager/tree/master)

## Install

```bash
$ yarn add @zcong/node-worker-manager
```

## Usage

> quickly start with `yarn example` or `yarn example:debug`

```js
// worker.js
const { parentPort } = require('worker_threads')

parentPort.on('message', msg => {
  // do something
  console.log(msg)
})
```

```js
// main thread
const path = require('path')
const WorkerManager = require('@zcong/node-worker-manager')

const wm = new WorkerManager({
  workerPath: path.resolve(__dirname, './worker.js'),
  recreate: true,
  nums: 2
})

setInterval(() => {
  wm.dispatch('test worker')
}, 1000)
```

## Contributing

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Commit your changes: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request :D

## Author

**node-worker-manager** © [zcong1993](https://github.com/zcong1993), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by zcong1993 with help from contributors ([list](https://github.com/zcong1993/node-worker-manager/contributors)).

> [github.com/zcong1993](https://github.com/zcong1993) · GitHub [@zcong1993](https://github.com/zcong1993)
