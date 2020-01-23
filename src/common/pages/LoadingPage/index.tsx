import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Spinner as SpinnerIcon } from '@styled-icons/fa-solid/Spinner';
import { withLayout } from '../../layouts/AppLayout';
import Container from '../../components/Container';
import Box from '../../components/Box';
import Spinnable from '../../components/Spinnable';

interface Prop {
  pastDelay: boolean;
  timedOut: boolean;
}

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoadingPage: React.FunctionComponent<Prop> = ({
  pastDelay, timedOut,
}) => {
  if (!pastDelay) {
    return null;
  }
  if (timedOut) {
    return (
      <StyledContainer>
        Oops! Loading timeout!
      </StyledContainer>
    );
  }
  return (
    <StyledContainer>
      <Spinnable>
        <SpinnerIcon size={36} />
      </Spinnable>
      <Box mt={3}>
        Loading...
      </Box>
    </StyledContainer>
  );
}

LoadingPage.propTypes = {
  pastDelay: PropTypes.bool.isRequired,
  timedOut: PropTypes.bool.isRequired,
}

export default withLayout<Prop>({ nav: true })(LoadingPage);
