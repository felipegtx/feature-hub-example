import {Operation} from '../validation/operation';
import {IValidationStepFor} from '../validation/validation-step-for';
import {ValidationStepResult} from '../validation/validation-step-result';
import {IContextOwner} from '../validation/context-owner';

export class ItemNotNull implements IValidationStepFor<Object> {
  public operationScope(): Operation {
    return Operation.Any;
  }

  public validate(
    owner: IContextOwner<Object>,
    item: Object
  ): ValidationStepResult {
    if (!item || item === null || item === '') {
      return ValidationStepResult.Nok('Invalid Parameter');
    }
    return ValidationStepResult.Ok();
  }
}
