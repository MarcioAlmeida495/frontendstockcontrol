import styled from "styled-components";



export const Table = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 80%;
`;
export const Head = styled.div`
    display: flex;
    width: 100%;
    & > * {
        flex: 1;
    }   
`;
export const HeadColumn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
    &:hover{
        background-color: rgba(0,0,0,0.2);
        color: white;
        cursor: pointer;
    }
`
export const TBody = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: auto;
    & > * {
        min-height: 30px;
        max-height: 50px;
    }
`;
export const TRow = styled.div`
    display: flex;
    width: 100%;
    height: 30px;
    border: 1px solid rgba(0,0,0,0.1);
    &:hover{
    border: 1px solid rgba(0,0,0,0.1);
    background-color: rgba(0,0,0,0.1);
    }
    & > * {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        flex: 1;
        height: auto;
        overflow: hidden;
        cursor: default;
    }
`;