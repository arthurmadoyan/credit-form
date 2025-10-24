import { type StateCreator, create as createBase } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type StateCreatorFn<T> = StateCreator<T, [['zustand/devtools', never], ['zustand/immer', never]]>;

export const create = <T>(storeName: string, stateCreatorFn: StateCreatorFn<T>) =>
  createBase<T>()(devtools(immer(stateCreatorFn), { store: storeName }));
