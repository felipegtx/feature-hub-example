export class ValidationStepResult {
  constructor(public ok: boolean, public detail: string = null) {}

  /**
   * Returns a new instance of this class indicating that no errors were found.
   *
   * @see https://github.com/torokmark/design_patterns_in_typescript/tree/master/factory_method
   */
  static Ok(): ValidationStepResult {
    return new ValidationStepResult(true);
  }

  /**
   *  Returns a new instance of this class indicating that an error was found.
   *
   * @param error The error message that describes the problem found.
   * @see https://github.com/torokmark/design_patterns_in_typescript/tree/master/factory_method
   */
  static Nok(error: string): ValidationStepResult {
    return new ValidationStepResult(false, error);
  }
}
