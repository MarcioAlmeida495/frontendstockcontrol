import styled from "styled-components";
import { Select } from "../Components/Select"
import { useFieldArray, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { StyledConfirmButton } from "../Styles/styledConfirmButton";
import { DinamicFormReturnData } from "../Components/Forms/DinamicFormRerturnData";
import { AddIcon } from "../Components/AnimationIcons/Add";
import { ItemsFormForOrders } from "../Components/Forms/ItemsFormForOrders";
import { Div } from "../Styles/styledDiv";

export const Tests = () => {
    const {register, setValue, getValues, handleSubmit, control} = useForm({
        defaultValues: {
            items: [],
        }
    });

    const {fields, append, remove} = useFieldArray({
        control,
        name: 'items',
    })
    const [itemsForm, setItemsForm] = useState([]);


    return <Div width={'700px'}>
        <h1>NOVO PEDIDO</h1>
                <Select defaultPlaceholder={'FORNECEDOR'} {...register('supplier_ID')} getSelected={(value)=>{
                    console.log('VALOR::', value)
                    setValue('supplier_ID', value.id);
            }} url={`supplier/getsuppliers`}/>

            <StyledConfirmButton width={'100%'} margin={'5px'} height={'30px'} onClick={()=>{append()}}><AddIcon /></StyledConfirmButton>
        
            {fields.map((field, index) => {
                return <ItemsFormForOrders remove={remove} key={field.id} register={register} setValue={setValue} getValues={getValues} index={index}/>
            })}
            
            {itemsForm && itemsForm.map((eachItemForm, index) => {
                return eachItemForm;
            })}
            
            <StyledConfirmButton width={'100%'} margin={'5px'} height={'30px'} onClick={()=>console.log(getValues())}>Salvar Pedido de Abastecimento</StyledConfirmButton>
        </Div>
}