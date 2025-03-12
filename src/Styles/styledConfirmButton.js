import styled from 'styled-components';

export const StyledConfirmButton = styled.button`
    all: unset;
    color: white;
    height: 80%;
    width: 50%;
    background-color: rgba(255,255,255,0.2);
    text-align: center;
    text-justify: center;
    transition: border-radius 200ms ease-in-out;
    
    &:hover{
        background-color: #555;
        border-radius: 10px;
    }

`

export const StyledCancelButton = styled(StyledConfirmButton)`
    background-color: rgba(255,150,150,0.5);
    &:hover{
        background-color: #f55;
    }
`