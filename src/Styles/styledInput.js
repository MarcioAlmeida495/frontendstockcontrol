import styled from "styled-components";

export const StyledInput = styled.input`
  all: unset;
  box-sizing: border-box;
  height: 100%;
  max-height: 40px;
  padding: 5px;
  background-color: white;
  border: 2px solid rgb(182, 178, 236);
  border-bottom: 2px solid rgb(133, 210, 255);
  border-radius: 3px;
  text-align: center;
  width: ${({ $width }) => $width || "auto"};
  transition: all 200ms ease;
  &:focus {
    border: 2px solid rgb(41, 103, 184);
  }
`;
