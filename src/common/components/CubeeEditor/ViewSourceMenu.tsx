import React from 'react';
import ViewSource from './ViewSource';
import ViewTypes from './ViewTypes';

const ViewSourceMenu: React.FunctionComponent = () => (
  <div>
    <ViewSource viewType={ViewTypes.TEXT} />
    <ViewSource viewType={ViewTypes.IMAGE} />
    <ViewSource viewType={ViewTypes.CODE_BLOCK} />
  </div>
);

export default ViewSourceMenu;
