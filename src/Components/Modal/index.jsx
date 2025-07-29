import { createContext } from "react";
import styled from "styled-components";

const Overlay = styled.div.attrs(() => ({}))`
  ${({ $show }) => `
    display: ${$show ? "flex" : "none"};
  `}
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background: rgba(255, 255, 255, 1);
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 0px 300px rgba(0, 0, 0, 1);
  min-width: 800px;
  max-width: 80%;
  width: ${({ $width }) => $width || "80%"};
  height: 90dvh;
  overflow: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const Context = createContext();

export const Provider = ({ children, value }) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const Modal = ({ show = true, onClose, children, width = "100%" }) => {
  return (
    <Provider value={onClose}>
      <Overlay $show={show} onClick={onClose}>
        <ModalContent $width={width} onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          {children}
        </ModalContent>
      </Overlay>
    </Provider>
  );
};
