import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledClientLink = styled(Link)`
    all: unset;
    transition: color 1s linear forwards, opacity 2s linear;
    display: flex;
    position: relative;
    color: ${({$color}) => $color || 'black'};
    background-color: #222;
    justify-content: center;
    align-items: center;
    padding: 8px;
    &:hover{
        cursor: pointer;
        background-color: #333;
    }
    
`