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
import { Payment, simpleSum } from "./Payment";
import { dataFetch, formatInit, getDate } from "../../utils/functions";
import { MyContext } from "../Context";
import { useCallback } from "react";
import { ButtonsAddItem } from "./ButtonsAddItem";
import { NewOrder } from "./NewOrder";

export const refsContext = createContext();
export const useRefsContext = () => useContext(refsContext);
export const Provider = ({ children, functions }) => {
  const [refs, setRefs] = useState([]);
  return (
    <refsContext.Provider value={{ refs, setRefs, functions }}>
      {children}
    </refsContext.Provider>
  );
};

export const ClientAccount = ({ client }) => {
  const [infoModal, setInfoModal] = useState(false);
  const [counterReset, setCounterReset] = useState(0);
  const [tabs, setTabs] = useState([]);
  const [reset, setReset] = useState(0);
  const [checkedTabs, setCheckedTabs] = useState([]);
  const [closedMode, setClosedMode] = useState(false);
  const [filter, setFilter] = useState({ status: "aberta", data: getDate() });

  const { register, setValue, getValues, control, watch } = useForm({
    defaultValues: {
      items: [],
    },
  });
  const { fields, prepend, remove } = useFieldArray({
    control,
    name: "items",
  });
  const attData = useCallback(() => {
    setTabs(null);
    setReset((r) => r + 1);
    setCheckedTabs([]);
    const url = `tabs/getclienttabs/${client.id}`;
    //CLIENTE AVULSO
    if (client.id === 9999 && !closedMode) setClosedMode(true);
    else setClosedMode(false);
    setTimeout(() => {
      dataFetch({ simpleurl: url }).then((r) => {
        setTabs(r);
      });
    }, 500);
  }, [client.id, closedMode]);

  useEffect(() => {
    // const url = `tabs/getclienttabs/${client.id}`;
    const url = `tabs/getclienttabsfilter/${client.id}`;
    const date = filter?.date ?? null;
    const status = filter?.status ?? null;
    setTabs([]);
    dataFetch({
      simpleurl: url,
      init: formatInit({ data: { status: status, date: date } }),
    }).then((r) => {
      setTimeout(() => {
        console.log(r);
        setTabs(r);
      }, 100);
    });
    // dataFetch({ simpleurl: url }).then((r) => {
    //   setTabs(r);
    //   console.log(r);
    // });
  }, [client, reset, filter]);

  useEffect(() => {}, [tabs]);

  const total = useMemo(() => {
    const values = getValues("items");
    var sum = 0;
    values.forEach((value) => {
      sum += parseFloat(value.total);
    });
    setValue("total", sum);
    return sum;
  }, [counterReset, getValues, setValue]);

  useEffect(() => {
    setValue("items", []);
    setValue("client", client.id);
  }, [client, setValue]);
  return (
    <MyContext
      functions={{
        checkedTabs,
        setCheckedTabs,
        attData,
        client,
        setFilter,
        closedMode,
        setClosedMode,
        filter,
      }}
    >
      {infoModal && <Modal>{infoModal}</Modal>}
      <div className={styles.clientAccount}>
        <h1>{client.nome}</h1>
        <div className={styles.rowdiv}>
          {tabs ? (
            <div className={styles.alltabs}>
              <Tabs tabs={tabs ? tabs.comandas : null} />
            </div>
          ) : (
            <>ASDUQWHEUWQHD</>
          )}
          <ColDiv>
            {false ? (
              <NewOrder client={client} setReset={setReset} />
            ) : (
              <div onClick={() => {}} className={styles.newOrder}>
                <>
                  <Provider
                    functions={{
                      prepend: (item) => {
                        console.log(item);
                        prepend(item);
                      },
                    }}
                  >
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
                    <ButtonsAddItem
                      counterReset={counterReset}
                      client={client}
                    />
                    <div className={styles.itemsDiv}>
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
                          z
                        />
                      ))}
                    </div>
                    <div style={{ height: "40px", display: "block" }}>
                      <h2>{`Total: ${parseFloat(total > 0 ? total : 0).toFixed(
                        2
                      )}`}</h2>
                      <input {...register("total")} hidden />
                    </div>
                    <StyledConfirmButton
                      onClick={() => {
                        // console.log(getValues());
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
                  </Provider>
                </>
              </div>
            )}
            {/* <div className={styles.newOrder}>
              <h1>Realizar Pagamento</h1>
              </div> */}
            <Payment
              reset={reset}
              register={register}
              registerName={"paymentType"}
              setReset={setReset}
            />
          </ColDiv>
        </div>
      </div>
    </MyContext>
  );
};

{
  /*  */
}
