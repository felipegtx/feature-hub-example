import {IContextOwner} from './context-owner';

/**
 * Contract that define a safe way to expose the context of a given object
 *
 * @see SOLID - "The Interface Segregation Principle (ISP)"
 */
export interface IContextRepoOwner<TItem> extends IContextOwner<TItem> {
  add(item: TItem): boolean;
  remove(item: TItem): boolean;
  update(items: TItem[]): boolean;
}
