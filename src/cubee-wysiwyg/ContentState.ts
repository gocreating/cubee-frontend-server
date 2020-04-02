class ContentState {
  private content: Content;

  constructor(content: Content) {
    this.content = content;
  }

  public updateProps(id: string, props: object) {

  }

  public toRaw(): Content {
    return this.content;
  }
}

export type Content = {
  id: string;
  type: string;
  props?: {
    [key: string]: any;
  };
  children?: Content[];
}

export default ContentState;
