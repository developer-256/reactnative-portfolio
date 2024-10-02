import { create } from "zustand";

type WeatherStore = {
  searchInput: string;
  setInput: (value: string) => void;
};

export const useStore = create<WeatherStore>()((set) => ({
  searchInput: "",
  setInput: (value) => set({ searchInput: value }),
}));
