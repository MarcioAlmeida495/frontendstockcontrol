import { useState, useContext, createContext } from "react";

export const OrderContext = createContext();
export const useRefsContext = () => useContext(OrderContext);
export const Provider = ({ children, functions }) => {
  const [refs, setRefs] = useState([]);
  useState(() => {
    console.log(functions);
  }, [functions]);

  return (
    <OrderContext.Provider value={{ refs, setRefs, functions }}>
      {children}
    </OrderContext.Provider>
  );
};
