import { useState, useMemo, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { wrapPromise } from '../utils/wrapPromise';
import { loadCountryDetail } from '../services/loadCountryDetail';
import type { IDetail } from '../types/types';

const DetailsContent = ({
  resource,
}: {
  resource: ReturnType<typeof wrapPromise<IDetail>>;
}) => {
  const country = resource.read();

  const [visibleColumns, setVisibleColumns] = useState([
    'year',
    'population',
    'co2',
    'co2_per_capita',
  ]);

  return (
    <div className="results">
      <h2>{`${country.name}: ${country.iso_code ?? 'N/a'}`}</h2>
      <button
        className="results_newColomn"
        onClick={() => setVisibleColumns((prev) => [...prev, 'asd'])}
      >
        Add new column
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

export default function Details() {
  const defaultId = 'Afghanistan';
  const { id } = useParams<{ id: string }>();
  const rawId = id ? decodeURIComponent(id) : defaultId;

  const resource = useMemo(
    () => wrapPromise(loadCountryDetail(rawId)),
    [rawId]
  );

  return (
    <Suspense fallback={<p>Loading details...</p>}>
      <DetailsContent resource={resource} />
    </Suspense>
  );
}
