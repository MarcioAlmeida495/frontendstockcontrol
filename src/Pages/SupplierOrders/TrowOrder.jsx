import { useEffect, useState } from "react";
import { StyledConfirmButton } from "../../Styles/styledConfirmButton";
import styles from "./styles.module.css";
import { dataFetch, formatarData } from "../../utils/functions";
import { ModalTable } from "./ModalTable";
import { useMyContext } from "./OrderContext";
export const TrowOrder = ({ each, setModalData }) => {
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    console.log(each);
  }, []);

  return (
    <tr>
      <td>{each.id}</td>
      <td>{each.nome_fornecedor}</td>
      <td>{formatarData(each.data_pedido)}</td>

      <td>{each.status}</td>

      <td className={styles.functions}>
        <StyledConfirmButton
          onClick={() => {
            dataFetch({
              simpleurl: `supplierorders/getorderbyid/${each.id}`,
            }).then((r) => {
              setModalData(<ModalTable items={r} orderData={each} />);
            });
          }}
        >
          Ver
        </StyledConfirmButton>
      </td>
    </tr>
  );
};
