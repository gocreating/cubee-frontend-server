import React from 'react';
import PropTypes from 'prop-types';
import useViewBuilder from '../../hooks/useViewBuilder';
import { Props as ViewBuilderProps } from '../../components/ViewBuilder';

const CodeBlockView: React.FunctionComponent<ViewBuilderProps> = ({ view }) => {
  const { props } = useViewBuilder(view);

  return (
    <code>{props.value}</code>
  )
};

CodeBlockView.propTypes = {
  view: PropTypes.object,
};

CodeBlockView.defaultProps = {
  view: null,
};

export default CodeBlockView;
