import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import { StyledForm } from '../../Styles/styledForm';
import { StyledConfirmButton } from '../../Styles/styledConfirmButton';
import { StyledInput } from '../../Styles/styledInput';

export const DinamicForm = ({object}) => {
    const {register, handleSubmit} = useForm();
    const [keys, setKeys] = useState();
    const onSubmit = (data) => {
        console.log(data);
    }
 
    useEffect(()=>{
        console.log(object);
        setKeys(Object.keys(object));
    }, [object]);

    return <StyledForm onSubmit={handleSubmit(onSubmit)}>
        {keys && keys.map((each, index) => {
            console.log(each, object.each)
            return <StyledInput key={index} placeholder={each} type={object[each]} step='any' {...register(each)}/>
        })}
        <StyledConfirmButton type='submit'>Confirm</StyledConfirmButton>
    </StyledForm>
}