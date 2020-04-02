import shortid from 'shortid';
import LinearLayout from './builders/LinearLayout';
import TextView from './builders/TextView';

class EditorState {
  static createEmpty(): EditorState {
    return new EditorState();
  }

  private rootContent: Content;

  public builderComponentMap = {
    'cubee/LINEAR_LAYOUT': LinearLayout,
    'cubee/TEXT_VIEW': TextView,
  };

  constructor() {
    this.rootContent = {
      id: shortid.generate(),
      type: 'cubee/LINEAR_LAYOUT',
      props: {
        orientation: 'vertical',
      },
      children: [{
        id: shortid.generate(),
        type: 'cubee/TEXT_VIEW',
        props: {
          value: 'test test',
        },
      }],
    };
  }

  public getContent(): Content {
    return this.rootContent;
  }

  public mergeProps(id: string, props: object): EditorState {
    this.recursiveMergeProps(this.rootContent, id, props);
    return this;
  }

  private recursiveMergeProps(rootContent: Content, id: string, props: object) {
    if (rootContent.id === id) {
      rootContent.props = {
        ...rootContent.props,
        ...props,
      };
    } else {
      (rootContent.children || []).forEach(content => this.recursiveMergeProps(content, id, props));
    }
  }
}

export type Content = {
  id: string;
  type: string;
  props?: {
    [key: string]: any;
  };
  children?: Content[];
};

export default EditorState;
