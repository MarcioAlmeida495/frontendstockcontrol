import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { StyledCancelButton } from "../../Styles/styledConfirmButton";
import { Select } from "../Select";
import { StyledInput } from "../../Styles/styledInput";
import { CancelIcon } from "../AnimationIcons/Cancel";
export const ArrayField = ({ field, remove, index, register }) => {
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    console.log(selectedItem);
  }, [selectedItem]);
  return (
    <div key={field.id} className={styles.newitem}>
      <StyledInput
        $width={"80px"}
        type="number"
        placeholder="Qtd"
        {...register(`items.${index}.qtd`)}
        defaultValue={1}
      />
      <Select
        getSelected={(value) => setSelectedItem(value)}
        url={"items/getitems"}
        width={"300px"}
      />
      <StyledInput
        $width={"80px"}
        disabled
        defaultValue={selectedItem && selectedItem.preco}
      />
      <StyledInput
        $width={"80px"}
        disabled
        defaultValue={selectedItem && selectedItem.preco}
      />
      <StyledCancelButton
        width={"40px"}
        type="button"
        onClick={() => remove(index)}
      >
        <CancelIcon />
      </StyledCancelButton>
    </div>
  );
};
