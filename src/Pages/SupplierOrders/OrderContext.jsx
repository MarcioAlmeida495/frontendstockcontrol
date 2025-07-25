import { createContext, useContext } from "react";

const MyContext = createContext();

export const Provider = ({ children, value }) => {
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export const useMyContext = () => {
  return useContext(MyContext);
};
