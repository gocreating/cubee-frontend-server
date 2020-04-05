import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import useEditor from '../../useEditor';
import ContentBuilder from '../../components/ContentBuilder';
import DndItem from './DndItem';
import DndPreview from './DndPreview';
import usePreview from './usePreview';

const Container = styled.div`
  display: flex;
  ${props => props.orientation === 'horizontal' ? css`
    flex-direction: row;
  ` : css`
    flex-direction: column;
  `}
`;

const LinearLayout = React.forwardRef(({ content }, ref) => {
  const { id, props, children } = content;
  // eslint-disable-next-line react/prop-types
  const { orientation } = props;
  const { rootContent, onRootContentChange } = useEditor();
  const {
    injectedContents,
    isPreviewing,
    previewIndex,
    startPreview,
    stopPreview,
  } = usePreview(id, children || []);

  const indexOfId = (id) => children.findIndex(childContent => childContent.id === id);

  return (
    <Container ref={ref} orientation={orientation}>
      {injectedContents.map((childContent, index) => {
        if (index !== previewIndex) {
          return (
            <DndItem
              key={childContent.id}
              content={childContent}
              orientation={orientation}
              previewIndex={previewIndex}
              index={index}
              startPreview={startPreview}
              stopPreview={stopPreview}
              indexOfId={indexOfId}
            >
              <ContentBuilder content={childContent} />
            </DndItem>
          );
        }
        return (
          <DndPreview
            key={childContent.id}
            visible={isPreviewing}
            orientation={orientation}
          />
        );
      })}
    </Container>
  )
});

LinearLayout.propTypes = {
  content: PropTypes.object,
};

LinearLayout.defaultProps = {
  content: null,
};

export default LinearLayout;
