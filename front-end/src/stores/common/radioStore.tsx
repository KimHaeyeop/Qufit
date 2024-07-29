import { create } from 'zustand';

interface State {
    value: string;
}

interface Action {
    setValue: (value: string) => void;
}
const useRadioStore = create<State & Action>((set) => ({
    value: '',

    setValue: (value) => set({ value: value }),
}));

export const useRadioValueStore = () => useRadioStore((state) => state.value);
export const useRadioSetValueStore = () => useRadioStore((state) => state.setValue);
