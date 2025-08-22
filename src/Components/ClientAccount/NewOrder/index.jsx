import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { StyledConfirmButton } from "../../../Styles/styledConfirmButton";
import { Head, RowDiv } from "../styles";
import { ButtonsAddItem } from "../ButtonsAddItem";
import { dataFetch, formatInit } from "../../../utils/functions";
import { ComponentFieldArray } from "./FieldArray";
import { Provider } from "./Context";

export const NewOrder = ({ client, setReset = () => {} }) => {
  const [counterReset, setCounterReset] = useState(0);

  const RHF = useForm({
    defaultValues: {
      items: [],
    },
  });
  const { register, getValues, setValue, watch, control } = RHF;

  const FieldArray = useFieldArray({
    control,
    name: "items",
  });
  const { remove, fields, prepend } = FieldArray;

  const items = watch("items");
  const total = useMemo(() => {
    try {
      const values = getValues("items");
      var sum = 0;
      values.forEach((value) => {
        sum += parseFloat(value.total);
      });
      setValue("total", sum);
      return sum;
    } catch (error) {
      return 0;
    }
  }, [items, getValues, setValue]);

  useEffect(() => {
    setValue("client", client.id);
  }, [client]);

  return (
    <div onClick={() => {}} className={styles.newOrder}>
      <>
        <Provider
          functions={{
            prepend: (item) => {
              prepend(item);
            },
          }}
        >
          <h1 onClick={() => {}}>Nova Compra</h1>
          <StyledConfirmButton onClick={() => prepend()}>
            Adicionar Item
          </StyledConfirmButton>
          <RowDiv>
            <Head $width={"60px"}>Qtd</Head>
            <Head $width={"288px"}>Item</Head>
            <Head $width={"60px"}>Valor</Head>
            <Head $width={"95px"}>Total</Head>
          </RowDiv>
          <input {...register("client")} hidden />
          <ButtonsAddItem client={client} />
          <div className={styles.itemsDiv}>
            {fields.map((field, index) => {
              return (
                <ComponentFieldArray
                  field={field}
                  RHF={RHF}
                  index={index}
                  FieldArray={FieldArray}
                  key={field.id}
                />
              );
            })}
          </div>
          <div style={{ height: "40px", display: "block" }}>
            <h2>{`Total: ${parseFloat(total > 0 ? total : 0).toFixed(2)}`}</h2>
            <input {...register("total")} hidden />
          </div>
          <StyledConfirmButton
            onClick={() => {
              console.log(getValues());
              // dataFetch({
              //   simpleurl: "tabs/createclienttab",
              //   init: formatInit({ data: getValues() }),
              // }).then(() => {
              //   setValue("items", []);
              //   setReset((r) => r + 1);
              // });
            }}
          >
            CONFIRMAR
          </StyledConfirmButton>
        </Provider>
      </>
    </div>
  );
};
