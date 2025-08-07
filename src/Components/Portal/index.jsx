// Components/Portal.js
import { createPortal } from "react-dom";

export const Portal = ({ children }) => {
  if (typeof window === "undefined") return null;
  return createPortal(children, document.body);
};
