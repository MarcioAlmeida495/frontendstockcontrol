import { useState } from "react"
import { StyledItemDiv } from "."
import { ItensForm } from "../Forms/ItensForm";
import { UpdateItemsForm } from "../Forms/UpdateItemsForm";
import { useNavigate } from 'react-router-dom';
import { onSuccess } from "../../handles/handles";
import { StyledConfirmButton } from "../../Styles/styledConfirmButton";

export const ItemDiv = ({item, width}) => {
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    if(item){

        if(!isEditing) return <StyledItemDiv width={width}>
        {Object.values(item).map((value, index) => {
            return <div key={index}>
                {value}
            </div>
        })}
        <div>
        <StyledConfirmButton onClick={()=>setIsEditing(!isEditing)}>Editar</StyledConfirmButton>
        <button>Excluir</button>
        </div>
    </StyledItemDiv>
    else return <>
        <UpdateItemsForm inputsWidth={'100%'} item={item} onSuccess={()=>{onSuccess(navigate)}}  onCancel={()=>{setIsEditing(!isEditing)}}/>
    </>
    }
    return <></>
}