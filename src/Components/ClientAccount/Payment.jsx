import { useContext, useEffect, useRef, useState } from "react";
import { RowDiv } from "./styles";
import styles from "./styles.module.css";
import { StyledInput } from "../../Styles/styledInput";
import { StyledConfirmButton } from "../../Styles/styledConfirmButton";
import { Context } from "../Context";
export const Payment = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const functions = useContext(Context);
  const [value, setValue] = useState();
  return (
    <div className={styles.newPayment}>
      <h1>Pagamento</h1>
      <RowDiv>
        <div className={styles.paymentTypes}>
          <label className={`${styles.label}`} htmlFor="cash">
            <input
              id="cash"
              name="payment"
              type="radio"
              value={"cash"}
              defaultChecked
            />
            <p>Dinheiro</p>
          </label>
          <label className={styles.label} htmlFor="card">
            <input id="card" name="payment" type="radio" value={"card"} />
            Cartão
          </label>
          <label className={styles.label} htmlFor="pix">
            <input id="pix" name="payment" type="radio" value={"pix"} />
            PIX
          </label>
        </div>
        <div className={styles.column}>
          <StyledInput
            $width={"300px"}
            type="number"
            defaultValue={parseFloat(
              functions.checkedTabs.reduce((sum, tab) => {
                return sum + tab.valor;
              }, 0)
            ).toFixed(2)}
            onChange={(e) => {}}
            placeholder="PAGAMENTO"
          />
          <StyledConfirmButton width={"300px"}>Confirmar</StyledConfirmButton>
        </div>
      </RowDiv>
    </div>
  );
};
