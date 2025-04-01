import styled from "styled-components";

export const StyledSelect = styled.select`
    display: ${({display}) => display || 'block'};
    width: 100%;
    height: 30px;
    max-height: 30px;
    text-align: center;
`