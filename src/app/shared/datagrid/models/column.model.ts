export interface Column<T> {
  title: string;
  property: keyof T;
}
