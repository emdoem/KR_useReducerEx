import React from "react";

export const ReducerContext = React.createContext({
  cart: null,
  onDispatch: () => {}
});
