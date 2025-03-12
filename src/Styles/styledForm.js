import styled from "styled-components";

export const StyledForm = styled.form`
    display: flex;
    box-sizing: border-box;
    height: 35px;
    flex-direction: ${({$flexdirection}) => $flexdirection || 'row'};
    width: 99%;
    margin-inline: auto;
    align-items: center;
    justify-content: space-between;
    height: 45px;
    gap: 1px;
`