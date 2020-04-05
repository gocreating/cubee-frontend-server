import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea';
import useEditor from '../../useEditor';
import mergeProps from '../../utils/mergeProps';

const StyledTextarea = styled(TextareaAutosize)`
  border: 0px;
  outline: 0px;
  resize: none;
  width: 100%;
`;

const MarkdownView = React.forwardRef(({ content }, ref) => {
  const { rootContent, onRootContentChange } = useEditor();
  const handleChange = (e) => {
    onRootContentChange(mergeProps(rootContent, content.id, { value: e.target.value }));
  };

  return (
    <StyledTextarea
      ref={ref}
      value={content.props.value}
      onChange={handleChange}
    />
  );
});

MarkdownView.propTypes = {
  content: PropTypes.object,
};

MarkdownView.defaultProps = {
  content: null,
};

export default MarkdownView;
