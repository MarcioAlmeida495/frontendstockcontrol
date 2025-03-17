import { useEffect, useRef, useState } from "react"
import { dataFetch, formatInit } from "../../utils/functions";
import { getItens } from "../../utils/getURLs";
import styled from "styled-components";
import { StyledInput } from "../../Styles/styledInput";
import { ItemDiv } from "../TableDiv/ItemDiv"
import { DinamicForm } from "../Forms/DinamicForm";

const Div = styled.div`
    height: 100vh;
    width: 80%;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
`

const StyledTableDiv = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    align-items: center;
    height: calc(100% - 100px);
    overflow: auto;
    border-radius: 5px;
    width: 100%;
    border-radius: 3px;
    & > div{
        height: 50px;
        min-height: 50px;
    }
`
export const StyledItemDiv = styled.div`
    border-radius: 10px;
    display: flex;
    background-color: #999;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 100%;
    &:hover{
        background-color: rgba(0,0,0,0.1);
    }
    & > * {
        height: 100%;
        display: flex;
        justify-content: center;
        border-right: 1px solid #aaa;
        border-left: 1px solid #aaa;
        align-items: center;
        text-align: center;
        width: ${(props) => props.width || 'auto'};
        cursor: default;
    }
`;

const StyledHead = styled(StyledItemDiv)`
    font-weight: bold;
    color: white;
    background-color: #aaa;
    &:hover{
        background-color: #ccc;
    }
`
const getClientsUrl = 'clients/getclients';

export const ListClients = () => {
    const [clients, setClients] = useState([]);
    useEffect(()=>{
        dataFetch({simpleurl: getClientsUrl}).then(r=>{setClients(r)});
    },[]);

    return <Div><h1>Lista de Clientes</h1>
        <DinamicForm object={{nome: '', email: '', telefone: ''}}/>
        {clients.length > 0 && <>
            <StyledHead width={`${100/(Object.keys(clients[0]).length+1)}%`}>
            {Object.keys(clients[0]).map((key, index)=>{
                return <div key={index}>{key.toUpperCase()}</div>
            })}
            <div>FUNÇOES</div>
        </StyledHead>
        <StyledTableDiv>

            {clients.map((client, index) => {
                return <ItemDiv width={'20%'} item={client} key={index} />
            })}
            </StyledTableDiv>
        </>
        }
    </Div>
}