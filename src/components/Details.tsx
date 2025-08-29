import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import type { ICountryDetail } from '../services/workers/workerDetail';

interface IDetail extends ICountryDetail {
  name: string;
}

const Details = () => {
  const defaultId = 'AFG';
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [country, setCountry] = useState<IDetail | null>(null);
  const [visibleColumns, setVisibleColumns] = useState([
    'year',
    'population',
    'co2',
    'co2_per_capita',
  ]);

  useEffect(() => {
    const worker = new Worker(
      new URL('../services/workers/workerDetail.ts', import.meta.url),
      { type: 'module' }
    );

    worker.onmessage = (event) => {
      if (event.data.error) {
        console.log('Worker error: ', event.data.error);
      } else {
        setCountry(event.data);
      }
      setIsLoading(false);
    };

    worker.postMessage(id || defaultId);

    return () => worker.terminate();
  }, [id]);

  if (isLoading) return <>Loading...</>;
  if (!country) return <>No country found</>;

  return (
    <div className="results">
      <h2>{`${country.name}: ${country.iso_code}`}</h2>
      <button
        className="results_newColomn"
        onClick={() => setVisibleColumns((prev) => [...prev, 'asd'])}
      >
        {' '}
        Add new colomn
      </button>
      <thead>
        <tr>
          {visibleColumns.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {country.data
          .sort((a, b) => b.year - a.year)
          .map((item, index) => (
            <tr key={index}>
              {visibleColumns.map((col) => (
                <td key={col}>{item[col as keyof typeof item] ?? 'N/a'}</td>
              ))}
            </tr>
          ))}
      </tbody>
    </div>
  );
};

export default Details;
