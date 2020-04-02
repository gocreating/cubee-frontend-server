import { useContext } from 'react';
import EditorContext from './EditorContext';

const useEditor = () => {
  const context = useContext(EditorContext);

  return context;
};

export default useEditor;
