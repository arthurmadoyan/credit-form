import { create } from '../../../shared/store/store';
import type { SliceUserDataState } from '../../../shared/types/types';

export type State = SliceUserDataState;

const initialState: State = {
  firstName: null,
  lastName: null,
  phone: null,
  sex: null,
  job: null,
  address: null,
  loanAmount: null,
  loanTerm: null,
  errors: null,
};

export const useUserDataStore = create<State>('useUserDataStore', () => ({ ...initialState }));
