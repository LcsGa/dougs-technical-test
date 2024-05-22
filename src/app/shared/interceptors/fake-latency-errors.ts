import { HttpInterceptorFn } from '@angular/common/http';
import { delay, identity, tap } from 'rxjs';

export function fakeLatencyErrors(config?: { delay?: number; errorRate?: number }): HttpInterceptorFn {
  const fakeDelay = <T>() => (config?.delay ? delay<T>(config.delay) : identity);

  const fakeError = <T>() => {
    const errorRate = config?.errorRate;
    if (errorRate) {
      if (errorRate < 0 || errorRate > 1) throw new Error('Error rate must be between 0 and 1');
      else
        return tap<T>(() => {
          if (Math.random() < errorRate) throw new Error('Fake random error');
        });
    } else return identity;
  };

  return (req, next) => (req.url.includes('api') ? next(req).pipe(fakeDelay(), fakeError()) : next(req));
}
