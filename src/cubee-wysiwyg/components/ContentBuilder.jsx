import React from 'react';
import PropTypes from 'prop-types';
import useEditor from '../useEditor';

const ContentBuilder = ({ content }) => {
  if (!content) {
    return null;
  }
  const { builderComponentMap } = useEditor();
  const BuilderComponent = builderComponentMap[content.type];
  if (BuilderComponent) {
    return <BuilderComponent content={content} />;
  }
  return (
    <div>
      View is not registered.
    </div>
  );
};

ContentBuilder.propTypes = {
  content: PropTypes.object,
};

export default ContentBuilder;
