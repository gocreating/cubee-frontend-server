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
    if (previewIndex !== state.previewIndex || state.isPreviewing !== true) {
      setState({
        isPreviewing: true,
        previewIndex,
      });
    }
  };
  const stopPreview = () => {
    setState({
      isPreviewing: false,
      previewIndex: contents.length,
    });
  };
  return {
    injectedContents: getInjectedContents(),
    isPreviewing: state.isPreviewing,
    previewIndex: state.previewIndex,
    startPreview,
    stopPreview,
  }
}
