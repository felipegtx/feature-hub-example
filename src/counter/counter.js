import NanoEvents from 'nanoevents';

class CounterV1 {
  constructor() {
    this.count = 0;
    this.emitter = new NanoEvents();
  }

  decrement() {
    this.update(this.count - 1);
  }

  increment() {
    this.update(this.count + 1);
  }

  subscribe(listener) {
    return this.emitter.on('update', listener);
  }

  update(count) {
    this.count = count;
    this.emitter.emit('update');
  }
}

export default {
  id: 'example:counter',

  create: () => {
    const counterV1 = new CounterV1();

    return {
      '1.0': () => ({featureService: counterV1})
    };
  }
};
