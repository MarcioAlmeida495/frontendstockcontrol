import styled from "styled-components";

export const Div = styled.div`
    display: flex;
    box-sizing: border-box;
    width: ${({width}) => width || '80%'};
    height: 100vh;
    margin: 10px;
    flex-direction: column;
    align-items: center;
    max-height: 90vh;
    padding: 10px;
    gap: 10px;
    resize: both;

    & > *{
        margin: 0px;
    }
`