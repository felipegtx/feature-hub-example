import {StepsValidatorFor} from './validators/steps-validator-for';
import TodoListItem from './todo-list-item';
import {ItemNotNull} from './validators/item-not-null';
import {SingletonFor} from '../helper/singleton-for';
import {ValidatorProxy} from './validators/validator-proxy';
import {Operation} from './validation/operation';

const checkForDuplicatedElements = new ValidatorProxy<TodoListItem>(
  Operation.Commit,
  (owner, item) =>
    owner.getContext().filter(e => e.text === item.text).length <= 1,
  'Duplicated Item'
);

export default class TodoListValidation extends StepsValidatorFor<
  TodoListItem
> {
  constructor() {
    super(new ItemNotNull(), checkForDuplicatedElements);
  }

  private static _instance: SingletonFor<TodoListValidation> = new SingletonFor(
    TodoListValidation
  );

  static getInstance(): TodoListValidation {
    return TodoListValidation._instance.getInstance();
  }
}
