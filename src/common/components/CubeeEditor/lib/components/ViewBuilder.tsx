import React from 'react';
import PropTypes from 'prop-types';
import useView from '../hooks/useView';
import { View } from '../types';

const ViewBuilder: React.FunctionComponent<Props> = ({ view }) => {
  if (!view) {
    return null;
  }
  const { componentMap } = useView();
  const ViewComponent = componentMap[view.type];
  if (ViewComponent) {
    return <ViewComponent view={view} />;
  }
  return (
    <div>
      View is not registered.
    </div>
  );
};

ViewBuilder.propTypes = {
  view: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    props: PropTypes.object.isRequired,
  }),
};

type Props = {
  view?: View<{
    [propName: string]: any;
  }>;
}

export default ViewBuilder;
