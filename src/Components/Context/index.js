import { createContext } from "react";

export const Context = createContext();

export const MyContext = ({ children, functions }) => {
  return <Context.Provider value={functions}>{children}</Context.Provider>;
};
