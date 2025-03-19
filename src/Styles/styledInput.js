import styled from "styled-components"

export const StyledInput = styled.input`
    all: unset;
    box-sizing: border-box;
    height: 100%;
    max-height: 30px;
    padding: 5px;
    background-color: white;
    border: 1px solid rgba(0,0,0,0);
    border-radius: 3px;
    text-align: center;
    width: ${(props) => props.width || 'auto'};
    &:focus{
        border-bottom: 1px solid black;
    }
`