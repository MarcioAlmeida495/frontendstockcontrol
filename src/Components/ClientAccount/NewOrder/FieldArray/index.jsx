import { useEffect } from "react";
import { SelectItem } from "../../../SelectChatGPT";
import styles from "./styles.module.css";
import { StyledCancelButton } from "../../../../Styles/styledConfirmButton";
import { CancelIcon } from "../../../AnimationIcons/Cancel";
import { NewSelect } from "../../../NewSelect";

export const ComponentFieldArray = ({
  RHF,
  FieldArray,
  field,
  index,
  selectedItemId = undefined,
}) => {
  const { register, setValue, getValues } = RHF;

  useEffect(() => {
    console.log(`INDEX: ${index}`);
  }, [index]);

  const registers = {
    quantidade: `items.${index}.quantidade`,
    item: `items.${index}.item`,
    preco: `items.${index}.preco`,
    total: `items.${index}.total`,
  };

  return (
    <div field={field.id} className={styles.flexdiv}>
      <input
        className={styles.numberInput}
        type="number"
        {...register(registers.quantidade)}
        defaultValue={1}
      />
      <input {...register(registers.item)} hidden />
      <NewSelect
        register={register}
        placeholder={"Produto"}
        registerName={registers.item}
        setValue={setValue}
        url={"items/getitems"}
        getSelected={(item) => {
          setValue(registers.preco, item.preco);
          setValue(
            registers.total,
            getValues(registers.quantidade) * item.preco
          );
        }}
      />
      {/* <SelectItem
        index={index}
        width="250px"
        value={getValues(registers.item)}
        onSelect={(value) => {
          console.log(value);
          setValue(registers.item, value.id);
          setValue(registers.preco, value.preco);
          setValue(
            registers.total,
            value.preco * getValues(registers.quantidade)
          );
        }}
      /> */}
      <input
        className={styles.numberInput}
        {...register(registers.preco)}
        readOnly
      />
      <input
        className={styles.numberInput}
        {...register(registers.total)}
        readOnly
      />
      <StyledCancelButton width={"40px"}>
        <CancelIcon />
      </StyledCancelButton>
    </div>
  );
};
// {quantidade: '1', preco: '9.00', total: '9.00', item: 291}
