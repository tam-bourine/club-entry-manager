/**
 * @description
 *  @see https://qiita.com/uhyo/items/80ce7c00f413c1d1be56
 *  AtLeast<3, number> -> [0,0,0] のように第一引数で指定した数値以上の長さに配列を固定する型
 */
// eslint-disable-next-line no-unused-vars
type Append<Elm, T extends unknown[]> = ((arg: Elm, ...rest: T) => void) extends (...args: infer T2) => void
  ? T2
  : never;
type AtLeastRecursion<Length, Elm, T extends unknown[], C extends unknown[]> = {
  0: T;
  1: AtLeastRecursion<Length, Elm, Append<Elm, T>, Append<unknown, C>>;
}[C extends { length: Length } ? 0 : 1];
export type AtLeast<N extends number, T> = AtLeastRecursion<N, T, T[], []>;
