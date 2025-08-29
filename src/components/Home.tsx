import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface ICountries {
  country: string;
  iso: string;
  population: number | 'N/a';
}

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [countries, setCountries] = useState<ICountries[] | null>(null);

  useEffect(() => {
    const worker = new Worker(
      new URL('../services/workers/worker.ts', import.meta.url),
      { type: 'module' }
    );

    worker.onmessage = (event) => {
      if (event.data.error) {
        console.log('Worker error: ', event.data.error);
      } else {
        setCountries(event.data);
      }
      setIsLoading(false);
    };

    worker.postMessage('start');

    return () => worker.terminate();
  }, []);

  const headers = countries ? Object.keys(countries[0]) : [];

  if (isLoading) return <p>Loading...</p>;

  return (
    <table className="table">
      <thead className="thead">
        <tr>
          {headers?.map((header) => (
            <th key={header} className="thead">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {countries?.map((country, i) => (
          <tr key={`${country.iso}-${i}`}>
            {Object.entries(country).map(([key, value]) => (
              <td key={key}>
                <Link to={`/details/${country.iso}-${i}`}>{value}</Link>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Home;
