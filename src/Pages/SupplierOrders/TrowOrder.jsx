import { useState } from "react";
import { StyledConfirmButton } from "../../Styles/styledConfirmButton";
import styles from "./styles.module.css";
export const TrowOrder = ({ each }) => {
  const [editing, setEditing] = useState(false);
  return (
    <tr>
      <td>{each.id}</td>
      <td>{each.nome_fornecedor}</td>
      <td>{each.data_pedido}</td>
      {editing ? (
        <td>
          <select>
            <option>1</option>
            <option>2</option>
          </select>
        </td>
      ) : (
        <td>{each.status}</td>
      )}
      <td className={styles.functions}>
        <StyledConfirmButton>Ver</StyledConfirmButton>
        <StyledConfirmButton onClick={() => setEditing(!editing)}>
          Editar
        </StyledConfirmButton>
      </td>
    </tr>
  );
};
