import type { SliceUserDataState } from '../../../shared/types/types';
import { useUserDataStore, type State } from './useUserDataStore';

export const setData = (payload: Partial<SliceUserDataState>): void => {
  useUserDataStore.setState((state: State) => ({
    ...state,
    ...payload,
  }));
};

export const resetErrors = (): void => {
  useUserDataStore.setState((state: State) => ({
    ...state,
    errors: null,
  }));
};
