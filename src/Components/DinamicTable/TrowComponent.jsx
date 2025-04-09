import { useState } from "react";
import { StyledCancelButton, StyledConfirmButton } from "../../Styles/styledConfirmButton";
import { TRow } from "./styles";
import { dataFetch, formatInit } from "../../utils/functions";
import { DinamicForm } from "../Forms/DinamicForm";
import { DinamicFormReturnData } from "../Forms/DinamicFormRerturnData";
import { Modal } from "../Modal";

export const TrowComponent = ({row = {}, rowNames = [], allowEdit = false, onSubmit = () => {}, crudUrls = {}, width = '100%', reset = () => {}, onClickInaRow = () => {}})=>{
    const [editing, setEditing] = useState();
    const [info, setInfo] = useState('');
    const [show, setShow] = useState(false);

    return <>
    <Modal show={show} onClose={()=>{setShow(false)}} children={info}/>
    <TRow onClick={()=>{console.log(row); onClickInaRow(row)}}> 
        {editing ?
            <DinamicFormReturnData margin={'0px'} width='100%'  onSubmit={(values)=>{dataFetch({simpleurl: crudUrls.u, init: formatInit({data: values})}).then(r=>{if(r) reset()})}} onCancel={()=>{setEditing(false)}} object={row}/>
            :
            Object.values(row).map((each, index) => {
                return <div key={index} >{each}</div>
            })
        }
        {allowEdit && <>
            {!editing ? 
                <div>
                    <StyledConfirmButton onClick={()=>{setEditing(true)}}>Editar</StyledConfirmButton>
                    <StyledCancelButton onClick={()=>{dataFetch({simpleurl: crudUrls.d, init: formatInit({data: row})}).then(r=>reset())}}>Excluir</StyledCancelButton>
                </div>
                : 
                <>
                    {/* <StyledConfirmButton onClick={()=>{setEditing(true)}}>Confirmar</StyledConfirmButton>
                    <StyledCancelButton onClick={()=>{setEditing(false)}}>Cancelar</StyledCancelButton> */}
                </>
            }
        </>
        }
    </TRow>
        </> 
}   