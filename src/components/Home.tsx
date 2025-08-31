import { Link } from 'react-router-dom';
import { Suspense } from 'react';
import { wrapPromise } from '../utils/wrapPromise';
import { loadCountries } from '../services/loadCountries';

import type { ICountries } from '../types/types';

const resource = wrapPromise(loadCountries());

const CountriesTable = () => {
  const countries = resource.read() as ICountries[];
  const headers = Object.keys(countries[0]);

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
                <Link to={`/details/${encodeURIComponent(value)}-${i}`}>
                  {value}
                </Link>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function Home() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CountriesTable />
    </Suspense>
  );
}
