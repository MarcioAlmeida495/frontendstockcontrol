import { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { dataFetch, formatInit } from "../../utils/functions";

const ButtonAddItem = ({ item }) => {
  return <div className={styles.frequentItems}>{item.nome}</div>;
};

export const ButtonsAddItem = ({ client }) => {
  const [frequentItems, setFrequentItems] = useState();

  const attFrequentItems = useCallback(() => {
    const sql = `
    SELECT ci.item_id, i.nome, SUM(ci.quantidade) AS total_comprada
FROM comanda_items ci
JOIN comandas c ON c.id = ci.comanda_id
JOIN items i ON i.id = ci.item_id
WHERE c.cliente_id = ${client.id}
  AND DATE(c.data) = DATE('now')
GROUP BY ci.item_id
ORDER BY total_comprada DESC;

  `;

    dataFetch({
      simpleurl: "test/testsql",
      init: formatInit({ data: { sql: sql } }),
    }).then((r) => {
      setFrequentItems(r.result.slice(0, 10));
    });
  }, [client]);

  useEffect(() => {
    attFrequentItems();
  }, [attFrequentItems]);

  return (
    <div
      style={{
        position: "absolute",
        top: "3px",
        left: "200px",
        display: "flex",
        gap: "3px",
      }}
    >
      {frequentItems &&
        frequentItems.map((item, index) => {
          console.log(item);
          return <ButtonAddItem item={item} key={index} />;
        })}
    </div>
  );
};
