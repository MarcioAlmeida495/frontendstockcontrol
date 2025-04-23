import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { dataFetch } from "../utils/functions";
import styled from "styled-components";
import { StyledClientLink } from "../Styles/styledClientLink";
import { StyledInput } from "../Styles/styledInput";
import { ClientTab } from "../Components/ClientTab";

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    grid-auto-flow: 120px;
    gap: 10px;
    padding: 20px;
    background-color: #eee;
    height: 100%;
    overflow: auto;
`;

const GridItem = styled.div`
    position: relative;
    height: 350px;
    background-color: white;
    border: 1px solid #999;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
    background: red;
    color: white;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
    font-size: 12px;
    line-height: 20px;
    padding: 0;
    text-align: center;

    &:hover {
        background: darkred;
    }
`;



const LeftDiv = styled.div`
    display: flex;
    box-sizing: border-box;
    position: fixed;
    top: 0px;
    left: 0px;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    background-color: rgba(0,0,0,0);
    width: 50px;
    transition: width 200ms linear;
    gap: 2px;
    padding: 60px 5px 0px 5px;
    z-index: 200;
    & > * {
        opacity: 0;
        width: 0px;
        transition:  opacity 300ms linear, width 100ms linear;
        overflow: hidden;
    }
    &:hover{
        width: 250px;
        & > * {
            opacity: 1;
            width: 230px;
        }
    }
    
`

const DivLinks = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;
    gap: 2px;
    & > *{
        height: 20px;
    }
`
const AllBody = styled.div`
    display: grid;
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
    const [items, setItems] = useState([]);

    const addItem = () => {
        setItems(prev => [...prev, { id: Date.now() }]);
    };

    return (
        <AllBody>
            <LeftMenuClients clickEvent={(data) => { console.log(data) }} />

            <div style={{ marginLeft: "50px", overflow: 'auto' }}>

                <GridContainer>
                <GridItem>
                    <button style={{height: '100%', width: '100%'}} onClick={addItem}>Nova Tab</button>
                    </GridItem> 
                    {items.map((item, index) => (
                        <ClientTab key={item.id}></ClientTab>
                    ))}
                </GridContainer>
            </div>
        </AllBody>
    );
};
