export type TreeVal = number | null;

export type SerializedTree = TreeVal[];

export interface TreeNodeInterface {
  val: TreeVal;
  left: TreeNodeInterface | null;
  right: TreeNodeInterface | null;
}

