import find from './find';

describe('find', () => {
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

  test('should find content by id', () => {
    const findId1 = find(rootContent, 'id1');
    const findId2 = find(rootContent, 'id2');
    const findId3 = find(rootContent, 'id3');
    expect(findId1).toEqual({
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
    });
    expect(findId2).toEqual({
      id: 'id2',
      type: 'type2',
      props: {
        prop1: 'value1',
      },
    });
    expect(findId3).toEqual({
      id: 'id3',
      type: 'type3',
      props: {
        prop1: 'value1',
      },
    });
  });

  test('should return undefined when id is not found', () => {
    const findResult = find(rootContent, 'id_not_exist');
    expect(findResult).toBeUndefined;
  });
});
