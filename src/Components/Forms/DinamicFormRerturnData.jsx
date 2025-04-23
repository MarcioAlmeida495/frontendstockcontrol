import { useForm } from "react-hook-form"
import { StyledForm } from "../../Styles/styledForm";
import { StyledInput } from "../../Styles/styledInput";
import { StyledCancelButton, StyledConfirmButton } from "../../Styles/styledConfirmButton";
import { StyledFlexRow } from "../../Styles/styledFlexRow";


export const DinamicFormReturnData = ({onSubmit = () => {}, upName = () => {}, onSuccess = () => {}, object = {}, width = '30%', onCancel = undefined, margin = undefined, height = undefined,functions = <></>}) => {
    const {register, handleSubmit} = useForm();
    
    return <StyledForm height={height} $margin={margin} $width={width} onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(object).map((key, index) => {
            var classname = '';
            if(typeof each === 'string') classname = 'col-string';
            else if(typeof each === 'number') classname = 'col-number';
            if(key !== 'id'){ 
                return <StyledInput $width={`${100/(Object.keys(object).length + 1)}%`} className={classname} key={index} placeholder={key} {...register(key, {onChange: (e)=>{upName(e.target.value)}})} defaultValue={object[key]} />
            }else {
                return <StyledInput $width={`0px`} type="hidden" className={classname} key={index} placeholder={key} {...register(key)} defaultValue={object[key]} />
            };
        })}
            <StyledFlexRow width={`${100/(Object.keys(object).length+1)}%`}>
            <StyledConfirmButton height={'98%'} onClick={()=>{handleSubmit(onSubmit);
            }}>Confirmar</StyledConfirmButton>
            {onCancel && <StyledCancelButton height={'98%'} onClick={()=>{onCancel()}}>Cancelar</StyledCancelButton>}
        </StyledFlexRow>
    </StyledForm>
}