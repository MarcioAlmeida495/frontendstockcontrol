import { useForm } from "react-hook-form"
import { StyledForm } from "../../Styles/styledForm";
import { StyledInput } from "../../Styles/styledInput";
import { StyledCancelButton, StyledConfirmButton } from "../../Styles/styledConfirmButton";
import { StyledFlexRow } from "../../Styles/styledFlexRow";


export const DinamicFormReturnData = ({onSubmit = () => {}, onSuccess = () => {}, object = {}, width = '30%', onCancel = undefined, margin = undefined, height = undefined,functions = <></>}) => {
    const {register, handleSubmit} = useForm();
    
    return <StyledForm height={height} margin={margin} width={width} onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(object).map((key, index) => {
            return <StyledInput key={index} placeholder={key} {...register(key)} defaultValue={object[key]} />
        })}
            <StyledFlexRow>
            <StyledConfirmButton height={'98%'} onClick={()=>{handleSubmit(onSubmit);
            }}>Confirmar</StyledConfirmButton>
            {onCancel && <StyledCancelButton height={'98%'} onClick={()=>{onCancel()}}>Cancelar</StyledCancelButton>}
        </StyledFlexRow>
    </StyledForm>
}