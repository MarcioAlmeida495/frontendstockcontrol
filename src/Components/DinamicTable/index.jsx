import styled from "styled-components";
import { DinamicForm } from "../Forms/DinamicForm";
import { StyledCancelButton, StyledConfirmButton } from "../../Styles/styledConfirmButton";
import { TrowComponent } from "./TrowComponent";
import { DinamicFormReturnData } from "../Forms/DinamicFormRerturnData";
import { useLocation, useNavigate } from "react-router-dom";
import { onNavigate, onSuccess } from "../../handles/handles";
import { StyledInput } from "../../Styles/styledInput";

const { useEffect, useState } = require("react");
const { dataFetch, formatInit, orderByKey } = require("../../utils/functions");
const { Head, HeadColumn, TBody, Table } = require("./styles");
const Div = styled.div`
    display: flex;
    width: 80%;
    height: 100vh;
    flex-direction: column;
    align-items: center;
`
const DivLabel = styled.div`
    width: 80%;
    display: flex;
    flex-direction: row;

    height: 35px;
`



export const DinamicTable = ({rowNames = [], object = {}, crudUrls = {}, allowEdit = false}) => {
    const [data, setData] = useState([]);
    const location = useLocation();
    const [key, setKey] = useState(0);
    const [orderBy, setOrderBy] = useState('id');
    const [search, setSearch] = useState('');

    useEffect(()=>{
        if(crudUrls) dataFetch({ simpleurl: crudUrls.r }).then(r=>{setData(r)});
    },[key, crudUrls])

    useEffect(()=>{
        setData((d) => orderByKey(d, orderBy))
    }, [orderBy])

    return <Div key={key}>
            <DinamicFormReturnData margin={'10px'} width={'80%'} height={'30px'} onSubmit={(values)=>{dataFetch({simpleurl: crudUrls.c, init: formatInit({data: values})}).then(r=>{window.alert(r);setKey(key+1)})}} object={object}/>
            <DivLabel>
                <StyledInput value={search} onChange={(e)=>{setSearch(e.target.value)}} placeholder="PESQUISE PELO NOME" width={'80%'}/>
                <StyledConfirmButton>Pesquisar</StyledConfirmButton>
            </DivLabel>
        <Table >
            {data.length > 0 && <>
            <Head>
                {Object.keys(data[0]).map((key, index) => {
                    return <HeadColumn onClick={()=>{setOrderBy(key)}} key={index} >{key.toUpperCase()}</HeadColumn>
                })}
                {allowEdit && <HeadColumn>FUNÇÕES</HeadColumn>}
            </Head>
            <TBody key={location.key}>
                {data.map((each, index) => {
                    if(each.nome.toUpperCase().includes(search.toUpperCase())) 
                        return  <TrowComponent row={each} width={'80%'} key={index} reset={()=>setKey(key+1)} allowEdit={true} crudUrls={crudUrls}/>
                    else return null
                })}
            </TBody>
            </>}
        </Table>
    </Div> 
}