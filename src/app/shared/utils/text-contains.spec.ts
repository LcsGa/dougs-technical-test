import { textContains } from './text-contains';

describe('textContains', () => {
  type Test = {
    expectation: string;
    text: string;
    search: string;
    expected: boolean;
  };

  const tests: Test[] = [
    {
      expectation: 'should return true when the text contains the search',
      text: 'hello',
      search: 'ell',
      expected: true,
    },
    {
      expectation: 'should return true when the text contains the search (case insensitive)',
      text: 'hello',
      search: 'ElL',
      expected: true,
    },
    {
      expectation: 'should return false the text does not contain the search',
      text: 'hello',
      search: 'world',
      expected: false,
    },
  ];

  tests.forEach(({ expectation, text, search, expected }) =>
    it(expectation, () => expect(textContains(text, search)).toBe(expected)),
  );
});
