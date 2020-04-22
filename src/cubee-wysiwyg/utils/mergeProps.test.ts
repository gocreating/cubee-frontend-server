import mergeProps from './mergeProps';

describe('#mergeProps', () => {
  const rootContent = {
    id: 'id1',
    type: 'type1',
    props: {
      prop1: 'value1',
    },
    children: [{
      id: 'id2',
      type: 'type2',
      props: {
        prop1: 'value1',
      },
    }, {
      id: 'id3',
      type: 'type3',
      props: {
        prop1: 'value1',
      },
    }],
  };

  test('should update existing props', () => {
    const mergedContent = mergeProps(rootContent, 'id1', {
      prop1: 'new value',
    });
    expect(mergedContent).toEqual({
      id: 'id1',
      type: 'type1',
      props: {
        prop1: 'new value',
      },
      children: [{
        id: 'id2',
        type: 'type2',
        props: {
          prop1: 'value1',
        },
      }, {
        id: 'id3',
        type: 'type3',
        props: {
          prop1: 'value1',
        },
      }],
    });
  });

  test('should add new props', () => {
    const mergedContent = mergeProps(rootContent, 'id1', {
      prop2: 'new value',
    });
    expect(mergedContent).toEqual({
      id: 'id1',
      type: 'type1',
      props: {
        prop1: 'value1',
        prop2: 'new value',
      },
      children: [{
        id: 'id2',
        type: 'type2',
        props: {
          prop1: 'value1',
        },
      }, {
        id: 'id3',
        type: 'type3',
        props: {
          prop1: 'value1',
        },
      }],
    });
  });

  test('should return unchanged content when id is not found', () => {
    const mergedContent = mergeProps(rootContent, 'id_not_exist', {
      prop1: 'new value1',
      prop2: 'new value2',
    });
    expect(mergedContent).toEqual(rootContent);
  });
});
