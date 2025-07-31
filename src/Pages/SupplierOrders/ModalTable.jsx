import { useEffect, useRef, useState } from "react";
import {
  StyledCancelButton,
  StyledConfirmButton,
} from "../../Styles/styledConfirmButton";
import { dataFetch, formatInit } from "../../utils/functions";
import { MyContext, useMyContext } from "./OrderContext";
import { useContext } from "react";
import { Context } from "../../Components/Modal";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { StyledInput } from "../../Styles/styledInput";
import { Select } from "../../Components/Select";

import styles from "../styles.module.css";
export const ModalTable = ({ items, orderData, setNewStatus }) => {
  var totalSum = 0;
  const [isEditing, setIsEditing] = useState(false);
  const [altered, setAltered] = useState(false);
  const refSelected = useRef(null);
  const context = useContext(MyContext);
  const [data, setData] = useState(orderData);
  const modalContext = useContext(Context);
  const { register, control, getValues, setValue } = useForm({
    defaultValues: {
      items: items,
    },
  });
  const { fields, prepend, remove } = useFieldArray({
    control,
    name: "items",
  });
  console.log("MODALCONTEXT", modalContext);
  useEffect(() => {
    setData((prev) => ({ ...prev, status: refSelected.current.value }));
    setNewStatus((prev) => ({ ...prev, status: refSelected.current.value }));
    setAltered(false);
  }, [context.reset, setNewStatus]);

  useEffect(() => {
    console.log("data>> ");
    console.log(data);
  }, [data]);

  useEffect(() => {
    console.log(altered);
  }, [altered]);

  return (
    <div style={{ maxWidth: "800px", margin: "auto", height: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          Nome do Fornecedor: {data.nome_fornecedor}
          <div
            style={{
              float: "right",
              display: "flex",
              height: "20px",
              width: "300px",
              gap: "3px",
            }}
          >
            <StyledConfirmButton
              onClick={() => {
                setIsEditing(!isEditing);
              }}
            >
              {isEditing ? "Confirmar" : "Editar Pedido"}
            </StyledConfirmButton>
            <StyledCancelButton
              onClick={() => {
                dataFetch({
                  simpleurl: `supplierorders/deleteorderbyid/${data.id}`,
                }).then((r) => {
                  if (r.success) {
                    modalContext.onClose();
                  }
                });
              }}
            >
              Excluir Pedido
            </StyledCancelButton>
          </div>
        </div>
        <div>Data do Pedido: {data.data_pedido}</div>
        <div>
          Status:{" "}
          <select
            defaultValue={data.status}
            ref={refSelected}
            onChange={(e) => {
              if (e.target.value !== data.status) setAltered(true);
              else setAltered(false);
            }}
          >
            <option>Pendente</option>
            <option>Entregue</option>
            <option>Cancelado</option>
          </select>
          {altered && (
            <StyledConfirmButton
              width={"300px"}
              style={{ float: "right" }}
              onClick={() => {
                console.log("status: ");
                console.log(data.status);
                console.log(`url :: supplierorders/setorderstatus/${data.id}`);
                dataFetch({
                  simpleurl: `supplierorders/setorderstatus/${data.id}`,
                  init: formatInit({
                    data: {
                      newStatus: refSelected.current.value,
                      oldStatus: data.status,
                    },
                  }),
                }).then((r) => {
                  if (r.success) {
                    context.setReset(context.reset + 1);
                  }
                });
              }}
            >
              Confirmar Mudanças
            </StyledConfirmButton>
          )}
        </div>
      </div>
      <div
        style={{
          height: "80%",
          overflow: "auto",
          margin: "10px",
          padding: "10px",
        }}
      >
        {!isEditing && (
          <table>
            <thead>
              <tr>
                <td>Qtd</td>
                <td>Item</td>
                <td>preco</td>
                <td>total</td>
              </tr>
            </thead>
            <tbody>
              {items.map((value, index) => {
                totalSum += value.quantidade * value.preco;
                console.log(totalSum);
                return (
                  <tr key={index}>
                    <td>{value.quantidade}</td>
                    <td>{value.item_nome}</td>
                    <td>{parseFloat(value.preco).toFixed(2)}</td>
                    <td>
                      {parseFloat(value.preco * value.quantidade).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {isEditing && (
          <div>
            {" "}
            <StyledConfirmButton
              type="button"
              onClick={() =>
                prepend({ quantidade: 1, item_nome: "", preco: 0 })
              }
            >
              Adicionar Item
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
              {fields.map((each, index) => {
                console.log(each);
                return (
                  <div className={styles.row} key={each.id}>
                    <Controller
                      control={control}
                      name={`items.${index}.quantidade`}
                      render={({ field }) => (
                        <StyledInput
                          value={field.value ?? 1}
                          className={styles.w100}
                          type="number"
                          placeholder="qtd"
                          onChange={(e) => {
                            console.log(typeof e.target.value);
                            const valor = getValues(`items.${index}.valor`);
                            valor
                              ? (document.getElementById(
                                  `items.${index}.total`
                                ).value = e.target.value * valor)
                              : setValue(
                                  `items.${index}.valor`,
                                  document.getElementById(
                                    `items.${index}.total`
                                  ) / e.target.value
                                );
                            field.onChange(e);
                          }}
                        />
                      )}
                    />
                    <Select
                      url={"items/getitems"}
                      selectedId={each.item_id}
                      showInfo={true}
                      getSelected={(selected) => {
                        setValue(`items.${index}.id`, selected.id);
                      }}
                    />
                    <Controller
                      control={control}
                      name={`items.${index}.valor`}
                      render={({ field }) => (
                        <StyledInput
                          className={styles.w100}
                          placeholder="Valor"
                          value={field.value || each.preco}
                          onChange={(e) => {
                            const valor = e.target.value;
                            const qtd = getValues(`items.${index}.quantidade`);

                            console.log(valor, qtd);
                            document.getElementById(
                              `items.${index}.total`
                            ).value =
                              e.target.value *
                              getValues(`items.${index}.quantidade`);
                            field.onChange(e); // importante manter isso!
                          }}
                        />
                      )}
                    />
                    <StyledInput
                      placeholder="Total"
                      id={`items.${index}.total`}
                      defaultValue={`${each.quantidade * each.preco}`}
                      onChange={(e) => {
                        setValue(
                          `items.${index}.valor`,
                          e.target.value /
                            getValues(`items.${index}.quantidade`)
                        );
                      }}
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
              onClick={() => {
                const updatedItems = getValues("items");
                console.log("Itens atualizados:", updatedItems);
                // Aqui você pode chamar seu backend com esses dados
                dataFetch({
                  simpleurl: `supplierorders/updateitems/${data.id}`,
                  init: formatInit({
                    data: {
                      items: updatedItems,
                    },
                  }),
                }).then((r) => {
                  if (r.success) {
                    setIsEditing(false);
                    context.setReset(context.reset + 1);
                  }
                });
              }}
            >
              Salvar Itens
            </StyledConfirmButton>
          </div>
        )}
      </div>
      <div>Total: {parseFloat(totalSum).toFixed(2)}</div>
    </div>
  );
};
