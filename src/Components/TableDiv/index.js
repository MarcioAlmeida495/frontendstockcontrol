import { useEffect, useRef, useState } from "react"
import { dataFetch, formatInit } from "../../utils/functions";
import { getItens } from "../../utils/getURLs";
import styled from "styled-components";
import { StyledInput } from "../../Styles/styledInput";
import { ItemDiv } from "./ItemDiv";

const StyledTableDiv = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    align-items: center;
    height: 90vh;
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
    border-radius: 10px;
    display: flex;
    background-color: #999;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    height: 50px;
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

export const TableDiv = () => {
    const [itens, setItens] = useState();
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [countItens, setCountItens] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState();
    const inputRef = useRef(null);
    
    useEffect(()=>{
        dataFetch({simpleurl: 'getcountitems'}).then(r=>{
            setCountItens(r.count);
        });
        dataFetch({simpleurl: 'limitconfig'}).then(r=>{
            setItemsPerPage(r.limit);
        })
    },[])

    useEffect(()=>{
        dataFetch({simpleurl: 'getitens', init : formatInit({data : {limit: itemsPerPage, page: 0}})}).then(r=>
            {
                console.log('RESPOSTA:: ', r);
                setItens(r)
            }
        )
    },[itemsPerPage])

    useEffect(()=>{
        dataFetch({simpleurl: 'getitens', init : formatInit({data : {limit: itemsPerPage, page: page}})}).then(r=>
            {
                console.log('RESPOSTA:: ', r);
                if(r.length > 0)setItens(r)
                else setPage(page-1);
            }
        ).catch(err=>{
            console.log(err)
        })
    }, [page, itemsPerPage])

    if(itens){

        return <StyledTableDiv>
            <div style={{display: "flex"}}>
                <StyledInput ref={inputRef} defaultValue={itemsPerPage} type="number"/>
            <button onClick={()=>{
                setItemsPerPage(inputRef.current.value);
                setPage(0);
                console.log(countItens);
            }}>alterar</button>
            </div>
            
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
            <div style={{display: "flex"}}>
                {(page-1) >= 0 && <button onClick={()=>{setPage(page-1)}}>before</button>}
                {(page+1)*itemsPerPage < countItens && <button onClick={()=>{setPage(page+1)}}>next</button>}
            </div>
    </StyledTableDiv>
    }
    else return <></>
}