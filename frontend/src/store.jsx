import create from 'zustand';

export const useStore = create((set) => ({
  username: undefined,
  setUsername(res) {
    set(() => ({ username: res }));
  },
}));
