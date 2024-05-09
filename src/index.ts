interface Options {
  immediate?: boolean;
  errorCallback?: () => void;
}

class PreciseTimer {
  private callback: () => void;
  private interval: number;
  private options: Options;
  private expected: number;
  private timeoutID: NodeJS.Timeout;

  constructor(callbackfn: () => void, interval: number, options?: Options) {
    this.callback = callbackfn;
    this.interval = interval;
    this.options = options;
  }

  public start() {
    this.expected = Date.now() + this.interval;
    this.timeoutID = null;
    if (this.options.immediate) {
      this.callback();
    }
    this.timeoutID = setTimeout(this.round.bind(this), this.interval);
  }

  public stop() {
    clearTimeout(this.timeoutID);
  }

  private round() {
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