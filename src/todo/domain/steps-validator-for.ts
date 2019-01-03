import { IValidationStepFor } from "./validation-step-for";
import { Operation } from "./operation";
import { ValidationStepResultData } from "./validation-step-result-data";

export class StepsValidatorFor<TItem> {
  private steps: IValidationStepFor<TItem>[];
  constructor(...steps: IValidationStepFor<TItem>[]) {
    this.steps = steps;
  }

  public validate(
    operation: Operation,
    item: TItem,
    scope: TItem[]
  ): ValidationStepResultData {
    return new ValidationStepResultData(
      this.steps.map(step => {
        if (
          step.operationScope() == Operation.Any ||
          step.operationScope() === operation
        ) {
          return step.setContext(scope).validate(item);
        }
        return null;
      })
    );
  }
}
