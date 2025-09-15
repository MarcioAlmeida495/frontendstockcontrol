import styles from "./styles.module.css";
import { useFieldArray, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { StyledConfirmButton } from "../Styles/styledConfirmButton";
import { AddIcon } from "../Components/AnimationIcons/Add";
import { Div } from "../Styles/styledDiv";
import { dataFetch, formatInit } from "../utils/functions";
import { SimpleSelect } from "../Components/SimpleSelect";
import { ItemsArrayField } from "../Components/ArrayFieldForSupplierOrders";
import { NewSelect } from "../Components/NewSelect";

export const NewSupplierOrder = ({ defaultItems }) => {
  const [suppliers, setSuppliers] = useState();

  const form = useForm({
    defaultValues: {
      items: defaultItems || [],
    },
  });

  const { fields, prepend, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  useEffect(() => {
    dataFetch({ simpleurl: "supplier/getsuppliers" }).then((r) => {
      setSuppliers(
        r.sort((a, b) =>
          a.nome.toUpperCase().localeCompare(b.nome.toUpperCase())
        )
      );
    });
  }, []);

  return (
    <Div width={"700px"}>
      <h1>NOVO PEDIDO</h1>
      {suppliers && (
        <NewSelect
          register={form.register}
          registerName={"supplier_ID"}
          setValue={form.setValue}
          url={"supplier/getsuppliers"}
        />
      )}

      <StyledConfirmButton
        width={"65%"}
        $margin={"0px"}
        height={"30px"}
        onClick={() => prepend({ quantidade: 1 })}
      >
        <AddIcon />
      </StyledConfirmButton>

      {/* Passando o form inteiro */}
      <ItemsArrayField
        form={form}
        fields={fields}
        remove={remove}
        styles={styles}
      />

      <StyledConfirmButton
        width={"65%"}
        $margin={"0px"}
        height={"30px"}
        onClick={() => {
          console.log(form.getValues());
          dataFetch({
            simpleurl: "supplierorders/createorder",
            init: formatInit({ data: form.getValues() }),
          }).then((r) => {
            if (r.success) {
              form.reset();
              window.alert("PEDIDO ADICIONADO");
            }
          });
        }}
      >
        Salvar Pedido de Abastecimento
      </StyledConfirmButton>
    </Div>
  );
};
