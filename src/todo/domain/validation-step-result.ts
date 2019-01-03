export class ValidationStepResult {
    constructor(public ok: boolean, public detail: string = null) {}
  
    static Ok() {
      return new ValidationStepResult(true);
    }
  
    static Nok(error: string) {
      return new ValidationStepResult(false, error);
    }
  }