import React from 'react';
import PropTypes from 'prop-types';
import MultiBackend from 'react-dnd-multi-backend/dist/cjs/index';
import HTML5toTouch from 'react-dnd-multi-backend/dist/cjs/HTML5toTouch';
import { DndProvider } from 'react-dnd';
import EditorContext from '../EditorContext';

const Provider = ({ editorState, updateEditorState, children }) => {
  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <EditorContext.Provider value={{ editorState, updateEditorState }}>
        {children}
      </EditorContext.Provider>
    </DndProvider>
  );
};

Provider.propTypes = {
  editorState: PropTypes.object.isRequired,
  updateEditorState: PropTypes.func.isRequired,
  children: PropTypes.node,
};

Provider.defaultProps = {
  children: null,
};

export default Provider;
