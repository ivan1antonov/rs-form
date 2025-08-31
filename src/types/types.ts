export interface FormData {
  id: string;
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  country: string;
  acceptTerms: boolean;
  pictureBase64: string;
}

export interface ICountries {
  country: string;
  iso: string;
  population: number | 'N/a';
  year: string;
}

interface IData {
  year: number;
  cement_co2: number;
  cumulative_cement_co2: number;
}

export interface ICountryDetail {
  iso_code: string;
  data: IData[];
}

export interface IDetail extends ICountryDetail {
  name: string;
}
