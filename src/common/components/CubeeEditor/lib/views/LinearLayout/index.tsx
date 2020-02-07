import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import useView from '../../hooks/useView';
import ViewBuilder from '../../components/ViewBuilder';
import SortableItem from './SortableItem';
import { mergeViewProps } from '../../duck';

const Container = styled.div`
  display: flex;
  ${props => props.orientation === 'horizontal' ? css`
    flex-direction: row;
  ` : css`
    flex-direction: column;
  `}
`;

const getRenderedChildrenViews = (rawChildrenViews, orientation: string, previewIndex: number, isPreviewing: boolean) => {
  const renderedChildrenViews = [...rawChildrenViews];
  renderedChildrenViews.splice(previewIndex, 0, {
    id: 'preview',
    type: 'PREVIEW',
    props: {
      visible: isPreviewing,
      orientation,
    },
  });
  return renderedChildrenViews;
};

const toBoundIndex = (index: number, arr: any[]) => {
  return Math.min(Math.max(index, 0), arr.length - 1);
};

const LinearLayout: React.FunctionComponent = ({ view }) => {
  const { id, type, props } = view;
  const { orientation, childrenViews } = props;
  const { dispatch, createView } = useView();
  const [state, setState] = useState({
    isPreviewing: false,
    previewIndex: childrenViews.length,
  });
  const renderedChildrenViews = getRenderedChildrenViews(childrenViews, orientation, state.previewIndex, state.isPreviewing);

  const previewAt = (rawIndex: number, isPreviewing = true) => {
    if (state.previewIndex !== rawIndex || state.isPreviewing !== isPreviewing) {
      setState({
        previewIndex: rawIndex,
        isPreviewing: isPreviewing,
      });
    }
  };

  const clearPreview = () => {
    if (state.isPreviewing || state.previewIndex !== childrenViews.length) {
      setState({
        isPreviewing: false,
        previewIndex: childrenViews.length,
      });
    }
  };

  const swap = (rawIndex1: number, rawIndex2: number) => {
    if (rawIndex1 === rawIndex2) {
      return;
    }
    const index1 = toBoundIndex(rawIndex1, renderedChildrenViews);
    const index2 = toBoundIndex(rawIndex2, renderedChildrenViews);

    const snapshot = getRenderedChildrenViews(childrenViews, orientation, state.previewIndex, false);
    const tmp = snapshot[index1];
    snapshot[index1] = snapshot[index2];
    snapshot[index2] = tmp;
    dispatch(mergeViewProps(id, type, {
      childrenViews: snapshot.filter(v => v.type !== 'PREVIEW'),
    }));
  };

  const add = (rawIndex: number, viewType: string) => {
    const snapshot = getRenderedChildrenViews(childrenViews, orientation, state.previewIndex, false);
    snapshot.splice(rawIndex, 0, createView(viewType));
    dispatch(mergeViewProps(id, type, {
      childrenViews: snapshot.filter(v => v.type !== 'PREVIEW'),
    }));
  };

  return (
    <Container orientation={orientation}>
      {renderedChildrenViews.map((childView, index) => (
        <SortableItem
          key={childView.id}
          parentViewId={id}
          view={childView}
          index={index}
          isPreviewing={state.isPreviewing}
          previewIndex={state.previewIndex}
          previewAt={previewAt}
          swap={swap}
          add={add}
          clearPreview={clearPreview}
          orientation={orientation || 'vertical'}
          cancelWhenDropOutside
        >
          <ViewBuilder view={childView} />
        </SortableItem>
      ))}
    </Container>
  )
};

LinearLayout.propTypes = {
  view: PropTypes.object,
};

LinearLayout.defaultProps = {
  view: null,
};

export default LinearLayout;
export { default as reducer } from './reducer';
