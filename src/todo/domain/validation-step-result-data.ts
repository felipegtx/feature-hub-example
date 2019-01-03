import { ValidationStepResult } from "./validation-step-result";

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