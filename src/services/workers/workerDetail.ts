import data from '../../assets/owid-co2-data.json';

interface IData {
  year: number;
  cement_co2: number;
  cumulative_cement_co2: number;
}

export interface ICountryDetail {
  iso_code: string;
  data: IData[];
}

self.onmessage = (event) => {
  const countryId = event.data;

  try {
    const countryData = Object.entries(data).find(
      (entry) => entry[1].iso_code === countryId
    );

    if (!countryData) {
      throw new Error(`Country with key ${countryId} not found`);
    }

    const [countryName, details] = countryData;

    self.postMessage({ name: countryName, ...details });
  } catch (error) {
    self.postMessage({ error: (error as Error).message });
  }
};
