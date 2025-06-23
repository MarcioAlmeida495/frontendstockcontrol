import { useEffect, useMemo, useRef, useState } from "react";
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
export const ClientAccount = ({ client }) => {
  const [infoModal, setInfoModal] = useState(false);
  const [counterReset, setCounterReset] = useState(0);
  const [tabs, setTabs] = useState([]);
  const [reset, setReset] = useState(0);
  const [checkedTabs, setCheckedTabs] = useState([]);
  const { register, setValue, getValues, control, watch } = useForm({
    defaultValues: {
      items: [],
    },
  });

  useEffect(() => {
    const url = `tabs/getclienttabs/${client.id}`;
    console.log(url);
    dataFetch({ simpleurl: url }).then((r) => {
      setTabs(r);
      console.log(r);
    });
  }, [client, reset]);

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
    <MyContext functions={{ checkedTabs, setCheckedTabs }}>
      {infoModal && <Modal>{infoModal}</Modal>}
      <div className={styles.clientAccount}>
        <h1
          onClick={() => {
            // setInfoModal(client);
          }}
        >
          {client.nome}
        </h1>

        <div className={styles.rowdiv}>
          <div className={styles.alltabs}>
            <Tabs tabs={tabs.comandas} />
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
                </div>
                <div style={{ height: "40px", display: "block" }}>
                  <h2>{`Total: ${parseFloat(total > 0 ? total : 0).toFixed(
                    2
                  )}`}</h2>
                  <input {...register("total")} hidden />
                </div>
                <StyledConfirmButton
                  onClick={() => {
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
            <Payment />
          </ColDiv>
        </div>
      </div>
    </MyContext>
  );
};
