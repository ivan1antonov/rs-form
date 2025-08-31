import type { ICountries } from '../types/types';

export function loadCountries(): Promise<ICountries[]> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('./workers/worker.ts', import.meta.url), {
      type: 'module',
    });

    worker.onmessage = (event) => {
      if (event.data.error) {
        reject(event.data.error);
      } else {
        resolve(event.data);
      }
      worker.terminate();
    };

    worker.postMessage('start');
  });
}
