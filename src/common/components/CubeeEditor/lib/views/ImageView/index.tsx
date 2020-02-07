import React from 'react';
import PropTypes from 'prop-types';
import useViewBuilder from '../../hooks/useViewBuilder';
import { Props as ViewBuilderProps } from '../../components/ViewBuilder';

const ImageView: React.FunctionComponent<ViewBuilderProps> = ({ view }) => {
  const { props } = useViewBuilder(view);

  return (
    <img src={props.src} />
  )
};

ImageView.propTypes = {
  view: PropTypes.object,
};

ImageView.defaultProps = {
  view: null,
};

export default ImageView;
