import { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { dataFetch, formatInit } from "../../utils/functions";
import { useRefsContext } from ".";

const ButtonAddItem = ({ item }) => {
  const context = useRefsContext();

  return (
    <div
      className={styles.frequentItems}
      title={JSON.stringify(item)}
      onClick={() => {
        context.functions.prepend({ item: item.item_id });
      }}
    >
      {item.nome}
    </div>
  );
};

export const ButtonsAddItem = ({ client, counterReset }) => {
  const [frequentItems, setFrequentItems] = useState();

  const attFrequentItems = useCallback(() => {
    const days = 7;
    var sqlDays = "";
    for (var i = 1; i <= days; i++) {
      sqlDays += `, DATE('now', '-${i} day', 'localtime')`;
    }
    const sql = `
    SELECT ci.item_id, i.nome, COUNT(i.id) AS total_comprada
FROM comanda_items ci
JOIN comandas c ON c.id = ci.comanda_id
JOIN items i ON i.id = ci.item_id
WHERE c.cliente_id = ${client.id}
  AND DATE(c.data) IN (DATE('now', 'localtime')${sqlDays})
GROUP BY ci.item_id
ORDER BY total_comprada DESC;

  `;

    dataFetch({
      simpleurl: "test/testsql",
      init: formatInit({ data: { sql: sql } }),
    }).then((r) => {
      setFrequentItems(r.result.slice(0, 10));
    });
  }, [client, counterReset]);

  useEffect(() => {
    attFrequentItems();
  }, [attFrequentItems]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          height: "20px",
          top: "3px",
          right: "0px",
          display: "flex",
          gap: "3px",
        }}
      >
        <div className={styles.divrightfrequentitems}>
          {frequentItems &&
            frequentItems.map((item, index) => {
              return <ButtonAddItem item={item} key={index} />;
            })}
        </div>
      </div>
    </>
  );
};
