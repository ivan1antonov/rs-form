import data from '../../assets/owid-co2-data.json';

interface Info {
  iso_code: string;
  data: { year: string; population?: number }[];
}

interface ICountry {
  country: string;
  iso: string;
  population: number | 'N/a';
}

self.onmessage = () => {
  try {
    const result: ICountry[] = Object.entries(data).map(([country, info]) => {
      const { iso_code, data } = info as Info;
      return {
        country,
        iso: iso_code ?? 'N/a',
        population: data?.[data.length - 1]?.population ?? 'N/a',
      };
    });

    self.postMessage(result);
  } catch (error) {
    self.postMessage({ error: (error as Error).message });
  }
};
