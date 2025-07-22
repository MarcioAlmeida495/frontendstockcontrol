import styled from "styled-components";
import styles from "./styles.module.css";
import { Select } from "../Components/Select";
import { useFieldArray, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import {
  StyledCancelButton,
  StyledConfirmButton,
} from "../Styles/styledConfirmButton";
import { DinamicFormReturnData } from "../Components/Forms/DinamicFormRerturnData";
import { AddIcon } from "../Components/AnimationIcons/Add";
import { ItemsFormForOrders } from "../Components/Forms/ItemsFormForSupplierOrders";
import { Div } from "../Styles/styledDiv";
import { dataFetch, formatInit } from "../utils/functions";
import { StyledInput } from "../Styles/styledInput";
import { NewSelect } from "../Components/NewSelect";
export const NewSupplierOrder = () => {
  const [selectedID, setSelectedID] = useState();

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
    <Div width={"700px"}>
      <h1>NOVO PEDIDO</h1>
      {/* <NewSelect
        url={`supplier/getsuppliers`}
        register={register}
        setValue={setValue}
      /> */}
      <NewSelect
        register={register}
        registerName={"supplier_ID"}
        setValue={setValue}
        url={"supplier/getsuppliers"}
      />
      {/* <Select
        marg
        width={"100%"}
        defaultPlaceholder={"FORNECEDOR"}
        {...register("supplier_ID")}
        getSelected={(value) => {
          setSelectedID(value.id);
          setValue("supplier_ID", value.id);
        }}
        url={`supplier/getsuppliers`}
      /> */}

      <StyledConfirmButton
        width={"100%"}
        $margin={"0px"}
        height={"30px"}
        onClick={() => {
          prepend();
          console.log(getValues());
        }}
      >
        <AddIcon />
      </StyledConfirmButton>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          overflowY: "scroll",
          gap: "5px",
          width: "100%",
          padding: "10px",
        }}
      >
        {fields.map((field, index) => {
          return (
            <div className={styles.row} key={field.id}>
              <StyledInput
                className={styles.w100}
                placeholder="qtd"
                {...register(`items.${index}.quantidade`)}
              />
              <Select
                url={"items/getitems"}
                showInfo={true}
                getSelected={(selected) => {
                  setValue(`items.${index}.id`, selected.id);
                }}
              />
              <StyledInput
                className={styles.w100}
                placeholder="valor"
                {...register(`items.${index}.valor`)}
              />
              <div className={styles.modalInfo}>
                {/* {dataFetch({ simpleurl: "" })} */}
              </div>
              <StyledCancelButton
                width={"40px"}
                onClick={() => {
                  remove(index);
                }}
              >
                x
              </StyledCancelButton>
            </div>
            // <ItemsFormForOrders
            //   supplier={getValues("supplier_ID")}
            //   remove={remove}
            //   key={field.id}
            //   register={register}
            //   setValue={setValue}
            //   getValues={getValues}
            //   index={index}
            // />
          );
        })}
      </div>
      <StyledConfirmButton
        width={"100%"}
        $margin={"0px"}
        height={"30px"}
        onClick={() => {
          console.log(getValues());
          dataFetch({
            simpleurl: "supplierorders/createorder",
            init: formatInit({ data: getValues() }),
          });
        }}
      >
        Salvar Pedido de Abastecimento
      </StyledConfirmButton>
    </Div>
  );
};
