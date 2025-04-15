import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledLink = styled(Link)`
    all: unset;
    color: #444;
    transition: color 1s linear forwards, opacity 2s linear;
    display: flex;
    position: relative;
    color: ${({$color}) => $color || 'black'};
    
    &::before{
        content: '';
        display: block;
        position: absolute;
        height: 100%;
        width: 0%;
        border-bottom: 2px solid ${({$color}) => ($color === 'white' ? '#ccc' : '#222')};
        transition: width 200ms linear;
    }
    &:hover::before{
        width: 80%;
    }
    &.active{
        color: ${({$color}) => ($color === 'white' ? '#ccc' : '#222')};
        &::before{
        width: 80%;
    }
    }
    &.lowopacity{
            opacity: 0.5;
    }&:hover{
        color: ${({$color}) => ($color === 'white' ? '#ccc' : '#222')};
        cursor: pointer;
        opacity: 1;
    }
`