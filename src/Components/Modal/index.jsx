import styled from "styled-components";

const Overlay = styled.div.attrs(() => ({}))`
  ${({ $show }) => `
    display: ${$show ? 'flex' : 'none'};
  `}
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;


const ModalContent = styled.div`
  background: rgba(255,255,255, 1);
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  min-width: 800px;
  max-width: 80%;
  height: 80%;
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

export const Modal = ({ show, onClose, children }) => {
  return (
    <Overlay $show={show} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {children}
      </ModalContent>
    </Overlay>
  );
};