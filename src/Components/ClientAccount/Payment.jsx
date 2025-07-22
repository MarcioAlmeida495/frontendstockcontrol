import { useContext, useEffect, useRef, useState } from "react";
import { RowDiv } from "./styles";
import styles from "./styles.module.css";
import { StyledInput } from "../../Styles/styledInput";
import { StyledConfirmButton } from "../../Styles/styledConfirmButton";
import { Context } from "../Context";
import { dataFetch, formatInit } from "../../utils/functions";

export const sum = (arrTabs) => {
  return parseFloat(
    arrTabs.reduce((acc, each) => {
      const payments = each.pagamentos.reduce((acc, payment) => {
        return acc + payment.valor;
      }, 0);
      console.log(payments);
      return acc + each.valor - payments;
    }, 0)
  ).toFixed(2);
};
export const simpleSum = (arrTabs) => {
  return parseFloat(
    arrTabs.reduce((acc, each) => {
      return acc + each.valor;
    }, 0)
  ).toFixed(2);
};
export const sumPayments = (arrTabs) => {
  return parseFloat(
    arrTabs.reduce((acc, each) => {
      const payments = each.pagamentos.reduce((acc, payment) => {
        return acc + payment.valor;
      }, 0);
      console.log(payments);
      return acc + payments;
    }, 0)
  ).toFixed(2);
};

export const sumArr = (arr) => {
  return parseFloat(
    arr.reduce((acc, each) => {
      return acc + each.valor;
    }, 0)
  ).toFixed(2);
};
export const Payment = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const functions = useContext(Context);

  const [value, setValue] = useState(
    sum(functions.checkedTabs.filter((tab) => tab.status === "aberta"))
  );

  useEffect(() => {
    setValue(
      sum(functions.checkedTabs.filter((tab) => tab.status === "aberta"))
    );
  }, [functions.checkedTabs]);
  return (
    <div className={styles.newPayment}>
      <h1>Pagamento</h1>
      <RowDiv>
        <div className={styles.column}>
          <StyledInput
            $width={"300px"}
            type="number"
            value={value}
            onChange={(e) => {
              const filterString = e.target.value.replaceAll(",", ".");
              if (
                filterString === "" ||
                parseFloat(filterString) <=
                  parseFloat(sum(functions.checkedTabs))
              ) {
                setValue(filterString);
              } else {
                setValue(parseFloat(sum(functions.checkedTabs)).toFixed(2));
              }
            }}
            placeholder="PAGAMENTO"
          />
          <StyledConfirmButton
            onClick={() => {
              dataFetch({
                simpleurl: "tabs/newpayment",
                init: formatInit({
                  data: { tabs: functions.checkedTabs, payment: value },
                }),
              }).then((r) => {
                if (r) {
                  functions.attData();
                }
              });
            }}
            width={"300px"}
          >
            Confirmar
          </StyledConfirmButton>
        </div>
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
      </RowDiv>
    </div>
  );
};
