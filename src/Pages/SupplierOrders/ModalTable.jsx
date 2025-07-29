import { useEffect, useRef, useState } from "react";
import {
  StyledCancelButton,
  StyledConfirmButton,
} from "../../Styles/styledConfirmButton";
import { dataFetch, formatInit } from "../../utils/functions";
import { MyContext, useMyContext } from "./OrderContext";
import { useContext } from "react";
import { Context } from "../../Components/Modal";

export const ModalTable = ({ items, orderData, setNewStatus }) => {
  var totalSum = 0;
  const [altered, setAltered] = useState(false);
  const refSelected = useRef(null);
  const context = useContext(MyContext);
  const [data, setData] = useState(orderData);
  const modalContext = useContext(Context);
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
          <div style={{ float: "right" }}>
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
      </div>
      <div>Total: {parseFloat(totalSum).toFixed(2)}</div>
    </div>
  );
};
