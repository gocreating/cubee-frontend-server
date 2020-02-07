import React from 'react';
import PropTypes from 'prop-types';
import useViewBuilder from '../../hooks/useViewBuilder';
import { Props as ViewBuilderProps } from '../../components/ViewBuilder';

const TextView: React.FunctionComponent<ViewBuilderProps> = ({ view }) => {
  const { props } = useViewBuilder(view);

  return (
    <p>
      {props.value}
    </p>
  )
};

TextView.propTypes = {
  view: PropTypes.object,
};

TextView.defaultProps = {
  view: null,
};

export default TextView;
