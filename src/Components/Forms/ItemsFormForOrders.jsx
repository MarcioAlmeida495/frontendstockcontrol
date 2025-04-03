import { useForm } from "react-hook-form"
import { StyledInput } from "../../Styles/styledInput"
import { Select } from "../Select"
import { useEffect, useState } from "react";
import styled from "styled-components";
import { StyledCancelButton } from "../../Styles/styledConfirmButton";
import { AddIcon } from "../AnimationIcons/Add";
import { CancelIcon } from "../AnimationIcons/Cancel";
import { dataFetch, formatInit } from "../../utils/functions";

const Div = styled.div`
    display: flex;
    position: relative;
    gap: 5px;
    margin: 5px;
    width: 100%;
    max-width: 700px;
`

const InfoDiv = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 20px;
    height: 30px;
    background-color: white;
    color: rgba(0,0,0,0);
    overflow: hidden;
    justify-content: center;
    align-items: center;
    text-align: center;
    top: 0;
    left: 0px;
    transition: height 200ms linear, width 200ms linear, background-color 200ms linear, color 200ms linear;
    border-radius: 3px;
    border: 1px solid rgba(0,0,0,0.5);
    
    & > span{
        font-size: 13px;
        display: block;
        width: 100%;
        white-space: nowrap;
    }

    & ::before{
        content: "";
    position: absolute;
    top: -3px;
    left: 6px;
    width: 16px; /* Ajuste conforme necessário */
    height: 16px;
    background-image: src('icons/plus.png');
    background-size: contain;
    background-repeat: no-repeat;
    }
    &:hover{
        z-index: 999;
        color: black;
        width: auto;
        height: auto;
        background-color: white;
        padding: 20px;
        
        cursor: pointer;

        & ::before{
            content: '';
            width: 0px;
            height: 0px;
        }
    }
`

export const ItemsFormForOrders = ({getData = () => {}, supplier = 1, remove, register, index = 0, setValue = () => {}, getValues = () => {}}) => {
    const [selectedItem, setSelectedItem] = useState();
    const [checked, setChecked] = useState(false);
    const [info, setInfo] = useState([]);

    useEffect(()=>{
        console.log(selectedItem);
        if(selectedItem)dataFetch({simpleurl: 'catalog/getcatalogbyitem', init: formatInit({data: {item_id: selectedItem.id}})}).then(r=>setInfo(r))
    }, [selectedItem]);

    useEffect(()=>{
        if(!checked) {
            setValue(`items.${index}.quantidade`, 1);
            setValue(`items.${index}.valor`, 0);
            setValue(`items.${index}.total`, 0)
        }
    }, [checked, index, setValue]);

    return <Div>
        <StyledInput {...register(`items.${index}.quantidade`)} defaultValue={1} width={'100px'} placeholder="qtd" type="Number" 
            onChange={(e)=>{
                setValue(`items.${index}.quantidade`, e.target.value);
                setValue(`items.${index}.valor`, parseFloat(getValues(`items.${index}.valor`)).toFixed(2));
                setValue(`items.${index}.total`, parseFloat(getValues(`items.${index}.quantidade`)*getValues(`items.${index}.valor`)).toFixed(2))
            }}
        />
        <input title="marque para selecionar somente produtos do catálogo" type="checkbox" onClick={()=>{setChecked(!checked)}}/>
        <Select {...register(`items.${index}.id`)} defaultPlaceholder={'ITEM'} 
            getSelected={
                (value) => {
                    try {
                        setValue(`items.${index}.id`, value.id);
                        setSelectedItem(value);
                        if(checked){
                            setValue(`items.${index}.valor`, parseFloat((Number(value.valor.replace(',','.')))).toFixed(2));
                            console.log(`${value.valor} :: ${typeof value.valor} :: ${(Number(value.valor.replace(',','.')))}`)
                            setValue(`items.${index}.total`, parseFloat(getValues(`items.${index}.quantidade`)*(Number(value.valor.replace(',','.')))).toFixed(2));
                        }
                    } catch (error) {
                    }
                }} 
                url={checked ? `catalog/getcatalogitemsbysupplier/${supplier}` : 'items/getitems'}
        />
        <div style={{position: 'relative', width: '50px', height: '30px'}}>
        {<InfoDiv>
            {info.data && info.data.map((each, index) => {
                return <span key={index}>
                    {Object.values(each).map((value, index) => {
                        return <span key={index}>{` ${value} `}</span>
                    })}
                </span>
            })}
        </InfoDiv>}
        </div>
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
        <StyledCancelButton height={'100%'} width={'60px'} onClick={()=>{remove(index)}} ><CancelIcon/></StyledCancelButton>
        </Div>
}