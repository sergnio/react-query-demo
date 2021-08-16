import Character from "./characters";

export default interface ApiResult<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
