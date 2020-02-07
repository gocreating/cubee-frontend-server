import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useView from './lib/hooks/useView';
import ViewBuilder from './lib/components/ViewBuilder';
import ViewSourceMenu from './ViewSourceMenu';

const Container = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const StyledViewSourceMenu = styled(ViewSourceMenu)`
  flex: 0 0 250px;
`;

const StyledViewBuilder = styled.div`
  flex: 1;
  min-height: 100px;
  background-color: #efefef;
`;

const CubeeEditor: React.FunctionComponent = () => {
  const { rootView } = useView();
  return (
    <Container>
      <StyledViewSourceMenu />
      <StyledViewBuilder>
        <ViewBuilder view={rootView} />
      </StyledViewBuilder>
    </Container>
  );
};

CubeeEditor.propTypes = {
  children: PropTypes.node,
};

export default CubeeEditor;
