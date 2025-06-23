import { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { useState } from "react";

import { dataFetch, formatInit } from "../../utils/functions";
import { useId } from "react";
import { useContext } from "react";
import { Context, MyContext } from "../Context";
const Tab = ({ tab }) => {
  const [content, setContent] = useState(null);
  const refdiv = useRef(null);
  const functions = useContext(Context);
  console.log("tab renderizou");
  return (
    <div className={styles.tab} ref={refdiv}>
      {content ? (
        content
      ) : (
        <div>
          {tab.data} | Valor: {parseFloat(tab.valor).toFixed(2)}
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
                    <h3>{tab.data}</h3>
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
                    <h3>Valor Total: {parseFloat(tab.valor).toFixed(2)}</h3>
                  </>
                );
                setContent(jsx);
              });
          }}
        >
          x
        </button>
        <input
          type="checkbox"
          className={""}
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
  // const [checkedTabs, setCheckedTabs] = useState([]);

  useEffect(() => {
    console.log(tabs);
  }, [tabs]);

  useEffect(() => {
    console.log(openTabs);
    console.log(closedTabs);
  }, [openTabs, closedTabs]);

  useEffect(() => {
    totalSum.current = 0;
    console.log("checkedtabs --");
    console.log(functions.checkedTabs);
    functions.checkedTabs.forEach((tab) => {
      totalSum.current += tab.valor;
      console.log(totalSum);
    });
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
              if (openTabs && tab.status === "aberta")
                return <Tab key={index} tab={tab} />;
              if (closedTabs && tab.status === "fechada")
                return <Tab key={index} tab={tab} />;
              else return null;
            })}
          </div>
          <h3>
            Total: R${" "}
            {functions.checkedTabs
              .reduce((total, each) => total + each.valor, 0)
              .toFixed(2)}
          </h3>
        </>
      )}
    </>
  );
};
