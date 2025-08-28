interface Info {
  iso_code: string;
  data: { year: string; population?: number }[];
}

interface ICountry {
  country: string;
  iso: string;
  population: number | 'N/a';
}

self.onmessage = async (event) => {
  const url = event.data;
  try {
    const response = await fetch(url);
    const json = await response.json();

    const result: ICountry[] = Object.entries(json).map(([country, info]) => {
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
