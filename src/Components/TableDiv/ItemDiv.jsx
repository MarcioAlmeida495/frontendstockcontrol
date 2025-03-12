import { useEffect, useState } from "react"
import { StyledItemDiv } from "."
import { ItensForm } from "../Forms/ItensForm";
import { UpdateItemsForm } from "../Forms/UpdateItemsForm";
import { useNavigate } from 'react-router-dom';
import { onSuccess } from "../../handles/handles";
import { StyledCancelButton, StyledConfirmButton } from "../../Styles/styledConfirmButton";
import { dataFetch, formatInit } from "../../utils/functions";

export const ItemDiv = ({item, width}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    const navigate = useNavigate();


    //USADO PARA EXCLUIR O ITEM.
    useEffect(()=>{
        if(confirmation){
            dataFetch({simpleurl: 'items/deleteitem', init: formatInit({data: {id: item.id}})}).then(r=>{
                if(r){
                    onSuccess(navigate);
                }
                else window.alert('ocorreu um erro inesperado');
            })

            setConfirmation(false);
        }
    },[confirmation, item.id, navigate])

    if(item){

        if(!isEditing) return <StyledItemDiv width={width}>
            <div>
                {item.id}
            </div>
            <div>
                {item.nome}
            </div>
            <div>
                {item.quantidade}
            </div>
            <div>
                {parseFloat(item.preco).toFixed(2)}
            </div>
        {/* {Object.values(item).map((value, index) => {
            return <div key={index}>
                {value}
            </div>
        })} */}
        <div>
        <StyledConfirmButton onClick={()=>setIsEditing(!isEditing)}>Editar</StyledConfirmButton>
        <StyledCancelButton onClick={()=>{
            setConfirmation(window.confirm("Deseja realmente excluir esse item?"));
        }}>Excluir</StyledCancelButton>
        </div>
    </StyledItemDiv>
    else return <>
        <UpdateItemsForm inputsWidth={'100%'} item={item} onSuccess={()=>{onSuccess(navigate)}}  onCancel={()=>{setIsEditing(!isEditing)}}/>
    </>
    }
    return <></>
}