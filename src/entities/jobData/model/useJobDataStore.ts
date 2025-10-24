import { create } from '../../../shared/store/store';
import type { FetchApiData, JobDataState } from '../../../shared/types/types';

export type State = JobDataState<FetchApiData[]>;

const initialState: State = {
  data: [],
  status: null,
  error: null,
};

export const useJobDataStore = create<State>('useJobDataStore', () => ({ ...initialState }));
