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
    max-width: 100%;
    padding-right: 8px;
    justify-content: space-around;
    gap: 10px;
    & > * {
    }   
`;
export const HeadColumn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
    overflow: auto;
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
    overflow-y: scroll;
    position: relative;
    & > * {
        min-height: 30px;
        max-height: 100px;
    }
`;
export const TRow = styled.div`
    display: flex;
    width: 100%;
    height: 30px;
    position: relative;
    border: 1px solid rgba(0,0,0,0.1);
    /* justify-content: space-around; */
    gap: 10px;
    overflow: auto;
    &:hover{
        border: 1px solid rgba(0,0,0,0.1);
        background-color: rgba(180,180,180, 1);
        z-index: 999;
        
    }
    & > * {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        height: auto;
        overflow: hidden;
        cursor: default;
    }
    
`;