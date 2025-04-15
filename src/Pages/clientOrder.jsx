import { useEffect, useState } from "react";
import { Select } from "../Components/Select"
import { Div } from "../Styles/styledDiv"
import { useFieldArray, useForm } from "react-hook-form";
import { StyledConfirmButton } from "../Styles/styledConfirmButton";
import { AddIcon } from "../Components/AnimationIcons/Add";
import { dataFetch, formatInit } from "../utils/functions";
import { ItemsFormForClientOrders } from "../Components/Forms/ItemsFormForClientOrders";
import styled from "styled-components";
import { StyledLink } from "../Styles/styledLink";

const LeftDiv = styled.div`
    display: flex;
    top: 0px;
    left: 0px;
    flex-direction: column;
    height: 100vh;
    background-color: #333;
    width: 300px;
`
const AllBody = styled.div`
    display: flex;

    width: 100%;
    height: 100vh;
    background-color: red;

`

export const LeftMenuClients = () => {
    const [clients, setClients] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);
    useEffect(()=>{
        dataFetch({simpleurl: 'clients/getclients'}).then(res => {
            setClients(res);
        })
    },[])
    
    return <LeftDiv> 
        {clients && clients.map((client, index) => {
            return <StyledLink
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`${(activeIndex === index) ? "active" :  'lowopacity'}`}
        >
            <h3>{client.nome}</h3>
        </StyledLink>
        })}
    </LeftDiv> 
}

export const ClientOrder = () => {
    const [selectedID, setSelectedID] = useState();
    
        const {register, setValue, getValues, handleSubmit, control} = useForm({
            defaultValues: {
                items: [],
            }
        });
    
        const {fields, prepend, remove} = useFieldArray({
            control,
            name: 'items',
        })
    
    
        return <AllBody>
                <LeftMenuClients />
                    {/* <Select showInfo={false} width={'100%'} defaultPlaceholder={'FORNECEDOR'} {...register('Client_ID')} getSelected={(value)=>{
                        setSelectedID(value.id);
                        setValue('Client_ID', value.id);
                }} url={`clients/getclients`}/>
    
                <StyledConfirmButton width={'100%'}  height={'30px'} onClick={()=>{prepend()}}><AddIcon /></StyledConfirmButton>
            
                {fields.map((field, index) => {
                    return <ItemsFormForClientOrders showInfo={false} supplier={getValues('supplier_ID')} remove={remove} key={field.id} register={register} setValue={setValue} getValues={getValues} index={index}/>
                })}
                
                <StyledConfirmButton width={'100%'}  height={'30px'} onClick={()=>{
                    console.log(getValues())
                    dataFetch({simpleurl: '', init: formatInit({data: getValues()})})
                }}>Confirmar Compra</StyledConfirmButton> */}
            </AllBody>
}