import create from 'zustand';

const useStore = create((set) => ({
  token: '',
  dd(e) {
    set(() => ({ token: e }));
  },
}));

function store() {
  //const { token, dd } = useStore();
  // useStore.setState({ token: { code } });
  // dd(code);
}

export default store;
