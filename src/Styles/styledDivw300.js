import styled from "styled-components";

export const DivW300 = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 10px;
  width: auto;
  background-color: rgba(255, 255, 255, 0.5);
  transition: all 100ms ease;
  min-width: ${({ $minWidth }) => $minWidth || ""};
`;
