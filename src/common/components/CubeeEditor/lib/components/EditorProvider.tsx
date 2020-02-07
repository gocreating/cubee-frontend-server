import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import MultiBackend from 'react-dnd-multi-backend/dist/cjs/index';
import HTML5toTouch from 'react-dnd-multi-backend/dist/cjs/HTML5toTouch';
import { DndProvider } from 'react-dnd';
import EditorContext from '../EditorContext';
import CustomDragLayer from './CustomDragLayer';
import reducer, { init, registerView, selectors } from '../duck';
import LinearLayout, { reducer as linearLayoutReducer } from '../views/LinearLayout';
import TextView from '../views/TextView';
import ImageView from '../views/ImageView';
import CodeBlockView from '../views/CodeBlockView';
import PreviewView from '../views/PreviewView';

export type Context = {
  state: any;
  dispatch: React.Dispatch<any>;
}

const EditorProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, null, init);

  useEffect(() => {
    dispatch(registerView(
      'LINEAR_LAYOUT',
      LinearLayout,
      { childrenViews: [] },
      linearLayoutReducer,
    ));
    dispatch(registerView('TEXT', TextView, { value: 'Hello' }));
    dispatch(registerView('IMAGE', ImageView, { src: 'https://www.lokeshdhakar.com/projects/lightbox2/images/image-3.jpg' }));
    dispatch(registerView('CODE_BLOCK', CodeBlockView, { value: 'console.log(\'Yo\')' }));
    dispatch(registerView('PREVIEW', PreviewView, { visible: false }));
  }, []);

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <EditorContext.Provider value={{ state, dispatch }}>
        <CustomDragLayer />
        {children}
      </EditorContext.Provider>
    </DndProvider>
  );
};

EditorProvider.propTypes = {
  children: PropTypes.node,
};

EditorProvider.defaultProps = {
  children: null,
};

export default EditorProvider;
