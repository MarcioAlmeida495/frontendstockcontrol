import { useState } from "react";
import { StyledCancelButton, StyledConfirmButton } from "../../Styles/styledConfirmButton";
import { TRow } from "./styles";
import { dataFetch, formatInit } from "../../utils/functions";
import { DinamicForm } from "../Forms/DinamicForm";
import { DinamicFormReturnData } from "../Forms/DinamicFormRerturnData";

export const TrowComponent = ({row = {}, rowNames = [], allowEdit = false, onSubmit = () => {}, crudUrls = {}, width = '100%', reset = () => {}})=>{
    const [editing, setEditing] = useState();

    return <TRow> 
        {editing ?
            <DinamicFormReturnData margin={'0px'} width='50%'  onSubmit={(values)=>{dataFetch({simpleurl: crudUrls.u, init: formatInit({data: values})}).then(r=>{if(r) reset()})}} onCancel={()=>{setEditing(false)}} object={row}/>
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
}   