import styled from "styled-components"

const DivPai = styled.label`
    width: 30px;
    height: 30px;
    position: absolute;
    z-index: 999;
    top: 5px;
    left: 5px;
    display: block;
    cursor: pointer;
`

const Master = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const Div1 = styled.div`
    width: 100%;
    height: 4px;
    border-radius: 5px;
    background-color: black;
    transition: 0.3s;
`

const Checkbox = styled.input`
    display: none;

    &:checked + ${Master} div:nth-child(1) {
        transform: translateY(10px) rotate(45deg) ;
    }

    &:checked + ${Master} div:nth-child(2) {
        opacity: 0;
    }

    &:checked + ${Master} div:nth-child(3) {
        transform:  translateY(-15px) rotate(-45deg);
    }
`

export const MenuButton = ({ onClick = () => {}, onMouseEnter = () => {}, clicked = false}) => {
    return (
        <DivPai onMouseEnter={() => onMouseEnter()}>
            <Checkbox type="checkbox" value={clicked} onClick={()=>{onClick(); console.log('clicado')}} />
            <Master>
                <Div1 />
                <Div1 />
                <Div1 />
            </Master>
        </DivPai>
    )
}
