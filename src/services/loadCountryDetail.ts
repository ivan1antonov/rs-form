import type { IDetail } from '../types/types';

export function loadCountryDetail(id: string): Promise<IDetail> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      new URL('./workers/workerDetail.ts', import.meta.url),
      { type: 'module' }
    );

    worker.onmessage = (event) => {
      if (event.data.error) {
        reject(event.data.error);
      } else {
        resolve(event.data as IDetail);
      }
      worker.terminate();
    };

    worker.postMessage(id);
  });
}
