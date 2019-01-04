import {IValidationStepFor} from '../validation/validation-step-for';
import {Operation} from '../validation/operation';
import {ValidationStepResult} from '../validation/validation-step-result';
import {IContextOwner} from '../validation/context-owner';

/**
 * Delegate that handles a given dynamic validation rutine
 */
type Validator<TItem> = (owner: IContextOwner<TItem>, item: TItem) => boolean;

/**
 * Generic proxy class to allow for validations to be added to the validation
 * pipeline without the need to create a new concret implementation of IValidationStepFor
 * interface.
 *
 * @see https://github.com/torokmark/design_patterns_in_typescript/tree/master/proxy
 */
export class ProxyValidator<TItem> implements IValidationStepFor<TItem> {
  constructor(
    private operation: Operation,
    private validator: Validator<TItem>,
    private errorDescription: string
  ) {}

  public operationScope = (): Operation => this.operation;

  validate(owner: IContextOwner<TItem>, item: TItem): ValidationStepResult {
    if (!this.validator(owner, item)) {
      return ValidationStepResult.Nok(this.errorDescription);
    }
    return ValidationStepResult.Ok();
  }
}
