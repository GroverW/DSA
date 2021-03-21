export type ListVal = number | null;

export type SerializedList = ListVal[];

export interface ListNodeInterface {
  val: ListVal;
  next: ListNodeInterface | null;
}