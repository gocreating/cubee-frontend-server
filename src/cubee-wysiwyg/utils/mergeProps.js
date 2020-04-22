const mergeProps = (content, findId, props) => {
  if (content.id === findId) {
    return {
      ...content,
      props: {
        ...content.props,
        ...props,
      },
    };
  }
  return {
    ...content,
    children: content.children && content.children.map(childContent => mergeProps(childContent, findId, props)),
  };
};

export default mergeProps;
