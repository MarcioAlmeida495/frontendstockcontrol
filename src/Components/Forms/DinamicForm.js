import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import { StyledForm } from '../../Styles/styledForm';
import { StyledConfirmButton } from '../../Styles/styledConfirmButton';
import { StyledInput } from '../../Styles/styledInput';
import { dataFetch, formatInit } from '../../utils/functions';

export const DinamicForm = ({object, submitUrl = '', width = undefined}) => {
    const {register, handleSubmit} = useForm();
    const [keys, setKeys] = useState();
    const onSubmit = (data) => {
        dataFetch({simpleurl: 'clients/addclient', init: formatInit({data: data})}).then((r)=>{window.alert(r)}).catch((err)=>window.alert(err));
    }
 
    useEffect(()=>{
        console.log(object);
        setKeys(Object.keys(object));
    }, [object]);

    return <StyledForm width={width} onSubmit={handleSubmit(onSubmit)}>
        {keys && keys.map((each, index) => {
            console.log(each, object.each)
            return <StyledInput key={index} placeholder={each} type={object[each]} step='any' {...register(each)}/>
        })}
        <StyledConfirmButton type='submit'>Confirm</StyledConfirmButton>
    </StyledForm>
}