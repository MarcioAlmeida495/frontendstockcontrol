import { useForm } from "react-hook-form"
import { StyledInput } from "../../Styles/styledInput"
import { Select } from "../Select"



export const ClientTabItemsForm = () => {
    const {register, setValue, getValues} = useForm();

    return <div style={{display: 'flex', flexDirection: 'row', height: '28px', position: 'relative'}}>
    <StyledInput {...register('qtd')} className="col-number"/>
    <Select {...register('item')} url={'items/getitems'}/>
    </div> 
}