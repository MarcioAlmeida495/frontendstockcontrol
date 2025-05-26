import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import styles from "./styles.module.css";
import {
  StyledCancelButton,
  StyledConfirmButton,
} from "../../Styles/styledConfirmButton";
import { Select } from "../Select";
import { StyledInput } from "../../Styles/styledInput";
import { CancelIcon } from "../AnimationIcons/Cancel";
import { ArrayField } from "./ArrayField";
export const ClientAccount = ({ client }) => {
  const { register, setValue, getValues, handleSubmit, control } = useForm({
    defaultValues: {
      items: [],
    },
  });

  const { fields, prepend, remove } = useFieldArray({
    control,
    name: "items",
  });

  return (
    <>
      <div className={styles.clientAccount}>
        <h1>{client.nome}</h1>
        <div className={styles.rowdiv}>
          <div className={styles.alltabs}>hduhqwuidhuiw</div>
          <div className={styles.newOrder}>
            <StyledConfirmButton
              onClick={() => {
                prepend();
              }}
            >
              Adicionar Item
            </StyledConfirmButton>
            {fields.map((field, index) => {
              return (
                <ArrayField
                  field={field}
                  index={index}
                  register={register}
                  remove={remove}
                  key={field.id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
