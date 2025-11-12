import { create } from 'zustand'

type StateShape = {
  initialState: Record<string, string>
  updateValue: (key: string, newValue: string) => void
}

export const useStore = create<StateShape>((set) => ({
  initialState: {
    key1: 'value1',
  },
  updateValue: (key: string, newValue: string) => {
    set((state) => {
      const newDict = { ...state.initialState };
      newDict[key] = newValue;
      return { initialState: newDict };
    });
  },
}))
