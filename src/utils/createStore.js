import { useSyncExternalStore } from "react";

const createStoreImp = (initialState = {}) => {
  const listeners = new Set();

  let state =
    typeof initialState === "function" ? initialState(setState) : initialState;

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  const getState = () => {
    return state;
  };

  function setState(nextState) {
    const processedNextState =
      typeof nextState === "function" ? nextState(state) : nextState;
    state = { ...state, ...processedNextState };
    emitChange();
  }

  function emitChange() {
    for (let listener of listeners) {
      listener();
    }
  }

  return { subscribe, setState, getState };
};

export const createStore = (initialState) => {
  const { getState, subscribe } = createStoreImp(initialState);

  return (selector) => {
    if (selector != null && typeof selector !== "function") {
      throw new Error("Selector must be a function");
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const state = useSyncExternalStore(subscribe, getState);

    return selector ? selector(state) : state;
  };
};
