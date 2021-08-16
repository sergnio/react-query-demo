import Character from "./character";

export default interface ApiResult<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
