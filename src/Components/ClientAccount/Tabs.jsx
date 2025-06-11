import { useEffect } from "react";
import styles from "./styles.module.css";
import { useState } from "react";

import { dataFetch, formatInit } from "../../utils/functions";
const Tab = ({ tab }) => {
  const [content, setContent] = useState(null);

  return (
    <div
      className={styles.tab}
      onClick={() => {
        console.log(tab);
        const url = `tabs/getcomandabyid/${tab.id}`;
        dataFetch({ simpleurl: url }).then((r) => {
          console.log(r);
          const jsx = (
            <>
              {r.map((tab, index) => {
                return (
                  <div key={index}>
                    {tab.data}
                    {"  "}
                    {tab.quantidade} {tab.nome_item}{" "}
                    {parseFloat(tab.valor).toFixed(2)}
                  </div>
                );
              })}
            </>
          );
          setContent(jsx);
        });
      }}
    >
      {content ? content : tab.valor}
    </div>
  );
};

export const Tabs = ({ tabs }) => {
  useEffect(() => {
    console.log(tabs);
  }, [tabs]);

  return (
    <>
      {tabs &&
        tabs.map((tab, index) => {
          return <Tab key={index} tab={tab} />;
        })}
    </>
  );
};
