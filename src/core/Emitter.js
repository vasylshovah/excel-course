export class Emitter {
    constructor() {
        this.listeners = {}
    }
    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false
        }
        this.listeners[event].forEach(listener => {
            listener(...args)
        })
        return true
    }
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
        return () => {
            this.listeners[event] =
                this.listeners[event].filter(listener => listener !== fn)
        }
    }
}
// Example
// const emitter = new Emitter()
// const unsub = emitter.subscribe('vladilen', data => console.log(data))
// emitter.emit('324234324', 42)
//
// setTimeout(() => {
//     emitter.emit('vladilen', 'After 3 sec')
// }, 3000)
//
// setTimeout(() => {
//     unsub()
// }, 4000)
//
// setTimeout(() => {
//     emitter.emit('vladilen', 'After 5 seconds')
// }, 5000)