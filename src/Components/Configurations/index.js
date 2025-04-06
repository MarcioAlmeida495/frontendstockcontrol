import { useEffect, useState } from "react";
import { StyledInput } from "../../Styles/styledInput"
import {dataFetch, formatInit} from '../../utils/functions';
import { Div } from "../../Styles/styledDiv";

export const Configurations = () => {
    const [serverData, setServerData] = useState('');

    useEffect(()=>{
        dataFetch({simpleurl: 'config'}).then(r=>{
            setServerData(r);
        })
    },[])



    return <Div width={'700px'}>
        <StyledInput width='80%' defaultValue={serverData.bdDirectory} onKeyUp={(e)=>{
            console.log(e.key);
            if(e.key === 'Enter'){
                dataFetch({simpleurl : 'newconfig', init: formatInit({data: {bdDirectory: e.target.value}})})
            }
        }} placeholder="diretório do bd"/>
        
    </Div>
}