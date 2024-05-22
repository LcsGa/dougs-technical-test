import { isNotNil } from './is-not-nil';

describe('isNotNil', () => {
  type Test = {
    expectation: string;
    input: any;
    expected: boolean;
  };

  const tests: Test[] = [
    { expectation: 'should return true for a number', input: 1, expected: true },
    { expectation: 'should return true for a string', input: 'a', expected: true },
    { expectation: 'should return true for an object', input: {}, expected: true },
    { expectation: 'should return true for an array', input: [], expected: true },
    { expectation: 'should return true for a boolean', input: true, expected: true },
    { expectation: 'should return true for a function', input: () => {}, expected: true },
    { expectation: 'should return true for a symbol', input: Symbol(), expected: true },
    { expectation: 'should return false for null', input: null, expected: false },
    { expectation: 'should return false for undefined', input: undefined, expected: false },
  ];

  tests.forEach(({ expectation, input: value, expected }) =>
    it(expectation, () => expect(isNotNil(value)).toBe(expected)),
  );
});
