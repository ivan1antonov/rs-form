import data from '../../assets/owid-co2-data.json';

self.onmessage = (event) => {
  const countryId = event.data;
  const [isoRaw, idxRaw] = countryId.split('-');

  const nameCountry = isoRaw.trim();
  const index = idxRaw !== undefined ? Number(idxRaw) : NaN;

  try {
    const entries = Object.entries(data);

    let countryData = isoRaw
      ? entries.find(([key]) => key?.trim() === nameCountry)
      : undefined;
    console.log(countryData);
    if (isoRaw === 'N/a') {
      countryData = entries[index];
    }

    if (!countryData) {
      const reason = isoRaw ? `iso=${isoRaw} not found` : 'iso not set';
      const idxInfo = Number.isInteger(index)
        ? `, index=${index}`
        : ', index=NaN';
      throw new Error(`Country not found: ${reason}${idxInfo}`);
    }

    const [countryName, details] = countryData;

    self.postMessage({ name: countryName, ...details });
  } catch (error) {
    self.postMessage({ error: (error as Error).message });
  }
};
