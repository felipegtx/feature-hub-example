import {Operation} from './operation';
import {ValidationStepResult} from './validation-step-result';
import {IContextOwner} from './context-owner';

/**
 * Interface that exposes the actions performed by any validation step
 * instance.
 *
 * @see SOLID - "The Interface Segregation Principle (ISP)"
 */
export interface IValidationStepFor<TItem> {
  operationScope(): Operation;
  validate(owner: IContextOwner<TItem>, item: TItem): ValidationStepResult;
}
