import styled from "styled-components";
import { squareSize } from "./styledLeftMenu";

export const StyledContentBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    background-color: #ccc;
    width: calc(100% - ${squareSize});
    margin-left: ${squareSize};
    height: 100vh;
`