import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.subscribe = options.subscribe || []
        this.store = options.store
        this.unsubscribers = []

        this.prepare()
    }
    // Set our component to init
    prepare() {}
    // return template of component
    toHTML() {
        return ''
    }
    // Уведомляем слушателей про события event
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }
    // подписываемся на события event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }
    $dispatch(action) {
        this.store.dispatch(action)
    }
    // Сюда приходят только изменения по тем полям, на которые мы подписались
    storeChanged() {}

    isWatching(key) {
        return this.subscribe.includes(key)
    }
    init() {
        this.initDOMListeners()
    }
    // delete component
    destroy() {
        this.removeDOMListeners()
        this.unsubscribers.forEach(unsub => unsub())
    }
}
