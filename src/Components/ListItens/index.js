import { useEffect, useState } from "react"
import { dataFetch, formatInit } from "../../utils/functions";
import { TableDiv } from "../TableDiv";
import { useLocation, useNavigate } from "react-router-dom";
import { ItensForm } from "../Forms/ItensForm";
import { onSuccess } from "../../handles/handles";
import styled from "styled-components";
import { DinamicForm } from "../Forms/DinamicForm";

const Div = styled.div`
    box-sizing: border-box;
    padding: 10px;
    & > * {
        margin: 5px;
    }
`

export const ListItens = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return <Div>
        {/* <DinamicForm object={{nome : 'text', valor: 'number', teste : 'checkbox'}}/> */}
        <ItensForm onSuccess={()=>onSuccess(navigate)}/>
        <TableDiv key={location.key}/>
    </Div>
}