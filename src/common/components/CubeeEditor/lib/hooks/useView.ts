import shortid from 'shortid';
import { useContext, useCallback } from 'react';
import EditorContext from '../EditorContext';
import { Context } from '../components/EditorProvider';

const useView = () => {
  const { state, dispatch } = useContext<Context>(EditorContext);
  const createView = useCallback((type) => {
    const initialProps = state.initialPropsMap[type];
    return {
      id: shortid.generate(),
      type,
      props: initialProps,
    };
  }, []);

  return {
    componentMap: state.componentMap,
    rootView: state.rootView,
    dispatch,
    createView,
  };
};

export default useView;
