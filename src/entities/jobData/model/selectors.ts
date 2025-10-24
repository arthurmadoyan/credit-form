import type { State } from './useJobDataStore';

export const jobsSelectors = (state: State) => state.data;
export const statusSelector = (state: State) => state.status;
export const errorSelector = (state: State) => state.error;
