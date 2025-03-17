import styled from "styled-components";
import { DinamicForm } from "../Forms/DinamicForm";
import { StyledCancelButton, StyledConfirmButton } from "../../Styles/styledConfirmButton";

const { useEffect, useState } = require("react");
const { dataFetch } = require("../../utils/functions");
const { Head, HeadColumn, TBody, TRow, Table } = require("./styles");
const Div = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    align-items: center;
`

export const DinamicTable = ({object = {}, crudUrls = {}, allowEdit = false}) => {
    const [data, setData] = useState([]);

    useEffect(()=>{
        if(crudUrls) dataFetch({ simpleurl: crudUrls.r }).then(r=>{setData(r)});
    },[])

    return <Div>
        <DinamicForm width={'80%'}  object={object}/>
        <Table>
            {data.length > 0 && <>
            <Head>
                {Object.keys(data[0]).map((key, index) => {
                    return <HeadColumn key={index} >{key}</HeadColumn>
                })}
                {allowEdit && <HeadColumn>Funçoes</HeadColumn>}
            </Head>
            <TBody>
                {data.map((each, index) => {
                    return <TRow key={index}> 
                        {Object.values(each).map((each, index) => {
                            return <div key={index} >{each}</div>
                        })}
                        {allowEdit && <div>
                            <StyledConfirmButton >editar</StyledConfirmButton>
                            <StyledCancelButton >excluir</StyledCancelButton>
                        </div>}
                    </TRow>
                })}
            </TBody>
            </>}
        </Table>
    </Div> 
}