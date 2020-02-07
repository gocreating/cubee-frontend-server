import React from 'react';
import { Context } from './components/EditorProvider';

const EditorContext = React.createContext<Context>({});

export default EditorContext;
