import { useEffect, useState } from "react"
import { dataFetch } from "../../utils/functions";
import './style.css';
import styled from "styled-components";

const DivTable = styled.div`
    width: 100%;
    max-width: 900px;
    display: flex;
    flex-direction: column;

`
const EachItem = styled.div`
    display: flex;
    position: relative;
    border: 1px solid #bbb;
    & > *{
        border: 1px solid #bbb;
        padding: 5px;
    }
`
const DivBody = styled.div`
    height: 70%;
    display: flex;
    flex-direction: column;
    overflow: auto;
    gap: 5px;
`
export const SupplierOrder = ({url, supplierOrder = {}}) => {
    const [data, setData] = useState(null);
    var total = 0;
    useEffect(()=>{
        dataFetch({simpleurl: url})
            .then(r=>{setData(r);});
    }, [url])

    return <DivTable>
        {data && <>
        <h2>Pedido {supplierOrder.id} - {supplierOrder.nome_fornecedor} - {supplierOrder.status}<button>mudar para entregue</button></h2>
        <DivBody>

        {data.map((each, index) => {
            total += Number((each.preco*each.quantidade).toFixed(2));
            console.log(each)
            return <EachItem onClick={()=>{console.log(each)}} key={index}>
                <div className="col-quantidade"> 
                    {each.quantidade}
                </div>
                <div className="col-nome">
                    {each.item_nome}
                </div>
                <div className="col-valor">
                    {each.preco}
                </div>
                <div className="col-nome">
                    Total: {(each.preco*each.quantidade).toFixed(2)}
                </div>
                   <button style={{position: 'absolute', right: '0' }}>x</button></EachItem>
        })}

        </DivBody>
        <h2>Total do Pedido: {total}</h2>
        </>
        }
    </DivTable>
}