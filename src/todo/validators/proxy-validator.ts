import {IValidationStepFor} from '../domain/validation-step-for';
import {Operation} from '../domain/operation';
import {ValidationStepResult} from '../domain/validation-step-result';

type Validator<TSelf, TItem> = (owner: TSelf, item: TItem) => boolean;

export class ProxyValidator<TItem> implements IValidationStepFor<TItem> {
  private context: TItem[] = [];

  constructor(
    private operation: Operation,
    private validator: Validator<ProxyValidator<TItem>, TItem>,
    private errorDescription: string
  ) {}

  public operationScope = (): Operation => this.operation;

  public getContext = (): TItem[] => this.context;

  setContext(items: TItem[]): IValidationStepFor<TItem> {
    this.context = items;
    return this;
  }

  validate(item: TItem): ValidationStepResult {
    if (!this.validator(this, item)) {
      return ValidationStepResult.Nok(this.errorDescription);
    }
    return ValidationStepResult.Ok();
  }
}
