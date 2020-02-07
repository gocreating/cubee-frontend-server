import shortid from 'shortid';

/**
 * Actions
 */
export const REGISTER_VIEW = 'REGISTER_VIEW';
export const MERGE_VIEW_PROPS = 'MERGE_VIEW_PROPS';

/**
 * Action Creators
 */
export const registerView = (type, component, initialProps = {}, reducer?) => ({
  type: REGISTER_VIEW,
  payload: { type, component, initialProps, reducer },
});

export const mergeViewProps = (id, type, props) => ({
  type: MERGE_VIEW_PROPS,
  payload: { id, type, props },
});

/**
 * Initialize state
 */
export const init = () => {
  return {
    componentMap: {},
    initialPropsMap: {},
    reducerMap: {},
    // viewPropMergerMap: {
    //   LINEAR_LAYOUT: (id, propsToMerge, view, merge) => {
    //     // const mergedProps = view.props.childrenViews.map(childView => childView.id === id ? merge());
    //   },
    // },
    // viewFinderMap: {
    //   LINEAR_LAYOUT: (id, view, find) => {
    //     const foundViewInCurrentDepth = view.props.childrenViews.find(childView => childView.id === id);
    //     if (foundViewInCurrentDepth) {
    //       return foundViewInCurrentDepth;
    //     }
    //     return view.props.childrenViews.find(childView => find(id, childView, find));
    //   },
    // },
    rootView: {
      id: shortid.generate(),
      type: 'LINEAR_LAYOUT',
      props: {
        orientation: 'vertical',
        childrenViews: [
          {
            id: shortid.generate(),
            type: 'TEXT',
            props: {
              value: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
            },
          },
          {
            id: shortid.generate(),
            type: 'IMAGE',
            props: {
              src: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Ad-MediumRectangle-300x250.jpg',
            },
          },
          {
            id: shortid.generate(),
            type: 'IMAGE',
            props: {
              src: 'data:image/jpeg;base64,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',
            },
          },
          {
            id: shortid.generate(),
            type: 'LINEAR_LAYOUT',
            props: {
              orientation: 'horizontal',
              childrenViews: [
                {
                  id: shortid.generate(),
                  type: 'TEXT',
                  props: {
                    value: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
                  },
                },
                {
                  id: shortid.generate(),
                  type: 'IMAGE',
                  props: {
                    src: 'https://sales.legacy.com/wp-content/uploads/2019/06/300x600.jpg',
                  },
                },
                {
                  id: shortid.generate(),
                  type: 'TEXT',
                  props: {
                    value: 'zzz zzzzz zzzzzzzzzzz',
                  },
                },
                {
                  id: shortid.generate(),
                  type: 'IMAGE',
                  props: {
                    src: 'https://sales.legacy.com/wp-content/uploads/2019/06/300x600.jpg',
                  },
                },
              ],
            },
          },
          {
            id: shortid.generate(),
            type: 'CODE_BLOCK',
            props: {
              value: 'import React, { useState, useCallback } from \'react\';',
            },
          },
        ],
      },
    },
  };
};

/**
 * Selectors
 */
export const selectors = {
  getReducer(state, type) {
    const { reducerMap } = state;
    return reducerMap[type];
  },
  getInitialProps(state, type) {
    const { initialProps } = state;
    return initialProps[type];
  },
  getFinder(state, view) {
    const { viewFinderMap } = state;
    return viewFinderMap[view.type];
  },
  getView(state, id: string) {
    const { rootView } = state;
    if (id === rootView.id) {
      return rootView;
    }
    const find = this.getFinder(state, rootView);
    if (find) {
      return find(id, rootView, this.getFinder.bind(state));
    } else {
      return null;
    }
  },
};

/**
 * Reducer
 */
export default (state, action) => {
  switch (action.type) {
    case REGISTER_VIEW: {
      const { type, component, initialProps, reducer } = action.payload;
      return {
        ...state,
        componentMap: {
          ...state.componentMap,
          [type]: component,
        },
        initialPropsMap: {
          ...state.initialPropsMap,
          [type]: initialProps,
        },
        reducerMap: {
          ...state.reducerMap,
          [type]: reducer,
        },
      }
    }
    case MERGE_VIEW_PROPS: {
      const { id, type } = action.payload;
      const { rootView } = state;
      const reducer = selectors.getReducer(state, type);

      if (id === rootView.id) {
        return {
          ...state,
          rootView: reducer(rootView, action),
        };
      }
      return state;
    }
    default:
      return state;
  }
};

/**
 * Types
 */
