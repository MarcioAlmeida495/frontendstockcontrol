import styled from "styled-components"
export const StyledFlexRow = styled.div`
    display: flex;
    flex-direction: row;
    width: ${({width}) => width || 'auto'};
    height: 100%;
    height: 30px;
    & > * {
        flex: 1;
    }
`