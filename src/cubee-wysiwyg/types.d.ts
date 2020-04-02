export type Content = {
  id: string;
  type: string;
  props?: {
    [key: string]: any;
  };
  children?: Content[];
}
