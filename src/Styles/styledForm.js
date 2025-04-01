import styled from "styled-components";
export const StyledForm = styled.form`
    display: flex;
    box-sizing: border-box;
    margin: ${({ margin }) => margin || '10px'};
    flex-direction: ${({ $flexdirection }) => $flexdirection || 'row'};
    width: ${({ width }) => width || '98%'};
    max-width: ${({ width }) => width || '100%'};
    margin-inline: auto;
    align-items: center;
    justify-content: space-between;
    height: ${({ height }) => height || '35px'};
    gap: 1px;

    & > * {
        flex: 1;
        margin: 0;  // Isso ajuda a garantir que as margens internas não quebrem o layout
    }
`;
