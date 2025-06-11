import styled from "styled-components";
import Select from "react-select";

export const StyledSelect = styled.select`
  display: ${({ display }) => display || "block"};
  width: 100%;
  height: 100%;
  max-height: 30px;
  text-align: center;
`;

export const StyledReactSelect = styled(Select)`
  .react-select__control {
    border: 2px solid #4caf50;
    box-shadow: none;
    &:hover {
      border-color: #388e3c;
    }
  }

  .react-select__menu {
    background-color: #f0f0f0;
  }

  .react-select__option--is-selected {
    background-color: #4caf50;
    color: white;
  }
`;
