import { StyledInput } from "../../Styles/styledInput"
import {dataFetch} from '../../utils/functions';

export const Configurations = () => {
    return <>
        <StyledInput onKeyUp={(e)=>{
            console.log(e.key);
            if(e.key === 'Enter'){
                dataFetch({simpleurl : 'config'})
            }
        }} placeholder="diretório do bd"/>

    </>
}