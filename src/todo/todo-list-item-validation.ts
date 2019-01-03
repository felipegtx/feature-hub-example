import {StepsValidatorFor} from './domain/steps-validator-for';
import {ItemNotNull} from './validators/item-not-null';
import {ProxyValidator} from './validators/proxy-validator';
import {Operation} from './domain/operation';
import {SingletonFor} from '../helper/singleton-for';

export class TodoListValidation extends StepsValidatorFor<Object> {
  constructor() {
    super(
      new ItemNotNull(),
      new ProxyValidator<Object>(
        Operation.Add,
        ($this, item) => !$this.getContext().includes(item),
        'Duplicated Item'
      )
    );
  }

  private static _instance: SingletonFor<TodoListValidation> = new SingletonFor(
    TodoListValidation
  );

  static getInstance(): TodoListValidation {
    return TodoListValidation._instance.getInstance();
  }
}
