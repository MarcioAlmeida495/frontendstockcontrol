import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { ItemsFormForOrders } from "./ItemsFormForSupplierOrders";
import styled from "styled-components";
import { ClientTabItemsForm } from "./ClientTabItemsFor";

const ColumnDiv = styled.div`
    height: 100%;
    width: 100%;
    margin: 10px;
    display: flex;
    flex-direction: column;
    background-color: rgba(0,0,0,0);
    overflow: auto;
    & > *{
        width: 100%;
    }
`

export const FieldArrayOfComponent = ({register, control, setValue, getValues}) => {
    const [indexes, setIndexes] = useState([]);
    
    const {fields, append, remove} = useFieldArray({
        control,
        name: 'items',
    });

    return <>
        <ColumnDiv>
            {fields.map((field, index) => {
                return <ClientTabItemsForm remove={remove} key={field.id} register={register} setValue={setValue} getValues={getValues} index={index}/>
            })}
        <button onClick={()=>{append(); console.log(getValues())}}>add</button>
        </ColumnDiv>
    </>
}