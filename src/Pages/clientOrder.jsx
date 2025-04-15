import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { dataFetch } from "../utils/functions";
import styled from "styled-components";
import { StyledClientLink } from "../Styles/styledClientLink";
import { StyledInput } from "../Styles/styledInput";

const LeftDiv = styled.div`
    display: flex;
    top: 0px;
    left: 0px;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    background-color: rgba(0,0,0,0.2);
    width: 50px;
    transition: width 200ms linear;
    gap: 2px;
    padding: 60px 5px 0px 5px ;
    & > * {
        opacity: 0;
        width: 0px;
        transition:  opacity 300ms linear;
    }
    &:hover{
        width: 200px;
        & > * {
            opacity: 1;
            width: 200px;
        }
    }
    
`

const DivLinks = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;
    gap: 2px;
`
const AllBody = styled.div`
    display: flex;

    width: 100%;
    height: 100vh;
    background-color: #ccc;

`

export const LeftMenuClients = ({clickEvent = () => {}}) => {
    const [clients, setClients] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    useEffect(()=>{
        dataFetch({simpleurl: 'clients/getclients'}).then(res => {
            setClients(res.sort((a, b) => a.nome.localeCompare(b.nome, undefined, { sensitivity: 'base' })));
        })
    },[])
    
    return <LeftDiv> 
        <StyledInput onChange={(e)=>{setSearchValue(e.target.value)}} value={searchValue} type="search"/>
            
            <DivLinks>
                {clients && clients.map((client, index) => {
                    if(client.nome.toUpperCase().includes(searchValue.toUpperCase()))
                        return <StyledClientLink
                    $color={'white'}
                    key={index}
                    onClick={() => {
                        clickEvent(client);
                    }}
                    className={`${(activeIndex === index) ? "active" :  'lowopacity'}`}
                    >
                    <h4>{client.nome}</h4>
                </StyledClientLink>
                else return null;
                })}
            </DivLinks>
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
                <LeftMenuClients clickEvent={(data)=>{console.log(data)}} />
                    
            </AllBody>
}