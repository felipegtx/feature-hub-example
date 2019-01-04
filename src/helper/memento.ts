/**
 * Allows a given transient state to be mantained/retrieved should the operation 
 * being performed fails.
 * 
 * @see https://github.com/torokmark/design_patterns_in_typescript/tree/master/memento
 */
export default class Memento {
  static safeExecute<T>(
    getState: () => T,
    what: (stateCopy: T) => void,
    failed: (previousState: T, error: any) => void
  ): boolean {
    let basState = getState();
    let copy: any = Array.isArray(basState) ? [...basState] : {...basState};
    try {
      what(copy);
      return true;
    } catch (e) {
      failed(copy, e);
      alert(e);
      console.log(e);
      return false;
    }
  }
}
