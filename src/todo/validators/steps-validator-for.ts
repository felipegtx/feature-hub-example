import {IValidationStepFor} from '../validation/validation-step-for';
import {Operation} from '../validation/operation';
import {ValidationStepResultData} from '../validation/validation-step-result-data';
import {IContextOwner} from '../validation/context-owner';

/**
 * Validation process for a given set of validation steps that needs to be performed against a
 * given {@link Operation} with a given scope.
 *
 * @see https://github.com/torokmark/design_patterns_in_typescript/tree/master/chain_of_responsibility
 */
export class StepsValidatorFor<TItem> {
  private steps: IValidationStepFor<TItem>[];
  constructor(...steps: IValidationStepFor<TItem>[]) {
    this.steps = steps;
  }

  public validateCommit(
    items: TItem[],
    owner: IContextOwner<TItem>,
    autoCheck: boolean = true
  ): ValidationStepResultData {
    return ValidationStepResultData.from(
      items.map(item => this.validate(Operation.Commit, item, owner, autoCheck))
    );
  }

  public validate(
    operation: Operation,
    item: TItem,
    owner: IContextOwner<TItem>,
    autoCheck: boolean = true
  ): ValidationStepResultData {
    return new ValidationStepResultData(
      this.steps.map(step => {
        if (
          operation == Operation.Any ||
          step.operationScope() == Operation.Any ||
          step.operationScope() === operation
        ) {
          return step.validate(owner, item);
        }
        return null;
      }),
      autoCheck
    );
  }
}
