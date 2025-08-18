import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useFieldArray, useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { Tabs } from "./Tabs";
import { Modal } from "../Modal";
import {
  StyledCancelButton,
  StyledConfirmButton,
} from "../../Styles/styledConfirmButton";
import { Select } from "../Select";
import { StyledInput } from "../../Styles/styledInput";
import { CancelIcon } from "../AnimationIcons/Cancel";
import { ArrayField } from "./ArrayField";
import { ColDiv, Head, RowDiv } from "./styles";
import { Payment } from "./Payment";
import { dataFetch, formatInit } from "../../utils/functions";
import { MyContext } from "../Context";
import { useCallback } from "react";

export const refsContext = createContext();
export const useRefsContext = () => useContext(refsContext);
export const Provider = ({ children, value }) => {
  return <refsContext.Provider value={value}>{children}</refsContext.Provider>;
};

export const ClientAccount = ({ client }) => {
  const [infoModal, setInfoModal] = useState(false);
  const [counterReset, setCounterReset] = useState(0);
  const [tabs, setTabs] = useState([]);
  const [reset, setReset] = useState(0);
  const [checkedTabs, setCheckedTabs] = useState([]);
  const [frequentItems, setFrequentItems] = useState(null);

  const { register, setValue, getValues, control, watch } = useForm({
    defaultValues: {
      items: [],
    },
  });

  const attFrequentItems = useCallback(() => {
    const sql = `
  SELECT ci.item_id, i.nome, SUM(ci.quantidade) AS total_comprada
  FROM comanda_items ci
  JOIN comandas c ON c.id = ci.comanda_id
  JOIN items i ON i.id = ci.item_id
  WHERE c.cliente_id = ${client.id}
  GROUP BY ci.item_id
  ORDER BY total_comprada DESC
`;

    dataFetch({
      simpleurl: "test/testsql",
      init: formatInit({ data: { sql: sql } }),
    }).then((r) => {
      setFrequentItems(r.result);
    });
  }, [client, reset]);

  const attData = useCallback(() => {
    setTabs(null);
    setReset((r) => r + 1);
    setCheckedTabs([]);
    const url = `tabs/getclienttabs/${client.id}`;
    setTimeout(() => {
      dataFetch({ simpleurl: url }).then((r) => {
        setTabs(r);
        console.log("ATT DATA DATA:: ");
        console.log(r);
      });
    }, 500);
  }, [client.id]);

  useEffect(() => {
    const url = `tabs/getclienttabs/${client.id}`;
    console.log(url);
    dataFetch({ simpleurl: url }).then((r) => {
      setTabs(r);
      console.log(r);
    });
  }, [client, reset]);

  useEffect(() => {
    attFrequentItems();
  }, [client, attFrequentItems]);
  useEffect(() => {
    console.log(tabs);
  }, [tabs]);

  const { fields, prepend, remove } = useFieldArray({
    control,
    name: "items",
  });

  const total = useMemo(() => {
    const values = getValues("items");
    var sum = 0;
    values.forEach((value) => {
      sum += parseFloat(value.total);
    });
    setValue("total", sum);
    console.log(typeof sum);
    return sum;
  }, [counterReset, getValues, setValue]);

  useEffect(() => {
    setValue("items", []);
    setValue("client", client.id);
  }, [client, setValue]);
  return (
    <MyContext functions={{ checkedTabs, setCheckedTabs, attData, client }}>
      {infoModal && <Modal>{infoModal}</Modal>}
      <div className={styles.clientAccount}>
        <h1
          onClick={() => {
            // setInfoModal(client);
          }}
        >
          {client.nome}
        </h1>
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
              return (
                <StyledConfirmButton key={index}>
                  {item.nome}
                </StyledConfirmButton>
              );
            })}
        </div>
        <div className={styles.rowdiv}>
          <div className={styles.alltabs}>
            <Tabs tabs={tabs ? tabs.comandas : null} />
          </div>
          <ColDiv>
            <div onClick={() => {}} className={styles.newOrder}>
              <>
                <h1 onClick={() => {}}>Nova Compra</h1>
                <StyledConfirmButton onClick={() => prepend()}>
                  Adicionar Item
                </StyledConfirmButton>
                <RowDiv>
                  <Head $width={"80px"}>Quantidade</Head>
                  <Head $width={"288px"}>Item</Head>
                  <Head $width={"80px"}>Valor</Head>
                  <Head $width={"80px"}>Total</Head>
                </RowDiv>
                <input {...register("client")} hidden />
                <div className={styles.itemsDiv}>
                  <Provider>
                    {fields.map((field, index) => (
                      <ArrayField
                        field={field}
                        index={index}
                        register={register}
                        remove={remove}
                        key={field.id}
                        getValues={getValues}
                        setValue={setValue}
                        resets={{ counterReset, setCounterReset }}
                        watcher={watch}
                      />
                    ))}
                  </Provider>
                </div>
                <div style={{ height: "40px", display: "block" }}>
                  <h2>{`Total: ${parseFloat(total > 0 ? total : 0).toFixed(
                    2
                  )}`}</h2>
                  <input {...register("total")} hidden />
                </div>
                <StyledConfirmButton
                  onClick={() => {
                    console.log("VALUES!!!");
                    console.log(getValues());
                    dataFetch({
                      simpleurl: "tabs/createclienttab",
                      init: formatInit({ data: getValues() }),
                    }).then(() => {
                      setValue("items", []);
                      setReset((r) => r + 1);
                    });
                  }}
                >
                  CONFIRMAR
                </StyledConfirmButton>
              </>
            </div>
            {/* <div className={styles.newOrder}>
              <h1>Realizar Pagamento</h1>
              </div> */}
            <Payment reset={reset} setReset={setReset} />
          </ColDiv>
        </div>
      </div>
    </MyContext>
  );
};
