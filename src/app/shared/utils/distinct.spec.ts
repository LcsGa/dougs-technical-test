import { distinct } from './distinct';

describe('distinct', () => {
  type Test<T> = {
    expectation: string;
    distinguish: () => T[];
    expected: T[];
  };

  const tests = [
    {
      expectation: 'should return distinct values',
      distinguish: () => distinct([1, 2, 3, 1, 2, 3, 4, 5]),
      expected: [1, 2, 3, 4, 5],
    } as Test<number>,
    {
      expectation: 'should return distinct values by key',
      distinguish: () =>
        distinct(
          [
            { id: 1, name: 'A' },
            { id: 2, name: 'B' },
            { id: 3, name: 'C' },
            { id: 1, name: 'D' },
            { id: 2, name: 'E' },
            { id: 3, name: 'F' },
            { id: 4, name: 'G' },
            { id: 5, name: 'H' },
          ],
          ({ id }) => id,
        ),
      expected: [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
        { id: 3, name: 'C' },
        { id: 4, name: 'G' },
        { id: 5, name: 'H' },
      ],
    } satisfies Test<{ id: number; name: string }>,
  ];

  tests.forEach(({ expectation, distinguish, expected }) =>
    it(expectation, () => expect(distinguish()).toEqual(expected)),
  );
});
