import { MERGE_VIEW_PROPS } from '../../duck';

export default (view, action) => {
  switch (action.type) {
    case MERGE_VIEW_PROPS: {
      const { props } = action.payload;
      return {
        ...view,
        props: {
          ...view.props,
          // childrenViews: view.props.childrenViews.map(childView => {

          //   return childView;
          // }),
          ...props,
        },
      };
    }
    default:
      return view;
  }
}
