import {ValidationStepResult} from './validation-step-result';

/**
 * Encapsulates the result data from a given validation session
 *
 * @see https://github.com/torokmark/design_patterns_in_typescript/tree/master/template_method
 */
export class ValidationStepResultData {
  constructor(
    public data: ValidationStepResult[] = [],
    autoCheck: boolean = true
  ) {
    if (autoCheck) {
      this.check();
    }
  }

  static from(data: ValidationStepResultData[]): ValidationStepResultData {
    let instance = new ValidationStepResultData();
    data.forEach(result => {
      result.data.forEach(d => instance.data.push(d));
    });
    return instance;
  }

  public allOk(): boolean {
    return this.errors().length === 0;
  }

  public errors(): string[] {
    return this.data
      .map(data => (!data || data.ok ? null : data.detail))
      .filter(text => text !== null);
  }

  public check(): ValidationStepResultData {
    if (!this.allOk()) {
      throw this.errors().join('\n');
    }
    return this;
  }
}
