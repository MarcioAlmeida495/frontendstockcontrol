import styled from "styled-components";

export const Div = styled.div`
    display: flex;
    width: ${({width}) => width || '80%'};
    height: 100vh;
    margin: 10px;
    flex-direction: column;
    align-items: center;
`