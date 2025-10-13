import { create } from 'zustand'

export const useStore = create((set) => ({
  initialState: {
    key1: 'value1',
    pokemonsList: [],
  },
  updateValue: (key, newValue) => {
    set((state) => {
      const newDict = { ...state.initialState };
      newDict[key] = newValue;
      return { initialState: newDict };
    });
  },
}))
