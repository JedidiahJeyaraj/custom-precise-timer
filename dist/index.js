class PreciseTimer {
    constructor(callbackfn, interval, options) {
        this.callback = callbackfn;
        this.interval = interval;
        this.options = options;
    }
    start() {
        this.expected = Date.now() + this.interval;
        this.timeoutID = null;
        if (this.options.immediate) {
            this.callback();
        }
        this.timeoutID = setTimeout(this.round.bind(this), this.interval);
    }
    stop() {
        clearTimeout(this.timeoutID);
    }
    round() {
        let drift = Date.now() - this.expected;
        if (drift > this.interval) {
            if (this.options.errorCallback) {
                this.options.errorCallback();
            }
        }
        this.callback();
        this.expected += this.interval;
        this.timeoutID = setTimeout(this.round.bind(this), this.interval - drift);
    }
}
export default PreciseTimer;
