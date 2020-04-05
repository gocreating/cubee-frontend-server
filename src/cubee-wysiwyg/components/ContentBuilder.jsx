import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useEditor from '../useEditor';

const ContentBuilder = ({ content }) => {
  if (!content) {
    return null;
  }
  const { builderComponentMap, refMap } = useEditor();
  const BuilderComponent = builderComponentMap[content.type];
  if (BuilderComponent) {
    const ref = useRef(null);
    refMap[content.id] = ref;
    return (
      <BuilderComponent
        ref={ref}
        content={content}
      />
    );
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
