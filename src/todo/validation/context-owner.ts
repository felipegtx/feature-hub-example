/**
 * Contract that define a safe way to expose the context of a given object
 *
 * @see SOLID - "The Interface Segregation Principle (ISP)"
 */
export interface IContextOwner<TItem> {
  getContext(): TItem[];
}
