import { create } from 'zustand'

export type InitialState = {
  key1: string;
  [key: string]: any;
}

export type StoreState = {
  initialState: InitialState;
  updateValue: (key: string, newValue: any) => void;
}

export const useStore = create<StoreState>((set) => ({
  initialState: {
    key1: 'value1',
  },
  updateValue: (key: string, newValue: any) => {
    set((state) => {
      const newDict: InitialState = { ...state.initialState };
      newDict[key] = newValue;
      return { initialState: newDict };
    });
  },
}));

export default useStore;
