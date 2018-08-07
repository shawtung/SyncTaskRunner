export default class Runner {
  constructor () {
    this.processing = false
    this.todo = []
    Object.defineProperty(this.todo, 'push', {
      enumerable: false,
      writable: false,
      value: (...args) => {
        Array.prototype.push.apply(this.todo, args)
        !this.processing && this.process()
      }
    })
  }

  async process () {
    this.processing = true
    let task = this.todo.shift()

    switch (task.type) {
      case 'run':
        await task.value()
        break
      case 'wait':
        await new Promise(r => setTimeout(r, task.value))
        break
    }

    if (this.todo.length) await this.process()
    else this.processing = false
  }

  run (fn) {
    this.todo.push({
      type: 'run',
      value: fn,
    })
    return this
  }

  wait (ms) {
    this.todo.push({
      type: 'wait',
      value: ms,
    })
    return this
  }
}
