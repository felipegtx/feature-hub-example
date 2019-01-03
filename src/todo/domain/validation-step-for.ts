import { Operation } from "./operation";
import { ValidationStepResult } from "./validation-step-result";

export interface IValidationStepFor<TItem> {
  operationScope(): Operation;
  setContext(items: TItem[]): IValidationStepFor<TItem>;
  validate(item: TItem): ValidationStepResult;
}
