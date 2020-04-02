import React from 'react';
import PropTypes from 'prop-types';
import useEditor from '../../useEditor';
import ContentEditable from './ContentEditable';
import mergeProps from '../../utils/mergeProps';

const TextView = ({ content }) => {
  const { id, props } = content;
  const { rootContent, onRootContentChange } = useEditor();
  return (
    <ContentEditable
      // eslint-disable-next-line react/prop-types
      html={props.value}
      onChange={(e) => {
        onRootContentChange(mergeProps(rootContent, id, { value: e.target.value }));
        // editorState.mergeProps(id, { value: e.target.value });
        // updateEditorState(editorState);
      }}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          console.log('enter pressed');
          e.preventDefault();
        }
      }}
    />
  );
};

TextView.propTypes = {
  content: PropTypes.object,
};

TextView.defaultProps = {
  content: null,
};

export default TextView;
