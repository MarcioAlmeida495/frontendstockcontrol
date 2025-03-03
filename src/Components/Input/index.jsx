import styled from "styled-components"
import { StyledInput } from "../../Styles/styledInput"
import { useRef } from "react"
const DivInput = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0);
    color: black;
    &::before{
        content: '${(props) => props.legend || ''}';
        position: absolute;
        color: black;
        top: 30%;
        left: 30%;
    }
`

export const Input = ({legend}) => {
    const refDivInp = useRef(null);
    return <DivInput className={''} ref={refDivInp} legend={legend}>
            <StyledInput width={'50%'} type="text" onClick={()=>{
        }}/>
    </DivInput>

}