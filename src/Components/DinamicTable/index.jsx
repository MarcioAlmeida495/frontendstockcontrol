import styled from "styled-components";
import { DinamicForm } from "../Forms/DinamicForm";
import { StyledCancelButton, StyledConfirmButton } from "../../Styles/styledConfirmButton";
import { TrowComponent } from "./TrowComponent";
import { DinamicFormReturnData } from "../Forms/DinamicFormRerturnData";
import { useLocation, useNavigate } from "react-router-dom";
import { onNavigate, onSuccess } from "../../handles/handles";

const { useEffect, useState } = require("react");
const { dataFetch, formatInit } = require("../../utils/functions");
const { Head, HeadColumn, TBody, Table } = require("./styles");
const Div = styled.div`
    display: flex;
    width: 80%;
    height: 100vh;
    flex-direction: column;
    align-items: center;
`

export const DinamicTable = ({rowNames = [], object = {}, crudUrls = {}, allowEdit = false}) => {
    const [data, setData] = useState([]);
    const location = useLocation();
    const [key, setKey] = useState(0);
    useEffect(()=>{
        if(crudUrls) dataFetch({ simpleurl: crudUrls.r }).then(r=>{setData(r)});
    },[key, crudUrls])

    return <Div key={key}>
        <DinamicFormReturnData margin={'10px'} width={'80%'} height={'30px'} onSubmit={(values)=>{dataFetch({simpleurl: crudUrls.c, init: formatInit({data: values})}).then(r=>{window.alert(r);setKey(key+1)})}} object={object}/>
        <Table >
            {data.length > 0 && <>
            <Head>
                {Object.keys(data[0]).map((key, index) => {
                    return <HeadColumn key={index} >{key.toUpperCase()}</HeadColumn>
                })}
                {allowEdit && <HeadColumn>FUNÇÕES</HeadColumn>}
            </Head>
            <TBody key={location.key}>
                {data.map((each, index) => {
                    return <TrowComponent row={each} width={'80%'} key={index} reset={()=>setKey(key+1)} allowEdit={true} crudUrls={crudUrls}/>
                })}
            </TBody>
            </>}
        </Table>
    </Div> 
}