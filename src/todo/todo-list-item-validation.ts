import {StepsValidatorFor} from './validators/steps-validator-for';
import {ItemNotNull} from './validators/item-not-null';
import {ProxyValidator} from './validators/proxy-validator';
import {Operation} from './validation/operation';
import {SingletonFor} from '../helper/singleton-for';

export class TodoListValidation extends StepsValidatorFor<Object> {
  constructor() {
    super(
      new ItemNotNull(),
      new ProxyValidator<Object>(
        Operation.Add,
        (owner, item) => !owner.getContext().includes(item),
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
