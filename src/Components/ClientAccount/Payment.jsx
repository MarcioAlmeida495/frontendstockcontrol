import { useEffect, useRef, useState } from "react";
import { RowDiv } from "./styles";
import styles from "./styles.module.css";
export const Payment = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const refs = [useRef(), useRef(), useRef()];

  return (
    <div className={styles.newPayment}>
      <h1>Pagamento</h1>
      <RowDiv>
        <div className={styles.paymentTypes}>
          <label className={styles.label} htmlFor="card">
            <input id="card" name="payment" type="radio" value={"card"} />
            Cartão
          </label>
          <label className={`${styles.label}`} htmlFor="cash">
            <input id="cash" name="payment" type="radio" value={"cash"} />
            <p>Dinheiro</p>
          </label>
          <label className={styles.label} htmlFor="pix">
            <input id="pix" name="payment" type="radio" value={"pix"} />
            PIX
          </label>
        </div>
      </RowDiv>
    </div>
  );
};
