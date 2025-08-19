import { useEffect, useRef, useState, useContext, useId } from "react";
import styles from "./styles.module.css";
import {
  dataFetch,
  formatarData,
  formatInit,
  getDate,
  removeHours,
} from "../../utils/functions";
import { Context } from "../Context";
import { simpleSum, sumArr, sumPayments } from "./Payment";
import {
  StyledCancelButton,
  StyledConfirmButton,
} from "../../Styles/styledConfirmButton";

const Tab = ({ tab }) => {
  const refDate = useRef(formatarData(tab.data));
  const [items, setItems] = useState([]); // agora só salvo os itens
  const [expanded, setExpanded] = useState(false); // controla se está expandido
  const refdiv = useRef(null);
  const functions = useContext(Context);
  const refSum = useRef(sumArr(tab.pagamentos));

  useEffect(() => {
    console.log("ITEMS ATUALIZADOS", items);
  }, [items]);

  const toggleExpand = () => {
    refdiv.current.classList.toggle(styles.extended);
    if (expanded) {
      setExpanded(false);
      setItems([]); // fecha e limpa
    } else {
      const url = `tabs/getcomandabyid/${tab.id}`;
      dataFetch({ simpleurl: url }).then((r) => {
        setItems(r);
        setExpanded(true);
      });
    }
  };

  return (
    <div
      onClick={() => {
        console.log(tab);
      }}
      className={`${styles.tab} ${
        refSum.current === tab.valor && styles.closedTab
      }`}
      ref={refdiv}
    >
      {/* Cabeçalho da comanda */}
      {!expanded ? (
        <div>
          {refDate.current} | Valor: {parseFloat(tab.valor).toFixed(2)} | Total
          Pago: {sumArr(tab.pagamentos)}
        </div>
      ) : (
        <div>
          {refDate.current}
          <div className={styles.itemsComanda}>
            {items.map((it, index) => (
              <div key={index}>
                {it.quantidade} {it.nome_item} {parseFloat(it.valor).toFixed(2)}
              </div>
            ))}
          </div>
          Total: {parseFloat(tab.valor).toFixed(2)} || Total Pago:{" "}
          {refSum.current} || Restante:{" "}
          {parseFloat(tab.valor - refSum.current).toFixed(2)}
          <div className={`${styles.rowdiv} ${styles.h_25}`}>
            <StyledConfirmButton
              onClick={() => {
                //valor quantidade e item_id
                var sum = 0;
                const values = items.map((it) => {
                  sum += it.valor * it.quantidade;
                  return {
                    item: it.item_id,
                    quantidade: it.quantidade,
                    total: it.valor * it.quantidade,
                  };
                });

                const datas = {
                  client: functions.client.id,
                  items: values,
                  total: sum,
                };
                console.log("data: ", datas);
                dataFetch({
                  simpleurl: "tabs/createclienttab",
                  init: formatInit({ data: datas }),
                }).then((r) => {
                  if (r) functions.attData();
                });
              }}
            >
              Copiar Compra
            </StyledConfirmButton>
            <StyledConfirmButton>Editar Compra</StyledConfirmButton>
            <StyledCancelButton
              onClick={() => {
                dataFetch({ simpleurl: `tabs/deletetab/${tab.id}` }).then(
                  (r) => {
                    if (r) functions.attData();
                  }
                );
              }}
            >
              Excluir Compra
            </StyledCancelButton>
          </div>
        </div>
      )}

      {/* Botão de expandir/esconder */}
      <div className={styles.functions}>
        <button className={styles.maximizeButton} onClick={toggleExpand}>
          {expanded ? "Esconder" : "Mostrar Mais"}
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
  const [date, setDate] = useState(getDate());
  const functions = useContext(Context);
  const functionsRef = useRef(useContext(Context));
  const refDate = useRef();
  const refCheckDate = useRef();

  useEffect(() => {
    console.log(tabs);
  }, [tabs]);

  useEffect(() => {
    var status = null;
    if (openTabs && closedTabs) status = null;
    else if (openTabs) status = "aberta";
    else status = "fechada";

    functions.setFilter((f) => {
      return { ...f, status: status };
    });
  }, [openTabs, closedTabs]);

  useEffect(() => {
    let newArray = [];
    if (openTabs && tabs) {
      const filteredOpen = tabs.filter(
        (tab) =>
          tab.status === "aberta" && (!date || date === removeHours(tab.data))
      );
      if (filteredOpen.length > 0) newArray = filteredOpen;
    }
    if (closedTabs && tabs) {
      const filteredClosed = tabs.filter(
        (tab) =>
          tab.status === "fechada" && (!date || date === removeHours(tab.data))
      );
      if (filteredClosed.length > 0)
        newArray = [...newArray, ...filteredClosed];
    }
    functionsRef.current.setCheckedTabs(newArray);
  }, [closedTabs, openTabs, tabs, date]);

  useEffect(() => {
    console.log(functions.checkedTabs);
  }, [functions.checkedTabs]);

  return (
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
              setClosedTabs(true);
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
              setOpenTabs(true);
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
          defaultValue={getDate()}
          onChange={(e) => {
            setDate(e.target.value);
            functions.setFilter({ ...functions.filter, date: e.target.value });
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
              // functions.setFilter({ ...functions.filter, date: date });
            } else {
              setDate(null);
              functions.setFilter({ ...functions.filter, date: null });
            }
          }}
        />
      </div>
      <div className={styles.overflowed}>
        {tabs &&
          tabs.map((tab, index) => {
            if (openTabs && tab.status === "aberta") {
              if (!date || date === removeHours(tab.data))
                return <Tab key={index} tab={tab} />;
              return null;
            }
            if (closedTabs && tab.status === "fechada") {
              if (!date || date === removeHours(tab.data))
                return <Tab key={index} tab={tab} />;
              return null;
            }
            return null;
          })}
      </div>
      <h3>Total: R$ {simpleSum(functions.checkedTabs)}</h3>
      <h3>Total Pago: R$ {sumPayments(functions.checkedTabs)}</h3>
    </>
  );
};
