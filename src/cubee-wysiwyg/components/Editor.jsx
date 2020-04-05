import React from 'react';
import PropTypes from 'prop-types';
import MultiBackend from 'react-dnd-multi-backend/dist/cjs/index';
import HTML5toTouch from 'react-dnd-multi-backend/dist/cjs/HTML5toTouch';
import { DndProvider } from 'react-dnd';
import LinearLayout from '../builders/LinearLayout';
import MarkdownView from '../builders/MarkdownView';
import EditorContext from '../EditorContext';
import ContentBuilder from './ContentBuilder';

class Editor extends React.Component {
  render() {
    const { content, onContentChange, ...rest } = this.props;

    return (
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <EditorContext.Provider
          value={{
            rootContent: content,
            onRootContentChange: onContentChange,
            builderComponentMap: {
              'cubee/LINEAR_LAYOUT': LinearLayout,
              'cubee/MARKDOWN_VIEW': MarkdownView,
            },
            refMap: {},
          }}
        >
          {/* This div is for custom styling from outside */}
          <div {...rest}>
            <ContentBuilder content={content} />
          </div>
        </EditorContext.Provider>
      </DndProvider>
    );
  }
}

Editor.propTypes = {
  content: PropTypes.object.isRequired,
  onContentChange: PropTypes.func.isRequired,
};

export default Editor;
