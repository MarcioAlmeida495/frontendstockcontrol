import { useFieldArray, useForm } from "react-hook-form";
import { Select } from "../Components/Select/index";
import { DinamicFormReturnData } from "../Components/Forms/DinamicFormRerturnData";
import { DinamicTable } from "../Components/DinamicTable";
import { Input } from "../Components/Input";
import { StyledInput } from "../Styles/styledInput";
import { RowDiv } from "../Styles/styledRowDiv";
import { StyledConfirmButton } from "../Styles/styledConfirmButton";
import { useCallback, useEffect, useState } from "react";
import { dataFetch, formatInit } from "../utils/functions";
import { Div } from "../Styles/styledDiv";

export const CatalogSuppliers = () => {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const [selected, setSelected] = useState();
  const [data, setData] = useState([]);
  const [dataOfItem, setDataOfItem] = useState();

  const attData = useCallback(
    async (callback = () => {}) => {
      dataFetch({
        simpleurl: "catalog/getcatalogitems",
        init: formatInit({ data: { fornecedor_id: selected.id } }),
      }).then((r) => {
        setData(r);
        callback();
      });
    },
    [selected]
  );

  useEffect(() => {
    if (selected) {
      console.log(`SELECTED :: ${selected.id}`);
      attData();
    }
  }, [selected, attData]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const onSubmit = (data) => {
    console.log(data);
    dataFetch({
      simpleurl: "catalog/createcatalogitem",
      init: formatInit({ data: data }),
    }).then((r) => {
      attData();
    });
  };

  return (
    <Div width={"700px"}>
      <h1>CATÁLOGOS DE FORNECEDORES</h1>
      <Select
        {...register("fornecedor_id")}
        defaultPlaceholder={"FORNECEDOR"}
        getSelected={(value) => {
          setSelected(value);
          setValue("fornecedor_id", value.id);
        }}
        url={"supplier/getsuppliers"}
      />
      {selected ? (
        <>
          <RowDiv>
            <Select
              {...register("item_id")}
              defaultPlaceholder={"PRODUTO"}
              getSelected={(value) => {
                setValue("item_id", value.id);
                dataFetch({
                  simpleurl: "catalog/getcatalogbyitem",
                  init: formatInit({ data: { item_id: value.id } }),
                }).then((r) => console.log(r));
              }}
              url={"items/getitems"}
            />

            <StyledInput {...register("valor")} placeholder={"valor"} />
            <StyledConfirmButton
              onClick={handleSubmit(onSubmit)}
              height={"97%"}
            >
              Adicionar
            </StyledConfirmButton>
          </RowDiv>
          {selected && (
            <DinamicTable
              allowEdit={true}
              defaultData={data}
              crudUrls={{
                r: `catalog/getcatalogitems/${selected.id}`,
                u: "catalog/updatecatalogvalue",
                d: "catalog/deletecatalogitem",
              }}
            />
          )}
        </>
      ) : (
        <h2>Adicione previamente um fornecedor</h2>
      )}
    </Div>
  );
};

// r: `catalog/getcatalogbyitem/${selected.id}`,
