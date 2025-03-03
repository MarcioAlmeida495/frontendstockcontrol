import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledLink = styled(Link)`
    all: unset;
    color: #111;
    transition: color 1s linear forwards;
    display: flex;
    position: relative;

    &:hover{
        color: #444;
        cursor: pointer;
    }
    &::before{
        content: '';
        display: block;
        position: absolute;
        height: 100%;
        width: 0%;
        border-bottom: 2px solid black;
        transition: width 200ms linear;
    }
    &:hover::before{
        width: 80%;
    }
`