import { StyledForm } from "../../Styles/styledForm";
import { StyledInput } from "../../Styles/styledInput";
import {useForm} from 'react-hook-form';
import { dataFetch, formatInit } from "../../utils/functions";
import { useEffect } from "react";
import { updateItems } from "../../utils/getURLs";
import { StyledConfirmButton } from "../../Styles/styledConfirmButton";


export const UpdateItemsForm = ({item = {}, onCancel = ()=>{}, onSuccess = () => {}, inputsWidth} = {}) => {
    const {register, handleSubmit, formState: {errors}, setValue } = useForm({
        defaultValues: item
    });
    
    const onSubmit = (data) => {
        console.log(data);
        dataFetch({simpleurl: updateItems, init: formatInit({data:data})}).then(r=>{
            console.log('DADO RECEBIDO',r)
            onSuccess();
            onCancel();
        });
    }

    useEffect(()=>{
        console.log(item);
    },[item])

    return <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledInput {...register('id')} readOnly={true} width={inputsWidth} value={item.id}/>
        <StyledInput {...register('nome')}  width={inputsWidth} type="text" />
        <StyledInput {...register('quantidade')}  width={inputsWidth} type="text" />
        <StyledInput {...register('preco')}  onChange={(e)=>{setValue('preco', e.target.value.replaceAll(',', '.'))}} width={inputsWidth} type="text" />
        <StyledConfirmButton type="submit" >Enviar Dados</StyledConfirmButton>
        <StyledConfirmButton onClick={()=>onCancel()}>Cancelar</StyledConfirmButton>
    </StyledForm>
}