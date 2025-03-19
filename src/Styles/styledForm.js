import styled from "styled-components";

export const StyledForm = styled.form`
    display: flex;
    box-sizing: border-box;
    margin: ${({margin}) => margin || '10px'};
    height: 20px;
    flex-direction: ${({$flexdirection}) => $flexdirection || 'row'};
    width: 98%;
    width: ${({width}) => width || '98%'};
    margin-inline: auto;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    max-height: 40px;
    height: ${({height}) => height || ''};
    gap: 1px;
    & > * {
        flex: 1;
    }
`