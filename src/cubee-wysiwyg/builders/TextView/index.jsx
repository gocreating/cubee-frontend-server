import React from 'react';
import PropTypes from 'prop-types';
import useEditor from '../../useEditor';
import ContentEditable from './ContentEditable';
import mergeProps from '../../utils/mergeProps';

const TextView = React.forwardRef(({ content }, ref) => {
  const { id, props } = content;
  const { rootContent, onRootContentChange, refMap } = useEditor();
  const handleContentChange = (e) => {
    onRootContentChange(mergeProps(rootContent, id, { value: e.target.value }));
  };
  const handleKeyDown = (e) => {
    switch (e.keyCode) {
      case 13: // Enter
        console.log('enter pressed');
        e.preventDefault();
        break;
      case 37: // Left
        break;
      case 38: // Up
        break;
      case 39: // Right
        break;
      case 40: // Down
        if (document.getSelection().focusOffset === ref.current.innerText.length) {
          refMap['ccc'].current.focus();
        }
        break;
    }
  };

  // return (
  //   <input
  //     ref={ref}
  //     value={props.value}
  //     onChange={handleContentChange}
  //     onKeyDown={handleKeyDown}
  //   />
  // );

  return (
    <ContentEditable
      innerRef={ref}
      html={props.value}
      onChange={handleContentChange}
      onKeyDown={handleKeyDown}
      // make focus() available
      tabIndex="0"
    />
  );
});

TextView.propTypes = {
  content: PropTypes.object,
};

TextView.defaultProps = {
  content: null,
};

export default TextView;
