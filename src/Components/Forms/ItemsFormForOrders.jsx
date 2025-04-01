import { useForm } from "react-hook-form"
import { StyledInput } from "../../Styles/styledInput"
import { Select } from "../Select"
import { useEffect, useState } from "react";
import styled from "styled-components";

const Div = styled.div`
    display: flex;
    gap: 5px;
    margin: 5px;
    width: 100%;
    max-width: 700px;
`

export const ItemsFormForOrders = ({getData = () => {}, register, index = 0, setValue = () => {}, getValues = () => {}}) => {
    const [selectedItems, setSelectedItem] = useState();

    useEffect(()=>{
        console.log(selectedItems);
    }, [selectedItems]);

    

    return <Div>
        <StyledInput {...register(`items.${index}.quantidade`)} defaultValue={1} width={'100px'} placeholder="qtd" type="Number" 
            onChange={(e)=>{
                setValue(`items.${index}.quantidade`, e.target.value);
                setValue(`items.${index}.valor`, parseFloat(getValues(`items.${index}.valor`)).toFixed(2));
                setValue(`items.${index}.total`, parseFloat(getValues(`items.${index}.quantidade`)*getValues(`items.${index}.valor`)).toFixed(2))
            }}
        />
        <Select {...register(`items.${index}.id`)} defaultPlaceholder={'ITEM'} 
            getSelected={
                (value) => {
                    setValue(`items.${index}.id`, value.id)
                }} 
                url={'items/getitems'}
        />
        <StyledInput {...register(`items.${index}.valor`)} placeholder="Valor" width={'100px'}
            onBlur={(e)=>{
                setValue(`items.${index}.valor`, parseFloat(e.target.value).toFixed(2));
                setValue(`items.${index}.total`, parseFloat(getValues(`items.${index}.quantidade`)*e.target.value).toFixed(2))}
            }
            
            type="Number"/>
        <StyledInput {...register(`items.${index}.total`)} placeholder="Total" width={'100px'} 
            onBlur={(e)=>{
                setValue(`items.${index}.total`, parseFloat(e.target.value).toFixed(2));
            }}
            onChange={(e)=>{
                setValue(`items.${index}.total`, e.target.value);
                setValue(`items.${index}.valor`, parseFloat(e.target.value/getValues(`items.${index}.quantidade`)).toFixed(2))}
            }
            
        type="Number"/>
        </Div>
}