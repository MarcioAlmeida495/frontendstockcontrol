import { useEffect, useState } from "react";
import { StyledConfirmButton } from "../../Styles/styledConfirmButton";
import styles from "./styles.module.css";
import { dataFetch, formatarData } from "../../utils/functions";
import { ModalTable } from "./ModalTable";
import { useMyContext } from "./OrderContext";
export const TrowOrder = ({ each, setModalData }) => {
  const [data, setData] = useState(each);

  return (
    <tr>
      <td>{data.id}</td>
      <td>{data.nome_fornecedor}</td>
      <td>{formatarData(data.data_pedido)}</td>

      <td>{data.status}</td>

      <td className={styles.functions}>
        <StyledConfirmButton
          onClick={() => {
            dataFetch({
              simpleurl: `supplierorders/getorderbyid/${data.id}`,
            }).then((r) => {
              setModalData(
                <ModalTable items={r} orderData={data} setNewStatus={setData} />
              );
            });
          }}
        >
          Ver
        </StyledConfirmButton>
      </td>
    </tr>
  );
};
