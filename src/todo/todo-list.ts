import NanoEvents from 'nanoevents';
import {Operation} from './validation/operation';
import {IContextRepoOwner} from './validation/context-repo-onwer';
import Memento from '../helper/memento';
import TodoListItem from './todo-list-item';
import TodoListItemValidation from './todo-list-item-validation';
import TodoListValidation from './todo-list-validation';

class TodoListV1 implements IContextRepoOwner<TodoListItem> {
  items: TodoListItem[];
  emitter: NanoEvents<any>;

  constructor() {
    this.items = [];
    this.emitter = new NanoEvents();
    this.add = this.add.bind(this);
    this.getContext = this.getContext.bind(this);
  }

  public getContext(): TodoListItem[] {
    return [...this.items];
  }

  public addText(text: string): boolean {
    return this.add(new TodoListItem(text));
  }

  public add(item: TodoListItem): boolean {
    return this.update([...this.items, item]);
  }

  public remove(item: TodoListItem): boolean {
    return this.update(this.items.filter(i => i !== item));
  }

  public update(newContext: TodoListItem[]): boolean {
    return Memento.safeExecute(
      this.getContext,
      context => {
        
        /// Validate new items
        newContext
          .filter(i => context.indexOf(i) < 0)
          .forEach(newItem =>
            TodoListItemValidation.getInstance().validate(
              Operation.Add,
              newItem,
              this
            )
          );

        /// Validate removed items
        context
          .filter(i => newContext.indexOf(i) < 0)
          .forEach(deletedItem =>
            TodoListItemValidation.getInstance().validate(
              Operation.Remove,
              deletedItem,
              this
            )
          );

        /// We rely on the Memento's approach to keep the context information valid
        TodoListValidation.getInstance().validateCommit(
          (this.items = newContext),
          this
        );

        this.emitter.emit('update');
      },
      (context, err) => (this.items = context)
    );
  }

  subscribe(listener: any) {
    return this.emitter.on('update', listener);
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
