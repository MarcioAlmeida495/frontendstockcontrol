import { useEffect, useState } from "react"
import { dataFetch } from "../../utils/functions";
import { getItens } from "../../utils/getURLs";
import styled from "styled-components";
import { StyledInput } from "../../Styles/styledInput";
import { ItemDiv } from "./ItemDiv";

const StyledTableDiv = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    width: 100%;
    border-radius: 3px;
`
export const StyledItemDiv = styled.div`
    border-radius: 10px;
    display: flex;
    background-color: #999;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 100%;
    &:hover{
        background-color: rgba(0,0,0,0.1);
    }
    & > * {
        height: 100%;
        display: flex;
        justify-content: center;
        border-right: 1px solid #aaa;
        border-left: 1px solid #aaa;
        align-items: center;
        text-align: center;
        width: ${(props) => props.width || 'auto'};
        cursor: default;
    }
`;

const StyledHead = styled(StyledItemDiv)`
    font-weight: bold;
    color: white;
    background-color: #aaa;
    &:hover{
        background-color: #ccc;
    }
`

export const TableDiv = ({urlItens} = {}) => {
    const [itens, setItens] = useState();
    const [keys, setKeys] = useState();
    const [search, setSearch] = useState('');

    useEffect(()=>{
        dataFetch({simpleurl: getItens}).then(r=>{
            if(r.length > 0){

                console.log(r);
                setItens(r);
                setKeys(Object.keys(r[0]));
            }
            
        })
    },[])

    useEffect(()=>{
        console.log(itens);
    },[itens])


    if(itens){

        return <StyledTableDiv>
        <StyledInput value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Pesquisar item" width={'100%'}/>
        {itens&& <StyledHead width={`${100/(Object.keys(itens[0]).length+1)}%`}>
            {Object.keys(itens[0]).map((key, index)=>{
                return <div key={index}>{key.toUpperCase()}</div>
            })}
            <div>FUNÇOES</div>
        </StyledHead>}
        {itens && itens.map((item, index)=>{
            console.log('item div table', item);
            if(search === '' || item.nome.toUpperCase().includes(search.toUpperCase())){ 
                return <>
                    <ItemDiv item={item} width={`${(100/Object.keys(itens[0]).length+1)}%`}/>
                </> 
                }
                else return null
            })}
    </StyledTableDiv>
    }
    else return <></>
}