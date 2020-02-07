import { useState } from 'react';
import shortid from 'shortid';

const useViewBuilder = (view) => {
  const id = view.id || shortid.generate();
  const [viewProps, setViewProps] = useState(view.props);
  const setProp = (property: string, value: any) => {
    if (typeof value === 'function') {
      setViewProps(prevViewProps => ({
        ...prevViewProps,
        [property]: value(prevViewProps[property]),
      }));
    } else {
      setViewProps({
        ...viewProps,
        [property]: value,
      });
    }
  };
  const getProp = (property: string) => {
    return viewProps[property];
  }
  const toJSON = () => {
    return {
      id,
      type: view.type,
      props: viewProps,
    };
  };

  return {
    setProp,
    setProps: setViewProps,
    getProp,
    props: viewProps,
    toJSON,
  };
};

export default useViewBuilder;
