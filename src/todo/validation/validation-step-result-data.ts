import { ValidationStepResult } from "./validation-step-result";

/**
 * Encapsulates the result data from a given validation session
 * 
 * @see https://github.com/torokmark/design_patterns_in_typescript/tree/master/template_method
 */
export class ValidationStepResultData {
  constructor(public data: ValidationStepResult[]) {}

  public allOk(): boolean {
    return this.errors().length === 0;
  }

  public errors(): string[] {
    return this.data
      .map(data => (!data || data.ok ? null : data.detail))
      .filter(text => text !== null);
  }
}