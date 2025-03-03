import styled from "styled-components"

export const StyledInput = styled.input`
    all: unset;
    box-sizing: border-box;
    padding: 5px;
    background-color: white;
    border-bottom: 1px solid white;
    text-align: center;
    width: ${(props) => props.width || 'auto'};
    &:focus{
        border-bottom: 1px solid black;
    }
`