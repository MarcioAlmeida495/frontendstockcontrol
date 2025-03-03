import styled from "styled-components";

export const StyledTable = styled.table`
    width: 80%;
    border-spacing: 5px;
    text-align: left;
    font-family: Arial, sans-serif;
    border-collapse: collapse;

    & thead > tr > th {
        background-color: #f4f4f4;
        border: rgba(0,0,0,0.1) solid 1px;
    }
    & tbody > tr:hover {
        background-color:  rgba(0,100,0,0.1);
    }

    & thead > tr > th {
        padding: 10px;
    }

    & tbody > tr > td {
        border: 1px solid rgba(0,100,0,0.1);
        padding: 10px;
        align-items: center;
        background-color: rgba(255,255,255,0.2);
        justify-content: center;
    }
    & tbody > tr > td > input{
        margin: auto;
    }
`;
