import NanoEvents from 'nanoevents';
import {TodoListValidation} from './todo-list-item-validation';
import {Operation} from './domain/operation';

class TodoListV1 {
  items: Object[];
  emitter: NanoEvents<any>;

  constructor() {
    this.items = [];
    this.emitter = new NanoEvents();
    this.add = this.add.bind(this);
  }

  public add(item: Object): boolean {
    return this.safeExecute(() =>
      this.update([...this.items, this.validate(Operation.Add, item)])
    );
  }

  public remove(item: Object): boolean {
    return this.safeExecute(() => {
      item = this.validate(Operation.Remove, item);
      this.update(this.items.filter(i => i !== item));
    });
  }

  validate(operation: Operation, item: Object): Object {
    let validationResult = TodoListValidation.getInstance().validate(
      operation,
      item,
      this.items
    );

    if (!validationResult.allOk()) {
      throw validationResult.errors().join('\n');
    }

    return item;
  }

  safeExecute(what: () => void): boolean {
    try {
      what();
      return true;
    } catch (e) {
      alert(e);
      console.log(e);
      return false;
    }
  }

  subscribe(listener: any) {
    return this.emitter.on('update', listener);
  }

  update(newItems: Object[]) {
    this.items = newItems;
    this.emitter.emit('update');
  }
}

export default {
  id: 'example:todo-list',

  create: () => {
    const todoListV1 = new TodoListV1();

    return {
      '1.0': () => ({featureService: todoListV1})
    };
  }
};
