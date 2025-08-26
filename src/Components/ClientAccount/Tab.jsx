import {
  useEffect,
  useRef,
  useState,
  useContext,
  useId,
  useCallback,
} from "react";
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

export const Tab = ({ tab }) => {
  const refDate = useRef(formatarData(tab.data).split(" ")[1]);
  const [items, setItems] = useState(null); // agora só salvo os itens
  const refdiv = useRef(null);
  const functions = useContext(Context);
  const refSum = useRef(sumArr(tab.pagamentos));

  useEffect(() => {
    console.log("ITEMS ATUALIZADOS", items);
  }, [items]);

  const getItems = useCallback(() => {
    console.log("RODANDOFUNC");
    const url = `tabs/getcomandabyid/${tab.id}`;
    dataFetch({ simpleurl: url }).then((r) => {
      setItems(r);
    });
  }, [tab.id]);
  useEffect(() => {
    getItems();
  }, []);

  return (
    <div
      onClick={() => {
        console.log(tab);
      }}
      className={`${styles.tab} ${styles.extended}`}
      ref={refdiv}
    >
      {/* Cabeçalho da comanda */}
      {!items ? (
        <div>
          {refDate.current} | Valor: {parseFloat(tab.valor).toFixed(2)} | Total
          Pago: {sumArr(tab.pagamentos)}
        </div>
      ) : (
        <div>
          {refDate.current}
          {items && (
            <div className={styles.itemsComanda}>
              {items.map((it, index) => (
                <div key={index}>
                  {it.quantidade} {it.nome_item}{" "}
                  {parseFloat(it.valor).toFixed(2)}
                </div>
              ))}
            </div>
          )}
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
        <button
          className={styles.maximizeButton}
          onClick={() => {
            console.log("escondendo");
            refdiv.current.classList.toggle(styles.extended);
            console.log(refdiv.current.classList);
            console.log("items", items);
            if (items) {
              console.log("fechou");
              setItems(null); // fecha e limpa
              return;
            } else {
              getItems();
            }
          }}
        >
          {items ? "Esconder" : "Mostrar Mais"}
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
