const find = (content, findId) => {
  if (content.id === findId) {
    return { ...content };
  }
  return content.children && content.children.find(childContent => find(childContent, findId));
};

export default find;
