import styled from "styled-components";

export const StyledConfirmButton = styled.button`
  all: unset;
  box-sizing: border-box;
  color: white;
  height: ${({ height }) => height || "100%"};
  width: ${({ width }) => width || "100%"};
  background-color: rgb(154, 199, 250);
  margin: ${({ $margin }) => $margin || "0px"};
  max-height: 35px;
  text-align: center;
  text-transform: uppercase;
  transition: border-radius 200ms ease-in-out, font-weight 200ms ease-in-out,
    border 400ms ease-in-out;
  border-radius: 3px;
  box-shadow: 1px 1px 2px black;
  border: 1px solid rgba(0, 0, 0, 0);
  padding: 2px;
  &:hover {
    background-color: rgb(35, 109, 179);
    border-radius: 10px;
    cursor: pointer;
    color: white;
  }
`;

export const StyledCancelButton = styled(StyledConfirmButton)`
  background-color: rgba(255, 150, 150, 0.5);
  &:hover {
    background-color: #f55;
  }
`;
