/**
 * Generic Singleton implementation
 * 
 * @see https://github.com/torokmark/design_patterns_in_typescript/tree/master/singleton
 */
export class SingletonFor<Type> {
  private ctor: {new (): Type};
  private _instance: Type;

  constructor(ctor: {new (): Type}) {
    this.ctor = ctor;
  }

  public getInstance() {
    if (!this._instance) {
      this._instance = new this.ctor();
    }
    return this._instance;
  }
}
