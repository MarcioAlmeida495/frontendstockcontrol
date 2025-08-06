import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import styles from "./styles.module.css";
import {
  StyledCancelButton,
  StyledConfirmButton,
} from "../../Styles/styledConfirmButton";
import { Select } from "../Select";
import { StyledInput } from "../../Styles/styledInput";
import { CancelIcon } from "../AnimationIcons/Cancel";
import { NewSelect } from "../NewSelect";
export const ArrayField = ({
  field,
  remove,
  index,
  register,
  getValues,
  setValue,
  resets,
  watcher,
}) => {
  const [selectedItem, setSelectedItem] = useState();
  var registers = {
    quantidade: `items.${index}.quantidade`,
    item: `items.${index}.item`,
    preco: `items.${index}.preco`,
    total: `items.${index}.total`,
  };

  const watchedField = watcher(`items.${index}.total`);
  useEffect(() => {
    resets.setCounterReset(resets.counterReset + 1);
  }, [watchedField]);
  useEffect(() => {
    if (selectedItem) {
      // console.log(selectedItem);
      setValue(registers.item, selectedItem.id);
      setValue(
        registers.preco,
        parseFloat(Number(selectedItem.preco)).toFixed(2)
      );
      setValue(
        registers.total,
        parseFloat(
          getValues(registers.preco) * getValues(registers.quantidade)
        ).toFixed(2)
      );
    }
  }, [
    getValues,
    registers.item,
    registers.preco,
    registers.quantidade,
    registers.total,
    selectedItem,
    setValue,
  ]);
  return (
    <div key={field.id} className={styles.newitem}>
      <StyledInput
        $width={"80px"}
        autoFocus={false}
        type="number"
        placeholder="Qtd"
        {...register(registers.quantidade, {
          onChange: (e) => {
            // console.log(e.target.value);
            setValue(
              registers.total,
              parseFloat(getValues(registers.preco) * e.target.value).toFixed(2)
            );
          },
        })}
        defaultValue={1}
      />
      <NewSelect
        getSelected={(value) => setSelectedItem(value)}
        register={register}
        registerName={registers.item}
        url={"items/getitems"}
        setValue={setValue}
      />
      <StyledInput
        $width={"80px"}
        disabled
        defaultValue={selectedItem && selectedItem.preco}
        {...register(registers.preco)}
      />
      <StyledInput
        $width={"80px"}
        disabled
        defaultValue={
          selectedItem && parseFloat(Number(selectedItem.preco)).toFixed(2)
        }
        {...register(registers.total)}
      />

      <StyledCancelButton
        width={"40px"}
        type="button"
        onClick={() => {
          resets.setCounterReset(resets.counterReset + 1);
          remove(index);
        }}
      >
        <CancelIcon />
      </StyledCancelButton>
    </div>
  );
};
