import { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { useState } from "react";

import {
  dataFetch,
  formatarData,
  formatDataYYYYMMDD,
  formatInit,
  removeHours,
} from "../../utils/functions";
import { useId } from "react";
import { useContext } from "react";
import { Context, MyContext } from "../Context";
import { simpleSum, sum, sumArr, sumPayments } from "./Payment";
import {
  StyledCancelButton,
  StyledConfirmButton,
} from "../../Styles/styledConfirmButton";
const Tab = ({ tab }) => {
  const refDate = useRef(formatarData(tab.data));
  const [content, setContent] = useState(null);
  const refdiv = useRef(null);
  const functions = useContext(Context);
  const refSum = useRef(sumArr(tab.pagamentos));
  console.log("tab renderizou");
  return (
    <div
      className={`${styles.tab} ${
        refSum.current === tab.valor && styles.closedTab
      }`}
      ref={refdiv}
    >
      {content ? (
        content
      ) : (
        <div>
          {refDate.current} | Valor: {parseFloat(tab.valor).toFixed(2)} | Total
          Pago: {sumArr(tab.pagamentos)}
        </div>
      )}
      <div className={styles.functions}>
        <button
          className={styles.maximizeButton}
          onClick={() => {
            console.log(tab);
            refdiv.current.classList.toggle(styles.extended);
            const url = `tabs/getcomandabyid/${tab.id}`;
            if (content) setContent(null);
            else
              dataFetch({ simpleurl: url }).then((r) => {
                console.log(r);
                const jsx = (
                  <>
                    {refDate.current}
                    <div className={styles.itemsComanda}>
                      {r.map((tab, index) => {
                        return (
                          <div key={index}>
                            {tab.quantidade} {tab.nome_item}{" "}
                            {parseFloat(tab.valor).toFixed(2)}
                          </div>
                        );
                      })}
                    </div>
                    Total: {parseFloat(tab.valor).toFixed(2)} || Total Pago:{" "}
                    {refSum.current} || Restante:{" "}
                    {parseFloat(tab.valor - refSum.current).toFixed(2)}
                    <div className={`${styles.rowdiv} ${styles.h_25}`}>
                      <StyledConfirmButton>Editar Compra</StyledConfirmButton>
                      <StyledCancelButton>Excluir Compra</StyledCancelButton>
                    </div>
                  </>
                );
                setContent(jsx);
              });
          }}
        >
          {content ? "Esconder" : "Mostrar Mais"}
        </button>
        <input
          defaultChecked
          type="checkbox"
          className={styles.checkbox}
          onClick={(e) => {
            const isChecked = e.target.checked;

            if (isChecked) {
              functions.setCheckedTabs([...functions.checkedTabs, tab]);
            } else {
              functions.setCheckedTabs(
                functions.checkedTabs.filter((each) => each.id !== tab.id)
              );
            }
          }}
        />
      </div>
    </div>
  );
};

export const Tabs = ({ tabs }) => {
  const openCheckId = useId();
  const closedCheckId = useId();
  const [openTabs, setOpenTabs] = useState(true);
  const [closedTabs, setClosedTabs] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const functions = useContext(Context);
  const functionsRef = useRef(useContext(Context));
  const refDate = useRef();
  const refCheckDate = useRef();
  // const [checkedTabs, setCheckedTabs] = useState([]);

  useEffect(() => {
    console.log(tabs);
  }, [tabs]);

  useEffect(() => {
    var newArray = [];
    console.log("tabelas!! .. ");
    console.log(tabs);
    if (openTabs && tabs) {
      console.log("entrou 1if");

      const filteredOpen = tabs.filter((tab) => {
        if (tab.status === "aberta") {
          console.log(`comparando ${date} com ${tab.data}`);

          if (!date) return tab;
          else if (date === removeHours(tab.data)) {
            console.log("dentro do elseif");
            return tab;
          } else return null;
        } else return null;
      });
      if (filteredOpen.length > 0) newArray = filteredOpen;
    }
    if (closedTabs && tabs) {
      const filteredClosed = tabs.filter((tab) => {
        if (tab.status === "fechada") {
          console.log(`Comparando ${date} com ${tab.data}`);

          if (!date) return tab;
          else if (date === removeHours(tab.data)) {
            return tab;
          } else return null;
        } else return null;
      });

      if (filteredClosed.length > 0)
        newArray = [...newArray, ...filteredClosed];
    }
    // newArray.sort((a, b) => a.id - b.id);
    console.log("ARRAY");
    console.log(newArray);
    functionsRef.current.setCheckedTabs(newArray);
  }, [closedTabs, openTabs, tabs, date]);

  useEffect(() => {
    console.log(functions.checkedTabs);
  }, [functions.checkedTabs]);

  return (
    <>
      {tabs && (
        <>
          <div
            style={{
              display: "flex",
              height: "40px",
              alignItems: "center",
              gap: "3px",
            }}
          >
            <input
              type="checkbox"
              className={styles.checked}
              id={openCheckId}
              value={openTabs}
              defaultChecked
              onChange={(e) => {
                if (openTabs && !closedTabs) {
                  setClosedTabs(!closedTabs);
                }
                document.getElementById(closedCheckId).checked = true;
                setOpenTabs(e.target.checked);
              }}
              hidden
            />
            <label className={styles.checkLabel} htmlFor={openCheckId}>
              Abertas
            </label>

            <input
              type="checkbox"
              className={styles.checked}
              id={closedCheckId}
              value={closedTabs}
              onChange={(e) => {
                if (closedTabs && !openTabs) {
                  setOpenTabs(!openTabs);
                }
                document.getElementById(openCheckId).checked = true;
                setClosedTabs(e.target.checked);
              }}
              hidden
            />
            <label className={styles.checkLabel} htmlFor={closedCheckId}>
              Fechadas
            </label>
            <input
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
              onChange={(e) => {
                setDate(e.target.value);
                refCheckDate.current.checked = true;
              }}
              ref={refDate}
            />
            <input
              type="checkbox"
              ref={refCheckDate}
              defaultChecked
              className={styles.checkbox}
              onChange={(e) => {
                if (e.target.checked) {
                  setDate(refDate.current.value);
                } else {
                  setDate(null);
                }
              }}
            />
          </div>
          <div className={styles.overflowed}>
            {tabs.map((tab, index) => {
              if (openTabs && tab.status === "aberta") {
                console.log(`comparando ${date} com ${removeHours(tab.data)}`);
                if (date && date === removeHours(tab.data))
                  return <Tab key={index} tab={tab} />;
                else if (!date) return <Tab key={index} tab={tab} />;
                else return null;
              }
              if (closedTabs && tab.status === "fechada") {
                if (date && date === removeHours(tab.data))
                  return <Tab key={index} tab={tab} />;
                else if (!date) return <Tab key={index} tab={tab} />;
                else return null;
              } else return null;
            })}
          </div>
          <h3>Total: R$ {simpleSum(functions.checkedTabs)}</h3>
          <h3>Total Pago: R$ {sumPayments(functions.checkedTabs)}</h3>
          {/* <h3>Total a Pagar: R$ {sumPayments(functions.checkedTabs)}</h3> */}
        </>
      )}
    </>
  );
};
