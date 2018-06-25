import { EventEmitter } from 'events'

declare class WorkerManager extends EventEmitter {
  workerNums: number
  constructor(opts: WorkerManager.Opts)
  dispatch(msg: any)
}

declare namespace WorkerManager {
  interface Opts {
    workerPath: string,
    nums?: number,
    recreate?: boolean,
    handler?: (msg: any) => void,
    workerOpts?: object
  }
}

export = WorkerManager
