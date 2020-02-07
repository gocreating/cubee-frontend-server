import React from 'react';
import { Text as TextIcon } from '@styled-icons/boxicons-regular/Text';
import { Image as ImageIcon } from '@styled-icons/boxicons-regular/Image';
import { CodeAlt as CodeIcon } from '@styled-icons/boxicons-regular/CodeAlt';
import ViewTypes from './ViewTypes';

export default {
  [ViewTypes.TEXT]: <TextIcon size={16} />,
  [ViewTypes.IMAGE]: <ImageIcon size={16} />,
  [ViewTypes.CODE_BLOCK]: <CodeIcon size={16} />,
};
