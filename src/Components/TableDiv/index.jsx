import { useEffect, useRef, useState } from "react"
import { dataFetch, formatInit } from "../../utils/functions";
import { getItens } from "../../utils/getURLs";
import styled from "styled-components";
import { StyledInput } from "../../Styles/styledInput";
import { ItemDiv } from "./ItemDiv";
import { ItensForm } from "../Forms/ItensForm";

const StyledTableDiv = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    align-items: center;
    height: calc(100% - 150px);
    overflow: auto;
    border-radius: 5px;
    width: 100%;
    border-radius: 3px;
    & > div{
        height: 50px;
        min-height: 50px;
    }
    
`
export const StyledItemDiv = styled.div`
    border-radius: 2px;
    display: flex;
    background-color: #999;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    height: 50px;
    border: 1px rgba(0,0,0,0) solid;
    width: 100%;
    transition: background-color 300ms ease-in-out, border 300ms ease;
    &:hover{
        background-color: rgba(0,0,0,0.1);
        border-bottom: 1px white solid;
        border-top: 1px white solid;
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

export const TableDiv = ({onSuccess = () => {}}) => {
    const [itens, setItens] = useState();
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [countItens, setCountItens] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(0);
    const inputRef = useRef(null);
    
    useEffect(()=>{
        dataFetch({simpleurl: 'items/getcountitems'}).then(r=>{
            setCountItens(r.count);
        });
        dataFetch({simpleurl: 'limitconfig'}).then(r=>{
            setItemsPerPage(r.limit);
        })
    },[])

    

    useEffect(()=>{
        if(itemsPerPage)dataFetch({simpleurl: 'items/getitens', init : formatInit({data : {limit: itemsPerPage, page: page}})}).then(r=>
            {
                if(r.length > 0)setItens(r)
                else setPage(page-1);
            }
        ).catch(err=>{
        })
    }, [page, itemsPerPage])

    return <>
        <ItensForm nomeChange={(value) => {setSearch(value)}}  onSuccess={()=>onSuccess()}/>
        {itens && <div style={{height: 'calc(100% - 70px)'}}>
            <div style={{display: "flex", width: '100%'}}>
                <StyledInput ref={inputRef} defaultValue={itemsPerPage} width={'50px'} type="number"/>
                <button onClick={()=>{
                    setItemsPerPage(inputRef.current.value);
                    setPage(0);
                    dataFetch({simpleurl: 'setlimitconfig', init: formatInit({data: { limit: inputRef.current.value}})})
                }}>alterar</button>
            </div>
            
        <StyledInput value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Pesquisar item" width={'100%'}/>
        {itens && <StyledHead width={`${100/(Object.keys(itens[0]).length+1)}%`}>
            {Object.keys(itens[0]).map((key, index)=>{
                return <div key={index}>{key.toUpperCase()}</div>
            })}
            <div>FUNÇOES</div>
        </StyledHead>}
        <StyledTableDiv>
            {itens && itens.map((item, index)=>{
                if(search === '' || item.nome.toUpperCase().includes(search.toUpperCase())){ 
                    return <>
                        <ItemDiv key={index} item={item} width={`${(100/Object.keys(itens[0]).length+1)}%`}/>
                    </> 
                }
                    else return null
            })}
        </StyledTableDiv>
            <div style={{display: "flex"}}>
                {(page-1) >= 0 && <button onClick={()=>{setPage(page-1)}}>before</button>}
                {(page+1)*itemsPerPage < countItens && <button onClick={()=>{setPage(page+1)}}>next</button>}
            </div>
    </div>}
    </>
    
}