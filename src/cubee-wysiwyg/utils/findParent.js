const recursiveFindParent = (content, findId, parentContent) => {
  // console.log('====== recursiveFindParent ========\n', content, findId, parentContent);

  if (content.id === findId) {
    return parentContent;
  }
  if (content.children && content.children.length > 0) {
    for (let i = 0; i < content.children.length; i++) {
      const foundParent = recursiveFindParent(content.children[i], findId, content);
      if (foundParent !== null) {
        return foundParent;
      }
    }
  }
  return null;
};

const findParent = (content, findId) => {
  if (content.id === findId) {
    return null;
  }
  return recursiveFindParent(content, findId, {});
};

export default findParent;
