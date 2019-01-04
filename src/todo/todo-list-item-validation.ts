import {StepsValidatorFor} from './validators/steps-validator-for';
import {ItemNotNull} from './validators/item-not-null';
import {ValidatorProxy} from './validators/validator-proxy';
import {Operation} from './validation/operation';
import {SingletonFor} from '../helper/singleton-for';
import TodoListItem from './todo-list-item';

const itemContainsOnlyNumbersOnAdd = new ValidatorProxy<TodoListItem>(
  Operation.Add,
  (owner, item) => item.text.length > 2,
  'The text should be at least two characters long.'
);

const cantRemoveLastElement = new ValidatorProxy<TodoListItem>(
  Operation.Remove,
  (owner, item) => {
    let context = owner.getContext();
    return context.length <= 1 || context.indexOf(item) !== context.length - 1;
  },
  "You can't delete the last item in the list."
);

export default class TodoListItemValidation extends StepsValidatorFor<TodoListItem> {
  constructor() {
    super(
      new ItemNotNull(),
      itemContainsOnlyNumbersOnAdd,
      cantRemoveLastElement
    );
  }

  private static _instance: SingletonFor<TodoListItemValidation> = new SingletonFor(
    TodoListItemValidation
  );

  static getInstance(): TodoListItemValidation {
    return TodoListItemValidation._instance.getInstance();
  }
}
