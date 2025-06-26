import { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { useState } from "react";

import { dataFetch, formatarData, formatInit } from "../../utils/functions";
import { useId } from "react";
import { useContext } from "react";
import { Context, MyContext } from "../Context";
import { sum, sumArr } from "./Payment";
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
  const totalSum = useRef(0);
  const [openTabs, setOpenTabs] = useState(true);
  const [closedTabs, setClosedTabs] = useState(false);
  const functions = useContext(Context);
  const functionsRef = useRef(useContext(Context));
  // const [checkedTabs, setCheckedTabs] = useState([]);

  useEffect(() => {
    console.log(tabs);
  }, [tabs]);

  useEffect(() => {
    var newArray = [];
    if (openTabs && tabs) {
      const filteredOpen = tabs.filter((tab) => {
        if (tab.status === "aberta") return tab;
        else return null;
      });
      if (filteredOpen.length > 0) newArray = filteredOpen;
    }
    if (closedTabs && tabs) {
      const filteredClosed = tabs.filter((tab) => {
        if (tab.status === "fechada") return tab;
        else return null;
      });

      if (filteredClosed.length > 0)
        newArray = [...newArray, ...filteredClosed];
    }
    newArray.sort((a, b) => a.id - b.id);
    console.log("ARRAY");
    console.log(newArray);
    functionsRef.current.setCheckedTabs(newArray);
  }, [closedTabs, openTabs, tabs]);

  useEffect(() => {
    console.log(functions.checkedTabs);
  }, [functions.checkedTabs]);

  return (
    <>
      {tabs && (
        <>
          <div>
            <input
              type="checkbox"
              className={styles.checked}
              id={openCheckId}
              value={openTabs}
              defaultChecked
              onChange={(e) => {
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
              value={openTabs}
              onChange={(e) => {
                setClosedTabs(e.target.checked);
              }}
              hidden
            />
            <label className={styles.checkLabel} htmlFor={closedCheckId}>
              Fechadas
            </label>
          </div>
          <div className={styles.overflowed}>
            {tabs.map((tab, index) => {
              if (openTabs && tab.status === "aberta") {
                return <Tab key={index} tab={tab} />;
              }
              if (closedTabs && tab.status === "fechada") {
                return <Tab key={index} tab={tab} />;
              } else return null;
            })}
          </div>
          <h3>Total: R$ {sum(functions.checkedTabs)}</h3>
        </>
      )}
    </>
  );
};
