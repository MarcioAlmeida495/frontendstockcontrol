import styled from "styled-components"
import { StyledForm } from "../../Styles/styledForm"
import { StyledInput } from "../../Styles/styledInput"
import { Input } from "../Input"
import { useEffect, useState } from "react"
import { ItensForm } from "../Forms/ItensForm"

const Div = styled.div`
    display: block;
    align-items: center;
    & > h2{
        text-align: center;
    }
    gap: 10px;
`

//dados do Item

const component = <ItensForm />

export const ItensControl = () => {
    const [components, setComponents] = useState([component]);

    useEffect(()=>{

    },[])

return <Div>
        <h2>Controle de Produtos</h2>
        {components.map(each => {
            return each;
        })}
        <button onClick={()=>{
        setComponents([...components, component])
    }}>adicionar</button>
</Div>

}