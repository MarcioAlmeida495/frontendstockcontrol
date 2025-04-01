import styled from 'styled-components';

export const StyledConfirmButton = styled.button`
    all: unset;
    color: white;
    height: ${({height})=> height || '80%'};
    width: ${({width}) => width || '50%'};
    background-color: rgba(115,115,115,1);
    border: 1px solid rgba(0,0,0,0);
    margin: ${({margin}) => margin || '0px'};
    text-align: center;
    text-justify: center;
    transition: border-radius 200ms ease-in-out, font-weight 200ms ease-in-out, border 400ms ease-in-out;
    border-radius: 2px;
    &:hover{
        background-color: #555;
        border: 1px white solid;
        border-radius: 10px;
        cursor: pointer;
        color: white;
        font-weight: bolder;
    }

`

export const StyledCancelButton = styled(StyledConfirmButton)`
    background-color: rgba(255,150,150,0.5);
    &:hover{
        background-color: #f55;
    }
`