import styled, { keyframes } from "styled-components";

const growHeight = keyframes`
    from{
        height: 50px;
    }
    to{
        height: 100px
    }
`;

export const StyledTopMenu = styled.div`
    display: flex;
    background-color: black;
    width: 100%;
    height: 50px;
    color: white;
    gap: 10px;
    justify-content: left;
    padding-left: 10px;
    align-items: center;
    & > *{
        all: unset;

        &:hover{
           cursor : pointer;
           color: #ccc;
        }
    }
`