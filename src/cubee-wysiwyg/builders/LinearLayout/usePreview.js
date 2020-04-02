import { useState, useCallback } from 'react';

export default (scopeId, contents) => {
  const [state, setState] = useState({
    isPreviewing: false,
    previewIndex: contents.length,
  });
  const getInjectedContents = useCallback(() => {
    const injectedContents = [...contents];
    injectedContents.splice(state.previewIndex, 0, {
      id: `${scopeId}_preview`,
      type: 'cubee/PREVIEW',
    });
    return injectedContents;
  }, [state.previewIndex, contents]);
  const startPreview = (previewIndex) => {
    setState({
      isPreviewing: true,
      previewIndex: previewIndex || state.previewIndex,
    });
  };
  const stopPreview = () => {
    setState({ isPreviewing: false });
  };
  return {
    injectedContents: getInjectedContents(),
    isPreviewing: state.isPreviewing,
    previewIndex: state.previewIndex,
    startPreview,
    stopPreview,
  }
}
