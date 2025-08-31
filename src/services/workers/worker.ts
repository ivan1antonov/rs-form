import data from '../../assets/owid-co2-data.json';
import type { ICountries } from '../../types/types';

interface Info {
  iso_code: string;
  data: { year: string; population?: number }[];
}

self.onmessage = (event) => {
  const requestedYear = event.data;

  try {
    const countries: ICountries[] = Object.entries(data).map(
      ([country, info]) => {
        const { iso_code, data: countryData } = info as Info;

        const yearData =
          countryData.find((d) => d.year === requestedYear) ||
          countryData[countryData.length - 1];

        return {
          country,
          iso: iso_code ?? 'N/a',
          population: yearData?.population ?? 'N/a',
          year: requestedYear,
        };
      }
    );

    const allYears = (Object.values(data)[0] as Info).data.map((d) => d.year);

    self.postMessage({ countries, years: allYears });
  } catch (error) {
    self.postMessage({ error: (error as Error).message });
  }
};
