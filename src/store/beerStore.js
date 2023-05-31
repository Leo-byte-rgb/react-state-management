import { createStore } from "../utils/createStore";

export const useBeerStore = createStore((set) => ({
  beers: 0,
  incrementBeers: () =>
    set((state) => ({
      beers: state.beers + 1,
    })),
}));
