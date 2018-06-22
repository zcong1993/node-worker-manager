import { EventEmitter } from 'events'

export interface Opts {
  workerPath: string,
  nums?: number,
  recreate?: boolean,
  handler?: (msg: any) => void,
  workerOpts?: object
}

export class WorkerManager extends EventEmitter {
  workerNums: number
  constructor(opts: Opts)
  dispatch(msg: any)
}

export default WorkerManager
