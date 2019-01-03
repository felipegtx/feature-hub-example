import {Operation} from '../domain/operation';
import {IValidationStepFor} from '../domain/validation-step-for';
import {ValidationStepResult} from '../domain/validation-step-result';

export class ItemNotNull implements IValidationStepFor<Object> {
  private context: Object[] = [];

  public operationScope(): Operation {
    return Operation.Any;
  }

  setContext(items: Object[]): IValidationStepFor<Object> {
    this.context = items;
    return this;
  }

  public validate(item: Object): ValidationStepResult {
    if (!item || item === null || item === '') {
      return ValidationStepResult.Nok('Invalid Parameter');
    }
    return ValidationStepResult.Ok();
  }
}
