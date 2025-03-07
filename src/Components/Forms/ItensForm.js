import { StyledForm } from "../../Styles/styledForm";
import { StyledInput } from "../../Styles/styledInput";
import {useForm} from 'react-hook-form';
import { dataFetch, formatInit } from "../../utils/functions";
import { useEffect } from "react";


export const ItensForm = ({item = {}, onSuccess = () => {}} = {}) => {
    const {register, handleSubmit, formState: {errors}, setValue } = useForm();
    
    const onSubmit = (data) => {
        console.log(data);
        dataFetch({simpleurl: 'createIten', init: formatInit({data:data})}).then(r=>{
            onSuccess();
        });
    }

    useEffect(()=>{
        console.log(item);
    },[item])

    return <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledInput {...register('nome')} value={item.nome} placeholder="Nome" width={'50%'} type="text" />
        <StyledInput {...register('quantidade')} value={item.quantidade} placeholder="Quantidade" width={'15%'} type="text" />
        <StyledInput {...register('preco')}  onChange={(e)=>{setValue('preco', e.target.value.replaceAll(',', '.'))}} value={item.preco} placeholder="Preço" width={'15%'} type="text" />
        <button type="submit">Enviar Dados</button>
    </StyledForm>
}