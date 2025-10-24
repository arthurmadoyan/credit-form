import type { State } from './useUserDataStore';

export const userDataSelector = (state: State) => state;
export const userErrorsSelector = (state: State) => state.errors;
