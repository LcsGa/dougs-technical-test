import { sortBy } from './sort-by';

describe('sortBy', () => {
  type Data = {
    id: number;
    name: string;
  };

  type Group<T> = {
    key: keyof Data;
    tests: Test<T>[];
  };

  type Test<T> = {
    expectation: string;
    a: T;
    b: T;
    expected: number;
  };

  const groups: Group<{ id: number; name: string }>[] = [
    {
      key: 'id',
      tests: [
        {
          expectation: 'should return -1 when a is less than b',
          a: { id: 1, name: 'A' },
          b: { id: 2, name: 'B' },
          expected: -1,
        },
        {
          expectation: 'should return 1 when a is greater than b',
          a: { id: 2, name: 'B' },
          b: { id: 1, name: 'A' },
          expected: 1,
        },
        {
          expectation: 'should return 0 when a is equal to b',
          a: { id: 1, name: 'A' },
          b: { id: 1, name: 'B' },
          expected: 0,
        },
      ],
    },
    {
      key: 'name',
      tests: [
        {
          expectation: 'should return -1 when a is less than b',
          a: { id: 1, name: 'A' },
          b: { id: 1, name: 'B' },
          expected: -1,
        },
        {
          expectation: 'should return 1 when a is greater than b',
          a: { id: 1, name: 'B' },
          b: { id: 1, name: 'A' },
          expected: 1,
        },
        {
          expectation: 'should return 0 when a is equal to b',
          a: { id: 1, name: 'A' },
          b: { id: 1, name: 'A' },
          expected: 0,
        },
      ],
    },
  ];

  groups.forEach(({ key, tests }) =>
    describe(key, () =>
      tests.forEach(({ expectation, a, b, expected }) =>
        it(expectation, () => expect(sortBy(key)(a, b)).toBe(expected)),
      ),
    ),
  );
});
