import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { ICountries } from '../types/types';

const Home = () => {
  const [selectedYear, setSelectedYear] = useState('2023');
  const [countries, setCountries] = useState<ICountries[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const worker = new Worker(
      new URL('../services/workers/worker.ts', import.meta.url),
      { type: 'module' }
    );

    worker.onmessage = (event) => {
      if (event.data.error) {
        console.error(event.data.error);
      } else {
        setCountries(event.data.countries);
        setYears(event.data.years);
      }
      setIsLoading(false);
    };

    worker.postMessage(selectedYear);

    return () => worker.terminate();
  }, [selectedYear]);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading) return <p>Loading...</p>;

  const headers = countries.length > 0 ? Object.keys(countries[0]) : [];

  const filteredCountries = countries.filter((country) =>
    country.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        <select value={selectedYear} onChange={handleYearChange}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search country..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginLeft: '1rem' }}
        />
      </div>

      <table className="table">
        <thead className="thead">
          <tr>
            {headers.map((header) => (
              <th key={header} className="thead">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredCountries.map((country, i) => (
            <tr key={`${country.iso}-${i}`}>
              {Object.entries(country).map(([key, value]) => (
                <td key={key}>
                  <Link to={`/details/${encodeURIComponent(value)}-${i}`}>
                    {value}
                  </Link>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
