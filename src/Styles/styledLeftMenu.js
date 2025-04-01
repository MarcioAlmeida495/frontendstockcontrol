import styled, { keyframes } from "styled-components";
export const squareSize = '40px'

const animationLeftHide = keyframes`
    from{
        opacity: 1;
        width: 300px;
    }
    to{
        width: ${squareSize};
        & > *{
            width: 0px;
        }
    }
`
const animationLeftShow = keyframes`
    from{
        opacity: 1;
        width: ${squareSize};
    }
    to{
        height: 100vh;
        width: 300px;
        
    }
`
export const StyledLeftMenu = styled.div`
    float: left;
    display: flex;
    position: absolute;
    top: 0;
    z-index: 999;
    flex-direction: column;
    width: ${squareSize};
    height: ${squareSize};
    background: linear-gradient(90deg, #fff,#ccc,#aaa);
    border-right: rgba(0, 0, 0, 0.5) 1px solid;
    gap: 10px;
    padding-top: 10px;
    padding-left: 10px;
    overflow: hidden;
    transition: width 200ms ease-in-out, height 200ms ease-in-out;
    & > *{
        width: 0px;
        display: none;
    }
    &:hover{
        width: 250px;
        height: 100vh;
    }
    &:hover > * {
        display: block;
    }
`