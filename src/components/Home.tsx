import { useEffect, useState } from 'react';

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
      new URL('../services/worker.ts', import.meta.url)
    );

    worker.onmessage = (event) => {
      if (event.data.error) {
        console.log('Worker error: ', event.data.error);
      } else {
        setCountries(event.data);
      }
      setIsLoading(false);
    };

    worker.postMessage(
      new URL('../assets/owid-co2-data.json', import.meta.url).href
    );

    return () => worker.terminate();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <table className="table">
      <thead className="thead">
        <tr>
          <th className="thead thead_country">Country</th>
          <th className="thead thead_population">Population</th>
          <th className="thead thead_iso">ISO code</th>
        </tr>
      </thead>
      <tbody>
        {countries?.map(({ country, population, iso }: ICountries, i) => (
          <tr key={`${country}${i}`}>
            <td>{country}</td>
            <td>{population}</td>
            <td>{iso}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Home;
