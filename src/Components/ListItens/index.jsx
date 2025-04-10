import { useEffect, useState } from "react"
import { dataFetch, formatInit } from "../../utils/functions";
import { TableDiv } from "../TableDiv";
import { useLocation, useNavigate } from "react-router-dom";
import { ItensForm } from "../Forms/ItensForm";
import { onNavigate, onSuccess } from "../../handles/handles";
import styled from "styled-components";
import { DinamicForm } from "../Forms/DinamicForm";

const Div = styled.div`
    box-sizing: border-box;
    height: 100%;
    overflow: auto;
    & > * {
        margin: 5px;
    }
`

export const ListItens = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return <Div>
        {/* <DinamicForm object={{nome : 'text', valor: 'number', teste : 'checkbox'}}/> */}
        {/* <ItensForm onSuccess={()=>onSuccess(navigate)}/> */}
        <TableDiv  onSuccess={()=>onNavigate(navigate, '/getitens')} key={location.key}/>
    </Div>
}