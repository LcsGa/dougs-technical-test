import { catchError, debounceTime, map, of, OperatorFunction, pipe, startWith } from 'rxjs';

export type State<T, E = unknown> = {
  pending?: boolean;
  error?: E;
  data?: T;
};

export function toState<T, E = unknown>(dueTime = 100): OperatorFunction<T, State<T, E>> {
  return pipe(
    map((data) => ({ data })),
    catchError((error) => of({ error })),
    startWith({ pending: true }),
    debounceTime(dueTime),
  );
}
