import { TestScheduler } from 'rxjs/testing';
import { toState } from './to-state';

describe('toState', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => expect(actual).toEqual(expected));
  });

  it('should emit a pending state at startup, then the data', () =>
    testScheduler.run(({ cold, time, expectObservable }) => {
      const source = cold('--a|');
      const t = time('     |');
      const expected = '   p-a|';

      expectObservable(source.pipe(toState(t))).toBe(expected, {
        p: { pending: true },
        a: { data: 'a' },
      });
    }));

  it('should emit a pending state at startup, then it should error', () =>
    testScheduler.run(({ cold, time, expectObservable }) => {
      const source = cold('--#');
      const t = time('     |');
      const expected = '   p-(e|)';

      expectObservable(source.pipe(toState(t))).toBe(expected, {
        p: { pending: true },
        e: { error: 'error' },
      });
    }));

  it('should emit the data only as the pending emits too early', () =>
    testScheduler.run(({ cold, time, expectObservable }) => {
      const source = cold('-a--|');
      const t = time('      --|');
      const expected = '   ---a|';

      expectObservable(source.pipe(toState(t))).toBe(expected, {
        a: { data: 'a' },
      });
    }));

  it('should emit the error only as the pending emits too early', () =>
    testScheduler.run(({ cold, time, expectObservable }) => {
      const source = cold('-#--|');
      const t = time('      --|');
      const expected = '   -(e|)';

      expectObservable(source.pipe(toState(t))).toBe(expected, {
        e: { error: 'error' },
      });
    }));
});
