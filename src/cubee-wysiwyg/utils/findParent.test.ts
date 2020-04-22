import findParent from './findParent';

describe('findParent', () => {
  const rootContent = {
    id: 'id1',
    type: 'type1',
    props: {
      prop1: 'value1',
    },
    children: [{
      id: 'id1_1',
      type: 'type2',
      props: {
        prop1: 'value1',
      },
    }, {
      id: 'id1_2',
      type: 'type1',
      props: {
        prop1: 'value1',
      },
      children: [{
        id: 'id1_2_1',
        type: 'type3',
        props: {
          prop1: 'value1',
        },
      }, {
        id: 'id1_2_2',
        type: 'type3',
        props: {
          prop1: 'value1',
        },
      }],
    }, {
      id: 'id1_3',
      type: 'type3',
      props: {
        prop1: 'value1',
      },
    }],
  };

  test('should find parent content by id', () => {
    const parent1 = findParent(rootContent, 'id1_1');
    const parent2 = findParent(rootContent, 'id1_2');
    const parent3 = findParent(rootContent, 'id1_3');
    const parent4 = findParent(rootContent, 'id1_2_1');
    const parent5 = findParent(rootContent, 'id1_2_2');
    expect(parent1).toEqual(rootContent);
    expect(parent2).toEqual(rootContent);
    expect(parent3).toEqual(rootContent);
    expect(parent4).toEqual(rootContent.children[1]);
    expect(parent5).toEqual(rootContent.children[1]);
  });

  test('should return null when no parent', () => {
    const parent = findParent(rootContent, 'id1');
    expect(parent).toEqual(null);
  });

  test('should return null when id is not found', () => {
    const parent = findParent(rootContent, 'id_not_exist');
    expect(parent).toEqual(null);
  });
});
