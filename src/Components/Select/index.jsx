import { useEffect, useRef, useState } from "react"
import { dataFetch, removeAccents } from "../../utils/functions";
import { StyledSelect } from "../../Styles/styledSelect";
import styled from "styled-components";
import { StyledInput } from "../../Styles/styledInput";
import { StyledConfirmButton } from "../../Styles/styledConfirmButton";

const Div = styled.div`
    display: flex;
    height: auto;
    align-items: center;
    justify-content: start;
    width: 100%;
    max-width: 600px;
    gap: 5px;
`

const AbsoluteDiv = styled.div`
    position: absolute;
    height: 35px;
`

export const Select = ({url, defaultPlaceholder, getSelected = () => {}}) => {
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState('');
    const [search, setSearch] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const refSelect = useRef(null);

    useEffect(()=>{
        dataFetch({simpleurl: url}).then(r=>{setData(r); setSelected(r[0]);}).catch(error => window.alert(error));
    }, [url]);

    useEffect(()=>{
        console.log(selected);
        getSelected(selected);
    }, [selected, getSelected])

    useEffect(() => {
        if(refSelect.current.options[0]) {
            refSelect.current.value = refSelect.current.options[0].value;
            console.log(refSelect.current.options[0])
            setSelected(refSelect.current.options[0]);
        }
    },[search])

    return <Div>
            {isSearching ? <>
                    <StyledInput autoFocus onBlur={()=>{setIsSearching(false)}} defaultValue={search} placeholder={`PESQUISE O ${defaultPlaceholder}`} onChange={(e)=>{setSearch(e.target.value)}} width={'300px'} type="search"/> 
                    <StyledConfirmButton margin={'2px'} height={'99%'} width={'35px'} onClick={()=>{setIsSearching(false)}}>OK</StyledConfirmButton>
            </>
                :   
                <>
                
        <AbsoluteDiv>
                <div style={{position: 'relative', top: '5px', left: '5px'}} >
                    <img alt="searchicon" onClick={()=>{setIsSearching(true)}} style={{width: '25px'}} src="icons/loupe.png" />
                    {search && <div style={{display: 'block', position: 'absolute', top: '0px', right: '-5px', width: '3px', height: '3px', border: '4px solid red', borderRadius: '5px'}}/>}
                        
                
                </div>
            </AbsoluteDiv>
                </>    
            }
        {<StyledSelect  ref={refSelect} onChange={(e)=>{data.map((each, index) => {
            if(Number(each.id) === Number(e.target.value)){
                console.log('encontrado');
                setSelected(each);
            }
            else return null;
            })}}>
            {data && data.map((element, index) => {
                if(removeAccents(element.nome).toUpperCase().includes(removeAccents(search.toUpperCase()))) return <option value={element.id} key={index}>{element.nome}</option>
                else return null;
            })}
        </StyledSelect>}
    </Div>
}