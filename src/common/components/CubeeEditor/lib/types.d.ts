export interface View<P extends object> {
  id: string;
  type: string;
  props: P;
}
