import type { SEX } from '../config/consts';

export interface SliceUserDataState {
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  sex: 'мужской' | 'женский' | null;
  job: string | null;
  address: string | null;
  loanAmount: number | null;
  loanTerm: number | null;
  errors: string | null;
}

export interface JobDataState<T> {
  data: T;
  status: string | null;
  error: string | null;
}

export interface FetchApiData {
  slug: string;
  name: string;
  url: string;
}
