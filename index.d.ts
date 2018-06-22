import { EventEmitter } from 'events'

export interface Opts {
  workerPath: string,
  nums?: number,
  recreate?: boolean,
  handler?: (msg: any) => void,
  workerOpts?: object
}

declare class WorkerManager extends EventEmitter {
  workerNums: number
  constructor(opts: Opts)
  dispatch(msg: any)
}

export = WorkerManager
