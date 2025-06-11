import styled from "styled-components";

export const StyledConfirmButton = styled.button`
  all: unset;
  box-sizing: border-box;
  color: white;
  height: ${({ height }) => height || "100%"};
  width: ${({ width }) => width || "100%"};
  margin: ${({ $margin }) => $margin || "0px"};
  max-height: 35px;
  text-align: center;
  text-transform: uppercase;
  transition: all 200ms ease, border-radius 200ms ease-in-out,
    font-weight 200ms ease-in-out, border 400ms ease-in-out;
  border-radius: 3px;
  box-shadow: 1px 1px 2px black;
  border: 1px solid rgba(0, 0, 0, 0);
  background-color: rgb(35, 109, 179);
  padding: 2px;
  &:hover {
    background-color: rgb(82, 98, 117);
    border-radius: 10px;
    cursor: pointer;
    color: white;
  }
`;

export const StyledCancelButton = styled(StyledConfirmButton)`
  background-color: #f55;
  &:hover {
    background-color: rgb(143, 70, 70);
  }
`;
